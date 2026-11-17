import http.client
import json
import threading

import pytest

from iplquant.dashboard.auth import PasswordStore, Sessions, Throttle
from iplquant.dashboard.server import make_server, read_feed, summarize

PW = "correct-horse-42"


# ---- auth pieces ---------------------------------------------------------------
def test_password_store_hashes_and_verifies(tmp_path):
    s = PasswordStore(tmp_path / "pw.json")
    assert not s.is_set and not s.verify(PW)          # nothing set: nobody gets in
    with pytest.raises(ValueError):
        s.set("short")
    s.set(PW)
    raw = (tmp_path / "pw.json").read_text()
    assert PW not in raw and "scrypt" in raw
    assert (tmp_path / "pw.json").stat().st_mode & 0o777 == 0o600
    assert s.verify(PW) and not s.verify(PW + "x") and not s.verify("")
    (tmp_path / "pw.json").write_text("{broken")
    assert not s.verify(PW)                           # damaged file fails closed


def test_sessions_expire_and_revoke():
    now = [1000.0]
    s = Sessions(ttl=60, clock=lambda: now[0])
    tok = s.create()
    assert s.valid(tok) and not s.valid("forged") and not s.valid(None)
    now[0] += 61
    assert not s.valid(tok)
    tok2 = s.create()
    s.revoke(tok2)
    assert not s.valid(tok2)


def test_throttle_locks_out_after_five_failures():
    now = [0.0]
    t = Throttle(max_fails=5, lockout=300, clock=lambda: now[0])
    for _ in range(4):
        t.fail("1.2.3.4")
    assert t.blocked("1.2.3.4") == 0
    t.fail("1.2.3.4")
    assert t.blocked("1.2.3.4") == 300 and t.blocked("5.6.7.8") == 0
    now[0] += 301
    assert t.blocked("1.2.3.4") == 0


# ---- feed and summary ----------------------------------------------------------
def write(path, rows):
    with open(path, "a") as fh:
        for r in rows:
            fh.write(json.dumps(r) + "\n")


def test_feed_is_incremental_and_ignores_half_written_lines(tmp_path):
    f = tmp_path / "signals.jsonl"
    assert read_feed(f, None)["rows"] == []
    write(f, [{"t": 1, "action": "hold"}, {"t": 2, "action": "enter"}])
    first = read_feed(f, None)
    assert [r["t"] for r in first["rows"]] == [1, 2]
    with open(f, "a") as fh:
        fh.write('{"t": 3, "act')                    # the bot is mid-write
    again = read_feed(f, first["pos"])
    assert again["rows"] == [] and again["pos"] == first["pos"]
    with open(f, "a") as fh:
        fh.write('ion": "exit"}\n')
    assert [r["t"] for r in read_feed(f, first["pos"])["rows"]] == [3]
    assert read_feed(f, 10 ** 9)["rows"][0]["t"] == 1    # file replaced: start over


def test_summary_counts_matches_and_hedges(tmp_path):
    f = tmp_path / "signals.jsonl"
    write(f, [{"t": 0, "action": "enter"}, {"t": 0, "action": "exit", "locked": 12.0},
              {"t": 0, "event": "finished", "pnl": 12.0, "trades": 1, "match": "a"},
              {"t": 10 ** 10, "action": "exit", "locked": -5.0},
              {"t": 10 ** 10, "event": "stopped", "pnl": -5.0, "trades": 1, "match": "b"}])
    s = summarize(f, now=10 ** 10)
    assert (s["matches"], s["trades"], s["entries"], s["hedges"], s["green_hedges"]) == (2, 2, 1, 2, 1)
    assert s["pnl"] == 7.0 and s["today_pnl"] == -5.0 and s["recent"][0]["match"] == "b"


# ---- the server over HTTP ------------------------------------------------------
@pytest.fixture
def server(tmp_path):
    store = PasswordStore(tmp_path / "pw.json")
    store.set(PW)
    sig = tmp_path / "signals.jsonl"
    write(sig, [{"t": 1, "action": "enter", "team_a": "A"}])
    srv = make_server(sig, "127.0.0.1", 0, store)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield srv.server_address[1]
    srv.shutdown()


def req(port, method, path, body=None, headers=None):
    c = http.client.HTTPConnection("127.0.0.1", port, timeout=10)
    h = {"Content-Type": "application/x-www-form-urlencoded", **(headers or {})}
    c.request(method, path, body=body, headers=h)
    r = c.getresponse()
    return r.status, dict(r.getheaders()), r.read()


def login(port, password=PW, origin=None):
    h = {"Origin": origin} if origin else {}
    return req(port, "POST", "/login", f"password={password}", h)


def test_server_requires_password_file(tmp_path):
    with pytest.raises(RuntimeError):
        make_server(tmp_path / "s.jsonl", store=PasswordStore(tmp_path / "none.json"))


def test_everything_but_login_needs_a_session(server):
    assert req(server, "GET", "/")[0] == 303
    st, _, body = req(server, "GET", "/api/feed")
    assert st == 401 and b"signal" not in body
    assert req(server, "GET", "/api/summary")[0] == 401
    assert req(server, "GET", "/login")[0] == 200
    assert req(server, "GET", "/static/app.js")[0] == 200
    assert req(server, "GET", "/static/../server.py")[0] in (303, 404)


def test_login_logout_flow_and_cookie_flags(server):
    st, h, _ = login(server, "nope-nope-nope")
    assert st == 303 and h["Location"] == "/login?failed=1" and "Set-Cookie" not in h
    st, h, _ = login(server, origin=f"http://127.0.0.1:{server}")
    assert st == 303 and h["Location"] == "/"
    cookie = h["Set-Cookie"]
    assert "HttpOnly" in cookie and "SameSite=Strict" in cookie
    tok = cookie.split(";")[0]
    st, _, body = req(server, "GET", "/api/feed", headers={"Cookie": tok})
    assert st == 200 and json.loads(body)["rows"][0]["action"] == "enter"
    assert req(server, "GET", "/api/feed?pos=abc", headers={"Cookie": tok})[0] == 400
    assert req(server, "POST", "/logout", "", {"Cookie": tok})[0] == 303
    assert req(server, "GET", "/api/feed", headers={"Cookie": tok})[0] == 401


def test_cross_site_post_refused(server):
    assert login(server, origin="http://evil.example")[0] == 403
    assert login(server, origin="null")[0] == 403


def test_lockout_after_repeated_wrong_passwords(server):
    for _ in range(5):
        login(server, "wrong-password-x")
    st, h, _ = login(server)                          # right password, but locked out
    assert st == 303 and h["Location"].startswith("/login?locked=")


def test_security_headers(server):
    _, h, _ = req(server, "GET", "/login")
    assert "default-src 'self'" in h["Content-Security-Policy"]
    assert h["X-Frame-Options"] == "DENY" and h["X-Content-Type-Options"] == "nosniff"
    assert h["Cache-Control"] == "no-store"


def test_bot_writes_signals_the_dashboard_can_read(bundle, tmp_path):
    from test_exchange import FakeExchange, frames, make_bot
    ex = FakeExchange(frames([0.45] * 3 + [0.6, 0.8]))
    bot = make_bot(bundle, ex, mode="advise", tmp=tmp_path)
    bot.signals_path = tmp_path / "signals.jsonl"
    for _ in range(5):
        bot.step()
    rows = read_feed(tmp_path / "signals.jsonl", None)["rows"]
    assert len(rows) == 5
    acts = [r["action"] for r in rows]
    assert "enter" in acts and "exit" in acts
    opened = rows[acts.index("enter")]
    assert opened["edge"] == pytest.approx(opened["p_model"] - opened["p_market"], abs=1e-3)
    assert {"team_a", "team_b", "score", "back", "lay", "back_b", "lay_b", "realised"} <= set(opened)
    held = rows[acts.index("enter") + 1]
    assert "pos_if_a_wins" in held and "locked_now" in held

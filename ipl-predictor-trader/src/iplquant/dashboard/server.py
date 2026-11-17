"""The dashboard web server (standard library only).

Routes
------
GET  /            dashboard page, or a redirect to /login
GET  /login       login page
POST /login       check password, set session cookie
POST /logout      end session
GET  /api/feed    new signal lines since a byte position
GET  /api/summary totals over the whole signals file
GET  /static/...  the page's own CSS and JavaScript (fixed list, no file paths from the URL)
"""
from __future__ import annotations

import json
import sys
import time
from http import cookies
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from .auth import PasswordStore, Sessions, Throttle

STATIC = Path(__file__).parent / "static"
FILES = {
    "/static/app.css": ("app.css", "text/css; charset=utf-8"),
    "/static/app.js": ("app.js", "text/javascript; charset=utf-8"),
    "/static/login.js": ("login.js", "text/javascript; charset=utf-8"),
}
COOKIE = "iq_session"
MAX_BODY = 4096
FEED_CHUNK = 512 * 1024
HEADERS = {
    "Content-Security-Policy": ("default-src 'self'; script-src 'self'; style-src 'self'; "
                                "img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; "
                                "base-uri 'none'; form-action 'self'"),
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    # same-origin (not no-referrer): with no-referrer, Chrome sends "Origin: null" on
    # form posts, which the cross-site check below would then refuse.
    "Referrer-Policy": "same-origin",
    "Cache-Control": "no-store",
}


def read_feed(path: Path, pos: int | None) -> dict:
    """Complete JSON lines after byte ``pos``. With no ``pos``, the last ~512 KB."""
    if not path.exists():
        return {"pos": 0, "rows": [], "size": 0}
    size = path.stat().st_size
    if pos is None:
        pos = max(size - FEED_CHUNK, 0)
        skip_partial = pos > 0
    else:
        skip_partial = False
        if pos > size:            # file was replaced or truncated: start again
            pos = 0
    with open(path, "rb") as fh:
        fh.seek(pos)
        chunk = fh.read(FEED_CHUNK)
    if skip_partial:
        nl = chunk.find(b"\n")
        chunk, pos = (chunk[nl + 1:], pos + nl + 1) if nl >= 0 else (b"", pos)
    end = chunk.rfind(b"\n")
    if end < 0:
        return {"pos": pos, "rows": [], "size": size}
    rows = []
    for line in chunk[:end].splitlines():
        try:
            rows.append(json.loads(line))
        except ValueError:
            continue
    return {"pos": pos + end + 1, "rows": rows, "size": size}


def summarize(path: Path, now: float | None = None) -> dict:
    """Finished matches and money, overall and since local midnight."""
    now = now or time.time()
    lt = time.localtime(now)
    midnight = time.mktime((lt.tm_year, lt.tm_mon, lt.tm_mday, 0, 0, 0, 0, 0, -1))
    out = {"matches": 0, "trades": 0, "pnl": 0.0, "today_pnl": 0.0, "today_matches": 0,
           "entries": 0, "hedges": 0, "green_hedges": 0, "recent": []}
    if not path.exists():
        return out
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            try:
                r = json.loads(line)
            except ValueError:
                continue
            act = r.get("action")
            if act == "enter":
                out["entries"] += 1
            elif act == "exit":
                out["hedges"] += 1
                out["green_hedges"] += 1 if (r.get("locked") or 0) > 0 else 0
            if r.get("event") in ("finished", "stopped"):
                pnl = float(r.get("pnl") or 0.0)
                out["matches"] += 1
                out["trades"] += int(r.get("trades") or 0)
                out["pnl"] += pnl
                if r.get("t", 0) >= midnight:
                    out["today_pnl"] += pnl
                    out["today_matches"] += 1
                out["recent"].append({"t": r.get("t"), "match": r.get("match"), "pnl": pnl,
                                      "event": r["event"], "mode": r.get("mode")})
    out["recent"] = out["recent"][-20:][::-1]
    return out


class Handler(BaseHTTPRequestHandler):
    server_version = "iplquant"
    sys_version = ""
    # set by make_server
    store: PasswordStore
    sessions: Sessions
    throttle: Throttle
    signals: Path
    secure_cookie: bool = False

    # ---- plumbing ------------------------------------------------------------
    def log_message(self, fmt, *args):  # quiet: only security events are printed
        pass

    def _send(self, code: int, body: bytes = b"", ctype: str = "text/plain; charset=utf-8",
              extra: dict | None = None) -> None:
        self.send_response(code)
        for k, v in HEADERS.items():
            self.send_header(k, v)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _json(self, obj, code: int = 200) -> None:
        self._send(code, json.dumps(obj, default=str).encode(), "application/json")

    def _redirect(self, to: str, extra: dict | None = None) -> None:
        self._send(303, b"", extra={"Location": to, **(extra or {})})

    def _token(self) -> str | None:
        c = cookies.SimpleCookie()
        try:
            c.load(self.headers.get("Cookie", ""))
        except cookies.CookieError:
            return None
        m = c.get(COOKIE)
        return m.value if m else None

    def _authed(self) -> bool:
        return self.sessions.valid(self._token())

    def _ip(self) -> str:
        return self.client_address[0]

    def _same_origin(self) -> bool:
        """Reject cross-site form posts. Browsers send Origin on POST."""
        origin = self.headers.get("Origin")
        if origin is None:
            return True                      # non-browser clients; cookie is SameSite=Strict anyway
        host = self.headers.get("Host", "")
        return urlsplit(origin).netloc == host

    def _cookie(self, value: str, max_age: int) -> str:
        flags = f"{COOKIE}={value}; Path=/; HttpOnly; SameSite=Strict; Max-Age={max_age}"
        return flags + ("; Secure" if self.secure_cookie else "")

    def _page(self, name: str) -> None:
        self._send(200, (STATIC / name).read_bytes(), "text/html; charset=utf-8")

    # ---- routes --------------------------------------------------------------
    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        url = urlsplit(self.path)
        if url.path in FILES:
            name, ctype = FILES[url.path]
            return self._send(200, (STATIC / name).read_bytes(), ctype)
        if url.path == "/login":
            return self._redirect("/") if self._authed() else self._page("login.html")
        if not self._authed():
            if url.path.startswith("/api/"):
                return self._json({"error": "not logged in"}, 401)
            return self._redirect("/login")
        if url.path == "/":
            return self._page("index.html")
        if url.path == "/api/feed":
            q = parse_qs(url.query)
            pos = q.get("pos", [None])[0]
            if pos is not None:
                if not pos.isdigit() or len(pos) > 15:
                    return self._json({"error": "bad pos"}, 400)
                pos = int(pos)
            return self._json(read_feed(self.signals, pos))
        if url.path == "/api/summary":
            return self._json(summarize(self.signals))
        return self._send(404, b"not found")

    def do_POST(self):
        url = urlsplit(self.path)
        if not self._same_origin():
            return self._send(403, b"cross-site request refused")
        length = int(self.headers.get("Content-Length") or 0)
        if length > MAX_BODY:
            return self._send(413, b"too large")
        body = self.rfile.read(length).decode("utf-8", "replace") if length else ""
        if url.path == "/login":
            ip = self._ip()
            wait = self.throttle.blocked(ip)
            if wait > 0:
                print(f"[dashboard] login refused from {ip}: locked out", file=sys.stderr)
                return self._redirect(f"/login?locked={int(wait) + 1}")
            password = parse_qs(body).get("password", [""])[0]
            if self.store.verify(password):
                self.throttle.ok(ip)
                token = self.sessions.create()
                return self._redirect("/", {"Set-Cookie": self._cookie(token, 12 * 3600)})
            self.throttle.fail(ip)
            print(f"[dashboard] failed login from {ip}", file=sys.stderr)
            return self._redirect("/login?failed=1")
        if url.path == "/logout":
            self.sessions.revoke(self._token())
            return self._redirect("/login", {"Set-Cookie": self._cookie("", 0)})
        return self._send(404, b"not found")


def make_server(signals: str | Path, host: str = "127.0.0.1", port: int = 8800,
                store: PasswordStore | None = None, certfile: str | None = None,
                keyfile: str | None = None) -> ThreadingHTTPServer:
    store = store or PasswordStore()
    if not store.is_set:
        raise RuntimeError("no dashboard password set - run `ipl dashboard --set-password` first")
    handler = type("BoundHandler", (Handler,), {
        "store": store, "sessions": Sessions(), "throttle": Throttle(),
        "signals": Path(signals), "secure_cookie": bool(certfile)})
    srv = ThreadingHTTPServer((host, port), handler)
    if certfile:
        import ssl
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        ctx.load_cert_chain(certfile, keyfile)
        srv.socket = ctx.wrap_socket(srv.socket, server_side=True)
    return srv

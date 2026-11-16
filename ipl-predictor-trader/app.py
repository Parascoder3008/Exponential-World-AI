"""Streamlit dashboard:  streamlit run app.py"""
from __future__ import annotations

import json
from pathlib import Path

import pandas as pd
import streamlit as st

from iplquant import odds as O
from iplquant.models import Bundle, train_bundle
from iplquant.trader import TraderConfig, advise

ROOT = Path(__file__).parent
CURRENT_TEAMS = [
    "Chennai Super Kings", "Delhi Capitals", "Gujarat Titans", "Kolkata Knight Riders",
    "Lucknow Super Giants", "Mumbai Indians", "Punjab Kings", "Rajasthan Royals",
    "Royal Challengers Bengaluru", "Sunrisers Hyderabad",
]

st.set_page_config(page_title="IPL predictor and trader", layout="wide")


@st.cache_resource(show_spinner="Loading model (first run trains it, about 15 seconds)...")
def load_bundle() -> Bundle:
    try:
        return Bundle.load()
    except FileNotFoundError:
        b = train_bundle()
        b.save()
        return b


bundle = load_bundle()
venues = sorted(bundle.state.venue_first.keys())

st.title("IPL predictor and trader")
st.caption(f"Model trained on every IPL match through {bundle.trained_through}. "
           "Probabilities are model estimates, not guarantees. Nothing here places a bet.")

with st.sidebar:
    st.header("Trading settings")
    bankroll = st.number_input("Bankroll", min_value=100.0, value=100_000.0, step=1000.0)
    commission = st.slider("Exchange commission", 0.0, 0.10, 0.05, 0.005)
    entry_edge = st.slider("Open a trade at this edge (probability points)", 1, 15, 4) / 100
    exit_edge = st.slider("Hedge when edge falls below", 0, 5, 1) / 100
    stop_loss = st.slider("Stop loss (share of money at risk)", 0.1, 1.0, 0.5, 0.05)
    kelly = st.slider("Kelly fraction", 0.05, 1.0, 0.25, 0.05)
    max_risk = st.slider("Max risk per trade (% of bankroll)", 0.5, 10.0, 2.0, 0.5) / 100
    cfg = TraderConfig(commission=commission, entry_edge=entry_edge, exit_edge=exit_edge,
                       stop_loss=stop_loss, kelly_fraction=kelly, max_risk_frac=max_risk)

live, pre, calc, rep = st.tabs(["Live match", "Before the match", "Hedge and arbitrage", "How good is it?"])

# ---- live ------------------------------------------------------------------
with live:
    c1, c2, c3 = st.columns(3)
    batting = c1.selectbox("Batting now", CURRENT_TEAMS, index=5)
    bowling = c2.selectbox("Bowling now", [t for t in CURRENT_TEAMS if t != batting])
    venue = c3.selectbox("Venue", venues, index=venues.index("Wankhede Stadium") if "Wankhede Stadium" in venues else 0)
    c1, c2, c3, c4, c5 = st.columns(5)
    innings = c1.radio("Innings", (1, 2), horizontal=True)
    score = c2.number_input("Score", 0, 400, 86)
    wickets = c3.number_input("Wickets down", 0, 9, 2)
    over = c4.number_input("Overs completed", 0, 19, 10)
    ball = c5.number_input("Balls into this over", 0, 5, 0)
    target = line = None
    if innings == 2:
        target = st.number_input("Target (runs needed to win in total)", 1, 400, 185)
    else:
        line = st.number_input("Innings-runs line to price (optional, 0 = skip)", 0.0, 400.0, 0.0, 0.5) or None

    first = batting if innings == 1 else bowling
    pm = bundle.prematch_prob(batting, bowling, venue, first, "bat")
    balls = int(over) * 6 + int(ball)
    if innings == 2 and score >= target:
        p = 1.0
    else:
        p = bundle.inplay_prob(innings, score, wickets, balls, pm["p_team1"], pm["par"], target)
    pc = min(max(p, 1e-4), 1 - 1e-4)

    m1, m2, m3, m4 = st.columns(4)
    m1.metric(f"{batting} win", f"{p*100:.1f}%", help=f"Fair odds {O.fair_odds(pc):.2f}")
    m2.metric(f"{bowling} win", f"{(1-p)*100:.1f}%", help=f"Fair odds {O.fair_odds(1-pc):.2f}")
    m3.metric("Par first-innings score here", f"{pm['par']:.0f}")
    if innings == 1:
        tot = bundle.innings_total(score, wickets, balls, pm["p_team1"], pm["par"], line)
        m4.metric("Projected total", f"{tot['expected_total']:.0f}",
                  help=f"Typical miss: plus or minus {tot['sd']:.0f} runs")
        if line:
            st.write(f"Chance the innings finishes **over {line}**: {tot['p_over']*100:.1f}% "
                     f"(fair odds over {O.fair_odds(min(max(tot['p_over'],1e-4),1-1e-4)):.2f}, "
                     f"under {O.fair_odds(min(max(1-tot['p_over'],1e-4),1-1e-4)):.2f})")
    else:
        need = target - score
        m4.metric("Needs", f"{need:.0f} off {120-balls}")

    st.subheader(f"Trade on {batting}")
    c1, c2, c3 = st.columns(3)
    back = c1.number_input(f"Price to back {batting}", 1.01, 1000.0, round(max(O.fair_odds(pc) * 1.0, 1.02), 2), 0.01)
    lay = c2.number_input(f"Price to lay {batting}", 1.01, 1000.0, round(max(O.fair_odds(pc) * 1.01, 1.03), 2), 0.01)
    pos_text = c3.text_input(f"Your open bets on {batting}", "", placeholder="back@2.50x1000, lay@2.10x400")
    try:
        pos = O.Position()
        for part in [x for x in pos_text.split(",") if x.strip()]:
            side, rest = part.strip().split("@")
            price, stake = rest.split("x")
            pos.add(O.Bet(side.strip(), float(price), float(stake)))
        risk = pos.bets[0].liability if pos.bets else 0.0
        if lay < back:
            st.warning("The lay price is normally at or above the back price. Check the two prices.")
        a = advise(pc, back, lay, bankroll, cfg, pos, risk)
        if a["action"] == "enter":
            st.success(f"**Open: {a['side'].upper()} {batting} at {a['odds']:.2f}, stake {a['stake']:,.0f}** "
                       f"(money at risk {a['liability']:,.0f}). Model {pc*100:.1f}% vs market "
                       f"{a['market_prob_a_mid']*100:.1f}%, edge {a['edge']*100:.1f} points.")
        elif a["action"] == "exit":
            locked = a["locked_if_hedged_now"]
            colour = st.success if locked > 0 else st.error
            colour(f"**Hedge now: {a['side'].upper()} {batting} at {a['odds']:.2f}, stake {a['stake']:,.0f}** "
                   f"({a['reason']}). Result either way after commission: {locked:+,.0f} "
                   f"({'green on both outcomes' if locked > 0 else 'red on both outcomes - this locks in a loss'}).")
        elif pos.bets:
            st.info(f"**Hold.** Edge of {a['edge']*100:.1f} points remains. Hedging now would lock "
                    f"{a['locked_if_hedged_now']:+,.0f} either way.")
        else:
            st.info(f"**No trade.** Model {pc*100:.1f}% vs market {a['market_prob_a_mid']*100:.1f}%: "
                    f"the gap is below your {entry_edge*100:.0f}-point entry bar.")
    except (ValueError, IndexError):
        st.error("Could not read the open bets. Use the form back@2.50x1000, lay@2.10x400")

# ---- pre-match ---------------------------------------------------------------
with pre:
    st.warning("Measured on 2021-2026, this pre-match model is no better than a coin flip "
               "(see the last tab). Treat these numbers as a prior for the live model, "
               "not as something to bet on.")
    c1, c2, c3 = st.columns(3)
    t1 = c1.selectbox("Team 1", CURRENT_TEAMS, index=0, key="t1")
    t2 = c2.selectbox("Team 2", [t for t in CURRENT_TEAMS if t != t1], key="t2")
    v = c3.selectbox("Venue", venues, key="v")
    c1, c2 = st.columns(2)
    tw = c1.selectbox("Toss winner", ["Not known yet", t1, t2])
    td = c2.selectbox("Toss decision", ["bat", "field"])
    r = bundle.prematch_prob(t1, t2, v, None if tw == "Not known yet" else tw, td)
    c1, c2, c3 = st.columns(3)
    c1.metric(t1, f"{r['p_team1']*100:.1f}%", help=f"Fair odds {O.fair_odds(r['p_team1']):.2f}")
    c2.metric(t2, f"{r['p_team2']*100:.1f}%", help=f"Fair odds {O.fair_odds(r['p_team2']):.2f}")
    c3.metric("Par first-innings score", f"{r['par']:.0f}")
    st.caption("Squads are taken from each side's most recent playing XI in the data.")

# ---- calculators -------------------------------------------------------------
with calc:
    left, right = st.columns(2)
    with left:
        st.subheader("Hedge an open bet")
        side = st.radio("You", ("backed", "laid"), horizontal=True)
        o1 = st.number_input("at price", 1.01, 1000.0, 2.50, 0.01)
        s1 = st.number_input("with stake", 1.0, 1e9, 1000.0, 100.0)
        b2 = st.number_input("Current price to back", 1.01, 1000.0, 1.98, 0.01)
        l2 = st.number_input("Current price to lay", 1.01, 1000.0, 2.00, 0.01)
        p0 = O.Position().add(O.Bet("back" if side == "backed" else "lay", o1, s1))
        h = p0.hedge(b2, l2)
        net = p0.locked(b2, l2, commission)
        st.write(f"Place: **{h.side.upper()} at {h.odds:.2f}, stake {h.stake:,.2f}** "
                 f"(liability {h.liability:,.2f})")
        (st.success if net > 0 else st.error)(
            f"Result either way after {commission*100:.1f}% commission: **{net:+,.2f}** - "
            f"{'green on both outcomes' if net > 0 else 'red on both outcomes'}")
    with right:
        st.subheader("Arbitrage between two bookmakers")
        oa = st.number_input("Best price on team A", 1.01, 1000.0, 2.10, 0.01)
        ob = st.number_input("Best price on team B (at a different bookmaker)", 1.01, 1000.0, 2.06, 0.01)
        tot_stake = st.number_input("Total to stake", 1.0, 1e9, 1000.0, 100.0)
        arb = O.arbitrage(oa, ob, tot_stake)
        if arb["is_arb"]:
            st.success(f"Arbitrage: stake **{arb['stake_a']:,.2f} on A** and **{arb['stake_b']:,.2f} on B**. "
                       f"Returns {arb['payout']:,.2f} whoever wins: profit **{arb['profit']:+,.2f}** "
                       f"({arb['roi']*100:.2f}%).")
        else:
            st.info(f"No arbitrage: the two prices imply {arb['book_sum']*100:.1f}% (needs to be under 100%). "
                    f"Splitting {tot_stake:,.0f} to equalise would lose {-arb['profit']:,.2f} either way.")
        st.caption("Bookmakers limit or close accounts that do this, and can void a bet after "
                   "the other side is already placed.")

# ---- report ------------------------------------------------------------------
with rep:
    path = ROOT / "reports" / "metrics.json"
    if not path.exists():
        st.info("Run `ipl evaluate` to generate the evaluation report.")
    else:
        m = json.loads(path.read_text())
        st.caption(f"Walk-forward on seasons {m['test_seasons'][0]}-{m['test_seasons'][-1]}: every season "
                   "is predicted by models trained only on earlier seasons.")
        a, b, c = st.columns(3)
        a.metric("Pre-match accuracy (after toss)", f"{m['prematch']['model_after_toss']['accuracy']*100:.1f}%")
        a.caption("A coin flip scores 50%.")
        b.metric("In-play log loss (lower is better)", f"{m['inplay']['model']['log_loss']:.3f}")
        b.caption(f"Reference-repo approach: {m['inplay']['reference_repo_style_baseline']['log_loss']:.3f}. "
                  "Ignoring the scoreboard: 0.693.")
        c.metric("Innings total error", f"{m['totals']['mae']:.1f} runs")
        c.caption("Average miss when projecting the first-innings total.")
        st.subheader("Is a 70% call right 70% of the time?")
        cal = pd.DataFrame(m["inplay"]["calibration"])
        cal["Model said"] = (cal["predicted"] * 100).round(1)
        cal["Actually won"] = (cal["observed"] * 100).round(1)
        st.line_chart(cal.assign(Perfect=cal["Model said"]).set_index("Model said")[["Actually won", "Perfect"]],
                      x_label="Model said (%)", y_label="Batting side won (%)")
        st.subheader("Trading rule against simulated markets")
        st.warning("Simulated prices, not real odds. This shows how the outcome depends on how "
                   "sharp the market is. It is not evidence of profit.")
        g = pd.DataFrame(m["trading"]["simulated_market_grid"])
        show = g[["scenario", "market_logloss", "model_logloss", "trades", "roi_on_risk_pct",
                  "green_both_sides_pct", "red_both_sides_pct", "prob_profit_pct"]].round(3)
        show.columns = ["Simulated market", "Market log loss", "Model log loss", "Trades",
                        "ROI on risk %", "Green both sides %", "Red both sides %", "Chance of profit %"]
        st.dataframe(show, hide_index=True, use_container_width=True)

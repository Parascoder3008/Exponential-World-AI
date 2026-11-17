(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const MAX_ROWS = 4000, MAX_SHOWN = 300, BANNER_SECS = 90;
  const TRADE_ACTIONS = new Set(['enter', 'exit', 'start', 'stopped']);
  const FAILED = new Set(['order not filled', 'hedge not filled; will retry']);
  // "A 155/8 (20.0) | B 161/5 (18.0) Target 156" -> "B 161/5 (18.0) Target 156"
  const shortScore = (s) => (s ? String(s).split('|').pop().trim() : '');
  let pos = null, rows = [], filter = 'trades', soundOn = false, lastBeep = 0, dirty = true;

  try { soundOn = localStorage.getItem('iq-sound') === '1'; } catch (e) { /* private mode */ }
  try { filter = localStorage.getItem('iq-filter') || 'trades'; } catch (e) { /* ignore */ }

  // ---- formatting ---------------------------------------------------------
  const pct = (p) => (p == null ? '-' : (p * 100).toFixed(1) + '%');
  const money = (v) => (v == null ? '-' : (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2));
  const price = (v) => (v == null ? '-' : Number(v).toFixed(2));
  const edgeTxt = (e) => (e == null ? '-' : (e > 0 ? '+' : e < 0 ? '−' : '') + Math.abs(e * 100).toFixed(1));
  const sign = (el, v) => { el.classList.toggle('pos', v > 0); el.classList.toggle('neg', v < 0); };
  const clock = (t) => new Date(t * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const verb = { advise: 'Place now', paper: 'Paper trade', execute: 'Placed by bot' };

  const REASONS = {
    'no edge': 'no edge', 'edge remains': 'holding, edge remains', 'entry blocked': 'entry blocked',
    'innings break': 'innings break', 'no price': 'no price on the page',
    'price moved but the score did not': 'price moved before the score: waiting',
    'no score yet': 'score not readable yet', 'order not filled': 'order not filled',
    'daily loss limit reached': 'daily loss limit reached: no new positions',
  };

  function describe(r) {
    const a = r.action, side = (r.side || '').toUpperCase();
    if (a === 'enter') return { cls: 'sig-open', text: `Open: ${side} ${r.team_a} @ ${price(r.odds)}, stake ${Number(r.stake).toFixed(2)}` };
    if (a === 'exit') return { cls: r.locked > 0 ? 'pos' : 'neg',
      text: `Hedge (${r.reason}): ${side} ${r.team_a} @ ${price(r.odds)}, stake ${Number(r.stake).toFixed(2)} → ${money(r.locked)} either way` };
    if (r.event === 'finished') return { cls: r.pnl > 0 ? 'pos' : r.pnl < 0 ? 'neg' : '',
      text: `Match over: ${r.team_a} ${r.a_won ? 'won' : 'lost'}. ${r.trades} trade(s), ${money(r.pnl)}` };
    if (r.event === 'stopped') return { cls: '', text: `Stopped (${r.why || r.reason}). ${r.flat ? 'Flat' : 'NOT flat: hedge by hand'}, ${money(r.pnl)}` };
    if (r.event === 'start') return { cls: '', text: `Bot started in ${r.mode} mode` };
    const why = r.reason || '';
    const nice = REASONS[why] || (why.startsWith('score is') ? why + ': waiting' : why);
    return { cls: 'sig-hold', text: 'Hold: ' + nice };
  }

  // ---- rendering ----------------------------------------------------------
  function setRow(tr, team, model, market, back, lay) {
    const td = tr.children;
    td[0].textContent = team || '-';
    td[1].textContent = pct(model);
    td[2].textContent = pct(market);
    const e = model != null && market != null ? model - market : null;
    td[3].textContent = edgeTxt(e);
    sign(td[3], e);
    td[4].textContent = price(back);
    td[5].textContent = price(lay);
  }

  function renderMatch(last, matchRows) {
    $('mode').textContent = last.mode || '';
    $('title').textContent = `${last.team_a} v ${last.team_b}` + (last.league ? `  ·  ${String(last.league).toUpperCase()}` : '');
    $('score').textContent = last.score || 'No score on the page';
    $('score').classList.toggle('muted', !last.score);
    const lastPriced = [...matchRows].reverse().find((r) => r.p_market != null) || {};
    const pm = lastPriced.p_model, pk = lastPriced.p_market;
    setRow($('row-a'), last.team_a, pm, pk, lastPriced.back, lastPriced.lay);
    // Team B: the mirror image of A's probabilities, with its own prices from the page.
    setRow($('row-b'), last.team_b, pm == null ? null : 1 - pm, pk == null ? null : 1 - pk,
           lastPriced.back_b, lastPriced.lay_b);
    $('state').textContent = last.innings ? `Innings ${last.innings}` + (last.target ? ` · target ${last.target}` : '') : '';

    // position
    if (last.pos_if_a_wins != null) {
      $('pos').textContent = money(last.locked_now) + ' if hedged';
      sign($('pos'), last.locked_now);
      $('pos-sub').textContent = `${last.team_a} wins ${money(last.pos_if_a_wins)} · loses ${money(last.pos_if_a_loses)}`;
    } else {
      $('pos').textContent = 'Flat'; $('pos').classList.remove('pos', 'neg');
      $('pos-sub').textContent = 'No open bet';
    }
    $('match-pnl').textContent = money(last.realised || 0);
    sign($('match-pnl'), last.realised || 0);
    const acts = matchRows.filter((r) => r.action === 'enter').length;
    $('match-sub').textContent = `${acts} position(s) opened`;

    // chart: side batting first, model vs market
    const pts = matchRows.filter((r) => r.p_market != null);
    const n = pts.length;
    const line = (key) => pts.map((r, i) => r[key] == null ? null :
      `${(n < 2 ? 0 : (i / (n - 1)) * 600).toFixed(1)},${(120 - r[key] * 120).toFixed(1)}`).filter(Boolean).join(' ');
    $('line-model').setAttribute('points', line('p_model'));
    $('line-market').setAttribute('points', line('p_market'));
    $('chart-note').textContent = n ? `· ${last.team_a} win chance, ${n} readings` : '';
  }

  function renderBanner(matchRows) {
    const now = Date.now() / 1000;
    const act = [...matchRows].reverse().find((r) => r.action === 'enter' || r.action === 'exit');
    const ended = act && matchRows.some((r) => r.t >= act.t && (r.event === 'finished' || r.event === 'stopped'));
    const fresh = act && !ended && now - act.t < BANNER_SECS;
    $('banner').hidden = !fresh;
    if (!fresh) return;
    const side = (act.side || '').toUpperCase();
    $('banner-label').textContent = `${verb[act.mode] || 'Signal'} · ${act.action === 'enter' ? 'open' : 'hedge'} · ${clock(act.t)}`;
    $('banner-text').textContent = `${side} ${act.team_a} @ ${price(act.odds)}  ·  stake ${Number(act.stake).toFixed(2)}`;
    $('banner-sub').textContent = act.action === 'enter'
      ? `Model ${pct(act.p_model)} vs market ${pct(act.p_market)}`
      : `${act.reason}: locks ${money(act.locked)} whoever wins`;
  }

  function renderFeed() {
    const shown = rows.filter((r) => filter === 'all' || TRADE_ACTIONS.has(r.action) ||
      r.event === 'finished' || FAILED.has(r.reason));
    $('count').textContent = `${shown.length} ${filter === 'all' ? 'signals' : 'trade signals'}`;
    const body = document.createDocumentFragment();
    for (const r of shown.slice(-MAX_SHOWN).reverse()) {
      const tr = document.createElement('tr');
      if (r.action === 'enter' || r.action === 'exit') tr.className = 'act';
      const d = describe(r);
      const e = r.p_model != null && r.p_market != null ? r.p_model - r.p_market : null;
      const add = (text, cls) => {
        const td = document.createElement('td');
        td.textContent = text;
        if (cls) td.className = cls;
        tr.appendChild(td);
        return td;
      };
      add(clock(r.t));
      const sig = add('', 'sig');
      const main = document.createElement('div');
      main.textContent = d.text;
      if (d.cls) main.className = d.cls;
      sig.appendChild(main);
      if (r.score) {
        const sc = document.createElement('div');
        sc.className = 'sig-score';
        sc.textContent = shortScore(r.score);
        sig.appendChild(sc);
      }
      add(pct(r.p_model));
      add(pct(r.p_market));
      sign(add(edgeTxt(e)), e);
      body.appendChild(tr);
    }
    $('feed').replaceChildren(body);
  }

  function renderLive() {
    const el = $('live'), txt = el.querySelector('span');
    const last = rows[rows.length - 1];
    el.classList.remove('on', 'stale');
    if (!last) { txt.textContent = 'No signals yet'; return; }
    const age = Date.now() / 1000 - last.t;
    if (last.event === 'finished' || last.event === 'stopped') { txt.textContent = 'Bot stopped'; return; }
    if (age < 6) { el.classList.add('on'); txt.textContent = 'Live'; }
    else if (age < 120) { el.classList.add('stale'); txt.textContent = `Last signal ${Math.round(age)}s ago`; }
    else { txt.textContent = 'Bot not running'; }
  }

  function render() {
    renderLive();
    const last = rows[rows.length - 1];
    if (last && dirty) {
      const matchRows = rows.filter((r) => r.match === last.match);
      const startIdx = matchRows.map((r) => r.event).lastIndexOf('start');
      const current = startIdx >= 0 ? matchRows.slice(startIdx) : matchRows;
      renderMatch(last, current);
      renderBanner(current);
      renderFeed();
      dirty = false;
    } else if (last) {
      const matchRows = rows.filter((r) => r.match === last.match);
      renderBanner(matchRows);
    }
  }

  // ---- sound ---------------------------------------------------------------
  let audio = null;
  function beep() {
    if (!soundOn) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = 880; g.gain.value = 0.08;
      o.connect(g); g.connect(audio.destination);
      o.start(); o.stop(audio.currentTime + 0.18);
    } catch (e) { /* audio unavailable */ }
  }
  function setSound(on) {
    soundOn = on;
    $('sound').textContent = on ? 'Sound on' : 'Sound off';
    $('sound').setAttribute('aria-pressed', String(on));
    try { localStorage.setItem('iq-sound', on ? '1' : '0'); } catch (e) { /* ignore */ }
  }
  $('sound').addEventListener('click', () => { setSound(!soundOn); if (soundOn) beep(); });
  setSound(soundOn);

  // ---- tabs ----------------------------------------------------------------
  function setFilter(f) {
    filter = f;
    document.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.f === f)));
    try { localStorage.setItem('iq-filter', f); } catch (e) { /* ignore */ }
    renderFeed();
  }
  document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => setFilter(b.dataset.f)));
  setFilter(filter === 'all' ? 'all' : 'trades');

  // ---- data ----------------------------------------------------------------
  async function get(url) {
    const res = await fetch(url, { credentials: 'same-origin', cache: 'no-store' });
    if (res.status === 401) { location.href = '/login'; throw new Error('logged out'); }
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  }

  async function pollFeed() {
    try {
      const data = await get('/api/feed' + (pos == null ? '' : `?pos=${pos}`));
      if (pos != null && data.pos < pos) { rows = []; }         // file restarted
      pos = data.pos;
      if (data.rows.length) {
        const firstLoad = rows.length === 0;
        rows = rows.concat(data.rows).slice(-MAX_ROWS);
        dirty = true;
        if (!firstLoad && data.rows.some((r) => r.action === 'enter' || r.action === 'exit') && Date.now() - lastBeep > 1000) {
          lastBeep = Date.now(); beep();
        }
      }
    } catch (e) { /* keep polling */ }
    render();
    setTimeout(pollFeed, 1000);
  }

  async function pollSummary() {
    try {
      const s = await get('/api/summary');
      $('today').textContent = money(s.today_pnl); sign($('today'), s.today_pnl);
      $('today-sub').textContent = `${s.today_matches} match(es) finished`;
      $('total').textContent = money(s.pnl); sign($('total'), s.pnl);
      $('total-sub').textContent = `${s.matches} matches · ${s.green_hedges}/${s.hedges} hedges green`;
    } catch (e) { /* keep polling */ }
    setTimeout(pollSummary, 10000);
  }

  pollFeed();
  pollSummary();
})();

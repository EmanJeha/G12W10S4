/* School Map Project Lab · Grade 12 · Week 10 · Session 4 · Review + project
   Part 1 (tree review): insert values into a BST, walk it in-order, search it.
   Part 2 (project): draw the MIS school map as a weighted graph, run BFS, plan a route,
   find the shortest path with Dijkstra, close a corridor and find the new route.
   Usage: const lab = mountLab(root, { fs: '18px', height: '640px', onChange() {} }) */
(function () {
  const CSS = `
.sl{--ink:#1B1F3B;font-size:var(--slfs,18px);font-family:Nunito,system-ui,sans-serif;color:var(--ink);display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:.8em;height:var(--slh,640px)}
.sl *{box-sizing:border-box}
.sl-next{grid-column:1/-1;display:flex;align-items:center;gap:.8em;background:linear-gradient(90deg,#fff2c4,#fff7e0);border:3px solid #FFB020;border-radius:1em;padding:.55em .9em;font-weight:800}
.sl-next .tag{background:#FFB020;color:#fff;border-radius:.6em;padding:.25em .6em;font:900 .8em Nunito;letter-spacing:.1em;flex:none}
.sl-next .txt{flex:1;line-height:1.3}
.sl-btn{border:0;border-radius:.65em;padding:.45em .7em;font:800 .85em Nunito;cursor:pointer;background:#fff;color:var(--ink);box-shadow:0 .2em 0 #dfe3f2;white-space:nowrap}
.sl-btn:disabled{opacity:.4;cursor:not-allowed}
.sl-btn.p{background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0}.sl-btn.g{background:#12B886;color:#fff;box-shadow:0 .2em 0 #0b8a62}.sl-btn.r{background:#FF5D73;color:#fff;box-shadow:0 .2em 0 #c43a4e}.sl-btn.o{background:#FFB020;color:#fff;box-shadow:0 .2em 0 #c98600}.sl-btn.v{background:#9B5DE5;color:#fff;box-shadow:0 .2em 0 #6f3bb0}.sl-btn.s{background:#1C9BEF;color:#fff;box-shadow:0 .2em 0 #0f6fb0}
.sl-btn.on{outline:3px solid #14183a;outline-offset:2px}
.sl-board{background:#fff;border-radius:1em;box-shadow:0 .3em 0 #e4e1f5;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.sl-tools{display:flex;gap:.4em;flex-wrap:wrap;padding:.5em .6em;background:#f6f7ff;align-items:center}
.sl-tools .sep{width:2px;height:1.6em;background:#e1e4f3;margin:0 .15em}
.sl-tools .grp{display:flex;gap:.4em;flex-wrap:wrap;align-items:center}
.sl-svg{flex:1;min-height:0;background-image:radial-gradient(#e3e6f5 1.5px,transparent 1.5px);background-size:1.6em 1.6em}
.sl-svg svg{width:100%;height:100%;display:block}
.sl-svg .nd{cursor:pointer}.sl-svg.cut .ed{cursor:crosshair}
.sl-msg{padding:.5em .8em;font:800 .88em/1.35 Nunito;background:#f4f6ff;min-height:2.4em}
.sl-msg.good{background:#dcfbee;color:#0b6a4a}.sl-msg.bad{background:#ffe3e3;color:#a31f1f}.sl-msg.info{background:#fff2d6;color:#8a5b00}
.sl-side{display:flex;flex-direction:column;gap:.6em;min-height:0}
.sl-card{background:#fff;border-radius:1em;padding:.55em .75em;box-shadow:0 .3em 0 #e4e1f5}
.sl-h{font:900 .74em Nunito;letter-spacing:.14em;text-transform:uppercase;color:#5B5BF0;margin-bottom:.35em;display:flex;align-items:center;gap:.5em}
.sl-out{background:#151936;color:#e9ecff;border-radius:.7em;padding:.45em .65em;font:600 .8em/1.45 'JetBrains Mono',monospace;min-height:2.2em;white-space:pre-wrap}
.sl-out .k{color:#c4a7ff}.sl-out .ok{color:#7ee2b8}.sl-out .s{color:#ffd27a}.sl-out .x{color:#ff8a9a}
.sl-q{display:flex;gap:.3em;align-items:center;min-height:2.1em;flex-wrap:wrap}
.sl-q span{min-width:1.9em;height:1.9em;border-radius:.45em;display:grid;place-items:center;color:#fff;font:800 .9em 'Baloo 2',sans-serif;padding:0 .35em}
.sl-q i{font:800 .7em Nunito;color:#9aa0c8;font-style:normal}
.sl-tbl{width:100%;border-collapse:collapse;font:700 .76em Nunito}
.sl-tbl td{padding:.1em .35em;border-top:1px solid #eef0fb}
.sl-tbl tr.fin td{color:#0b7a55}.sl-tbl tr.off td{color:#c43a4e;text-decoration:line-through}
.sl-mis{flex:1;min-height:0;overflow:auto}
.sl-m{display:flex;gap:.45em;align-items:flex-start;padding:.24em 0;border-top:2px solid #f2f3fa;font:700 .8em/1.3 Nunito;color:#4a5078}
.sl-m:first-of-type{border-top:0}
.sl-m .ck{flex:none;width:1.35em;height:1.35em;border-radius:.4em;background:#e7e9f5;color:#fff;display:grid;place-items:center;font-size:.85em}
.sl-m.on{color:#12884f}.sl-m.on .ck{background:#16a34a}.sl-m.cur{color:var(--ink)}.sl-m.cur .ck{background:#FFB020}
.sl-m .sm{border:0;background:#EEF0FF;color:#3730a3;border-radius:.5em;font:800 .78em Nunito;padding:.12em .45em;cursor:pointer;margin-left:auto;flex:none}
@media (max-width:900px){.sl{grid-template-columns:minmax(0,1fr);height:auto}.sl-next{flex-wrap:wrap}.sl-svg{height:20em;flex:none}}
`;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const W = 900, H = 500;
  // ---- Part 1: the BST ----
  const TPOS = { 50: [450, 70], 30: [250, 200], 70: [650, 200], 20: [140, 350], 40: [360, 350], 60: [540, 350], 80: [760, 350] };
  const TPAR = { 30: 50, 70: 50, 20: 30, 40: 30, 60: 70, 80: 70 };
  const INSERT = [30, 70, 20, 40, 60, 80];
  const KIDS = { 50: [30, 70], 30: [20, 40], 70: [60, 80], 20: [], 40: [], 60: [], 80: [] };
  // ---- Part 2: the school map (minutes walking along each corridor) ----
  const ROOMS = { Gate: [80, 250], Office: [250, 100], Canteen: [260, 400], Library: [480, 180], Gym: [500, 420], Class: [690, 80], Lab: [810, 300] };
  const CORR = [['Gate', 'Office', 2], ['Gate', 'Canteen', 4], ['Office', 'Canteen', 1], ['Office', 'Library', 3], ['Canteen', 'Library', 3], ['Canteen', 'Gym', 5], ['Library', 'Class', 2], ['Library', 'Lab', 4], ['Class', 'Lab', 3], ['Gym', 'Lab', 3]];
  const RCOL = { Gate: '#FFB020', Office: '#1C9BEF', Canteen: '#FF5D73', Library: '#5B5BF0', Gym: '#E8337C', Class: '#9B5DE5', Lab: '#12B886' };
  const COL = { base: '#5B5BF0', ok: '#12B886', cur: '#FFB020', seen: '#1C9BEF', path: '#FFB020', tap: '#9B5DE5', bad: '#FF5D73' };
  const MISSIONS = [
    { id: 'ins', t: 'Tree: insert 30, 70, 20, 40, 60 and 80 into the BST (smaller ⬅ left, bigger right ➡)' },
    { id: 'inord', t: 'Tree: run the in-order walk. Are the values in sorted order?' },
    { id: 'find', t: 'Tree: find 60. Tap the path from the root, one node at a time' },
    { id: 'build', t: 'School map: draw all 10 corridors from the table (tap two rooms to join them)' },
    { id: 'bfs', t: 'School map: run BFS from the Gate. Which rooms are in the first layer?' },
    { id: 'route', t: 'School map: plan your own route. Tap rooms from the Gate to the Lab' },
    { id: 'short', t: 'School map: run Dijkstra from the Gate. Is your route the shortest?' },
    { id: 'cut', t: 'School map: close a corridor (✂) and find the new shortest path to the Lab' },
  ];
  window.mountLab = function (root, opts = {}) {
    if (!document.getElementById('sl-css')) { const st = document.createElement('style'); st.id = 'sl-css'; st.textContent = CSS; document.head.appendChild(st); }
    const el = document.createElement('div'); el.className = 'sl'; el.style.setProperty('--slfs', opts.fs || '18px'); el.style.setProperty('--slh', opts.height || '640px');
    el.innerHTML = `<div class="sl-next"><span class="tag">NEXT</span><span class="txt"></span><button class="sl-btn p" data-a="show">▶ Show me</button></div>
      <div class="sl-board"><div class="sl-tools"><button class="sl-btn on" data-g="tree">🌳 Part 1: Tree</button><button class="sl-btn" data-g="map">🏫 Part 2: School map</button><span class="sep"></span>
        <span class="grp tg"><button class="sl-btn p" data-a="left">⬅ Left (smaller)</button><button class="sl-btn p" data-a="right">Right (bigger) ➡</button><button class="sl-btn g" data-a="in">In-order ▶</button><button class="sl-btn" data-a="pre">Pre-order</button><button class="sl-btn" data-a="post">Post-order</button><button class="sl-btn v" data-a="find">🔎 Find 60</button></span>
        <span class="grp mg"><button class="sl-btn g" data-a="bfs">BFS from Gate ▶</button><button class="sl-btn v" data-a="route">📍 My route</button><button class="sl-btn o" data-a="dij">🏁 Shortest path</button><button class="sl-btn r" data-a="cut">✂ Close corridor</button></span>
        <button class="sl-btn" data-a="reset" title="Start this part again">↺</button></div>
      <div class="sl-svg"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg></div><div class="sl-msg"></div></div>
      <div class="sl-side"><div class="sl-card"><div class="sl-h c1h"></div><div class="c1"></div></div>
      <div class="sl-card"><div class="sl-h qlab">Queue / table</div><div class="sl-q qv"><i>nothing yet</i></div></div>
      <div class="sl-card"><div class="sl-h">Output</div><div class="sl-out res"></div></div>
      <div class="sl-card sl-mis"><div class="sl-h">Missions</div><div class="ml"></div></div></div>`;
    root.appendChild(el);
    const $ = (s) => el.querySelector(s), svg = $('svg'), gE = mk('g', {}, svg), gN = mk('g', {}, svg), gL = mk('g', {}, svg);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const q = (s) => `<span class="s">"${s}"</span>`;
    const msg = (t, c = '') => { $('.sl-msg').className = 'sl-msg ' + c; $('.sl-msg').innerHTML = t; };
    const ek = (a, b) => [a, b].sort().join('|');
    let G = 'tree', flags = {}, sticky = new Set(), busy = false, anim = 0, mistakes = 0;
    // tree state
    let placed = new Set([50]), pend = [...INSERT], cmpAt = 50, tState = new Map(), tOrder = new Map(), findPath = null, hiPath = null;
    // map state
    let drawn = new Set(), sel = null, cut = new Set(), cutMode = false, route = null, mState = new Map(), mOrder = new Map(), pathE = new Set();
    const qv = (label, html) => { $('.qlab').textContent = label; $('.qv').innerHTML = html || '<i>nothing yet</i>'; };
    const chips = (items, col) => items.length ? items.map((k) => `<span style="background:${col}">${k}</span>`).join('') : '<i>empty</i>';
    const tw = (w) => `${w} min`;

    // ================= drawing =================
    function nodeAt(p, k, label, x, y, r, fill, extra = {}) {
      const n = mk('g', { class: 'nd', transform: `translate(${x} ${y})` }, gN); n._k = k;
      if (extra.ring) mk('circle', { r: r + 9, fill: 'none', stroke: extra.ring, 'stroke-width': 5, 'stroke-dasharray': extra.dash ? '7 5' : 'none' }, n);
      mk('circle', { r, cy: 5, fill: 'rgba(20,24,58,.14)' }, n);
      mk('circle', { r, fill, stroke: '#fff', 'stroke-width': 5 }, n);
      const t = mk('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', y: 1, 'font-size': extra.fs || 30, 'font-family': 'Baloo 2, sans-serif', 'font-weight': 800, fill: '#fff' }, n); t.textContent = label;
      if (extra.badge != null) { mk('circle', { cx: r - 4, cy: -r + 4, r: 15, fill: '#14183a' }, n); const b = mk('text', { x: r - 4, y: -r + 5, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 16, 'font-weight': 900, fill: '#fff', 'font-family': 'Nunito' }, n); b.textContent = extra.badge; }
      return n;
    }
    function drawTree() {
      [...placed].forEach((v) => { if (TPAR[v]) { const [x1, y1] = TPOS[TPAR[v]], [x2, y2] = TPOS[v]; mk('line', { x1, y1, x2, y2, stroke: (findPath || hiPath) && (findPath || hiPath).includes(v) && (findPath || hiPath).includes(TPAR[v]) ? COL.path : '#b9bfdc', 'stroke-width': 7, 'stroke-linecap': 'round' }, gE); } });
      // empty slots under placed nodes
      Object.keys(TPOS).map(Number).filter((v) => !placed.has(v) && placed.has(TPAR[v])).forEach((v) => { const [x1, y1] = TPOS[TPAR[v]], [x2, y2] = TPOS[v]; mk('line', { x1, y1, x2, y2, stroke: '#e1e4f3', 'stroke-width': 4, 'stroke-dasharray': '8 8' }, gE); mk('circle', { cx: x2, cy: y2, r: 26, fill: 'none', stroke: '#d5d9ee', 'stroke-width': 3, 'stroke-dasharray': '6 6' }, gE); });
      [...placed].forEach((v) => { const [x, y] = TPOS[v]; const s = tState.get(v); nodeAt(gN, v, String(v), x, y, 40, s || (v === 50 ? '#9B5DE5' : COL.base), { ring: pend.length && cmpAt === v ? COL.cur : null, badge: tOrder.get(v) }); });
      if (pend.length) { const [x, y] = TPOS[cmpAt]; const g = mk('g', { transform: `translate(${x + 70} ${y - 34})` }, gL); mk('rect', { x: -6, y: -26, width: 78, height: 50, rx: 14, fill: COL.cur, stroke: '#fff', 'stroke-width': 4 }, g); const t = mk('text', { x: 33, y: 0, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 28, 'font-weight': 800, 'font-family': 'Baloo 2, sans-serif', fill: '#fff' }, g); t.textContent = pend[0] + '?'; }
    }
    function drawMap() {
      const P = ROOMS;
      CORR.forEach(([a, b, w]) => {
        const k = ek(a, b); if (!drawn.has(k)) return; const off = cut.has(k), on = pathE.has(k);
        const e = mk('g', { class: 'ed' }, gE); e._k = k;
        mk('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: 'transparent', 'stroke-width': 30 }, e);
        mk('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: off ? '#ffb3bd' : on ? COL.path : '#b9bfdc', 'stroke-width': on ? 11 : 7, 'stroke-dasharray': off ? '10 10' : 'none', 'stroke-linecap': 'round' }, e);
        const mx = (P[a][0] + P[b][0]) / 2, my = (P[a][1] + P[b][1]) / 2;
        if (off) { const t = mk('text', { x: mx, y: my - 26, 'text-anchor': 'middle', 'font-size': 26 }, e); t.textContent = '✂'; }
        mk('circle', { cx: mx, cy: my, r: 20, fill: '#fff', stroke: on ? COL.path : '#9aa3c4', 'stroke-width': 3 }, e);
        const t = mk('text', { x: mx, y: my + 1, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 21, 'font-weight': 800, 'font-family': 'Nunito', fill: '#14183a' }, e); t.textContent = w;
      });
      const rr = route || showRoute; if (rr && rr.length > 1) for (let i = 0; i < rr.length - 1; i++) { const [x1, y1] = P[rr[i]], [x2, y2] = P[rr[i + 1]]; mk('line', { x1, y1, x2, y2, stroke: COL.tap, 'stroke-width': 6, 'stroke-dasharray': '4 10', 'stroke-linecap': 'round', opacity: .9 }, gL); }
      Object.entries(P).forEach(([k, [x, y]]) => nodeAt(gN, k, k, x, y, 46, mState.get(k) || RCOL[k], { fs: 18, ring: sel === k ? '#14183a' : rr && rr.includes(k) ? COL.tap : null, dash: !!(rr && rr.includes(k)), badge: mOrder.get(k) }));
    }
    function draw() { gE.innerHTML = ''; gN.innerHTML = ''; gL.innerHTML = ''; G === 'tree' ? drawTree() : drawMap(); }

    // ================= side cards =================
    const adjW = () => { const A = {}; Object.keys(ROOMS).forEach((k) => A[k] = []); CORR.forEach(([a, b, w]) => { const k = ek(a, b); if (drawn.has(k) && !cut.has(k)) { A[a].push([b, w]); A[b].push([a, w]); } }); Object.values(A).forEach((l) => l.sort((x, y) => x[0] < y[0] ? -1 : 1)); return A; };
    function side() {
      if (G === 'tree') {
        $('.c1h').innerHTML = `🌳 Insert order <span style="margin-left:auto;color:#6b7096">${INSERT.length - pend.length} / ${INSERT.length}</span>`;
        $('.c1').innerHTML = `<div class="sl-q">${[50, ...INSERT].map((v) => `<span style="background:${placed.has(v) ? COL.ok : v === pend[0] ? COL.cur : '#c9cde6'}">${v}</span>`).join('')}</div><div style="font:800 .75em Nunito;color:#6b7096;margin-top:.35em">Rule: smaller goes LEFT, bigger goes RIGHT · wrong moves: ${mistakes}</div>`;
      } else {
        $('.c1h').innerHTML = `📒 Corridor table <span style="margin-left:auto;color:#6b7096">${drawn.size} / ${CORR.length}</span>`;
        $('.c1').innerHTML = `<table class="sl-tbl">${CORR.map(([a, b, w]) => { const k = ek(a, b); return `<tr class="${cut.has(k) ? 'off' : drawn.has(k) ? 'fin' : ''}"><td>${drawn.has(k) ? '✓' : '○'}</td><td><b>${a}</b> – <b>${b}</b></td><td>${tw(w)}</td></tr>`; }).join('')}</table>`;
      }
    }

    // ================= Part 1: tree =================
    function step(dir) {
      if (G !== 'tree' || !pend.length) return;
      const v = pend[0], want = v < cmpAt ? 'left' : 'right';
      if (dir !== want) { mistakes++; msg(`❌ ${v} is ${v < cmpAt ? 'SMALLER' : 'BIGGER'} than ${cmpAt}, so it goes <b>${want.toUpperCase()}</b>. Try again!`, 'bad'); paint(); return; }
      const kid = KIDS[cmpAt][dir === 'left' ? 0 : 1];
      if (kid === v) { placed.add(v); pend.shift(); cmpAt = 50; msg(pend.length ? `✅ ${v} placed! Next: insert <b>${pend[0]}</b>, starting again at the root 50.` : '🌳 All values inserted! Now press <b>In-order ▶</b>.', 'good'); if (!pend.length) flags.ins = true; }
      else { msg(`✅ ${v} ${dir === 'left' ? '<' : '>'} ${cmpAt}: go ${dir} to <b>${kid}</b>. Compare again.`, 'good'); cmpAt = kid; }
      paint();
    }
    const walk = (kind) => { const out = []; const go = (v) => { if (!placed.has(v)) return; const [l, r] = KIDS[v]; if (kind === 'pre') out.push(v); go(l); if (kind === 'in') out.push(v); go(r); if (kind === 'post') out.push(v); }; go(50); return out; };
    async function trav(kind) {
      if (pend.length) { msg('Insert every value first: the walk needs the whole tree.', 'info'); return; }
      const my = ++anim; tState.clear(); tOrder.clear(); findPath = null; hiPath = null; const o = walk(kind), name = { pre: 'Pre-order (root, left, right)', in: 'In-order (left, root, right)', post: 'Post-order (left, right, root)' }[kind];
      qv(name, ''); for (let i = 0; i < o.length; i++) { if (my !== anim) return; tState.set(o[i], COL.ok); tOrder.set(o[i], i + 1); qv(name, chips(o.slice(0, i + 1), COL.ok)); draw(); await sleep(480); }
      $('.res').innerHTML = `<span class="k">${kind}_order</span>(root)\n→ [${o.join(', ')}]` + (kind === 'in' ? '\n<span class="ok">✓ sorted from smallest to biggest!</span>' : '');
      if (kind === 'in') flags.inord = true;
      msg(kind === 'in' ? '✅ In-order gives <b>20 30 40 50 60 70 80</b>: a BST always comes out SORTED.' : `${name}: ${o.join(' ')}. Compare it with in-order!`, kind === 'in' ? 'good' : 'info'); paint();
    }
    function startFind() { if (pend.length) { msg('Insert every value first, then search.', 'info'); return; } anim++; tState.clear(); tOrder.clear(); hiPath = null; findPath = []; $('[data-a="find"]').classList.add('on'); msg('🔎 Find <b>60</b>: tap the ROOT first, then the child you would visit next.', 'info'); $('.res').innerHTML = '<span class="k">search</span>(60) → path [ ]'; qv('Search path', ''); paint(); }
    function tapTree(v) {
      if (findPath) {
        const want = [50, 70, 60][findPath.length];
        if (v !== want) { mistakes++; msg(findPath.length ? `❌ From ${findPath.at(-1)}: 60 is ${60 < findPath.at(-1) ? 'smaller, go LEFT' : 'bigger, go RIGHT'}. Tap ${want}.` : '❌ A search always starts at the ROOT (50).', 'bad'); paint(); return; }
        findPath.push(v); tState.set(v, v === 60 ? COL.ok : COL.cur); tOrder.set(v, findPath.length); qv('Search path', chips(findPath, COL.cur));
        if (v === 60) { flags.find = true; $('[data-a="find"]').classList.remove('on'); $('.res').innerHTML = `<span class="k">search</span>(60)\n→ 50 → 70 → 60\n<span class="ok">✓ found in 3 comparisons</span>`; msg('🎯 Found 60 in only <b>3 steps</b>. Each step throws away half of the tree!', 'good'); const fp = findPath; findPath = null; hiPath = fp; tState.clear(); fp.forEach((k, i) => { tState.set(k, COL.ok); tOrder.set(k, i + 1); }); }
        else msg(`✅ ${v}. 60 is ${60 < v ? 'smaller' : 'bigger'} than ${v}: tap the next node.`, 'good');
        paint(); return;
      }
      if (pend.length) { msg(`Use the ⬅ Left / Right ➡ buttons to place <b>${pend[0]}</b>. It is being compared with ${cmpAt}.`, 'info'); return; }
      const [l, r] = KIDS[v]; msg(`<b>${v}</b>: ${v === 50 ? 'the ROOT. ' : `parent ${TPAR[v]}. `}${l ? `Children ${l} (left) and ${r} (right).` : 'A LEAF: no children.'}`, 'good');
    }

    // ================= Part 2: school map =================
    function tapRoom(k) {
      if (route) {
        const last = route.at(-1);
        if (!route.length) { if (k !== 'Gate') { msg('📍 Your route must start at the <b>Gate</b>.', 'bad'); return; } route.push(k); }
        else { const A = adjW()[last], hit = A.find(([n]) => n === k); if (!hit) { msg(`🚧 There is no open corridor from ${last} to ${k}. Pick a room joined to ${last}.`, 'bad'); return; } if (route.includes(k)) { msg('↩ You already visited that room. Keep moving forward!', 'info'); return; } route.push(k); }
        const tot = routeTotal(); $('.res').innerHTML = `<span class="k">my_route</span> = ${route.join(' → ')}\n<span class="s">${tot} minutes</span>`; qv('My route', chips(route.map((x) => x.slice(0, 3)), COL.tap));
        if (k === 'Lab') { flags.route = tot; $('[data-a="route"]').classList.remove('on'); msg(`📍 Your route takes <b>${tot} minutes</b>. Now press 🏁 Shortest path: can Dijkstra beat it?`, 'good'); myRoute = route; showRoute = route; route = null; }
        else msg(`📍 ${route.join(' → ')} = ${tot} min. Keep going to the Lab.`, 'info');
        paint(); return;
      }
      if (sel == null) { sel = k; msg(`Joining corridors: <b>${k}</b> selected. Tap the room at the other end.`, 'info'); paint(); return; }
      if (sel === k) { sel = null; msg('Selection cleared.', 'info'); paint(); return; }
      const a = sel; sel = null; const c = CORR.find(([x, y]) => ek(x, y) === ek(a, k));
      if (!c) { msg(`❌ The table has no corridor between <b>${a}</b> and <b>${k}</b>. Check the table!`, 'bad'); mistakes++; paint(); return; }
      if (drawn.has(ek(a, k))) { msg(`${a} – ${k} is already drawn.`, 'info'); paint(); return; }
      drawn.add(ek(a, k)); if (drawn.size === CORR.length) flags.build = true;
      msg(drawn.size === CORR.length ? '🏫 The map is complete: 7 rooms (vertices) and 10 corridors (weighted edges)!' : `✅ Corridor ${a} – ${k} (${tw(c[2])}) added. ${CORR.length - drawn.size} to go.`, 'good'); paint();
    }
    let myRoute = null, showRoute = null;
    const routeTotal = () => { let t = 0; for (let i = 0; i < route.length - 1; i++) t += CORR.find(([x, y]) => ek(x, y) === ek(route[i], route[i + 1]))[2]; return t; };
    const needMap = () => { if (drawn.size < CORR.length) { msg(`Draw all ${CORR.length} corridors first (${drawn.size} so far).`, 'info'); return true; } return false; };
    async function bfs() {
      if (needMap()) return; const my = ++anim; mState.clear(); mOrder.clear(); pathE.clear(); route = null; showRoute = null; const A = adjW();
      const visited = ['Gate'], queue = ['Gate']; mState.set('Gate', COL.seen); mOrder.set('Gate', 1); qv('Queue (BFS) · front → back', chips(queue.map((x) => x.slice(0, 3)), COL.ok)); draw();
      while (queue.length) { if (my !== anim) return; const n = queue.shift(); mState.set(n, COL.cur); qv('Queue (BFS) · front → back', chips(queue.map((x) => x.slice(0, 3)), COL.ok)); draw(); await sleep(600);
        for (const [m] of A[n]) if (!visited.includes(m)) { visited.push(m); queue.push(m); mState.set(m, COL.seen); mOrder.set(m, visited.length); qv('Queue (BFS) · front → back', chips(queue.map((x) => x.slice(0, 3)), COL.ok)); draw(); await sleep(380); }
        mState.set(n, COL.ok); draw(); }
      const miss = Object.keys(ROOMS).filter((k) => !visited.includes(k));
      $('.res').innerHTML = `<span class="k">bfs</span>(${q('Gate')})\n→ [${visited.map(q).join(', ')}]` + (miss.length ? `\n<span class="x">not reached: ${miss.join(', ')}</span>` : '');
      if (!cut.size) flags.bfs = true;
      msg(`✅ BFS layer 1 from the Gate: <b>${A.Gate.map(([n]) => n).join(' and ')}</b>. Full order: ${visited.join(' → ')}.`, 'good'); paint();
    }
    async function dij() {
      if (needMap()) return; const my = ++anim; mState.clear(); mOrder.clear(); pathE.clear(); route = null; showRoute = null; const A = adjW(), keys = Object.keys(ROOMS);
      const dist = {}, from = {}, done = new Set(); keys.forEach((k) => dist[k] = Infinity); dist.Gate = 0;
      const table = () => qv("Dijkstra's table", `<table class="sl-tbl"><tr style="color:#6b7096"><td>Room</td><td>Min</td><td>From</td></tr>${keys.map((k) => `<tr class="${done.has(k) ? 'fin' : ''}"><td><b>${k}</b></td><td>${dist[k] === Infinity ? '∞' : dist[k]}</td><td>${from[k] || '–'}</td></tr>`).join('')}</table>`);
      table(); draw();
      while (done.size < keys.length) { if (my !== anim) return; const u = keys.filter((k) => !done.has(k)).sort((a, b) => dist[a] - dist[b])[0]; if (dist[u] === Infinity) break;
        done.add(u); mState.set(u, COL.cur); table(); draw(); msg(`Visit the closest unvisited room: <b>${u}</b> (${dist[u]} min). Update its neighbours.`, 'info'); await sleep(750);
        for (const [n, w] of A[u]) if (!done.has(n) && dist[u] + w < dist[n]) { dist[n] = dist[u] + w; from[n] = u; mState.set(n, COL.seen); table(); draw(); await sleep(320); }
        mState.set(u, COL.ok); draw(); }
      if (dist.Lab === Infinity) { $('.res').innerHTML = '<span class="x">The Lab cannot be reached!</span>'; msg('🚧 The Lab is cut off. Open a corridor again (✂ then tap it).', 'bad'); paint(); return; }
      const path = []; let c = 'Lab'; while (c) { path.unshift(c); c = from[c]; }
      for (let i = 0; i < path.length - 1; i++) pathE.add(ek(path[i], path[i + 1])); path.forEach((k) => mState.set(k, COL.path));
      $('.res').innerHTML = `<span class="k">shortest</span>(${q('Gate')}, ${q('Lab')})\n→ ${path.join(' → ')}\n<span class="ok">= ${dist.Lab} minutes</span>` + (myRoute && !cut.size ? `\n<span class="s">your route: ${flags.route} min</span>` : '');
      if (!cut.size) flags.short = true; else flags.cut = true;
      const cmp = myRoute && !cut.size ? (flags.route === dist.Lab ? ' 🏆 Your route was already the shortest!' : ` Your route took ${flags.route} min, so Dijkstra saved ${flags.route - dist.Lab} min.`) : '';
      msg(cut.size ? `🚧 With a closed corridor the new shortest path is <b>${path.join(' → ')}</b> = <b>${dist.Lab} min</b>.` : `🏁 Shortest path: <b>${path.join(' → ')}</b> = <b>${dist.Lab} min</b>.${cmp}`, 'good'); paint();
    }

    // ================= missions + paint =================
    const done = (id) => !!flags[id] || (id === 'route' && flags.route != null);
    const tasks = () => MISSIONS.map((m) => { if (done(m.id)) sticky.add(m.id); return [m.t, sticky.has(m.id)]; });
    let nextM = null;
    function paint() {
      draw(); side();
      $('.tg').style.display = G === 'tree' ? 'flex' : 'none'; $('.mg').style.display = G === 'map' ? 'flex' : 'none';
      $('[data-a="left"]').disabled = $('[data-a="right"]').disabled = !pend.length;
      const ts = tasks(); nextM = MISSIONS.find((m, i) => !ts[i][1]);
      $('.ml').innerHTML = MISSIONS.map((m, i) => `<div class="sl-m ${ts[i][1] ? 'on' : m === nextM ? 'cur' : ''}"><span class="ck">${ts[i][1] ? '✓' : i + 1}</span><span>${m.t}</span><button class="sm" data-m="${i}">show</button></div>`).join('');
      $('.sl-next .txt').innerHTML = nextM ? nextM.t : '🎉 All missions complete! Try closing other corridors and run Dijkstra again.';
      el.querySelectorAll('.ml [data-m]').forEach((b) => b.onclick = () => playDemo(MISSIONS[+b.dataset.m]));
      opts.onChange && opts.onChange();
    }
    function switchG(k) {
      anim++; G = k; sel = null; route = null; showRoute = null; cutMode = false; findPath = null; hiPath = null; $('.sl-svg').classList.remove('cut');
      ['cut', 'route', 'find'].forEach((a) => $(`[data-a="${a}"]`).classList.remove('on'));
      el.querySelectorAll('[data-g]').forEach((b) => b.classList.toggle('on', b.dataset.g === k));
      if (k === 'tree') { tState.clear(); tOrder.clear(); qv('Walk / search', ''); $('.res').innerHTML = pend.length ? `<span class="k">insert</span>(${pend[0]}) → compare with ${cmpAt}` : 'Press In-order ▶'; msg(pend.length ? `🌳 Insert <b>${pend[0]}</b>: is it smaller or bigger than <b>${cmpAt}</b>?` : 'The tree is built. Run a walk or 🔎 Find 60.'); }
      else { mState.clear(); mOrder.clear(); pathE.clear(); qv('Queue / table', ''); $('.res').innerHTML = 'school = { ... }   # draw the corridors'; msg(drawn.size < CORR.length ? '🏫 Tap two rooms to draw a corridor from the table. Numbers are walking minutes.' : '🏫 Map ready. Run BFS, plan a route or find the shortest path.'); }
      paint();
    }
    // ---- events ----
    svg.addEventListener('click', (ev) => {
      if (busy && !ev._demo) return;
      const e = ev.target.closest('.ed');
      if (G === 'map' && cutMode && e) { const k = e._k; if (cut.has(k)) cut.delete(k); else cut.add(k); mState.clear(); mOrder.clear(); pathE.clear(); msg(cut.has(k) ? '✂ Corridor closed (maintenance!). Now press 🏁 Shortest path.' : '🔗 Corridor opened again.', 'info'); paint(); return; }
      const n = ev.target.closest('.nd'); if (!n) return;
      G === 'tree' ? tapTree(n._k) : tapRoom(n._k);
    });
    el.querySelectorAll('[data-g]').forEach((b) => b.onclick = () => !busy && switchG(b.dataset.g));
    const run = async (f) => { if (busy) return; busy = true; try { await f(); } finally { busy = false; } };
    $('[data-a="left"]').onclick = () => !busy && step('left');
    $('[data-a="right"]').onclick = () => !busy && step('right');
    $('[data-a="in"]').onclick = () => run(() => trav('in'));
    $('[data-a="pre"]').onclick = () => run(() => trav('pre'));
    $('[data-a="post"]').onclick = () => run(() => trav('post'));
    $('[data-a="find"]').onclick = () => !busy && startFind();
    $('[data-a="bfs"]').onclick = () => run(bfs);
    $('[data-a="dij"]').onclick = () => run(dij);
    $('[data-a="route"]').onclick = () => { if (busy || needMap()) return; anim++; mState.clear(); mOrder.clear(); pathE.clear(); sel = null; route = []; $('[data-a="route"]').classList.add('on'); qv('My route', ''); $('.res').innerHTML = '<span class="k">my_route</span> = [ ]'; msg('📍 Tap the <b>Gate</b>, then rooms one by one along open corridors until you reach the <b>Lab</b>.', 'info'); paint(); };
    $('[data-a="cut"]').onclick = () => { if (needMap()) return; cutMode = !cutMode; $('[data-a="cut"]').classList.toggle('on', cutMode); $('.sl-svg').classList.toggle('cut', cutMode); msg(cutMode ? '✂ Tap a corridor to close it (tap again to open it). Press ✂ again to stop.' : 'Close mode off.', 'info'); };
    $('[data-a="reset"]').onclick = () => { if (busy) return; if (G === 'tree') { placed = new Set([50]); pend = [...INSERT]; cmpAt = 50; } else { drawn.clear(); cut.clear(); myRoute = null; } switchG(G); };
    const tapN = (k) => { const n = [...svg.querySelectorAll('.nd')].find((x) => String(x._k) === String(k)); if (!n) return; const ev = new MouseEvent('click', { bubbles: true }); ev._demo = true; n.dispatchEvent(ev); };
    async function playDemo(m) {
      if (busy) return; busy = true;
      try {
        const toTree = async () => { if (G !== 'tree') { switchG('tree'); await sleep(300); } };
        const toMap = async () => { if (G !== 'map') { switchG('map'); await sleep(300); } };
        const fillTree = async (slow) => { while (pend.length) { const v = pend[0]; step(v < cmpAt ? 'left' : 'right'); await sleep(slow ? 520 : 40); } };
        const fillMap = async (slow) => { for (const [a, b] of CORR) if (!drawn.has(ek(a, b))) { tapN(a); await sleep(slow ? 220 : 10); tapN(b); await sleep(slow ? 420 : 20); } };
        if (m.id === 'ins') { await toTree(); await fillTree(true); }
        if (m.id === 'inord') { await toTree(); await fillTree(false); await trav('in'); }
        if (m.id === 'find') { await toTree(); await fillTree(false); startFind(); await sleep(500); for (const v of [50, 70, 60]) { tapN(v); await sleep(650); } }
        if (m.id === 'build') { await toMap(); await fillMap(true); }
        if (m.id === 'bfs') { await toMap(); await fillMap(false); cut.clear(); await bfs(); }
        if (m.id === 'route') { await toMap(); await fillMap(false); cut.clear(); anim++; route = []; mState.clear(); pathE.clear(); paint(); for (const k of ['Gate', 'Canteen', 'Gym', 'Lab']) { tapN(k); await sleep(600); } }
        if (m.id === 'short') { await toMap(); await fillMap(false); cut.clear(); await dij(); }
        if (m.id === 'cut') { await toMap(); await fillMap(false); cut.clear(); cut.add(ek('Library', 'Lab')); msg('✂ Closed the corridor Library – Lab.', 'info'); paint(); await sleep(700); await dij(); }
      } finally { busy = false; paint(); }
    }
    $('[data-a="show"]').onclick = () => nextM && playDemo(nextM);
    switchG('tree');
    return {
      el, tasks,
      demoStep() { if (busy || !nextM) return false; playDemo(nextM); return true; },
      async demo() { for (const m of MISSIONS) if (!sticky.has(m.id)) { await playDemo(m); await sleep(800); } },
      reset() { flags = {}; sticky.clear(); mistakes = 0; placed = new Set([50]); pend = [...INSERT]; cmpAt = 50; drawn.clear(); cut.clear(); myRoute = null; switchG('tree'); },
    };
  };
})();


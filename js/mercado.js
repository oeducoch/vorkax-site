// Vorkax: página Mercado (pages/mercado.html). JS puro + TradingView Lightweight Charts (vendorizado).
// Lê data/mercado/*.json (gerados pelo GitHub Actions a cada 15 min) e o câmbio da AwesomeAPI (a cada 30 s).
// Todo texto vindo de fontes externas entra no DOM como textContent, nunca como HTML.
(() => {
  const root = document.querySelector('[data-mercado]');
  if (!root) return;

  const DATA = '../data/mercado/';
  const FX_URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,CNY-BRL';
  const REFRESH_DADOS = 5 * 60 * 1000;
  const REFRESH_FX = 30 * 1000;
  const UF_NOMES = { BR: 'Brasil (média)', AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul', MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco', PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins' };

  const $ = (s) => root.querySelector(s);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const num = (n, d = 2) => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const pct = (n) => (n > 0 ? '+' : '') + num(n, 2) + '%';
  const cls = (n) => (n > 0.0001 ? 'is-up' : n < -0.0001 ? 'is-down' : 'is-flat');
  const dataBR = (iso) => (iso ? iso.slice(0, 10).split('-').reverse().join('/') : '');
  const token = (n) => getComputedStyle(document.documentElement).getPropertyValue('--' + n).trim();
  const alpha = (hex, a) => { const h = hex.replace('#', ''); const v = (i) => parseInt(h.slice(i, i + 2), 16); return `rgba(${v(0)}, ${v(2)}, ${v(4)}, ${a})`; };
  const atras = (iso) => {
    if (!iso) return '';
    const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
    if (min < 60) return rtf.format(-Math.max(min, 0), 'minute');
    if (min < 60 * 24) return rtf.format(-Math.round(min / 60), 'hour');
    return rtf.format(-Math.round(min / 1440), 'day');
  };
  const getJSON = async (url) => { const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error(r.status); return r.json(); };

  const st = { cat: null, id: null, uf: 'BR', periodo: 52, tipo: 'area', series: {}, chart: null, plot: null, filtro: '' };

  // ---------- Lista de ativos ----------
  function spark(vals, c) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 18'); svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('class', 'mk-row__spark ' + c); svg.setAttribute('aria-hidden', 'true');
    if (vals.length > 1) {
      const mn = Math.min(...vals), mx = Math.max(...vals), sp = mx - mn || 1;
      const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * 100},${16 - ((v - mn) / sp) * 14}`).join(' ');
      const pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      pl.setAttribute('points', pts); pl.setAttribute('fill', 'none'); pl.setAttribute('stroke', 'currentColor');
      pl.setAttribute('stroke-width', '1.4'); pl.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(pl);
    }
    return svg;
  }

  function renderLista() {
    const lista = $('[data-lista]'); lista.textContent = '';
    const f = st.filtro.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    let grupo = null, n = 0;
    for (const a of st.cat.ativos) {
      const alvo = `${a.nome} ${a.nivel} ${a.grupo}`.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      if (f && !alvo.includes(f)) continue;
      if (a.grupo !== grupo) { grupo = a.grupo; lista.appendChild(el('div', 'mk-group', grupo)); }
      const b = el('button', 'mk-row'); b.type = 'button'; b.dataset.id = a.id;
      if (a.id === st.id) b.setAttribute('aria-current', 'true');
      const c = cls(a.variacao);
      b.append(el('span', 'mk-row__name', a.nome), el('span', 'mk-row__val', num(a.valor)),
        el('span', 'mk-row__sub', `${a.nivel} · ${a.ufs.length} UF`), el('span', 'mk-row__chg ' + c, pct(a.variacao)), spark(a.spark, c));
      b.setAttribute('aria-label', `${a.nome}, ${a.nivel}, R$ ${num(a.valor)} por kg, ${pct(a.variacao)} na semana`);
      lista.appendChild(b); n++;
    }
    if (!n) lista.appendChild(el('p', 'mk-pad', 'Nenhum ativo encontrado.'));
    $('[data-count]').textContent = `${n}`;
  }

  // ---------- Gráfico ----------
  function criarGrafico() {
    if (st.chart || !window.LightweightCharts) return;
    const box = $('[data-grafico]');
    const ink = token('ivory'), linha = alpha(token('gold'), 0.12);
    st.chart = LightweightCharts.createChart(box, {
      autoSize: true,
      layout: { background: { type: 'solid', color: 'transparent' }, textColor: alpha(ink, 0.8), fontFamily: getComputedStyle(document.body).fontFamily, fontSize: 12 },
      grid: { vertLines: { color: linha }, horzLines: { color: linha } },
      rightPriceScale: { borderColor: linha },
      timeScale: { borderColor: linha, timeVisible: false },
      crosshair: { vertLine: { color: alpha(token('gold-light'), 0.6), labelBackgroundColor: token('primary') }, horzLine: { color: alpha(token('gold-light'), 0.6), labelBackgroundColor: token('primary') } },
      localization: { locale: 'pt-BR', priceFormatter: (v) => (st.tipo === 'barras' ? pct(v) : 'R$ ' + num(v)) },
    });
  }

  function pontos() {
    const s = st.series[st.id];
    return (s && s.ufs[st.uf]) || [];
  }

  function desenhar() {
    criarGrafico();
    const vazio = $('[data-vazio]');
    const pts = pontos();
    if (!st.chart) { vazio.textContent = 'Não foi possível carregar o gráfico.'; return; }
    if (st.plot) { st.chart.removeSeries(st.plot); st.plot = null; }
    vazio.hidden = pts.length > 0;
    if (!pts.length) { vazio.textContent = 'Sem dados para este estado.'; return; }
    const ouro = token('gold'), up = token('up'), down = token('down');
    if (st.tipo === 'barras') {
      st.plot = st.chart.addHistogramSeries({ priceLineVisible: false });
      st.plot.setData(pts.slice(1).map(([d, v], i) => { const ch = (v / pts[i][1] - 1) * 100; return { time: d, value: ch, color: ch >= 0 ? up : down }; }));
    } else if (st.tipo === 'linha') {
      st.plot = st.chart.addLineSeries({ color: ouro, lineWidth: 2, priceLineColor: ouro });
      st.plot.setData(pts.map(([d, v]) => ({ time: d, value: v })));
    } else {
      st.plot = st.chart.addAreaSeries({ lineColor: ouro, lineWidth: 2, topColor: alpha(ouro, 0.32), bottomColor: alpha(ouro, 0.02), priceLineColor: ouro });
      st.plot.setData(pts.map(([d, v]) => ({ time: d, value: v })));
    }
    aplicarPeriodo();
  }

  function aplicarPeriodo() {
    const pts = pontos();
    if (!st.chart || !pts.length) return;
    if (!st.periodo || pts.length <= st.periodo) st.chart.timeScale().fitContent();
    else st.chart.timeScale().setVisibleRange({ from: pts[pts.length - st.periodo][0], to: pts[pts.length - 1][0] });
    renderStats();
  }

  function renderStats() {
    const pts = pontos(); const dl = $('[data-stats]'); dl.textContent = '';
    if (!pts.length) return;
    const janela = st.periodo ? pts.slice(-st.periodo) : pts;
    const vals = janela.map((p) => p[1]);
    const ult = pts[pts.length - 1][1];
    const item = (rot, val, c) => { const d = el('div', 'mk-stat'); d.append(el('dt', null, rot), el('dd', c || null, val)); dl.appendChild(d); };
    const varJ = (ult / vals[0] - 1) * 100;
    item('Último', 'R$ ' + num(ult));
    item('Mínima', 'R$ ' + num(Math.min(...vals)));
    item('Máxima', 'R$ ' + num(Math.max(...vals)));
    item('Média', 'R$ ' + num(vals.reduce((a, b) => a + b, 0) / vals.length));
    item('Var. no período', pct(varJ), cls(varJ));
  }

  // ---------- Cabeçalho do ativo, estados e tabela ----------
  function renderAtivo() {
    const a = st.cat.ativos.find((x) => x.id === st.id); const s = st.series[st.id];
    if (!a || !s) return;
    const pts = pontos(); const ult = pts[pts.length - 1]; const ant = pts[pts.length - 2];
    $('[data-sym-nome]').textContent = a.nome;
    $('[data-sym-meta]').textContent = `${a.nivel} · ${UF_NOMES[st.uf] || st.uf} · R$/kg · semanal · semana até ${ult ? dataBR(ult[0]) : '-'}`;
    $('[data-sym-val]').textContent = ult ? 'R$ ' + num(ult[1]) : '-';
    const ch = ult && ant ? (ult[1] / ant[1] - 1) * 100 : 0;
    const chEl = $('[data-sym-chg]'); chEl.textContent = ult && ant ? pct(ch) : ''; chEl.className = 'mk-quote__chg ' + cls(ch);

    const sel = $('[data-uf]'); sel.textContent = '';
    for (const uf of ['BR', ...Object.keys(s.ufs).filter((u) => u !== 'BR').sort()]) {
      const o = el('option', null, uf === 'BR' ? UF_NOMES.BR : `${uf} · ${UF_NOMES[uf] || uf}`); o.value = uf; sel.appendChild(o);
    }
    sel.value = st.uf;

    const tb = $('[data-tabela]'); tb.textContent = '';
    for (const uf of Object.keys(s.ufs).sort((x, y) => (x === 'BR' ? -1 : y === 'BR' ? 1 : x.localeCompare(y)))) {
      const p = s.ufs[uf]; if (!p.length) continue;
      const u = p[p.length - 1], v = p[p.length - 2]; const c = v ? (u[1] / v[1] - 1) * 100 : 0;
      const tr = el('tr'); const td0 = el('td'); const bt = el('button', null, uf === 'BR' ? 'BR (média)' : uf);
      bt.type = 'button'; bt.dataset.uf = uf; bt.title = UF_NOMES[uf] || uf; td0.appendChild(bt);
      tr.append(td0, el('td', 'r', num(u[1])), el('td', 'r', v ? num(v[1]) : '-'), el('td', 'r ' + cls(c), v ? pct(c) : '-'), el('td', 'r', dataBR(u[0])));
      tb.appendChild(tr);
    }
    $('[data-uf-data]').textContent = a.nivel;
  }

  async function selecionar(id, manterUF) {
    st.id = id; if (!manterUF) st.uf = 'BR';
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    renderLista();
    if (!st.series[id]) {
      try { st.series[id] = await getJSON(`${DATA}series/${id}.json`); }
      catch (e) { $('[data-vazio]').hidden = false; $('[data-vazio]').textContent = 'Não foi possível carregar a série.'; return; }
    }
    if (!st.series[id].ufs[st.uf]) st.uf = 'BR';
    renderAtivo(); desenhar();
  }

  // ---------- Carga e atualização automática ----------
  async function carregarCatalogo() {
    try {
      const cat = await getJSON(DATA + 'catalogo.json');
      const mudou = !st.cat || st.cat.atualizado !== cat.atualizado;
      st.cat = cat;
      const semana = cat.ativos.reduce((m, a) => (a.data > m ? a.data : m), '');
      $('[data-status]').textContent = `Preços: semana até ${dataBR(semana)} · verificado ${atras(cat.conab_baixado_em)}`;
      if (mudou) {
        st.series = {};
        const alvo = location.hash.slice(1);
        const id = cat.ativos.some((a) => a.id === st.id) ? st.id
          : cat.ativos.some((a) => a.id === alvo) ? alvo
          : (cat.ativos.find((a) => a.id === 'alho-produtor') || cat.ativos[0] || {}).id;
        if (id) await selecionar(id, true); else renderLista();
      }
    } catch (e) {
      $('[data-status]').textContent = 'Não foi possível carregar os preços agora. Tentando de novo em instantes.';
    }
  }

  async function carregarNoticias() {
    const box = $('[data-noticias]');
    try {
      const n = await getJSON(DATA + 'noticias.json');
      box.textContent = '';
      for (const it of n.itens) {
        if (!/^https:\/\//.test(it.link)) continue;
        const a = el('a'); a.href = it.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
        const meta = el('div', 'mk-news__meta');
        meta.append(el('span', 'mk-news__tag', it.tema || 'Agro'), el('span', null, it.fonte), el('span', null, atras(it.data)));
        a.append(meta, el('div', 'mk-news__title', it.titulo));
        box.appendChild(a);
      }
      if (!box.children.length) box.appendChild(el('p', 'mk-pad', 'Sem notícias no momento.'));
      $('[data-news-time]').textContent = atras(n.atualizado);
    } catch (e) {
      if (!box.querySelector('a')) { box.textContent = ''; box.appendChild(el('p', 'mk-pad', 'Não foi possível carregar as notícias agora.')); }
    }
  }

  async function carregarFX() {
    const box = $('[data-fx]');
    try {
      const d = await getJSON(FX_URL);
      box.textContent = '';
      for (const k of ['USDBRL', 'EURBRL', 'CNYBRL']) {
        const q = d[k]; if (!q) continue;
        const ch = Number(q.pctChange);
        const item = el('div', 'mk-fx__item');
        item.append(el('div', 'mk-fx__pair', `${q.code}/BRL`), el('div', 'mk-fx__val', num(Number(q.bid), 4)), el('div', 'mk-fx__chg ' + cls(ch), pct(ch)));
        box.appendChild(item);
      }
      $('[data-fx-time]').textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      if (!box.children.length) box.appendChild(el('p', 'mk-pad', 'Câmbio indisponível agora.'));
    }
  }

  // ---------- Eventos ----------
  root.addEventListener('click', (e) => {
    const row = e.target.closest('.mk-row');
    if (row) { selecionar(row.dataset.id); return; }
    const ufBtn = e.target.closest('[data-tabela] button');
    if (ufBtn) { st.uf = ufBtn.dataset.uf; renderAtivo(); desenhar(); return; }
    const p = e.target.closest('[data-periodo] button');
    if (p) { st.periodo = Number(p.dataset.p); root.querySelectorAll('[data-periodo] button').forEach((b) => b.setAttribute('aria-pressed', String(b === p))); aplicarPeriodo(); return; }
    const t = e.target.closest('[data-tipo] button');
    if (t) { st.tipo = t.dataset.t; root.querySelectorAll('[data-tipo] button').forEach((b) => b.setAttribute('aria-pressed', String(b === t))); desenhar(); }
  });
  $('[data-uf]').addEventListener('change', (e) => { st.uf = e.target.value; renderAtivo(); desenhar(); });
  $('[data-busca]').addEventListener('input', (e) => { st.filtro = e.target.value.trim(); if (st.cat) renderLista(); });

  carregarCatalogo(); carregarNoticias(); carregarFX();
  setInterval(() => { carregarCatalogo(); carregarNoticias(); }, REFRESH_DADOS);
  setInterval(carregarFX, REFRESH_FX);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { carregarCatalogo(); carregarNoticias(); carregarFX(); } });
})();

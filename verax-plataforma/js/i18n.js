// Troca de idioma (PT / ES / EN) para o site e a plataforma Agro.
// Traduz o DOM em tempo de execução a partir do dicionário window.VK_DICT ([pt, es, en]),
// inclusive o que o app.js desenha depois (tabelas, avisos, abas). O texto original em
// português é guardado por nó, então voltar para PT restaura tudo sem recarregar.
(function () {
  var KEY = 'vorkax_lang', LANGS = ['pt', 'es', 'en'];
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1 };
  var map = {};
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };
  (window.VK_DICT || []).forEach(function (r) { var k = norm(r[0]); if (!(k in map)) map[k] = { es: r[1], en: r[2] }; });
  map['Idioma'] = { es: 'Idioma', en: 'Language' };

  var lang = 'pt';
  try { var saved = localStorage.getItem(KEY); if (LANGS.indexOf(saved) >= 0) lang = saved; } catch (e) {}

  var W = {
    sem: { VERDE: ['VERDE', 'GREEN'], AMARELO: ['AMARILLO', 'YELLOW'], VERMELHO: ['ROJO', 'RED'] }
  };
  function pick(L, es, en) { return L === 'es' ? es : en; }

  // padrões para textos montados com números/nomes (a parte variável fica intacta)
  var RULES = [
    [/^Ver como: (.+) \((.+)\)$/, function (m, L, T) { return pick(L, 'Ver como: ', 'View as: ') + m[1] + ' (' + T(m[2]) + ')'; }],
    [/^(.+ (?:KB|MB|B)) · (fila p\/ Drive|recebido)$/, function (m, L, T) { return m[1] + ' · ' + T(m[2]); }],
    [/^(\d+) anexos$/, function (m, L) { return m[1] + pick(L, ' adjuntos', ' attachments'); }],
    [/^(\d+) lotes$/, function (m, L) { return m[1] + pick(L, ' lotes', ' batches'); }],
    [/^(\d+) oportunidades$/, function (m, L) { return m[1] + pick(L, ' oportunidades', ' opportunities'); }],
    [/^(\d+) negócios$/, function (m, L) { return m[1] + pick(L, ' negocios', ' deals'); }],
    [/^(\d+) ganhos · (\d+) perdidos$/, function (m, L) { return m[1] + pick(L, ' ganados · ', ' won · ') + m[2] + pick(L, ' perdidos', ' lost'); }],
    [/^margem (-?\d+)%$/, function (m, L) { return pick(L, 'margen ', 'margin ') + m[1] + '%'; }],
    [/^Mova entre estágios com ◀ ▶\. Perdidos: (\d+)\.$/, function (m, L) { return pick(L, 'Mueva entre etapas con ◀ ▶. Perdidos: ', 'Move between stages with ◀ ▶. Lost: ') + m[1] + '.'; }],
    [/^Permissões de (.+) \((.+)\)$/, function (m, L, T) { return pick(L, 'Permisos de ', 'Permissions for ') + m[1] + ' (' + T(m[2]) + ')'; }],
    [/^vence (\S+) · (.+)$/, function (m, L, T) { return pick(L, 'vence ', 'due ') + m[1] + ' · ' + T(m[2]); }],
    [/^(\d{4}-\d{2}-\d{2}) · (.+) · (a receber|a pagar|recebido|pago)$/, function (m, L, T) { return m[1] + ' · ' + T(m[2]) + ' · ' + T(m[3]); }],
    [/^Score (\d+) · (.+) · (\d{4}-\d{2}-\d{2})$/, function (m, L, T) { return 'Score ' + m[1] + ' · ' + T(m[2]) + ' · ' + m[3]; }],
    [/^(.+) · prazo (.+)$/, function (m, L, T) { return m[1] + pick(L, ' · plazo ', ' · term ') + T(m[2]); }],
    [/^(R\$ [\d.,]+) · (\d+) dias$/, function (m, L) { return m[1] + ' · ' + m[2] + pick(L, ' días', ' days'); }],
    [/^(\d+) dias$/, function (m, L) { return m[1] + pick(L, ' días', ' days'); }],
    [/^Proposta (aceita|declinada) em (\S+)\.$/, function (m, L) { return pick(L, 'Propuesta ' + (m[1] === 'aceita' ? 'aceptada' : 'declinada') + ' el ', 'Proposal ' + (m[1] === 'aceita' ? 'accepted' : 'declined') + ' on ') + m[2] + '.'; }],
    [/^Semáforo (VERDE|AMARELO|VERMELHO) · revisor (.+)$/, function (m, L) { return pick(L, 'Semáforo ', 'Traffic light ') + W.sem[m[1]][L === 'es' ? 0 : 1] + pick(L, ' · revisor ', ' · reviewer ') + m[2]; }],
    [/^SEMÁFORO (VERDE|AMARELO|VERMELHO)$/, function (m, L) { return pick(L, 'SEMÁFORO ', 'TRAFFIC LIGHT ') + W.sem[m[1]][L === 'es' ? 0 : 1]; }],
    [/^(.+): ponto de atenção não esclarecido\.$/, function (m, L, T) { return T(m[1]) + pick(L, ': punto de atención no aclarado.', ': warning point not clarified.'); }],
    [/^(.+): não avaliado\.$/, function (m, L, T) { return T(m[1]) + pick(L, ': no evaluado.', ': not assessed.'); }],
    [/^Não foi possível obter a cotação do gateway: (.+)$/, function (m, L, T) { return pick(L, 'No fue posible obtener la cotización del gateway: ', 'Could not get the quote from the gateway: ') + T(m[1]); }],
    [/^O fechamento não foi confirmado: (.+)$/, function (m, L, T) { return pick(L, 'El cierre no fue confirmado: ', 'The settlement was not confirmed: ') + T(m[1]); }],
    [/^Emitido em (.+)\.$/, function (m, L) { return pick(L, 'Emitido el ', 'Issued on ') + m[1] + '.'; }],
    [/^Laudo Único · (.+)$/, function (m, L) { return pick(L, 'Informe Único · ', 'Single Report · ') + m[1]; }],
    [/^· revisor$/, function (m, L) { return pick(L, '· revisor', '· reviewer'); }]
  ];

  // devolve a tradução de um texto já normalizado, ou null se não houver
  function tr(core, L) {
    if (L === 'pt') return null;
    var e = map[core];
    if (e) return e[L];
    for (var i = 0; i < RULES.length; i++) {
      var m = RULES[i][0].exec(core);
      if (m) return RULES[i][1](m, L, function (s) { var r = tr(norm(s), L); return r == null ? s : r; });
    }
    return null;
  }

  var orig = new WeakMap(), done = new WeakMap(), aorig = new WeakMap(), adone = new WeakMap(), lock = false;
  var vorig = new WeakMap();

  function skipped(el) {
    for (; el && el.nodeType === 1; el = el.parentNode) { if (SKIP[el.tagName] || el.hasAttribute('data-i18n-skip')) return true; }
    return false;
  }

  function doText(node) {
    var p = node.parentNode; if (!p || skipped(p)) return;
    var o = orig.get(node);
    if (o === undefined) { o = node.data; orig.set(node, o); }
    var core = norm(o); if (!core) return;
    // <option> sem value usa o próprio texto como valor: fixa o valor em português antes de traduzir
    if (p.tagName === 'OPTION' && !p.hasAttribute('value')) p.setAttribute('value', core);
    var out = tr(core, lang);
    var next = out == null ? o : (o.match(/^\s*/)[0] + out + o.match(/\s*$/)[0]);
    if (node.data !== next) { lock = true; node.data = next; lock = false; }
    done.set(node, next);
  }

  function doAttrs(el) {
    if (skipped(el)) return;
    // valores iniciais de demonstração em campos de texto (só se o usuário ainda não editou)
    if (el.tagName === 'INPUT' && el.hasAttribute('value') && (!el.type || el.type === 'text')) {
      var vo = vorig.get(el);
      if (!vo) { vo = { orig: el.getAttribute('value'), shown: null }; vorig.set(el, vo); }
      if (el.value === (vo.shown === null ? vo.orig : vo.shown)) {
        var vt = tr(norm(vo.orig), lang), nv = vt == null ? vo.orig : vt;
        if (el.value !== nv) el.value = nv;
        vo.shown = nv;
      }
    }
    var store = aorig.get(el) || {}, ds = adone.get(el) || {};
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var cur = el.getAttribute(a);
      if (!(a in store) || (ds[a] !== cur)) { store[a] = cur; }
      var core = norm(store[a]); var out = core ? tr(core, lang) : null;
      var next = out == null ? store[a] : out;
      if (cur !== next) { lock = true; el.setAttribute(a, next); lock = false; }
      ds[a] = next;
    });
    aorig.set(el, store); adone.set(el, ds);
  }

  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, 5, null);
    var n; while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }

  function setLang(L) {
    if (LANGS.indexOf(L) < 0) return;
    lang = L; try { localStorage.setItem(KEY, L); } catch (e) {}
    document.documentElement.lang = L === 'pt' ? 'pt-BR' : L;
    walk(document.body); mark();
  }

  var NAMES = { pt: 'Português', es: 'Español', en: 'English' };
  function mark() {
    [].forEach.call(document.querySelectorAll('.langsw'), function (box) {
      var cur = box.querySelector('.langsw__cur'); if (cur) cur.textContent = NAMES[lang];
      [].forEach.call(box.querySelectorAll('[data-lang]'), function (o) { o.setAttribute('aria-selected', o.dataset.lang === lang ? 'true' : 'false'); });
    });
  }
  function closeAll(except) {
    [].forEach.call(document.querySelectorAll('.langsw.open'), function (b) {
      if (b === except) return;
      b.classList.remove('open'); b.querySelector('.langsw__btn').setAttribute('aria-expanded', 'false');
    });
  }

  // botão que mostra o idioma atual e abre a lista logo abaixo
  var CHEV = '<svg class="langsw__chev" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';
  function mkSwitcher() {
    var d = document.createElement('div'); d.className = 'langsw'; d.setAttribute('data-i18n-skip', '');
    d.innerHTML = '<button type="button" class="langsw__btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Idioma / Language / Idioma"><span class="langsw__cur">' + NAMES[lang] + '</span>' + CHEV + '</button>' +
      '<ul class="langsw__menu" role="listbox" aria-label="Idioma">' +
      LANGS.map(function (l) { return '<li role="presentation"><button type="button" role="option" data-lang="' + l + '" lang="' + l + '" aria-selected="' + (l === lang) + '">' + NAMES[l] + '</button></li>'; }).join('') +
      '</ul>';
    return d;
  }
  function mount() {
    var menu = document.querySelector('nav.pbar .menu'); if (menu) menu.insertBefore(mkSwitcher(), menu.firstChild);
    var panel = document.querySelector('#login .panel'); if (panel) panel.appendChild(mkSwitcher());
    var out = document.querySelector('.appbar [data-logout]'); if (out) out.parentNode.insertBefore(mkSwitcher(), out);
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target : e.target.parentNode;
      var opt = t.closest('.langsw [data-lang]');
      if (opt) { setLang(opt.dataset.lang); var bx = opt.closest('.langsw'); closeAll(); var bt = bx.querySelector('.langsw__btn'); bt.focus(); return; }
      var btn = t.closest('.langsw__btn');
      if (btn) { var box = btn.closest('.langsw'), open = !box.classList.contains('open'); closeAll(box); box.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); return; }
      closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var o = document.querySelector('.langsw.open'); if (!o) return;
      closeAll(); o.querySelector('.langsw__btn').focus();
    });
  }

  // traduz um HTML completo (ex.: a janela do laudo) e devolve o HTML traduzido
  function html(str) {
    if (lang === 'pt') return str;
    var doc = new DOMParser().parseFromString(str, 'text/html');
    var w = doc.createTreeWalker(doc.documentElement, 4, null), n;
    while ((n = w.nextNode())) {
      var p = n.parentNode; if (p && SKIP[p.tagName]) continue;
      var core = norm(n.data); if (!core) continue;
      var out = tr(core, lang);
      if (out != null) n.data = n.data.match(/^\s*/)[0] + out + n.data.match(/\s*$/)[0];
    }
    doc.documentElement.lang = lang;
    return '<!doctype html>' + doc.documentElement.outerHTML;
  }

  var obs = new MutationObserver(function (list) {
    list.forEach(function (m) {
      if (lock) return;
      if (m.type === 'childList') { m.addedNodes.forEach(function (n) { walk(n); }); }
      else if (m.type === 'characterData') { if (m.target.data !== done.get(m.target)) { orig.delete(m.target); doText(m.target); } }
      else if (m.type === 'attributes') { doAttrs(m.target); }
    });
  });

  function init() {
    mount();
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    walk(document.body); mark();
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  window.VK_I18N = { setLang: setLang, html: html, get lang() { return lang; }, t: function (s) { var r = tr(norm(s), lang); return r == null ? s : r; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

// Testes do site Vorkax. Rodar: npm test  (ou: node --test "tests/*.test.mjs")
// Sem dependências: usa só node:test, node:assert, node:fs, node:vm.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const PAGES = ['index.html', ...readdirSync(join(ROOT, 'pages')).filter((f) => f.endsWith('.html')).map((f) => `pages/${f}`)];

// ---------- Estrutura de cada página ----------
for (const page of PAGES) {
  test(`${page}: estrutura, SEO e acessibilidade básica`, () => {
    const html = read(page);
    assert.match(html, /<html lang="pt-BR">/, 'lang pt-BR');
    assert.match(html, /<title>[^<]{5,}<\/title>/, 'title');
    assert.match(html, /<meta name="viewport"/, 'viewport');
    assert.match(html, /<meta name="description" content="[^"]{40,}"/, 'description com 40+ caracteres');
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'exatamente um h1');
    assert.match(html, /href="#conteudo"/, 'skip link');
    assert.match(html, /id="conteudo"/, 'alvo do skip link');
    for (const img of html.match(/<img\b[^>]*>/g) || []) assert.match(img, /\balt="/, `img sem alt: ${img}`);
    assert.doesNotMatch(html, /<script[^>]+src="https?:/, 'nenhum script externo');
  });

  test(`${page}: links e recursos internos existem`, () => {
    const html = read(page);
    const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1])
      .filter((u) => !/^(https?:|mailto:|tel:|#|data:)/.test(u));
    assert.ok(refs.length > 0);
    for (const ref of refs) {
      const target = resolve(join(ROOT, dirname(page)), ref.split('#')[0].split('?')[0]);
      assert.ok(existsSync(target), `${page} aponta para arquivo inexistente: ${ref}`);
    }
  });
}

// ---------- Preferência do usuário: sem travessões ----------
test('nenhum travessão (em dash) em páginas, CSS, JS e documentos', () => {
  const files = [...PAGES, 'css/styles.css', 'css/tokens.css', 'js/main.js', 'js/fx.js', 'js/fx-data.js', 'README.md', 'DESIGN.md'];
  for (const f of files) assert.ok(!read(f).includes('—'), `travessão encontrado em ${f}`);
});

// ---------- Tokens de design ----------
const designColors = Object.fromEntries(
  [...read('DESIGN.md').split('---')[1].matchAll(/^\s{2}([a-z-]+):\s*"(#[0-9A-Fa-f]{6})"/gm)].map((m) => [m[1], m[2].toUpperCase()]),
);
const tokenColors = Object.fromEntries(
  [...read('css/tokens.css').matchAll(/--([a-z-]+):\s*(#[0-9A-Fa-f]{6});/g)].map((m) => [m[1], m[2].toUpperCase()]),
);

test('tokens.css é idêntico às cores do DESIGN.md', () => {
  assert.ok(Object.keys(designColors).length >= 9, 'DESIGN.md deve definir as 9 cores');
  assert.deepEqual(tokenColors, designColors);
});

test('styles.css e main.js não usam cor literal (só tokens)', () => {
  for (const f of ['css/styles.css', 'js/main.js', 'js/fx.js', 'js/fx-data.js']) {
    assert.doesNotMatch(read(f), /#[0-9A-Fa-f]{3,8}\b(?![\w-])/, `cor literal em ${f}`);
  }
});

test('toda var() usada em styles.css está definida em tokens.css', () => {
  const defined = new Set([...read('css/tokens.css').matchAll(/--([a-z-]+):/g)].map((m) => m[1]));
  const used = new Set([...read('css/styles.css').matchAll(/var\(--([a-z-]+)\)/g)].map((m) => m[1]));
  for (const v of used) assert.ok(defined.has(v), `var(--${v}) não definida`);
});

// ---------- Contraste WCAG AA (texto normal >= 4.5) ----------
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

test('pares de cor usados no site passam WCAG AA', () => {
  const pairs = [
    ['ivory', 'primary-deep'], ['sand', 'primary-deep'], ['gold-light', 'primary-deep'], ['gold', 'primary-deep'],
    ['primary-deep', 'gold'], ['primary-deep', 'gold-light'], ['ivory', 'primary'],
    ['ink', 'ivory'], ['ink', 'sand'], ['muted', 'ivory'], ['muted', 'sand'], ['primary', 'ivory'], ['primary', 'sand'],
    ['primary', 'white'], ['primary-deep', 'white'], ['ink', 'white'], ['muted', 'white'],
    ['up', 'primary-deep'], ['down', 'primary-deep'],
  ];
  for (const [fg, bg] of pairs) {
    const r = ratio(tokenColors[fg], tokenColors[bg]);
    assert.ok(r >= 4.5, `${fg} sobre ${bg}: ${r.toFixed(2)} < 4.5`);
  }
});

test('regra do DESIGN.md: ouro não serve como texto sobre marfim (deve falhar AA)', () => {
  assert.ok(ratio(tokenColors.gold, tokenColors.ivory) < 4.5);
});

// ---------- JavaScript ----------
test('scripts compilam sem erro de sintaxe', () => {
  for (const f of ['js/main.js', 'js/fx.js', 'js/fx-data.js']) assert.doesNotThrow(() => new vm.Script(read(f)), f);
});

// ---------- Câmbio: dados, regras de preço e integração com a API ----------
const ctx = vm.createContext({});
vm.runInContext(read('js/fx-data.js'), ctx);
vm.runInContext(read('js/fx.js'), ctx);
const FX = ctx.VorkaxFX;
const DATA = ctx.VorkaxFXData;
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

test('70 países, sem repetição, sem o Brasil, em ordem alfabética', () => {
  const names = [...DATA.countries.map((c) => c[0])]; // cópia no contexto principal (o vm tem outro Array)
  assert.equal(names.length, 70);
  assert.equal(new Set(names).size, 70);
  assert.ok(!names.includes('Brasil'));
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'pt-BR')));
  for (const [, iso, cur] of DATA.countries) { assert.match(iso, /^[A-Z]{2}$/); assert.match(cur, /^[A-Z]{3}$/); }
});

test('20 moedas, sem repetição, incluindo todas as que têm spread', () => {
  const codes = DATA.currencies.map((c) => c[0]);
  assert.equal(codes.length, 20);
  assert.equal(new Set(codes).size, 20);
  for (const c of FX.CONFIG.spreadCurrencies) assert.ok(codes.includes(c), c);
});

test('spread de R$ 0,035 só nas 9 moedas definidas', () => {
  assert.deepEqual([...FX.CONFIG.spreadCurrencies].sort(), ['AUD', 'CAD', 'CHF', 'DKK', 'EUR', 'GBP', 'NOK', 'SEK', 'USD']);
  near(FX.taxaDaMoeda('USD', 5.835), 5.87, 1e-9, 'USD com spread');
  near(FX.taxaDaMoeda('SEK', 0.5), 0.535, 1e-9, 'SEK com spread');
  assert.equal(FX.taxaDaMoeda('JPY', 0.0353), 0.0353, 'JPY sem spread');
});

test('exemplo do documento: US$ 300 com tela 5,835 (taxa 5,87)', () => {
  const r = FX.quote('USD', 5.835, 300);
  near(r.taxa, 5.87, 1e-9, 'taxa da moeda');
  near(r.vet, 6.07545, 1e-9, 'VET = taxa + 3,5%');
  near(r.iof, 61.635, 0.006, 'IOF = 3,5% sobre 300 x 5,87');
  near(r.paga, 1822.635, 0.011, 'você paga = 1.761,00 + IOF');
});

test('conversão inversa (digitar em reais) fecha com a direta', () => {
  for (const [code, screen] of [['USD', 5.6496], ['EUR', 6.2422], ['JPY', 0.0353], ['AED', 1.538]]) {
    const amount = FX.amountFromBRL(code, screen, 10000);
    near(FX.quote(code, screen, amount).paga, 10000, 0.02, code);
  }
});

test('leitura de números no formato brasileiro', () => {
  assert.equal(FX.parseBR('1.822,63'), 1822.63);
  assert.equal(FX.parseBR('300'), 300);
  assert.equal(FX.parseBR('R$ 1.000,5'), 1000.5);
  assert.ok(Number.isNaN(FX.parseBR('abc')));
  assert.ok(Number.isNaN(FX.parseBR('-5')));
});

test('bandeira gerada a partir do código ISO', () => {
  assert.equal(FX.flag('BR'), '\u{1F1E7}\u{1F1F7}');
});

test('normalização da resposta da AwesomeAPI (preço de tela = venda)', () => {
  const sample = {
    USDBRL: { code: 'USD', codein: 'BRL', bid: '5.6490', ask: '5.6496', pctChange: '1.19', create_date: '2026-11-12 15:59:16' },
    EURBRL: { code: 'EUR', codein: 'BRL', bid: '6.24', ask: 'x', pctChange: '0.7', create_date: '2026-11-12 15:58:56' },
  };
  const q = FX.PROVIDERS.awesomeapi.normalize(sample);
  assert.deepEqual(Object.keys(q), ['USD'], 'descarta cotação inválida');
  assert.equal(q.USD.price, 5.6496);
  assert.equal(q.USD.pct, 1.19);
  assert.match(FX.PROVIDERS.awesomeapi.url(['USD', 'EUR']), /\/json\/last\/USD-BRL,EUR-BRL$/);
});

test('letreiro e scripts de câmbio presentes em todas as páginas', () => {
  for (const p of PAGES) {
    const html = read(p);
    assert.match(html, /<\/header>\s*<div class="ticker" data-ticker/, `${p}: letreiro logo abaixo do cabeçalho`);
    const iData = html.indexOf('fx-data.js'); const iFx = html.indexOf('js/fx.js'); const iMain = html.indexOf('js/main.js');
    assert.ok(iData > 0 && iData < iFx && iFx < iMain, `${p}: ordem dos scripts`);
  }
});

test('página de câmbio tem a calculadora completa', () => {
  const html = read('pages/cambio.html');
  for (const hook of ['data-fx-calc', 'data-fx-country', 'data-fx-currency', 'data-fx-send', 'data-fx-pay',
    'data-fx-swap', 'data-fx-taxa', 'data-fx-iof', 'data-fx-vet', 'data-fx-cta', 'data-fx-status']) {
    assert.ok(html.includes(hook), hook);
  }
});

test('página inicial: soluções com 3 quadros, sem Compras públicas', () => {
  const html = read('index.html');
  const sol = html.slice(html.indexOf('id="solucoes"'), html.indexOf('id="como-titulo"'));
  assert.equal((sol.match(/<article class="card/g) || []).length, 3);
  assert.ok(!sol.includes('Compras públicas'));
  assert.match(sol, /Três frentes/);
});

test('formulário de contato tem todos os campos que o main.js valida', () => {
  const html = read('pages/contato.html');
  assert.match(html, /data-contact-form/);
  assert.match(html, /data-to="[^"@]+@[^"]+"/);
  for (const name of ['nome', 'email', 'assunto', 'mensagem', 'consentimento']) {
    assert.match(html, new RegExp(`name="${name}"`), `campo ${name}`);
    assert.match(html, new RegExp(`data-error-for="${name}"`), `mensagem de erro de ${name}`);
  }
});

// ---------- Pendências (informativo, não reprova) ----------
test('lista de campos [PREENCHER] a completar antes de publicar', (t) => {
  const pend = new Set();
  for (const p of PAGES) for (const m of read(p).matchAll(/\[PREENCHER:?([^\]]*)\]/g)) pend.add(m[1].trim() || 'sem descrição');
  t.diagnostic(`Pendências: ${[...pend].join(' | ')}`);
  assert.ok(true);
});

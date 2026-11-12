// Vorkax: cotações (letreiro) e calculadora de câmbio. Script clássico, sem dependências.
// Regras de preço (definidas pela Vorkax):
//   taxa da moeda = preço de tela + spread (R$ 0,035 nas moedas de CONFIG.spreadCurrencies)
//   IOF           = 3,5% sobre a taxa da moeda
//   VET           = taxa da moeda + IOF  (= taxa x 1,035)
(() => {
  const CONFIG = {
    // Fonte das cotações. Para usar a API do banco parceiro: adicionar um provedor em PROVIDERS
    // e trocar o nome aqui. Ele só precisa devolver { USD: { price, pct, time }, ... }.
    provider: 'awesomeapi',
    endpoint: 'https://economia.awesomeapi.com.br/json/last/',
    priceField: 'ask', // preço de tela = cotação comercial de venda
    refreshMs: 60000,
    iof: 0.035,
    spreadBRL: 0.035,
    spreadCurrencies: ['USD', 'CAD', 'AUD', 'EUR', 'GBP', 'CHF', 'DKK', 'NOK', 'SEK'],
    tickerCurrencies: ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY', 'CNY', 'AED', 'DKK', 'NOK', 'SEK'],
  };

  const DATA = globalThis.VorkaxFXData;
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

  const flag = (iso) => String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
  const taxaDaMoeda = (code, screen) => screen + (CONFIG.spreadCurrencies.includes(code) ? CONFIG.spreadBRL : 0);

  // amount = valor na moeda estrangeira. Retorna valores em reais.
  const quote = (code, screen, amount) => {
    const taxa = taxaDaMoeda(code, screen);
    const iofUnit = taxa * CONFIG.iof;
    const total = amount * taxa;
    const iof = round2(total * CONFIG.iof);
    return { taxa, iofUnit, vet: taxa + iofUnit, iof, paga: round2(round2(total) + iof) };
  };
  const amountFromBRL = (code, screen, brl) => brl / (taxaDaMoeda(code, screen) * (1 + CONFIG.iof));

  const PROVIDERS = {
    awesomeapi: {
      url: (codes) => CONFIG.endpoint + codes.map((c) => `${c}-BRL`).join(','),
      normalize: (json) => Object.fromEntries(Object.values(json)
        .filter((v) => v && v.code && Number.isFinite(+v[CONFIG.priceField]))
        .map((v) => [v.code, { price: +v[CONFIG.priceField], pct: +v.pctChange || 0, time: v.create_date }])),
    },
  };

  const fetchQuotes = async (codes) => {
    const p = PROVIDERS[CONFIG.provider];
    const res = await fetch(p.url(codes), { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return p.normalize(await res.json());
  };

  const parseBR = (s) => {
    const n = parseFloat(String(s).replace(/\s|R\$/g, '').replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  };
  const fmt = (n, min, max = min) => n.toLocaleString('pt-BR', { minimumFractionDigits: min, maximumFractionDigits: max });
  const fmtRate = (n) => (n >= 1 ? fmt(n, 4) : fmt(n, 6));

  globalThis.VorkaxFX = { CONFIG, flag, taxaDaMoeda, quote, amountFromBRL, PROVIDERS, parseBR, fmtRate, round2 };
  if (typeof document === 'undefined') return; // ambiente de teste (Node)

  // ---------- Estado e atualização ----------
  const allCodes = [...new Set([...DATA.currencies.map((c) => c[0]), ...CONFIG.tickerCurrencies])];
  let quotes = null;
  let failed = false;
  const subscribers = [];

  const refresh = async () => {
    try {
      quotes = await fetchQuotes(allCodes);
      failed = false;
    } catch (e) {
      failed = true; // mantém a última cotação válida, se houver
    }
    subscribers.forEach((fn) => fn());
  };

  // ---------- Letreiro ----------
  const ticker = document.querySelector('[data-ticker]');
  if (ticker) {
    const track = ticker.querySelector('.ticker__track');
    subscribers.push(() => {
      if (!quotes) {
        track.innerHTML = `<span class="ticker__item">${failed ? 'Cotações indisponíveis no momento' : 'Carregando cotações...'}</span>`;
        return;
      }
      const name = Object.fromEntries(DATA.currencies.map((c) => [c[0], c]));
      const items = CONFIG.tickerCurrencies.filter((c) => quotes[c]).map((c) => {
        const q = quotes[c];
        const up = q.pct >= 0;
        return `<span class="ticker__item"><span class="ticker__flag" aria-hidden="true">${flag(name[c][2])}</span>`
          + `<b>${c}</b> R$ ${fmtRate(q.price)} <span class="${up ? 'is-up' : 'is-down'}">${up ? '▲' : '▼'} ${fmt(Math.abs(q.pct), 2)}%</span></span>`;
      }).join('');
      track.innerHTML = `<span class="ticker__group">${items}</span><span class="ticker__group" aria-hidden="true">${items}</span>`;
      const t = Object.values(quotes)[0].time;
      ticker.setAttribute('title', `Cotação comercial de venda, indicativa. Atualizada em ${t}.`);
    });
  }

  // ---------- Calculadora ----------
  const calc = document.querySelector('[data-fx-calc]');
  if (calc) {
    const $ = (s) => calc.querySelector(s);
    const country = $('[data-fx-country]');
    const currency = $('[data-fx-currency]');
    const send = $('[data-fx-send]');
    const pay = $('[data-fx-pay]');
    const hint = $('[data-fx-hint]');
    const status = $('[data-fx-status]');
    const cta = $('[data-fx-cta]');
    const out = { taxa: $('[data-fx-taxa]'), iof: $('[data-fx-iof]'), vet: $('[data-fx-vet]') };
    let typingBRL = false; // false: digita "Você envia"; true: digita "Você paga"

    [...DATA.countries].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR')).forEach(([n, iso, cur]) => {
      country.add(new Option(`${flag(iso)} ${n}`, iso));
      Object.assign(country.options[country.options.length - 1].dataset, { currency: cur, name: n });
    });
    DATA.currencies.forEach(([code, n, iso]) => currency.add(new Option(`${flag(iso)} ${code} · ${n}`, code)));
    currency.value = 'USD';

    const render = () => {
      const code = currency.value;
      const q = quotes && quotes[code];
      calc.toggleAttribute('data-loading', !q);
      if (!q) {
        Object.values(out).forEach((el) => { el.textContent = failed ? 'indisponível' : 'carregando...'; });
        status.textContent = failed ? 'Não foi possível obter a cotação agora. Tente novamente em instantes.' : '';
        return;
      }
      const r = quote(code, q.price, 1);
      out.taxa.textContent = `R$ ${fmtRate(r.taxa)}`;
      out.vet.textContent = `R$ ${fmtRate(r.vet)}`;
      let amount = parseBR(send.value);
      if (typingBRL) {
        const brl = parseBR(pay.value);
        amount = Number.isFinite(brl) ? amountFromBRL(code, q.price, brl) : NaN;
        send.value = Number.isFinite(amount) ? fmt(amount, 2) : '';
      }
      if (Number.isFinite(amount)) {
        const t = quote(code, q.price, amount);
        out.iof.textContent = `R$ ${fmt(t.iof, 2)}`;
        if (!typingBRL) pay.value = fmt(t.paga, 2);
      } else {
        out.iof.textContent = 'R$ 0,00';
        if (!typingBRL) pay.value = '';
      }
      status.textContent = `Cotação indicativa, atualizada em ${q.time}. Valores finais confirmados no fechamento.`;
      const msg = `Quero enviar ${send.value} ${code} para ${country.value ? country.selectedOptions[0].dataset.name : '(país a definir)'}. Simulação no site: você paga R$ ${pay.value}.`;
      cta.href = `contato.html?assunto=${encodeURIComponent('Câmbio')}&mensagem=${encodeURIComponent(msg)}`;
    };

    country.addEventListener('change', () => {
      const opt = country.selectedOptions[0];
      const cur = opt && opt.dataset.currency;
      if (!cur) { hint.textContent = ''; render(); return; }
      if ([...currency.options].some((o) => o.value === cur)) {
        currency.value = cur;
        hint.textContent = '';
      } else {
        currency.value = 'USD';
        hint.textContent = `A moeda local (${cur}) não está na lista. Simulação em dólar americano.`;
      }
      render();
    });
    currency.addEventListener('change', render);
    send.addEventListener('input', () => { typingBRL = false; render(); });
    pay.addEventListener('input', () => { typingBRL = true; render(); });
    $('[data-fx-swap]').addEventListener('click', () => {
      typingBRL = !typingBRL;
      send.readOnly = typingBRL;
      pay.readOnly = !typingBRL;
      (typingBRL ? pay : send).focus();
      render();
    });
    subscribers.push(render);
    render();
  }

  if (ticker || calc) {
    refresh();
    setInterval(() => { if (!document.hidden) refresh(); }, CONFIG.refreshMs);
  }
})();

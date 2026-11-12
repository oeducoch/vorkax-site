// Vorkax: comportamento do site. JS puro, sem dependências.
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  // Menu mobile
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Marca o item de menu da página atual
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    if (a.getAttribute('href').split('/').pop() === here) a.setAttribute('aria-current', 'page');
  });

  // Sombra do cabeçalho ao rolar
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animação de entrada (respeita prefers-reduced-motion via CSS)
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // Ano no rodapé
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Formulário de contato: valida no navegador e abre o e-mail do visitante.
  // ponytail: sem backend; trocar por envio a uma API/CRM quando existir.
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form__status');
    const rules = {
      nome: (v) => v.trim().length >= 2 || 'Informe seu nome.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Informe um e-mail válido.',
      assunto: (v) => v !== '' || 'Escolha um assunto.',
      mensagem: (v) => v.trim().length >= 10 || 'Escreva ao menos 10 caracteres.',
      consentimento: (_, el) => el.checked || 'É preciso concordar com a Política de Privacidade.',
    };

    const check = (name) => {
      const el = form.elements[name];
      const result = rules[name](el.value, el);
      const field = el.closest('.field') || el.closest('.consent');
      const err = form.querySelector(`[data-error-for="${name}"]`);
      const ok = result === true;
      if (field) field.toggleAttribute('data-invalid', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      if (err) err.textContent = ok ? '' : result;
      return ok;
    };

    // Pré-preenche assunto e mensagem vindos do link (ex.: botão "Realizar envio" do câmbio)
    const params = new URLSearchParams(location.search);
    const assunto = params.get('assunto');
    if (assunto && [...form.elements.assunto.options].some((o) => o.value === assunto)) form.elements.assunto.value = assunto;
    if (params.get('mensagem')) form.elements.mensagem.value = params.get('mensagem').slice(0, 1000);

    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener('blur', () => check(name));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = Object.keys(rules).map(check).every(Boolean);
      if (!valid) {
        status.textContent = 'Revise os campos destacados.';
        const first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      const d = (n) => form.elements[n].value.trim();
      const body = [
        `Nome: ${d('nome')}`,
        `Empresa: ${d('empresa') || '-'}`,
        `E-mail: ${d('email')}`,
        `Telefone: ${d('telefone') || '-'}`,
        '',
        d('mensagem'),
      ].join('\n');
      const to = form.dataset.to;
      const url = `mailto:${to}?subject=${encodeURIComponent('[Site] ' + d('assunto'))}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Abrimos o seu aplicativo de e-mail com a mensagem pronta. Basta enviar.';
      window.location.href = url;
    });
  }
})();

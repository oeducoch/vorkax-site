# Vorkax: site institucional

Site estático (HTML, CSS e JavaScript puros), sem dependências e sem etapa de build.

## Estrutura

```
vorkax-site/
├── index.html              página inicial
├── pages/
│   ├── cambio.html
│   ├── credito.html
│   ├── plataforma.html
│   ├── compras-publicas.html
│   ├── sobre.html
│   ├── contato.html        formulário (abre o e-mail do visitante; sem backend)
│   └── privacidade.html    modelo LGPD, revisar com o jurídico
├── css/
│   ├── tokens.css          cores, fontes e espaçamentos (espelho do DESIGN.md)
│   └── styles.css          estilos globais (só usa tokens)
├── js/
│   ├── main.js             menu mobile, animações, validação do formulário
│   ├── fx.js               letreiro de cotações e calculadora de câmbio (regras de spread e IOF)
│   └── fx-data.js          70 países e 20 moedas
├── assets/
│   └── falcao.svg          símbolo Falcão 3 (também é o favicon)
├── tests/
│   └── site.test.mjs       testes automáticos
├── DESIGN.md               sistema de design (validado com designmd)
└── package.json            scripts
```

## Comandos

```
npm test              # roda os testes (node --test, sem instalar nada)
npm run serve         # servidor local em http://localhost:8080
npm run lint:design   # valida o DESIGN.md (contraste e estrutura)
```

## O que os testes garantem

- Toda página tem idioma, título, descrição, um único h1 e link para pular ao conteúdo.
- Nenhum link interno quebrado.
- Cores do CSS iguais às do DESIGN.md, sem cor solta fora dos tokens.
- Pares de cor usados passam no contraste WCAG AA.
- Nenhum travessão no texto.
- Formulário com todos os campos validados pelo JavaScript.
- Lista os campos `[PREENCHER]` que faltam.

## Antes de publicar

1. Preencher todos os `[PREENCHER]` (razão social, CNPJ, telefone, endereço, instituição parceira, encarregado de dados).
2. Validar com o jurídico os textos sobre correspondente cambial, crédito e a Política de Privacidade.
3. Confirmar o e-mail `contato@vorkax.com.br` (atributo `data-to` em `pages/contato.html`).
4. Ligar o formulário a um backend ou CRM quando houver.

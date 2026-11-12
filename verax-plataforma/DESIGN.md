---
version: alpha
name: Verax — Documento Certificado do Campo
description: Identidade visual da plataforma Verax (due diligence e trade do agro).
colors:
  primary: "#BD8B1B"
  secondary: "#15211A"
  tertiary: "#1B7D45"
  background: "#E7D9BF"
  backgroundAlt: "#DBCBAC"
  surface: "#FFFFFF"
  surfaceMuted: "#F1E9D8"
  ink: "#1A1D1B"
  inkSoft: "#4C5049"
  inkFaint: "#6E7268"
  line: "#CDBF9F"
  gold: "#BD8B1B"
  goldDeep: "#7A5A11"
  goldSoft: "#E7D19A"
  forest: "#15211A"
  onForest: "#ECEAE0"
  go: "#1B7D45"
  goBg: "#E7F4EC"
  warn: "#9A6A12"
  warnBg: "#FAF1D9"
  stop: "#B23124"
  stopBg: "#FBE7E4"
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  data:
    fontFamily: IBM Plex Mono
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  none: 0px
  sm: 0px
  md: 0px
  lg: 0px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
---

# Verax — Documento Certificado do Campo

## Referência (o que copiar, o que não)

A Verax não é um SaaS "fofo" de cantos arredondados. A referência é o **documento
certificado**: uma cédula, um laudo carimbado, um selo de autenticidade. Some-se a isso a
**terra do campo**: o fundo é um marrom claro de solo, não branco de blog. O resultado é
sério, sólido e confiável, o oposto do visual genérico de IA.

Se precisar de uma frase-guia: *um cartório do agro, impresso em papel de solo, com selo dourado.*

## Cor

- **Fundo** é `background` (marrom-terra claro). Nunca branco puro na área da plataforma.
- **Superfícies** (cards, tabelas) são `surface` branco, para contraste e leitura, com borda
  `line` de 1px. É o "papel" sobre a terra.
- **Ouro** (`gold`) é o selo: usado com parcimônia, no dado mais importante, na aba ativa, nos
  botões primários e nos acentos. **Ouro não é cor de texto corrido**; para texto sobre fundo
  claro use `goldDeep`. Um uso de ouro por bloco, não dez.
- **Verde-mata** (`forest`) é a barra de controle (topo do app) e faixas de comando. Sólido,
  opaco, nunca translúcido.
- **Semáforo** (`go`/`warn`/`stop`) é semântico, é a saída do produto. Não é decoração e não
  se mistura com o ouro da marca.
- Texto: `ink` para títulos e corpo, `inkSoft` para secundário, `inkFaint` para rótulos.

## Forma

- **Cantos quadrados** em tudo que é retângulo (cards, botões, abas, inputs, chips). `rounded`
  é 0 em toda a escala. Só permanecem redondos os elementos que são círculos por natureza: as
  luzes do semáforo, o medidor de score, o selo/logo, avatares e pontos de status.
- **Nada translúcido.** Fundos são sólidos. A barra de abas é `forest` opaco; a aba ativa é
  `gold` sólido com texto escuro.
- Bordas de 1px em `line`; hairlines de precisão, sem sombras exageradas.

## Tipografia

- **Plus Jakarta Sans** para tudo que é fala humana: `display` (títulos de tela), `heading`
  (títulos de card), `body`.
- **IBM Plex Mono** para a camada de dados e controle: `label` (rótulos caixa-alta com
  tracking), `data` (números, valores, tabelas, com `tabular-nums`). É o que dá a cara de
  instrumento e ledger.
- Serifa: nenhuma. Nada de creme com serifa (é o clichê de IA a evitar).

## Do's

- Um número-herói por tela, o resto vira rótulo.
- Ouro só no dado mais importante do bloco.
- Tabelas e valores em mono com `tabular-nums`.
- Estado sempre legível de relance: chip de cor + texto (verde/amarelo/vermelho).
- Respeitar os papéis: o que é só do Admin (engates de API e Drive) nunca aparece para o cliente.

## Don'ts

- Cantos arredondados, gradientes suaves, vidro/translúcido.
- Creme com serifa, ouro como texto de corpo, grades iguais de cards repetidas tela após tela.
- Semáforo como enfeite; ouro e verde-semáforo competindo.
- Emoji como marcador de seção.

## Acessibilidade

- Contraste mínimo AA (4.5:1) para texto: usar `ink`/`inkSoft` sobre `surface`/`background`,
  e `goldDeep` quando o dourado precisar virar texto. Ouro claro (`gold`) só como preenchimento
  ou acento, com texto escuro por cima.
- Foco de teclado sempre visível (contorno dourado).
- Respeitar `prefers-reduced-motion` (o Ken Burns e o parallax do site desligam).

---
version: alpha
name: Vorkax
description: "Fintech de câmbio, crédito, plataforma e compras públicas. Verde de prosperidade, ouro de abundância, marfim quente de confiança. Símbolo: Falcão 3 (V com asas)."
colors:
  primary: "#0F4C3A"
  primary-deep: "#0A2E24"
  gold: "#C9A227"
  gold-light: "#E6CB6E"
  ivory: "#FAF7EE"
  sand: "#EFE8D2"
  ink: "#12201B"
  muted: "#4F625B"
  growth: "#1F8A5B"
  white: "#FFFFFF"
  up: "#7DDBA3"
  down: "#F2A08B"
typography:
  h1:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 6px
  md: 12px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ivory}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.primary-deep}"
  hero:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.ivory}"
  card:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
  text-secondary:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.muted}"
  link:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.primary}"
  highlight:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.gold-light}"
  icon-growth:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.growth}"
  header:
    backgroundColor: "{colors.white}"
    textColor: "{colors.primary}"
  ticker-up:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.up}"
  ticker-down:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.down}"
---

# Vorkax

## Visão
Referência: a sobriedade de um banco privado (verde-floresta e marfim, como papel-moeda e escritório de família), com ouro em pequenas doses para sinalizar valor. Discreta, mas imponente. Nada de verde neon nem dourado metálico brilhante.

## Símbolo
Falcão 3: a letra V formada pelo corpo do falcão, com três linhas de penas de cada lado. Sempre em ouro sobre verde-noturno, ou verde sobre marfim. Nunca distorcer, nunca preencher o V.

## Cores
- Verde Esmeralda Profundo (primary): marca, botões, links.
- Verde Noturno (primary-deep): hero, cabeçalho e rodapé.
- Ouro Antigo (gold): CTA principal e símbolo. No máximo 10% da tela.
- Marfim (ivory) e Areia (sand): fundos claros.
- Tinta (ink) e Musgo (muted): textos.
- Verde Crescimento (growth): só ícones e gráficos, nunca texto pequeno.
- Branco (white): cabeçalho (letras e símbolo em verde) e cartão da calculadora de câmbio.
- Alta (up) e Baixa (down): só para a variação de cotação no letreiro, sempre junto do símbolo ▲ ou ▼.

## Do
- Proporção 60% marfim/areia, 30% verde, 10% ouro.
- Ouro sobre verde-noturno.

## Don't
- Ouro como texto sobre marfim ou sobre o verde primary (contraste insuficiente).
- Vermelho como destaque. Números ou depoimentos inventados.

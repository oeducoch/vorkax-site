# Segurança — Plataforma Verax

Este documento registra a postura de segurança do protótipo e o que precisa entrar na Fase 2
(backend). Baseado na arquitetura de segurança do projeto (ver a nota
`seguranca-arquitetura-plataforma-verax-2026-09-07.md` no Vault).

## O que este repositório é (e não é)

- É um **protótipo front-end** (HTML/CSS/JS puro), sem servidor. Todo o estado vive no
  `localStorage` do navegador de cada pessoa.
- **A validação de login é client-side** (a credencial está no código): serve como porta de
  demonstração, **não é autenticação real**. Qualquer pessoa que abra o código-fonte vê a senha.
  Não use este arquivo para proteger dado real.
- O controle de papéis (Admin/Master/Head/User) é uma **demonstração de UI**: esconde/mostra e
  bloqueia edição no navegador. **Não é enforcement de segurança**; um usuário técnico contorna.

## Controles já aplicados no protótipo

- **Escape de saída (anti-XSS):** todo dado editável pelo usuário passa por `esc()` antes de ir
  para `innerHTML` (nomes, descrições, e-mails, pareceres, anexos). Isso neutraliza injeção de
  `"` e `<` em atributos e texto.
- **Sem rede externa:** o protótipo não faz chamadas a hosts externos (além das fontes Google).
  Não há vazamento de dado para terceiros.
- **Papéis e visibilidade:** engates sensíveis (API de câmbio, pastas do Google Drive) só
  aparecem para o Administrador; o cliente nunca vê essas configurações.
- **Contraste/acessibilidade:** tokens de texto ajustados para contraste WCAG AA; foco de
  teclado sempre visível; `prefers-reduced-motion` respeitado.

## O que a Fase 2 (backend) precisa implementar

Do checklist da arquitetura de segurança do projeto:

- **Autenticação real** com senha em hash (bcrypt/argon2), MFA (OTP), gestão e expiração de sessão.
- **RBAC no servidor:** as permissões (nenhum/leitura/edição por ferramenta) validadas no backend,
  não só na UI. O front nunca é a fronteira de segurança.
- **Multi-tenant com Postgres Row-Level Security** (isolamento por `tenant_id`).
- **Criptografia** em trânsito (TLS 1.2+) e em repouso; segredos (chaves de bureau/câmbio) em
  cofre, nunca no código nem em planilha.
- **Upload seguro de documentos:** varredura antivírus, checagem de tipo/MIME, tamanho e hash,
  storage isolado sem execução, antes de enviar ao Google Drive (OAuth do lado servidor).
- **Trilha de auditoria append-only** (quem, quando, o quê), base da defensabilidade do laudo.
- **Screening OFAC/UE/PEP** (opensanctions) e cofre de PII (databunker) para dado sensível.
- **Validação de entrada** também no servidor (o front valida por conveniência, o servidor por segurança).
- **Headers de segurança** (CSP, HSTS), rate limiting e proteção CSRF nas rotas.
- **Pentest** (strix) e SCA de dependências no CI antes de cada release.

## Reporte de vulnerabilidade

Enquanto não há canal formal, reportar diretamente ao administrador
(`admcuentasbolitas@gmail.com`). Nunca publicar credenciais reais neste repositório.

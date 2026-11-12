# Verax — Plataforma

Protótipo da plataforma Verax (due diligence, financeiro, estoque, câmbio, crédito, CRM e
administração) em **HTML, CSS e JavaScript puro**, sem framework e sem dependências para instalar.
O estado do usuário é salvo no navegador (`localStorage`).

## Estrutura

```
verax-plataforma/
├── index.html          página principal (site + login + app)
├── css/styles.css      todo o estilo
├── js/app.js           toda a lógica (papéis, módulos, persistência)
├── assets/img/         fotos do agro (hero, aérea, grão)
├── build.py            gera o arquivo único self-contained em dist/
└── dist/               saída do build (para publicar/compartilhar)
```

## Como editar

Abra a pasta no seu editor (ou no Codex) e mexa em três lugares:

- **`css/styles.css`** para o visual (cores, bordas, tipografia). As cores ficam nas variáveis
  `:root` no topo (ex.: `--bg` é o fundo marrom-terra, `--gold` é o dourado).
- **`js/app.js`** para o comportamento: os dados iniciais (função `seed()`), os módulos
  (`rInicio`, `rDD`, `rFin`, `rEst`, `rCambio`, `rCredito`, `rCRM`, `rAdmin`), as permissões
  (`PERMS`) e os engates (`S.apis`).
- **`index.html`** para a estrutura das telas.

## Como visualizar (sem instalar nada)

Servir a pasta localmente (recomendado, evita restrições de `file://`):

```bash
cd /Users/lecochlar94/Repos/verax-plataforma
python3 -m http.server 8000
# abra http://localhost:8000 no navegador
```

Ou simplesmente abra o `index.html` no navegador.

**Login do protótipo:** `admcuentasbolitas@gmail.com` / `Bolitas*`.
No topo do app, o seletor **"Ver como"** (visível para o Admin) alterna os papéis
Master / Head / User para testar as permissões.

## Como gerar o arquivo único (para publicar/compartilhar)

```bash
python3 build.py
# gera dist/verax-plataforma.html (CSS, JS e imagens embutidos)
```

Esse arquivo abre sozinho em qualquer navegador e é o que se publica como Artifact.

## Como editar com o Codex

```bash
cd /Users/lecochlar94/Repos/verax-plataforma
codex
# peça alterações em css/styles.css, js/app.js ou index.html
```

Como é vanilla, o Codex edita direto os arquivos, sem passo de build para testar (só rode o
servidor local acima). O `build.py` só é necessário para produzir o arquivo único de entrega.

## Administração e acesso

- **Administrador** (Verax): acesso total, edição em tudo, único a ver os engates de API e Drive
  e a aba Administração.
- **Master**: visão 360° da equipe, edição em todas as ferramentas, sem engates de admin.
- **Head**: só as áreas liberadas pelo master, em leitura ou edição.
- **User**: leitura das áreas liberadas, edição só no CRM e na própria conta.

A aba Administração agora separa usuários, MFA, matriz de políticas, auditoria e integrações. A
matriz padrão fica em `PERMS` (`js/app.js`); o admin ajusta por usuário no protótipo.

Para produção, o desenho recomendado é:

- **Authentik** como provedor de identidade, com OIDC, convite, sessão e MFA.
- **Ory Keto** como serviço de autorização no backend, para verificar relações de organização,
  usuário e recurso em cada requisição.
- Segredos da API bancária em cofre do backend; apenas referências não secretas podem aparecer
  no console web.

O estado atual no navegador é deliberadamente uma demonstração visual desse modelo — não deve ser
tratado como controle de acesso de produção.

## Câmbio e API bancária

O módulo tem um fluxo de empresa remetente, empresa beneficiária, finalidade, cotação e aceite de
fechamento. Ele chama exclusivamente um gateway autenticado no backend:

```text
POST /v1/fx/quotes
POST /v1/fx/quotes/{quoteId}/accept
```

O gateway é quem conversa com o banco, guarda credenciais/certificados e devolve uma cotação com
`id`, `rate`, `expiresAt`, valores e moedas. O aceite precisa ser idempotente e só deve registrar a
operação após a confirmação do banco.

O gate de preparação verifica endpoint HTTPS, provedor, referência de segredo no backend,
OAuth/mTLS, escopos mínimos e chave pública de webhook. A integração só pode ser marcada como
pronta para produção depois de contrato técnico, credenciais/cofre, sandbox, testes de
idempotência, validação de webhook e reconciliação com o banco.

## Limites (protótipo) e o que é Fase 2

Isto roda 100% no navegador. Exigem backend (Fase 2), e estão como **engate pronto** (configurável
pelo Admin): login real multiusuário, Google Drive (OAuth) para os anexos, API do parceiro de
câmbio, feed das câmeras (Supervision + RuView) e persistência compartilhada entre dispositivos.
A validação de senha no login é client-side, serve só como porta do protótipo.

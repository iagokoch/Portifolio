# Portfólio · Iago Koch

Site em português (com alternância para inglês): minimalismo escuro, off-white e prata na tipografia, **azul glacial** como cor de assinatura (só nos mascotes, no foco, no caret do terminal, na miniatura ativa e no brilho dos tablets) e pixel art apenas como detalhe, nos bichinhos. Tem uma página inicial (hero com bichinhos que dá para arrastar e arremessar, projetos em acordeão com tablet 3D, sobre, stack, atividade do GitHub e contato com terminal interativo) e uma página para cada projeto.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`), com os tokens do design em variáveis CSS
- `react-router` para as rotas (`/` e `/projetos/:slug`)
- Sem bibliotecas de UI ou de animação: o efeito 3D dos tablets é só CSS e a física dos bichinhos é `requestAnimationFrame`
- `backend/`: API Spring Boot (Java 21) que recebe o formulário de contato, com PostgreSQL e Flyway. Sobe com `docker-compose.yml`.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + build de produção em dist/
npm run preview  # serve o build
npm run lint
```

O formulário de contato chama `${VITE_API_URL}/api/contact`. Copie `.env.example` para `.env` e ajuste. Sem o backend no ar o formulário mostra a mensagem de erro de conexão.

## Notificações de contato

Quando alguém envia o formulário e o banco confirma a gravação, o backend avisa por **Telegram** e por **e-mail**, em segundo plano. O visitante recebe a resposta de sucesso sem esperar os envios, e a falha de um canal não impede o outro. Contatos barrados pelo honeypot ou inválidos não geram aviso.

No e-mail, o remetente é fixo (`CONTACT_EMAIL_FROM`) e o `Reply-To` é o e-mail do visitante: clicar em Responder no Gmail escreve direto para ele.

Se um envio falhar, o backend registra o erro no log (só ID do contato e canal, sem mensagem nem dados pessoais) e tenta avisar por um webhook do **Discord**. Se o próprio Discord falhar, só o log registra, sem alerta em cadeia.

### Variáveis

Todas ficam no `.env` da raiz, que o `docker-compose.yml` repassa ao backend. Nunca coloque esses valores no código ou no git.

| Variável | Obrigatória quando | Segredo |
|---|---|---|
| `CONTACT_EMAIL_ENABLED` | nunca (padrão `false`) | não |
| `CONTACT_EMAIL_FROM` | e-mail ligado | não |
| `CONTACT_EMAIL_TO` | e-mail ligado | não |
| `CONTACT_SMTP_USERNAME` | e-mail ligado | não |
| `CONTACT_SMTP_PASSWORD` | e-mail ligado | **sim** |
| `CONTACT_TELEGRAM_ENABLED` | nunca (padrão `false`) | não |
| `CONTACT_TELEGRAM_BOT_TOKEN` | Telegram ligado | **sim** |
| `CONTACT_TELEGRAM_CHAT_ID` | Telegram ligado | **sim** |
| `CONTACT_DISCORD_ENABLED` | nunca (padrão `false`) | não |
| `CONTACT_DISCORD_WEBHOOK_URL` | Discord ligado | **sim** |

### Ativando cada canal

- **E-mail (SMTP do Gmail):** `CONTACT_SMTP_USERNAME` é o endereço Gmail e `CONTACT_SMTP_PASSWORD` é uma [senha de app](https://support.google.com/accounts/answer/185833?hl=pt-BR), não a senha da conta. `CONTACT_EMAIL_FROM` deve ser a própria conta, porque o Gmail reescreve remetentes que não são dela.
- **Telegram:** crie o bot com o BotFather, envie `/start` para ele a partir da sua conta (sem isso o bot não pode escrever para você) e use o `chat_id` da conversa privada.
- **Discord:** crie um webhook no canal de alertas e use a URL dele.

Depois de preencher o `.env`, recrie o backend: `docker compose up -d backend`. Com um canal ligado e uma variável faltando, o backend sobe normalmente e o erro aparece no log no primeiro contato, como falha de envio.

### Limites da primeira versão

- Cada canal tem uma fila de 20 envios, 1 worker e tempos limite de 3 s (conexão) e 5 s (resposta). Fila cheia conta como falha e gera alerta.
- Não há fila persistente nem reenvio: uma queda do servidor com envios pendentes perde os avisos. O contato continua salvo no banco. A recuperação está na issue #2.
- O alerta cobre erros detectados no envio. Ele não confirma que o e-mail aceito pelo SMTP chegou nem que alguém leu.

## Onde editar o conteúdo

| O quê | Onde |
|---|---|
| E-mail, telefone, número do WhatsApp, usuário do GitHub | `src/config.ts` |
| Projetos: nome, link do repositório e ilustração do tablet | `src/data/projects.ts` |
| Textos dos projetos (descrição, métrica, tecnologias, destaques, fatos) e todos os demais textos, em PT e EN | `src/i18n/pt.ts` e `src/i18n/en.ts` |
| Stack (os itens de cada grupo) | `src/sections/Skills.tsx` (lista `GROUPS`) |
| Cores, fontes e raios | `src/styles/tokens.css` e o bloco `@theme` de `src/index.css` |

O `en.ts` é tipado pelo formato do `pt.ts`: se uma chave faltar em um dos idiomas, o `npm run build` falha.

Um projeto sem `repoUrl` em `src/data/projects.ts` é tratado como privado: a página dele não mostra "Ver código".

## Estrutura

```
src/
  components/
    illustrations/  telas ilustrativas (640×400) que aparecem dentro dos tablets
    ui/             Button, Section, SectionTitle, Tag, Icon, Pet, Reveal, TabletScene, ScaledScreen
    ScrollManager   rolagem entre páginas e até a seção de um link com hash (/#contato)
  pages/            Home e ProjectPage
  sections/         Navbar, SideRail, Hero (com Playground), Projects, About, Skills, Heatmap, Contact, Footer
  i18n/             dicionários PT/EN e o contexto de idioma
  hooks/            useContributions (API do GitHub), useReducedMotion, useTilt, useDocumentTitle
  lib/              cálculo do heatmap e envio do formulário
  data/             lista de projetos
```

## Comportamentos

- **Playground** (`sections/hero/Playground.tsx`): os bichinhos caem, quicam, colidem, piscam e podem ser arrastados e arremessados. A animação mexe no DOM por refs, sem re-render a cada quadro, e pausa quando a caixa sai da tela.
- **Projetos** (`sections/projects/Projects.tsx`): acordeão com um item aberto por vez. Abre com hover (após um pequeno atraso), foco do teclado ou clique/toque, e acompanha a rolagem 900 ms depois do último hover.
- **Tablet 3D**: `TabletScene` e `useTilt`. O tablet inclina conforme o mouse sobre o cartão.
- **Indicador lateral** (`SideRail`): só aparece quando o container tem 1400px ou mais e só na home.
- **Rotas**: `/projetos/:slug` (slug = `id` em `src/data/projects.ts`). Slug ou rota desconhecidos voltam para a home.
- **Movimento reduzido** (`prefers-reduced-motion`): sem animações de entrada, sem paralaxe do título, sem inclinação dos tablets, sem pulinhos automáticos dos bichinhos e do indicador, e o caret do terminal não pisca.

## Heatmap

Os dados vêm de `https://github-contributions-api.jogruber.de/v4/<usuario>?y=last`. Se a API falhar, a grade fica vazia com um aviso: o site nunca mostra contribuições inventadas.

## Publicação

Como o site usa rotas de verdade, o servidor precisa devolver `index.html` para qualquer caminho (por exemplo `/projetos/dentagenda`), senão recarregar uma página de projeto dá 404. O `vite dev` e o `vite preview` já fazem isso; em produção é uma regra do seu host (rewrite para `/index.html`, ou `try_files` no nginx).

## Pendências antes de publicar

- [ ] **Confirmar o conteúdo dos projetos** em `src/i18n/pt.ts`. Os textos vieram do handoff do design: Axevoke e Dashboard TIflux foram inferidos, e os números (628 testes no backend e 175 no front, 15 de 19 requisitos, equipe de 6 pessoas) e os repositórios precisam ser conferidos.
- [ ] **Trocar as ilustrações por prints reais.** As telas dos tablets (`src/components/illustrations/Screen.tsx`) são esquemas sem dados reais, marcados "ilustração", e alguns têm texto de exemplo.
- [ ] Revisar o texto em inglês de `src/i18n/en.ts`.
- [ ] Configurar o fallback de SPA no host (seção "Publicação").
- [ ] Opcional: adicionar uma imagem `og:image` e a URL canônica no `index.html` quando o domínio estiver definido.

## Design

O design de referência (alta fidelidade) é o handoff `design_handoff_portfolio_v5`, fora deste repositório. Ele é uma referência de aparência e comportamento; onde conflitar com a arquitetura real, vale o código.

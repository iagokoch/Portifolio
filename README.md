# Portfólio · Iago Koch

Site de uma página, em português (com alternância para inglês), com identidade de "jogo retrô / terminal": base azul-preta, acento âmbar e lavanda como cor secundária. Tem uma tela de boot, bichinhos em pixel art que "digitam" o hero e montam cada seção bloco a bloco, um heatmap com contribuições reais do GitHub e um terminal interativo.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`), com os tokens do design em variáveis CSS
- Sem bibliotecas de UI ou de animação: tudo é CSS e `requestAnimationFrame`

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + build de produção em dist/
npm run preview  # serve o build
npm run lint
```

## Onde editar o conteúdo

| O quê | Onde |
|---|---|
| E-mail, telefone, número do WhatsApp, usuário do GitHub | `src/config.ts` |
| Projetos (nome, tecnologias, links do repositório e da demo) | `src/data/projects.ts` |
| Todos os textos, em PT e EN (incluindo terminal e falas dos bichinhos) | `src/i18n/pt.ts` e `src/i18n/en.ts` |
| Skills | `src/sections/Skills.tsx` (lista `GROUPS`) |
| Cores, fontes e sombras | `src/styles/tokens.css` e o bloco `@theme` de `src/index.css` |

O `en.ts` é tipado pelo formato do `pt.ts`: se uma chave faltar em um dos idiomas, o `npm run build` falha.

## Estrutura

```
src/
  components/
    anim/    Critters (hero) e Crew (montagem das seções), mais o sprite compartilhado
    ui/      Button, Section, SectionHeader, Tag, IKTile, PixelGrid...
  sections/  Intro, Navbar, Hero, Projects, About, Skills, Heatmap, Contact, Footer
  i18n/      dicionários PT/EN e o contexto de idioma
  hooks/     useContributions (API do GitHub), useReducedMotion
  lib/       avatar procedural 48×48, mapas de pixel, cálculo do heatmap
  data/      lista de projetos
```

## Animações

- **Critters** (`components/anim/Critters.tsx`): seis bichinhos andam pela base das linhas marcadas com `data-crit` no hero e revelam o texto via `clip-path`. Depois cinco voam embora e o último segue o mouse enquanto ele estiver no hero.
- **Crew** (`components/anim/Crew.tsx`): cada seção tem uma faixa que, ao entrar na tela, corta os elementos marcados com `data-load` em tiles e faz os carregadores levarem cada tile ao lugar, com direito a um tropeço por seção. Quem passa direto pela faixa (âncora, End, scroll rápido) vê o conteúdo na hora, sem animação.
- Ambas movem o DOM direto por refs, sem re-render a cada quadro, e pausam ou terminam o loop quando não há mais nada a animar.
- Com `prefers-reduced-motion: reduce`, a tela de boot e as duas animações são puladas e o conteúdo aparece direto.

## Heatmap

Os dados vêm de `https://github-contributions-api.jogruber.de/v4/<usuario>?y=last`. Se a API falhar, a grade fica vazia com um aviso: o site nunca mostra contribuições inventadas.

## Pendências antes de publicar

- [ ] Trocar o e-mail, o telefone e o número do WhatsApp em `src/config.ts` (hoje são placeholders).
- [ ] Trocar as URLs de repositório e de demo em `src/data/projects.ts` (hoje todos apontam para o perfil do GitHub, e as duas demos para `#`).
- [ ] Ligar o formulário de contato a um serviço de envio: hoje ele só simula o sucesso (veja o `TODO` em `src/sections/contact/ContactForm.tsx`).
- [ ] Revisar o texto em inglês de `src/i18n/en.ts`.
- [ ] Opcional: adicionar uma imagem `og:image` e a URL canônica no `index.html` quando o domínio estiver definido.

## Design

O design de referência (alta fidelidade) está no handoff `design_handoff_portfolio_v2`, fora deste repositório: tokens, tipografia, espaçamentos e o comportamento das animações seguem o README dele.

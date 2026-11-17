# Pendências do portfólio

Site no ar em https://iagokoch.dev (deploy concluído em 2026-11-17: Docker Compose + Cloudflare Tunnel, com e-mail, Telegram e alerta no Discord funcionando). O que sobrou está abaixo.

## Servidor

- [ ] Guardar uma cópia do `.env` do servidor num gerenciador de senhas (tem senha do banco, token do túnel, senha de app do Gmail, token do Telegram e webhook do Discord). Nunca no git.
- [ ] Opcional: testar `sudo reboot` e conferir que o site volta sozinho (o Docker já está `enabled`).
- [ ] Apagar `compose.lan.local` (não é mais usado; o acesso é pelo túnel).
- [ ] Apagar `.env.stack` depois do backup do `.env`.
- [x] Fallback de SPA (resolvido pelo `Caddyfile`).

Para atualizar o site: `git pull` e depois `docker compose --profile tunnel up -d --build` (sem `--profile tunnel` o `cloudflared` não sobe).

## Conteúdo (repositório)

- [ ] **Conferir os textos dos projetos** em `src/i18n/pt.ts`. Axevoke e Dashboard TIflux foram inferidos. Os números (628 testes no backend, 175 no front, 15 de 19 requisitos, equipe de 6 pessoas) e os links dos repositórios precisam ser reais, porque agora são públicos.
- [x] **Prints reais nos tablets** (DentAgenda, Monitoolring, PetFriend Connect e email-to-ticket), em `src/assets/projects/<id>/`. A ordem vem do prefixo do nome do arquivo (`01-`, `02-`...) e o `01-` é o do tablet da home.
- [ ] **Axevoke e Dashboard TIflux continuam com ilustração.** O repositório `axevoke/axevoke` está vazio (e o link público leva a ele). Refazer os prints quando houver conteúdo.
- [ ] Monitoolring só tem 3 prints e email-to-ticket só 1 (a galeria mostra o que existe).
- [ ] Revisar o inglês em `src/i18n/en.ts`.
- [ ] Adicionar `og:image` e URL canônica (`https://iagokoch.dev`) no `index.html`. A `og:image` é a prévia ao compartilhar o link no LinkedIn e no WhatsApp.
- [ ] Atualizar a seção "Pendências antes de publicar" do `README.md` (marcar o que foi feito).

### Projetos que precisam de print

| Projeto | Repositório | Observação |
|---|---|---|
| DentAgenda | github.com/iagokoch/DentAgenda | |
| Monitoolring | github.com/iagokoch/horangotango | |
| email-to-ticket | github.com/iagokoch/email-to-ticket-automation | |
| Axevoke | github.com/axevoke/axevoke | |
| PetFriend Connect | github.com/joaofsdev/PetFriendConnect | |
| Dashboard TIflux | privado (sem `repoUrl`) | sem repositório público; print só se houver demonstração sem dados reais |

## Issue 2

- [ ] Recuperação de avisos perdidos: hoje não há fila persistente nem reenvio. Se o servidor cair com envios pendentes, o contato continua salvo no banco, mas o aviso se perde.

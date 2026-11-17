import type { ScreenKind } from '../components/illustrations/kinds'
import type { IconName } from '../components/ui/Icon'

export type ProjectId =
  | 'dentagenda'
  | 'monitoolring'
  | 'email-to-ticket'
  | 'axevoke'
  | 'petfriend-connect'
  | 'dashboard-tiflux'

export interface Project {
  /** Também é o slug da página do projeto: /projetos/:id */
  id: ProjectId
  name: string
  /** Sem repoUrl o repositório é privado: a página não mostra "Ver código" */
  repoUrl?: string
  /** Prints do projeto, na ordem de exibição: o primeiro é o do tablet da home */
  shots: string[]
  /** Ilustração do tablet, só para projetos sem print */
  screen?: ScreenKind
  /** Ícones dos 3 destaques da página do projeto, na mesma ordem de `features` no dicionário */
  icons: [IconName, IconName, IconName]
}

// Os prints ficam em src/assets/projects/<id>/, ordenados pelo prefixo do nome (01-, 02-...).
const shotFiles = import.meta.glob<string>('../assets/projects/*/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const shotsOf = (id: ProjectId) =>
  Object.keys(shotFiles)
    .filter((path) => path.startsWith(`../assets/projects/${id}/`))
    .sort()
    .map((path) => shotFiles[path])

// Textos (descrição, métrica, tecnologias, destaques) ficam em src/i18n, por idioma.
// Repositórios conforme o handoff do design v5: confirme antes de publicar.
export const projects: Project[] = [
  {
    id: 'dentagenda',
    name: 'DentAgenda',
    repoUrl: 'https://github.com/iagokoch/DentAgenda',
    shots: shotsOf('dentagenda'),
    icons: ['calendar', 'users', 'check'],
  },
  {
    id: 'monitoolring',
    name: 'Monitoolring',
    repoUrl: 'https://github.com/iagokoch/horangotango',
    shots: shotsOf('monitoolring'),
    icons: ['shield', 'check', 'code'],
  },
  {
    id: 'email-to-ticket',
    name: 'email-to-ticket',
    repoUrl: 'https://github.com/iagokoch/email-to-ticket-automation',
    shots: shotsOf('email-to-ticket'),
    icons: ['mail', 'arrow', 'check'],
  },
  {
    id: 'axevoke',
    name: 'Axevoke',
    repoUrl: 'https://github.com/axevoke/axevoke',
    shots: [],
    screen: 'axe',
    icons: ['shield', 'check', 'users'],
  },
  {
    id: 'petfriend-connect',
    name: 'PetFriend Connect',
    repoUrl: 'https://github.com/joaofsdev/PetFriendConnect',
    shots: shotsOf('petfriend-connect'),
    icons: ['calendar', 'shield', 'chart'],
  },
  {
    id: 'dashboard-tiflux',
    name: 'Dashboard TIflux',
    shots: [],
    screen: 'tif',
    icons: ['chart', 'check', 'shield'],
  },
]

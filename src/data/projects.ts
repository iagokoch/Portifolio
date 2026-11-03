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
  /** Ilustração exibida no tablet (até haver prints reais) */
  screen: ScreenKind
  /** Ícones dos 3 destaques da página do projeto, na mesma ordem de `features` no dicionário */
  icons: [IconName, IconName, IconName]
}

// Textos (descrição, métrica, tecnologias, destaques) ficam em src/i18n, por idioma.
// Repositórios conforme o handoff do design v5: confirme antes de publicar.
export const projects: Project[] = [
  {
    id: 'dentagenda',
    name: 'DentAgenda',
    repoUrl: 'https://github.com/iagokoch/DentAgenda',
    screen: 'agenda',
    icons: ['calendar', 'users', 'check'],
  },
  {
    id: 'monitoolring',
    name: 'Monitoolring',
    repoUrl: 'https://github.com/iagokoch/horangotango',
    screen: 'mono',
    icons: ['shield', 'check', 'code'],
  },
  {
    id: 'email-to-ticket',
    name: 'email-to-ticket',
    repoUrl: 'https://github.com/iagokoch/email-to-ticket-automation',
    screen: 'mail',
    icons: ['mail', 'arrow', 'check'],
  },
  {
    id: 'axevoke',
    name: 'Axevoke',
    repoUrl: 'https://github.com/axevoke/axevoke',
    screen: 'axe',
    icons: ['shield', 'check', 'users'],
  },
  {
    id: 'petfriend-connect',
    name: 'PetFriend Connect',
    repoUrl: 'https://github.com/joaofsdev/PetFriendConnect',
    screen: 'pet',
    icons: ['calendar', 'shield', 'chart'],
  },
  { id: 'dashboard-tiflux', name: 'Dashboard TIflux', screen: 'tif', icons: ['chart', 'check', 'shield'] },
]

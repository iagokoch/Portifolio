import type { ScreenKind } from '../components/illustrations/kinds'

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
}

// Textos (descrição, métrica, tecnologias, destaques) ficam em src/i18n, por idioma.
// Repositórios conforme o handoff do design v5: confirme antes de publicar.
export const projects: Project[] = [
  { id: 'dentagenda', name: 'DentAgenda', repoUrl: 'https://github.com/iagokoch/DentAgenda', screen: 'agenda' },
  { id: 'monitoolring', name: 'Monitoolring', repoUrl: 'https://github.com/iagokoch/horangotango', screen: 'mono' },
  {
    id: 'email-to-ticket',
    name: 'email-to-ticket',
    repoUrl: 'https://github.com/iagokoch/email-to-ticket-automation',
    screen: 'mail',
  },
  { id: 'axevoke', name: 'Axevoke', repoUrl: 'https://github.com/axevoke/axevoke', screen: 'axe' },
  {
    id: 'petfriend-connect',
    name: 'PetFriend Connect',
    repoUrl: 'https://github.com/joaofsdev/PetFriendConnect',
    screen: 'pet',
  },
  { id: 'dashboard-tiflux', name: 'Dashboard TIflux', screen: 'tif' },
]

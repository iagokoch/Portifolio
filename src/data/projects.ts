import { config } from '../config'

export type ProjectId = 'microlearn' | 'petfriend' | 'orders' | 'tiflux'

export interface Project {
  id: ProjectId
  name: string
  tags: string[]
  /** `soft` = acadêmico/dupla, `accent` = em andamento (com ponto) */
  statusVariant: 'soft' | 'accent'
  repoUrl: string
  /** Sem demoUrl, o card mostra "Link da demo em breve" */
  demoUrl?: string
}

// TODO: trocar repoUrl pelos repositórios reais e demoUrl pelos links publicados
export const projects: Project[] = [
  { id: 'microlearn', name: 'MicroLearn', tags: ['Node.js', 'Express', 'EJS', 'MySQL'], statusVariant: 'soft', repoUrl: config.githubUrl, demoUrl: '#' },
  { id: 'petfriend', name: 'PetFriend Connect', tags: ['React', 'TypeScript', 'CI/CD'], statusVariant: 'soft', repoUrl: config.githubUrl, demoUrl: '#' },
  { id: 'orders', name: 'order-processing-api', tags: ['Node.js', 'Express', 'PostgreSQL'], statusVariant: 'accent', repoUrl: config.githubUrl },
  { id: 'tiflux', name: 'Dashboard TIflux', tags: ['FastAPI', 'React', 'TypeScript', 'Vite'], statusVariant: 'accent', repoUrl: config.githubUrl },
]

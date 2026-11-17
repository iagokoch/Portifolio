import type { Project } from '../../data/projects'
import { Screen } from './Screen'

/**
 * Tela de 640×400 de um projeto: o print `index` quando existe; senão a ilustração.
 * Fica dentro do tablet (decorativo, aria-hidden), então o print não tem `alt`:
 * quem descreve a imagem é o rótulo do botão da miniatura.
 */
export function ProjectScreen({ project, index = 0 }: { project: Project; index?: number }) {
  const src = project.shots[index]
  if (src) {
    return <img src={src} alt="" width={640} height={400} draggable={false} className="block h-[400px] w-[640px] select-none" />
  }
  return project.screen ? <Screen kind={project.screen} /> : null
}

import type { ReactNode } from 'react'
import { Crew } from '../../components/anim/Crew'
import { Button } from '../../components/ui/Button'
import { Section } from '../../components/ui/Section'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { Tag } from '../../components/ui/Tag'
import { projects, type Project, type ProjectId } from '../../data/projects'
import { useLang } from '../../i18n/LangContext'
import { MicroLearnPreview, OrdersPreview, PetFriendPreview, TifluxPreview } from './previews'

const PREVIEWS: Record<ProjectId, ReactNode> = {
  microlearn: <MicroLearnPreview />,
  petfriend: <PetFriendPreview />,
  orders: <OrdersPreview />,
  tiflux: <TifluxPreview />,
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang()
  const item = t.projects.items[project.id]

  return (
    <div data-load={index}>
      <article className="flex h-full flex-col rounded-px border border-border-input bg-bg shadow-px transition-[transform,box-shadow,border-color] duration-[120ms] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:border-accent hover:shadow-px-lg">
        {PREVIEWS[project.id]}
        <div className="flex flex-1 flex-col gap-3.5 p-[22px]">
          <div className="flex items-center justify-between font-mono text-xs">
            <Tag variant={project.statusVariant}>{item.status}</Tag>
            <span className="text-muted">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="m-0 font-pixel text-[22px] font-normal">{project.name}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {'note' in item && <div className="font-mono text-xs text-muted">{item.note}</div>}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" size="sm">
              {t.projects.code}
            </Button>
            {project.demoUrl ? (
              <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                {t.projects.demo}
              </Button>
            ) : (
              <span className="cursor-not-allowed rounded-px border border-dashed border-border-input px-3 py-[9px] font-mono text-xs text-muted">
                {t.projects.demoSoon}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export function Projects() {
  const { t } = useLang()

  return (
    <Section id="projetos" panel>
      <SectionHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        balance
        className="mb-12"
        aside={<div className="font-mono text-[13px] text-muted">{t.projects.count}</div>}
      />
      <Crew message={t.crew.projects} wait className="-mt-2 mb-8" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-7">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}

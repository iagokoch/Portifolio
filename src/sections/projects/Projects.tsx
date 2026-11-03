import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Screen } from '../../components/illustrations/Screen'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { Section } from '../../components/ui/Section'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Tag } from '../../components/ui/Tag'
import { TabletScene } from '../../components/ui/TabletScene'
import { config } from '../../config'
import { projects, type Project } from '../../data/projects'
import { useTilt } from '../../hooks/useTilt'
import { useLang } from '../../i18n/useLang'

const HOVER_DELAY = 140 // ms entre o mouse parar sobre um item e ele abrir
const SCROLL_HOLD = 900 // a rolagem só assume o acordeão tanto tempo depois do último hover
const SCROLL_MIN_GAP = 450 // intervalo mínimo entre duas trocas causadas pela rolagem
const DEFAULT_SLOT = 108 // altura de uma linha fechada (usada se não der para medir)

interface RowProps {
  project: Project
  index: number
  active: boolean
  onEnter: (index: number) => void
  onHover: (index: number, e: MouseEvent<HTMLElement>) => void
  onLeave: () => void
}

function ProjectRow({ project, index, active, onEnter, onHover, onLeave }: RowProps) {
  const { t } = useLang()
  const item = t.projects.items[project.id]
  const { ref: tiltRef, style: tiltStyle, onMove: onTiltMove, onLeave: onTiltLeave } = useTilt(52, -24)
  const panelId = `project-${project.id}`

  return (
    <Reveal className="mb-3">
      <article
        onMouseMove={(e) => {
          onTiltMove(e)
          onHover(index, e)
        }}
        onMouseLeave={() => {
          onTiltLeave()
          onLeave()
        }}
        className={`rounded-[16px] border transition-[background-color,border-color] duration-[600ms] ${
          active ? 'border-line-strong bg-card' : 'border-line bg-transparent'
        }`}
      >
        <button
          type="button"
          aria-expanded={active}
          aria-controls={panelId}
          onClick={() => onEnter(index)}
          onFocus={() => onEnter(index)}
          className="grid w-full cursor-pointer rounded-[16px] grid-cols-1 items-baseline gap-x-6 gap-y-1.5 border-0 bg-transparent px-[26px] py-[22px] text-left text-ink @min-[820px]:grid-cols-[48px_1fr_auto]"
        >
          <span className="font-mono text-xs text-ink-2">{String(index + 1).padStart(2, '0')}</span>
          <span>
            <b
              className={`leading-[1.1] font-bold tracking-[-0.02em] transition-[font-size] duration-[600ms] ease-out ${
                active ? 'text-[clamp(28px,3.4cqw,44px)]' : 'text-[22px]'
              }`}
            >
              {project.name}
            </b>
            <span className="mt-0.5 block text-[15px] text-ink-2">{item.short}</span>
          </span>
          <span className="font-mono text-xs text-ink-2">{item.stack}</span>
        </button>

        {/* grid-template-rows 0fr → 1fr anima a altura; fechado, o conteúdo sai da ordem de foco depois da animação */}
        <div
          id={panelId}
          className={`grid ${
            active
              ? 'visible grid-rows-[1fr] [transition:grid-template-rows_.7s_var(--ease-out),visibility_0s_linear_0s]'
              : 'invisible grid-rows-[0fr] [transition:grid-template-rows_.7s_var(--ease-out),visibility_0s_linear_.7s]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="grid grid-cols-1 items-center gap-x-10 gap-y-5 px-[26px] pb-[30px] @min-[820px]:grid-cols-[1.1fr_1fr]">
              <TabletScene tiltRef={tiltRef} tiltStyle={tiltStyle}>
                <Screen kind={project.screen} />
              </TabletScene>
              <div className="flex flex-col items-start gap-4">
                <p className="m-0 max-w-[480px] text-lg text-ink">{item.desc}</p>
                <div className="font-mono text-xs text-ink-2">{item.metric}</div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <Button href={`/projetos/${project.id}`} className="mt-1.5">
                  {t.projects.open}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const listRef = useRef<HTMLDivElement>(null)
  const hoverAt = useRef(0)
  const hoverTimer = useRef(0)
  const pointer = useRef<[number, number] | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  // Rolagem: o item ativo acompanha a posição da lista na tela, sem brigar com o mouse
  useEffect(() => {
    let queued = false
    let lastSwitch = 0
    let retry = 0

    const update = () => {
      queued = false
      const list = listRef.current
      if (!list || Date.now() - hoverAt.current < SCROLL_HOLD) return

      const vh = window.innerHeight
      const r = list.getBoundingClientRect()
      if (!(r.top < vh * 0.55 && r.bottom > vh * 0.25)) return

      // cada item "vale" a altura de uma linha fechada: medir a lista inteira faria o índice oscilar
      // enquanto o acordeão abre e fecha
      const closed = list.querySelector<HTMLElement>('button[aria-expanded="false"]')
      const slot = closed ? closed.offsetHeight + 12 : DEFAULT_SLOT
      const index = Math.max(0, Math.min(projects.length - 1, Math.floor((vh * 0.55 - r.top) / slot)))
      if (index === activeRef.current) return

      const now = Date.now()
      if (now - lastSwitch > SCROLL_MIN_GAP) {
        lastSwitch = now
        setActive(index)
      } else {
        clearTimeout(retry)
        retry = window.setTimeout(schedule, SCROLL_MIN_GAP + 30)
      }
    }

    const schedule = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      clearTimeout(retry)
    }
  }, [])

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const enter = (index: number) => {
    hoverAt.current = Date.now()
    clearTimeout(hoverTimer.current)
    setActive(index)
  }

  const hover = (index: number, e: MouseEvent<HTMLElement>) => {
    const last = pointer.current
    pointer.current = [e.clientX, e.clientY]
    // rolar a página com o mouse parado também dispara mousemove: só conta se o mouse andou de verdade
    if (!last || Math.abs(e.clientX - last[0]) + Math.abs(e.clientY - last[1]) < 3) return
    hoverAt.current = Date.now()
    clearTimeout(hoverTimer.current)
    if (activeRef.current !== index) hoverTimer.current = window.setTimeout(() => setActive(index), HOVER_DELAY)
  }

  const leave = () => clearTimeout(hoverTimer.current)

  return (
    <Section id="projetos" noBorder innerClassName="pb-[clamp(80px,9cqw,140px)]">
      <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-x-[30px] gap-y-3.5">
        <SectionTitle request={t.projects.request} status={t.projects.status} title={t.projects.title} />
        <a
          href={`${config.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[13px] text-ink-2 no-underline transition-colors hover:text-ink"
        >
          {t.projects.all}
        </a>
      </Reveal>

      <div ref={listRef}>
        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            active={active === i}
            onEnter={enter}
            onHover={hover}
            onLeave={leave}
          />
        ))}
      </div>
    </Section>
  )
}

import { useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Screen } from '../components/illustrations/Screen'
import { DENT_KINDS } from '../components/illustrations/kinds'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { ScaledScreen } from '../components/ui/ScaledScreen'
import { TabletScene } from '../components/ui/TabletScene'
import { Tag } from '../components/ui/Tag'
import { projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useTilt } from '../hooks/useTilt'
import { useLang } from '../i18n/useLang'

/** Atraso da animação de entrada (lido pela utility `fade-up`) */
const delay = (seconds: string) => ({ '--d': seconds }) as CSSProperties

const NAV_BUTTON =
  'flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[rgba(240,237,231,.18)] bg-surface text-ink no-underline transition-colors hover:border-ink'

function ProjectView({ index }: { index: number }) {
  const { t } = useLang()
  const project = projects[index]
  const item = t.projects.items[project.id]
  const isDent = project.id === 'dentagenda'
  const [selected, setSelected] = useState(0)
  const { ref: tiltRef, style: tiltStyle, onMove, onLeave } = useTilt(58, -32)

  const prev = projects[(index + projects.length - 1) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const counter = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`

  useDocumentTitle(`${project.name} · Iago Koch`)

  return (
    <Container className="pt-[34px] pb-[90px]">
      <div style={delay('.05s')} className="fade-up flex items-center justify-between gap-4 font-mono text-[13px]">
        <Link to="/#projetos" className="text-ink-2 no-underline transition-colors hover:text-ink">
          {t.projects.back}
        </Link>
        <span className="flex items-center gap-2.5 text-ink-2">
          {counter}
          <Link to={`/projetos/${prev.id}`} aria-label={t.projects.prev} className={NAV_BUTTON}>
            ←
          </Link>
          <Link to={`/projetos/${next.id}`} aria-label={t.projects.next} className={NAV_BUTTON}>
            →
          </Link>
        </span>
      </div>

      {/* o tablet reage ao mouse sobre toda esta área, texto incluído */}
      <div onMouseMove={onMove} onMouseLeave={onLeave} className="relative mt-[26px]">
        <div className="pointer-events-none relative z-[2] flex flex-col items-start gap-[18px] @min-[820px]:max-w-[46%]">
          <h1
            style={delay('.15s')}
            className="fade-up m-0 text-[clamp(46px,7.4cqw,104px)] leading-[0.95] font-bold tracking-[-0.035em]"
          >
            {project.name}
          </h1>
          <p style={delay('.28s')} className="fade-up m-0 max-w-[480px] text-[19px] text-ink">
            {item.long}
          </p>
          <div style={delay('.28s')} className="fade-up flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {project.repoUrl && (
            <div style={delay('.4s')} className="fade-up pointer-events-auto">
              <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                {t.projects.code}
              </Button>
            </div>
          )}
        </div>

        <TabletScene
          variant="detail"
          tiltRef={tiltRef}
          tiltStyle={tiltStyle}
          className="fade-up relative mt-5 h-[300px] @min-[820px]:absolute @min-[820px]:top-[-30px] @min-[820px]:right-[-4%] @min-[820px]:mt-0 @min-[820px]:h-[520px] @min-[820px]:w-[68%]"
        >
          <Screen kind={isDent ? DENT_KINDS[selected] : project.screen} />
        </TabletScene>
      </div>

      <Reveal className="relative z-[3] mt-9 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-[rgba(240,237,231,.12)] pt-[30px] @min-[820px]:grid-cols-3">
        {item.features.map((f, i) => (
          <div key={f.t} className="flex items-start gap-4">
            <span className="flex size-[46px] flex-none items-center justify-center rounded-[10px] border border-line-strong bg-surface text-ink">
              <Icon name={project.icons[i]} />
            </span>
            <div>
              <b className="text-base">{f.t}</b>
              <div className="mt-0.5 text-[15px] leading-[1.45] text-ink-2">{f.s}</div>
            </div>
          </div>
        ))}
      </Reveal>

      {isDent ? (
        <Reveal className="relative z-[3] mt-[34px]">
          <div className="flex flex-wrap gap-3.5">
            {DENT_KINDS.map((kind, i) => {
              const on = i === selected
              return (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={on}
                  aria-label={t.projects.screens[kind]}
                  onClick={() => setSelected(i)}
                  className={`w-[150px] cursor-pointer overflow-hidden rounded-[10px] border-2 bg-card p-0 text-ink transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px] @min-[820px]:w-[176px] ${
                    on
                      ? 'border-glacial shadow-[0_0_22px_rgba(128,199,232,.28)]'
                      : 'border-[rgba(240,237,231,.14)] shadow-none'
                  }`}
                >
                  <ScaledScreen className="pointer-events-none">
                    <Screen kind={kind} />
                  </ScaledScreen>
                </button>
              )
            })}
          </div>
          <div className="mt-3.5 max-w-[640px] font-mono text-xs text-ink-2">{t.projects.shotsNote}</div>
        </Reveal>
      ) : (
        <Reveal className="relative z-[3] mt-[34px]">
          <div className="grid grid-cols-2 gap-3.5 @min-[820px]:grid-cols-4">
            {item.facts.map((f) => (
              <div key={f.k} className="rounded-xl border border-border bg-card px-[18px] py-4">
                <div className="font-mono text-xs text-ink-2">{f.k}</div>
                <b className="text-[17px]">{f.v}</b>
              </div>
            ))}
          </div>
          <div className="mt-3.5 max-w-[640px] font-mono text-xs text-ink-2">{t.projects.screenNote}</div>
        </Reveal>
      )}
    </Container>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.id === slug)
  // slug desconhecido: volta para a lista de projetos
  if (index === -1) return <Navigate to="/#projetos" replace />
  // `key` zera a miniatura selecionada ao trocar de projeto
  return <ProjectView key={slug} index={index} />
}

import { useRef, type CSSProperties, type MouseEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import { useLang } from '../../i18n/useLang'
import { Playground } from './Playground'

/** Atraso da animação de entrada (lido pela utility `fade-up`) */
const delay = (seconds: string) => ({ '--d': seconds }) as CSSProperties

export function Hero() {
  const { t } = useLang()
  const h = t.hero
  const titleRef = useRef<HTMLHeadingElement>(null)
  const frame = useRef(0)

  // Paralaxe do título: o deslocamento da extrusão varia ±2px conforme o mouse sobre o hero.
  // Os valores vão para variáveis CSS (--ox/--oy) em no máximo um quadro por vez.
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return
    const r = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      titleRef.current?.style.setProperty('--ox', `${(2 - nx * 2).toFixed(1)}px`)
      titleRef.current?.style.setProperty('--oy', `${(2 - ny * 2).toFixed(1)}px`)
    })
  }

  const onMouseLeave = () => {
    cancelAnimationFrame(frame.current)
    titleRef.current?.style.removeProperty('--ox')
    titleRef.current?.style.removeProperty('--oy')
  }

  return (
    <section id="top" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Container className="pt-10 @min-[820px]:pt-[clamp(48px,6cqw,84px)]">
        <div
          style={delay('.05s')}
          className="fade-up flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[12.5px] text-ink-2"
        >
          <span className="text-ink">
            {h.meta.request} <b>{h.meta.status}</b>
          </span>
          <span>{h.meta.place}</span>
        </div>

        <div className="mt-5 grid items-center gap-x-14 gap-y-8 @min-[820px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <h1
            ref={titleRef}
            style={delay('.15s')}
            className="fade-up display m-0 text-[clamp(92px,34cqw,150px)] leading-[0.8] tracking-[-0.02em] @min-[820px]:text-[clamp(100px,17cqw,240px)]"
          >
            <span className="title-depth block text-ink">{h.first}</span>
            <span className="title-depth block bg-[linear-gradient(180deg,#e6e9ed_0%,#9aa1ac_100%)] bg-clip-text pb-[0.04em] text-transparent">
              {h.last}
            </span>
          </h1>

          <div style={delay('.28s')} className="fade-up flex max-w-[520px] flex-col gap-[26px]">
            <p className="m-0 text-[19px] leading-[1.5] text-ink">
              {h.intro.before}
              <b>{h.intro.backend}</b>
              {h.intro.middle}
              <b>{h.intro.frontend}</b>
              {h.intro.after}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#projetos">{h.cta}</Button>
              <Button href="#contato" variant="secondary">
                {h.contact}
              </Button>
            </div>
          </div>
        </div>

        <div style={delay('.4s')} className="fade-up mt-11">
          <Playground />
        </div>
      </Container>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Pet } from '../components/ui/Pet'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import { useLang } from '../i18n/useLang'

/** ids das seções, na ordem da página; cada uma é um nó da linha */
const SECTIONS = ['top', 'projetos', 'sobre', 'skills', 'atividade', 'contato']
const HEIGHT = 340

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/**
 * Indicador lateral: uma linha tracejada com um nó por seção e um bichinho que desliza por ela
 * conforme a rolagem. Só aparece quando o container tem 1400px ou mais (há margem livre).
 */
export function SideRail() {
  const { t } = useLang()
  const labels = [t.nav.top, t.nav.projects, t.nav.about, t.nav.skills, t.nav.activity, t.nav.contact]
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(0)
  const mascotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const hopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let queued = false

    const update = () => {
      queued = false
      const mascot = mascotRef.current
      const label = labelRef.current
      if (!mascot || !label) return

      const vh = window.innerHeight
      const els = SECTIONS.map((id) => document.getElementById(id))
      let progress: number
      if (els.every(Boolean)) {
        // a seção ativa é a última cujo topo já passou de 45% da altura da tela; a fração leva ao próximo nó
        const mid = vh * 0.45
        const tops = els.map((el) => el!.getBoundingClientRect().top)
        let i = 0
        tops.forEach((top, k) => {
          if (top <= mid) i = k
        })
        const next = tops[i + 1]
        const fraction = next != null ? clamp01((mid - tops[i]) / Math.max(1, next - tops[i])) : 0
        progress = (i + fraction) / (SECTIONS.length - 1)
      } else {
        const scrollable = document.documentElement.scrollHeight - vh
        progress = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0
      }

      const transform = `translateY(${progress * HEIGHT}px)`
      mascot.style.transform = transform
      label.style.transform = transform

      const index = Math.round(progress * (SECTIONS.length - 1))
      if (index !== currentRef.current) {
        currentRef.current = index
        setCurrent(index)
        // pulinho a cada seção nova (não acontece com movimento reduzido)
        if (!prefersReducedMotion()) {
          hopRef.current?.animate(
            [{ transform: 'translateY(0)' }, { transform: 'translateY(-10px)', offset: 0.4 }, { transform: 'translateY(0)' }],
            { duration: 500, easing: 'ease-out' },
          )
        }
      }
    }

    const schedule = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    // sticky + altura 0: acompanha a tela sem ocupar espaço (position: fixed não funciona dentro do container de cqw)
    <div aria-hidden="true" className="pointer-events-none sticky top-0 z-20 hidden h-0 @min-[1400px]:block">
      <div className="absolute left-4 w-px" style={{ top: 'calc(50vh - 190px)', height: HEIGHT }}>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(240,237,231,.35)_0_4px,transparent_4px_9px)]" />
        {SECTIONS.map((id, i) => (
          <div
            key={id}
            className="absolute -left-1 -mt-1 size-[9px] border border-ink bg-bg"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
          />
        ))}
        <div ref={mascotRef} className="absolute top-0 -left-[15px] -mt-[34px] size-[30px] will-change-transform">
          <div ref={hopRef}>
            <Pet color="blue" size={30} />
          </div>
        </div>
        <div
          ref={labelRef}
          className="absolute top-0 left-5 -mt-[26px] font-mono text-[11px] whitespace-nowrap text-ink-2 will-change-transform"
        >
          {labels[current]}
        </div>
      </div>
    </div>
  )
}

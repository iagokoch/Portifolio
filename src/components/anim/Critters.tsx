import { useEffect, useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import { Critter } from './Critter'
import { CW, setFrame, SH } from './sprite'

const N = 6
const KEEP = N - 1 // o último bichinho fica e segue o mouse
const HIDDEN = 'inset(-40px 100% -40px -40px)'

type Phase = 'wait' | 'walk' | 'idle' | 'fly' | 'gone' | 'drop' | 'follow'

interface State {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  spin: number
  op: number
  dir: 1 | -1
  moving: boolean
  ph: Phase
  at: number
}

interface CrittersProps {
  /** Só começa quando a tela de boot acaba */
  active: boolean
  /** Chamado quando os bichinhos terminam de "digitar" o hero (revela a coluna da direita) */
  onFlown: () => void
}

/**
 * Seis bichinhos andam pela base de cada linha do hero e revelam o texto ao passar (clip-path).
 * Depois cinco voam embora e o último desce para o chão e segue o mouse enquanto ele estiver no hero.
 */
export function Critters({ active, onFlown }: CrittersProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const sprites = useRef<Array<SVGSVGElement | null>>([])
  const onFlownRef = useRef(onFlown)
  useEffect(() => {
    onFlownRef.current = onFlown
  })

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el || prefersReducedMotion()) return // sem movimento: texto visível, sem bichinhos

    const sec = el.closest('section') ?? el.parentElement!
    const lines = Array.from(sec.querySelectorAll<HTMLElement>('[data-crit]'))
    const count = Math.min(N, lines.length)
    const resetLines = () => lines.forEach((l) => (l.style.clipPath = ''))

    lines.forEach((l) => (l.style.clipPath = HIDDEN))
    if (!active) return resetLines

    const groundY = () => el.offsetHeight - 4 - SH
    const cs: State[] = Array.from({ length: count }, (_, i) => ({
      x: -CW, y: 0, vx: 0, vy: 0, rot: 0, spin: 0, op: 0, dir: 1, moving: false, ph: 'wait', at: i * 260,
    }))
    let target: number | null = null
    let free = false
    let flown = false
    let visible = true
    const t0 = performance.now()
    let last = t0
    let raf = 0

    // posição de cada linha relativa ao chão, compensando eventual escala
    const measure = () => {
      const wr = el.getBoundingClientRect()
      const sc = wr.width / (el.offsetWidth || 1) || 1
      return lines.map((l) => {
        const r = l.getBoundingClientRect()
        return { x: (r.left - wr.left) / sc, b: (r.bottom - wr.top) / sc, w: r.width / sc }
      })
    }

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const sc = r.width / (el.offsetWidth || 1)
      target = (e.clientX - r.left) / sc - CW / 2
    }
    sec.addEventListener('mousemove', onMove as EventListener)

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting)
    })
    io.observe(sec)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) {
        last = now
        return
      }
      const dt = Math.min(48, now - last)
      last = now
      const t = now - t0
      const W = el.clientWidth
      const gy = groundY()
      const L = flown ? null : measure()

      cs.forEach((c, i) => {
        const ln = L?.[i]
        if (c.ph === 'wait' && ln) {
          c.x = ln.x - CW
          c.y = ln.b - SH
          if (t >= c.at) {
            c.ph = 'walk'
            c.op = 1
            c.moving = true
          }
        } else if (c.ph === 'walk' && ln) {
          c.x += 0.85 * dt
          c.y = ln.b - SH
          const p = Math.max(0, Math.min(1, (c.x + CW / 2 - ln.x) / Math.max(1, ln.w)))
          lines[i].style.clipPath = `inset(-40px ${(ln.w * (1 - p)).toFixed(1)}px -40px -40px)`
          if (c.x >= ln.x + ln.w + 6) {
            c.ph = 'idle'
            c.moving = false
            lines[i].style.clipPath = 'none'
          }
        } else if (c.ph === 'idle' && ln) {
          c.y = ln.b - SH
        } else if (c.ph === 'fly') {
          c.vy -= 0.0009 * dt
          c.x += c.vx * dt
          c.y += c.vy * dt
          c.rot += c.spin * dt
          c.op = Math.max(0, c.op - dt / 1000)
          if (c.op <= 0) c.ph = 'gone'
        } else if (c.ph === 'drop') {
          c.vy += 0.003 * dt
          c.y += c.vy * dt
          c.x += c.vx * dt
          if (c.y >= gy) {
            c.y = gy
            c.ph = 'follow'
            c.vx = 0
            free = true
          }
        } else if (c.ph === 'follow') {
          c.y = gy
          if (free && target != null) {
            const tx = Math.max(0, Math.min(W - CW, target))
            const dx = tx - c.x
            if (Math.abs(dx) > 2) {
              c.dir = dx > 0 ? 1 : -1
              c.x += c.dir * Math.min(Math.abs(dx), 0.3 * dt)
              c.moving = true
            } else c.moving = false
          } else c.moving = false
        }
      })

      if (!flown && cs.every((c) => c.ph === 'idle')) {
        flown = true
        onFlownRef.current()
        cs.forEach((c, i) => {
          if (i === KEEP) {
            c.ph = 'drop'
            c.vy = -0.5
            c.vx = 0
            c.moving = false
          } else {
            c.ph = 'fly'
            c.vy = -(0.3 + Math.random() * 0.3)
            c.vx = (Math.random() - 0.3) * 0.45
            c.spin = (Math.random() - 0.5) * 0.6
            c.moving = true
          }
        })
      }

      const frameB = Math.floor(now / 110) % 2 === 1
      cs.forEach((c, i) => {
        const n = sprites.current[i]
        if (!n) return
        n.style.transform = `translate(${c.x}px,${c.y}px) rotate(${c.rot}deg) scaleX(${c.dir})`
        n.style.opacity = String(c.op)
        setFrame(n, c.moving, frameB)
      })
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      sec.removeEventListener('mousemove', onMove as EventListener)
      resetLines()
    }
  }, [active])

  return (
    <div ref={wrap} className="relative h-11">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(90deg,var(--border-input)_0_48px,transparent_48px_54px)]"
      />
      {Array.from({ length: N }, (_, i) => (
        <Critter
          key={i}
          ref={(n) => {
            sprites.current[i] = n
          }}
        />
      ))}
    </div>
  )
}

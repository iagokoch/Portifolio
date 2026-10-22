import { useEffect, useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import { useLang } from '../../i18n/LangContext'
import { Critter, CW, setFrame, SH } from './Critter'

const POOL = 18 // carregadores simultâneos
const MAXN = POOL + 1 // + o supervisor (índice 0)
const NP = 48 // partículas

type Phase = 'off' | 'walkIn' | 'stand' | 'cheer' | 'walkOut' | 'gone' | 'run' | 'crouch' | 'carry' | 'tumble' | 'dazed' | 'fetch' | 'fly'

interface Build {
  it: HTMLElement
  r: { x: number; y: number; w: number; h: number }
  cols: number
  rows: number
  tw: number
  th: number
  n: number
  done: Tile[]
}
interface Tile {
  bd: Build
  r: number
  c: number
}
interface Crit {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  spin: number
  op: number
  dir: 1 | -1
  sq: number
  moving: boolean
  ph: Phase
  block: boolean
  t: Tile | null
  ex: number
  ey: number
  lx: number
  spd: number
  trip: boolean
  sx: number
  sy: number
  t0: number
  D: number
  arc: number
  ct: number
}
interface Particle {
  life: number
  x: number
  y: number
  vx: number
  vy: number
  s: number
  col: string
}

const newCrit = (): Crit => ({
  x: -CW, y: 0, vx: 0, vy: 0, rot: 0, spin: 0, op: 0, dir: 1, sq: 1, moving: false, ph: 'off', block: false,
  t: null, ex: 0, ey: 0, lx: 0, spd: 0, trip: false, sx: 0, sy: 0, t0: 0, D: 0, arc: 0, ct: 0,
})

interface CrewProps {
  /** Frase do supervisor ao chamar a turma */
  message: string
  /** Diz "Espere!" antes da frase principal */
  wait?: boolean
  /** Classes de margem do container (a faixa tem 40px de altura) */
  className?: string
}

/**
 * Faixa que monta os blocos `[data-load]` da própria seção: um supervisor chama a turma, cada elemento é
 * cortado em tiles e carregadores pulam até eles, revelando o conteúdo via clip-path acumulado.
 */
export function Crew({ message, wait = false, className = '' }: CrewProps) {
  const { t } = useLang()
  const wrap = useRef<HTMLDivElement>(null)
  const sprites = useRef<Array<SVGSVGElement | null>>([])
  const parts = useRef<Array<HTMLDivElement | null>>([])
  const flashes = useRef<Array<HTMLDivElement | null>>([])
  const loose = useRef<HTMLDivElement>(null)
  const bubble = useRef<HTMLDivElement>(null)
  const bubbleText = useRef<HTMLSpanElement>(null)
  const bubbleTail = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  // as falas são lidas na hora de falar, para acompanhar a troca de idioma
  const texts = useRef({ message, wait, waitText: t.crew.wait, done: t.crew.done, oops: t.crew.oops })
  useEffect(() => {
    texts.current = { message, wait, waitText: t.crew.wait, done: t.crew.done, oops: t.crew.oops }
  })

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el || prefersReducedMotion()) return // sem movimento: o conteúdo já aparece normalmente

    const sec = el.closest('section') ?? el.parentElement!
    const items = Array.from(sec.querySelectorAll<HTMLElement>('[data-load]'))
    if (items.length === 0) return

    const prevOverflowX = sec.style.overflowX
    sec.style.overflowX = 'clip' // os carregadores entram de fora da tela sem gerar rolagem horizontal
    items.forEach((c) => (c.style.opacity = '0'))

    const gy = () => el.offsetHeight - 4 - SH
    const cs: Crit[] = Array.from({ length: MAXN }, newCrit)
    const ps: Particle[] = Array.from({ length: NP }, () => ({ life: 0, x: 0, y: 0, vx: 0, vy: 0, s: 4, col: '' }))
    const builds: Build[] = []
    const queue: Tile[] = []
    const lb = { on: false, air: false, x: 0, y: 0, vy: 0, vx: 0 }
    const timers: number[] = []

    let pi = 0
    let fi = 0
    let mode: 'idle' | 'run' = 'idle'
    let last = performance.now()
    let raf = 0
    let T = 0
    let callT = 0
    let total = 0
    let placed = 0
    let doneAt = 0
    let bubbleUntil = 0
    let nextSpawn = 0
    let side = 0
    let tripAt = -1
    let spawned = 0

    const say = (txt: string, ms: number) => {
      bubbleUntil = performance.now() + ms
      if (bubbleText.current) bubbleText.current.textContent = txt
    }

    const measure = (it: HTMLElement) => {
      const wr = el.getBoundingClientRect()
      const sc = wr.width / (el.offsetWidth || 1) || 1
      const r = it.getBoundingClientRect()
      return { x: (r.left - wr.left) / sc, y: (r.top - wr.top) / sc, w: r.width / sc, h: r.height / sc }
    }

    // clip-path acumulado: só os tiles já colocados ficam visíveis (a última coluna/linha estende 12px para a sombra)
    const clip = (bd: Build) => {
      if (bd.done.length >= bd.n) {
        bd.it.style.clipPath = ''
        return
      }
      let p = 'M0 0Z'
      bd.done.forEach((tl) => {
        const x = tl.c * bd.tw
        const y = tl.r * bd.th
        const w = bd.tw + (tl.c === bd.cols - 1 ? 12 : 0.5)
        const h = bd.th + (tl.r === bd.rows - 1 ? 12 : 0.5)
        p += `M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}Z`
      })
      bd.it.style.clipPath = `path('${p}')`
    }

    const burst = (x: number, y: number, n: number, spread: number, col?: string) => {
      for (let i = 0; i < n; i++) {
        const p = ps[pi++ % NP]
        Object.assign(p, {
          x, y, vx: (Math.random() - 0.5) * spread, vy: -Math.random() * spread * 0.9, life: 1,
          s: Math.random() < 0.5 ? 4 : 6,
          col: col ?? (Math.random() < 0.7 ? 'var(--accent)' : 'var(--soft)'),
        })
      }
    }

    const flash = (x: number, y: number, w: number, h: number) => {
      const f = flashes.current[fi++ % POOL]
      if (!f) return
      f.style.transition = 'none'
      f.style.opacity = '1'
      f.style.transform = `translate(${x}px,${y}px)`
      f.style.width = `${w}px`
      f.style.height = `${h}px`
      requestAnimationFrame(() => {
        f.style.transition = 'opacity .4s steps(4)'
        f.style.opacity = '0'
      })
    }

    const jump = (c: Crit, now: number) => {
      const D = 380 + Math.min(500, Math.hypot(c.ex - c.x, c.ey - c.y) * 0.9)
      Object.assign(c, { ph: 'carry', sx: c.x, sy: c.y, t0: now, D, arc: 50 + Math.random() * 60, dir: c.ex >= c.x ? 1 : -1, moving: false })
    }

    const tick = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      const W = el.clientWidth
      const g = gy()
      const k = cs[0]

      // supervisor
      if (k.ph === 'walkIn') {
        k.y = g
        k.x += 0.5 * dt
        const tx = W / 2 - CW / 2
        if (k.x >= tx) {
          k.x = tx
          k.ph = 'stand'
          k.moving = false
          T = now
          say(texts.current.wait ? texts.current.waitText : texts.current.message, texts.current.wait ? 1000 : 2200)
        }
      } else if (k.ph === 'stand') {
        k.y = g
        k.dir = Math.floor(now / 700) % 2 ? 1 : -1
        k.rot = callT && !doneAt ? Math.sin(now / 90) * 4 : 0
      } else if (k.ph === 'cheer') {
        k.vy += 0.003 * dt
        k.y += k.vy * dt
        k.rot += 0.55 * dt
        if (k.y >= g) {
          k.y = g
          k.rot = 0
          k.sq = 0.7
          k.ph = 'walkOut'
          k.dir = 1
        }
      } else if (k.ph === 'walkOut') {
        k.y = g
        k.x += 0.5 * dt
        k.moving = true
        if (k.x > W) {
          k.op = Math.max(0, k.op - dt / 300)
          if (k.op <= 0) k.ph = 'gone'
        }
      }

      // chamada: corta cada elemento em tiles (de baixo para cima, embaralhando cada linha)
      if (k.ph === 'stand' && !callT && now - T > (texts.current.wait ? 900 : 250)) {
        callT = now
        nextSpawn = now + 300
        if (texts.current.wait) say(texts.current.message, 2000)
        items.forEach((it) => {
          const r = measure(it)
          const cols = Math.max(2, Math.min(8, Math.round(r.w / 150)))
          const rows = Math.max(1, Math.min(5, Math.round(r.h / 150)))
          const bd: Build = { it, r, cols, rows, tw: r.w / cols, th: r.h / rows, n: cols * rows, done: [] }
          builds.push(bd)
          clip(bd)
          it.style.opacity = '1'
          for (let rr = rows - 1; rr >= 0; rr--) {
            const row: Tile[] = []
            for (let cc = 0; cc < cols; cc++) row.push({ bd, r: rr, c: cc })
            row.sort(() => Math.random() - 0.5)
            queue.push(...row)
          }
        })
        total = queue.length
        tripAt = Math.floor(total * (0.3 + Math.random() * 0.3))
      }

      // novos carregadores entram correndo, de lados alternados
      if (callT && queue.length && now >= nextSpawn) {
        const idx = cs.findIndex((c, i) => i > 0 && (c.ph === 'off' || c.ph === 'gone'))
        if (idx > 0) {
          const tile = queue.shift()!
          const c = cs[idx]
          const bd = tile.bd
          const ex = bd.r.x + (tile.c + 0.5) * bd.tw - CW / 2
          const ey = bd.r.y + (tile.r + 0.5) * bd.th - SH / 2
          const fromLeft = side++ % 2 === 0
          Object.assign(c, {
            t: tile, ex, ey,
            lx: Math.max(0, Math.min(W - CW, ex + (Math.random() - 0.5) * 80)),
            x: fromLeft ? -CW - Math.random() * 30 : W + Math.random() * 30,
            y: g, op: 1, rot: 0, sq: 1, block: true, moving: true, ph: 'run',
            dir: fromLeft ? 1 : -1,
            spd: 0.75 + Math.random() * 0.35,
            trip: spawned === tripAt,
          })
          spawned++
          nextSpawn = now + 70 + Math.random() * 60
        }
      }

      cs.forEach((c, i) => {
        if (i === 0) return
        if (c.ph === 'run') {
          c.y = g - (Math.floor(now / 90 + i) % 2) * 2
          const dx = c.lx - c.x
          c.dir = dx >= 0 ? 1 : -1
          c.x += c.dir * Math.min(Math.abs(dx), c.spd * dt)
          if (Math.abs(dx) < 2) {
            c.ph = 'crouch'
            c.ct = now
            c.moving = false
            c.y = g
          }
        } else if (c.ph === 'crouch') {
          c.sq = 0.65
          if (now - c.ct > 90) {
            c.sq = 1.25
            jump(c, now)
          }
        } else if (c.ph === 'carry') {
          const p = Math.min(1, (now - c.t0) / c.D)
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
          c.x = c.sx + (c.ex - c.sx) * e
          c.y = c.sy + (c.ey - c.sy) * e - c.arc * 4 * p * (1 - p)
          c.sq += (1 - c.sq) * 0.2
          c.rot = Math.sin(p * Math.PI) * 12 * c.dir
          // um carregador tropeça por seção: o bloco cai e ele precisa buscá-lo
          if (c.trip && p > 0.4) {
            c.trip = false
            c.ph = 'tumble'
            c.block = false
            c.vy = -0.2
            c.vx = -c.dir * 0.12
            c.spin = c.dir * 0.9
            Object.assign(lb, { on: true, x: c.x + CW / 2 - 10, y: c.y - 20, vy: -0.1, vx: c.dir * 0.15 })
            say(texts.current.oops, 900)
          }
          if (p >= 1 && c.t) {
            const tile = c.t
            const bd = tile.bd
            bd.done.push(tile)
            clip(bd)
            placed++
            const tx = bd.r.x + tile.c * bd.tw
            const ty = bd.r.y + tile.r * bd.th
            flash(tx, ty, bd.tw, bd.th)
            burst(tx + bd.tw / 2, ty + bd.th / 2, 5, 0.5)
            Object.assign(c, {
              ph: 'fly', block: false, sq: 0.7,
              vy: -0.5 - Math.random() * 0.25,
              vx: (Math.random() - 0.5) * 0.45,
              spin: (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.5),
            })
          }
        } else if (c.ph === 'tumble') {
          c.vy += 0.003 * dt
          c.y += c.vy * dt
          c.x += c.vx * dt
          c.rot += c.spin * dt
          if (c.y >= g) {
            c.y = g
            c.rot = 180
            c.ph = 'dazed'
            c.ct = now
            c.sq = 0.6
            burst(c.x + CW / 2, g + SH, 6, 0.35, 'var(--muted)')
          }
        } else if (c.ph === 'dazed') {
          c.rot = 180 + Math.sin(now / 60) * 8
          c.sq += (1 - c.sq) * 0.2
          if (now - c.ct > 650) {
            c.rot = 0
            c.ph = 'fetch'
            c.moving = true
          }
        } else if (c.ph === 'fetch') {
          c.y = g - (Math.floor(now / 90) % 2) * 2
          const tx = lb.x + 10 - CW / 2
          const dx = tx - c.x
          c.dir = dx >= 0 ? 1 : -1
          c.x += c.dir * Math.min(Math.abs(dx), 0.6 * dt)
          if (Math.abs(dx) < 2 && !lb.air) {
            lb.on = false
            c.block = true
            c.moving = false
            c.y = g
            c.ph = 'crouch'
            c.ct = now
          }
        } else if (c.ph === 'fly') {
          c.vy += 0.0012 * dt
          c.x += c.vx * dt
          c.y += c.vy * dt
          c.rot += c.spin * dt
          c.sq += (1 - c.sq) * 0.15
          c.op = Math.max(0, c.op - dt / 560)
          if (c.op <= 0) c.ph = 'gone'
        }
      })

      // bloco solto no chão
      if (lb.on) {
        const ground = el.offsetHeight - 4 - 20
        lb.air = lb.y < ground
        if (lb.air) {
          lb.vy += 0.003 * dt
          lb.y = Math.min(ground, lb.y + lb.vy * dt)
          lb.x += lb.vx * dt
          if (lb.y >= ground) {
            lb.vy = 0
            burst(lb.x + 10, ground + 20, 5, 0.3, 'var(--muted)')
          }
        }
      }
      if (loose.current) {
        loose.current.style.opacity = lb.on ? '1' : '0'
        loose.current.style.transform = `translate(${lb.x}px,${lb.y}px)`
      }

      // tudo no lugar: os blocos "batem" (thunk) em sequência e o supervisor comemora
      if (callT && !doneAt && total && placed === total) {
        doneAt = now
        say(texts.current.done, 1300)
        builds.forEach((bd) => (bd.it.style.clipPath = ''))
        items.forEach((it, j) => {
          timers.push(
            window.setTimeout(() => {
              it.style.transition = 'transform .08s steps(2)'
              it.style.transform = 'translateY(-4px)'
              timers.push(
                window.setTimeout(() => {
                  it.style.transform = ''
                  timers.push(window.setTimeout(() => (it.style.transition = ''), 100))
                }, 90),
              )
            }, j * 70),
          )
        })
        if (k.ph === 'stand') {
          k.ph = 'cheer'
          k.vy = -0.75
          k.sq = 1.3
          burst(k.x + CW / 2, k.y, 14, 0.6)
        }
      }

      if (bar.current) bar.current.style.width = `${total ? (placed / total) * 100 : 0}%`

      // desenho
      const frameB = Math.floor(now / 90) % 2 === 1
      cs.forEach((c, i) => {
        const n = sprites.current[i]
        if (!n) return
        if (i === 0 && c.ph !== 'cheer') c.sq += (1 - c.sq) * 0.2
        n.style.transform = `translate(${c.x}px,${c.y}px) rotate(${c.rot}deg) scale(${c.dir * (2 - c.sq)},${c.sq})`
        n.style.opacity = String(c.op)
        setFrame(n, c.moving, frameB, c.block)
      })
      ps.forEach((p, i) => {
        const n = parts.current[i]
        if (!n) return
        if (p.life > 0) {
          p.vy += 0.0016 * dt
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.life -= dt / 600
        }
        n.style.opacity = p.life > 0 ? (p.life > 0.5 ? '1' : '0.5') : '0'
        if (p.life > 0) {
          n.style.transform = `translate(${Math.round(p.x)}px,${Math.round(p.y)}px)`
          n.style.width = n.style.height = `${p.s}px`
          n.style.background = p.col
        }
      })
      const bb = bubble.current
      if (bb) {
        const bx = Math.max(0, Math.min(W - bb.offsetWidth, k.x - 10))
        bb.style.opacity = now < bubbleUntil ? '1' : '0'
        bb.style.transform = `translate(${bx}px,${k.y - bb.offsetHeight - 22}px)`
        if (bubbleTail.current) {
          bubbleTail.current.style.left = `${Math.max(8, Math.min(bb.offsetWidth - 16, k.x + CW / 2 - bx - 4))}px`
        }
      }

      // acabou de vez? para o loop (nada mais se mexe nem aparece)
      const finished =
        doneAt > 0 && cs.every((c) => c.ph === 'off' || c.ph === 'gone') && ps.every((p) => p.life <= 0) && !lb.on && now > bubbleUntil
      if (finished) {
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (mode !== 'idle') return
      mode = 'run'
      const k = cs[0]
      k.ph = 'walkIn'
      k.op = 1
      k.x = -CW
      k.moving = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    // dispara quando a faixa entra na parte de cima da tela (rootMargin de -30% embaixo)
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          start()
          io.disconnect()
          window.removeEventListener('scroll', skipIfPassed)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -30% 0px' },
    )
    io.observe(el)

    // A pessoa pode passar direto pela faixa (End, âncora, restauração de scroll). O IntersectionObserver só avisa
    // quando o estado muda, então uma faixa que nunca apareceu não notifica: o scroll decide, e o conteúdo surge sem animar.
    function skipIfPassed() {
      if (mode !== 'idle' || el!.getBoundingClientRect().bottom >= 0) return
      mode = 'run'
      items.forEach((c) => (c.style.opacity = ''))
      io.disconnect()
      window.removeEventListener('scroll', skipIfPassed)
    }
    window.addEventListener('scroll', skipIfPassed, { passive: true })
    skipIfPassed()
    // rede de segurança: se a faixa já estava visível e o observer não disparou
    const safety = window.setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        start()
        io.disconnect()
      }
    }, 1500)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      timers.forEach(clearTimeout)
      io.disconnect()
      window.removeEventListener('scroll', skipIfPassed)
      sec.style.overflowX = prevOverflowX
      items.forEach((c) => {
        c.style.opacity = ''
        c.style.clipPath = ''
        c.style.transform = ''
        c.style.transition = ''
      })
    }
  }, [])

  return (
    <div ref={wrap} className={`relative h-10 ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(90deg,var(--border-input)_0_48px,transparent_48px_54px)]"
      >
        <div
          ref={bar}
          className="h-full w-0 bg-[repeating-linear-gradient(90deg,var(--accent)_0_48px,transparent_48px_54px)]"
        />
      </div>

      <div ref={loose} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-[6] size-5 border-2 border-[#050508] bg-soft opacity-0" />

      <div
        ref={bubble}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-[8] whitespace-nowrap opacity-0 transition-opacity duration-150 ease-[steps(3)]"
      >
        <span
          ref={bubbleText}
          className="block rounded-px border border-accent bg-bg px-2.5 py-[7px] font-pixel text-xs text-fg shadow-px-sm"
        />
        <span
          ref={bubbleTail}
          className="absolute -bottom-[5px] left-3 size-2 rotate-45 border-r border-b border-accent bg-bg"
        />
      </div>

      {Array.from({ length: POOL }, (_, i) => (
        <div
          key={`f${i}`}
          ref={(n) => {
            flashes.current[i] = n
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-[5] box-border border-2 border-accent opacity-0"
        />
      ))}
      {Array.from({ length: NP }, (_, i) => (
        <div
          key={`p${i}`}
          ref={(n) => {
            parts.current[i] = n
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-[7] opacity-0"
        />
      ))}
      {Array.from({ length: MAXN }, (_, i) => (
        <Critter
          key={i}
          ref={(n) => {
            sprites.current[i] = n
          }}
          block
          hat={i === 0}
        />
      ))}
    </div>
  )
}

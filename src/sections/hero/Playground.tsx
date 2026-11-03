import { useEffect, useRef, type PointerEvent } from 'react'
import { Pet, type PetColor } from '../../components/ui/Pet'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLang } from '../../i18n/useLang'

const COLORS: PetColor[] = ['green', 'green', 'yellow', 'pink', 'purple', 'blue', 'pink']

const SIZE = 50 // lado do bichinho, em px
const FLOOR_PAD = 22 // distância do chão até a base da caixa
const GRAVITY = 0.0019 // px/ms²
const MIN_DIST = 44 // distância mínima entre os centros (colisão)
const MAX_SPEED = 2 // px/ms, limite do arremesso

interface PetState {
  x: number
  y: number
  vx: number
  vy: number
  drag: boolean
  face: 1 | -1
  /** Posição do ponteiro em relação ao bichinho no início do arraste */
  grabX: number
  grabY: number
  startX: number
  startY: number
  /** Últimas posições [tempo, x, y], para calcular a velocidade do arremesso */
  history: [number, number, number][]
  blinkIn: number
  blinkEnd: number
  hopIn: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const floorY = (box: HTMLElement) => box.clientHeight - FLOOR_PAD - SIZE + 4

const newPet = (i: number, boxWidth: number, floor: number, resting: boolean): PetState => ({
  x: 60 + i * Math.max(40, (boxWidth - 160) / 6),
  // sem movimento: já começam no chão em vez de cair
  y: resting ? floor : -80 - i * 70,
  vx: 0,
  vy: 0,
  drag: false,
  face: 1,
  grabX: 0,
  grabY: 0,
  startX: 0,
  startY: 0,
  history: [],
  blinkIn: 1500 + Math.random() * 3000,
  blinkEnd: 0,
  hopIn: 2000 + Math.random() * 4000,
})

function startDrag(k: PetState, box: HTMLElement, clientX: number, clientY: number) {
  const r = box.getBoundingClientRect()
  k.drag = true
  k.grabX = clientX - r.left - k.x
  k.grabY = clientY - r.top - k.y
  k.startX = clientX
  k.startY = clientY
  k.vx = 0
  k.vy = 0
  k.history = [[performance.now(), k.x, k.y]]
}

function moveDrag(k: PetState, box: HTMLElement, clientX: number, clientY: number) {
  const r = box.getBoundingClientRect()
  k.x = clamp(clientX - r.left - k.grabX, 0, box.clientWidth - SIZE)
  k.y = clamp(clientY - r.top - k.grabY, -10, floorY(box))
  k.history.push([performance.now(), k.x, k.y])
  if (k.history.length > 6) k.history.shift()
}

function endDrag(k: PetState, clientX: number, clientY: number) {
  k.drag = false
  // quase sem arrastar = clique: o bichinho pula
  if (Math.hypot(clientX - k.startX, clientY - k.startY) < 5) {
    k.vy = -0.75
    k.vx = (Math.random() - 0.5) * 0.5
    return
  }
  // senão é um arremesso: a velocidade vem das últimas posições
  const first = k.history[0]
  const last = k.history[k.history.length - 1]
  const dt = Math.max(16, last[0] - first[0])
  k.vx = clamp((last[1] - first[1]) / dt, -MAX_SPEED, MAX_SPEED)
  k.vy = clamp((last[2] - first[2]) / dt, -MAX_SPEED, MAX_SPEED)
}

/**
 * Caixa com bichinhos de pixel art: caem, quicam, colidem entre si e podem ser arrastados e arremessados.
 * Toda a animação mexe no DOM por refs (sem re-render a cada quadro) e pausa fora da tela.
 */
export function Playground() {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const boxRef = useRef<HTMLDivElement>(null)
  const elsRef = useRef<(HTMLDivElement | null)[]>([])
  const petsRef = useRef<PetState[]>([])
  // o loop é criado uma vez; lê a preferência atual por aqui
  const reducedRef = useRef(reduced)

  useEffect(() => {
    reducedRef.current = reduced
  }, [reduced])

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const els = elsRef.current
    const eyes = els.map((el) => el?.querySelector<SVGPathElement>('.pet-eye') ?? null)

    petsRef.current = COLORS.map((_, i) => newPet(i, box.clientWidth, floorY(box), reducedRef.current))
    const pets = petsRef.current

    const paint = () => {
      pets.forEach((k, i) => {
        const el = els[i]
        if (el) el.style.transform = `translate(${k.x}px,${k.y}px) scaleX(${k.face})`
      })
    }
    paint()

    let raf = 0
    let running = false
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const w = box.clientWidth
      const fy = floorY(box)

      pets.forEach((k, i) => {
        if (!k.drag) {
          k.vy += GRAVITY * dt
          k.x += k.vx * dt
          k.y += k.vy * dt
          if (k.y >= fy) {
            k.y = fy
            k.vy = k.vy > 0.3 ? -k.vy * 0.4 : 0
            k.vx *= Math.pow(0.994, dt) // atrito do chão
            if (Math.abs(k.vx) < 0.01) k.vx = 0
          }
          if (k.x < 0) {
            k.x = 0
            k.vx = Math.abs(k.vx) * 0.5
          }
          if (k.x > w - SIZE) {
            k.x = Math.max(0, w - SIZE)
            k.vx = -Math.abs(k.vx) * 0.5
          }
          // pulinho aleatório (desligado com movimento reduzido)
          k.hopIn -= dt
          if (k.hopIn < 0) {
            k.hopIn = 2500 + Math.random() * 5000
            if (k.y >= fy - 1 && !reducedRef.current) {
              k.vy = -0.55
              k.vx = (Math.random() - 0.5) * 0.5
            }
          }
        }
        if (Math.abs(k.vx) > 0.04) k.face = k.vx > 0 ? 1 : -1

        // piscar: os olhos ficam da cor do corpo por 130 ms
        const eye = eyes[i]
        if (eye) {
          k.blinkIn -= dt
          if (k.blinkIn < 0) {
            k.blinkIn = 2500 + Math.random() * 3500
            k.blinkEnd = now + 130
            eye.style.fill = `var(--pet-${COLORS[i]})`
          }
          if (k.blinkEnd && now >= k.blinkEnd) {
            k.blinkEnd = 0
            eye.style.fill = 'var(--bg)'
          }
        }
      })

      // colisão entre pares: separa e troca um pouco de velocidade; quem está sendo arrastado não se move
      for (let i = 0; i < pets.length; i++) {
        for (let j = i + 1; j < pets.length; j++) {
          const a = pets[i]
          const b = pets[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy)
          if (dist >= MIN_DIST || dist <= 0.01) continue
          const nx = dx / dist
          const ny = dy / dist
          const overlap = MIN_DIST - dist
          const wa = a.drag ? 0 : 1
          const wb = b.drag ? 0 : 1
          const total = wa + wb || 1
          a.x -= (nx * overlap * wa) / total
          a.y -= (ny * overlap * wa) / total
          b.x += (nx * overlap * wb) / total
          b.y += (ny * overlap * wb) / total
          const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
          if (approach < 0) {
            const impulse = approach * 0.6
            if (wa) {
              a.vx += nx * impulse
              a.vy += ny * impulse
            }
            if (wb) {
              b.vx -= nx * impulse
              b.vy -= ny * impulse
            }
          }
        }
      }

      pets.forEach((k) => {
        k.y = Math.min(k.y, fy)
      })
      paint()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // só roda enquanto a caixa está visível
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(box)

    return () => {
      io.disconnect()
      stop()
    }
  }, [])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>, i: number) => {
    const box = boxRef.current
    const k = petsRef.current[i]
    if (!box || !k) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    startDrag(k, box, e.clientX, e.clientY)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>, i: number) => {
    const box = boxRef.current
    const k = petsRef.current[i]
    if (!box || !k?.drag) return
    moveDrag(k, box, e.clientX, e.clientY)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>, i: number) => {
    const k = petsRef.current[i]
    if (!k?.drag) return
    endDrag(k, e.clientX, e.clientY)
  }

  const p = t.hero.playground

  return (
    <div
      ref={boxRef}
      role="group"
      aria-label={p.hint}
      className="relative h-[200px] touch-pan-y overflow-hidden rounded-[12px] border border-[rgba(240,237,231,.14)] bg-bg @min-[820px]:h-[240px]"
    >
      <div className="absolute top-3.5 left-[18px] font-mono text-xs text-ink-2">{p.hint}</div>
      {/* em containers estreitos os dois rótulos não cabem lado a lado */}
      <div className="absolute top-3.5 right-[18px] font-mono text-xs text-ink-2 @max-[519px]:hidden">{p.count}</div>

      {/* chão: linha e régua de marcas a cada 12px */}
      <div className="absolute right-3.5 bottom-3.5 left-3.5 h-px bg-[rgba(240,237,231,.4)]" />
      <div className="absolute right-3.5 bottom-2 left-3.5 h-1.5 bg-[repeating-linear-gradient(90deg,rgba(240,237,231,.4)_0_1px,transparent_1px_12px)]" />

      {COLORS.map((color, i) => (
        <div
          key={i}
          ref={(el) => {
            elsRef.current[i] = el
          }}
          onPointerDown={(e) => onPointerDown(e, i)}
          onPointerMove={(e) => onPointerMove(e, i)}
          onPointerUp={(e) => onPointerUp(e, i)}
          onPointerCancel={(e) => onPointerUp(e, i)}
          className="absolute top-0 left-0 z-[1] size-[50px] cursor-grab touch-none will-change-transform select-none active:z-[5] active:cursor-grabbing"
        >
          <Pet color={color} size={SIZE} />
        </div>
      ))}
    </div>
  )
}

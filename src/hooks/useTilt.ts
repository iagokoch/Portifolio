import { useRef, type CSSProperties, type MouseEvent } from 'react'
import { prefersReducedMotion } from './useReducedMotion'

const EASE = 'transform .35s cubic-bezier(.2,.7,.2,1)'

/**
 * Inclinação 3D reativa ao mouse para o tablet. `baseX`/`baseZ` são a rotação de repouso (graus);
 * com o mouse sobre a área, rotateX varia ±4° e rotateZ ±5°, e o tablet sobe 16px (translateZ).
 * Com movimento reduzido o tablet fica parado.
 *
 * Uso: `ref` e `style` vão no elemento do tablet; `onMove`/`onLeave` na área que reage ao mouse.
 */
export function useTilt(baseX: number, baseZ: number) {
  const ref = useRef<HTMLDivElement>(null)

  const transform = (nx: number, ny: number) => {
    const k = prefersReducedMotion() ? 0 : 1
    const lift = (nx || ny) && k ? ' translateZ(16px)' : ''
    return `translate(-50%,-50%) rotateX(${baseX - ny * 4 * k}deg) rotateZ(${baseZ + nx * 5 * k}deg)${lift}`
  }

  const apply = (nx: number, ny: number) => {
    const el = ref.current
    if (!el) return
    el.style.transition = EASE
    el.style.transform = transform(nx, ny)
  }

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    apply(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1)
  }

  const onLeave = () => apply(0, 0)

  const style: CSSProperties = { transform: transform(0, 0) }

  return { ref, style, onMove, onLeave }
}

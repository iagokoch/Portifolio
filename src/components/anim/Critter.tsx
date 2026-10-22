import type { Ref } from 'react'
import { CW, SH } from './sprite'

// Bichinho de 12×6 pixels desenhado a 4px por pixel (48×24)

const BODY = ['..o......o..', '...oooooo...', '..oooooooo..', 'oooeooooeooo', '..oooooooo..']
const LEG_A = '..o.o..o.o..'
const LEG_B = '...o.oo.o...'

const rects = (rows: string[], prefix: string) =>
  rows.flatMap((row, y) =>
    [...row].flatMap((c, x) =>
      c === '.'
        ? []
        : [<rect key={`${prefix}${x}-${y}`} x={x} y={y} width={1.04} height={1.04} style={{ fill: c === 'e' ? '#16151A' : 'var(--accent)' }} />],
    ),
  )

const BODY_RECTS = rects(BODY, 'b')
const LEG_A_RECTS = rects(['', '', '', '', '', LEG_A], 'a')
const LEG_B_RECTS = rects(['', '', '', '', '', LEG_B], 'c')

// Bloco lavanda carregado na cabeça e capacete do supervisor (coordenadas acima do corpo, y negativo)
const BLOCK = [
  <rect key="b0" x={3.5} y={-5.5} width={5} height={5} style={{ fill: '#050508' }} />,
  <rect key="b1" x={4} y={-5} width={4} height={4} style={{ fill: 'var(--soft)' }} />,
  <rect key="b2" x={4} y={-5} width={1} height={1} style={{ fill: '#F1F1F5' }} />,
]
const HAT = [
  <rect key="h0" x={1} y={-0.6} width={10} height={1.1} style={{ fill: 'var(--soft)' }} />,
  <rect key="h1" x={3} y={-2.6} width={6} height={2.1} style={{ fill: 'var(--soft)' }} />,
  <rect key="h2" x={3} y={-1.4} width={6} height={0.6} style={{ fill: '#050508' }} />,
]

interface CritterProps {
  ref: Ref<SVGSVGElement>
  /** Inclui o grupo do bloco carregado */
  block?: boolean
  /** Capacete de supervisor */
  hat?: boolean
}

// A ordem dos grupos importa: a animação alterna `display` por índice
// filhos: [0] corpo · [1] perna A · [2] perna B · [3] bloco (se houver) · [4] capacete (se houver)
export function Critter({ ref, block = false, hat = false }: CritterProps) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 12 6"
      width={CW}
      height={SH}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-[6] origin-bottom overflow-visible opacity-0"
    >
      <g>{BODY_RECTS}</g>
      <g>{LEG_A_RECTS}</g>
      <g>{LEG_B_RECTS}</g>
      {block && <g>{BLOCK}</g>}
      {hat && <g>{HAT}</g>}
    </svg>
  )
}

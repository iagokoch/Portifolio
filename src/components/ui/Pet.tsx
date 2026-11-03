import type { CSSProperties } from 'react'

export type PetColor = 'green' | 'yellow' | 'pink' | 'purple' | 'blue'

/** Sprite 10×10: X = corpo, E = olho */
const SPRITE = [
  '..X....X..',
  '..X....X..',
  '.XXXXXXXX.',
  'XXXXXXXXXX',
  'XXEXXXXEXX',
  'XXEXXXXEXX',
  'XXXXXXXXXX',
  'XXXXXXXXXX',
  '.XXXXXXXX.',
  '..XX..XX..',
]

// Um único path por cor (corpo e olhos): um SVG leve, mesmo com vários bichinhos na tela
const pathOf = (mark: string) =>
  SPRITE.flatMap((row, y) => [...row].flatMap((c, x) => (c === mark ? [`M${x} ${y}h1v1h-1z`] : []))).join('')

const BODY = pathOf('X')
const EYES = pathOf('E')

interface PetProps {
  color: PetColor
  /** Lado em px (múltiplo de 10 mantém os pixels nítidos) */
  size: number
  className?: string
}

/**
 * Bichinho de pixel art. Os olhos têm a classe `pet-eye`: o playground troca o preenchimento
 * dela por um instante para piscar.
 */
export function Pet({ color, size, className = '' }: PetProps) {
  const style: CSSProperties = { fill: `var(--pet-${color})` }
  return (
    <svg
      viewBox="0 0 10 10"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`block ${className}`}
    >
      <path d={BODY} style={style} />
      <path d={EYES} className="pet-eye" style={{ fill: 'var(--bg)' }} />
    </svg>
  )
}

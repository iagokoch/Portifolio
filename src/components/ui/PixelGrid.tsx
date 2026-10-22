import { memo } from 'react'

interface PixelGridProps {
  /** Uma cor por pixel, em ordem de linha */
  cells: readonly string[]
  cols: number
  /** Lado do quadro em px (a grade é sempre quadrada) */
  size: number
  className?: string
}

export const PixelGrid = memo(function PixelGrid({ cells, cols, size, className }: PixelGridProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, width: size, height: size }}
    >
      {cells.map((color, i) => (
        <div key={i} style={{ background: color }} />
      ))}
    </div>
  )
})

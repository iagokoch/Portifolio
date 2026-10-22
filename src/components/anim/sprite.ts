// Medidas e helper do bichinho de pixel art (o desenho em si está em Critter.tsx)
export const CPX = 4 // px de tela por pixel do sprite
export const CW = 12 * CPX // largura: 48
export const SH = 6 * CPX // altura: 24

/** Alterna os quadros de caminhada e o bloco; o display inicial é definido aqui, não no JSX */
export function setFrame(svg: SVGSVGElement, moving: boolean, frameB: boolean, showBlock?: boolean) {
  const g = svg.children
  const legA = g[1] as SVGElement | undefined
  const legB = g[2] as SVGElement | undefined
  const blk = g[3] as SVGElement | undefined
  if (legA) legA.style.display = moving && frameB ? 'none' : ''
  if (legB) legB.style.display = moving && frameB ? '' : 'none'
  if (blk && showBlock !== undefined) blk.style.display = showBlock ? '' : 'none'
}

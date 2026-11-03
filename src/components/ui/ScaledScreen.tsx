import { useLayoutEffect, useRef, type ReactNode } from 'react'

const BASE_W = 640

/**
 * Moldura 16:10 que mostra uma tela de 640×400 reduzida para caber na largura que a moldura tiver.
 * A escala acompanha o tamanho da moldura (tablet pequeno, grande, miniaturas).
 */
export function ScaledScreen({ children, className = '' }: { children: ReactNode; className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return
    const fit = () => {
      inner.style.transform = `scale(${frame.clientWidth / BASE_W})`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(frame)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={frameRef} className={`relative aspect-[16/10] overflow-hidden bg-bg ${className}`}>
      <div ref={innerRef} className="h-[400px] w-[640px] origin-top-left">
        {children}
      </div>
    </div>
  )
}

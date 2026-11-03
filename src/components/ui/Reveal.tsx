import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Revela o conteúdo ao entrar na tela (sobe 32px e aparece). Marca `data-in` direto no DOM,
 * sem re-render. Com movimento reduzido o CSS já mostra tudo.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-in', '')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.setAttribute('data-in', '')
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

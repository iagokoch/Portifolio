import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  id?: string
  /** Sem a linha de topo (a primeira seção depois do hero não usa) */
  noBorder?: boolean
  /** Classes extras para o miolo (por exemplo `flex flex-col gap-10`) */
  innerClassName?: string
  children: ReactNode
}

/** Seção de página: linha fina no topo e padding vertical responsivo */
export function Section({ id, noBorder = false, innerClassName = '', children }: SectionProps) {
  return (
    <section id={id} className={noBorder ? '' : 'border-t border-line'}>
      <Container className={`py-[clamp(72px,9cqw,128px)] ${innerClassName}`}>{children}</Container>
    </section>
  )
}

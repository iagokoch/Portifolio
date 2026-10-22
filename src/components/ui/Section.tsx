import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  id?: string
  /** Fundo alternado (--panel) em vez do --bg */
  panel?: boolean
  /** Sem borda inferior (a última seção antes do footer não usa) */
  noBorder?: boolean
  /** Classes extras para o miolo (por exemplo `flex flex-col gap-10`) */
  innerClassName?: string
  children: ReactNode
}

/** Seção de página: borda inferior, fundo alternado e padding vertical responsivo */
export function Section({ id, panel = false, noBorder = false, innerClassName = '', children }: SectionProps) {
  return (
    <section id={id} className={`${panel ? 'bg-panel' : ''} ${noBorder ? '' : 'border-b border-border'}`}>
      <Container className={`py-[clamp(64px,7.8cqw,112px)] ${innerClassName}`}>{children}</Container>
    </section>
  )
}

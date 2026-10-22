import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  /** Quebra o título de forma equilibrada (text-wrap: balance) */
  balance?: boolean
  /** Conteúdo à direita, alinhado à base (contagem, link, contatos) */
  aside?: ReactNode
  /** Conteúdo logo abaixo do título (por exemplo a linha de status do heatmap) */
  below?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, title, balance = false, aside, below, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-4 ${className}`}>
      <div className="flex max-w-[780px] flex-col gap-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={`m-0 font-pixel text-[clamp(28px,2.9cqw,42px)] leading-[1.12] font-normal ${balance ? 'text-balance' : ''}`}
        >
          {title}
        </h2>
        {below}
      </div>
      {aside}
    </div>
  )
}

import type { ReactNode } from 'react'

type TagVariant = 'tech' | 'soft' | 'accent'

const VARIANTS: Record<TagVariant, string> = {
  tech: 'border-border px-2 py-1 text-xs text-muted',
  soft: 'border-soft px-2 py-[3px] text-xs text-soft',
  accent: 'border-accent px-2 py-[3px] text-xs text-accent',
}

/** Tag mono: `tech` para tecnologias, `soft`/`accent` para o status do projeto (accent leva o ponto) */
export function Tag({ variant = 'tech', children }: { variant?: TagVariant; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-px border font-mono ${VARIANTS[variant]}`}>
      {variant === 'accent' && <span aria-hidden="true" className="size-1.5 bg-accent" />}
      {children}
    </span>
  )
}

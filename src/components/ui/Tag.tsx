import type { ReactNode } from 'react'

/** Etiqueta mono com contorno fino (tecnologias do projeto) */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-tag border border-line-strong px-2.5 py-1 font-mono text-xs text-ink">
      {children}
    </span>
  )
}

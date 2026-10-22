import type { ReactNode } from 'react'

/** Rótulo mono em âmbar com o quadradinho de 8px: "01 // projetos" */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-mono text-[13px] text-accent ${className}`}>
      <span aria-hidden="true" className="size-2 bg-accent" />
      {children}
    </div>
  )
}

import type { ReactNode } from 'react'

/** Coluna central do site: min(1100px, 100% - 40px) */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-[min(1100px,calc(100%-40px))] ${className}`}>{children}</div>
}

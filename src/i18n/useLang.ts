import { createContext, useContext } from 'react'
import type { Dict } from './pt'
import type { Lang } from './types'

export interface LangValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

export const LangContext = createContext<LangValue | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>')
  return ctx
}

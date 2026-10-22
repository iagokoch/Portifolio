import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { en } from './en'
import { pt, type Dict } from './pt'
import type { Lang } from './types'

const KEY = 'ik-lang'
const dictionaries: Record<Lang, Dict> = { pt, en }

interface LangValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LangContext = createContext<LangValue | null>(null)

// PT é o padrão; só vai para EN se a pessoa escolheu antes
const initialLang = (): Lang => (readStorage(KEY) === 'en' ? 'en' : 'pt')

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = dictionaries[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dictionaries[lang].meta.description)
    writeStorage(KEY, lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>')
  return ctx
}

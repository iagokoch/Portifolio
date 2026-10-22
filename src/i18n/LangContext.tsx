import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { en } from './en'
import { pt, type Dict } from './pt'
import type { Lang } from './types'
import { LangContext, type LangValue } from './useLang'

const KEY = 'ik-lang'
const dictionaries: Record<Lang, Dict> = { pt, en }

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
  const value = useMemo<LangValue>(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

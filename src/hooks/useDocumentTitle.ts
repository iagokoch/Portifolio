import { useEffect } from 'react'

/** Título da aba da página atual. Cada página define o seu, então não há disputa entre componentes. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

import { useEffect } from 'react'

const SITE_URL = 'https://iagokoch.dev'

/** URL canônica da página atual (ex.: "/" ou "/projetos/dentagenda"). Cada rota define a sua. */
export function useCanonical(path: string) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = `${SITE_URL}${path}`
  }, [path])
}

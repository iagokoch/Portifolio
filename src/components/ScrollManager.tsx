import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

const HEADER_HEIGHT = 68

/**
 * Rolagem entre páginas: ir para uma rota nova volta ao topo, e um link com hash (/#contato) rola até a seção,
 * inclusive vindo da página de um projeto. Voltar/avançar do navegador mantém a posição que ele restaura.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const type = useNavigationType()
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    const first = previousPath.current === null
    const samePage = previousPath.current === pathname
    previousPath.current = pathname
    // voltar/avançar e recarregar: o navegador restaura a posição; só a carga inicial com hash precisa de ajuda
    if (type === 'POP' && (!first || !hash)) return

    // mesma página: `auto` respeita o scroll-behavior do CSS (suave, ou direto com movimento reduzido);
    // página nova: vai direto, sem animar
    const behavior = samePage || first ? 'auto' : 'instant'
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    const top = target ? target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT : 0
    window.scrollTo({ top, behavior })
  }, [pathname, hash, key, type])

  return null
}

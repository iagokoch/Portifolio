import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { IKTile } from '../components/ui/IKTile'
import { config } from '../config'
import { useLang } from '../i18n/useLang'
import type { Lang } from '../i18n/types'

const LANGS: Lang[] = ['pt', 'en']

export function Navbar() {
  const { t, lang, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#projetos', label: t.nav.projects },
    { href: '#sobre', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#contato', label: t.nav.contact },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    // se a janela crescer até o desktop, o menu aberto não faz mais sentido
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg">
      <Container className="flex h-[68px] items-center gap-7">
        <IKTile href="#top" size={38} fontSize={16} raised />

        <nav aria-label="Principal" className="hidden gap-7 font-mono text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted no-underline hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Button
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="xs"
            className="max-md:hidden"
          >
            {t.nav.github}
          </Button>

          <div role="group" aria-label={t.nav.langLabel} className="flex overflow-hidden rounded-px border border-border-input">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`h-[34px] cursor-pointer border-0 px-2.5 font-mono text-xs ${
                  lang === l ? 'bg-accent text-on-accent' : 'bg-transparent text-muted'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="h-9 cursor-pointer rounded-px border border-border-input bg-panel px-3 font-pixel text-xs text-fg shadow-px-sm md:hidden"
          >
            {t.nav.menu}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Principal" className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col py-2 font-mono text-sm">
            {[...links, { href: config.githubUrl, label: t.nav.github }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="py-3 text-muted no-underline hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}

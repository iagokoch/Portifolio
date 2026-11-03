import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Pet } from '../components/ui/Pet'
import { config } from '../config'
import { useLang } from '../i18n/useLang'
import type { Lang } from '../i18n/types'

const LANGS: Lang[] = ['pt', 'en']

export function Navbar() {
  const { t, lang, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  // `/#secao`: funciona da home e da página de um projeto (o ScrollManager rola até a seção)
  const links = [
    { to: '/#projetos', label: t.nav.projects },
    { to: '/#sobre', label: t.nav.about },
    { to: '/#skills', label: t.nav.skills },
    { to: '/#atividade', label: t.nav.activity },
    { to: '/#contato', label: t.nav.contact },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-[rgba(14,16,20,.86)] backdrop-blur-[12px]">
      <Container className="flex h-[68px] items-center gap-7">
        <Link
          to="/"
          aria-label={t.nav.home}
          className="group flex items-center gap-3 text-lg font-bold tracking-[-0.01em] text-ink no-underline"
        >
          <Pet color="blue" size={30} className="transition-transform duration-200 group-hover:-translate-y-[3px]" />
          iago.koch
        </Link>

        <div className="ml-auto flex items-center gap-[30px]">
          <nav aria-label="Principal" className="hidden gap-[30px] font-mono text-[13px] @min-[820px]:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-ink-2 no-underline transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              href={config.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              size="xs"
              className="@max-[819px]:hidden"
            >
              {t.nav.github}
            </Button>

            <div role="group" aria-label={t.nav.langLabel} className="flex overflow-hidden rounded-btn border border-line-strong">
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`h-[34px] cursor-pointer border-0 px-2.5 font-mono text-xs transition-colors ${
                    lang === l ? 'bg-ink text-bg' : 'bg-transparent text-ink-2 hover:text-ink'
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
              className="h-9 cursor-pointer rounded-btn border border-line-strong bg-card px-3 font-mono text-xs text-ink @min-[820px]:hidden"
            >
              {t.nav.menu}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Principal" className="border-t border-line bg-bg @min-[820px]:hidden">
          <Container className="flex flex-col py-2 font-mono text-[13px]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-ink-2 no-underline transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={config.githubUrl}
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-ink-2 no-underline transition-colors hover:text-ink"
            >
              {t.nav.github}
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}

import { Link } from 'react-router'
import { Container } from '../components/ui/Container'
import { Pet } from '../components/ui/Pet'
import { config } from '../config'
import { useLang } from '../i18n/useLang'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 pt-7 pb-10 text-[15px] text-ink-2">
        <span className="flex items-center gap-2.5">
          <Pet color="blue" size={20} />
          {t.footer.credit}
        </span>
        <span className="flex gap-5 font-mono text-[13px]">
          <a
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-2 no-underline transition-colors hover:text-ink"
          >
            {t.footer.github}
          </a>
          <Link to="/" className="text-ink-2 no-underline transition-colors hover:text-ink">
            {t.footer.top}
          </Link>
        </span>
      </Container>
    </footer>
  )
}

import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { IKTile } from '../components/ui/IKTile'
import { whatsappLink } from '../config'
import { useLang } from '../i18n/LangContext'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-bg">
      <Container className="flex flex-wrap items-center justify-between gap-5 py-8">
        <div className="flex items-center gap-3">
          <IKTile size={28} fontSize={11} />
          <span className="text-sm text-muted">{t.footer.credit}</span>
        </div>
        <div className="flex items-center gap-5">
          <Button
            href={whatsappLink(t.contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-accent"
            size="xs"
            className="gap-2"
          >
            <span aria-hidden="true" className="size-2 bg-accent" />
            {t.footer.whatsapp}
          </Button>
          <a href="#top" className="font-mono text-[13px] text-fg no-underline hover:text-accent">
            {t.footer.top}
          </a>
        </div>
      </Container>
    </footer>
  )
}

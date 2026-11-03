import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { Section } from '../../components/ui/Section'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { config, whatsappLink } from '../../config'
import { useLang } from '../../i18n/useLang'
import { ContactForm } from './ContactForm'
import { Terminal } from './Terminal'

export function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <Section id="contato">
      <Reveal className="mb-11 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <SectionTitle request={c.request} status={c.status} title={c.title} />
        <div className="flex flex-col items-start gap-3 font-mono text-[13px] text-ink-2">
          <span>
            <a href={`mailto:${config.email}`} className="text-ink-2 no-underline transition-colors hover:text-ink">
              {config.email}
            </a>
            {' · '}
            {config.phone}
          </span>
          <Button href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener noreferrer">
            {c.whatsapp} ↗
          </Button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 @min-[820px]:grid-cols-2">
        <Reveal className="flex">
          <Terminal />
        </Reveal>
        <Reveal className="flex">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}

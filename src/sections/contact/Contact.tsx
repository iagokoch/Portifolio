import { Crew } from '../../components/anim/Crew'
import { Button } from '../../components/ui/Button'
import { Section } from '../../components/ui/Section'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { config, whatsappLink } from '../../config'
import { useLang } from '../../i18n/LangContext'
import { ContactForm } from './ContactForm'
import { Terminal } from './Terminal'

// Glifo de balão de conversa em 3×3 pixels (1 = pintado)
const CHAT_GLYPH = [1, 1, 1, 1, 1, 0, 1, 0, 0]

export function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <Section id="contato" panel>
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
        balance
        className="mb-10"
        aside={
          <>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px]">
              <span>
                <span className="text-muted">{c.emailLabel} </span>
                <a href={`mailto:${config.email}`} className="text-fg no-underline hover:text-accent">
                  {config.email}
                </a>
              </span>
              <span>
                <span className="text-muted">{c.phoneLabel} </span>
                {config.phone}
              </span>
            </div>
            <Button href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener noreferrer" size="cta" className="gap-3">
              <span aria-hidden="true" className="grid grid-cols-[repeat(3,4px)] gap-0.5">
                {CHAT_GLYPH.map((on, i) => (
                  <span key={i} className={`size-1 ${on ? 'bg-on-accent' : ''}`} />
                ))}
              </span>
              {c.whatsapp}
            </Button>
          </>
        }
      />
      <Crew message={t.crew.contact} wait className="-mt-2 mb-7" />
      <div className="flex flex-wrap items-stretch gap-7">
        <Terminal />
        <ContactForm />
      </div>
    </Section>
  )
}

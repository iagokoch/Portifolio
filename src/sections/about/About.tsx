import { Reveal } from '../../components/ui/Reveal'
import { Section } from '../../components/ui/Section'
import { SectionHeading, SectionRequest } from '../../components/ui/SectionTitle'
import { useLang } from '../../i18n/useLang'
import { Timeline } from './Timeline'

export function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <Section id="sobre">
      <Reveal>
        <SectionRequest request={a.request} status={a.status} />
      </Reveal>

      <div className="mt-2.5 grid grid-cols-1 items-end gap-x-16 gap-y-9 @min-[820px]:grid-cols-2">
        <Reveal>
          <SectionHeading title={a.title} className="mt-2.5" />
        </Reveal>
        <Reveal className="flex flex-col gap-5">
          <p className="m-0 text-[19px] text-ink">{a.intro}</p>
          <dl className="m-0 grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 border-t border-[rgba(240,237,231,.12)] pt-4 text-[15px]">
            {a.facts.map((f) => (
              <div key={f.k} className="contents">
                <dt className="font-mono text-xs text-ink-2">{f.k}</dt>
                <dd className="m-0 text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Timeline />
    </Section>
  )
}

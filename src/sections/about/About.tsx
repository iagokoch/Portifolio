import { Crew } from '../../components/anim/Crew'
import { Section } from '../../components/ui/Section'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { useLang } from '../../i18n/useLang'
import { PlayerCard } from './PlayerCard'
import { Timeline } from './Timeline'

export function About() {
  const { t } = useLang()

  return (
    <Section id="sobre" innerClassName="flex flex-col gap-10">
      <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} balance />
      <Crew message={t.crew.about} className="-my-2" />
      <PlayerCard />
      <Timeline />
    </Section>
  )
}

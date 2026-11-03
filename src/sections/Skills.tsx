import { Icon, type IconName } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'
import { useLang } from '../i18n/useLang'
import type { Dict } from '../i18n/pt'

interface SkillGroup {
  key: keyof Dict['skills']['groups']
  icon: IconName
  items: string[]
  /** Em aprendizado: borda tracejada */
  learning?: boolean
}

const GROUPS: SkillGroup[] = [
  { key: 'backend', icon: 'code', items: ['Python', 'Java', 'FastAPI', 'Node.js', 'Express'] },
  { key: 'frontend', icon: 'monitor', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { key: 'data', icon: 'database', items: ['PostgreSQL', 'MySQL'] },
  { key: 'infra', icon: 'cloud', items: ['Docker', 'Linux', 'Active Directory', 'Microsoft 365', 'CI/CD'] },
  { key: 'learning', icon: 'book', items: ['Spring Boot'], learning: true },
]

export function Skills() {
  const { t } = useLang()

  return (
    <Section id="skills">
      <Reveal>
        <SectionTitle request={t.skills.request} status={t.skills.status} title={t.skills.title} className="max-w-[900px]" />
      </Reveal>
      <div className="mt-11 grid grid-cols-2 gap-3.5 @min-[820px]:grid-cols-5">
        {GROUPS.map((g) => (
          <Reveal key={g.key}>
            <div
              className={`flex h-full flex-col gap-4 rounded-xl border border-line-strong bg-card px-[18px] py-5 transition-[transform,border-color] duration-[350ms] ease-out hover:-translate-y-1 hover:border-[rgba(240,237,231,.5)] ${
                g.learning ? 'border-dashed' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-[42px] items-center justify-center rounded-[9px] border border-line-strong bg-surface text-ink">
                  <Icon name={g.icon} size={20} />
                </span>
                <span className="font-mono text-xs text-ink-2">×{g.items.length}</span>
              </div>
              <b className="text-[19px] tracking-[-0.01em]">{t.skills.groups[g.key]}</b>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px] text-ink-2">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

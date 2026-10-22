import { Crew } from '../components/anim/Crew'
import { PixelGrid } from '../components/ui/PixelGrid'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useLang } from '../i18n/LangContext'
import type { Dict } from '../i18n/pt'
import { cells, ICON_PALETTE, ICONS, type IconName } from '../lib/pixels'

interface SkillGroup {
  key: keyof Dict['skills']['groups']
  icon: IconName
  items: string[]
  /** Em aprendizado: borda tracejada e pontos lavanda */
  learning?: boolean
}

const GROUPS: SkillGroup[] = [
  { key: 'backend', icon: 'backend', items: ['Python', 'Java', 'FastAPI', 'Node.js', 'Express'] },
  { key: 'frontend', icon: 'frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { key: 'data', icon: 'data', items: ['PostgreSQL', 'MySQL'] },
  { key: 'infra', icon: 'infra', items: ['Docker', 'Linux', 'Active Directory', 'Microsoft 365', 'CI/CD'] },
  { key: 'learning', icon: 'learning', items: ['Spring Boot'], learning: true },
]

const ICON_CELLS = Object.fromEntries(
  (Object.keys(ICONS) as IconName[]).map((name) => [name, cells(ICONS[name], ICON_PALETTE)]),
) as Record<IconName, string[]>

export function Skills() {
  const { t } = useLang()

  return (
    <Section id="skills" panel>
      <SectionHeader
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        className="mb-11"
        aside={<div className="font-mono text-[13px] text-muted">{t.skills.meta}</div>}
      />
      <Crew message={t.crew.skills} className="-mt-2 mb-7" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(196px,1fr))] gap-4">
        {GROUPS.map((g, i) => {
          const dashed = g.learning ? 'border-dashed' : ''
          return (
            <div
              key={g.key}
              data-load="s"
              className={`flex flex-col gap-3.5 rounded-px border border-border-input bg-bg p-4 shadow-px-md ${dashed}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-[46px] items-center justify-center border border-border bg-panel-2">
                  <PixelGrid cells={ICON_CELLS[g.icon]} cols={8} size={28} />
                </div>
                <span className="font-mono text-[11px] text-muted">
                  {t.skills.slot} {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-pixel text-base">{t.skills.groups[g.key]}</span>
                <span className="font-mono text-[11px] text-muted">×{g.items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center gap-1.5 rounded-px border border-border bg-panel-2 px-[9px] py-[5px] font-mono text-[12.5px] ${dashed}`}
                  >
                    <span className={`size-[5px] ${g.learning ? 'bg-soft' : 'bg-accent'}`} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

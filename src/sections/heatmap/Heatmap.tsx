import { memo, useCallback, useMemo, useState } from 'react'
import { Crew } from '../../components/anim/Crew'
import { Section } from '../../components/ui/Section'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { config } from '../../config'
import { useContributions } from '../../hooks/useContributions'
import { useLang } from '../../i18n/LangContext'
import { buildWeeks, emptyYear, monthLabels, parseDay, type Week } from '../../lib/heatmap'

const ROW = 'h-3.5'
const CELL = 17 // 14px de célula + 3px de espaço

interface WeekColumnProps {
  week: Week
  weekIndex: number
  hoverDay: number | null
  onHover: (weekIndex: number, dayIndex: number) => void
}

// Memoizado: passar o mouse só re-renderiza as colunas afetadas, não as 53
const WeekColumn = memo(function WeekColumn({ week, weekIndex, hoverDay, onHover }: WeekColumnProps) {
  return (
    <div className="flex flex-col gap-[3px]">
      {Array.from({ length: 7 }, (_, di) => {
        const d = week[di]
        if (!d) return <span key={di} className="size-3.5" />
        return (
          <span
            key={di}
            onMouseEnter={() => onHover(weekIndex, di)}
            onClick={() => onHover(weekIndex, di)}
            className={`size-3.5 rounded-[1px] ${hoverDay === di ? 'outline outline-offset-1 outline-fg' : ''}`}
            style={{ background: `var(--h${d.level})` }}
          />
        )
      })}
    </div>
  )
})

export function Heatmap() {
  const { t } = useLang()
  const h = t.heatmap
  const data = useContributions()
  const [hover, setHover] = useState<[number, number] | null>(null)
  const onHover = useCallback((wi: number, di: number) => setHover([wi, di]), [])

  const days = useMemo(() => (data.status === 'ok' ? data.days : emptyYear()), [data])
  const weeks = useMemo(() => buildWeeks(days), [days])
  const months = useMemo(() => monthLabels(weeks, h.months), [weeks, h.months])

  const status =
    data.status === 'ok' ? h.status.ok(data.total, config.githubUser) : data.status === 'error' ? h.status.error : h.status.loading

  const hovered = hover ? weeks[hover[0]]?.[hover[1]] : null
  let tip = null
  if (hover && hovered) {
    const date = parseDay(hovered.date)
    const c = hovered.count
    const [wi, di] = hover
    const shiftX = wi > weeks.length - 9 ? 'calc(-100% + 10px)' : wi < 8 ? '-10px' : '-50%'
    tip = {
      left: wi * CELL + 7,
      top: di * CELL,
      transform: `translate(${shiftX}, calc(-100% - 10px))`,
      count: c == null ? h.tip.noData : c === 0 ? h.tip.none : c === 1 ? h.tip.one : h.tip.many(c),
      date: h.tip.date(date.getDate(), h.months[date.getMonth()], date.getFullYear()),
    }
  }

  return (
    <Section>
      <SectionHeader
        eyebrow={h.eyebrow}
        title={h.title}
        className="mb-9"
        below={<span className="font-mono text-[13px] text-muted">{status}</span>}
        aside={
          <a
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-accent font-mono text-[13px] text-fg no-underline hover:text-accent"
          >
            @{config.githubUser} ↗
          </a>
        }
      />

      <Crew message={t.crew.heatmap} className="-mt-1 mb-7" />
      <div
        data-load="h"
        className="overflow-x-auto rounded-px border border-border-input bg-panel px-6 pt-6 pb-5 shadow-px md:overflow-x-visible"
      >
        <div className="mx-auto flex w-max gap-2.5" role="img" aria-label={status}>
          <div className="flex flex-col gap-[3px] pt-6 font-mono text-[10px] text-muted">
            {[null, h.days[0], null, h.days[1], null, h.days[2], null].map((label, i) => (
              <span key={i} className={`${ROW} ${label ? 'leading-[14px]' : ''}`}>
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex h-[18px] gap-[3px]">
              {months.map((m, i) => (
                <span key={i} className="w-3.5 flex-none font-mono text-[10px] whitespace-nowrap text-muted">
                  {m}
                </span>
              ))}
            </div>

            <div className="relative flex gap-[3px]" onMouseLeave={() => setHover(null)}>
              {weeks.map((w, wi) => (
                <WeekColumn
                  key={wi}
                  week={w}
                  weekIndex={wi}
                  hoverDay={hover && hover[0] === wi ? hover[1] : null}
                  onHover={onHover}
                />
              ))}
              {tip && (
                <div className="pointer-events-none absolute z-[5]" style={{ left: tip.left, top: tip.top }}>
                  <div style={{ transform: tip.transform }}>
                    <div className="flex gap-2 rounded-px border border-accent bg-panel-2 px-2.5 py-[7px] font-mono text-xs whitespace-nowrap shadow-px-sm">
                      <span className="font-semibold text-accent">{tip.count}</span>
                      <span className="text-muted">{tip.date}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[18px] flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5 font-mono text-[11px] text-muted">
          <span>{h.source}</span>
          <div className="flex items-center gap-1">
            <span className="mr-1">{h.less}</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="size-3" style={{ background: `var(--h${l})` }} />
            ))}
            <span className="ml-1">{h.more}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

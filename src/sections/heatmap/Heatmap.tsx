import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Reveal } from '../../components/ui/Reveal'
import { Section } from '../../components/ui/Section'
import { SectionHeading, SectionRequest } from '../../components/ui/SectionTitle'
import { config } from '../../config'
import { useContributions } from '../../hooks/useContributions'
import { useLang } from '../../i18n/useLang'
import { buildWeeks, emptyYear, monthLabels, parseDay, type Week } from '../../lib/heatmap'

const PITCH = 16 // 13px de célula + 3px de espaço

interface WeekColumnProps {
  week: Week
  weekIndex: number
  hoverDay: number | null
  onHover: (weekIndex: number, dayIndex: number) => void
}

// Memoizado: passar o mouse só re-renderiza as colunas afetadas, não as 53
const WeekColumn = memo(function WeekColumn({ week, weekIndex, hoverDay, onHover }: WeekColumnProps) {
  return (
    <div className="grid grid-rows-[repeat(7,13px)] gap-[3px]">
      {Array.from({ length: 7 }, (_, di) => {
        const d = week[di]
        if (!d) return <span key={di} className="w-[13px]" />
        return (
          <span
            key={di}
            onMouseEnter={() => onHover(weekIndex, di)}
            onClick={() => onHover(weekIndex, di)}
            className={`w-[13px] rounded-[2px] ${hoverDay === di ? 'outline-1 outline-offset-1 outline-ink' : ''}`}
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
  const scrollerRef = useRef<HTMLDivElement>(null)

  const days = useMemo(() => (data.status === 'ok' ? data.days : emptyYear()), [data])
  const weeks = useMemo(() => buildWeeks(days), [days])
  const months = useMemo(() => monthLabels(weeks, h.months), [weeks, h.months])

  // em telas estreitas a grade rola na horizontal: começa pelos dias mais recentes
  useEffect(() => {
    const el = scrollerRef.current
    if (el && data.status === 'ok') el.scrollLeft = el.scrollWidth
  }, [data.status])

  const code = data.status === 'ok' ? h.code.ok : data.status === 'error' ? h.code.error : h.code.loading
  const status =
    data.status === 'ok' ? h.status.ok(data.total, config.githubUser) : data.status === 'error' ? h.status.error : h.status.loading

  const hovered = hover ? weeks[hover[0]]?.[hover[1]] : null
  let tip = h.hint
  if (hovered) {
    const date = parseDay(hovered.date)
    const c = hovered.count
    const count = c == null ? h.tip.noData : c === 0 ? h.tip.none : c === 1 ? h.tip.one : h.tip.many(c)
    tip = `${count} · ${h.tip.date(date.getDate(), h.months[date.getMonth()], date.getFullYear())}`
  }

  return (
    <Section id="atividade">
      <Reveal>
        <SectionRequest request={h.request} status={code} />
        <SectionHeading title={h.title} className="mt-2.5" />
        <p className="mt-3.5 mb-[30px] font-mono text-[12.5px] text-ink-2">{status}</p>
      </Reveal>

      <Reveal>
        <div className="rounded-[14px] border border-[rgba(240,237,231,.14)] bg-card px-[22px] pt-[22px] pb-4">
          <div ref={scrollerRef} className="overflow-x-auto pb-1.5">
            <div className="min-w-max" role="img" aria-label={status}>
              <div className="relative ml-[30px] h-[18px] font-mono text-[11px] text-ink-2">
                {months.map(
                  (m, i) =>
                    m && (
                      <span key={i} className="absolute" style={{ left: i * PITCH }}>
                        {m}
                      </span>
                    ),
                )}
              </div>
              <div className="flex gap-1.5">
                <div className="grid w-6 grid-rows-[repeat(7,13px)] gap-[3px] font-mono text-[10px] leading-[13px] text-ink-2">
                  {[null, h.days[0], null, h.days[1], null, h.days[2], null].map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className="flex gap-[3px]" onMouseLeave={() => setHover(null)}>
                  {weeks.map((w, wi) => (
                    <WeekColumn
                      key={wi}
                      week={w}
                      weekIndex={wi}
                      hoverDay={hover && hover[0] === wi ? hover[1] : null}
                      onHover={onHover}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-line pt-3 font-mono text-xs text-ink-2">
            <span className="min-h-[18px] text-ink" aria-live="polite">
              {tip}
            </span>
            <span className="inline-flex items-center gap-[5px]">
              {h.less}
              {[0, 1, 2, 3, 4].map((l) => (
                <i key={l} className="inline-block size-3 rounded-[2px]" style={{ background: `var(--h${l})` }} />
              ))}
              {h.more}
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

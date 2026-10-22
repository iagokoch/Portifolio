import { useLang } from '../../i18n/useLang'

const NODE = 'size-[22px] flex-none rounded-px'
const PAST_NODE = `${NODE} relative z-[1] border border-muted bg-border-input`
const NOW_NODE = `${NODE} relative z-[1] animate-pulse-px border border-shadow bg-accent`

/** Trilha "caminho.log": 3 colunas ligadas por um trilho no desktop, lista vertical no mobile */
export function Timeline() {
  const { t } = useLang()
  const tl = t.about.timeline
  const lastIndex = tl.entries.length - 1

  return (
    <div data-load="a2" className="flex flex-col gap-[30px] rounded-px border border-border bg-panel px-7 pt-7 pb-[30px]">
      <div className="flex justify-between font-mono text-xs text-muted">
        <span>{tl.file}</span>
        <span>{tl.range}</span>
      </div>

      {/* desktop */}
      <ol className="relative m-0 hidden list-none grid-cols-3 p-0 pt-[30px] md:grid">
        <div aria-hidden="true" className="absolute top-[39px] left-[11px] h-1 w-[66.66%] bg-border-input" />
        {tl.entries.map((e, i) => {
          const isNow = i === lastIndex
          return (
            <li key={e.year} className="relative flex flex-col gap-[22px] pr-5">
              {isNow && (
                <span className="absolute top-[-30px] left-0 border border-shadow bg-accent px-[7px] py-[3px] font-pixel text-[10px] text-on-accent">
                  {tl.now}
                </span>
              )}
              <span aria-hidden="true" className={isNow ? NOW_NODE : PAST_NODE} />
              <div className="flex flex-col gap-1.5">
                <span className={`font-pixel text-base ${isNow ? 'text-accent' : 'text-fg'}`}>{e.year}</span>
                <span className="leading-[1.35] font-medium">{e.role}</span>
                <span className="font-mono text-xs text-muted">{e.org}</span>
              </div>
            </li>
          )
        })}
      </ol>

      {/* mobile */}
      <ol className="m-0 flex list-none flex-col p-0 md:hidden">
        {tl.entries.map((e, i) => {
          const isNow = i === lastIndex
          return (
            <li key={e.year} className="flex gap-4">
              <div className="flex w-[22px] flex-none flex-col items-center">
                <span aria-hidden="true" className={isNow ? NOW_NODE : PAST_NODE} />
                <span aria-hidden="true" className={`min-h-[18px] w-1 flex-1 ${isNow ? 'bg-transparent' : 'bg-border-input'}`} />
              </div>
              <div className="flex flex-col gap-1 pb-6">
                <div className="flex items-center gap-2">
                  <span className={`font-pixel text-[15px] ${isNow ? 'text-accent' : 'text-fg'}`}>{e.year}</span>
                  {isNow && <span className="bg-accent px-1.5 py-0.5 font-pixel text-[9px] text-on-accent">{tl.now}</span>}
                </div>
                <span className="font-medium">{e.role}</span>
                <span className="font-mono text-xs text-muted">{e.org}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

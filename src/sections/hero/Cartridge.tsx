import { PixelGrid } from '../../components/ui/PixelGrid'
import { useLang } from '../../i18n/LangContext'
import { AVATAR_CELLS } from '../../lib/pixels'
import { CodeCard } from './CodeCard'

const MONO = 'font-mono text-[11px] font-semibold'

/** Cartucho de console com o avatar no rótulo e o card de código sobreposto */
export function Cartridge() {
  const { t } = useLang()
  const c = t.hero.cartridge

  return (
    <div className="relative w-[min(470px,100%)] pb-[120px]">
      {/* confete decorativo */}
      <div aria-hidden="true" className="absolute top-[-18px] left-[12%] size-3 bg-soft" />
      <div aria-hidden="true" className="absolute top-[34px] left-[4%] size-2 bg-accent" />
      <div aria-hidden="true" className="absolute top-[46%] right-[-4px] size-2.5 border border-accent" />

      <div className="relative ml-auto w-[min(360px,100%)]">
        <div className="relative z-[1] mx-6 rounded-t-px border border-border-input bg-panel-2 pb-10 shadow-[6px_6px_0_var(--shadow)]">
          {/* cantos chanfrados */}
          <div aria-hidden="true" className="absolute top-[-1px] left-[-1px] size-3 border-r border-b border-border-input bg-bg" />
          <div aria-hidden="true" className="absolute top-[-1px] right-[-1px] size-3 border-b border-l border-border-input bg-bg" />
          {/* ranhuras */}
          <div
            aria-hidden="true"
            className="mx-[34px] mt-3.5 mb-2.5 h-[30px] bg-[repeating-linear-gradient(180deg,var(--border-input)_0_2px,transparent_2px_7px)]"
          />
          {/* rótulo */}
          <div className="mx-[18px] flex flex-col gap-3 rounded-px border border-shadow bg-accent p-3 text-on-accent">
            <div className={`flex justify-between ${MONO}`}>
              <span>{c.label}</span>
              <span>{c.langs}</span>
            </div>
            <div className="relative flex h-[176px] items-end justify-center overflow-hidden border border-shadow bg-[#0c0d11] bg-[linear-gradient(rgba(255,159,28,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,159,28,.08)_1px,transparent_1px)] bg-[length:12px_12px]">
              <PixelGrid cells={AVATAR_CELLS} cols={48} size={144} />
              <span className="absolute top-2 left-2 font-pixel text-[10px] text-[#ff9f1c]">P1</span>
            </div>
            <div className="font-pixel text-[26px] leading-none">{c.name}</div>
            <div className={`flex justify-between ${MONO}`}>
              <span>{c.role}</span>
              <span>{c.city}</span>
            </div>
          </div>
          <div className="mt-4 text-center font-pixel text-[10px] text-muted">{c.insert}</div>
        </div>

        {/* base do slot */}
        <div className="relative z-[2] -mt-[30px] flex h-11 items-center gap-2.5 rounded-px border border-border-input bg-panel px-3.5 font-mono text-[11px] text-muted shadow-[6px_6px_0_var(--shadow)]">
          <span aria-hidden="true" className="size-2 animate-pulse-px bg-accent" />
          <span>{c.slot}</span>
          <span aria-hidden="true" className="ml-auto flex gap-[3px]">
            <span className="h-1 w-[18px] bg-border-input" />
            <span className="h-1 w-[18px] bg-border-input" />
            <span className="h-1 w-[18px] bg-border-input" />
          </span>
        </div>
      </div>

      <CodeCard />
    </div>
  )
}

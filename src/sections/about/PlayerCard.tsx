import { PixelGrid } from '../../components/ui/PixelGrid'
import { useLang } from '../../i18n/useLang'
import { AVATAR_CELLS } from '../../lib/pixels'

const LABEL = 'font-mono text-xs text-muted'

/** Ficha do "Jogador 1": avatar, atributos, inventário e movimento especial */
export function PlayerCard() {
  const { t } = useLang()
  const a = t.about
  const s = a.stats

  return (
    <div data-load="a1" className="rounded-px border border-border-input bg-panel shadow-px">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-pixel text-xs text-accent">{a.player}</span>
        <span className={LABEL}>{a.save}</span>
      </div>

      <div className="flex flex-wrap gap-7 p-[22px]">
        <div className="bg-grid relative flex h-[330px] min-w-[260px] flex-[0_1_320px] items-center justify-center rounded-px border border-border-input [--grid-size:16px]">
          <PixelGrid cells={AVATAR_CELLS} cols={48} size={288} />
          <span className="absolute bottom-2 left-2 font-mono text-[10px] text-muted">{a.avatarCaption}</span>
        </div>

        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-4">
          <div className="font-pixel text-2xl leading-none">{a.name}</div>
          <div className="grid grid-cols-[72px_1fr] items-baseline gap-x-4 gap-y-3">
            <span className={LABEL}>{s.classLabel}</span>
            <span>{s.classValue}</span>
            <span className={LABEL}>{s.levelLabel}</span>
            <span>{s.levelValue}</span>
            <span className={LABEL}>{s.baseLabel}</span>
            <span>{s.baseValue}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="font-pixel text-xs text-muted">{a.inventoryTitle}</span>
            {a.inventory.map((item) => (
              <div key={item} className="flex items-baseline gap-2.5">
                <span aria-hidden="true" className="size-[7px] flex-none bg-soft" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 rounded-px border border-dashed border-soft px-3.5 py-3">
            <span className="font-pixel text-[11px] text-soft">{a.specialTitle}</span>
            <span className="text-pretty">{a.special}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

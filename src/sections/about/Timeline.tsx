import { Reveal } from '../../components/ui/Reveal'
import { useLang } from '../../i18n/useLang'

/**
 * Linha do tempo: 3 colunas sobre uma linha horizontal no desktop; no mobile fica empilhada,
 * com uma linha vertical. O nó do cargo atual (o último) é preenchido.
 */
export function Timeline() {
  const { t } = useLang()
  const entries = t.about.timeline
  const last = entries.length - 1

  return (
    <Reveal className="mt-14">
      <ol className="m-0 ml-1 list-none border-l border-[rgba(240,237,231,.2)] p-0 @min-[820px]:ml-0 @min-[820px]:grid @min-[820px]:grid-cols-3 @min-[820px]:border-t @min-[820px]:border-l-0">
        {entries.map((e, i) => (
          <li
            key={e.year}
            className="relative flex flex-col gap-1.5 pb-8 pl-6 last:pb-0 @min-[820px]:pt-[22px] @min-[820px]:pr-6 @min-[820px]:pb-0 @min-[820px]:pl-0"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 -left-[5px] size-[9px] border border-ink @min-[820px]:-top-[5px] @min-[820px]:left-0 ${
                i === last ? 'bg-ink' : 'bg-bg'
              }`}
            />
            <div className="font-mono text-[13px] text-ink-2 @min-[820px]:mt-2">{e.year}</div>
            <b className="text-[22px] leading-[1.15] tracking-[-0.01em]">{e.role}</b>
            <span className="text-[15px] text-ink-2">{e.org}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

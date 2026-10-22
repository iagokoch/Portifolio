import { Fragment } from 'react'
import { useLang } from '../../i18n/LangContext'

/** Janelinha `profile.ts` sobreposta ao canto do cartucho */
export function CodeCard() {
  const { t } = useLang()
  const { code } = t.hero

  return (
    <div className="absolute bottom-0 left-0 z-[3] w-[min(330px,84%)] rounded-px border border-border-input bg-panel font-mono shadow-px">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2 text-[11px] text-muted">
        <span className="size-2 bg-border-input" />
        <span className="size-2 bg-border-input" />
        <span className="size-2 bg-accent" />
        <span className="ml-2">{code.file}</span>
      </div>
      <div className="px-4 py-3.5 text-[13px] leading-[1.75] text-fg">
        <div>
          <span className="text-soft">const</span> profile = {'{'}
        </div>
        <div className="pl-[2ch]">
          role: <span className="text-accent">'{code.role}'</span>,
        </div>
        <div className="pl-[2ch]">
          focus: [
          {code.focus.map((f, i) => (
            <Fragment key={f}>
              {i > 0 && ', '}
              <span className="text-accent">'{f}'</span>
            </Fragment>
          ))}
          ],
        </div>
        <div className="pl-[2ch]">
          location: <span className="text-accent">'{code.location}'</span>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  )
}

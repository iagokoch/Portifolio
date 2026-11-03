import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { PixelGrid } from '../../components/ui/PixelGrid'
import { useLang } from '../../i18n/useLang'
import { sendContact } from '../../lib/sendContact'
import { CHECK, cells, ICON_PALETTE } from '../../lib/pixels'

const CHECK_CELLS = cells(CHECK, ICON_PALETTE)
const LABEL = 'flex flex-col gap-[7px]'
const LABEL_TEXT = 'font-mono text-xs text-muted'
const FIELD =
  'rounded-px border border-border-input bg-panel px-3 py-[11px] font-[inherit] text-fg outline-none focus:border-accent focus:shadow-[3px_3px_0_var(--accent)]'
const FIELD_ERROR = 'text-xs text-danger'

export function ContactForm() {
  const { t } = useLang()
  const f = t.contact.form
  const [done, setDone] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lido antes do await: depois dele o React já limpou e.currentTarget
    const formData = new FormData(e.currentTarget)
    setIsSending(true)
    setErrorMessage(null)
    setFieldErrors({})

    const result = await sendContact({
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      message: String(formData.get('message')),
      website: String(formData.get('website') ?? ''),
    })

    setIsSending(false)
    if (result.status === 'success') setDone(true)
    if (result.status === 'invalid') setFieldErrors(result.fieldErrors)
    if (result.status === 'failure') setErrorMessage(f.errorGeneric)
    if (result.status === 'network') setErrorMessage(f.errorNetwork)
  }

  return (
    <div
      data-load="c2"
      className="flex min-w-0 flex-[1_1_340px] flex-col rounded-px border border-border-input bg-bg shadow-px"
    >
      <div className="flex justify-between border-b border-border px-4 py-2.5">
        <span className="font-pixel text-xs">{f.title}</span>
        <span className="font-mono text-xs text-muted">{f.file}</span>
      </div>

      {done ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-[22px] py-8" role="status">
          <div className="flex size-14 items-center justify-center border border-accent bg-panel-2 shadow-px-md">
            <PixelGrid cells={CHECK_CELLS} cols={8} size={32} />
          </div>
          <span className="font-pixel text-[22px]">{f.doneTitle}</span>
          <span className="max-w-[36ch] text-muted">{f.doneText}</span>
          <Button variant="secondary" size="sm" onClick={() => setDone(false)}>
            {f.again}
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4 p-[22px]">
          {/* Honeypot: invisível para pessoas, bots preenchem e o backend descarta a mensagem */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px]"
          />
          <label className={LABEL}>
            <span className={LABEL_TEXT}>{f.name}</span>
            <input name="name" required autoComplete="name" className={FIELD} />
            {fieldErrors.name && <span className={FIELD_ERROR}>{fieldErrors.name}</span>}
          </label>
          <label className={LABEL}>
            <span className={LABEL_TEXT}>{f.email}</span>
            <input name="email" type="email" required autoComplete="email" className={FIELD} />
            {fieldErrors.email && <span className={FIELD_ERROR}>{fieldErrors.email}</span>}
          </label>
          <label className={`${LABEL} flex-1`}>
            <span className={LABEL_TEXT}>{f.message}</span>
            <textarea name="message" required rows={4} className={`${FIELD} flex-1 resize-y`} />
            {fieldErrors.message && <span className={FIELD_ERROR}>{fieldErrors.message}</span>}
          </label>
          {errorMessage && (
            <p role="alert" className="text-sm text-danger">
              {errorMessage}
            </p>
          )}
          <Button type="submit" size="md" className="self-start" disabled={isSending}>
            {isSending ? f.sending : f.submit}
          </Button>
        </form>
      )}
    </div>
  )
}

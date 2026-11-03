import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Pet } from '../../components/ui/Pet'
import { useLang } from '../../i18n/useLang'
import { sendContact } from '../../lib/sendContact'

const LABEL = 'flex flex-col gap-1.5'
const LABEL_TEXT = 'font-mono text-xs text-ink-2'
const FIELD = 'rounded-btn border border-line-strong bg-bg px-3 py-[11px] font-sans text-base text-ink'
const FIELD_ERROR = 'text-xs text-error'

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
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-[rgba(240,237,231,.14)] bg-card">
      <div className="flex justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-ink-2">
        <span>{f.title}</span>
        <span>{f.file}</span>
      </div>

      {done ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-3 px-6 py-10" role="status">
          <Pet color="blue" size={50} />
          <b className="text-[22px]">{f.doneTitle}</b>
          <span className="max-w-[36ch] text-ink-2">{f.doneText}</span>
          <Button variant="secondary" size="xs" onClick={() => setDone(false)}>
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
            <textarea name="message" required rows={4} className={`${FIELD} min-h-[100px] flex-1 resize-y`} />
            {fieldErrors.message && <span className={FIELD_ERROR}>{fieldErrors.message}</span>}
          </label>
          {errorMessage && (
            <p role="alert" className="text-sm text-error">
              {errorMessage}
            </p>
          )}
          <Button type="submit" className="self-start" disabled={isSending}>
            {isSending ? f.sending : f.submit}
          </Button>
        </form>
      )}
    </div>
  )
}

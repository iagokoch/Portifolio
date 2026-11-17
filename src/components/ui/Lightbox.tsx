import { useEffect, useRef, type MouseEvent } from 'react'
import { useLang } from '../../i18n/useLang'

interface LightboxProps {
  /** URLs dos prints, na ordem da galeria */
  shots: string[]
  /** Descrição de cada print (mesma ordem de `shots`) */
  labels: string[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
}

const BUTTON =
  'flex size-10 cursor-pointer items-center justify-center rounded-lg border border-[rgba(240,237,231,.22)] bg-surface text-ink transition-colors hover:border-ink'

/**
 * Print ampliado num pop-up. Usa <dialog> modal: o navegador cuida do foco, do Esc e do fundo inerte.
 * Clicar fora da imagem ou no X fecha; as setas do teclado e os botões trocam de print.
 */
export function Lightbox({ shots, labels, index, onIndex, onClose }: LightboxProps) {
  const { t } = useLang()
  const ref = useRef<HTMLDialogElement>(null)
  const many = shots.length > 1

  useEffect(() => {
    const dialog = ref.current
    // sem `close()` no cleanup: no StrictMode ele dispararia o evento `close` e fecharia o pop-up sozinho
    if (dialog && !dialog.open) dialog.showModal()
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = overflow
    }
  }, [])

  const go = (step: number) => onIndex((index + step + shots.length) % shots.length)

  // clique no fundo (e não na imagem ou nos botões) fecha
  const closeOnBackdrop = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <dialog
      ref={ref}
      aria-label={labels[index]}
      onClose={onClose}
      onClick={closeOnBackdrop}
      onKeyDown={(e) => {
        if (!many) return
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/85"
    >
      <div
        onClick={closeOnBackdrop}
        className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-14 @min-[820px]:px-16"
      >
        <button
          type="button"
          autoFocus
          aria-label={t.projects.lightbox.close}
          onClick={onClose}
          className={`${BUTTON} absolute top-4 right-4`}
        >
          ✕
        </button>

        <div className="flex w-full items-center justify-center gap-3">
          {many && (
            <button type="button" aria-label={t.projects.lightbox.prev} onClick={() => go(-1)} className={BUTTON}>
              ←
            </button>
          )}
          <img
            src={shots[index]}
            alt={labels[index]}
            className="max-h-[78vh] min-w-0 max-w-full rounded-lg border border-line-strong object-contain shadow-[0_20px_60px_rgba(0,0,0,.6)]"
          />
          {many && (
            <button type="button" aria-label={t.projects.lightbox.next} onClick={() => go(1)} className={BUTTON}>
              →
            </button>
          )}
        </div>

        <div className="font-mono text-xs text-ink-2">
          {labels[index]}
          {many && ` · ${index + 1} / ${shots.length}`}
        </div>
      </div>
    </dialog>
  )
}

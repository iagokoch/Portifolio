import type { CSSProperties, ReactNode, RefObject } from 'react'
import { ScaledScreen } from './ScaledScreen'

// Espessura simulada por box-shadows empilhados, mais a sombra projetada
const THICKNESS_CARD =
  '1px 1px 0 #1c2027, 2px 2px 0 #1a1e24, 3px 3px 0 #181b21, 4px 4px 0 #16191f, 5px 5px 0 #14171c, 8px 12px 28px rgba(0,0,0,.6)'
const THICKNESS_DETAIL =
  '1px 1px 0 #1f242b, 2px 2px 0 #1d2128, 3px 3px 0 #1b1f25, 4px 4px 0 #191c22, 5px 5px 0 #171a1f, 6px 6px 0 #15181d, 7px 7px 0 #13161a, 10px 16px 40px rgba(0,0,0,.65), 0 0 70px rgba(128,199,232,.12)'

interface TabletSceneProps {
  /** `card` = tablet pequeno do acordeão; `detail` = tablet grande da página do projeto */
  variant?: 'card' | 'detail'
  /** `ref` e `style` vindos de useTilt, aplicados no tablet */
  tiltRef: RefObject<HTMLDivElement | null>
  tiltStyle: CSSProperties
  /** Posicionamento da cena (altura, lugar na página) */
  className?: string
  children: ReactNode
}

/**
 * Cena 3D só com CSS: um tablet inclinado (perspective + rotateX/rotateZ) sobre uma elipse de brilho
 * azul glacial. A tela do tablet recebe `children` (uma tela de 640×400). É decorativa.
 */
export function TabletScene({ variant = 'card', tiltRef, tiltStyle, className = '', children }: TabletSceneProps) {
  const detail = variant === 'detail'
  return (
    <div
      aria-hidden="true"
      className={
        detail
          ? `[perspective:1800px] ${className}`
          : `relative h-[250px] [perspective:1400px] @min-[820px]:h-[300px] ${className}`
      }
    >
      <div
        className={
          detail
            ? 'absolute bottom-[4%] left-1/2 h-[120px] w-[86%] -translate-x-1/2 rounded-full border border-[rgba(128,199,232,.4)] bg-[radial-gradient(ellipse_at_center,rgba(128,199,232,.18),transparent_68%)] shadow-[0_0_50px_rgba(128,199,232,.18)] @min-[820px]:bottom-[6%]'
            : 'absolute bottom-[6%] left-1/2 h-[60px] w-[78%] -translate-x-1/2 rounded-full border border-[rgba(128,199,232,.28)] bg-[radial-gradient(ellipse_at_center,rgba(128,199,232,.14),transparent_70%)]'
        }
      />
      <div
        ref={tiltRef}
        style={tiltStyle}
        className={
          detail
            ? 'absolute top-[44%] left-1/2 w-[330px] [transform-style:preserve-3d] @min-[820px]:w-[580px]'
            : 'absolute top-[46%] left-1/2 w-[250px] [transform-style:preserve-3d] @min-[820px]:w-[330px]'
        }
      >
        <div
          className={
            detail
              ? 'rounded-[24px] border border-[#525a68] bg-[linear-gradient(145deg,#2e343f,#14171d)] p-3.5'
              : 'rounded-[16px] border border-[#4a515e] bg-[linear-gradient(145deg,#2a303a,#14171d)] p-2.5'
          }
          style={{ boxShadow: detail ? THICKNESS_DETAIL : THICKNESS_CARD }}
        >
          <ScaledScreen className={detail ? 'rounded-[10px]' : 'rounded-lg'}>{children}</ScaledScreen>
        </div>
      </div>
    </div>
  )
}

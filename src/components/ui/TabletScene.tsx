import type { CSSProperties, ReactNode, RefObject } from 'react'
import { ScaledScreen } from './ScaledScreen'

// Espessura simulada por box-shadows empilhados (1px…5px) mais a sombra projetada
const THICKNESS =
  '1px 1px 0 #1c2027, 2px 2px 0 #1a1e24, 3px 3px 0 #181b21, 4px 4px 0 #16191f, 5px 5px 0 #14171c, 8px 12px 28px rgba(0,0,0,.6)'

interface TabletSceneProps {
  /** `ref` e `style` vindos de useTilt, aplicados no tablet */
  tiltRef: RefObject<HTMLDivElement | null>
  tiltStyle: CSSProperties
  children: ReactNode
}

/**
 * Cena 3D só com CSS: um tablet inclinado (perspective + rotateX/rotateZ) sobre uma elipse de brilho
 * azul glacial. A tela do tablet recebe `children` (uma tela de 640×400). É decorativa.
 */
export function TabletScene({ tiltRef, tiltStyle, children }: TabletSceneProps) {
  return (
    <div aria-hidden="true" className="relative h-[250px] [perspective:1400px] @min-[820px]:h-[300px]">
      <div className="absolute bottom-[6%] left-1/2 h-[60px] w-[78%] -translate-x-1/2 rounded-full border border-[rgba(128,199,232,.28)] bg-[radial-gradient(ellipse_at_center,rgba(128,199,232,.14),transparent_70%)]" />
      <div
        ref={tiltRef}
        style={tiltStyle}
        className="absolute top-[46%] left-1/2 w-[250px] [transform-style:preserve-3d] @min-[820px]:w-[330px]"
      >
        <div
          className="rounded-[16px] border border-[#4a515e] bg-[linear-gradient(145deg,#2a303a,#14171d)] p-2.5"
          style={{ boxShadow: THICKNESS }}
        >
          <ScaledScreen className="rounded-lg">{children}</ScaledScreen>
        </div>
      </div>
    </div>
  )
}

export type DentKind = 'agenda' | 'pacientes' | 'inicio' | 'disponibilidade'
export type ProjKind = 'mono' | 'mail' | 'axe' | 'pet' | 'tif'
export type ScreenKind = DentKind | ProjKind

/** As quatro telas do DentAgenda, na ordem das miniaturas */
export const DENT_KINDS: DentKind[] = ['agenda', 'pacientes', 'inicio', 'disponibilidade']

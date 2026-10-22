import { genAvatar, PAL } from './avatar'

/** Converte um mapa de caracteres em uma lista de cores (uma por pixel); desconhecido = transparente */
export const cells = (map: readonly string[], palette: Record<string, string>): string[] => {
  const out: string[] = []
  for (const row of map) for (const ch of row) out.push(palette[ch] ?? 'transparent')
  return out
}

// Ícones 8×8: '1' = muted, '2' = accent
export const ICONS = {
  backend: ['11111111', '1.....21', '11111111', '........', '11111111', '1.....21', '11111111', '........'],
  frontend: ['11111111', '12.2.2.1', '11111111', '1......1', '1.22...1', '1.2222.1', '1......1', '11111111'],
  data: ['.111111.', '1......1', '.111111.', '1......1', '.111111.', '1..22..1', '.111111.', '........'],
  infra: ['11111111', '1......1', '1.2....1', '1..2...1', '1.2.22.1', '1......1', '11111111', '........'],
  learning: ['...22...', '..2222..', '.222222.', '...22...', '...22...', '...11...', '..1111..', '........'],
} as const

export type IconName = keyof typeof ICONS

export const CHECK = ['........', '.......2', '......22', '2....22.', '22..22..', '.2222...', '..22....', '........'] as const

export const ICON_PALETTE: Record<string, string> = { '1': 'var(--muted)', '2': 'var(--accent)' }

// O avatar não muda: calcula uma vez
export const AVATAR_CELLS: string[] = cells(genAvatar(), PAL)

/** Converte um mapa de caracteres em uma lista de cores (uma por pixel); desconhecido = transparente */
export const cells = (map: readonly string[], palette: Record<string, string>): string[] => {
  const out: string[] = []
  for (const row of map) for (const ch of row) out.push(palette[ch] ?? 'transparent')
  return out
}

// Temporário (v4): só o formulário de contato ainda usa; sai na etapa do Contato
export const CHECK = ['........', '.......2', '......22', '2....22.', '22..22..', '.2222...', '..22....', '........'] as const

export const ICON_PALETTE: Record<string, string> = { '1': 'var(--muted)', '2': 'var(--accent)' }

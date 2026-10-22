/** Linha de saída do terminal: `out` = texto comum, `ok` = destaque lavanda */
export interface OutLine {
  k: 'out' | 'ok'
  t: string
}

export const out = (t: string): OutLine => ({ k: 'out', t })
export const ok = (t: string): OutLine => ({ k: 'ok', t })

export type Lang = 'pt' | 'en'

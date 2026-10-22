export interface Day {
  date: string // YYYY-MM-DD
  /** null = sem dados (grade vazia enquanto carrega ou em erro) */
  count: number | null
  level: number // 0..4
}

export type Week = Array<Day | null>

const pad2 = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

/** `YYYY-MM-DD` como data local (new Date(string) puro interpretaria como UTC) */
export const parseDay = (date: string) => new Date(`${date}T00:00:00`)

/** 365 dias terminando hoje, todos vazios: a grade "sem dados". Nunca inventa contribuições. */
export function emptyYear(): Day[] {
  const now = new Date()
  const days: Day[] = []
  for (let i = 364; i >= 0; i--) {
    days.push({ date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)), count: null, level: 0 })
  }
  return days
}

/** Agrupa em colunas de 7 (domingo a sábado), com vazios no começo para alinhar o primeiro dia */
export function buildWeeks(days: Day[]): Week[] {
  const lead = parseDay(days[0].date).getDay()
  const all: Week = [...Array<null>(lead).fill(null), ...days]
  const weeks: Week[] = []
  for (let i = 0; i < all.length; i += 7) weeks.push(all.slice(i, i + 7))
  return weeks
}

/** Um rótulo de mês por coluna ('' quando não há); pula meses que ficariam a menos de 3 colunas do anterior */
export function monthLabels(weeks: Week[], names: readonly string[]): string[] {
  let lastMonth = -1
  let lastIdx = -10
  return weeks.map((w, i) => {
    const first = w.find(Boolean)
    if (!first) return ''
    const m = parseDay(first.date).getMonth()
    if (m === lastMonth) return ''
    lastMonth = m
    if (i - lastIdx < 3) return ''
    lastIdx = i
    return names[m]
  })
}

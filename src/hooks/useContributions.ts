import { useEffect, useState } from 'react'
import { config } from '../config'
import type { Day } from '../lib/heatmap'

export type ContributionsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ok'; days: Day[]; total: number }

interface ApiResponse {
  total?: { lastYear?: number }
  contributions?: Array<{ date: string; count: number; level: number }>
}

const URL = `https://github-contributions-api.jogruber.de/v4/${config.githubUser}?y=last`

// Uma requisição por carregamento de página, mesmo com StrictMode ou remontagens
let request: Promise<ApiResponse> | null = null

const load = () => {
  request ??= fetch(URL).then((r) => {
    if (!r.ok) throw new Error(String(r.status))
    return r.json() as Promise<ApiResponse>
  })
  return request
}

export function useContributions(): ContributionsState {
  const [state, setState] = useState<ContributionsState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    load()
      .then((json) => {
        const list = json.contributions
        if (!Array.isArray(list) || list.length === 0) throw new Error('resposta sem contribuições')
        const days = list
          .map((c) => ({ date: c.date, count: c.count, level: Math.max(0, Math.min(4, c.level)) }))
          .sort((a, b) => (a.date < b.date ? -1 : 1))
        const total = json.total?.lastYear ?? days.reduce((sum, d) => sum + (d.count ?? 0), 0)
        if (!cancelled) setState({ status: 'ok', days, total })
      })
      .catch(() => {
        request = null // permite tentar de novo numa próxima montagem
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

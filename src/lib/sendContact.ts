export interface ContactData {
  name: string
  email: string
  message: string
  website: string
}

/** failure = o servidor respondeu com erro; network = não houve resposta */
export type ContactResult =
  | { status: 'success' }
  | { status: 'invalid'; fieldErrors: Record<string, string> }
  | { status: 'failure' }
  | { status: 'network' }

/** Vazio em produção: site e API ficam no mesmo domínio, então a URL é relativa. */
const apiBaseUrl = import.meta.env.VITE_API_URL ?? ''

export async function sendContact(data: ContactData): Promise<ContactResult> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return { status: 'success' }
    }
    if (response.status === 400) {
      const body = (await response.json()) as { errors?: Record<string, string> }
      return { status: 'invalid', fieldErrors: body.errors ?? {} }
    }
    return { status: 'failure' }
  } catch {
    return { status: 'network' }
  }
}

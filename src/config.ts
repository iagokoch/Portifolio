// Dados de contato e links usados no site.
export const config = {
  email: 'contato@iagokoch.dev',
  phone: '(47) 99174-7863',
  /** Formato internacional, só dígitos (55 + DDD + número) */
  whatsappNumber: '5547991747863',
  githubUser: 'iagokoch',
  githubUrl: 'https://github.com/iagokoch',
} as const

export const whatsappLink = (message: string) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`

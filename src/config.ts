// Dados de contato e links. Os valores de e-mail, telefone e WhatsApp são placeholders: troque aqui.
export const config = {
  email: 'seu-email@exemplo.com',
  phone: '(47) 00000-0000',
  /** Formato internacional, só dígitos (55 + DDD + número) */
  whatsappNumber: '5547000000000',
  githubUser: 'iagokoch',
  githubUrl: 'https://github.com/iagokoch',
} as const

export const whatsappLink = (message: string) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`

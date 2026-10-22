// localStorage pode lançar (modo privado, dados bloqueados): nunca deixar isso quebrar a página
export const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // sem persistência, tudo bem
  }
}

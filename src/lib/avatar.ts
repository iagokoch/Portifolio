// Avatar 48×48 em pixel art, gerado proceduralmente (portado do protótipo do design).
// Cada caractere da grade é uma chave de PAL; '.' é transparente.
const N = 48
const CX = 24

const inEllipse = (x: number, y: number, ex: number, ey: number, rx: number, ry: number) =>
  ((x + 0.5 - ex) / rx) ** 2 + ((y + 0.5 - ey) / ry) ** 2 <= 1

const isHead = (x: number, y: number) => inEllipse(x, y, CX, 20, 10.2, 12.6) && y < 33

export const genAvatar = (): string[] => {
  const G: string[][] = Array.from({ length: N }, () => Array<string>(N).fill('.'))
  const set = (x: number, y: number, c: string) => {
    if (x >= 0 && x < N && y >= 0 && y < N) G[y][x] = c
  }

  // corpo, pescoço, orelhas e rosto
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = x + 0.5 - CX
      if (y >= 36) {
        const w = 9 + (y - 36) * 2.4
        if (Math.abs(dx) <= Math.min(24, w)) G[y][x] = dx > w - 4 ? 'B' : dx < -(w - 2) ? 'n' : 'b'
      }
      if (y >= 29 && y <= 37 && Math.abs(dx) <= 4.6) G[y][x] = dx > 1.5 ? 'S' : 's'
      if (inEllipse(x, y, 13.4, 21.5, 2.2, 3.2) || inEllipse(x, y, 34.6, 21.5, 2.2, 3.2)) G[y][x] = 's'
      if (isHead(x, y)) G[y][x] = dx > 6 ? 'S' : dx < -5 && y < 20 ? 'l' : 's'
    }
  }
  for (const [x, y] of [[13, 21], [13, 22], [34, 21], [34, 22], [35, 22]]) set(x, y, 'S')

  // gola da camiseta
  for (let x = 17; x <= 30; x++) if (G[36][x] !== '.') G[36][x] = 'n'
  for (let x = 18; x <= 29; x++) if (Math.abs(x + 0.5 - CX) > 4) G[35][x] = 'n'

  // cabelo
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = x + 0.5 - CX
      const inHair =
        inEllipse(x, y, CX + 0.5, 15.5, 11.6, 10.4) &&
        (y <= 12 || (y <= 15 && Math.abs(dx) > 7.5) || (y <= 19 && Math.abs(dx) > 9.2))
      if (inHair) G[y][x] = dx < -2 && dx > -8 && y >= 4 && y <= 8 ? 'j' : dx > 6 || y >= 15 ? 'H' : 'h'
    }
  }
  // franja de lado
  for (let x = 13; x <= 22; x++) {
    const yy = 13 + Math.floor((x - 13) * 0.35)
    for (let y = 12; y <= yy; y++) set(x, y, y === yy ? 'H' : 'h')
  }
  for (let x = 23; x <= 33; x++) set(x, 13, 'h')
  for (const [x, y] of [[24, 14], [28, 14], [29, 14], [32, 14], [33, 14], [33, 15]]) set(x, y, 'H')

  // sobrancelhas
  for (const x of [16, 17, 18, 19, 20]) set(x, 17, 'H')
  set(21, 17, 'h'); set(16, 16, 'h'); set(17, 16, 'H')
  for (const x of [27, 28, 29, 30, 31]) set(x, 17, 'H')
  set(26, 17, 'h'); set(31, 16, 'h'); set(30, 16, 'H')

  // olhos
  const eye = (a: number, iris: number) => {
    for (let x = a; x < a + 5; x++) { set(x, 19, 'k'); set(x, 20, 'w'); set(x, 21, 'w') }
    set(a - 1, 20, 'k'); set(a + 5, 20, 'S')
    for (const [x, y] of [[iris, 20], [iris + 1, 20], [iris, 21], [iris + 1, 21]]) set(x, y, 'i')
    set(iris + 1, 21, 'e'); set(iris, 20, 'W')
    for (let x = a; x < a + 5; x++) set(x, 22, 'S')
  }
  eye(17, 19)
  eye(26, 27)

  // nariz e bochechas
  set(23, 23, 's'); set(24, 24, 'S'); set(25, 25, 'S'); set(24, 25, 'S'); set(22, 25, 'S'); set(23, 26, 'S'); set(24, 26, 'S'); set(25, 26, 'S')
  for (const [x, y] of [[17, 24], [18, 24], [29, 24], [30, 24]]) set(x, y, 'p')

  // barba rala
  for (let y = 22; y <= 33; y++) {
    for (let x = 0; x < N; x++) {
      const dx = x + 0.5 - CX
      if (!'sSl'.includes(G[y][x]) || !isHead(x, y)) continue
      const jaw = y >= 29 || Math.abs(dx) > 8.2 || (y >= 27 && Math.abs(dx) > 5)
      if (jaw) G[y][x] = (x * 3 + y * 5) % 4 === 0 ? 's' : (x + y) % 2 ? 'd' : 'D'
    }
  }
  for (let x = 20; x <= 28; x++) set(x, 27, (x + 27) % 2 ? 'd' : 'D')

  // boca
  for (let x = 21; x <= 27; x++) set(x, 28, 'r')
  set(20, 27, 'r'); set(28, 27, 'r')
  for (let x = 21; x <= 27; x++) set(x, 29, 't')
  for (let x = 22; x <= 26; x++) set(x, 30, 'r')
  for (let x = 23; x <= 25; x++) set(x, 30, 'q')

  // listras brancas da camiseta e o detalhe amarelo
  for (const [x, y] of [[12, 44], [13, 43], [14, 42], [15, 41], [16, 40], [13, 45], [14, 44], [15, 43], [39, 41], [40, 42], [41, 43], [38, 43], [39, 44]]) {
    if (G[y][x] && 'bB'.includes(G[y][x])) set(x, y, 'w')
  }
  const patch: Array<[number, number, string]> = [
    [17, 40, 'w'], [18, 40, 'w'], [19, 40, 'w'], [20, 40, 'w'], [17, 41, 'w'], [18, 42, 'w'], [19, 42, 'w'], [20, 42, 'w'],
    [17, 43, 'y'], [18, 43, 'y'], [19, 43, 'y'], [20, 43, 'y'], [21, 43, 'y'],
  ]
  for (const [x, y, c] of patch) set(x, y, c)

  // contorno de 1px em volta de tudo
  const O = G.map((r) => r.slice())
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (G[y][x] !== '.') continue
      const touches = [[0, 1], [1, 0], [0, -1], [-1, 0]].some(([a, b]) => G[y + a]?.[x + b] && G[y + a][x + b] !== '.')
      if (touches) O[y][x] = 'k'
    }
  }
  return O.map((r) => r.join(''))
}

export const PAL: Record<string, string> = {
  k: '#0E0B0A', h: '#5E3C26', H: '#3C2618', j: '#82593A', s: '#EEC5A4', S: '#CC9A7A', l: '#F8DAC0',
  w: '#F4F4F7', W: '#FFFFFF', i: '#6A4428', e: '#1A1210', r: '#6E3330', t: '#F4F4F7', q: '#C8645A',
  d: '#A47C60', D: '#8C664C', p: '#EFA592', b: '#2F7FD0', B: '#2163A8', n: '#4C97E2', y: '#F2D23A',
}

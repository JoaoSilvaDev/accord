export const HEX_SIZE = 38 // circumradius (center to vertex)

export const HEX_WIDTH = HEX_SIZE * 2
export const HEX_HEIGHT = Math.sqrt(3) * HEX_SIZE
export const COL_SPACING = HEX_SIZE * 1.5
export const ROW_SPACING = HEX_HEIGHT

// Pixel center of hex at (col, row) — flat-top, even-q offset
export function hexCenter(col: number, row: number): { x: number; y: number } {
  const x = col * COL_SPACING + HEX_SIZE
  const y = row * ROW_SPACING + (col % 2 === 1 ? ROW_SPACING / 2 : 0) + HEX_HEIGHT / 2
  return { x, y }
}

// Flat array of vertex coords for a flat-top hex centered at (cx, cy)
export function hexVertices(cx: number, cy: number, size: number): number[] {
  const pts: number[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    pts.push(cx + size * Math.cos(angle), cy + size * Math.sin(angle))
  }
  return pts
}

// Total pixel dimensions of a map
export function mapPixelSize(cols: number, rows: number) {
  const width = (cols - 1) * COL_SPACING + HEX_WIDTH
  const height = (rows - 1) * ROW_SPACING + HEX_HEIGHT + ROW_SPACING / 2
  return { width, height }
}

// Geometric hex distance (for missile range checks) — axial coords
export function hexDistance(col1: number, row1: number, col2: number, row2: number): number {
  // Convert even-q offset to axial
  const toAxial = (col: number, row: number) => ({
    q: col,
    r: row - (col - (col & 1)) / 2,
  })
  const a = toAxial(col1, row1)
  const b = toAxial(col2, row2)
  return Math.max(
    Math.abs(a.q - b.q),
    Math.abs(a.r - b.r),
    Math.abs(a.q + a.r - b.q - b.r),
  )
}

// Adjacent passable neighbors of (col, row) given tile grid
export function hexNeighbors(
  col: number,
  row: number,
  tiles: number[][],
): { col: number; row: number }[] {
  const isOdd = col % 2 === 1
  const dirs = isOdd
    ? [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, 1], [0, -1]]
    : [[-1, -1], [-1, 0], [0, 1], [1, -1], [1, 0], [0, -1]]

  return dirs
    .map(([dc, dr]) => ({ col: col + (dc ?? 0), row: row + (dr ?? 0) }))
    .filter(({ col: c, row: r }) => {
      const rowData = tiles[r]
      if (!rowData) return false
      const tile = rowData[c]
      return tile !== undefined && tile !== 0
    })
}

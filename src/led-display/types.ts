export interface LedConfig {
  colorActive: string
  colorInactive: string
  colorBackground: string
  dotSize: number
  dotGap: number
  digitGap: number
  animation: boolean
}

export interface LedDisplayOptions {
  container: HTMLElement
  value?: number | string
  digitCount?: number
  config?: Partial<LedConfig>
}

export interface LedDisplayHandle {
  setValue: (value: number | string) => void
  getValue: () => string
  destroy: () => void
}

const DOT_MATRIX_5X7: Record<string, number[]> = {
  '0': [0x3E, 0x51, 0x49, 0x45, 0x3E],
  '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46],
  '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7F, 0x10],
  '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3C, 0x4A, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36],
  '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
  ' ': [0x00, 0x00, 0x00, 0x00, 0x00]
}

export function getDotMatrix(char: string): boolean[][] {
  const pattern = DOT_MATRIX_5X7[char] || DOT_MATRIX_5X7[' ']
  const matrix: boolean[][] = []
  for (let row = 0; row < 7; row++) {
    const rowData: boolean[] = []
    for (let col = 0; col < 5; col++) {
      rowData.push(!!(pattern[col] & (1 << row)))
    }
    matrix.push(rowData)
  }
  return matrix
}

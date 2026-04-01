export interface LedConfig {
  colorActive: string
  colorInactive: string
  colorBackground: string
  segmentGap: number
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

export const SEGMENT_MAP: Record<string, boolean[]> = {
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
  ' ': [false, false, false, false, false, false, false]
}

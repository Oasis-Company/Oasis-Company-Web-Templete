import { LedConfig } from '../led-display/types'

export const defaultLedConfig: LedConfig = {
  colorActive: '#00E5FF',
  colorInactive: '#0f1a2a',
  colorBackground: '#0a1929',
  dotSize: 12,
  dotGap: 4,
  digitGap: 20,
  animation: true
}

export type LedConfigType = typeof defaultLedConfig

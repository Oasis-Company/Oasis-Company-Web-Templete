import { LedConfig } from '../led-display/types'

export const defaultLedConfig: LedConfig = {
  colorActive: '#00FF00',
  colorInactive: '#333333',
  colorBackground: '#0B0B0D',
  segmentGap: 2,
  digitGap: 8,
  animation: false
}

export type LedConfigType = typeof defaultLedConfig

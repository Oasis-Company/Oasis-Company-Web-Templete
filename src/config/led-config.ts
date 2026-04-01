import { LedConfig } from '../led-display/types'

export const defaultLedConfig: LedConfig = {
  colorActive: '#00FF00',
  colorInactive: '#222222',
  colorBackground: '#0B0B0D',
  dotSize: 6,
  dotGap: 2,
  digitGap: 12,
  animation: false
}

export type LedConfigType = typeof defaultLedConfig

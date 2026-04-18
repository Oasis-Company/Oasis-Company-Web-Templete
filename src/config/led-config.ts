import { LedConfig } from '../led-display/types'

export const defaultLedConfig: LedConfig = {
  colorActive: '#00FF00',
  colorInactive: '#333333',
  colorBackground: 'transparent',
  dotSize: 10,
  dotGap: 2,
  digitGap: 12,
  animation: false
}

export type LedConfigType = typeof defaultLedConfig

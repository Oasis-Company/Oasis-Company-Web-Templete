import { LedConfig } from '../led-display/types'

export const defaultLedConfig: LedConfig = {
  colorActive: '#00FF66',
  colorInactive: '#1a1a1a',
  colorBackground: '#050506',
  dotSize: 10,
  dotGap: 3,
  digitGap: 16,
  animation: false
}

export type LedConfigType = typeof defaultLedConfig

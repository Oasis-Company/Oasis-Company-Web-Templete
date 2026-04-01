import { playOasisBoot } from './core/boot'
import { initLedDisplay } from './led-display'

const bootContainer = document.getElementById('app')
if (bootContainer) {
  playOasisBoot({
    container: bootContainer,
    logoShape: 'circle',
    config: {
      particleBehavior: {
        chaosLevel: 'medium'
      },
      attractionStrength: 1.0,
      ignitionStyle: 'flicker',
      colorVariant: 'orange_default'
    }
  })
}

const footerContainer = document.getElementById('footer-led-container')
if (footerContainer) {
  initLedDisplay({
    container: footerContainer,
    value: 20211102,
    digitCount: 11,
    config: {
      colorActive: '#00FF00',
      colorInactive: '#333333'
    }
  })
}

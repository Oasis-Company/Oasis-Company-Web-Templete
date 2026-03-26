import { playOasisBoot } from './core/boot'

// 示例使用
const container = document.getElementById('app')
if (container) {
  playOasisBoot({
    container,
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

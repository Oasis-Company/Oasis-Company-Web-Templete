import { playOasisBoot } from '../../src/core/boot'

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app')
  const content = document.getElementById('content')

  if (container) {
    // 调用playOasisBoot函数
    const { stop } = playOasisBoot({
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

    // 动画结束后显示内容
    setTimeout(() => {
      if (content) {
        content.classList.add('visible')
      }
    }, 1800)
  }
})

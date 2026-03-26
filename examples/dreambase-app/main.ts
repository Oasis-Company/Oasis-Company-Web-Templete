import { playOasisBoot } from '../../src/core/boot'
import { dreambaseConfig } from '../../src/config/dreambase'

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app')
  const content = document.getElementById('content')

  if (container) {
    // 调用playOasisBoot函数，使用dreambase配置
    const { stop } = playOasisBoot({
      container,
      logoShape: 'square',
      config: dreambaseConfig
    })

    // 动画结束后显示内容
    setTimeout(() => {
      if (content) {
        content.classList.add('visible')
      }
    }, 1800)
  }
})

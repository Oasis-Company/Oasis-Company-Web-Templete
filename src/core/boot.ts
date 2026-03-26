import { ParticleSystem } from '../particles/particle-system'
import { AnimationTimeline } from './timeline'
import { defaultConfig } from '../config/default'
import { PerformanceDetector } from '../utils/performance'

interface OasisBootConfig {
  container: HTMLElement
  logoShape: 'circle' | 'square' | 'custom_svg'
  config?: Partial<typeof defaultConfig>
}

export function playOasisBoot({ container, logoShape, config = {} }: OasisBootConfig) {
  // 合并默认配置和用户配置（深度合并）
  const mergedConfig = {
    ...defaultConfig,
    ...config,
    particleBehavior: {
      ...defaultConfig.particleBehavior,
      ...(config.particleBehavior || {})
    }
  }

  // 检测设备性能并调整配置
  const performanceDetector = PerformanceDetector.getInstance()
  if (performanceDetector.shouldDegrade()) {
    mergedConfig.particleCount = performanceDetector.getRecommendedParticleCount()
    mergedConfig.fpsTarget = performanceDetector.getRecommendedFps()
  }

  // 创建粒子系统
  const particleSystem = new ParticleSystem(container, mergedConfig)

  // 创建动画时间轴
  const timeline = new AnimationTimeline(mergedConfig)

  // 执行动画
  timeline.execute(particleSystem, logoShape)

  return {
    particleSystem,
    timeline,
    stop: () => timeline.stop()
  }
}

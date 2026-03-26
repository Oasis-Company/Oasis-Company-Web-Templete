import { ParticleSystem } from '../particles/particle-system'

interface TimelineConfig {
  durationTotal: number
  fpsTarget: number
}

export class AnimationTimeline {
  private startTime: number | null = null
  private animationId: number | null = null
  private isRunning = false

  constructor(_config: TimelineConfig) {
    // Config is currently not used but kept for future extensions
  }

  execute(particleSystem: ParticleSystem, logoShape: string) {
    this.startTime = performance.now()
    this.isRunning = true
    this.animate(particleSystem, logoShape)
  }

  private animate(particleSystem: ParticleSystem, logoShape: string) {
    if (!this.startTime || !this.isRunning) return

    const currentTime = performance.now()
    const elapsed = (currentTime - this.startTime) / 1000

    // 计算当前动画阶段
    let phase: string
    if (elapsed < 0.3) {
      phase = 'idleSeed'
    } else if (elapsed < 0.7) {
      phase = 'ignition'
    } else if (elapsed < 1.2) {
      phase = 'attractionField'
    } else if (elapsed < 1.5) {
      phase = 'formation'
    } else if (elapsed < 1.8) {
      phase = 'stabilization'
    } else {
      this.stop()
      return
    }

    // 执行当前阶段的动画
    particleSystem.update(elapsed, phase, logoShape)

    // 继续动画循环
    this.animationId = requestAnimationFrame(() => {
      this.animate(particleSystem, logoShape)
    })
  }

  stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }
}

import { Particle } from './particle'
import { Config } from '../config/default'
import { easing } from '../utils/easing'

export class ParticleSystem {
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private offscreenCanvas: HTMLCanvasElement
  private offscreenCtx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private config: Config
  private centerX: number = 0
  private centerY: number = 0
  private startTime: number | null = null

  constructor(container: HTMLElement, config: Config) {
    this.container = container
    this.config = config

    // 创建canvas元素
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.container.appendChild(this.canvas)

    // 获取2D上下文
    this.ctx = this.canvas.getContext('2d')!

    // 创建离屏Canvas用于绘制模糊粒子
    this.offscreenCanvas = document.createElement('canvas')
    this.offscreenCtx = this.offscreenCanvas.getContext('2d')!

    // 设置canvas尺寸
    this.resize()

    // 监听窗口大小变化
    window.addEventListener('resize', () => this.resize())
  }

  private resize() {
    this.canvas.width = this.container.clientWidth
    this.canvas.height = this.container.clientHeight
    this.offscreenCanvas.width = this.container.clientWidth
    this.offscreenCanvas.height = this.container.clientHeight
    this.centerX = this.canvas.width / 2
    this.centerY = this.canvas.height / 2
  }

  private lastTime = 0
  private frameCount = 0

  update(elapsed: number, phase: string, logoShape: string) {
    if (!this.startTime) {
      this.startTime = elapsed
      this.lastTime = elapsed
    }

    const relativeTime = elapsed - this.startTime
    const deltaTime = elapsed - this.lastTime
    this.lastTime = elapsed

    // 控制帧率
    const targetFrameTime = 1000 / this.config.fpsTarget
    if (deltaTime < targetFrameTime) {
      return
    }

    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 根据阶段执行不同的逻辑
    switch (phase) {
      case 'idleSeed':
        this.handleIdleSeed(relativeTime)
        break
      case 'ignition':
        this.handleIgnition(relativeTime)
        break
      case 'attractionField':
        this.handleAttractionField(relativeTime)
        break
      case 'formation':
        this.handleFormation(relativeTime, logoShape)
        break
      case 'stabilization':
        this.handleStabilization(relativeTime)
        break
    }

    // 更新和绘制粒子
    this.updateParticles(deltaTime / 1000)
    this.drawParticles()

    // 计算帧率（仅用于调试）
    this.frameCount++
    if (elapsed - this.startTime > 1000) {
      // 可以在这里添加帧率日志
      // console.log(`FPS: ${this.frameCount}`)
      this.frameCount = 0
      this.startTime = elapsed
    }
  }

  private handleIdleSeed(time: number) {
    // Idle Seed阶段：微弱的噪声
    if (time < 0.3) {
      const progress = time / 0.3
      const opacity = progress * 0.1

      // 创建少量粒子
      if (this.particles.length < 5) {
        this.createParticle(this.centerX, this.centerY, opacity)
      }

      // 应用微弱的噪声
      this.particles.forEach(particle => {
        const noise = this.noise(particle.seed + time * 10, 0, time * 10)
        particle.x += noise * 0.5
        particle.y += noise * 0.5
      })
    }
  }

  private handleIgnition(time: number) {
    // Ignition阶段：中心粒子膨胀，生成新粒子
    if (time >= 0.3 && time < 0.7) {
      const progress = (time - 0.3) / 0.4
      const ignitionProgress = easing.ignition(progress)

      // 确保有一个中心粒子
      if (this.particles.length === 0) {
        this.createParticle(this.centerX, this.centerY, 1)
      }

      // 中心粒子的缩放和抖动
      const centerParticle = this.particles[0]
      if (centerParticle) {
        const scale = 0.2 + (1.2 - 0.2) * ignitionProgress
        centerParticle.size = 2 * scale
        centerParticle.opacity = ignitionProgress

        // 添加抖动
        const jitter = this.noise(centerParticle.seed + time * 20, 0, time * 20) * 2
        centerParticle.x = this.centerX + jitter
        centerParticle.y = this.centerY + jitter
      }

      // 生成新粒子
      if (progress > 0.2 && this.particles.length < 15) {
        const angle = Math.random() * Math.PI * 2
        const radius = 20 * ignitionProgress
        const x = this.centerX + Math.cos(angle) * radius
        const y = this.centerY + Math.sin(angle) * radius
        this.createParticle(x, y, 1)
      }
    }
  }

  private handleAttractionField(time: number) {
    // Attraction Field阶段：粒子聚合
    if (time >= 0.7 && time < 1.2) {
      const progress = (time - 0.7) / 0.5

      // 生成更多粒子
      if (this.particles.length < this.config.particleCount) {
        const angle = Math.random() * Math.PI * 2
        const radius = 150 * (1 - progress)
        const x = this.centerX + Math.cos(angle) * radius
        const y = this.centerY + Math.sin(angle) * radius
        this.createParticle(x, y, 1)
      }

      // 应用吸引力
      this.particles.forEach(particle => {
        const dx = this.centerX - particle.x
        const dy = this.centerY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 1) {
          const force = (distance / 150) * this.config.attractionStrength * 0.1
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        // 添加噪声
        const noise = this.noise(particle.seed + time * 5, 0, time * 5) * 0.5
        particle.vx += noise
        particle.vy += noise

        // 限制速度
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > 5) {
          particle.vx = (particle.vx / speed) * 5
          particle.vy = (particle.vy / speed) * 5
        }
      })
    }
  }

  private handleFormation(time: number, logoShape: string) {
    // Formation阶段：粒子形成目标形状
    if (time >= 1.2 && time < 1.5) {
      const progress = (time - 1.2) / 0.3

      // 计算目标位置
      const targetPositions = this.getTargetPositions(logoShape, this.particles.length)

      // 粒子吸附到目标位置
      this.particles.forEach((particle, index) => {
        const target = targetPositions[index % targetPositions.length]
        const dx = target.x - particle.x
        const dy = target.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 1) {
          const force = (1 - progress) * 0.2
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }
      })

      // 闪光效果
      if (progress > 0.5 && progress < 0.7) {
        const flashProgress = (progress - 0.5) / 0.2
        this.particles.forEach(particle => {
          particle.opacity = 1 + flashProgress * 0.2
        })
      }
    }
  }

  private handleStabilization(time: number) {
    // Stabilization阶段：粒子消失，显示logo
    if (time >= 1.5 && time < 1.8) {
      const progress = (time - 1.5) / 0.3

      // 粒子透明度降低
      this.particles.forEach(particle => {
        particle.opacity = 1 - progress
      })

      // 绘制logo
      this.drawLogo(progress)
    }
  }

  private createParticle(x: number, y: number, opacity: number) {
    const particle = new Particle(x, y, this.config)
    particle.opacity = opacity
    this.particles.push(particle)
  }

  private updateParticles(deltaTime: number) {
    // 更新粒子
    this.particles.forEach(particle => {
      particle.update(deltaTime)
    })

    // 移除死亡的粒子
    this.particles = this.particles.filter(particle => particle.isAlive())
  }

  private drawParticles() {
    // 使用离屏Canvas绘制模糊粒子（glow）
    this.offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height)
    this.offscreenCtx.save()
    this.offscreenCtx.filter = `blur(${this.config.particleBlur}px)`
    this.particles.forEach(particle => {
      this.offscreenCtx.beginPath()
      this.offscreenCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.offscreenCtx.fillStyle = particle.color
      this.offscreenCtx.globalAlpha = particle.opacity * 0.5
      this.offscreenCtx.fill()
    })
    this.offscreenCtx.restore()

    // 将离屏Canvas的内容绘制到主Canvas
    this.ctx.drawImage(this.offscreenCanvas, 0, 0)

    // 绘制清晰粒子
    this.particles.forEach(particle => {
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = particle.color
      this.ctx.globalAlpha = particle.opacity
      this.ctx.fill()
    })
  }

  private drawLogo(progress: number) {
    // 绘制简单的logo
    this.ctx.save()
    this.ctx.globalAlpha = progress
    this.ctx.fillStyle = this.config.colorPrimary
    this.ctx.font = '48px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('OASIS', this.centerX, this.centerY)
    this.ctx.restore()
  }

  private getTargetPositions(shape: string, count: number): { x: number, y: number }[] {
    const positions: { x: number, y: number }[] = []

    switch (shape) {
      case 'circle':
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2
          const radius = 80
          positions.push({
            x: this.centerX + Math.cos(angle) * radius,
            y: this.centerY + Math.sin(angle) * radius
          })
        }
        break
      case 'square':
        for (let i = 0; i < count; i++) {
          const side = Math.floor(i / (count / 4))
          const progress = (i % (count / 4)) / (count / 4)
          let x = this.centerX
          let y = this.centerY
          
          switch (side) {
            case 0: // 顶部
              x = this.centerX - 80 + progress * 160
              y = this.centerY - 80
              break
            case 1: // 右侧
              x = this.centerX + 80
              y = this.centerY - 80 + progress * 160
              break
            case 2: // 底部
              x = this.centerX + 80 - progress * 160
              y = this.centerY + 80
              break
            case 3: // 左侧
              x = this.centerX - 80
              y = this.centerY + 80 - progress * 160
              break
          }
          positions.push({ x, y })
        }
        break
      default:
        // 默认圆形
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2
          const radius = 80
          positions.push({
            x: this.centerX + Math.cos(angle) * radius,
            y: this.centerY + Math.sin(angle) * radius
          })
        }
    }

    return positions
  }

  // 简单的噪声函数
  private noise(x: number, y: number, z: number): number {
    // 简化的Perlin噪声实现
    // 实际项目中可以使用更复杂的噪声函数
    const intX = Math.floor(x)
    const intY = Math.floor(y)
    const intZ = Math.floor(z)

    // 简单的线性插值
    const value = Math.sin(intX + intY * 100 + intZ * 1000) * 0.5 + 0.5
    return (value - 0.5) * 2
  }

  // 清理资源
  dispose() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    window.removeEventListener('resize', () => this.resize())
  }
}

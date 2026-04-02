import { getDotMatrix } from './types'
import { LedConfig } from './types'

export class LedDigit {
  private element: HTMLElement
  private config: LedConfig
  private dots: HTMLElement[][] = []
  private animations: (() => void)[] = []

  constructor(config: LedConfig) {
    this.config = config
    this.element = this.createDigitElement()
  }

  private createDigitElement(): HTMLElement {
    const digit = document.createElement('div')
    digit.className = 'led-digit'
    digit.setAttribute('role', 'img')
    digit.style.display = 'flex'
    digit.style.flexDirection = 'column'
    digit.style.gap = this.config.dotGap + 'px'
    digit.style.padding = '8px'
    digit.style.background = 'linear-gradient(145deg, #0d2236, #081423)'
    digit.style.border = '1px solid #1a3a5a'
    digit.style.borderRadius = '8px'
    digit.style.boxShadow = 'inset 0 1px 3px rgba(0, 229, 255, 0.1)'

    for (let row = 0; row < 7; row++) {
      const rowEl = document.createElement('div')
      rowEl.className = 'led-row'
      rowEl.style.display = 'flex'
      rowEl.style.gap = this.config.dotGap + 'px'

      const rowDots: HTMLElement[] = []
      for (let col = 0; col < 5; col++) {
        const dot = document.createElement('div')
        dot.className = 'led-dot'
        dot.style.width = this.config.dotSize + 'px'
        dot.style.height = this.config.dotSize + 'px'
        dot.style.borderRadius = '6px'
        dot.style.backgroundColor = this.config.colorInactive
        dot.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        dot.style.position = 'relative'
        rowDots.push(dot)
        rowEl.appendChild(dot)
      }
      this.dots.push(rowDots)
      digit.appendChild(rowEl)
    }

    return digit
  }

  setChar(char: string): void {
    const matrix = getDotMatrix(char)

    this.animations.forEach(cancel => cancel())
    this.animations = []

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        const active = matrix[row][col]
        const dot = this.dots[row][col]
        if (active) {
          dot.style.backgroundColor = this.config.colorActive
          dot.style.boxShadow = '0 0 16px ' + this.config.colorActive + ', 0 0 32px ' + this.config.colorActive + '40, inset 0 0 8px ' + this.config.colorActive + '60'
          dot.style.transform = 'scale(1)'
          
          if (this.config.animation) {
            const animation = this.createBreathingAnimation(dot)
            this.animations.push(animation)
          }
        } else {
          dot.style.backgroundColor = this.config.colorInactive
          dot.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.6)'
          dot.style.transform = 'scale(1)'
        }
      }
    }

    this.element.setAttribute('aria-label', char === ' ' ? 'space' : char)
  }

  private createBreathingAnimation(dot: HTMLElement): () => void {
    let animationId: number
    let startTime = Date.now()
    let running = true

    const animate = () => {
      if (!running) return
      
      const elapsed = Date.now() - startTime
      const phase = (elapsed % 2000) / 2000
      const scale = 1 + Math.sin(phase * Math.PI * 2) * 0.1
      const opacity = 0.8 + Math.sin(phase * Math.PI * 2) * 0.1
      
      dot.style.transform = `scale(${scale})`
      dot.style.opacity = opacity.toString()
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      running = false
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      dot.style.transform = 'scale(1)'
      dot.style.opacity = '1'
    }
  }

  getElement(): HTMLElement {
    return this.element
  }

  destroy(): void {
    this.animations.forEach(cancel => cancel())
    this.element.remove()
  }
}

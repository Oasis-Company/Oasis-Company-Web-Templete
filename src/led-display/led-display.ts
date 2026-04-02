import { LedDigit } from './led-digit'
import { LedConfig, LedDisplayOptions, LedDisplayHandle } from './types'
import { defaultLedConfig } from '../config/led-config'

export class LedDisplay {
  private container: HTMLElement
  private config: LedConfig
  private digitCount: number
  private digits: LedDigit[] = []
  private currentValue: string = ''
  private wrapper: HTMLElement

  constructor(options: LedDisplayOptions) {
    this.container = options.container
    this.digitCount = options.digitCount || 11
    this.config = {
      ...defaultLedConfig,
      ...options.config
    }

    this.wrapper = this.createWrapper()
    this.createDigits()
    this.setValue(options.value || 20211102)
  }

  private createWrapper(): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'led-display'
    wrapper.setAttribute('role', 'status')
    wrapper.setAttribute('aria-label', 'World Domination Index')

    const style = document.createElement('style')
    style.textContent = `
      .led-display {
        display: inline-flex;
        align-items: center;
        gap: ${this.config.digitGap}px;
        padding: 20px 30px;
        background-color: ${this.config.colorBackground};
        border-radius: 12px;
        border: 2px solid #1a1a1a;
        box-shadow: 
          inset 0 2px 10px rgba(0, 0, 0, 0.8),
          0 4px 20px rgba(0, 0, 0, 0.5);
      }
    `
    wrapper.appendChild(style)
    this.container.appendChild(wrapper)

    return wrapper
  }

  private createDigits(): void {
    for (let i = 0; i < this.digitCount; i++) {
      const digit = new LedDigit(this.config)
      this.digits.push(digit)
      this.wrapper.appendChild(digit.getElement())
    }
  }

  setValue(value: number | string): void {
    const strValue = String(value).padStart(this.digitCount, ' ')
    const paddedValue = strValue.slice(-this.digitCount)
    this.currentValue = paddedValue

    paddedValue.split('').forEach((char, index) => {
      this.digits[index].setChar(char)
    })

    this.wrapper.setAttribute('aria-valuetext', paddedValue.trim())
  }

  getValue(): string {
    return this.currentValue.trim()
  }

  destroy(): void {
    this.digits.forEach(digit => digit.destroy())
    this.wrapper.remove()
  }
}

export function initLedDisplay(options: LedDisplayOptions): LedDisplayHandle {
  const display = new LedDisplay(options)

  return {
    setValue: (value: number | string) => display.setValue(value),
    getValue: () => display.getValue(),
    destroy: () => display.destroy()
  }
}

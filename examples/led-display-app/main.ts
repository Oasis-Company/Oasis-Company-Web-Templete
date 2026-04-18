import { initLedDisplay } from '../../src/led-display'

const DEFAULT_VALUE = 20211102

const mainContainer = document.getElementById('led-container')
const footerContainer = document.getElementById('footer-led-container')

if (!mainContainer || !footerContainer) {
  throw new Error('Container elements not found')
}

const mainDisplay = initLedDisplay({
  container: mainContainer,
  value: DEFAULT_VALUE,
  digitCount: 11,
  config: {
    colorActive: '#00FF00',
    colorInactive: '#333333'
  }
})

const footerDisplay = initLedDisplay({
  container: footerContainer,
  value: DEFAULT_VALUE,
  digitCount: 11,
  config: {
    colorActive: '#00CC00',
    colorInactive: '#2A2A2A'
  }
})

const incrementBtn = document.getElementById('increment-btn')
const resetBtn = document.getElementById('reset-btn')
const randomBtn = document.getElementById('random-btn')

if (incrementBtn) {
  incrementBtn.addEventListener('click', () => {
    const current = parseInt(mainDisplay.getValue()) || 0
    const next = current + 1
    mainDisplay.setValue(next)
    footerDisplay.setValue(next)
  })
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    mainDisplay.setValue(DEFAULT_VALUE)
    footerDisplay.setValue(DEFAULT_VALUE)
  })
}

if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    const random = Math.floor(Math.random() * 10000000000)
    mainDisplay.setValue(random)
    footerDisplay.setValue(random)
  })
}

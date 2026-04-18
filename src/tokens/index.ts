// Design tokens for Oasis Company

export const colors = {
  // Primary colors
  primary: {
    orange: '#FF6A00',
    amber: '#FFD166',
    deepOrange: '#FFB347'
  },
  
  // Neutral colors
  neutral: {
    black: '#0B0B0D',
    darkGray: '#222222',
    mediumGray: '#666666',
    lightGray: '#888888',
    white: '#FFFFFF'
  },
  
  // Semantic colors
  semantic: {
    success: '#06D6A0',
    warning: '#FFD166',
    error: '#EF476F',
    info: '#118AB2'
  }
};

export const typography = {
  fontFamily: {
    primary: "'Inter', 'Microsoft YaHei', 'Source Han Sans CN', 'SimHei', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem' // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75
  }
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem'     // 96px
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
};

export const transitions = {
  default: 'all 0.3s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.5s ease'
};

export default {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  transitions
};

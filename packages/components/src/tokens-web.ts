// Web-safe design tokens (no React Native dependencies)

export const Colors = {
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F',
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },
  neutral: {
    gray50: '#f9fafb',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

export const Typography = {
  fontFamily: {
    // Main Degular fonts with Adobe Fonts naming
    thin: 'degular, sans-serif',
    light: 'degular, sans-serif', 
    regular: 'degular, sans-serif',
    medium: 'degular, sans-serif',
    semibold: 'degular, sans-serif',
    bold: 'degular, sans-serif',
    black: 'degular, sans-serif',
    
    // Italic variants
    thinItalic: 'degular, sans-serif',
    lightItalic: 'degular, sans-serif',
    italic: 'degular, sans-serif', 
    mediumItalic: 'degular, sans-serif',
    semiboldItalic: 'degular, sans-serif',
    boldItalic: 'degular, sans-serif',
    blackItalic: 'degular, sans-serif',
    
    // Mono fonts with Adobe Fonts naming
    monoThin: 'degular-mono, monospace',
    monoLight: 'degular-mono, monospace',
    mono: 'degular-mono, monospace', // Current setting for data labels
    monoMedium: 'degular-mono, monospace',
    monoSemibold: 'degular-mono, monospace',
    monoBold: 'degular-mono, monospace',
    monoBlack: 'degular-mono, monospace',
    
    // Legacy compatibility
    primary: 'degular, sans-serif',
    heading: 'degular, sans-serif',
    body: 'degular, sans-serif',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

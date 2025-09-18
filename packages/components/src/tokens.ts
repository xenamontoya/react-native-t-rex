/**
 * 🎨 PROJECT T-REX DESIGN TOKENS
 * 
 * These are your brand colors, spacing, typography rules.
 * Think of this as your design system's foundation!
 */

export const Colors = {
  // 🖤 Primary Colors - Your main brand colors
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  
  // 🧡 Secondary Colors - Accent and highlight colors  
  secondary: {
    orange1: '#F6A345',    // Light orange
    orange2: '#F3781F',    // Medium orange  
    orange3: '#FE652A',    // Vibrant orange
    electricBlue: '#00FFF2', // Electric blue for callouts
  },
  
  // 🎯 Tertiary Colors - Supporting colors
  tertiary: {
    beige: '#E1D3C1',      // Confirmed badges
    denimBlue: '#5177BB',  // Buttons and hyperlinks
  },
  
  // ⚫ Neutral Colors - Grays for text and backgrounds
  neutral: {
    gray50: '#f9fafb',     // Light background
    gray200: '#e5e7eb',    // Borders
    gray500: '#6b7280',    // Secondary text
    gray600: '#4b5563',    // Primary text
  },
};

export const Spacing = {
  xs: 4,
  sm: 8, 
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Typography = {
  fontFamily: {
    primary: 'Degular',        // Your main font
    mono: 'Degular Mono',      // For ALL CAPS usage
  },
  
  weights: {
    regular: '400',
    medium: '500', 
    semiBold: '600',
    bold: '700',
    black: '900',
    // Note: Avoid thin weights per your preferences
  },
  
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
  },
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

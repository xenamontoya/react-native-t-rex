/**
 * Project T-Rex Design System - Typography
 * Converted from original web app Degular font system
 */

export const Typography = {
  // Font Families (matching original Degular setup)
  fontFamily: {
    // Degular (primary font)
    regular: 'Degular-Regular',
    medium: 'Degular-Medium',
    semibold: 'Degular-Semibold',
    bold: 'Degular-Bold',
    black: 'Degular-Black',
    
    // Degular Mono (for specific use cases)
    mono: 'DegularMono-Regular',
    monoMedium: 'DegularMono-Medium',
    monoSemibold: 'DegularMono-Semibold',
    monoBold: 'DegularMono-Bold',
    
    // Fallbacks
    sans: 'system',
    system: 'System',
  },

  // Font Sizes (converted from Tailwind scale)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Font Weights (mapped to Degular variants)
  fontWeight: {
    normal: '400',     // Regular
    medium: '500',     // Medium  
    semibold: '600',   // Semibold
    bold: '700',       // Bold
    black: '900',      // Black
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },

  // Text Styles (common combinations)
  textStyles: {
    // Headers
    h1: {
      fontSize: 24,
      fontFamily: 'Degular-Bold',
      lineHeight: 1.25,
    },
    h2: {
      fontSize: 20,
      fontFamily: 'Degular-Semibold',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 18,
      fontFamily: 'Degular-Medium',
      lineHeight: 1.35,
    },
    h4: {
      fontSize: 16,
      fontFamily: 'Degular-Medium',
      lineHeight: 1.4,
    },

    // Body Text
    body: {
      fontSize: 16,
      fontFamily: 'Degular-Regular',
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: 'Degular-Regular',
      lineHeight: 1.5,
    },

    // UI Text
    button: {
      fontSize: 16,
      fontFamily: 'Degular-Semibold',
      lineHeight: 1.2,
    },
    buttonSmall: {
      fontSize: 14,
      fontFamily: 'Degular-Medium',
      lineHeight: 1.2,
    },
    caption: {
      fontSize: 12,
      fontFamily: 'Degular-Regular',
      lineHeight: 1.4,
    },
    label: {
      fontSize: 14,
      fontFamily: 'Degular-Medium',
      lineHeight: 1.4,
    },

    // Mono (for data/metrics)
    mono: {
      fontSize: 14,
      fontFamily: 'DegularMono-Regular',
      lineHeight: 1.4,
    },
    monoSmall: {
      fontSize: 12,
      fontFamily: 'DegularMono-Regular',
      lineHeight: 1.4,
    },
  },
} as const;

export default Typography;

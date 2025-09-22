/**
 * Project T-Rex Design System - Spacing
 * Converted from original web app Tailwind spacing scale
 */

export const Spacing = {
  // Base spacing scale (in pixels for React Native)
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem  
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  7: 28,   // 1.75rem
  8: 32,   // 2rem
  9: 36,   // 2.25rem
  10: 40,  // 2.5rem
  11: 44,  // 2.75rem
  12: 48,  // 3rem
  14: 56,  // 3.5rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
  28: 112, // 7rem
  32: 128, // 8rem
  36: 144, // 9rem
  40: 160, // 10rem
  44: 176, // 11rem
  48: 192, // 12rem
  52: 208, // 13rem
  56: 224, // 14rem
  60: 240, // 15rem
  64: 256, // 16rem
  72: 288, // 18rem
  80: 320, // 20rem
  96: 384, // 24rem

  // Common semantic spacings
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,

  // Component-specific spacings
  card: {
    padding: 16,
    paddingLarge: 24,
    margin: 16,
    gap: 12,
  },
  
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingSmall: 8,
    paddingLarge: 20,
  },

  input: {
    padding: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  screen: {
    padding: 16,
    paddingLarge: 24,
    marginBottom: 100, // For mobile bottom nav
  },

  header: {
    height: 60,
    padding: 16,
  },

  tab: {
    height: 48,
    padding: 12,
  },
} as const;

export default Spacing;

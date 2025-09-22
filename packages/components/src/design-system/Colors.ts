/**
 * Project T-Rex Design System - Colors
 * Converted from original web app Tailwind config and CSS
 */

export const Colors = {
  // Primary Colors
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },

  // Secondary Colors  
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F', 
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },

  // Tertiary Colors
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },

  // Neutral Gray Scale
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },

  // Accent Colors
  accent: {
    purple: '#8b5cf6',
    green: '#10b981',
    success: '#10b981', // alias for green
    red: '#ef4444',
    yellow: '#f59e0b',
  },

  // Status Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Dark Mode Colors
  dark: {
    bg: '#1a1a1a',
    bgCard: '#2a2a2a',
    bgLighter: '#333333',
    border: '#404040',
    text: '#ffffff',
    textMuted: '#a0a0a0',
    textAccent: '#00FFF2',
  },

  // Custom Brand Colors (from original CSS)
  brand: {
    blueAzure: '#007bff',
    blueKodama: '#e6f3ff',
    blueScience: '#0056b3',
    yellowBumblebee: '#FFCE2B',
    yellowSunglow: '#FFECAB',
    yellowBuddha: '#9B7700',
    greyWhite: '#ffffff',
  },

  // Transparent utilities
  transparent: 'transparent',
  
  // Opacity variants
  opacity: {
    10: 'rgba(0, 0, 0, 0.1)',
    20: 'rgba(0, 0, 0, 0.2)',
    30: 'rgba(0, 0, 0, 0.3)',
    40: 'rgba(0, 0, 0, 0.4)',
    50: 'rgba(0, 0, 0, 0.5)',
    60: 'rgba(0, 0, 0, 0.6)',
    70: 'rgba(0, 0, 0, 0.7)',
    80: 'rgba(0, 0, 0, 0.8)',
    90: 'rgba(0, 0, 0, 0.9)',
  },
} as const;

// Color helper functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

// Status badge colors
export const StatusColors = {
  scheduled: {
    background: 'rgba(246, 163, 69, 0.15)',
    text: '#C44510',
  },
  confirmed: {
    background: '#F8F3E8',
    text: '#6B5B4F',
  },
  complete: {
    background: 'rgba(0, 255, 242, 0.15)',
    text: '#004D47',
  },
  pending: {
    background: '#e5e7eb', // Colors.neutral.gray200 resolved
    text: '#4b5563', // Colors.neutral.gray600 resolved
  },
  cancelled: {
    background: 'rgba(239, 68, 68, 0.15)',
    text: '#dc2626',
  },
  'in-progress': {
    background: 'rgba(246, 163, 69, 0.15)',
    text: '#C44510',
  },
} as const;

export default Colors;

/**
 * Project T-Rex Design System - Typography Utilities
 * Helper functions for consistent typography application
 */

import { Typography } from './Typography';
import { TextStyle } from 'react-native';

/**
 * Apply typography styles with optional overrides
 * 
 * @param styleName - Name of the typography style from Typography.textStyles
 * @param overrides - Optional style overrides
 * @returns Combined text style object
 * 
 * @example
 * // Use a predefined style
 * <Text style={applyTextStyle('h1')}>Title</Text>
 * 
 * // Use with color override
 * <Text style={applyTextStyle('body', { color: '#333' })}>Content</Text>
 * 
 * // Use with multiple overrides
 * <Text style={applyTextStyle('cardTitle', { color: Colors.primary.white, textAlign: 'center' })}>
 *   Centered White Title
 * </Text>
 */
export const applyTextStyle = (
  styleName: keyof typeof Typography.textStyles,
  overrides?: Partial<TextStyle>
): TextStyle => {
  const baseStyle = Typography.textStyles[styleName];
  return overrides ? { ...baseStyle, ...overrides } : baseStyle;
};

/**
 * Get font size from Typography scale
 * 
 * @param size - Size key from Typography.fontSize
 * @returns Font size number
 * 
 * @example
 * fontSize: getFontSize('lg') // returns 18
 */
export const getFontSize = (size: keyof typeof Typography.fontSize): number => {
  return Typography.fontSize[size];
};

/**
 * Get font family from Typography
 * 
 * @param family - Family key from Typography.fontFamily
 * @returns Font family string
 * 
 * @example
 * fontFamily: getFontFamily('semibold') // returns 'Degular-Semibold'
 */
export const getFontFamily = (family: keyof typeof Typography.fontFamily): string => {
  return Typography.fontFamily[family];
};

/**
 * Get line height from Typography scale
 * 
 * @param height - Height key from Typography.lineHeight
 * @returns Line height number
 * 
 * @example
 * lineHeight: getLineHeight('normal') // returns 1.5
 */
export const getLineHeight = (height: keyof typeof Typography.lineHeight): number => {
  return Typography.lineHeight[height];
};

/**
 * Common typography patterns for quick application
 */
export const TypographyPatterns = {
  // Headers
  pageTitle: applyTextStyle('h1'),
  sectionTitle: applyTextStyle('h2'),
  cardTitle: applyTextStyle('cardTitle'),
  
  // Body content
  bodyText: applyTextStyle('body'),
  smallText: applyTextStyle('bodySmall'),
  description: applyTextStyle('cardDescription'),
  
  // UI elements
  buttonText: applyTextStyle('button'),
  labelText: applyTextStyle('label'),
  captionText: applyTextStyle('caption'),
  
  // Data display
  statNumber: applyTextStyle('statValue'),
  statLabel: applyTextStyle('statLabel'),
  metricValue: applyTextStyle('metric'),
  
  // Navigation
  menuItem: applyTextStyle('navItem'),
  
  // Forms
  inputText: applyTextStyle('input'),
  fieldLabel: applyTextStyle('inputLabel'),
} as const;

/**
 * Typography consistency checker (for development)
 * Helps identify hardcoded typography values that should use the design system
 */
export const TypographyAudit = {
  /**
   * Common hardcoded values that should be replaced
   */
  DEPRECATED_FONT_SIZES: [12, 14, 16, 18, 20, 24, 30, 36],
  DEPRECATED_FONT_WEIGHTS: ['400', '500', '600', '700', 'bold', 'normal'],
  DEPRECATED_FONT_FAMILIES: ['monospace', 'system', 'sans-serif'],
  
  /**
   * Suggested replacements for common hardcoded values
   */
  REPLACEMENT_MAP: {
    // Font sizes
    12: 'Typography.fontSize.xs or applyTextStyle("caption")',
    14: 'Typography.fontSize.sm or applyTextStyle("bodySmall")',
    16: 'Typography.fontSize.base or applyTextStyle("body")',
    18: 'Typography.fontSize.lg or applyTextStyle("cardTitle")',
    20: 'Typography.fontSize.xl or applyTextStyle("h2")',
    24: 'Typography.fontSize.2xl or applyTextStyle("h1")',
    
    // Font weights
    'bold': 'Typography.fontFamily.bold or applyTextStyle("h1")',
    '600': 'Typography.fontFamily.semibold or applyTextStyle("cardTitle")',
    '500': 'Typography.fontFamily.medium or applyTextStyle("label")',
    
    // Font families
    'monospace': 'Typography.fontFamily.mono or applyTextStyle("mono")',
  },
} as const;

export default {
  applyTextStyle,
  getFontSize,
  getFontFamily,
  getLineHeight,
  TypographyPatterns,
  TypographyAudit,
};

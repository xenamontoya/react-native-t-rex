/**
 * Button Component - Web Version for Storybook
 * Renders using HTML elements for browser compatibility
 */

import React from 'react';
import { Colors, Typography, Spacing } from '../design-system';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: React.CSSProperties;
  isDark?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  isDark = false,
}) => {
  const getButtonStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      border: 'none',
      borderRadius: 12,
      fontFamily: Typography.fontFamily.semibold,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      textDecoration: 'none',
      opacity: disabled ? 0.5 : 1,
    };

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      small: {
        padding: '8px 16px',
        fontSize: Typography.fontSize.sm,
        height: 32,
      },
      medium: {
        padding: '12px 24px',
        fontSize: Typography.fontSize.base,
        height: 44,
      },
      large: {
        padding: '16px 32px',
        fontSize: Typography.fontSize.lg,
        height: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: Colors.primary.black,
        color: Colors.primary.white,
      },
      secondary: {
        backgroundColor: Colors.primary.black,
        color: Colors.primary.white,
        border: `2px solid ${Colors.secondary.electricBlue}`,
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: Colors.tertiary.denimBlue,
        border: 'none',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <button
      style={{ ...getButtonStyles(), ...style }}
      onClick={onPress}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;

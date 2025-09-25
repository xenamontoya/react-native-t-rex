/**
 * Button Component - Web Version for Storybook
 * Renders using HTML elements for browser compatibility
 */

import React from 'react';
import { Colors, Typography, Spacing } from '../design-system';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'primaryBlue' | 'primaryGrey' | 'primaryRed' | 'icon';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
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
        border: `2px solid ${Colors.secondary.electricBlue}`,
      },
      secondary: {
        backgroundColor: Colors.neutral.gray100,
        color: Colors.neutral.gray700,
        border: `1px solid ${Colors.neutral.gray300}`,
      },
      tertiary: {
        backgroundColor: Colors.neutral.gray50,
        color: Colors.tertiary.denimBlue,
        border: `1px solid ${Colors.neutral.gray200}`,
      },
      primaryBlue: {
        backgroundColor: Colors.brand?.blueAzure || '#5177BB',
        color: Colors.primary.white,
        border: 'none',
      },
      primaryGrey: {
        backgroundColor: Colors.neutral.gray600,
        color: Colors.primary.white,
        border: 'none',
      },
      primaryRed: {
        backgroundColor: Colors.status?.error || '#ef4444',
        color: Colors.primary.white,
        border: 'none',
      },
      icon: {
        backgroundColor: 'transparent',
        color: Colors.neutral.gray600,
        padding: '8px',
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        border: 'none',
      },
    };

    const fullWidthStyle = fullWidth ? { width: '100%' } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...fullWidthStyle,
    };
  };

  return (
    <button
      style={{ ...getButtonStyles(), ...style }}
      onClick={onPress}
      disabled={disabled}
    >
      <span style={textStyle}>{children}</span>
    </button>
  );
};

export default Button;

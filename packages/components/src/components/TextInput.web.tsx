/**
 * TextInput Component - Web Version for Storybook
 * Renders using HTML elements for browser compatibility
 */

import React, { useState } from 'react';
import { Colors, Typography, Spacing } from '../design-system';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  variant?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  isDark?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  hint,
  required = false,
  variant = 'default',
  size = 'medium',
  style,
  inputStyle,
  labelStyle,
  isDark = false,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyles = (): React.CSSProperties => {
    return {
      width: '100%',
      fontFamily: Typography.fontFamily.regular,
    };
  };

  const getLabelStyles = (): React.CSSProperties => {
    return {
      display: 'block',
      marginBottom: Spacing.xs,
      fontFamily: Typography.fontFamily.medium,
      fontSize: Typography.fontSize.sm,
      color: isDark ? Colors.dark.text : Colors.neutral.gray700,
      ...labelStyle,
    };
  };

  const getInputStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: Typography.fontFamily.regular,
      border: `1px solid`,
      borderRadius: 8,
      paddingLeft: Spacing.input.paddingHorizontal,
      paddingRight: Spacing.input.paddingHorizontal,
      backgroundColor: isDark ? Colors.dark.bgLighter : Colors.primary.white,
      color: isDark ? Colors.dark.text : Colors.primary.black,
      outline: 'none',
      transition: 'all 0.2s ease',
    };

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      small: {
        fontSize: Typography.fontSize.sm,
        paddingTop: Spacing.xs,
        paddingBottom: Spacing.xs,
        height: 36,
      },
      medium: {
        fontSize: Typography.fontSize.base,
        paddingTop: Spacing.input.paddingVertical,
        paddingBottom: Spacing.input.paddingVertical,
        height: 48,
      },
      large: {
        fontSize: Typography.fontSize.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.md,
        height: 56,
      },
    };

    // Variant styles (border colors)
    const getBorderColor = (): string => {
      if (error || variant === 'error') {
        return Colors.status.error;
      }
      if (variant === 'success') {
        return Colors.status.success;
      }
      if (isFocused) {
        return Colors.secondary.electricBlue;
      }
      return isDark ? Colors.dark.border : Colors.neutral.gray300;
    };

    // Focus styles
    const focusStyle: React.CSSProperties = isFocused ? {
      borderWidth: 2,
      boxShadow: `0 0 0 1px ${Colors.secondary.electricBlue}33`,
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      borderColor: getBorderColor(),
      ...focusStyle,
      ...inputStyle,
    };
  };

  const getHintStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      marginTop: Spacing.xs,
    };

    if (error) {
      return {
        ...baseStyle,
        color: Colors.status.error,
      };
    }

    return {
      ...baseStyle,
      color: isDark ? Colors.dark.textMuted : Colors.neutral.gray500,
    };
  };

  return (
    <div style={{ ...getContainerStyles(), ...style }}>
      {/* Label */}
      <label style={getLabelStyles()}>
        {label}
        {required && (
          <span style={{ color: Colors.status.error }}> *</span>
        )}
      </label>

      {/* Input */}
      <input
        style={getInputStyles()}
        onFocus={(e) => {
          setIsFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          inputProps.onBlur?.(e);
        }}
        {...inputProps}
      />

      {/* Hint or Error */}
      {(hint || error) && (
        <div style={getHintStyles()}>
          {error || hint}
        </div>
      )}
    </div>
  );
};

export default TextInput;

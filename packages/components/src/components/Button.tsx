/**
 * Button Component - Converted from original project-t-rex
 * Supports all the original variants with React Native styling
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Spacing } from '../design-system';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'primaryBlue' | 'primaryGrey' | 'primaryRed' | 'icon';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onPress,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: Spacing.button.paddingSmall,
        paddingVertical: Spacing.button.paddingSmall,
        height: 36,
      },
      medium: {
        paddingHorizontal: Spacing.button.paddingHorizontal,
        paddingVertical: Spacing.button.paddingVertical,
        height: 48,
      },
      large: {
        paddingHorizontal: Spacing.button.paddingLarge,
        paddingVertical: Spacing.button.paddingVertical,
        height: 60, // 🔥 TEST: Made large buttons taller
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: Colors.primary.black,
        borderWidth: 2,
        borderColor: Colors.secondary.electricBlue,
      },
      secondary: {
        backgroundColor: Colors.neutral.gray100,
        borderWidth: 1,
        borderColor: Colors.neutral.gray300,
      },
      tertiary: {
        backgroundColor: Colors.neutral.gray50,
        borderWidth: 1,
        borderColor: Colors.neutral.gray200,
      },
      primaryBlue: {
        backgroundColor: Colors.brand.blueAzure,
        borderWidth: 0,
      },
      primaryGrey: {
        backgroundColor: Colors.neutral.gray600,
        borderWidth: 0,
      },
      primaryRed: {
        backgroundColor: Colors.status.error,
        borderWidth: 0,
      },
      icon: {
        backgroundColor: Colors.transparent,
        paddingHorizontal: 8,
        paddingVertical: 8,
        height: 40,
        width: 40,
        borderRadius: 20,
      },
    };

    // Disabled styles
    const disabledStyle: ViewStyle = disabled ? {
      opacity: 0.5,
    } : {};

    // Full width style
    const fullWidthStyle: ViewStyle = fullWidth ? {
      width: '100%',
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...disabledStyle,
      ...fullWidthStyle,
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontFamily: Typography.fontFamily.semibold,
      textAlign: 'center',
    };

    // Size text styles
    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: Typography.fontSize.sm,
      },
      medium: {
        fontSize: Typography.fontSize.base,
      },
      large: {
        fontSize: Typography.fontSize.lg,
      },
    };

    // Variant text styles
    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: Colors.primary.white,
      },
      secondary: {
        color: Colors.neutral.gray700,
      },
      tertiary: {
        color: Colors.tertiary.denimBlue,
      },
      primaryBlue: {
        color: Colors.primary.white,
      },
      primaryGrey: {
        color: Colors.primary.white,
      },
      primaryRed: {
        color: Colors.primary.white,
      },
      icon: {
        color: Colors.neutral.gray600,
      },
    };

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyles(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

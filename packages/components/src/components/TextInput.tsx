/**
 * TextInput Component - Converted from original project-t-rex Textfield
 * Form input component with label and validation states
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput as RNTextInput, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  TextInputProps as RNTextInputProps 
} from 'react-native';
import { Colors, Typography, Spacing } from '../design-system';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  variant?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
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
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyles = (): ViewStyle => {
    return {
      width: '100%',
    };
  };

  const getLabelStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      marginBottom: Spacing.xs,
      fontFamily: Typography.fontFamily.medium,
      fontSize: Typography.fontSize.sm,
    };

    const colorStyle: TextStyle = {
      color: isDark ? Colors.dark.text : Colors.neutral.gray700,
    };

    return {
      ...baseStyle,
      ...colorStyle,
    };
  };

  const getInputStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.regular,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: Spacing.input.paddingHorizontal,
      backgroundColor: isDark ? Colors.dark.bgLighter : Colors.primary.white,
      color: isDark ? Colors.dark.text : Colors.primary.black,
    };

    // Size styles
    const sizeStyles: Record<string, TextStyle> = {
      small: {
        fontSize: Typography.fontSize.sm,
        paddingVertical: Spacing.xs,
        height: 36,
      },
      medium: {
        fontSize: Typography.fontSize.base,
        paddingVertical: Spacing.input.paddingVertical,
        height: 48,
      },
      large: {
        fontSize: Typography.fontSize.lg,
        paddingVertical: Spacing.md,
        height: 56,
      },
    };

    // Variant styles (border colors)
    const variantStyles: Record<string, TextStyle> = {
      default: {
        borderColor: isFocused 
          ? Colors.secondary.electricBlue 
          : (isDark ? Colors.dark.border : Colors.neutral.gray300),
      },
      error: {
        borderColor: Colors.status.error,
      },
      success: {
        borderColor: Colors.status.success,
      },
    };

    // Focus styles
    const focusStyle: TextStyle = isFocused ? {
      borderWidth: 2,
      shadowColor: Colors.secondary.electricBlue,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[error ? 'error' : variant],
      ...focusStyle,
    };
  };

  const getHintStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
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

  const handleFocus = (e: any) => {
    setIsFocused(true);
    textInputProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    textInputProps.onBlur?.(e);
  };

  return (
    <View style={[getContainerStyles(), style]}>
      {/* Label */}
      <Text style={[getLabelStyles(), labelStyle]}>
        {label}
        {required && (
          <Text style={{ color: Colors.status.error }}> *</Text>
        )}
      </Text>

      {/* Input */}
      <RNTextInput
        style={[getInputStyles(), inputStyle]}
        placeholderTextColor={
          isDark ? Colors.dark.textMuted : Colors.neutral.gray500
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />

      {/* Hint or Error */}
      {(hint || error) && (
        <Text style={getHintStyles()}>
          {error || hint}
        </Text>
      )}
    </View>
  );
};

export default TextInput;

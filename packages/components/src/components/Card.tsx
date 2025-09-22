/**
 * Card Component - Converted from original project-t-rex
 * Base card component with consistent styling
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../design-system';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'electricBlue' | 'dark';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  isDark?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  isDark = false,
}) => {
  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 16,
    };

    // Padding styles
    const paddingStyles: Record<string, ViewStyle> = {
      none: {},
      small: { padding: Spacing.card.padding / 2 },
      medium: { padding: Spacing.card.padding },
      large: { padding: Spacing.card.paddingLarge },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: isDark ? Colors.dark.bgCard : Colors.primary.white,
        borderWidth: 1,
        borderColor: isDark ? Colors.dark.border : Colors.neutral.gray200,
      },
      elevated: {
        backgroundColor: isDark ? Colors.dark.bgCard : Colors.primary.white,
        shadowColor: Colors.primary.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      outlined: {
        backgroundColor: isDark ? Colors.dark.bgCard : Colors.primary.white,
        borderWidth: 2,
        borderColor: isDark ? Colors.dark.border : Colors.neutral.gray300,
      },
      electricBlue: {
        backgroundColor: isDark ? Colors.dark.bgCard : Colors.primary.white,
        borderWidth: 2,
        borderColor: Colors.secondary.electricBlue,
      },
      dark: {
        backgroundColor: Colors.primary.black,
        borderWidth: 2,
        borderColor: Colors.secondary.electricBlue,
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...variantStyles[variant],
    };
  };

  return (
    <View style={[getCardStyles(), style]}>
      {children}
    </View>
  );
};

export default Card;

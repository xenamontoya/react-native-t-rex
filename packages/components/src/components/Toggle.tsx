/**
 * Toggle Component - Converted from original project-t-rex
 * Switch component with smooth animations (dark mode toggle style)
 */

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Colors, Typography, Spacing } from '../design-system';

export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  trackStyle?: ViewStyle;
  thumbStyle?: ViewStyle;
  isDark?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  size = 'medium',
  style,
  labelStyle,
  trackStyle,
  thumbStyle,
  isDark = false,
}) => {
  const [animatedValue] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const getContainerStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      opacity: disabled ? 0.5 : 1,
    };

    return baseStyle;
  };

  const getTrackStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 999,
      justifyContent: 'center',
      position: 'relative',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        width: 40,
        height: 20,
      },
      medium: {
        width: 48,
        height: 24,
      },
      large: {
        width: 56,
        height: 28,
      },
    };

    // Track background color based on state
    const backgroundColor = value 
      ? Colors.secondary.electricBlue // #00FFF2 from original
      : (isDark ? Colors.dark.border : Colors.neutral.gray300);

    return {
      ...baseStyle,
      ...sizeStyles[size],
      backgroundColor,
    };
  };

  const getThumbStyles = (): ViewStyle => {
    const sizeStyles: Record<string, { size: number, margin: number }> = {
      small: { size: 16, margin: 2 },
      medium: { size: 20, margin: 2 },
      large: { size: 24, margin: 2 },
    };

    const { size: thumbSize, margin } = sizeStyles[size];
    const trackWidth = size === 'small' ? 40 : size === 'medium' ? 48 : 56;
    const maxTranslate = trackWidth - thumbSize - (margin * 2);

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [margin, margin + maxTranslate],
    });

    const baseStyle: ViewStyle = {
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: Colors.primary.white,
      position: 'absolute',
      shadowColor: Colors.primary.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    };

    return {
      ...baseStyle,
      transform: [{ translateX }],
    };
  };

  const getLabelStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.semibold,
      fontSize: Typography.fontSize.sm,
      color: isDark ? Colors.dark.text : Colors.primary.black,
      marginBottom: description ? Spacing.xs / 2 : 0,
    };

    return baseStyle;
  };

  const getDescriptionStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.xs,
      color: isDark ? Colors.dark.textMuted : Colors.neutral.gray500,
    };

    return baseStyle;
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <View style={[getContainerStyles(), style]}>
      {(label || description) && (
        <View style={{ marginBottom: Spacing.sm }}>
          {label && (
            <Text style={[getLabelStyles(), labelStyle]}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={getDescriptionStyles()}>
              {description}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[getTrackStyles(), trackStyle]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Animated.View style={[getThumbStyles(), thumbStyle]} />
      </TouchableOpacity>
    </View>
  );
};

export default Toggle;

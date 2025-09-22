/**
 * Checkbox Component - Converted from original project-t-rex
 * Form checkbox component with label and various states
 */

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Icon } from '../Icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  checkboxStyle?: ViewStyle;
  isDark?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  variant = 'default',
  style,
  labelStyle,
  checkboxStyle,
  isDark = false,
}) => {
  const getContainerStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
    };

    const disabledStyle: ViewStyle = disabled ? {
      opacity: 0.5,
    } : {};

    return {
      ...baseStyle,
      ...disabledStyle,
    };
  };

  const getCheckboxStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderWidth: 2,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: checked 
        ? Colors.secondary.orange3 // Using #FE652A from original
        : (isDark ? Colors.dark.bgLighter : Colors.primary.white),
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        width: 16,
        height: 16,
      },
      medium: {
        width: 20,
        height: 20,
      },
      large: {
        width: 24,
        height: 24,
      },
    };

    // Border color based on variant and state
    const getBorderColor = (): string => {
      if (variant === 'error') {
        return Colors.status.error;
      }
      
      if (checked) {
        return Colors.secondary.orange3; // Match the fill color
      }
      
      return isDark ? Colors.dark.border : Colors.neutral.gray300;
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      borderColor: getBorderColor(),
    };
  };

  const getLabelStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.base,
      color: isDark ? Colors.dark.text : Colors.neutral.gray700,
      marginLeft: Spacing.sm,
      flex: 1,
    };

    return baseStyle;
  };

  const getCheckIconSize = (): number => {
    const sizes = {
      small: 10,
      medium: 12,
      large: 16,
    };
    return sizes[size];
  };

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={[getContainerStyles(), style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[getCheckboxStyles(), checkboxStyle]}>
        {checked && (
          <Icon 
            name="check" 
            size={getCheckIconSize()} 
            color={Colors.primary.white}
          />
        )}
      </View>

      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

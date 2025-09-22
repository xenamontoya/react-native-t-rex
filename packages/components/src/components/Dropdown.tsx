/**
 * Dropdown Component - Converted from original project-t-rex
 * Select component with options (replaces HTML select elements)
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Icon } from '../Icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  isDark?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Please Select',
  value,
  options,
  onSelect,
  disabled = false,
  error,
  hint,
  required = false,
  size = 'medium',
  style,
  buttonStyle,
  labelStyle,
  isDark = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

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
      color: isDark ? Colors.dark.text : Colors.neutral.gray700,
    };

    return baseStyle;
  };

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: Spacing.input.paddingHorizontal,
      backgroundColor: isDark ? Colors.dark.bgLighter : Colors.primary.white,
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: Spacing.xs,
        height: 36,
      },
      medium: {
        paddingVertical: Spacing.input.paddingVertical,
        height: 48,
      },
      large: {
        paddingVertical: Spacing.md,
        height: 56,
      },
    };

    // Border color based on state
    const getBorderColor = (): string => {
      if (error) {
        return Colors.status.error;
      }
      if (disabled) {
        return isDark ? Colors.dark.border : Colors.neutral.gray200;
      }
      return isDark ? Colors.dark.border : Colors.neutral.gray300;
    };

    // Disabled styles
    const disabledStyle: ViewStyle = disabled ? {
      opacity: 0.5,
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      borderColor: getBorderColor(),
      ...disabledStyle,
    };
  };

  const getButtonTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.base,
    };

    if (!selectedOption) {
      return {
        ...baseStyle,
        color: isDark ? Colors.dark.textMuted : Colors.neutral.gray500,
      };
    }

    return {
      ...baseStyle,
      color: isDark ? Colors.dark.text : Colors.primary.black,
    };
  };

  const getModalStyles = (): ViewStyle => {
    return {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  const getOptionsContainerStyles = (): ViewStyle => {
    return {
      backgroundColor: isDark ? Colors.dark.bgLighter : Colors.primary.white,
      borderRadius: 8,
      margin: Spacing.lg,
      maxHeight: 300,
      minWidth: 200,
      shadowColor: Colors.primary.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    };
  };

  const getOptionStyles = (isSelected: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? Colors.dark.border : Colors.neutral.gray100,
    };

    if (isSelected) {
      return {
        ...baseStyle,
        backgroundColor: Colors.secondary.electricBlue,
      };
    }

    return baseStyle;
  };

  const getOptionTextStyles = (isSelected: boolean): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.base,
    };

    if (isSelected) {
      return {
        ...baseStyle,
        color: Colors.primary.white,
        fontFamily: Typography.fontFamily.medium,
      };
    }

    return {
      ...baseStyle,
      color: isDark ? Colors.dark.text : Colors.primary.black,
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

  const handleOptionPress = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleButtonPress = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const renderOption = ({ item, index }: { item: DropdownOption; index: number }) => {
    const isSelected = item.value === value;
    const isLast = index === options.length - 1;

    return (
      <TouchableOpacity
        style={[
          getOptionStyles(isSelected),
          isLast && { borderBottomWidth: 0 }
        ]}
        onPress={() => handleOptionPress(item)}
      >
        <Text style={getOptionTextStyles(isSelected)}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[getContainerStyles(), style]}>
      {/* Label */}
      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label}
          {required && (
            <Text style={{ color: Colors.status.error }}> *</Text>
          )}
        </Text>
      )}

      {/* Dropdown Button */}
      <TouchableOpacity
        style={[getButtonStyles(), buttonStyle]}
        onPress={handleButtonPress}
        disabled={disabled}
      >
        <Text style={getButtonTextStyles()}>
          {selectedOption?.label || placeholder}
        </Text>
        <Icon 
          name="chevronRight" 
          size={16} 
          color={isDark ? Colors.dark.textMuted : Colors.neutral.gray400}
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>

      {/* Hint or Error */}
      {(hint || error) && (
        <Text style={getHintStyles()}>
          {error || hint}
        </Text>
      )}

      {/* Options Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={getModalStyles()}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={getOptionsContainerStyles()}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;

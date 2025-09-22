import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../design-system';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  option: RadioOption;
  selected: boolean;
  onSelect: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  option,
  selected,
  onSelect,
  size = 'medium',
}) => {
  const handlePress = () => {
    if (!option.disabled) {
      onSelect(option.value);
    }
  };

  const radioSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const innerSize = radioSize - 8;

  return (
    <TouchableOpacity
      style={[
        styles.radioContainer,
        option.disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={option.disabled}
      activeOpacity={0.7}
    >
      <View style={[
        styles.radioCircle,
        { width: radioSize, height: radioSize, borderRadius: radioSize / 2 },
        selected && styles.radioCircleSelected,
        option.disabled && styles.radioCircleDisabled,
      ]}>
        {selected && (
          <View style={[
            styles.radioInner,
            { 
              width: innerSize, 
              height: innerSize, 
              borderRadius: innerSize / 2 
            },
            option.disabled && styles.radioInnerDisabled,
          ]} />
        )}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[
          styles.label,
          option.disabled && styles.labelDisabled,
        ]}>
          {option.label}
        </Text>
        {option.description && (
          <Text style={[
            styles.description,
            option.disabled && styles.descriptionDisabled,
          ]}>
            {option.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onValueChange,
  label,
  size = 'medium',
  disabled = false,
}) => {
  return (
    <View style={styles.radioGroup}>
      {label && (
        <Text style={[
          styles.groupLabel,
          disabled && styles.labelDisabled,
        ]}>
          {label}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            option={{
              ...option,
              disabled: disabled || option.disabled,
            }}
            selected={value === option.value}
            onSelect={onValueChange}
            size={size}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    marginVertical: Spacing.xs,
  },
  groupLabel: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: Spacing.sm,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  radioCircle: {
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    marginTop: 2,
    marginRight: Spacing.sm,
  },
  radioCircleSelected: {
    borderColor: Colors.secondary.electricBlue,
  },
  radioCircleDisabled: {
    borderColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.gray100,
  },
  radioInner: {
    backgroundColor: Colors.secondary.electricBlue,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  radioInnerDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    lineHeight: 20,
  },
  description: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
    lineHeight: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  labelDisabled: {
    color: Colors.neutral.gray400,
  },
  descriptionDisabled: {
    color: Colors.neutral.gray300,
  },
});

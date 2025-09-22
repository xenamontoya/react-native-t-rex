/**
 * Checkbox Component - Web Version for Storybook
 * Renders using HTML elements for browser compatibility
 */

import React from 'react';
import { Colors, Typography, Spacing } from '../design-system';

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error';
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
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
  const getContainerStyles = (): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: Typography.fontFamily.regular,
    };
  };

  const getCheckboxStyles = (): React.CSSProperties => {
    const sizeStyles: Record<string, { size: number }> = {
      small: { size: 16 },
      medium: { size: 20 },
      large: { size: 24 },
    };

    const { size: checkboxSize } = sizeStyles[size];

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
      width: checkboxSize,
      height: checkboxSize,
      border: `2px solid ${getBorderColor()}`,
      borderRadius: 4,
      backgroundColor: checked 
        ? Colors.secondary.orange3 // Using #FE652A from original
        : (isDark ? Colors.dark.bgLighter : Colors.primary.white),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: label ? Spacing.sm : 0,
      transition: 'all 0.2s ease',
      ...checkboxStyle,
    };
  };

  const getLabelStyles = (): React.CSSProperties => {
    return {
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.base,
      color: isDark ? Colors.dark.text : Colors.neutral.gray700,
      flex: 1,
      userSelect: 'none',
      ...labelStyle,
    };
  };

  const getCheckIconSize = (): number => {
    const sizes = {
      small: 10,
      medium: 12,
      large: 16,
    };
    return sizes[size];
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div style={{ ...getContainerStyles(), ...style }} onClick={handleClick}>
      <div style={getCheckboxStyles()}>
        {checked && (
          <span 
            style={{ 
              color: Colors.primary.white, 
              fontSize: getCheckIconSize(),
              fontWeight: 'bold',
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        )}
      </div>

      {label && (
        <span style={getLabelStyles()}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Checkbox;

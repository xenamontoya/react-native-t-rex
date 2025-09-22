/**
 * Status Badge Component - Converted from original project-t-rex
 * Shows status with appropriate colors and styling
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, StatusColors, Typography, Spacing } from '../design-system';

export interface StatusBadgeProps {
  status: 'scheduled' | 'confirmed' | 'complete' | 'pending' | 'cancelled' | 'in-progress';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'medium',
  style,
  textStyle,
}) => {
  const getBadgeStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: 6,
        paddingVertical: 2,
      },
      medium: {
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      large: {
        paddingHorizontal: 12,
        paddingVertical: 6,
      },
    };

    // Status background colors
    const statusStyle: ViewStyle = {
      backgroundColor: StatusColors[status]?.background || Colors.neutral.gray200,
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...statusStyle,
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontFamily: Typography.fontFamily.medium,
      textAlign: 'center',
    };

    // Size text styles
    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: Typography.fontSize.xs,
      },
      medium: {
        fontSize: Typography.fontSize.sm,
      },
      large: {
        fontSize: Typography.fontSize.base,
      },
    };

    // Status text colors
    const statusTextStyle: TextStyle = {
      color: StatusColors[status]?.text || Colors.neutral.gray600,
    };

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...statusTextStyle,
    };
  };

  const getStatusText = () => {
    const statusLabels: Record<string, string> = {
      scheduled: 'Scheduled',
      confirmed: 'Confirmed',
      complete: 'Complete',
      pending: 'Pending',
      cancelled: 'Cancelled',
      'in-progress': 'In Progress',
    };

    return statusLabels[status] || status;
  };

  return (
    <View style={[getBadgeStyles(), style]}>
      <Text style={[getTextStyles(), textStyle]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

export default StatusBadge;

/**
 * Progress Bar Component - Converted from original project-t-rex
 * Shows training progress with gradient styling
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Spacing } from '../design-system';

export interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  showPercentage?: boolean;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  showPercentage = true,
  height = 8,
  backgroundColor,
  progressColor,
  style,
  labelStyle,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const progressWidth = `${clampedProgress}%`;

  const containerStyles: ViewStyle = {
    height,
    backgroundColor: backgroundColor || Colors.neutral.gray200,
    borderRadius: height / 2,
    overflow: 'hidden',
  };

  const progressStyles: ViewStyle = {
    height: '100%',
    width: `${clampedProgress}%` as any, // React Native accepts percentage strings
    backgroundColor: progressColor || Colors.secondary.orange1,
    borderRadius: height / 2,
  };

  // For gradient effect (simulated with orange gradient)
  const gradientStyles: ViewStyle = {
    ...progressStyles,
    backgroundColor: Colors.secondary.orange1,
    // Note: React Native doesn't have CSS gradients, but we can simulate
    // the orange gradient from the original with the orange1 color
  };

  const percentageTextStyles: TextStyle = {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.secondary.orange2,
    marginLeft: Spacing.sm,
  };

  const labelTextStyles: TextStyle = {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.xs,
  };

  return (
    <View style={style}>
      {showLabel && (
        <Text style={[labelTextStyles, labelStyle]}>
          Training Progress
        </Text>
      )}
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[containerStyles, { flex: 1 }]}>
          <View style={gradientStyles} />
        </View>
        
        {showPercentage && (
          <Text style={percentageTextStyles}>
            {Math.round(clampedProgress)}%
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProgressBar;

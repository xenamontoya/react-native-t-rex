import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors, applyTextStyle, Typography, Spacing } from '../design-system';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | 'compact';
  theme?: 'light' | 'dark';
}

/**
 * 📊 STAT CARD COMPONENT
 * 
 * Unified stat card component with proper typography and theming
 * Features icon + label header row with large value below
 * Self-contained theming - no external style overrides needed
 * 
 * Usage:
 * <StatCard label="Total Hours" value="45.2" iconName="clock" />
 * <StatCard label="Students" value={12} icon={<CustomIcon />} theme="dark" />
 * <StatCard label="Started" value="Jan 2024" iconName="calendar" variant="compact" />
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconName,
  iconSize = 16,
  iconColor,
  containerStyle,
  variant = 'default',
  theme = 'light',
}) => {
  const isCompact = variant === 'compact';
  const isDark = theme === 'dark';
  
  // Determine colors based on theme
  const effectiveIconColor = iconColor || (isDark ? Colors.neutral.gray400 : Colors.neutral.gray500);

  const renderIcon = () => {
    if (icon) {
      return icon;
    }
    
    if (iconName) {
      // Simple text-based icon fallback for when Icon component isn't available
      const iconMap: { [key: string]: string } = {
        clock: '🕐',
        calendar: '📅', 
        user: '👤',
        plane: '✈️',
        award: '🏆',
        book: '📚',
      };
      
      return (
        <Text style={[styles.textIcon, { fontSize: iconSize, color: effectiveIconColor }]}>
          {iconMap[iconName] || '📊'}
        </Text>
      );
    }
    
    return null;
  };

  return (
    <View style={[
      styles.container,
      isCompact && styles.compactContainer,
      containerStyle
    ]}>
          {/* Header with Icon and Label */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              {renderIcon()}
            </View>
            <Text 
              numberOfLines={2}
              style={[
                styles.label,
                isCompact && styles.compactLabel,
                isDark && styles.labelDark
              ]}
            >
              {label}
            </Text>
          </View>
      
      {/* Value */}
      <Text style={[
        styles.value,
        isCompact && styles.compactValue,
        isDark && styles.valueDark
      ]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    minHeight: 110, // Increased to accommodate 2-line text in header
  },
  compactContainer: {
    padding: 12,
    minHeight: 95, // Increased to accommodate 2-line text in header
  },
  header: {
    flexDirection: 'row', // Keep icon and text inline
    alignItems: 'flex-start',
    marginBottom: 16, // More spacing between label and value
    minHeight: 36, // Increased to accommodate 2 lines (16px lineHeight * 2 + padding)
  },
  iconContainer: {
    width: 24, // Fixed width to prevent inconsistent shrinking
    height: 24, // Fixed height for consistency
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textIcon: {
    marginRight: 8,
  },
  
  // Light theme label styles
  label: {
    fontSize: 11, // Reduced from 12 to fit better
    fontFamily: 'DegularMono-Regular',
    lineHeight: 16, // Reduced from 26 - more reasonable spacing for 11px font
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.3, // Reduced to save space
    flex: 1, // Take available space, allowing natural text wrapping
    // Remove marginLeft since it's now in iconContainer spacing
  },
  compactLabel: {
    fontSize: 11, // Reduced from 12 to fit better
    fontFamily: 'DegularMono-Regular',
    lineHeight: 16, // Reduced from 26 - same as label for consistency
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.3, // Reduced to save space
    flex: 1, // Take available space, allowing natural text wrapping
    // Remove marginLeft since it's now in iconContainer spacing
  },
  
  // Dark theme label styles
  labelDark: {
    color: Colors.neutral.gray400,
  },
  
  // Light theme value styles
  value: {
    ...applyTextStyle('statValue'),
    color: Colors.neutral.gray900,
  },
  compactValue: {
    ...applyTextStyle('metric'),
    color: Colors.neutral.gray900,
  },
  
  // Dark theme value styles
  valueDark: {
    color: Colors.primary.white,
  },
});

export default StatCard;

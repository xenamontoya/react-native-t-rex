import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  valueStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | 'compact';
}

/**
 * 📊 STAT CARD COMPONENT
 * 
 * Unified stat card component matching Training tab style
 * Features icon + label header row with large value below
 * 
 * Usage:
 * <StatCard label="Total Hours" value="45.2" iconName="clock" />
 * <StatCard label="Students" value={12} icon={<CustomIcon />} />
 * <StatCard label="Started" value="Jan 2024" iconName="calendar" variant="compact" />
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconName,
  iconSize = 16,
  iconColor = '#6b7280',
  valueStyle,
  labelStyle,
  containerStyle,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact';

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
        <Text style={[styles.textIcon, { fontSize: iconSize, color: iconColor }]}>
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
        {renderIcon()}
        <Text style={[
          styles.label,
          isCompact && styles.compactLabel,
          labelStyle
        ]}>
          {label}
        </Text>
      </View>
      
      {/* Value */}
      <Text style={[
        styles.value,
        isCompact && styles.compactValue,
        valueStyle
      ]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  compactContainer: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textIcon: {
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginLeft: 8,
  },
  compactLabel: {
    fontSize: 11,
    marginLeft: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  compactValue: {
    fontSize: 20,
  },
});

export default StatCard;

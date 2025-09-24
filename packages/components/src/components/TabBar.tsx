import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface TabItem {
  name: string;
  icon: string;
  label: string;
  badge?: number; // For notification badges
}

export interface TabBarProps {
  tabs: TabItem[];
  activeIndex: number;
  onTabPress: (index: number, tab: TabItem) => void;
  style?: any;
  height?: number;
  showLabels?: boolean;
  badgeColor?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeIndex,
  onTabPress,
  style,
  height = 65,
  showLabels = true,
  badgeColor = Colors.status.error,
}) => {
  return (
    <View style={[styles.container, { height }, style]}>
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(index, tab)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <FontAwesome6
                name={tab.icon as any}
                size={22}
                color={isActive ? Colors.secondary.electricBlue : Colors.neutral.gray500}
              />
              
              {/* Badge */}
              {tab.badge && tab.badge > 0 && (
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? '99+' : tab.badge.toString()}
                  </Text>
                </View>
              )}
            </View>
            
            {showLabels && (
              <Text style={[
                styles.label,
                { color: isActive ? Colors.secondary.electricBlue : Colors.neutral.gray500 }
              ]}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Preset for flight training app tabs
export const FlightTrainingTabs: TabItem[] = [
  { name: 'Home', icon: 'house', label: 'Home' },
  { name: 'Reservations', icon: 'calendar', label: 'Schedule' },
  { name: 'Training', icon: 'graduation-cap', label: 'Training' },
  { name: 'Logbook', icon: 'book', label: 'Logbook' },
  { name: 'More', icon: 'ellipsis', label: 'More' },
];

// Student-specific tabs
export const StudentTabs: TabItem[] = [
  { name: 'Dashboard', icon: 'house', label: 'Dashboard' },
  { name: 'Lessons', icon: 'graduation-cap', label: 'Lessons' },
  { name: 'Flights', icon: 'plane', label: 'Flights' },
  { name: 'Progress', icon: 'chart-line', label: 'Progress' },
  { name: 'More', icon: 'ellipsis', label: 'More' },
];

// Instructor-specific tabs
export const InstructorTabs: TabItem[] = [
  { name: 'Dashboard', icon: 'house', label: 'Dashboard' },
  { name: 'Students', icon: 'users', label: 'Students' },
  { name: 'Schedule', icon: 'calendar', label: 'Schedule' },
  { name: 'Reports', icon: 'chart-bar', label: 'Reports' },
  { name: 'More', icon: 'ellipsis', label: 'More' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingBottom: Spacing.xs,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.white,
    textAlign: 'center',
  },
  label: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
    marginTop: 2,
  },
});

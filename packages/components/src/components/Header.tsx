import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onTimerPress?: () => void;
  onStartTimer?: () => void;
  onAlertsPress?: () => void;
  onSettingsPress?: () => void;
  onUserPress?: () => void;
  timerValue?: string;
  showTimer?: boolean;
  showAlerts?: boolean;
  alertsActive?: boolean;
  variant?: 'default' | 'minimal';
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Flight Schedule Pro',
  onMenuPress,
  onTimerPress,
  onStartTimer,
  onAlertsPress,
  onSettingsPress,
  onUserPress,
  timerValue = '00:00',
  showTimer = true,
  showAlerts = true,
  alertsActive = false,
  variant = 'default',
}) => {
  if (variant === 'minimal') {
    return (
      <View style={styles.headerMinimal}>
        <View style={styles.leftSection}>
          {onMenuPress && (
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <FontAwesome6 name="bars" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          )}
          <Text style={styles.titleMinimal}>{title}</Text>
        </View>
        <View style={styles.rightSection}>
          {onSettingsPress && (
            <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
              <FontAwesome6 name="gear" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {onMenuPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
            <FontAwesome6 name="bars" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Center Section - Timer Controls */}
      {showTimer && (
        <View style={styles.centerSection}>
          <View style={styles.timerContainer}>
            <TouchableOpacity style={styles.timerButton} onPress={onTimerPress}>
              <FontAwesome6 name="clock" size={16} color={Colors.accent.success} />
              <Text style={styles.timerText}>{timerValue}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerDropdown} onPress={onTimerPress}>
              <FontAwesome6 name="chevron-down" size={12} color={Colors.accent.success} />
            </TouchableOpacity>
          </View>
          
          {onStartTimer && (
            <TouchableOpacity style={styles.startButton} onPress={onStartTimer}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* Flight Alerts Toggle */}
        {showAlerts && (
          <TouchableOpacity 
            style={[
              styles.alertsContainer,
              alertsActive && styles.alertsContainerActive
            ]} 
            onPress={onAlertsPress}
          >
            <FontAwesome6 
              name="bell" 
              size={16} 
              color={alertsActive ? Colors.status.error : Colors.neutral.gray600} 
            />
            <Text style={[
              styles.alertsText,
              alertsActive && styles.alertsTextActive
            ]}>
              Flight Alerts
            </Text>
          </TouchableOpacity>
        )}
        
        {/* Settings */}
        {onSettingsPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
            <FontAwesome6 name="gear" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        )}
        
        {/* User Menu */}
        {onUserPress && (
          <TouchableOpacity style={styles.userButton} onPress={onUserPress}>
            <FontAwesome6 name="user" size={18} color={Colors.neutral.gray600} />
            <FontAwesome6 name="chevron-down" size={12} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 64,
  },
  headerMinimal: {
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: Spacing.xs,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  titleMinimal: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  timerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.accent.success,
    borderRadius: 6,
    overflow: 'hidden',
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.neutral.white,
    gap: Spacing.xs,
    borderRightWidth: 1,
    borderRightColor: Colors.accent.success,
  },
  timerText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.accent.success,
  },
  timerDropdown: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.accent.success,
    borderRadius: 6,
  },
  startButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.white,
  },
  alertsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  alertsContainerActive: {
    backgroundColor: '#FEF2F2', // red-50
    borderColor: '#FECACA', // red-200
  },
  alertsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray700,
  },
  alertsTextActive: {
    color: '#B91C1C', // red-700
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.xs,
    borderRadius: 6,
  },
});

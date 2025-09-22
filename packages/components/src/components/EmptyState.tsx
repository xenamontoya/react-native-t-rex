import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onActionPress?: () => void;
  icon?: string;
  iconSize?: number;
  variant?: 'default' | 'minimal' | 'error';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No flights logged yet',
  description = 'Start building your flight logbook by importing your existing flight data or adding new flights manually.',
  actionText = 'Import Prior Flight Data',
  onActionPress,
  icon = 'plane',
  iconSize = 48,
  variant = 'default',
}) => {
  const getIconColor = () => {
    switch (variant) {
      case 'error':
        return Colors.status.error;
      case 'minimal':
        return Colors.neutral.gray400;
      default:
        return Colors.neutral.gray400;
    }
  };

  const getActionButtonStyle = () => {
    switch (variant) {
      case 'error':
        return [styles.actionButton, styles.actionButtonError];
      case 'minimal':
        return [styles.actionButton, styles.actionButtonMinimal];
      default:
        return styles.actionButton;
    }
  };

  const getActionTextStyle = () => {
    switch (variant) {
      case 'error':
        return [styles.actionText, styles.actionTextError];
      case 'minimal':
        return [styles.actionText, styles.actionTextMinimal];
      default:
        return styles.actionText;
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <FontAwesome6 
          name={icon} 
          size={iconSize} 
          color={getIconColor()} 
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Action Button */}
      {onActionPress && (
        <TouchableOpacity 
          style={getActionButtonStyle()} 
          onPress={onActionPress}
          activeOpacity={0.8}
        >
          <FontAwesome6 name="upload" size={16} color="white" />
          <Text style={getActionTextStyle()}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Predefined empty states for common scenarios
export const FlightLogEmptyState: React.FC<{ onImportPress?: () => void }> = ({ onImportPress }) => (
  <EmptyState
    title="No flights logged yet"
    description="Start building your flight logbook by importing your existing flight data or adding new flights manually."
    actionText="Import Prior Flight Data"
    icon="plane"
    onActionPress={onImportPress}
  />
);

export const ReservationsEmptyState: React.FC<{ onBookPress?: () => void }> = ({ onBookPress }) => (
  <EmptyState
    title="No reservations found"
    description="You don't have any upcoming reservations. Book your next flight to get started."
    actionText="Book Flight"
    icon="calendar-plus"
    onActionPress={onBookPress}
  />
);

export const LessonsEmptyState: React.FC<{ onSchedulePress?: () => void }> = ({ onSchedulePress }) => (
  <EmptyState
    title="No lessons scheduled"
    description="Ready to take your next step in aviation? Schedule a lesson with your instructor."
    actionText="Schedule Lesson"
    icon="graduation-cap"
    onActionPress={onSchedulePress}
  />
);

export const SearchEmptyState: React.FC<{}> = () => (
  <EmptyState
    title="No results found"
    description="Try adjusting your search criteria or filters to find what you're looking for."
    icon="magnifying-glass"
    variant="minimal"
  />
);

export const ErrorEmptyState: React.FC<{ onRetryPress?: () => void }> = ({ onRetryPress }) => (
  <EmptyState
    title="Something went wrong"
    description="We encountered an error while loading your data. Please try again."
    actionText="Try Again"
    icon="triangle-exclamation"
    variant="error"
    onActionPress={onRetryPress}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing['2xl'],
  },
  iconContainer: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: 50,
    backgroundColor: Colors.neutral.gray50,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
    maxWidth: 320,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary.electricBlue, // blue-azure equivalent
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    gap: Spacing.xs,
    shadowColor: Colors.primary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonError: {
    backgroundColor: Colors.status.error,
  },
  actionButtonMinimal: {
    backgroundColor: Colors.neutral.gray600,
  },
  actionText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.white,
  },
  actionTextError: {
    color: Colors.neutral.white,
  },
  actionTextMinimal: {
    color: Colors.neutral.white,
  },
});

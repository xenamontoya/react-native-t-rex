import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  iconName?: string;
  iconColor?: string;
  isCompleted?: boolean;
  category?: 'flight' | 'training' | 'milestone' | 'certification';
}

interface AchievementItemProps {
  achievement: Achievement;
  onPress?: (achievement: Achievement) => void;
  showDescription?: boolean;
  showDate?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

/**
 * 🏆 ACHIEVEMENT ITEM COMPONENT
 * 
 * Unified component for displaying achievements and milestones
 * Eliminates duplication across profile and achievement screens
 * 
 * Usage:
 * <AchievementItem achievement={achievement} />
 * <AchievementItem achievement={achievement} variant="detailed" showDescription />
 * <AchievementItem achievement={achievement} onPress={handlePress} />
 */
export const AchievementItem: React.FC<AchievementItemProps> = ({
  achievement,
  onPress,
  showDescription = true,
  showDate = true,
  variant = 'default',
  containerStyle,
  titleStyle,
  disabled = false,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flight': return '✈️';
      case 'training': return '📚';
      case 'milestone': return '🎯';
      case 'certification': return '📜';
      default: return '🏆';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'flight': return '#3b82f6'; // blue
      case 'training': return '#10b981'; // green
      case 'milestone': return '#f59e0b'; // yellow
      case 'certification': return '#8b5cf6'; // purple
      default: return '#6b7280'; // gray
    }
  };

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: isCompact ? '2-digit' : 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const renderIcon = () => {
    if (achievement.icon) {
      return achievement.icon;
    }

    if (achievement.category) {
      return (
        <Text style={[
          styles.categoryIcon, 
          { color: getCategoryColor(achievement.category) }
        ]}>
          {getCategoryIcon(achievement.category)}
        </Text>
      );
    }

    return (
      <View style={[
        styles.defaultIconContainer,
        { backgroundColor: `${achievement.iconColor || '#6b7280'}20` }
      ]}>
        <Text style={[
          styles.defaultIcon,
          { color: achievement.iconColor || '#6b7280' }
        ]}>
          🏆
        </Text>
      </View>
    );
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      style={[
        styles.container,
        isCompact && styles.compactContainer,
        isDetailed && styles.detailedContainer,
        !achievement.isCompleted && styles.uncompletedContainer,
        containerStyle
      ]}
      onPress={onPress ? () => onPress(achievement) : undefined}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={disabled}
    >
      <View style={[
        styles.iconContainer,
        isCompact && styles.compactIconContainer
      ]}>
        {renderIcon()}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[
            styles.title,
            isCompact && styles.compactTitle,
            !achievement.isCompleted && styles.uncompletedTitle,
            titleStyle
          ]}>
            {achievement.title}
          </Text>
          
          {showDate && achievement.date && (
            <Text style={[styles.date, isCompact && styles.compactDate]}>
              {formatDate(achievement.date)}
            </Text>
          )}
        </View>

        {showDescription && achievement.description && !isCompact && (
          <Text style={[
            styles.description,
            !achievement.isCompleted && styles.uncompletedDescription
          ]}>
            {achievement.description}
          </Text>
        )}

        {isDetailed && achievement.category && (
          <Text style={styles.category}>
            {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
          </Text>
        )}
      </View>

      {!achievement.isCompleted && (
        <View style={styles.progressIndicator}>
          <View style={styles.progressDot} />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
  },
  compactContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  detailedContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  uncompletedContainer: {
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  compactIconContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  categoryIcon: {
    fontSize: 20,
  },
  defaultIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  compactTitle: {
    fontSize: 13,
  },
  uncompletedTitle: {
    color: '#6b7280',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  compactDate: {
    fontSize: 11,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 4,
  },
  uncompletedDescription: {
    color: '#9ca3af',
  },
  category: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressIndicator: {
    marginLeft: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
  },
});

export default AchievementItem;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  status?: 'scheduled' | 'completed' | 'pending' | 'cancelled';
  instructor?: string;
  aircraft?: string;
  duration?: string;
  studentName?: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onPress?: (lesson: Lesson) => void;
  showStatus?: boolean;
  showInstructor?: boolean;
  showAircraft?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

/**
 * 📚 LESSON CARD COMPONENT
 * 
 * Unified card component for displaying lesson information
 * Eliminates duplication across 8+ screens with lesson displays
 * 
 * Usage:
 * <LessonCard lesson={lesson} onPress={handleLessonPress} />
 * <LessonCard lesson={lesson} variant="compact" showStatus={false} />
 * <LessonCard lesson={lesson} variant="detailed" showInstructor showAircraft />
 */
export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onPress,
  showStatus = true,
  showInstructor = false,
  showAircraft = false,
  showDate = true,
  showTime = false,
  variant = 'default',
  containerStyle,
  titleStyle,
  descriptionStyle,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'; // green
      case 'scheduled': return '#f59e0b'; // yellow  
      case 'pending': return '#6b7280'; // gray
      case 'cancelled': return '#ef4444'; // red
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'scheduled': return 'Scheduled';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCompact && styles.compactContainer,
        isDetailed && styles.detailedContainer,
        containerStyle
      ]}
      onPress={() => onPress?.(lesson)}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title, 
            isCompact && styles.compactTitle,
            titleStyle
          ]}>
            {lesson.title}
          </Text>
          
          {showStatus && lesson.status && (
            <View style={[
              styles.statusBadge, 
              { backgroundColor: `${getStatusColor(lesson.status)}20` }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: getStatusColor(lesson.status) }
              ]}>
                {getStatusText(lesson.status)}
              </Text>
            </View>
          )}
        </View>

        {showDate && lesson.date && (
          <Text style={styles.date}>{lesson.date}</Text>
        )}
      </View>

      {/* Description */}
      {lesson.description && !isCompact && (
        <Text style={[styles.description, descriptionStyle]}>
          {lesson.description}
        </Text>
      )}

      {/* Meta Information */}
      {(showTime || showInstructor || showAircraft || lesson.studentName) && (
        <View style={styles.metaContainer}>
          {showTime && lesson.startTime && lesson.endTime && (
            <Text style={styles.metaText}>
              {lesson.startTime} - {lesson.endTime}
            </Text>
          )}
          
          {showInstructor && lesson.instructor && (
            <Text style={styles.metaText}>
              Instructor: {lesson.instructor}
            </Text>
          )}
          
          {showAircraft && lesson.aircraft && (
            <Text style={styles.metaText}>
              Aircraft: {lesson.aircraft}
            </Text>
          )}

          {lesson.studentName && (
            <Text style={styles.metaText}>
              Student: {lesson.studentName}
            </Text>
          )}

          {lesson.duration && (
            <Text style={styles.metaText}>
              Duration: {lesson.duration}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  compactContainer: {
    padding: 12,
    marginBottom: 8,
  },
  detailedContainer: {
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  compactTitle: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#9ca3af',
  },
});

export default LessonCard;

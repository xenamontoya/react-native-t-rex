import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Typography } from '../design-system';

interface Reservation {
  id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  aircraft?: string;
  aircraftType?: string;
  instructor?: string;
  student?: string;
  studentName?: string;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show';
  location?: string;
  duration?: string;
  lessonType?: string;
  notes?: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  onPress?: (reservation: Reservation) => void;
  showStatus?: boolean;
  showInstructor?: boolean;
  showStudent?: boolean;
  showAircraft?: boolean;
  showNotes?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  containerStyle?: StyleProp<ViewStyle>;
  userRole?: 'instructor' | 'student' | 'admin';
}

/**
 * 📅 RESERVATION CARD COMPONENT
 * 
 * Unified card component for displaying reservation information
 * Eliminates duplication across instructor/student reservation screens
 * 
 * Usage:
 * <ReservationCard reservation={reservation} onPress={handlePress} />
 * <ReservationCard reservation={reservation} variant="compact" userRole="instructor" />
 * <ReservationCard reservation={reservation} showInstructor showStudent />
 */
export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onPress,
  showStatus = true,
  showInstructor = false,
  showStudent = false,
  showAircraft = true,
  showNotes = false,
  variant = 'default',
  containerStyle,
  userRole,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981'; // green
      case 'pending': return '#f59e0b'; // yellow  
      case 'completed': return '#3b82f6'; // blue
      case 'cancelled': return '#ef4444'; // red
      case 'no_show': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'no_show': return 'No Show';
      default: return status;
    }
  };

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: isCompact ? 'short' : 'long',
        month: 'short', 
        day: 'numeric',
        year: isCompact ? '2-digit' : 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      // Handle various time formats
      if (timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
      }
      return timeString;
    } catch {
      return timeString;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCompact && styles.compactContainer,
        isDetailed && styles.detailedContainer,
        containerStyle
      ]}
      onPress={() => onPress?.(reservation)}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateTimeSection}>
          <Text style={[styles.date, isCompact && styles.compactDate]}>
            {formatDate(reservation.date)}
          </Text>
          
          {(reservation.startTime || reservation.endTime) && (
            <Text style={styles.time}>
              {reservation.startTime && formatTime(reservation.startTime)}
              {reservation.startTime && reservation.endTime && ' - '}
              {reservation.endTime && formatTime(reservation.endTime)}
            </Text>
          )}
          
          {reservation.duration && (
            <Text style={styles.duration}>Duration: {reservation.duration}</Text>
          )}
        </View>

        {showStatus && reservation.status && (
          <View style={[
            styles.statusBadge, 
            { backgroundColor: `${getStatusColor(reservation.status)}20` }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: getStatusColor(reservation.status) }
            ]}>
              {getStatusText(reservation.status)}
            </Text>
          </View>
        )}
      </View>

      {/* Aircraft Information */}
      {showAircraft && (reservation.aircraft || reservation.aircraftType) && (
        <View style={styles.aircraftSection}>
          {reservation.aircraft && (
            <Text style={styles.aircraftId}>{reservation.aircraft}</Text>
          )}
          {reservation.aircraftType && (
            <Text style={styles.aircraftType}>({reservation.aircraftType})</Text>
          )}
        </View>
      )}

      {/* Lesson Type */}
      {reservation.lessonType && (
        <Text style={styles.lessonType}>{reservation.lessonType}</Text>
      )}

      {/* People Information */}
      {(showInstructor || showStudent || (userRole && (reservation.instructor || reservation.student || reservation.studentName))) && (
        <View style={styles.peopleSection}>
          {(showInstructor || userRole === 'student') && reservation.instructor && (
            <Text style={styles.personText}>
              Instructor: {reservation.instructor}
            </Text>
          )}
          
          {(showStudent || userRole === 'instructor') && (reservation.student || reservation.studentName) && (
            <Text style={styles.personText}>
              Student: {reservation.student || reservation.studentName}
            </Text>
          )}
        </View>
      )}

      {/* Location */}
      {reservation.location && (
        <Text style={styles.location}>📍 {reservation.location}</Text>
      )}

      {/* Notes */}
      {showNotes && reservation.notes && (
        <Text style={styles.notes} numberOfLines={isCompact ? 2 : undefined}>
          {reservation.notes}
        </Text>
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
    marginBottom: 12,
  },
  dateTimeSection: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: '#111827',
    marginBottom: 4,
  },
  compactDate: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
    color: '#374151',
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  aircraftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aircraftId: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.mono,
    color: '#1f2937',
    marginRight: 8,
  },
  aircraftType: {
    fontSize: 14,
    color: '#6b7280',
  },
  lessonType: {
    fontSize: 14,
    color: '#374151',
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 8,
  },
  peopleSection: {
    marginBottom: 8,
  },
  personText: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  notes: {
    fontSize: 13,
    color: '#9ca3af',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default ReservationCard;

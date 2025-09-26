import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Typography } from '../design-system';

interface Flight {
  id: string;
  date: string;
  aircraft?: string;
  aircraftType?: string;
  flightNumber?: string;
  from?: string;
  to?: string;
  route?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  instructor?: string;
  student?: string;
  totalTime?: string;
  pic?: string;
  sic?: string;
  solo?: string;
  crossCountry?: string;
  night?: string;
  instrument?: string;
}

interface FlightCardProps {
  flight: Flight;
  onPress?: (flight: Flight) => void;
  showStatus?: boolean;
  showRoute?: boolean;
  showTimes?: boolean;
  showInstructor?: boolean;
  showFlightTime?: boolean;
  variant?: 'default' | 'compact' | 'logbook' | 'schedule';
  containerStyle?: StyleProp<ViewStyle>;
  highlighted?: boolean;
}

/**
 * ✈️ FLIGHT CARD COMPONENT
 * 
 * Unified card component for displaying flight information
 * Eliminates duplication across multiple flight-related screens
 * 
 * Usage:
 * <FlightCard flight={flight} onPress={handleFlightPress} />
 * <FlightCard flight={flight} variant="compact" showRoute={false} />
 * <FlightCard flight={flight} variant="logbook" showFlightTime />
 */
export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  onPress,
  showStatus = true,
  showRoute = true,
  showTimes = true,
  showInstructor = false,
  showFlightTime = false,
  variant = 'default',
  containerStyle,
  highlighted = false,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'; // green
      case 'scheduled': return '#f59e0b'; // yellow  
      case 'in_progress': return '#3b82f6'; // blue
      case 'cancelled': return '#ef4444'; // red
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'scheduled': return 'Scheduled';
      case 'in_progress': return 'In Progress';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const isCompact = variant === 'compact';
  const isLogbook = variant === 'logbook';
  const isSchedule = variant === 'schedule';

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

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCompact && styles.compactContainer,
        isLogbook && styles.logbookContainer,
        highlighted && styles.highlightedContainer,
        flight.status === 'scheduled' && styles.scheduledBorder,
        containerStyle
      ]}
      onPress={() => onPress?.(flight)}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={[styles.date, isCompact && styles.compactDate]}>
            {formatDate(flight.date)}
          </Text>
          
          {flight.aircraft && (
            <Text style={styles.aircraft}>{flight.aircraft}</Text>
          )}
          
          {flight.flightNumber && (
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          )}
        </View>

        {showStatus && flight.status && (
          <View style={[
            styles.statusBadge, 
            { backgroundColor: `${getStatusColor(flight.status)}20` }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: getStatusColor(flight.status) }
            ]}>
              {getStatusText(flight.status)}
            </Text>
          </View>
        )}
      </View>

      {/* Route */}
      {showRoute && (flight.from || flight.to || flight.route) && (
        <View style={styles.routeContainer}>
          {flight.from && flight.to ? (
            <View style={styles.routeDisplay}>
              <Text style={styles.airport}>{flight.from}</Text>
              <Text style={styles.routeArrow}> → </Text>
              <Text style={styles.airport}>{flight.to}</Text>
            </View>
          ) : flight.route ? (
            <Text style={styles.routeText}>{flight.route}</Text>
          ) : null}
        </View>
      )}

      {/* Times */}
      {showTimes && (flight.departureTime || flight.arrivalTime || flight.duration) && (
        <View style={styles.timesContainer}>
          {flight.departureTime && flight.arrivalTime && (
            <Text style={styles.timeText}>
              {flight.departureTime} - {flight.arrivalTime}
            </Text>
          )}
          
          {flight.duration && (
            <Text style={styles.durationText}>
              Duration: {flight.duration}
            </Text>
          )}
        </View>
      )}

      {/* Logbook Times */}
      {isLogbook && showFlightTime && (
        <View style={styles.logbookTimes}>
          {flight.totalTime && (
            <Text style={styles.logbookTime}>Total: {flight.totalTime}</Text>
          )}
          {flight.pic && (
            <Text style={styles.logbookTime}>PIC: {flight.pic}</Text>
          )}
          {flight.solo && (
            <Text style={styles.logbookTime}>Solo: {flight.solo}</Text>
          )}
          {flight.crossCountry && (
            <Text style={styles.logbookTime}>XC: {flight.crossCountry}</Text>
          )}
        </View>
      )}

      {/* Instructor/Student */}
      {showInstructor && (flight.instructor || flight.student) && (
        <View style={styles.peopleContainer}>
          {flight.instructor && (
            <Text style={styles.personText}>CFI: {flight.instructor}</Text>
          )}
          {flight.student && (
            <Text style={styles.personText}>Student: {flight.student}</Text>
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
  logbookContainer: {
    backgroundColor: '#fafafa',
  },
  highlightedContainer: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  scheduledBorder: {
    borderColor: '#f59e0b',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  leftSection: {
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
  aircraft: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: Typography.fontFamily.mono,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  routeContainer: {
    marginBottom: 8,
  },
  routeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airport: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.mono,
    color: '#111827',
  },
  routeArrow: {
    fontSize: 16,
    color: '#6b7280',
    marginHorizontal: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: Typography.fontFamily.mono,
  },
  timesContainer: {
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  durationText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  logbookTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  logbookTime: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: Typography.fontFamily.mono,
  },
  peopleContainer: {
    gap: 4,
  },
  personText: {
    fontSize: 13,
    color: '#6b7280',
  },
});

export default FlightCard;

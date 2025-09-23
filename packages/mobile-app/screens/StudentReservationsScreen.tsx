import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';
import { NewReservationModal } from '../components';

// Mock reservation data for students
const mockReservations = [
  {
    id: '1703772000000',
    date: 'TUE, DEC 15, 2025',
    startTime: '09:00',
    endTime: '11:00',
    aircraft: 'N12345',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith',
    type: 'Training Session',
    status: 'Confirmed',
    estimatedCost: '325.00',
  },
  {
    id: '1703858400000',
    date: 'WED, DEC 16, 2025',
    startTime: '14:00',
    endTime: '16:00',
    aircraft: 'N67890',
    aircraftType: 'Cessna 172',
    instructor: 'Sarah Johnson',
    type: 'Solo',
    status: 'Pending',
    estimatedCost: '225.00',
  },
  {
    id: '1704117600000',
    date: 'SAT, DEC 20, 2025',
    startTime: '10:00',
    endTime: '12:30',
    aircraft: 'N54321',
    aircraftType: 'Piper Cherokee',
    instructor: 'Mike Davis',
    type: 'Stage Check',
    status: 'Reserved',
    estimatedCost: '450.00',
  },
  {
    id: '1703080800000',
    date: 'MON, DEC 10, 2025',
    startTime: '13:00',
    endTime: '15:00',
    aircraft: 'N11111',
    aircraftType: 'Cessna 172',
    instructor: 'Emily Wilson',
    type: 'Training Session',
    status: 'Completed',
    estimatedCost: '325.00',
  },
];

// Calendar View Component (placeholder)
const CalendarView: React.FC<{ reservations: any[] }> = ({ reservations }) => {
  return (
    <View style={styles.calendarContainer}>
      <Icon name="calendar" size={48} color={Colors.neutral.gray300} />
      <Text style={styles.calendarTitle}>Calendar View</Text>
      <Text style={styles.calendarDescription}>
        Calendar view coming soon. Currently showing {reservations.length} reservations.
      </Text>
    </View>
  );
};

interface ReservationCardProps {
  reservation: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    aircraft: string;
    aircraftType: string;
    instructor: string;
    type: string;
    status: string;
    estimatedCost: string;
  };
  onPress: () => void;
  showPreflightCTA?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onPress, 
  showPreflightCTA = false 
}) => {
  const navigation = useNavigation();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
      case 'Pending':
        return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
      case 'Completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'Reserved':
        return { backgroundColor: Colors.status.info + '20', color: Colors.status.info };
      case 'Cancelled':
        return { backgroundColor: Colors.status.error + '20', color: Colors.status.error };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  const handlePreflightPress = () => {
    navigation.navigate('PreflightChecklist' as never);
  };

  return (
    <TouchableOpacity 
      style={styles.reservationCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Date Header */}
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{reservation.date}</Text>
        <Text style={styles.timeText}>
          {reservation.startTime} - {reservation.endTime}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.aircraftInfo}>
          <Text style={styles.aircraftText}>{reservation.aircraft}</Text>
          <Text style={styles.aircraftTypeText}>{reservation.aircraftType}</Text>
          <Text style={styles.costText}>
            Est. Cost: ${reservation.estimatedCost}
          </Text>
        </View>

        <View style={[styles.statusBadge, getStatusStyle(reservation.status)]}>
          <Text style={[styles.statusText, { color: getStatusStyle(reservation.status).color }]}>
            {reservation.status}
          </Text>
        </View>
      </View>

      {/* Additional Details */}
      <View style={styles.additionalDetails}>
        <View style={styles.detailRow}>
          <Icon name="user" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>{reservation.instructor}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="graduation" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>{reservation.type}</Text>
        </View>
      </View>

      {/* Preflight Checklist CTA */}
      {showPreflightCTA && (
        <View style={styles.preflightContainer}>
          <View style={styles.preflightHeader}>
            <Icon name="robot" size={16} color="#0891B2" />
            <Text style={styles.preflightTitle}>Preflight Checklist Required</Text>
          </View>
          <Text style={styles.preflightDescription}>
            Complete your preflight preparation before your lesson
          </Text>
          <TouchableOpacity
            style={styles.preflightButton}
            onPress={(e) => {
              e.stopPropagation();
              handlePreflightPress();
            }}
          >
            <Text style={styles.preflightButtonText}>Complete Preflight</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function StudentReservationsScreen() {
  const navigation = useNavigation();
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list');
  const [reservations] = useState(mockReservations);
  const [showNewReservationModal, setShowNewReservationModal] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleReservationClick = (reservation: any) => {
    const reservationDataParam = encodeURIComponent(JSON.stringify(reservation));
    navigation.navigate('ReservationDetails' as never, {
      id: reservation.id,
      reservationData: reservationDataParam
    } as never);
  };

  const separateReservationsByStatus = (reservations: any[]) => {
    const today = new Date().toDateString();
    const todayFormatted = 'TUE, DEC 15, 2025'; // Mock today's date

    const todayReservations = reservations.filter(r => r.date === todayFormatted);
    const upcomingReservations = reservations.filter(r => 
      r.date !== todayFormatted && 
      r.status !== 'Completed' && 
      r.status !== 'Cancelled'
    );
    const pastReservations = reservations.filter(r => 
      r.status === 'Completed' || r.status === 'Cancelled'
    );

    return {
      today: todayReservations,
      upcoming: upcomingReservations,
      past: pastReservations
    };
  };

  const { today, upcoming, past } = separateReservationsByStatus(reservations);

  const handleScheduleLesson = () => {
    setShowNewReservationModal(true);
  };

  const handleReservationComplete = (reservationData: any) => {
    Alert.alert(
      'Lesson Scheduled',
      'Your lesson has been successfully scheduled!',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Reservations</Text>
            <Text style={styles.headerSubtitle}>Your upcoming flight lessons</Text>
          </View>
        </View>
        
        {reservations.length > 0 && (
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, currentView === 'list' && styles.toggleButtonActive]}
              onPress={() => setCurrentView('list')}
            >
              <Icon 
                name="list" 
                size={16} 
                color={currentView === 'list' ? Colors.neutral.gray900 : Colors.neutral.gray600} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, currentView === 'calendar' && styles.toggleButtonActive]}
              onPress={() => setCurrentView('calendar')}
            >
              <Icon 
                name="calendar" 
                size={16} 
                color={currentView === 'calendar' ? Colors.neutral.gray900 : Colors.neutral.gray600} 
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {reservations.length > 0 ? (
          <>
            {currentView === 'list' ? (
              <View style={styles.listContainer}>
                {/* Today's Reservations */}
                {today.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today</Text>
                    <View style={styles.reservationsList}>
                      {today.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          onPress={() => handleReservationClick(reservation)}
                          showPreflightCTA={true}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Upcoming Reservations */}
                {upcoming.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Reservations</Text>
                    <View style={styles.reservationsList}>
                      {upcoming.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          onPress={() => handleReservationClick(reservation)}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Divider */}
                {past.length > 0 && <View style={styles.electricDivider} />}

                {/* Past Reservations */}
                {past.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Past Reservations</Text>
                    <View style={styles.reservationsList}>
                      {past.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          onPress={() => handleReservationClick(reservation)}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <CalendarView reservations={reservations} />
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="plane" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyStateTitle}>No Upcoming Reservations</Text>
            <Text style={styles.emptyStateDescription}>
              You don't have any flight lessons scheduled yet. Book your next training session to continue your progress.
            </Text>
            <TouchableOpacity 
              style={styles.scheduleButton}
              onPress={handleScheduleLesson}
            >
              <Text style={styles.scheduleButtonText}>Schedule a Lesson</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* New Reservation Modal */}
      <NewReservationModal
        isOpen={showNewReservationModal}
        onClose={() => setShowNewReservationModal(false)}
        onComplete={handleReservationComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  reservationsList: {
    gap: 16,
  },
  reservationCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  dateHeader: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray900,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aircraftInfo: {
    flex: 1,
  },
  aircraftText: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  aircraftTypeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 4,
  },
  costText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#008333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
  additionalDetails: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
    flexDirection: 'row',
    gap: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  preflightContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E8FDFC',
    borderRadius: 8,
  },
  preflightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  preflightTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0891B2',
  },
  preflightDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  preflightButton: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  preflightButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  electricDivider: {
    height: 1,
    backgroundColor: '#00FFF2',
    marginVertical: 24,
  },
  calendarContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 32,
    margin: 16,
    alignItems: 'center',
  },
  calendarTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginTop: 16,
    marginBottom: 8,
  },
  calendarDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 48,
    margin: 16,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  scheduleButton: {
    backgroundColor: '#212121',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
});

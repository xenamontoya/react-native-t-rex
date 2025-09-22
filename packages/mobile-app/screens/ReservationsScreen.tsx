import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Icon, Colors } from '../../components/src';

// Mock stores for mobile (to match web app structure)
const useRoleStore = () => ({
  setRole: (role: string) => {}
});

const useReservationStore = () => ({
  reservations: [
    {
      id: '1703772000000',
      date: 'TUE, DEC 15, 2025',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      aircraft: 'N12345',
      aircraftType: 'Cessna 172',
      instructor: 'Sarah Mitchell',
      type: 'Stage Check',
      status: 'Confirmed'
    },
    {
      id: '1704031200000',
      date: 'FRI, DEC 18, 2025',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      aircraft: 'N67890',
      aircraftType: 'Piper Cherokee',
      instructor: 'Mike Johnson',
      type: 'Solo',
      status: 'Pending'
    },
    {
      id: '1703685600000',
      date: 'MON, DEC 14, 2025',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      aircraft: 'N54321',
      aircraftType: 'Cessna 172',
      instructor: 'Sarah Mitchell',
      type: 'Dual',
      status: 'Completed'
    }
  ],
  isInitialized: true,
  initializeStore: () => {}
});

const separateAndSortReservationsByStatus = (reservations: any[]) => {
  const today = reservations.filter(r => r.date === 'TUE, DEC 15, 2025');
  const upcoming = reservations.filter(r => r.status === 'Pending' || r.status === 'Confirmed');
  const past = reservations.filter(r => r.status === 'Completed');
  
  return { today, upcoming, past };
};

const getStatusStyle = (status: string) => {
  if (status === 'Confirmed') {
    return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
  }
  if (status === 'Pending') {
    return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
  }
  if (status === 'Completed') {
    return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
  }
  return {};
};

// Calendar View Component (placeholder matching web app)
const CalendarView = ({ reservations }: { reservations: any[] }) => {
  return (
    <View style={styles.calendarPlaceholder}>
      <Icon name="calendar" size={48} color={Colors.neutral.gray300} />
      <Text style={styles.calendarTitle}>Calendar View</Text>
      <Text style={styles.calendarSubtitle}>
        Calendar view coming soon. Currently showing {reservations.length} reservations.
      </Text>
    </View>
  );
};

export default function ReservationsScreen({ navigation }: any) {
  const { setRole } = useRoleStore();
  const { reservations, isInitialized, initializeStore } = useReservationStore();
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    setRole('student');
  }, [setRole]);

  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

  const handleReservationClick = (reservation: any) => {
    // Navigate to reservation details
    Alert.alert('Reservation Details', `View details for ${reservation.aircraft} on ${reservation.date}`);
  };

  const handlePreflightClick = () => {
    // Navigate to preflight checklist
    navigation?.navigate('PreflightChecklistScreen');
  };

  return (
    <View style={styles.container}>
      {/* Mobile Header with Toggle */}
      <View style={styles.mobileHeader}>
        <Text style={styles.headerTitle}>Reservations</Text>
        {reservations.length > 0 && (
          <View style={styles.viewToggle}>
            <TouchableOpacity
              onPress={() => setCurrentView('list')}
              style={[
                styles.toggleButton,
                currentView === 'list' && styles.toggleButtonActive
              ]}
            >
              <Icon name="list" size={16} color={currentView === 'list' ? Colors.primary.black : Colors.neutral.gray600} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentView('calendar')}
              style={[
                styles.toggleButton,
                currentView === 'calendar' && styles.toggleButtonActive
              ]}
            >
              <Icon name="calendar" size={16} color={currentView === 'calendar' ? Colors.primary.black : Colors.neutral.gray600} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {reservations.length > 0 ? (
          <>
            {currentView === 'list' ? (
              (() => {
                const { today, upcoming, past } = separateAndSortReservationsByStatus(reservations);

                const renderReservation = (reservation: any) => (
                  <TouchableOpacity
                    key={reservation.id}
                    style={styles.reservationCard}
                    onPress={() => handleReservationClick(reservation)}
                  >
                    {/* Date Header */}
                    <View style={styles.dateHeader}>
                      <Text style={styles.dateText}>{reservation.date}</Text>
                      <Text style={styles.timeText}>
                        {reservation.startTime} - {reservation.endTime}
                      </Text>
                    </View>
                    
                    {/* Main Content */}
                    <View style={styles.reservationContent}>
                      {/* Aircraft */}
                      <View style={styles.aircraftSection}>
                        <Text style={styles.aircraftNumber}>{reservation.aircraft}</Text>
                        <Text style={styles.aircraftType}>{reservation.aircraftType}</Text>
                        <Text style={styles.costText}>
                          Est. Cost: ${reservation.type === 'Stage Check' ? '450.00' : 
                            reservation.type === 'Solo' ? '225.00' : 
                            reservation.aircraftType === 'Cessna 172' ? '325.00' : '375.00'}
                        </Text>
                      </View>
                      
                      {/* Status Badge */}
                      <View 
                        style={[
                          styles.statusBadge,
                          getStatusStyle(reservation.status)
                        ]}
                      >
                        <Text style={[styles.statusText, { color: getStatusStyle(reservation.status).color }]}>
                          {reservation.status}
                        </Text>
                      </View>
                    </View>
                    
                    {/* Additional Details */}
                    <View style={styles.detailsSection}>
                      <View style={styles.detailItem}>
                        <Icon name="user" size={14} color={Colors.neutral.gray400} />
                        <Text style={styles.detailText}>{reservation.instructor}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Icon name="graduationCap" size={14} color={Colors.neutral.gray400} />
                        <Text style={styles.detailText}>{reservation.type}</Text>
                      </View>
                    </View>

                    {/* Preflight Checklist for Today's Reservations */}
                    {reservation.date === 'TUE, DEC 15, 2025' && (
                      <TouchableOpacity
                        style={styles.preflightCallout}
                        onPress={handlePreflightClick}
                      >
                        <View style={styles.preflightHeader}>
                          <Icon name="checkCircle" size={16} color="#0891B2" />
                          <Text style={styles.preflightTitle}>Preflight Checklist Required</Text>
                        </View>
                        <Text style={styles.preflightDescription}>
                          Complete your preflight preparation before your lesson
                        </Text>
                        <View style={styles.preflightButton}>
                          <Text style={styles.preflightButtonText}>Complete Preflight</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );

                return (
                  <View style={styles.reservationsList}>
                    {/* Today's Reservations */}
                    {today.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Today</Text>
                        {today.map(renderReservation)}
                      </View>
                    )}

                    {/* Upcoming Reservations */}
                    {upcoming.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upcoming Reservations</Text>
                        {upcoming.map(renderReservation)}
                      </View>
                    )}

                    {/* Electric Blue Divider */}
                    {past.length > 0 && (
                      <View style={styles.divider} />
                    )}

                    {/* Past Reservations */}
                    {past.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Past Reservations</Text>
                        {past.map(renderReservation)}
                      </View>
                    )}
                  </View>
                );
              })()
            ) : (
              <CalendarView reservations={reservations} />
            )}
          </>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <Icon name="plane" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyTitle}>No Upcoming Reservations</Text>
            <Text style={styles.emptyDescription}>
              You don't have any flight lessons scheduled yet. Book your next training session to continue your progress.
            </Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Schedule a Lesson</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  
  // Mobile Header
  mobileHeader: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
  },
  
  // View Toggle
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
  
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Reservations List
  reservationsList: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  
  // Reservation Card
  reservationCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
    marginBottom: 16,
  },
  
  // Date Header
  dateHeader: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.black,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  
  // Reservation Content
  reservationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aircraftSection: {
    flex: 1,
  },
  aircraftNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
  },
  aircraftType: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#008333',
    marginTop: 4,
  },
  
  // Status Badge
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Details Section
  detailsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginLeft: 8,
  },
  
  // Preflight Callout
  preflightCallout: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E8FDFC',
    borderRadius: 12,
  },
  preflightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preflightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891B2',
    marginLeft: 8,
  },
  preflightDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  preflightButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  preflightButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#00FFF2',
    marginVertical: 24,
  },
  
  // Calendar Placeholder
  calendarPlaceholder: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 32,
    alignItems: 'center',
    marginTop: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  
  // Empty State
  emptyState: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 48,
    alignItems: 'center',
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: 24,
  },
  scheduleButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.white,
  },
  
  bottomPadding: {
    height: 100,
  },
});
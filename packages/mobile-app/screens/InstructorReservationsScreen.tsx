import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';
import { NewReservationModal } from '../components';

// Mock reservation data for instructor perspective (showing student names)
const mockInstructorReservations = [
  {
    id: '1703772000000',
    date: 'TUE, DEC 15, 2025',
    startTime: '09:00',
    endTime: '11:00',
    aircraft: 'N12345',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI', // Current instructor
    student: 'Alex Johnson', // Show student name
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
    instructor: 'John Smith - CFI',
    student: 'Sarah Chen',
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
    instructor: 'John Smith - CFI',
    student: 'Mike Rodriguez',
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
    instructor: 'John Smith - CFI',
    student: 'Emily Davis',
    type: 'Training Session',
    status: 'Completed',
    estimatedCost: '325.00',
  },
];

// Success Toast Component
const SuccessToast: React.FC<{
  message: string;
  isVisible: boolean;
  onClose: () => void;
}> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <View style={styles.successToastContainer}>
      <View style={styles.successToast}>
        <View style={styles.successToastContent}>
          <View style={styles.successIcon}>
            <Icon name="check" size={12} color={Colors.primary.white} />
          </View>
          <Text style={styles.successToastText}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.successToastClose}>
          <Icon name="times" size={16} color="#16a34a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Calendar View Component (placeholder)
const CalendarView: React.FC<{ reservations: any[] }> = ({ reservations }) => {
  return (
    <View style={styles.calendarContainer}>
      <Icon name="calendar" size={48} color={Colors.neutral.gray300} />
      <Text style={styles.calendarTitle}>Calendar View</Text>
      <Text style={styles.calendarDescription}>
        Calendar view coming soon. Currently showing {reservations.length} lessons.
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
    student: string;
    type: string;
    status: string;
    estimatedCost: string;
  };
  onPress: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onPress, 
  onEdit,
  onDuplicate,
  onDelete
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleCardPress = () => {
    if (!showDropdown) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      style={styles.reservationCard}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Date Header with Menu */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dateText}>{reservation.date}</Text>
          <Text style={styles.timeText}>
            {reservation.startTime} - {reservation.endTime}
          </Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Icon name="ellipsisV" size={16} color={Colors.neutral.gray600} />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setShowDropdown(false);
                  onEdit();
                }}
              >
                <Icon name="edit" size={14} color={Colors.neutral.gray700} />
                <Text style={styles.dropdownText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setShowDropdown(false);
                  onDuplicate();
                }}
              >
                <Icon name="copy" size={14} color={Colors.neutral.gray700} />
                <Text style={styles.dropdownText}>Duplicate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dropdownItem, styles.deleteItem]}
                onPress={() => {
                  setShowDropdown(false);
                  onDelete();
                }}
              >
                <Icon name="trash" size={14} color={Colors.status.error} />
                <Text style={[styles.dropdownText, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
          <Icon name="graduation" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>{reservation.student}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="plane" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>{reservation.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function InstructorReservationsScreen() {
  const navigation = useNavigation();
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list');
  const [reservations] = useState(mockInstructorReservations);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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
    const upcomingReservations = reservations.filter(r => 
      r.status !== 'Completed' && r.status !== 'Cancelled'
    );
    const pastReservations = reservations.filter(r => 
      r.status === 'Completed' || r.status === 'Cancelled'
    );

    return {
      upcoming: upcomingReservations,
      past: pastReservations
    };
  };

  const { upcoming, past } = separateReservationsByStatus(reservations);

  const handleNewReservation = () => {
    setShowNewReservationModal(true);
    setShowFloatingMenu(false);
  };

  const handleReservationComplete = (reservationData: any) => {
    setSuccessMessage('Reservation created successfully!');
    setShowSuccessToast(true);
  };

  const handleFindTime = () => {
    Alert.alert('Find a Time', 'Time finding functionality coming soon!');
    setShowFloatingMenu(false);
  };

  const handleNewClassMeeting = () => {
    Alert.alert('New Class/Meeting', 'Class/meeting creation coming soon!');
    setShowFloatingMenu(false);
  };

  const handleEditReservation = (reservation: any) => {
    Alert.alert('Edit Reservation', `Edit reservation for ${reservation.student}?`);
  };

  const handleDuplicateReservation = (reservation: any) => {
    Alert.alert('Duplicate Reservation', `Duplicate reservation for ${reservation.student}?`);
  };

  const handleDeleteReservation = (reservation: any) => {
    Alert.alert(
      'Delete Reservation',
      `Are you sure you want to delete the reservation for ${reservation.student}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setSuccessMessage('Reservation deleted successfully!');
            setShowSuccessToast(true);
          }
        }
      ]
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
            <Text style={styles.headerSubtitle}>Your lessons with students</Text>
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
                          onEdit={() => handleEditReservation(reservation)}
                          onDuplicate={() => handleDuplicateReservation(reservation)}
                          onDelete={() => handleDeleteReservation(reservation)}
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
                          onEdit={() => handleEditReservation(reservation)}
                          onDuplicate={() => handleDuplicateReservation(reservation)}
                          onDelete={() => handleDeleteReservation(reservation)}
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
            <Icon name="graduation" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyStateTitle}>No Upcoming Lessons</Text>
            <Text style={styles.emptyStateDescription}>
              You don't have any lessons scheduled with students yet. Your teaching schedule will appear here once students book sessions with you.
            </Text>
            <TouchableOpacity 
              style={styles.availabilityButton}
              onPress={() => Alert.alert('Availability', 'View availability functionality coming soon!')}
            >
              <Icon name="calendar" size={16} color={Colors.brand.cyan} />
              <Text style={styles.availabilityButtonText}>View Availability</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Menu */}
      {showFloatingMenu && (
        <>
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => setShowFloatingMenu(false)}
            activeOpacity={1}
          />
          
          {/* Menu Items */}
          <View style={styles.floatingMenuContainer}>
            <TouchableOpacity
              style={styles.floatingMenuItem}
              onPress={handleNewReservation}
            >
              <Icon name="plus" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.floatingMenuText}>New Reservation</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.floatingMenuItem}
              onPress={handleFindTime}
            >
              <Icon name="clock" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.floatingMenuText}>Find a Time</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.floatingMenuItem}
              onPress={handleNewClassMeeting}
            >
              <Icon name="users" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.floatingMenuText}>New Class/Meeting</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowFloatingMenu(!showFloatingMenu)}
      >
        <Icon 
          name={showFloatingMenu ? 'times' : 'plus'} 
          size={24} 
          color={Colors.brand.cyan} 
        />
      </TouchableOpacity>

      {/* Success Toast */}
      <SuccessToast
        message={successMessage}
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 52,
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 50,
    minWidth: 140,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  deleteItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  deleteText: {
    color: Colors.status.error,
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
  availabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  availabilityButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 55,
  },
  floatingMenuContainer: {
    position: 'absolute',
    right: 24,
    bottom: 100,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 56,
    minWidth: 200,
  },
  floatingMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  floatingMenuText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#212121',
    borderWidth: 3,
    borderColor: Colors.brand.cyan,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 60,
  },
  successToastContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  successToast: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successToastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#16a34a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successToastText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#166534',
  },
  successToastClose: {
    padding: 4,
  },
});

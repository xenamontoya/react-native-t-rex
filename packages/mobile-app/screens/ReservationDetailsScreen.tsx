import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

interface Reservation {
  id: string;
  aircraft: string;
  aircraftType: string;
  student: string;
  instructor: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  lesson?: {
    id: string;
    title: string;
    description: string;
    status: string;
    duration: string;
  };
}

export default function ReservationDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    try {
      const params = route.params as any;
      const { id, reservationData } = params || {};
      
      if (reservationData && typeof reservationData === 'string') {
        const parsedReservation = JSON.parse(decodeURIComponent(reservationData));
        setReservation(parsedReservation);
      } else {
        // Fallback reservation data
        setReservation({
          id: id || '1',
          aircraft: 'N12345',
          aircraftType: 'Cessna 172',
          student: 'Alex Johnson',
          instructor: 'Sarah Mitchell',
          type: 'Training Session',
          date: 'TUE, DEC 15, 2025',
          startTime: '14:00',
          endTime: '16:00',
          status: 'Confirmed'
        });
      }
    } catch (error) {
      console.error('Error parsing reservation data:', error);
      // Set fallback data even on error
      setReservation({
        id: '1',
        aircraft: 'N12345',
        aircraftType: 'Cessna 172',
        student: 'Alex Johnson',
        instructor: 'Sarah Mitchell',
        type: 'Training Session',
        date: 'TUE, DEC 15, 2025',
        startTime: '14:00',
        endTime: '16:00',
        status: 'Confirmed'
      });
    } finally {
      setLoading(false);
    }
  }, [route.params]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
      case 'Confirmed':
        return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
      case 'Completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'Reserved':
        return { backgroundColor: Colors.brand.blueAzure + '20', color: Colors.brand.blueAzure };
      case 'Cancelled':
        return { backgroundColor: Colors.status.error + '20', color: Colors.status.error };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
    }
  };

  const handleDeleteConfirm = () => {
    Alert.alert('Success', 'Reservation has been deleted.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
    setShowDeleteModal(false);
  };

  const handleViewLesson = () => {
    if (reservation?.lesson) {
      const lessonDataParam = encodeURIComponent(JSON.stringify(reservation.lesson));
      navigation.navigate('LessonDetails' as never, {
        id: reservation.lesson.id,
        lessonData: lessonDataParam
      } as never);
    }
  };

  const handleViewLogbookEntry = () => {
    // Create a mock flight entry linked to this reservation
    const flight = {
      id: `flight_${reservation?.id}`,
      flight_number: `TRN${reservation?.id}`,
      registration: reservation?.aircraft,
      aircraft_type: reservation?.aircraftType,
      status: reservation?.status === 'Completed' ? 'Completed' : 'Scheduled',
      total_time: '2.0',
      instructor: reservation?.instructor,
      student: reservation?.student
    };
    
    if (flight.status === 'Scheduled') {
      // Navigate to editable form
      const flightDataParam = encodeURIComponent(JSON.stringify(flight));
      navigation.navigate('FlightDetailsForm' as never, {
        id: flight.id,
        flightData: flightDataParam,
        mode: 'edit'
      } as never);
    } else {
      // Navigate to read-only details
      const flightDataParam = encodeURIComponent(JSON.stringify(flight));
      navigation.navigate('FlightDetails' as never, {
        id: flight.id,
        flightData: flightDataParam
      } as never);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading reservation...</Text>
      </View>
    );
  }

  if (!reservation) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Reservation not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isToday = reservation.date === 'TUE, DEC 15, 2025'; // Mock today's date

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Reservation Details</Text>
          <Text style={styles.headerSubtitle}>{reservation.aircraft}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.menuButton}>
          <Icon name="ellipsis-v" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              Alert.alert('Info', 'Begin Briefing feature coming soon');
            }}>
              <Icon name="play" size={16} color={Colors.neutral.gray400} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Begin Briefing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              Alert.alert('Info', 'Check Out feature coming soon');
            }}>
              <Icon name="arrow-right" size={16} color={Colors.neutral.gray400} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Check Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              Alert.alert('Info', 'Calendar feature coming soon');
            }}>
              <Icon name="calendar-plus" size={16} color={Colors.neutral.gray400} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Add to Calendar</Text>
            </TouchableOpacity>
            
            <View style={styles.dropdownDivider} />
            
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              Alert.alert('Info', 'Edit feature coming soon');
            }}>
              <Icon name="edit" size={16} color={Colors.neutral.gray400} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {
              setShowDropdown(false);
              Alert.alert('Info', 'Duplicate feature coming soon');
            }}>
              <Icon name="copy" size={16} color={Colors.neutral.gray400} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Duplicate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.dropdownItem, styles.dropdownItemDanger]} onPress={() => {
              setShowDropdown(false);
              setShowDeleteModal(true);
            }}>
              <Icon name="trash" size={16} color={Colors.status.error} style={styles.dropdownIcon} />
              <Text style={[styles.dropdownText, styles.dropdownTextDanger]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Reservation Details */}
          <View style={styles.section}>
            {/* Time and Date - Prominent */}
            <View style={styles.timeContainer}>
              <View style={styles.timeInfo}>
                <Text style={styles.dateText}>{reservation.date}</Text>
                <Text style={styles.timeText}>{reservation.startTime} - {reservation.endTime}</Text>
                <Text style={styles.sessionType}>Training Session</Text>
              </View>
              <View style={[styles.statusBadge, getStatusStyle(reservation.status)]}>
                <Text style={[styles.statusText, { color: getStatusStyle(reservation.status).color }]}>
                  {reservation.status}
                </Text>
              </View>
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Aircraft</Text>
                <Text style={styles.detailValue}>{reservation.aircraft} - {reservation.aircraftType}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>2 hours</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Reservation ID</Text>
                <Text style={styles.detailValue}>{reservation.id}</Text>
              </View>

              <View style={styles.detailRowLast}>
                <Text style={styles.detailLabel}>Created</Text>
                <Text style={styles.detailValue}>Today</Text>
              </View>
            </View>
          </View>

          {/* Preflight Checklist Call-to-Action - Today's Reservations Only */}
          {isToday && (
            <View style={styles.preflightSection}>
              <View style={styles.preflightIcon}>
                <Icon name="clipboard-list" size={16} color={Colors.brand.blueAzure} />
              </View>
              <View style={styles.preflightContent}>
                <Text style={styles.preflightTitle}>Preflight Checklist Required</Text>
                <Text style={styles.preflightSubtitle}>
                  Complete your preflight preparation before your lesson
                </Text>
                <TouchableOpacity style={styles.preflightButton} onPress={() => {
                  Alert.alert('Info', 'Preflight checklist feature coming soon');
                }}>
                  <Text style={styles.preflightButtonText}>Complete Preflight</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Student/Instructor Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Student</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => {
                Alert.alert('Info', 'Student profile feature coming soon');
              }}>
                <Icon name="external-link-alt" size={12} color={Colors.neutral.gray600} />
                <Text style={styles.viewButtonText}>View Student</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.personInfo}>
              {/* Profile Picture */}
              <TouchableOpacity 
                style={styles.profilePicture} 
                onPress={() => setShowProfileModal(true)}
              >
                <Image 
                  source={{ uri: `https://i.pravatar.cc/320?seed=${reservation.student}` }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              
              <View style={styles.personDetails}>
                <Text style={styles.personName}>{reservation.student}</Text>
                <Text style={styles.personType}>{reservation.type}</Text>
                
                {/* Contact Buttons */}
                <View style={styles.contactButtons}>
                  <TouchableOpacity style={styles.contactButton} onPress={() => {
                    Alert.alert('Info', 'Call feature coming soon');
                  }}>
                    <Icon name="phone" size={16} color={Colors.neutral.gray600} />
                    <Text style={styles.contactButtonText}>Call</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.contactButton} onPress={() => {
                    Alert.alert('Info', 'Email feature coming soon');
                  }}>
                    <Icon name="envelope" size={16} color={Colors.neutral.gray600} />
                    <Text style={styles.contactButtonText}>Email</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.contactButton} onPress={() => {
                    Alert.alert('Info', 'Text feature coming soon');
                  }}>
                    <Icon name="comment" size={16} color={Colors.neutral.gray600} />
                    <Text style={styles.contactButtonText}>Text</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Lesson Details Section */}
          {reservation.lesson && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Lesson Details</Text>
                <TouchableOpacity style={styles.viewButton} onPress={handleViewLesson}>
                  <Icon name="external-link-alt" size={12} color={Colors.neutral.gray600} />
                  <Text style={styles.viewButtonText}>View Lesson</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>{reservation.lesson.title}</Text>
                <Text style={styles.lessonDescription}>{reservation.lesson.description}</Text>
                
                <View style={styles.lessonDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{reservation.lesson.duration}</Text>
                  </View>
                  <View style={styles.detailRowLast}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={[styles.statusBadge, getStatusStyle(reservation.lesson.status)]}>
                      <Text style={[styles.statusText, { color: getStatusStyle(reservation.lesson.status).color }]}>
                        {reservation.lesson.status.charAt(0).toUpperCase() + reservation.lesson.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Flight/Logbook Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Logbook Entry</Text>
              <TouchableOpacity style={styles.viewButton} onPress={handleViewLogbookEntry}>
                <Icon name="external-link-alt" size={12} color={Colors.neutral.gray600} />
                <Text style={styles.viewButtonText}>View Logbook Entry</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Flight Status</Text>
                <View style={[styles.statusBadge, getStatusStyle(reservation.status)]}>
                  <Text style={[styles.statusText, { color: getStatusStyle(reservation.status).color }]}>
                    {reservation.status}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Flight Time</Text>
                <Text style={styles.detailValue}>2.0 hours</Text>
              </View>
              <View style={styles.detailRowLast}>
                <Text style={styles.detailLabel}>Aircraft</Text>
                <Text style={styles.detailValue}>{reservation.aircraft}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.actionButton} onPress={() => {
          // Navigate to Audio Debrief with lesson data
          const lessonData = {
            id: reservation.id,
            title: reservation.type || 'Training Session',
            description: 'Flight training lesson',
            studentName: reservation.student,
            aircraft: reservation.aircraft,
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            reservationId: reservation.id
          };
          const lessonDataParam = encodeURIComponent(JSON.stringify(lessonData));
          navigation.navigate('AudioDebrief' as never, {
            id: reservation.id,
            lessonData: lessonDataParam
          } as never);
        }}>
          <Icon name="play" size={16} color={Colors.brand.cyan} />
          <Text style={styles.actionButtonText}>Begin Debrief</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delete Reservation</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Icon name="times" size={20} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalText}>
              Are you sure you want to delete this reservation?
            </Text>
            
            <View style={styles.modalReservationInfo}>
              <Text style={styles.modalReservationText}>
                {reservation.aircraft} - {reservation.student}
              </Text>
              <Text style={styles.modalReservationDate}>
                {reservation.date} at {reservation.startTime}
              </Text>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalDeleteButton}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.modalDeleteText}>Delete Reservation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Photo Modal */}
      <Modal visible={showProfileModal} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.profileModalOverlay}
          onPress={() => setShowProfileModal(false)}
          activeOpacity={1}
        >
          <View style={styles.profileModalContainer}>
            <TouchableOpacity 
              style={styles.profileCloseButton}
              onPress={() => setShowProfileModal(false)}
            >
              <Icon name="times" size={16} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <Image 
              source={{ uri: `https://i.pravatar.cc/320?seed=${reservation.student}` }}
              style={styles.profileModalImage}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fontFamily.regular,
  },
  errorText: {
    fontSize: 18,
    color: Colors.neutral.gray900,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 8,
  },
  goBackText: {
    fontSize: 14,
    color: Colors.brand.blueAzure,
    fontFamily: Typography.fontFamily.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 2,
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
    top: 64,
    right: 16,
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    paddingVertical: 4,
    minWidth: 180,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemDanger: {
    // No additional styles needed, color handled by text/icon
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  dropdownTextDanger: {
    color: Colors.status.error,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: Colors.neutral.gray200,
    marginVertical: 4,
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
    paddingBottom: 100, // Extra padding for bottom action
  },
  section: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.gray50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  timeInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray700,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray700,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sessionType: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
  },
  detailsGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  detailRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  preflightSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8FDFC',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  preflightIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    marginTop: 2,
  },
  preflightContent: {
    flex: 1,
  },
  preflightTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0891B2',
    marginBottom: 4,
  },
  preflightSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  preflightButton: {
    backgroundColor: '#212121',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  preflightButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profilePicture: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  personType: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    marginLeft: 4,
  },
  lessonContent: {
    marginTop: 0,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  lessonDetails: {
    gap: 12,
  },
  flightDetails: {
    gap: 12,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 24,
    margin: 16,
    maxWidth: 400,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  modalText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 16,
  },
  modalReservationInfo: {
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  modalReservationText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  modalReservationDate: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
  },
  modalDeleteButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.status.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalDeleteText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  profileModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModalContainer: {
    position: 'relative',
  },
  profileCloseButton: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  profileModalImage: {
    width: 320,
    height: 320,
    borderRadius: 16,
  },
});
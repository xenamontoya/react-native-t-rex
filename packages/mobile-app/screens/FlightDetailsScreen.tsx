import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

interface FlightDetailsProps {
  navigation: any;
  route: any;
}

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ 
  isVisible, 
  onClose, 
  onConfirm, 
  flight 
}: { 
  isVisible: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  flight: any; 
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Delete Flight</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Icon name="times" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to delete this flight?
          </Text>
          <View style={styles.flightPreview}>
            <View style={styles.flightPreviewContent}>
              <Text style={styles.flightPreviewNumber}>
                {flight.flight_number || flight.ident || 'Flight'}
              </Text>
              <Text style={styles.flightPreviewRoute}>
                {typeof flight.origin === 'string' ? flight.origin : flight.origin?.code || 'N/A'} → {typeof flight.destination === 'string' ? flight.destination : flight.destination?.code || 'N/A'}
              </Text>
            </View>
            <Text style={styles.flightPreviewDate}>
              {flight.scheduled_out ? new Date(flight.scheduled_out).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }) : 'N/A'}
            </Text>
          </View>
        </View>
        
        <View style={styles.modalActions}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Flight</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Helper function to normalize status capitalization
const normalizeStatus = (status: string): string => {
  if (!status) return 'Scheduled';
  if (status.toLowerCase() === 'draft') return 'Scheduled';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Helper function to get status pill styling
const getStatusPillStyle = (status: string) => {
  const normalizedStatus = normalizeStatus(status);
  
  switch (normalizedStatus) {
    case 'Scheduled':
      return { backgroundColor: '#FEF3CD', color: '#D97706' };
    case 'Completed':
      return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
    default:
      return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
  }
};

export default function FlightDetailsScreen({ navigation, route }: FlightDetailsProps) {
  const navigationHook = useNavigation();
  const routeHook = useRoute();
  
  // Use passed props or hooks as fallback
  const nav = navigation || navigationHook;
  const routeParams = route || routeHook;

  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<View>(null);

  // Get screen dimensions
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    // Parse flight data from route params
    try {
      const params = routeParams?.params as any;
      if (params?.flightData && typeof params.flightData === 'string') {
        const parsedFlight = JSON.parse(decodeURIComponent(params.flightData));
        setFlight(parsedFlight);
      } else if (params?.flight) {
        setFlight(params.flight);
      } else {
        // Fallback data
        setFlight({
          id: 'F001',
          flight_number: 'N12345',
          date: '2024-09-20',
          registration: 'N9567L',
          aircraft_type: 'Cessna 172S',
          origin: { code: 'KPHX' },
          destination: { code: 'KLAS' },
          scheduled_out: '2024-09-20T14:30:00Z',
          scheduled_in: '2024-09-20T16:45:00Z',
          total_time: '2.3',
          dual_received: '2.3',
          pic: '0.0',
          solo: '0.0',
          xc: '2.3',
          night: '0.0',
          sim_inst: '0.0',
          actual_inst: '0.0',
          ground: '0.0',
          day_ldg: '2',
          night_ldg: '0',
          instructor: 'Sarah Mitchell - CFI',
          student: 'Alex Johnson',
          remarks: 'Beautiful cross-country flight with excellent visibility. Reviewed radio procedures and navigation techniques.',
          status: 'Completed'
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error parsing flight data:', error);
      setLoading(false);
      nav.goBack();
    }
  }, [routeParams?.params, nav]);

  // Check if this flight has lesson data
  const hasLessonData = () => {
    return !!flight;
  };

  // Get lesson data (actual or fallback)
  const getLessonData = () => {
    if (!flight) return null;
    
    // If flight has actual lesson data, use it
    if (flight.lessonType || flight.lessonGrade || flight.lessonNotes || (flight.lessonObjectives && flight.lessonObjectives.length > 0)) {
      return {
        lessonType: flight.lessonType || 'Flight Training Session',
        lessonGrade: flight.lessonGrade || flight.overallGrade,
        lessonNotes: flight.lessonNotes || flight.overallNotes,
        lessonObjectives: flight.lessonObjectives || [],
        learningObjectives: flight.learningObjectives || [],
        taskGrades: flight.taskGrades || {},
        taskNotes: flight.taskNotes || {},
        overallGrade: flight.overallGrade,
        overallNotes: flight.overallNotes
      };
    }
    
    // Otherwise, provide fallback data
    const flightDate = flight.scheduled_out ? new Date(flight.scheduled_out) : new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isFlightInPast = flightDate < today;
    const hasFlightTime = flight.total_time && parseFloat(flight.total_time) > 0;
    const isCompleted = hasFlightTime && isFlightInPast;
    
    return {
      lessonType: 'Flight Training - Pattern Work',
      lessonGrade: isCompleted ? 'Complete' : undefined,
      lessonNotes: isCompleted ? 'Great progress on landing consistency. Continue working on crosswind technique.' : undefined,
      lessonObjectives: [
        'Practice normal takeoffs and landings',
        'Improve traffic pattern procedures',
        'Work on crosswind techniques',
        'Develop consistent approaches'
      ]
    };
  };

  const handleEdit = () => {
    if (!flight) return;
    
    // Navigate to flight details form for editing
    const flightDataParam = encodeURIComponent(JSON.stringify(flight));
    nav.navigate('FlightDetailsForm' as never, {
      id: flight.id,
      flightData: flightDataParam,
      mode: 'edit'
    } as never);
  };

  const handleDelete = () => {
    if (!flight) return;
    
    console.log('Deleting flight:', flight);
    setShowDeleteModal(false);
    nav.goBack();
  };

  const handleViewLesson = () => {
    if (!flight) return;
    
    // Create a lesson object from the flight data
    const lesson = {
      id: `lesson_${flight.reservationId}`,
      title: flight.lessonType || 'Training Session',
      description: `Training session with lesson details`,
      status: 'completed',
      date: flight.scheduled_out ? new Date(flight.scheduled_out).toLocaleDateString() : new Date().toLocaleDateString(),
      duration: flight.total_time ? `${flight.total_time} hours` : '1.0 hours',
      objectives: flight.lessonObjectives || ['Review training objectives'],
      reservationId: flight.reservationId,
      studentName: flight.student || 'Student',
      aircraft: flight.registration,
      grade: flight.lessonGrade,
      instructorNotes: flight.lessonNotes
    };
    
    // Navigate to lesson details page
    const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
    nav.navigate('LessonDetails' as never, {
      id: lesson.id,
      lessonData: lessonDataParam
    } as never);
  };

  const handleViewReservation = () => {
    if (!flight) return;
    
    // Create reservation data from flight
    const reservation = {
      id: flight.reservationId || `res_${flight.id}`,
      aircraft: { tail_number: flight.registration, type: flight.aircraft_type },
      student: flight.student || 'Student',
      instructor: flight.instructor || 'Current Instructor',
      type: flight.type || 'Training Session',
      date: flight.scheduled_out ? new Date(flight.scheduled_out).toLocaleDateString() : new Date().toLocaleDateString(),
      time: flight.scheduled_out ? `${new Date(flight.scheduled_out).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${new Date(flight.scheduled_in).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}` : '14:00 - 16:00',
      status: 'Confirmed',
      flightId: flight.id
    };
    
    const reservationDataParam = encodeURIComponent(JSON.stringify(reservation));
    nav.navigate('ReservationDetails' as never, {
      id: reservation.id,
      reservationData: reservationDataParam
    } as never);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading flight details...</Text>
        </View>
      </View>
    );
  }

  if (!flight) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Flight not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Format times and dates
  const departureTime = flight.scheduled_out ? new Date(flight.scheduled_out).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }) : '';
  const arrivalTime = flight.scheduled_in ? new Date(flight.scheduled_in).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }) : '';

  // Calculate flight duration
  const getFlightDuration = () => {
    if (flight.scheduled_out && flight.scheduled_in) {
      const departure = new Date(flight.scheduled_out);
      const arrival = new Date(flight.scheduled_in);
      const durationMs = arrival.getTime() - departure.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
    return '';
  };

  const statusStyle = getStatusPillStyle(flight.status);

  return (
    <>
      {/* Full screen container */}
      <View style={styles.fullScreenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => nav.goBack()} style={styles.backButton}>
              <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Flight Details</Text>
              <Text style={styles.headerSubtitle}>{flight.flight_number || flight.ident || 'Flight'}</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <View style={styles.dropdownContainer} ref={dropdownRef}>
              <TouchableOpacity
                onPress={() => setShowDropdown(!showDropdown)}
                style={styles.dropdownButton}
              >
                <Icon name="ellipsisV" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
              
              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => { handleEdit(); setShowDropdown(false); }} style={styles.dropdownItem}>
                    <Icon name="edit" size={16} color={Colors.neutral.gray700} />
                    <Text style={styles.dropdownText}>Edit Flight</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowDropdown(false); }} style={styles.dropdownItem}>
                    <Icon name="copy" size={16} color={Colors.neutral.gray700} />
                    <Text style={styles.dropdownText}>Duplicate Flight</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowDeleteModal(true); setShowDropdown(false); }} style={[styles.dropdownItem, styles.dropdownItemDanger]}>
                    <Icon name="trash" size={16} color={Colors.status.error} />
                    <Text style={[styles.dropdownText, styles.dropdownTextDanger]}>Delete Flight</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.contentPadding}>
            
            {/* Responsive Layout: Mobile single column, Tablet two columns */}
            <View style={isTablet ? styles.twoColumnLayout : styles.singleColumnLayout}>
              
              {/* Left Column */}
              <View style={styles.leftColumn}>
                {/* Route Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Route</Text>
                  <View style={styles.routeContainer}>
                    <View style={styles.routeAirports}>
                      {/* Origin */}
                      <View style={styles.airportContainer}>
                        <View style={styles.airportCode}>
                          <Text style={styles.airportCodeText}>
                            {typeof flight.origin === 'string' ? flight.origin : flight.origin?.code || ''}
                          </Text>
                        </View>
                        <Text style={styles.airportLabel}>Departure</Text>
                        <Text style={styles.airportTime}>{departureTime}</Text>
                      </View>
                      
                      {/* Route line */}
                      <View style={styles.routeLine}>
                        <View style={styles.routeDots}>
                          {[...Array(8)].map((_, i) => (
                            <View key={i} style={styles.routeDot} />
                          ))}
                        </View>
                      </View>
                      
                      {/* Destination */}
                      <View style={styles.airportContainer}>
                        <View style={[styles.airportCode, styles.airportCodeDestination]}>
                          <Text style={styles.airportCodeText}>
                            {typeof flight.destination === 'string' ? flight.destination : flight.destination?.code || ''}
                          </Text>
                        </View>
                        <Text style={styles.airportLabel}>Arrival</Text>
                        <Text style={styles.airportTime}>{arrivalTime}</Text>
                      </View>
                    </View>
                    
                    {/* Flight Duration */}
                    <View style={styles.durationContainer}>
                      <Text style={styles.durationLabel}>Flight Duration</Text>
                      <Text style={styles.durationValue}>{flight.total_time || getFlightDuration() || '0.0'}</Text>
                    </View>
                  </View>
                </View>

                {/* Flight Details Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Flight Details</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Flight Number</Text>
                      <Text style={styles.detailValue}>{flight.flight_number || flight.ident || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Aircraft ID</Text>
                      <Text style={styles.detailValue}>{flight.registration || flight.aircraft_id || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Aircraft Type</Text>
                      <Text style={styles.detailValue}>{flight.aircraft_type || 'N/A'}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.detailRowLast]}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <View style={[styles.statusPill, { backgroundColor: statusStyle.backgroundColor }]}>
                        <Text style={[styles.statusText, { color: statusStyle.color }]}>
                          {normalizeStatus(flight.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Time Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Time</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Total Time</Text>
                      <Text style={styles.detailValue}>{flight.total_time || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Dual Received</Text>
                      <Text style={styles.detailValue}>{flight.dual_received || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>PIC</Text>
                      <Text style={styles.detailValue}>{flight.pic || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Solo</Text>
                      <Text style={styles.detailValue}>{flight.solo || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>XC</Text>
                      <Text style={styles.detailValue}>{flight.xc || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Night</Text>
                      <Text style={styles.detailValue}>{flight.night || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Sim Inst</Text>
                      <Text style={styles.detailValue}>{flight.sim_inst || '0.0'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Actual Inst</Text>
                      <Text style={styles.detailValue}>{flight.actual_inst || '0.0'}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.detailRowLast]}>
                      <Text style={styles.detailLabel}>Ground</Text>
                      <Text style={styles.detailValue}>{flight.ground || '0.0'}</Text>
                    </View>
                  </View>
                </View>

                {/* Landings Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Landings</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Day Ldg</Text>
                      <Text style={styles.detailValue}>{flight.day_ldg || '0'}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.detailRowLast]}>
                      <Text style={styles.detailLabel}>Night Ldg</Text>
                      <Text style={styles.detailValue}>{flight.night_ldg || '0'}</Text>
                    </View>
                  </View>
                </View>

                {/* Crew Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Crew</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Instructor</Text>
                      <Text style={styles.detailValue}>{flight.instructor || 'N/A'}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.detailRowLast]}>
                      <Text style={styles.detailLabel}>Student</Text>
                      <Text style={styles.detailValue}>{flight.student || 'N/A'}</Text>
                    </View>
                  </View>
                </View>

                {/* Notes Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Notes</Text>
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesSubtitle}>Remarks</Text>
                    <View style={styles.remarksContainer}>
                      {flight.remarks ? (
                        <Text style={styles.remarksText}>{flight.remarks}</Text>
                      ) : (
                        <Text style={styles.remarksPlaceholder}>No remarks added</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                {/* Reservation Details Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Reservation Details</Text>
                    <TouchableOpacity onPress={handleViewReservation} style={styles.viewButton}>
                      <Icon name="externalLink" size={12} color={Colors.neutral.gray600} />
                      <Text style={styles.viewButtonText}>View Reservation</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.detailsContainer}>
                    {flight.scheduled_out && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Scheduled Date</Text>
                        <Text style={styles.detailValue}>
                          {new Date(flight.scheduled_out).toLocaleDateString()}
                        </Text>
                      </View>
                    )}
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>
                        {flight.total_time ? `${flight.total_time} hours` : '2.0 hours'}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Aircraft</Text>
                      <Text style={styles.detailValue}>{flight.registration}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.detailRowLast]}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <View style={[styles.statusPill, { backgroundColor: statusStyle.backgroundColor }]}>
                        <Text style={[styles.statusText, { color: statusStyle.color }]}>
                          {(() => {
                            const flightDate = flight.scheduled_out ? new Date(flight.scheduled_out) : new Date();
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const isFlightInPast = flightDate < today;
                            const hasFlightTime = flight.total_time && parseFloat(flight.total_time) > 0;
                            const isCompleted = hasFlightTime && isFlightInPast;
                            return isCompleted ? 'Completed' : 'Confirmed';
                          })()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Lesson Details Section */}
                {hasLessonData() && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Lesson Details</Text>
                      <TouchableOpacity onPress={handleViewLesson} style={styles.viewButton}>
                        <Icon name="externalLink" size={12} color={Colors.neutral.gray600} />
                        <Text style={styles.viewButtonText}>View Lesson</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                      {(() => {
                        const lessonData = getLessonData();
                        if (!lessonData) return null;
                        
                        return (
                          <>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailLabel}>Lesson Type</Text>
                              <Text style={styles.detailValue}>{lessonData.lessonType}</Text>
                            </View>

                            {lessonData.lessonGrade && (
                              <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Grade</Text>
                                <View style={[styles.statusPill, { backgroundColor: 'rgba(0, 255, 242, 0.15)' }]}>
                                  <Text style={[styles.statusText, { color: '#004D47' }]}>
                                    {lessonData.lessonGrade}
                                  </Text>
                                </View>
                              </View>
                            )}

                            {lessonData.lessonObjectives && lessonData.lessonObjectives.length > 0 && (
                              <View style={[styles.detailRow, styles.detailRowLast]}>
                                <Text style={styles.detailLabel}>Learning Objectives</Text>
                                <View style={styles.objectivesList}>
                                  {lessonData.lessonObjectives.slice(0, 3).map((objective: string, index: number) => (
                                    <Text key={index} style={styles.objectiveItem}>
                                      {objective}
                                    </Text>
                                  ))}
                                  {lessonData.lessonObjectives.length > 3 && (
                                    <Text style={styles.objectivesMore}>
                                      +{lessonData.lessonObjectives.length - 3} more objectives
                                    </Text>
                                  )}
                                </View>
                              </View>
                            )}
                          </>
                        );
                      })()}
                    </View>
                  </View>
                )}

                {/* Weather Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Weather Conditions</Text>
                  <View style={styles.weatherContainer}>
                    <View style={styles.weatherPlaceholder}>
                      <Icon name="sun" size={24} color={Colors.neutral.gray400} />
                      <Text style={styles.weatherText}>Weather data will appear here</Text>
                      <Text style={styles.weatherSubtext}>When departure and arrival airports are set</Text>
                    </View>
                  </View>
                </View>

                {/* Flight Map Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Flight Route</Text>
                  <View style={styles.mapContainer}>
                    <View style={styles.mapPlaceholder}>
                      <Icon name="map" size={24} color={Colors.neutral.gray400} />
                      <Text style={styles.mapText}>Interactive flight route map</Text>
                    </View>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        flight={flight}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary.white,
    zIndex: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fontFamily.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.status.error,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.brand.blueAzure,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitleContainer: {
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
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    width: 192,
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    paddingVertical: 4,
    zIndex: 9999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdownItemDanger: {
    // No additional styling needed, color is handled by text
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    marginLeft: 12,
  },
  dropdownTextDanger: {
    color: Colors.status.error,
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 24,
    paddingBottom: 96, // Extra padding for bottom nav
  },
  singleColumnLayout: {
    // Default flex column layout
  },
  twoColumnLayout: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginLeft: 4,
  },
  routeContainer: {
    // Route specific styles
  },
  routeAirports: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  airportContainer: {
    flex: 1,
    alignItems: 'center',
  },
  airportCode: {
    width: 64,
    height: 64,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  airportCodeDestination: {
    backgroundColor: Colors.neutral.gray200,
  },
  airportCodeText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray800,
  },
  airportLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  airportTime: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  routeLine: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  routeDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.primary.black,
    borderRadius: 3,
  },
  durationContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 8,
  },
  durationValue: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  detailsContainer: {
    // Container for detail rows
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  notesContainer: {
    // Notes specific styles
  },
  notesSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    marginBottom: 8,
  },
  remarksContainer: {
    minHeight: 80,
  },
  remarksText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    lineHeight: 20,
  },
  remarksPlaceholder: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray400,
    fontStyle: 'italic',
  },
  objectivesList: {
    flex: 1,
    marginLeft: 16,
  },
  objectiveItem: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  objectivesMore: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray400,
  },
  weatherContainer: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
  },
  weatherPlaceholder: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  weatherSubtext: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray400,
    marginTop: 4,
  },
  mapContainer: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
  mapText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9995,
  },
  modalContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 24,
    maxWidth: 400,
    width: '90%',
    marginHorizontal: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    marginBottom: 24,
  },
  modalText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  flightPreview: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 12,
  },
  flightPreviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightPreviewNumber: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  flightPreviewRoute: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginLeft: 8,
  },
  flightPreviewDate: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.status.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.white,
  },
});
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  RefreshControl,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

interface Flight {
  id: string;
  flightNumber: string;
  aircraft: string;
  aircraftType: string;
  origin: string;
  destination: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: string;
  instructor?: string;
  totalTime?: string;
  route?: string;
  scheduledOut?: string;
  scheduledIn?: string;
  actualOut?: string;
  actualIn?: string;
}

export default function StudentMyFlights({ navigation }: any) {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      flightNumber: 'TRN001',
      aircraft: 'N12345',
      aircraftType: 'Cessna 172',
      origin: 'KPAO',
      destination: 'KPAO',
      date: '2024-03-15',
      status: 'scheduled',
      duration: '1.5',
      instructor: 'John Smith',
      scheduledOut: '09:00',
      scheduledIn: '10:30',
    },
    {
      id: '2',
      flightNumber: 'TRN002',
      aircraft: 'N67890',
      aircraftType: 'Cessna 172',
      origin: 'KPAO',
      destination: 'KSQL',
      date: '2024-03-12',
      status: 'completed',
      duration: '2.0',
      instructor: 'Jane Davis',
      totalTime: '2.0',
      actualOut: '14:00',
      actualIn: '16:00',
    },
    {
      id: '3',
      flightNumber: 'TRN003',
      aircraft: 'N12345',
      aircraftType: 'Cessna 172',
      origin: 'KPAO',
      destination: 'KHAF',
      date: '2024-03-10',
      status: 'completed',
      duration: '1.8',
      instructor: 'John Smith',
      totalTime: '1.8',
      actualOut: '10:00',
      actualIn: '11:48',
    },
  ]);

  const [currentView, setCurrentView] = useState<'list' | 'map'>('list');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showFlightDetails, setShowFlightDetails] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { bg: 'rgba(246, 163, 69, 0.15)', text: '#C44510' };
      case 'completed':
        return { bg: 'rgba(0, 255, 242, 0.15)', text: '#004D47' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: Colors.neutral.gray100, text: Colors.neutral.gray600 };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return timeString;
  };

  const handleFlightPress = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowFlightDetails(true);
  };

  const handleAddFlight = () => {
    navigation.navigate('AddFlightScreen');
  };

  const handleImportFlights = () => {
    Alert.alert(
      'Import Flights',
      'Import flights from your logbook or other sources.',
      [{ text: 'OK' }]
    );
  };

  const separateFlights = () => {
    const upcoming = flights.filter(flight => flight.status === 'scheduled');
    const past = flights.filter(flight => flight.status === 'completed');
    return { upcoming, past };
  };

  const { upcoming, past } = separateFlights();

  const FlightCard = ({ flight }: { flight: Flight }) => {
    const statusStyle = getStatusColor(flight.status);
    
    return (
      <TouchableOpacity
        style={[
          styles.flightCard,
          flight.status === 'scheduled' && { borderColor: '#F26C2E', borderWidth: 1 }
        ]}
        onPress={() => handleFlightPress(flight)}
      >
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.flightDate}>
              {formatDate(flight.date)}
            </Text>
            <Text style={styles.aircraftNumber}>
              {flight.aircraft}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Route Information */}
        <View style={styles.routeContainer}>
          <View style={styles.airportContainer}>
            <Text style={styles.airportCode}>{flight.origin}</Text>
            {(flight.scheduledOut || flight.actualOut) && (
              <Text style={styles.timeText}>
                {formatTime(flight.actualOut || flight.scheduledOut)}
              </Text>
            )}
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <Icon name="plane" size={16} color={Colors.primary.black} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          
          <View style={styles.airportContainer}>
            <Text style={styles.airportCode}>{flight.destination}</Text>
            {(flight.scheduledIn || flight.actualIn) && (
              <Text style={styles.timeText}>
                {formatTime(flight.actualIn || flight.scheduledIn)}
              </Text>
            )}
          </View>
        </View>

        {/* Details Row */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Aircraft:</Text>
            <Text style={styles.detailValue}>{flight.aircraftType}</Text>
          </View>
          {flight.instructor && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Instructor:</Text>
              <Text style={styles.detailValue}>{flight.instructor}</Text>
            </View>
          )}
        </View>

        {/* Duration */}
        <View style={styles.durationRow}>
          <Icon name="clock" size={14} color={Colors.neutral.gray500} />
          <Text style={styles.durationText}>
            {flight.totalTime || flight.duration} hours
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="plane" size={48} color={Colors.neutral.gray300} />
      <Text style={styles.emptyStateTitle}>No flights yet</Text>
      <Text style={styles.emptyStateText}>
        Your training flights will appear here once scheduled or completed.
      </Text>
      <TouchableOpacity style={styles.addFlightButton} onPress={handleAddFlight}>
        <Text style={styles.addFlightButtonText}>Schedule Your First Flight</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Flights</Text>
        <TouchableOpacity onPress={handleAddFlight} style={styles.addButton}>
          <Icon name="plus" size={20} color={Colors.primary.white} />
        </TouchableOpacity>
      </View>

      {/* View Toggle */}
      {flights.length > 0 && (
        <View style={styles.viewToggle}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                currentView === 'list' && styles.toggleButtonActive
              ]}
              onPress={() => setCurrentView('list')}
            >
              <Icon name="list" size={16} color={
                currentView === 'list' ? Colors.primary.black : Colors.neutral.gray600
              } />
              <Text style={[
                styles.toggleText,
                currentView === 'list' && styles.toggleTextActive
              ]}>
                List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                currentView === 'map' && styles.toggleButtonActive
              ]}
              onPress={() => setCurrentView('map')}
            >
              <Icon name="map" size={16} color={
                currentView === 'map' ? Colors.primary.black : Colors.neutral.gray600
              } />
              <Text style={[
                styles.toggleText,
                currentView === 'map' && styles.toggleTextActive
              ]}>
                Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Content */}
      {flights.length === 0 ? (
        <EmptyState />
      ) : currentView === 'map' ? (
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={48} color={Colors.neutral.gray300} />
          <Text style={styles.mapPlaceholderText}>
            Map view will show your flight routes
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Upcoming Flights */}
          {upcoming.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Flights</Text>
              {upcoming.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </View>
          )}

          {/* Past Flights */}
          {past.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Flights</Text>
              {past.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddFlight}
      >
        <Icon name="plus" size={24} color="#00FFF2" />
      </TouchableOpacity>

      {/* Flight Details Modal */}
      <Modal
        visible={showFlightDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFlightDetails(false)}
      >
        {selectedFlight && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowFlightDetails(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="x" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Flight Details</Text>
              <View style={styles.modalHeaderSpacer} />
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Flight Information</Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Flight:</Text>
                  <Text style={styles.modalValue}>{selectedFlight.flightNumber}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Date:</Text>
                  <Text style={styles.modalValue}>{formatDate(selectedFlight.date)}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Aircraft:</Text>
                  <Text style={styles.modalValue}>
                    {selectedFlight.aircraft} - {selectedFlight.aircraftType}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Route:</Text>
                  <Text style={styles.modalValue}>
                    {selectedFlight.origin} → {selectedFlight.destination}
                  </Text>
                </View>
                {selectedFlight.instructor && (
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Instructor:</Text>
                    <Text style={styles.modalValue}>{selectedFlight.instructor}</Text>
                  </View>
                )}
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Duration:</Text>
                  <Text style={styles.modalValue}>
                    {selectedFlight.totalTime || selectedFlight.duration} hours
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.primary.white,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggle: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  toggleTextActive: {
    color: Colors.primary.black,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  flightCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  flightDate: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aircraftNumber: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  airportContainer: {
    alignItems: 'center',
    flex: 1,
  },
  airportCode: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  timeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 4,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary.black,
  },
  line: {
    width: 16,
    height: 1,
    backgroundColor: Colors.primary.black,
    marginHorizontal: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  addFlightButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFlightButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.black,
    borderWidth: 3,
    borderColor: '#00FFF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  modalHeaderSpacer: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  modalLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  modalValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  bottomPadding: {
    height: 100,
  },
});

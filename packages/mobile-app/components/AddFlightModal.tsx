import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';
import AdaptiveBottomSheet from './AdaptiveBottomSheet';
import { useFlightStore } from '../utils/flightStore';

interface AddFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Flight {
  ident: string;
  fa_flight_id: string;
  origin: { code: string };
  destination: { code: string };
  scheduled_out: string;
  scheduled_in: string;
  status?: string;
  cancelled?: boolean;
  departure_delay?: number;
  aircraft_type?: string;
  operator?: string;
  registration?: string;
  tail_number?: string;
  aircraft_model?: string;
  duration?: number;
}

type View = 'input' | 'loading' | 'results' | 'error' | 'flightDetails';

const AddFlightModal: React.FC<AddFlightModalProps> = ({ isOpen, onClose }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [currentView, setCurrentView] = useState<View>('input');
  const [flights, setFlights] = useState<{ upcoming: Flight[], en_route: Flight[], past: Flight[] }>({ 
    upcoming: [], 
    en_route: [], 
    past: [] 
  });
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const setSelectedFlightInStore = useFlightStore((state) => state.setSelectedFlight);

  // Function to detect search type based on input format
  const detectSearchType = (input: string): 'tailNumber' | 'flightNumber' => {
    const trimmed = input.trim().toUpperCase();
    
    // Tail number patterns: N123AB, C-GABC, G-ABCD, etc.
    const tailNumberPattern = /^[A-Z]-?[A-Z0-9]{1,5}$|^[A-Z]{1,2}[0-9]{1,4}[A-Z]{1,3}$/;
    
    // Flight number patterns: AA123, UA456, DL789, etc.
    const flightNumberPattern = /^[A-Z]{2,3}[0-9]{1,4}$/;
    
    if (tailNumberPattern.test(trimmed)) {
      return 'tailNumber';
    } else if (flightNumberPattern.test(trimmed)) {
      return 'flightNumber';
    }
    
    // Default to tail number for ambiguous cases
    return 'tailNumber';
  };

  const handleSearch = async () => {
    if (!flightNumber.trim()) return;
    
    setCurrentView('loading');
    setError('');

    const searchType = detectSearchType(flightNumber);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock flights for demonstration
      const mockFlights: Flight[] = [];
      const now = new Date();
      
      // Generate different mock data based on the search query
      const queryHash = flightNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const routeIndex = queryHash % 5; // 5 different routes
      
      const mockRoutes = [
        { from: 'KPAO', to: 'KPAO', airline: 'Flight Training' },
        { from: 'KRHV', to: 'KRHV', airline: 'Flight Training' },
        { from: 'KLVK', to: 'KLVK', airline: 'Flight Training' },
        { from: 'KHWD', to: 'KHWD', airline: 'Flight Training' },
        { from: 'KSQL', to: 'KSQL', airline: 'Flight Training' }
      ];
      
      const selectedRoute = mockRoutes[routeIndex];
      
      if (searchType === 'tailNumber') {
        // Mock data for tail numbers - show multiple flights with different statuses
        
        // Past flights (completed)
        for (let i = 1; i <= 3; i++) {
          const pastDeparture = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000));
          const pastArrival = new Date(pastDeparture.getTime() + (3 + i) * 60 * 60 * 1000);
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_past_${i}_${Date.now()}`,
            origin: { code: selectedRoute.from },
            destination: { code: selectedRoute.to },
            scheduled_out: pastDeparture.toISOString(),
            scheduled_in: pastArrival.toISOString(),
            status: 'Arrived',
            cancelled: false,
            departure_delay: Math.floor(Math.random() * 30),
            aircraft_type: 'Cessna 172',
            operator: selectedRoute.airline
          });
        }
        
        // En route flights
        for (let i = 1; i <= 2; i++) {
          const enRouteDeparture = new Date(now.getTime() - (i * 2 * 60 * 60 * 1000));
          const enRouteArrival = new Date(now.getTime() + (i * 2 * 60 * 60 * 1000));
          
          const enRouteStatuses = ['En Route', 'In Flight', 'Airborne', 'Cruising'];
          const randomStatus = enRouteStatuses[Math.floor(Math.random() * enRouteStatuses.length)];
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_enroute_${i}_${Date.now()}`,
            origin: { code: selectedRoute.from },
            destination: { code: selectedRoute.to },
            scheduled_out: enRouteDeparture.toISOString(),
            scheduled_in: enRouteArrival.toISOString(),
            status: randomStatus,
            cancelled: false,
            departure_delay: Math.floor(Math.random() * 45),
            aircraft_type: 'Cessna 152',
            operator: selectedRoute.airline
          });
        }
        
        // Upcoming flights
        for (let i = 1; i <= 3; i++) {
          const upcomingDeparture = new Date(now.getTime() + (i * 4 * 60 * 60 * 1000));
          const upcomingArrival = new Date(upcomingDeparture.getTime() + (3 + i) * 60 * 60 * 1000);
          
          const upcomingStatuses = ['Scheduled', 'Boarding', 'Gate', 'Delayed'];
          const randomStatus = upcomingStatuses[Math.floor(Math.random() * upcomingStatuses.length)];
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_upcoming_${i}_${Date.now()}`,
            origin: { code: selectedRoute.from },
            destination: { code: selectedRoute.to },
            scheduled_out: upcomingDeparture.toISOString(),
            scheduled_in: upcomingArrival.toISOString(),
            status: randomStatus,
            cancelled: false,
            departure_delay: randomStatus === 'Delayed' ? Math.floor(Math.random() * 120) : 0,
            aircraft_type: 'Piper PA-28',
            operator: selectedRoute.airline
          });
        }
      } else {
        // Mock data for flight numbers - show multiple flights with different routes and statuses
        
        // Past flights (completed)
        for (let i = 1; i <= 4; i++) {
          const route = mockRoutes[(routeIndex + i) % 5];
          const pastDeparture = new Date(now.getTime() - (i * 12 * 60 * 60 * 1000));
          const pastArrival = new Date(pastDeparture.getTime() + (2 + i) * 60 * 60 * 1000);
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_past_${i}_${Date.now()}`,
            origin: { code: route.from },
            destination: { code: route.to },
            scheduled_out: pastDeparture.toISOString(),
            scheduled_in: pastArrival.toISOString(),
            status: 'Arrived',
            cancelled: false,
            departure_delay: Math.floor(Math.random() * 25),
            aircraft_type: i % 2 === 0 ? 'Cessna 172' : 'Cessna 152',
            operator: route.airline
          });
        }
        
        // En route flights
        for (let i = 1; i <= 3; i++) {
          const route = mockRoutes[(routeIndex + i + 1) % 5];
          const enRouteDeparture = new Date(now.getTime() - (i * 3 * 60 * 60 * 1000));
          const enRouteArrival = new Date(now.getTime() + (i * 3 * 60 * 60 * 1000));
          
          const enRouteStatuses = ['En Route', 'In Flight', 'Airborne', 'Cruising', 'Climbing'];
          const randomStatus = enRouteStatuses[Math.floor(Math.random() * enRouteStatuses.length)];
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_enroute_${i}_${Date.now()}`,
            origin: { code: route.from },
            destination: { code: route.to },
            scheduled_out: enRouteDeparture.toISOString(),
            scheduled_in: enRouteArrival.toISOString(),
            status: randomStatus,
            cancelled: false,
            departure_delay: Math.floor(Math.random() * 60),
            aircraft_type: i % 2 === 0 ? 'Piper PA-28' : 'Diamond DA20',
            operator: route.airline
          });
        }
        
        // Upcoming flights
        for (let i = 1; i <= 4; i++) {
          const route = mockRoutes[(routeIndex + i + 2) % 5];
          const upcomingDeparture = new Date(now.getTime() + (i * 6 * 60 * 60 * 1000));
          const upcomingArrival = new Date(upcomingDeparture.getTime() + (2 + i) * 60 * 60 * 1000);
          
          const upcomingStatuses = ['Scheduled', 'Boarding', 'Gate', 'Delayed', 'On Time'];
          const randomStatus = upcomingStatuses[Math.floor(Math.random() * upcomingStatuses.length)];
          
          mockFlights.push({
            ident: flightNumber.toUpperCase(),
            fa_flight_id: `mock_upcoming_${i}_${Date.now()}`,
            origin: { code: route.from },
            destination: { code: route.to },
            scheduled_out: upcomingDeparture.toISOString(),
            scheduled_in: upcomingArrival.toISOString(),
            status: randomStatus,
            cancelled: false,
            departure_delay: randomStatus === 'Delayed' ? Math.floor(Math.random() * 180) : 0,
            aircraft_type: i % 2 === 0 ? 'Cessna 172SP' : 'Cessna 152',
            operator: route.airline
          });
        }
      }
      
      // Categorize flights
      const upcoming = mockFlights.filter(f => {
        const scheduledOut = new Date(f.scheduled_out);
        const status = f.status?.toLowerCase() || '';
        return (scheduledOut > now || 
                status.includes('scheduled') || 
                status.includes('boarding') ||
                status.includes('gate') ||
                status.includes('delayed') ||
                status === '') && 
               !f.cancelled && 
               f.status !== 'Cancelled' && 
               !status.includes('arrived') &&
               !status.includes('landed') &&
               !status.includes('completed');
      });
      
      const en_route = mockFlights.filter(f => {
        const status = f.status?.toLowerCase() || '';
        return status.includes('en route') || 
               status.includes('in flight') || 
               status.includes('airborne') ||
               status.includes('taxiing') ||
               status.includes('departed') ||
               status.includes('left gate') ||
               status.includes('takeoff') ||
               status.includes('climbing') ||
               status.includes('cruising');
      });
      
      const past = mockFlights.filter(f => {
        const status = f.status?.toLowerCase() || '';
        return f.cancelled || 
               f.status === 'Cancelled' || 
               status.includes('arrived') ||
               status.includes('landed') ||
               status.includes('completed') ||
               status.includes('terminated');
      });
      
      setFlights({ upcoming, en_route, past });
      setCurrentView('results');
      
    } catch (err: any) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
      setCurrentView('error');
    }
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentView('flightDetails');
  };

  const handleAddFlight = (flight: Flight) => {
    // Set selected flight for logbook form
    const flightData = {
      ident: flight.ident,
      flight_number: flight.ident,
      registration: flight.registration || flight.tail_number || '',
      aircraft_type: flight.aircraft_type || flight.aircraft_model || '',
      origin: flight.origin,
      destination: flight.destination,
      scheduled_out: flight.scheduled_out,
      scheduled_in: flight.scheduled_in,
      duration: flight.duration,
      operator: flight.operator || '',
      operator_iata: '',
      aircraft_manufacturer: '',
      aircraft_model: flight.aircraft_model || '',
    };
    
    setSelectedFlightInStore(flightData);
    onClose();
    
    // Navigate to logbook
    setTimeout(() => {
      navigation.navigate('Logbook' as never);
    }, 100);
  };

  const getStatusStyle = (flight: Flight) => {
    if (flight.cancelled) return { backgroundColor: Colors.status.error, color: Colors.neutral.white };
    const delay = flight.departure_delay || 0;
    if (delay > 0) return { backgroundColor: Colors.status.warning, color: Colors.neutral.black };
    return { backgroundColor: Colors.status.success, color: Colors.neutral.white };
  };

  const getStatusText = (flight: Flight) => {
    if (flight.cancelled) return 'Cancelled';
    const delay = flight.departure_delay || 0;
    if (delay > 0) return 'Delayed';
    return 'On Time';
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (flight: Flight) => {
    const durationMs = new Date(flight.scheduled_in).getTime() - new Date(flight.scheduled_out).getTime();
    const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 10) / 10;
    return `${durationHours} hours`;
  };

  const renderFlightCard = (flight: Flight) => (
    <TouchableOpacity
      key={flight.fa_flight_id}
      style={styles.flightCard}
      onPress={() => handleFlightSelect(flight)}
    >
      <View style={styles.flightHeader}>
        <Text style={styles.flightNumber}>{flight.ident}</Text>
        <View style={[styles.statusBadge, getStatusStyle(flight)]}>
          <Text style={[styles.statusText, { color: getStatusStyle(flight).color }]}>
            {getStatusText(flight)}
          </Text>
        </View>
      </View>
      
      <View style={styles.routeContainer}>
        <View style={styles.airportCode}>
          <Text style={styles.airportText}>{flight.origin.code}</Text>
        </View>
        <View style={styles.routeLine}>
          <View style={styles.routeDot} />
          <View style={styles.routeDash} />
          <View style={styles.routeDot} />
        </View>
        <View style={styles.airportCode}>
          <Text style={styles.airportText}>{flight.destination.code}</Text>
        </View>
      </View>
      
      <View style={styles.flightDetails}>
        <Text style={styles.flightTime}>
          {formatTime(flight.scheduled_out)} - {formatTime(flight.scheduled_in)}
        </Text>
        <Text style={styles.flightDuration}>{formatDuration(flight)}</Text>
      </View>
      
      {flight.aircraft_type && (
        <Text style={styles.aircraftType}>{flight.aircraft_type}</Text>
      )}
    </TouchableOpacity>
  );

  const renderFlightDetails = () => {
    if (!selectedFlight) return null;

    return (
      <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity
            onPress={() => setCurrentView('input')}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>Flight Details</Text>
        </View>

        {/* Route Information */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Route</Text>
          <View style={styles.routeDetails}>
            <View style={styles.routeEndpoint}>
              <View style={styles.routeAirport}>
                <Text style={styles.routeAirportCode}>{selectedFlight.origin.code}</Text>
              </View>
              <Text style={styles.routeLabel}>Departure</Text>
              <Text style={styles.routeTime}>{formatTime(selectedFlight.scheduled_out)}</Text>
            </View>
            
            <View style={styles.routeVisualization}>
              <View style={styles.routeDots}>
                <View style={styles.routeDot} />
                <View style={styles.routeDot} />
                <View style={styles.routeDot} />
                <View style={styles.routeDot} />
                <View style={styles.routeDot} />
              </View>
            </View>
            
            <View style={styles.routeEndpoint}>
              <View style={styles.routeAirport}>
                <Text style={styles.routeAirportCode}>{selectedFlight.destination.code}</Text>
              </View>
              <Text style={styles.routeLabel}>Arrival</Text>
              <Text style={styles.routeTime}>{formatTime(selectedFlight.scheduled_in)}</Text>
            </View>
          </View>
          
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Flight Duration</Text>
            <Text style={styles.durationValue}>{formatDuration(selectedFlight)}</Text>
          </View>
        </View>

        {/* Flight Information */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Flight Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Flight Number</Text>
              <Text style={styles.infoValue}>{selectedFlight.ident}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                {new Date(selectedFlight.scheduled_out).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={[styles.statusBadge, getStatusStyle(selectedFlight)]}>
                <Text style={[styles.statusText, { color: getStatusStyle(selectedFlight).color }]}>
                  {getStatusText(selectedFlight)}
                </Text>
              </View>
            </View>
            {selectedFlight.aircraft_type && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Aircraft Type</Text>
                <Text style={styles.infoValue}>{selectedFlight.aircraft_type}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => setCurrentView('input')}
          >
            <Text style={styles.secondaryButtonText}>Search Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleAddFlight(selectedFlight)}
          >
            <Icon name="plus" size={16} color={Colors.neutral.white} />
            <Text style={styles.primaryButtonText}>Add Flight</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.manualEntryButton}
          onPress={() => {
            onClose();
            navigation.navigate('Logbook' as never);
          }}
        >
          <Text style={styles.manualEntryText}>Enter Details Manually</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderResults = () => {
    const totalFlights = flights.upcoming.length + flights.en_route.length + flights.past.length;
    
    if (totalFlights === 0) {
      return (
        <View style={styles.emptyState}>
          <Icon name="plane" size={48} color={Colors.neutral.gray400} />
          <Text style={styles.emptyTitle}>No Flights Found</Text>
          <Text style={styles.emptyMessage}>
            Try searching with a different flight number or tail number
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {flights.upcoming.length > 0 && (
          <View style={styles.flightSection}>
            <Text style={styles.sectionHeader}>Upcoming ({flights.upcoming.length})</Text>
            {flights.upcoming.map(renderFlightCard)}
          </View>
        )}
        
        {flights.en_route.length > 0 && (
          <View style={styles.flightSection}>
            <Text style={styles.sectionHeader}>En Route ({flights.en_route.length})</Text>
            {flights.en_route.map(renderFlightCard)}
          </View>
        )}
        
        {flights.past.length > 0 && (
          <View style={styles.flightSection}>
            <Text style={styles.sectionHeader}>Past ({flights.past.length})</Text>
            {flights.past.map(renderFlightCard)}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'input':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Search Flights</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={flightNumber}
                onChangeText={setFlightNumber}
                placeholder="Enter Flight or Tail Number (e.g., UA123, N123AB)"
                placeholderTextColor={Colors.neutral.gray400}
                autoCapitalize="characters"
                autoCorrect={false}
                onSubmitEditing={handleSearch}
              />
              {flightNumber.length > 0 && (
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearch}
                >
                  <Icon name="search" size={16} color={Colors.neutral.white} />
                </TouchableOpacity>
              )}
            </View>
            
            <TouchableOpacity
              style={styles.manualEntryButton}
              onPress={() => {
                onClose();
                navigation.navigate('Logbook' as never);
              }}
            >
              <Text style={styles.manualEntryText}>Enter Details Manually</Text>
            </TouchableOpacity>
          </View>
        );

      case 'loading':
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.brand.orangeVivid} />
            <Text style={styles.loadingText}>Searching for flights...</Text>
          </View>
        );

      case 'results':
        return renderResults();

      case 'error':
        return (
          <View style={styles.errorContainer}>
            <Icon name="exclamation-triangle" size={48} color={Colors.status.error} />
            <Text style={styles.errorTitle}>Search Failed</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => setCurrentView('input')}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        );

      case 'flightDetails':
        return renderFlightDetails();

      default:
        return null;
    }
  };

  // Auto-search when user types
  useEffect(() => {
    if (flightNumber.trim().length >= 3) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(debounceTimer);
    } else {
      setCurrentView('input');
      setFlights({ upcoming: [], en_route: [], past: [] });
    }
  }, [flightNumber]);

  return (
    <AdaptiveBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="New Flight"
      snapPoints={[0.9]}
      initialSnapPoint={0}
      enablePanGesture={true}
      showHandle={true}
      tabletLayout="centeredModal"
    >
      <View style={styles.content}>
        {renderContent()}
      </View>
    </AdaptiveBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray100,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    gap: 20,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.black,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    fontSize: 14,
    color: Colors.neutral.gray900,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.brand.orangeVivid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.neutral.gray700,
  },
  resultsContainer: {
    flex: 1,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  flightSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  flightCard: {
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flightNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray900,
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
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  airportCode: {
    flex: 1,
    alignItems: 'center',
  },
  airportText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    gap: 4,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brand.orangeVivid,
  },
  routeDash: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.brand.orangeVivid,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightTime: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray700,
  },
  flightDuration: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  aircraftType: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.status.error,
  },
  errorMessage: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.status.error,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.white,
  },
  detailsContainer: {
    flex: 1,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  detailsSection: {
    marginBottom: 24,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  routeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeEndpoint: {
    flex: 1,
    alignItems: 'center',
  },
  routeAirport: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  routeAirportCode: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray800,
  },
  routeLabel: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  routeTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  routeVisualization: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  durationLabel: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.neutral.gray500,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.gray200,
  },
  primaryButton: {
    backgroundColor: Colors.brand.blueAzure,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.gray800,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.white,
  },
  manualEntryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  manualEntryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brand.blueAzure,
  },
});

export default AddFlightModal;

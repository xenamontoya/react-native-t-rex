import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

// Mock data structure - in real app this would come from FlightAware API
interface Airport {
  code: string;
  name?: string;
  city?: string;
}

interface Flight {
  ident: string;
  registration?: string;
  tail_number?: string;
  aircraft_type?: string;
  aircraft_model?: string;
  operator?: string;
  operator_iata?: string;
  origin: Airport;
  destination: Airport;
  scheduled_out: string;
  scheduled_in: string;
  duration?: number;
  departure_delay?: number;
  cancelled?: boolean;
  status?: string;
}

interface FlightResults {
  upcoming: Flight[];
  en_route: Flight[];
  past: Flight[];
}

type View = 'input' | 'loading' | 'results' | 'error' | 'flightDetails';

const FlightCard: React.FC<{ 
  flight: Flight; 
  onSelect: (flight: Flight) => void;
  section: 'upcoming' | 'en_route' | 'past';
}> = ({ flight, onSelect, section }) => {
  const departureTime = new Date(flight.scheduled_out).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const arrivalTime = new Date(flight.scheduled_in).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const departureDate = new Date(flight.scheduled_out);
  const day = departureDate.getDate();
  const month = departureDate.toLocaleDateString('en-US', { month: 'short' });
  
  const departureDelayInMinutes = flight.departure_delay ? Math.round(flight.departure_delay / 60) : 0;
  
  const getStatusStyle = () => {
    if (flight.cancelled) return { backgroundColor: '#FEE2E2', color: '#DC2626' };
    if (departureDelayInMinutes > 0) return { backgroundColor: '#FEF3CD', color: '#D97706' };
    if (section === 'en_route') return { backgroundColor: '#DBEAFE', color: '#1D4ED8' };
    return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
  };
  
  const getStatusText = () => {
    if (flight.cancelled) return 'Cancelled';
    if (section === 'en_route') return 'En Route';
    if (departureDelayInMinutes > 0) return `Delayed ${departureDelayInMinutes}min`;
    return 'On Time';
  };

  return (
    <TouchableOpacity style={styles.flightCard} onPress={() => onSelect(flight)}>
      <View style={styles.flightCardHeader}>
        <View style={styles.flightRoute}>
          <View style={styles.routeSection}>
            <Text style={styles.airportCode}>{flight.origin.code}</Text>
            <Text style={styles.flightTime}>{departureTime}</Text>
          </View>
          
          <View style={styles.routeConnection}>
            <View style={styles.routeDots}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={styles.routeDot} />
              ))}
            </View>
            <View style={styles.airplane}>
              <Icon name="plane" size={16} color={Colors.neutral.gray500} />
            </View>
          </View>
          
          <View style={styles.routeSection}>
            <Text style={styles.airportCode}>{flight.destination.code}</Text>
            <Text style={styles.flightTime}>{arrivalTime}</Text>
          </View>
        </View>
        
        <View style={styles.flightMeta}>
          <Text style={styles.flightNumber}>{flight.ident}</Text>
          <Text style={styles.flightDate}>{month} {day}</Text>
        </View>
      </View>
      
      <View style={styles.flightCardFooter}>
        <View style={styles.flightDetails}>
          {flight.aircraft_type && (
            <Text style={styles.aircraftType}>{flight.aircraft_type}</Text>
          )}
          {flight.operator && (
            <Text style={styles.operator}>{flight.operator}</Text>
          )}
        </View>
        
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <Text style={[styles.statusText, { color: getStatusStyle().color }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FlightDetailsView: React.FC<{ 
  flight: Flight;
  onBack: () => void;
  onAddFlight: () => void;
  onManualEntry: () => void;
}> = ({ flight, onBack, onAddFlight, onManualEntry }) => {
  const departureTime = new Date(flight.scheduled_out).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const arrivalTime = new Date(flight.scheduled_in).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const departureDate = new Date(flight.scheduled_out);
  const day = departureDate.getDate();
  const month = departureDate.toLocaleDateString('en-US', { month: 'long' });
  const year = departureDate.getFullYear();
  const dayName = departureDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  const durationMs = new Date(flight.scheduled_in).getTime() - new Date(flight.scheduled_out).getTime();
  const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 10) / 10;
  
  const departureDelayInMinutes = flight.departure_delay ? Math.round(flight.departure_delay / 60) : 0;
  
  const getStatusStyle = () => {
    if (flight.cancelled) return { backgroundColor: '#FEE2E2', color: '#DC2626' };
    if (departureDelayInMinutes > 0) return { backgroundColor: '#FEF3CD', color: '#D97706' };
    return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
  };
  
  const getStatusText = () => {
    if (flight.cancelled) return 'Cancelled';
    if (departureDelayInMinutes > 0) return 'Delayed';
    return 'On Time';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.detailsHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Flight Details</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
        {/* Route Information */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Route</Text>
          <View style={styles.routeDetails}>
            <View style={styles.routeEndpoint}>
              <View style={[styles.airportBadge, { backgroundColor: '#FDF2E9' }]}>
                <Text style={[styles.airportBadgeText, { color: '#FE652A' }]}>
                  {flight.origin.code}
                </Text>
              </View>
              <Text style={styles.endpointLabel}>Departure</Text>
              <Text style={styles.endpointTime}>{departureTime}</Text>
            </View>
            
            <View style={styles.routeConnection}>
              <View style={styles.routeDots}>
                {[...Array(6)].map((_, i) => (
                  <View key={i} style={styles.routeDot} />
                ))}
              </View>
            </View>
            
            <View style={styles.routeEndpoint}>
              <View style={[styles.airportBadge, { backgroundColor: '#FDF2E9' }]}>
                <Text style={[styles.airportBadgeText, { color: '#FE652A' }]}>
                  {flight.destination.code}
                </Text>
              </View>
              <Text style={styles.endpointLabel}>Arrival</Text>
              <Text style={styles.endpointTime}>{arrivalTime}</Text>
            </View>
          </View>
          
          <View style={styles.durationSection}>
            <Text style={styles.durationLabel}>Flight Duration</Text>
            <Text style={styles.durationTime}>{durationHours} hours</Text>
          </View>
        </View>

        {/* Flight Information */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Flight Information</Text>
          <View style={styles.infoRows}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Flight Number</Text>
              <Text style={styles.infoValue}>{flight.ident}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{dayName}, {month} {day}, {year}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={[styles.statusBadge, getStatusStyle()]}>
                <Text style={[styles.statusText, { color: getStatusStyle().color }]}>
                  {getStatusText()}
                </Text>
              </View>
            </View>
            {departureDelayInMinutes > 0 && !flight.cancelled && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delay</Text>
                <Text style={[styles.infoValue, { color: '#D97706' }]}>{departureDelayInMinutes} minutes</Text>
              </View>
            )}
            {flight.aircraft_type && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Aircraft Type</Text>
                <Text style={styles.infoValue}>{flight.aircraft_type}</Text>
              </View>
            )}
            {flight.operator && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Operator</Text>
                <Text style={styles.infoValue}>{flight.operator}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.detailsFooter}>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
            <Text style={styles.secondaryButtonText}>Search Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onAddFlight}>
            <Icon name="plus" size={16} color={Colors.primary.white} />
            <Text style={styles.primaryButtonText}>Add Flight</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.manualEntryButton} onPress={onManualEntry}>
          <Text style={styles.manualEntryText}>Enter Details Manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AddFlightScreen({ navigation }: any) {
  const [flightNumber, setFlightNumber] = useState('');
  const [view, setView] = useState<View>('input');
  const [flights, setFlights] = useState<FlightResults>({ upcoming: [], en_route: [], past: [] });
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [error, setError] = useState('');

  // Mock FlightAware search function
  const searchFlights = async (query: string): Promise<FlightResults> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data based on query
    const mockFlight: Flight = {
      ident: query.toUpperCase().includes('N') ? `${query.toUpperCase()}` : `${query.toUpperCase()}`,
      registration: query.toUpperCase().includes('N') ? query.toUpperCase() : 'N123AB',
      aircraft_type: 'C172',
      aircraft_model: 'Cessna 172',
      operator: 'Flight Training Solutions',
      origin: { code: 'KPHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix' },
      destination: { code: 'KLAS', name: 'McCarran International Airport', city: 'Las Vegas' },
      scheduled_out: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      scheduled_in: new Date(Date.now() + 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours from now
      status: 'Scheduled'
    };

    const pastFlight: Flight = {
      ...mockFlight,
      ident: `${query.toUpperCase()}`,
      scheduled_out: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      scheduled_in: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), // 30 min ago
      status: 'Completed'
    };

    return {
      upcoming: [mockFlight],
      en_route: [],
      past: [pastFlight]
    };
  };

  const detectSearchType = (input: string): 'tailNumber' | 'flightNumber' => {
    const trimmed = input.trim().toUpperCase();
    const tailNumberPattern = /^[A-Z]-?[A-Z0-9]{1,5}$|^[A-Z]{1,2}[0-9]{1,4}[A-Z]{1,3}$/;
    const flightNumberPattern = /^[A-Z]{2,3}[0-9]{1,4}$/;
    
    if (tailNumberPattern.test(trimmed)) {
      return 'tailNumber';
    } else if (flightNumberPattern.test(trimmed)) {
      return 'flightNumber';
    }
    return 'tailNumber';
  };

  const handleSearch = async () => {
    if (!flightNumber.trim()) return;
    setView('loading');
    setError('');

    try {
      const results = await searchFlights(flightNumber.trim());
      setFlights(results);
      setView('results');
    } catch (error: any) {
      console.error('Search failed:', error);
      setError('Unable to search flights. Please try again.');
      setView('error');
    }
  };

  useEffect(() => {
    if (flightNumber.trim().length < 3) {
      setFlights({ upcoming: [], en_route: [], past: [] });
      setView('input');
      return;
    }

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 800);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [flightNumber]);

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setView('flightDetails');
  };

  const handleAddFlight = () => {
    if (selectedFlight) {
      navigation.navigate('FlightDetailsForm', { 
        flightData: selectedFlight,
        mode: 'add' 
      });
    }
  };

  const handleManualEntry = () => {
    navigation.navigate('FlightDetailsForm');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const totalResults = flights.upcoming.length + flights.en_route.length + flights.past.length;

  if (view === 'flightDetails' && selectedFlight) {
    return (
      <FlightDetailsView 
        flight={selectedFlight}
        onBack={() => setView('results')}
        onAddFlight={handleAddFlight}
        onManualEntry={handleManualEntry}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Flight</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Input */}
          <View style={styles.searchSection}>
            <Text style={styles.searchLabel}>Search Flights</Text>
            <TextInput
              style={styles.searchInput}
              value={flightNumber}
              onChangeText={setFlightNumber}
              placeholder="Enter Flight or Tail Number (e.g., UA123, N123AB)"
              placeholderTextColor={Colors.neutral.gray400}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          {/* Results Section */}
          {(view === 'loading' || view === 'results' || view === 'error') && (
            <View style={styles.resultsContainer}>
              {view === 'results' && totalResults > 0 && (
                <View style={styles.resultsHeader}>
                  <Text style={styles.resultsCount}>
                    {totalResults} flight{totalResults !== 1 ? 's' : ''} found
                  </Text>
                  {totalResults > 5 && (
                    <Text style={styles.resultsHint}>
                      Scroll to see all results
                    </Text>
                  )}
                </View>
              )}
              
              {view === 'loading' && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#FE652A" />
                  <Text style={styles.loadingText}>Searching for flights...</Text>
                </View>
              )}
              
              {view === 'results' && (
                <View style={styles.flightResults}>
                  {/* Upcoming Flights */}
                  {flights.upcoming.length > 0 && (
                    <View style={styles.resultsSection}>
                      <Text style={styles.sectionTitle}>Upcoming</Text>
                      {flights.upcoming.map((flight, index) => (
                        <FlightCard
                          key={`upcoming-${index}`}
                          flight={flight}
                          onSelect={handleFlightSelect}
                          section="upcoming"
                        />
                      ))}
                    </View>
                  )}
                  
                  {/* En Route Flights */}
                  {flights.en_route.length > 0 && (
                    <View style={styles.resultsSection}>
                      <Text style={styles.sectionTitle}>En Route</Text>
                      {flights.en_route.map((flight, index) => (
                        <FlightCard
                          key={`enroute-${index}`}
                          flight={flight}
                          onSelect={handleFlightSelect}
                          section="en_route"
                        />
                      ))}
                    </View>
                  )}
                  
                  {/* Past Flights */}
                  {flights.past.length > 0 && (
                    <View style={styles.resultsSection}>
                      <Text style={styles.sectionTitle}>Past Flights</Text>
                      {flights.past.map((flight, index) => (
                        <FlightCard
                          key={`past-${index}`}
                          flight={flight}
                          onSelect={handleFlightSelect}
                          section="past"
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}
              
              {view === 'error' && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
            </View>
          )}

          {/* Manual Entry Button */}
          <View style={styles.manualEntrySection}>
            <TouchableOpacity style={styles.manualEntryButton} onPress={handleManualEntry}>
              <Text style={styles.manualEntryText}>Enter Details Manually</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  searchLabel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    backgroundColor: Colors.primary.white,
  },
  resultsContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    marginBottom: 24,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.gray50,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  resultsHint: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  errorContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#EF4444',
  },
  flightResults: {
    padding: 16,
  },
  resultsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  flightCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 12,
  },
  flightCardHeader: {
    marginBottom: 12,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeSection: {
    flex: 1,
    alignItems: 'center',
  },
  airportCode: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  flightTime: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  routeConnection: {
    flex: 2,
    alignItems: 'center',
    position: 'relative',
  },
  routeDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  routeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.neutral.gray400,
  },
  airplane: {
    position: 'absolute',
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 4,
  },
  flightMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  flightDate: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  flightCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightDetails: {
    flex: 1,
  },
  aircraftType: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  operator: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
  },
  manualEntrySection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 32,
  },
  manualEntryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  manualEntryText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
  },
  
  // Flight Details View Styles
  detailsHeader: {
    backgroundColor: Colors.primary.white,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  detailsContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  detailsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
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
  airportBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  airportBadgeText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
  },
  endpointLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  endpointTime: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  durationSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 8,
  },
  durationTime: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  infoRows: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  detailsFooter: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5177BB',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
});

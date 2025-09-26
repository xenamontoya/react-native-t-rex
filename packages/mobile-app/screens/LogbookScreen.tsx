import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, FloatingActionButton, PoweredByPilotbasePro, ScreenHeader } from '../../components/src';
import type { FloatingActionItem } from '../../components/src';
import { Icon, AddFlightModal, ImportLogbookModal } from '../components';
import { FlightData } from '../utils/flightStore';
// Using direct require() instead of broken asset imports

// Mock flight data matching your web app structure
const mockFlights = [
  {
    id: '1',
    fa_flight_id: '1',
    date: '2024-01-15',
    origin: { code: 'KPAO' },
    destination: { code: 'KNUQ' },
    from: 'KPAO',
    to: 'KNUQ',
    aircraft_type: 'Cessna 172S',
    registration: 'N12345',
    status: 'Completed',
    scheduled_out: '2024-01-15T14:00:00Z',
    scheduled_in: '2024-01-15T15:30:00Z',
    actual_out: '2024-01-15T14:05:00Z',
    actual_in: '2024-01-15T15:35:00Z',
    total_time: '1.5',
    duration: 90, // minutes
    instructor: 'Sarah Mitchell - CFI',
    student: 'Alex Johnson',
    type: 'Training',
    dual_received: '1.5',
    day_ldg: '3',
    remarks: 'Excellent progress on landing consistency. Continue working on crosswind technique.',
    signature: '/logos/xena-signature.png'
  },
  {
    id: '2',
    fa_flight_id: '2',
    date: '2024-01-18',
    origin: { code: 'KPAO' },
    destination: { code: 'KPAO' },
    from: 'KPAO',
    to: 'KPAO',
    aircraft_type: 'Piper Cherokee',
    registration: 'N67890',
    status: 'Scheduled',
    scheduled_out: '2024-01-18T09:00:00Z',
    scheduled_in: '2024-01-18T11:00:00Z',
    total_time: '2.0',
    duration: 120,
    instructor: 'Mike Johnson - CFI',
    student: 'Alex Johnson',
    type: 'Solo',
    solo: '2.0',
    day_ldg: '8'
  },
  {
    id: '3',
    fa_flight_id: '3',
    date: '2024-01-20',
    origin: { code: 'KPAO' },
    destination: { code: 'KRHV' },
    from: 'KPAO', 
    to: 'KRHV',
    aircraft_type: 'Cessna 172S',
    registration: 'N54321',
    status: 'draft',
    scheduled_out: '2024-01-20T16:00:00Z',
    scheduled_in: '2024-01-20T17:30:00Z',
    total_time: '1.5',
    duration: 90,
    instructor: 'Sarah Mitchell - CFI',
    student: 'Alex Johnson',
    type: 'Cross Country',
    dual_received: '1.5',
    xc: '1.5'
  }
];

const useFlightStore = () => ({
  savedFlights: mockFlights,
  removeSavedFlight: (id: string) => {
    // Mock remove function
    console.log('Removing flight:', id);
  },
  duplicateFlight: (flight: any) => {
    // Mock duplicate function
    console.log('Duplicating flight:', flight);
  }
});

const useRoleStore = () => ({
  currentRole: 'student'
});

// Helper function to normalize status capitalization
const normalizeStatus = (status: string): string => {
  if (!status) return 'Scheduled';
  if (status.toLowerCase() === 'draft') return 'Scheduled';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Helper function to get status pill styling
const getStatusPillInlineStyle = (status: string) => {
  const normalizedStatus = normalizeStatus(status);
  if (normalizedStatus === 'Scheduled') {
    return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
  }
  if (normalizedStatus === 'Completed') {
    return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
  }
  return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
};

// Flight Card Component (matching your web app design)
const FlightCard = ({ 
  flight, 
  onRemove, 
  onDuplicate, 
  onRowClick,
  onEdit,
  showDropdown,
  onToggleDropdown,
  dropdownPosition
}: { 
  flight: any; 
  onRemove: (id: string) => void; 
  onDuplicate: (flight: any) => void;
  onRowClick: (flight: any) => void;
  onEdit?: (flight: any) => void;
  showDropdown?: boolean;
  onToggleDropdown?: (buttonRef: any) => void;
  dropdownPosition?: { x: number; y: number };
}) => {
  const dropdownButtonRef = useRef<any>(null);

  const isDraftEntry = () => {
    return flight.status === 'draft';
  };

  const shouldShowYellowBorder = () => {
    return flight.status === 'draft' || flight.status === 'Scheduled';
  };

  const getTotalTime = () => {
    if (flight.total_time) {
      return flight.total_time.toString();
    }
    if (flight.totalTime) {
      return flight.totalTime.toString();
    }
    if (flight.duration) {
      return (flight.duration / 60).toFixed(1);
    }
    return 'N/A';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  // Note: These handlers are no longer needed since dropdown is managed globally
  // but kept for reference in case needed for direct card actions

  return (
    <TouchableOpacity
      style={[
        styles.flightCard,
        shouldShowYellowBorder() && { borderColor: '#F26C2E' }
      ]}
      onPress={() => onRowClick(flight)}
    >
      {/* Header with Date and Status */}
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Text style={[
            styles.dateText,
            isDraftEntry() && { color: '#D97706' }
          ]}>
            {formatDate(flight.date)}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={[
            styles.statusBadge,
            getStatusPillInlineStyle(flight.status)
          ]}>
            <Text style={[
              styles.statusText,
              { color: getStatusPillInlineStyle(flight.status).color }
            ]}>
              {normalizeStatus(flight.status)}
            </Text>
          </View>
          
          <TouchableOpacity
            ref={dropdownButtonRef}
            style={styles.dropdownButton}
            onPress={() => onToggleDropdown && onToggleDropdown(dropdownButtonRef)}
          >
            <Icon name="ellipsisV" size={16} color={Colors.neutral.gray500} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Route Information */}
      <View style={styles.routeContainer}>
        <View style={styles.routeInfo}>
          <View style={styles.airportContainer}>
            <Text style={[
              styles.airportCode,
              isDraftEntry() && { color: '#D97706' }
            ]}>
              {flight.origin?.code || flight.from || 'N/A'}
            </Text>
            {(flight.scheduled_out || flight.actual_out) && (
              <Text style={[
                styles.timeText,
                isDraftEntry() && { color: '#F59E0B' }
              ]}>
                {formatTime(flight.actual_out || flight.scheduled_out)}
              </Text>
            )}
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <Icon name="plane" size={14} color={Colors.primary.black} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
          <View style={styles.airportContainer}>
            <Text style={[
              styles.airportCode,
              isDraftEntry() && { color: '#D97706' }
            ]}>
              {flight.destination?.code || flight.to || 'N/A'}
            </Text>
            {(flight.scheduled_in || flight.actual_in) && (
              <Text style={[
                styles.timeText,
                isDraftEntry() && { color: '#F59E0B' }
              ]}>
                {formatTime(flight.actual_in || flight.scheduled_in)}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Aircraft and Details */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={[
            styles.detailLabel,
            isDraftEntry() && { color: '#F59E0B' }
          ]}>
            Aircraft:
          </Text>
          <Text style={[
            styles.detailValue,
            isDraftEntry() && { color: '#D97706' }
          ]}>
            {flight.aircraft_type || 'N/A'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[
            styles.detailLabel,
            isDraftEntry() && { color: '#F59E0B' }
          ]}>
            Time:
          </Text>
          <Text style={[
            styles.detailValue,
            isDraftEntry() && { color: '#D97706' }
          ]}>
            {getTotalTime()} hrs
          </Text>
        </View>
      </View>

      {/* Additional Details */}
      {(flight.student || flight.instructor || flight.type) && (
        <View style={styles.additionalDetails}>
          <View style={styles.detailsRow}>
            {flight.student && (
              <View style={styles.detailWithIcon}>
                <Icon name="graduation" size={12} color={Colors.neutral.gray400} />
                <Text style={styles.detailText}>{flight.student}</Text>
              </View>
            )}
            {flight.instructor && (
              <View style={styles.detailWithIcon}>
                <Icon name="user" size={12} color={Colors.neutral.gray400} />
                <Text style={styles.detailText}>{flight.instructor}</Text>
              </View>
            )}
            {flight.type && (
              <View style={styles.detailWithIcon}>
                <Icon name="plane" size={12} color={Colors.neutral.gray400} />
                <Text style={styles.detailText}>{flight.type}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* No signatures in list view - moved to detail screen */}
    </TouchableOpacity>
  );
};

// Multiple Flights Map View Component (placeholder)
const FlightsMapView = ({ flights }: { flights: any[] }) => {
  if (flights.length === 0) {
    return (
      <View style={styles.mapEmptyState}>
        <Text style={styles.mapEmptyIcon}>🗺️</Text>
        <Text style={styles.mapEmptyTitle}>No flights to display</Text>
        <Text style={styles.mapEmptyDescription}>Import or add flights to see them on the map</Text>
      </View>
    );
  }

  const flightsWithRoutes = flights.filter(flight => 
    (flight.origin?.code && flight.destination?.code) || (flight.from && flight.to)
  );

  if (flightsWithRoutes.length === 0) {
    return (
      <View style={styles.mapEmptyState}>
        <Text style={styles.mapEmptyIcon}>🗺️</Text>
        <Text style={styles.mapEmptyTitle}>No route information available</Text>
        <Text style={styles.mapEmptyDescription}>Flights need origin and destination airport codes to display on the map</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapHeader}>
        <View>
          <Text style={styles.mapTitle}>Flight Routes</Text>
          <Text style={styles.mapSubtitle}>
            Showing {flightsWithRoutes.length} route{flightsWithRoutes.length !== 1 ? 's' : ''} from your flights
          </Text>
        </View>
        <Text style={styles.mapCount}>
          {flights.length} flight{flights.length !== 1 ? 's' : ''} total
        </Text>
      </View>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>Map View Coming Soon</Text>
        <Text style={styles.mapPlaceholderSubtext}>Interactive flight route map</Text>
      </View>
    </View>
  );
};

export default function LogbookScreen() {
  const navigation = useNavigation();
  const { savedFlights, removeSavedFlight, duplicateFlight } = useFlightStore();
  const { currentRole } = useRoleStore();
  const [currentView, setCurrentView] = useState<'list' | 'map'>('list');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Modal states
  const [showAddFlightModal, setShowAddFlightModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Handle import completion
  const handleImportComplete = (flights: FlightData[]) => {
    // Add imported flights to the store
    flights.forEach(flight => {
      // You would add to your flight store here
      console.log('Imported flight:', flight);
    });
    
    Alert.alert(
      'Import Complete', 
      `Successfully imported ${flights.length} flights to your logbook.`,
      [{ text: 'OK' }]
    );
  };
  
  // Detect tablet size (768px+ width is typically tablet/desktop)
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleFlightClick = (flight: any) => {
    const flightDataParam = encodeURIComponent(JSON.stringify(flight));
    
    // Navigate based on flight status:
    // - Scheduled/Draft flights go to editable form
    // - Completed flights go to read-only details
    if (flight.status === 'Scheduled' || flight.status === 'scheduled' || flight.status === 'Draft' || flight.status === 'draft') {
      // Navigate to editable flight form
      (navigation as any).navigate('FlightDetailsForm', {
        id: flight.id,
        flightData: flightDataParam,
        mode: 'edit'
      });
    } else {
      // Navigate to read-only flight details
      (navigation as any).navigate('FlightDetails', {
        id: flight.id,
        flightData: flightDataParam
      });
    }
  };

  const handleEditFlight = (flight: any) => {
    // Navigate to logbook form for editing
    Alert.alert('Edit Flight', `Navigate to logbook form to edit flight ${flight.id}`);
  };

  const handleDuplicateFlight = (flight: any) => {
    duplicateFlight(flight);
    Alert.alert('Flight Duplicated', 'Flight has been duplicated successfully');
  };

  const handleRemoveFlight = (id: string) => {
    removeSavedFlight(id);
    setActiveDropdown(null); // Close dropdown after action
  };

  const handleToggleDropdown = (flightId: string, buttonRef?: any) => {
    if (activeDropdown === flightId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(flightId);
      
      // Calculate position based on button location
      if (buttonRef && buttonRef.current) {
        buttonRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
          setDropdownPosition({ 
            x: x - 150 + width, // Position dropdown to the right edge of button (150 is dropdown width)
            y: y + height + 8   // Position dropdown below button with 8px gap
          });
        });
      } else {
        // Fallback position
        setDropdownPosition({ x: width - 174, y: 120 }); // 174 = 150 (dropdown width) + 24 (right margin)
      }
    }
  };

  const handleDropdownAction = (action: () => void) => {
    action();
    setActiveDropdown(null); // Close dropdown after action
  };

  const handleAddFlight = () => {
    setShowAddFlightModal(true);
  };

  const handleImportFlights = () => {
    setShowImportModal(true);
  };

  const handleAddEndorsement = () => {
    // Add endorsement functionality
    Alert.alert('Add Endorsement', 'Add endorsement functionality');
  };

  // FAB menu items matching your web app
  const fabItems: FloatingActionItem[] = [
    {
      id: 'add-flight',
      icon: 'search', // Using search icon to match your web app
      label: 'Add Flight',
      onPress: handleAddFlight,
    },
    {
      id: 'import-flights',
      icon: 'upload',
      label: 'Import Flights',
      onPress: handleImportFlights,
    },
    {
      id: 'add-endorsement',
      icon: 'award',
      label: 'Add Endorsement',
      onPress: handleAddEndorsement,
    },
  ];

  // Separate flights by status for better organization
  const draftFlights = savedFlights.filter(f => f.status === 'draft');
  const scheduledFlights = savedFlights.filter(f => f.status === 'Scheduled' || f.status === 'scheduled');
  const completedFlights = savedFlights.filter(f => f.status === 'Completed' || f.status === 'completed');

  return (
    <View style={styles.container}>
      {/* Standardized Header */}
      <ScreenHeader 
        variant="main"
        title="My Logbook"
        rightElement={
          savedFlights.length > 0 ? (
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
                onPress={() => setCurrentView('map')}
                style={[
                  styles.toggleButton,
                  currentView === 'map' && styles.toggleButtonActive
                ]}
              >
                <Icon name="map" size={16} color={currentView === 'map' ? Colors.primary.black : Colors.neutral.gray600} />
              </TouchableOpacity>
            </View>
          ) : undefined
        }
      />


      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Powered by Pilotbase Pro Header */}
        <PoweredByPilotbasePro spacing="default" />

        {savedFlights.length > 0 ? (
          <>
            {currentView === 'list' ? (
              <View style={styles.flightsList}>
                {/* Draft Flights */}
                {draftFlights.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Draft Flights</Text>
                    {draftFlights.map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onRemove={handleRemoveFlight}
                        onDuplicate={handleDuplicateFlight}
                        onRowClick={handleFlightClick}
                        onEdit={handleEditFlight}
                        showDropdown={activeDropdown === flight.id}
                        onToggleDropdown={(buttonRef) => handleToggleDropdown(flight.id, buttonRef)}
                        dropdownPosition={dropdownPosition}
                      />
                    ))}
                  </View>
                )}

                {/* Scheduled Flights */}
                {scheduledFlights.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Scheduled Flights</Text>
                    {scheduledFlights.map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onRemove={handleRemoveFlight}
                        onDuplicate={handleDuplicateFlight}
                        onRowClick={handleFlightClick}
                        onEdit={handleEditFlight}
                        showDropdown={activeDropdown === flight.id}
                        onToggleDropdown={(buttonRef) => handleToggleDropdown(flight.id, buttonRef)}
                        dropdownPosition={dropdownPosition}
                      />
                    ))}
                  </View>
                )}

                {/* Completed Flights */}
                {completedFlights.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Completed Flights</Text>
                    {completedFlights.map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onRemove={handleRemoveFlight}
                        onDuplicate={handleDuplicateFlight}
                        onRowClick={handleFlightClick}
                        onEdit={handleEditFlight}
                        showDropdown={activeDropdown === flight.id}
                        onToggleDropdown={(buttonRef) => handleToggleDropdown(flight.id, buttonRef)}
                        dropdownPosition={dropdownPosition}
                      />
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <FlightsMapView flights={savedFlights} />
            )}
          </>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <Icon name="book" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyTitle}>No flights in your logbook</Text>
            <Text style={styles.emptyDescription}>
              Start building your flight history by adding your first flight or importing from another logbook.
            </Text>
            <View style={styles.emptyActions}>
              <TouchableOpacity style={styles.emptyPrimaryButton} onPress={handleAddFlight}>
                <Text style={styles.emptyPrimaryButtonText}>Add Your First Flight</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emptySecondaryButton} onPress={handleImportFlights}>
                <Text style={styles.emptySecondaryButtonText}>Import Logbook</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        items={fabItems}
        mainIcon="plus"
      />

      {/* Global Dropdown - Renders outside of card containers */}
      {activeDropdown && (
        <>
          {/* Backdrop to close dropdown */}
          <TouchableOpacity
            style={styles.globalDropdownBackdrop}
            onPress={() => setActiveDropdown(null)}
            activeOpacity={1}
          />
          <View style={[styles.globalDropdown, { 
            left: dropdownPosition.x, 
            top: dropdownPosition.y 
          }]}>
            {(() => {
              const flight = savedFlights.find(f => f.id === activeDropdown);
              if (!flight) return null;
              
              const isDraft = flight.status === 'draft';
              const isScheduled = flight.status === 'Scheduled';
              
              return (
                <>
                  {(isDraft || isScheduled) && (
                    <TouchableOpacity 
                      style={styles.dropdownItem}
                      onPress={() => handleDropdownAction(() => handleEditFlight(flight))}
                    >
                      <Icon name="edit" size={16} color={Colors.neutral.gray700} />
                      <Text style={styles.dropdownText}>Edit Flight</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => handleDropdownAction(() => handleDuplicateFlight(flight))}
                  >
                    <Icon name="copy" size={16} color={Colors.neutral.gray700} />
                    <Text style={styles.dropdownText}>Duplicate Flight</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.dropdownItem, styles.dropdownItemDanger]}
                    onPress={() => handleDropdownAction(() => handleRemoveFlight(flight.fa_flight_id || flight.id))}
                  >
                    <Icon name="trash" size={16} color="#DC2626" />
                    <Text style={[styles.dropdownText, { color: '#DC2626' }]}>Delete Flight</Text>
                  </TouchableOpacity>
                </>
              );
            })()}
          </View>
        </>
      )}

      {/* Add Flight Modal */}
      <AddFlightModal
        isOpen={showAddFlightModal}
        onClose={() => setShowAddFlightModal(false)}
      />

      {/* Import Logbook Modal */}
      <ImportLogbookModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportComplete={handleImportComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  
  // Header
  
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
  },
  
  // Flights List
  flightsList: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  
  // Flight Card
  flightCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 12,
  },
  
  // Card Header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.3, // Reduced from 1 to prevent overflow
    fontFamily: Typography.fontFamily.mono,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  dropdownButton: {
    padding: 4,
  },
  globalDropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10000,
  },
  globalDropdown: {
    position: 'absolute',
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 10001,
    width: 150,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dropdownItemDanger: {
    // No additional styles needed, color handled by text
  },
  dropdownText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray700,
  },
  
  // Route Container
  routeContainer: {
    marginBottom: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airportContainer: {
    alignItems: 'center',
  },
  airportCode: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  timeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.gray500,
    fontFamily: Typography.fontFamily.mono,
    marginTop: 4,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary.black,
  },
  
  // Details Grid
  detailsGrid: {
    flexDirection: 'row',
    gap: 32,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginLeft: 4,
  },
  
  // Additional Details
  additionalDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  detailWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
  },
  
  // Map View
  mapContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    margin: 16,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  mapTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  mapSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  mapCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray500,
  },
  mapPlaceholder: {
    padding: 48,
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
  },
  mapEmptyState: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 32,
    alignItems: 'center',
    margin: 16,
  },
  mapEmptyIcon: {
    fontSize: Typography.fontSize['5xl'],
    marginBottom: 16,
  },
  mapEmptyTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  mapEmptyDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  
  // Empty State
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyActions: {
    gap: 12,
    alignItems: 'center',
  },
  emptyPrimaryButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyPrimaryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  emptySecondaryButton: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptySecondaryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  
  bottomPadding: {
    height: 100,
  },
});


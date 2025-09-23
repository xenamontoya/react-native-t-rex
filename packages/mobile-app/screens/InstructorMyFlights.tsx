import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Icon } from '../components';
import { useNavigation } from '@react-navigation/native';

// This is a React Native conversion of the original instructor/my-flights.tsx
const InstructorMyFlights: React.FC = () => {
  const navigation = useNavigation();
  const [flights, setFlights] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const isDark = false; // TODO: Connect to theme store

  useEffect(() => {
    // Simulate loading instructor flights
    setTimeout(() => {
      const mockFlights = [
        {
          id: 'flight-1',
          date: '2023-10-15',
          aircraft: 'N12345',
          type: 'Cessna 172',
          from: 'KPAO',
          to: 'KPAO',
          totalTime: '1.8',
          student: 'Alex Johnson',
          lessonType: 'Traffic Pattern Work',
          status: 'Completed',
          instructor: 'Self',
          dual_given: '1.8',
        },
        {
          id: 'flight-2',
          date: '2023-10-14',
          aircraft: 'N67890',
          type: 'Cessna 172',
          from: 'KPAO',
          to: 'KNUQ',
          totalTime: '2.1',
          student: 'Sarah Chen',
          lessonType: 'Cross Country',
          status: 'Completed',
          instructor: 'Self',
          dual_given: '2.1',
        },
        {
          id: 'flight-3',
          date: '2023-10-13',
          aircraft: 'N12345',
          type: 'Cessna 172',
          from: 'KPAO',
          to: 'KPAO',
          totalTime: '1.5',
          student: 'Mike Rodriguez',
          lessonType: 'Checkride Prep',
          status: 'Completed',
          instructor: 'Self',
          dual_given: '1.5',
        },
        {
          id: 'flight-4',
          date: '2023-10-18',
          aircraft: 'N12345',
          type: 'Cessna 172',
          from: 'KPAO',
          to: 'KPAO',
          totalTime: '1.6',
          student: 'Emily Davis',
          lessonType: 'Basic Maneuvers',
          status: 'Scheduled',
          instructor: 'Self',
          dual_given: '0',
        }
      ];
      setFlights(mockFlights);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'scheduled':
        return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#4b5563' };
    }
  };

  const renderFlightCard = ({ item: flight }: { item: any }) => (
    <View style={styles.flightCard}>
      {/* Header Row */}
      <View style={styles.flightHeader}>
        <View style={styles.flightHeaderLeft}>
          <Text style={styles.flightDate}>{formatShortDate(flight.date)}</Text>
          {flight.aircraft && (
            <Text style={styles.flightAircraft}>{flight.aircraft}</Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsisV" size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Route Information */}
      <View style={styles.routeContainer}>
        <View style={styles.routeInfo}>
          <View style={styles.airportCode}>
            <Text style={styles.airportText}>{flight.from || 'N/A'}</Text>
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
            <Icon name="plane" size={14} color="#212121" />
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
          </View>
          
          <View style={styles.airportCode}>
            <Text style={styles.airportText}>{flight.to || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Aircraft and Details */}
      <View style={styles.flightDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Aircraft:</Text>
          <Text style={styles.detailValue}>{flight.type || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Student:</Text>
          <Text style={styles.detailValue}>{flight.student || 'N/A'}</Text>
        </View>
      </View>

      {/* Additional Details */}
      <View style={styles.flightFooter}>
        <View style={styles.flightStats}>
          <View style={styles.statItem}>
            <Icon name="graduation" size={14} color="#6b7280" />
            <Text style={styles.statText}>{flight.lessonType}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="clock" size={14} color="#6b7280" />
            <Text style={styles.statText}>{flight.totalTime} hrs</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, getStatusColor(flight.status)]}>
          <Text style={[styles.statusText, { color: getStatusColor(flight.status).color }]}>
            {flight.status}
          </Text>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="plane" size={64} color="#d1d5db" />
      <Text style={styles.emptyStateTitle}>No flights yet</Text>
      <Text style={styles.emptyStateDescription}>
        Your instructor flight logs will appear here
      </Text>
      <TouchableOpacity style={styles.addFlightButton}>
        <Text style={styles.addFlightButtonText}>Add Flight</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading flights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowLeft" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Flights</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog" size={20} color="#00FFF2" />
        </TouchableOpacity>
      </View>

      {/* View Toggle */}
      {flights.length > 0 && (
        <View style={styles.viewToggleContainer}>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, currentView === 'list' && styles.viewButtonActive]}
              onPress={() => setCurrentView('list')}
            >
              <Icon name="list" size={16} color={currentView === 'list' ? '#111827' : '#6b7280'} />
              <Text style={[styles.viewButtonText, currentView === 'list' && styles.viewButtonTextActive]}>
                List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, currentView === 'map' && styles.viewButtonActive]}
              onPress={() => setCurrentView('map')}
            >
              <Icon name="map" size={16} color={currentView === 'map' ? '#111827' : '#6b7280'} />
              <Text style={[styles.viewButtonText, currentView === 'map' && styles.viewButtonTextActive]}>
                Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {flights.length > 0 ? (
          currentView === 'list' ? (
            <FlatList
              data={flights}
              renderItem={renderFlightCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flightsList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.mapPlaceholder}>
              <Icon name="map" size={64} color="#d1d5db" />
              <Text style={styles.mapPlaceholderText}>Map view coming soon</Text>
            </View>
          )
        ) : (
          <EmptyState />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={24} color="#00FFF2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewToggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    alignSelf: 'flex-start',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 8,
  },
  viewButtonTextActive: {
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  flightsList: {
    padding: 16,
    paddingBottom: 100,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flightHeaderLeft: {
    flex: 1,
  },
  flightDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  flightAircraft: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginTop: 4,
  },
  moreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeContainer: {
    marginBottom: 12,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airportCode: {
    flex: 1,
    alignItems: 'center',
  },
  airportText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  routeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#212121',
    marginHorizontal: 2,
  },
  flightDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  flightStats: {
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addFlightButton: {
    backgroundColor: '#212121',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFlightButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#212121',
    borderWidth: 3,
    borderColor: '#00FFF2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default InstructorMyFlights;

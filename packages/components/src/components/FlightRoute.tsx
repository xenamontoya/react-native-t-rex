import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface FlightRouteProps {
  from: string;
  to: string;
  distance?: number; // in nautical miles
  estimatedTime?: string; // e.g., "1h 30m"
  flightType?: 'local' | 'cross-country' | 'pattern';
  showDetails?: boolean;
  style?: any;
}

export interface RouteDetailProps {
  icon: string;
  label: string;
  value: string;
}

// Airport coordinate data for distance calculation (simplified)
const AIRPORT_COORDS: { [key: string]: { lat: number; lng: number; name: string } } = {
  // Training airports in California
  'KPAO': { lat: 37.4612, lng: -122.1150, name: 'Palo Alto Airport' },
  'PAO': { lat: 37.4612, lng: -122.1150, name: 'Palo Alto Airport' },
  'KRHV': { lat: 37.3312, lng: -121.8195, name: 'Reid-Hillview' },
  'RHV': { lat: 37.3312, lng: -121.8195, name: 'Reid-Hillview' },
  'KLVK': { lat: 37.6934, lng: -121.8203, name: 'Livermore' },
  'LVK': { lat: 37.6934, lng: -121.8203, name: 'Livermore' },
  'KHWD': { lat: 37.6592, lng: -122.1218, name: 'Hayward Executive' },
  'HWD': { lat: 37.6592, lng: -122.1218, name: 'Hayward Executive' },
  'KSQL': { lat: 37.5112, lng: -122.2496, name: 'San Carlos Airport' },
  'SQL': { lat: 37.5112, lng: -122.2496, name: 'San Carlos Airport' },
  'KNUQ': { lat: 37.4161, lng: -122.0497, name: 'Moffett Airfield' },
  'NUQ': { lat: 37.4161, lng: -122.0497, name: 'Moffett Airfield' },
  
  // Major airports
  'KSFO': { lat: 37.6213, lng: -122.3790, name: 'San Francisco Intl' },
  'SFO': { lat: 37.6213, lng: -122.3790, name: 'San Francisco Intl' },
  'KSJC': { lat: 37.3626, lng: -121.9291, name: 'San Jose Intl' },
  'SJC': { lat: 37.3626, lng: -121.9291, name: 'San Jose Intl' },
  'KOAK': { lat: 37.7214, lng: -122.2208, name: 'Oakland Intl' },
  'OAK': { lat: 37.7214, lng: -122.2208, name: 'Oakland Intl' },
};

// Calculate distance between two airports
const calculateDistance = (from: string, to: string): number => {
  const fromCoords = AIRPORT_COORDS[from.toUpperCase()];
  const toCoords = AIRPORT_COORDS[to.toUpperCase()];
  
  if (!fromCoords || !toCoords) return 0;
  
  // Haversine formula for distance calculation
  const R = 3440; // Earth's radius in nautical miles
  const dLat = (toCoords.lat - fromCoords.lat) * Math.PI / 180;
  const dLng = (toCoords.lng - fromCoords.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(fromCoords.lat * Math.PI / 180) * Math.cos(toCoords.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance);
};

// Estimate flight time based on distance (assumes 100 kts average)
const estimateFlightTime = (distance: number): string => {
  if (distance === 0) return '—';
  
  const hours = distance / 100; // 100 kts average
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

// Get airport name if available
const getAirportName = (code: string): string => {
  const airport = AIRPORT_COORDS[code.toUpperCase()];
  return airport ? airport.name : code.toUpperCase();
};

// Determine flight type based on route
const determineFlightType = (from: string, to: string, distance: number): 'local' | 'cross-country' | 'pattern' => {
  if (from.toUpperCase() === to.toUpperCase()) return 'pattern';
  if (distance > 50) return 'cross-country'; // >50nm is cross-country
  return 'local';
};

const RouteDetail: React.FC<RouteDetailProps> = ({ icon, label, value }) => (
  <View style={styles.routeDetail}>
    <FontAwesome6 name={icon as any} size={14} color={Colors.neutral.gray500} />
    <Text style={styles.routeDetailLabel}>{label}</Text>
    <Text style={styles.routeDetailValue}>{value}</Text>
  </View>
);

export const FlightRoute: React.FC<FlightRouteProps> = ({
  from,
  to,
  distance,
  estimatedTime,
  flightType,
  showDetails = true,
  style,
}) => {
  // Calculate distance if not provided
  const calculatedDistance = distance || calculateDistance(from, to);
  const calculatedTime = estimatedTime || estimateFlightTime(calculatedDistance);
  const calculatedType = flightType || determineFlightType(from, to, calculatedDistance);
  
  const fromName = getAirportName(from);
  const toName = getAirportName(to);
  
  const getFlightTypeColor = (type: typeof calculatedType) => {
    switch (type) {
      case 'pattern': return Colors.neutral.gray600;
      case 'local': return Colors.secondary.electricBlue;
      case 'cross-country': return Colors.secondary.orange3;
      default: return Colors.neutral.gray600;
    }
  };

  const getFlightTypeLabel = (type: typeof calculatedType) => {
    switch (type) {
      case 'pattern': return 'Pattern Work';
      case 'local': return 'Local Flight';
      case 'cross-country': return 'Cross Country';
      default: return 'Flight';
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Route Header */}
      <View style={styles.routeHeader}>
        <View style={styles.routeVisual}>
          <View style={styles.airportCode}>
            <Text style={styles.airportCodeText}>{from.toUpperCase()}</Text>
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.line} />
            <FontAwesome6 name="plane" size={16} color={Colors.secondary.electricBlue} />
            <View style={styles.line} />
          </View>
          
          <View style={styles.airportCode}>
            <Text style={styles.airportCodeText}>{to.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={[styles.flightTypeBadge, { backgroundColor: getFlightTypeColor(calculatedType) + '20' }]}>
          <Text style={[styles.flightTypeText, { color: getFlightTypeColor(calculatedType) }]}>
            {getFlightTypeLabel(calculatedType)}
          </Text>
        </View>
      </View>

      {/* Airport Names */}
      <View style={styles.airportNames}>
        <Text style={styles.airportName} numberOfLines={1}>{fromName}</Text>
        <FontAwesome6 name="arrow-right" size={12} color={Colors.neutral.gray400} />
        <Text style={styles.airportName} numberOfLines={1}>{toName}</Text>
      </View>

      {/* Route Details */}
      {showDetails && (
        <View style={styles.routeDetails}>
          {calculatedDistance > 0 && (
            <RouteDetail
              icon="route"
              label="Distance"
              value={`${calculatedDistance} nm`}
            />
          )}
          
          {calculatedTime !== '—' && (
            <RouteDetail
              icon="clock"
              label="Est. Time"
              value={calculatedTime}
            />
          )}
          
          {calculatedType === 'cross-country' && (
            <RouteDetail
              icon="compass"
              label="Type"
              value="Cross Country"
            />
          )}
        </View>
      )}
    </View>
  );
};

// Common flight routes for training
export const TrainingRoutes = [
  { from: 'KPAO', to: 'KPAO', label: 'Pattern Work' },
  { from: 'KPAO', to: 'KRHV', label: 'Local Practice Area' },
  { from: 'KPAO', to: 'KLVK', label: 'Cross Country Training' },
  { from: 'KPAO', to: 'KSQL', label: 'Short Cross Country' },
  { from: 'KRHV', to: 'KHWD', label: 'Bay Area Tour' },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: Spacing.md,
    shadowColor: Colors.primary.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  routeVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  airportCode: {
    backgroundColor: Colors.secondary.electricBlue,
    borderRadius: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    minWidth: 50,
    alignItems: 'center',
  },
  airportCodeText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.white,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.neutral.gray300,
  },
  flightTypeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
  },
  flightTypeText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semibold,
  },
  airportNames: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  airportName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
    paddingTop: Spacing.sm,
  },
  routeDetail: {
    alignItems: 'center',
    gap: 2,
  },
  routeDetailLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  routeDetailValue: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Colors, Typography } from '@project-t-rex/components';

interface FlightMapProps {
  from: string;
  to: string;
  style?: any;
}

// Comprehensive airport coordinates database (subset for React Native)
const AIRPORT_COORDINATES: { [key: string]: [number, number] } = {
  // Major US Airports
  'LAX': [-118.4085, 33.9416], 'KLAX': [-118.4085, 33.9416],
  'JFK': [-73.7781, 40.6413], 'KJFK': [-73.7781, 40.6413],
  'SFO': [-122.3897, 37.6189], 'KSFO': [-122.3897, 37.6189],
  'ORD': [-87.9048, 41.9786], 'KORD': [-87.9048, 41.9786],
  'DFW': [-96.8519, 32.8968], 'KDFW': [-96.8519, 32.8968],
  'ATL': [-84.4281, 33.6407], 'KATL': [-84.4281, 33.6407],
  'MIA': [-80.2906, 25.7932], 'KMIA': [-80.2906, 25.7932],
  'DEN': [-104.6737, 39.8561], 'KDEN': [-104.6737, 39.8561],
  'SEA': [-122.3088, 47.4502], 'KSEA': [-122.3088, 47.4502],
  'LAS': [-115.1398, 36.0840], 'KLAS': [-115.1398, 36.0840],
  'PHX': [-112.0116, 33.4484], 'KPHX': [-112.0116, 33.4484],
  'IAH': [-95.3414, 29.9902], 'KIAH': [-95.3414, 29.9902],
  'MCO': [-81.3081, 28.4312], 'KMCO': [-81.3081, 28.4312],
  'CLT': [-80.9471, 35.2144], 'KCLT': [-80.9471, 35.2144],
  'EWR': [-74.1724, 40.6895], 'KEWR': [-74.1724, 40.6895],
  'DTW': [-83.3554, 42.2162], 'KDTW': [-83.3554, 42.2162],
  'BOS': [-71.0059, 42.3656], 'KBOS': [-71.0059, 42.3656],
  'PHL': [-75.2413, 39.8729], 'KPHL': [-75.2413, 39.8729],
  'LGA': [-73.8726, 40.7769], 'KLGA': [-73.8726, 40.7769],
  'FLL': [-80.1496, 26.0742], 'KFLL': [-80.1496, 26.0742],
  'BWI': [-76.6682, 39.1754], 'KBWI': [-76.6682, 39.1754],
  'IAD': [-77.4565, 38.9531], 'KIAD': [-77.4565, 38.9531],
  'SAN': [-117.1897, 32.7338], 'KSAN': [-117.1897, 32.7338],
  'HNL': [-157.9205, 21.3245], 'PHNL': [-157.9205, 21.3245],
  
  // European Airports
  'LHR': [-0.4619, 51.4700], 'EGLL': [-0.4619, 51.4700], // London Heathrow
  'CDG': [2.5559, 49.0097], 'LFPG': [2.5559, 49.0097], // Paris Charles de Gaulle
  'FRA': [8.5706, 50.0379], 'EDDF': [8.5706, 50.0379], // Frankfurt
  'AMS': [4.7639, 52.3086], 'EHAM': [4.7639, 52.3086], // Amsterdam
  'MAD': [-3.5668, 40.4983], 'LEMD': [-3.5668, 40.4983], // Madrid
  'BCN': [2.0785, 41.2974], 'LEBL': [2.0785, 41.2974], // Barcelona
  
  // Asian Airports
  'NRT': [140.3861, 35.6762], 'RJAA': [140.3861, 35.6762], // Tokyo Narita
  'HND': [139.7673, 35.5494], 'RJTT': [139.7673, 35.5494], // Tokyo Haneda
  'ICN': [126.4510, 37.4602], 'RKSI': [126.4510, 37.4602], // Seoul Incheon
  'PEK': [116.4074, 39.9042], 'ZBAA': [116.4074, 39.9042], // Beijing Capital
  'PVG': [121.8053, 31.1443], 'ZSPD': [121.8053, 31.1443], // Shanghai Pudong
  'HKG': [113.9146, 22.3080], 'VHHH': [113.9146, 22.3080], // Hong Kong
  'SIN': [103.8198, 1.3644], 'WSSS': [103.8198, 1.3644], // Singapore Changi
  'BKK': [100.7477, 13.6900], 'VTBS': [100.7477, 13.6900], // Bangkok Suvarnabhumi
  
  // Canadian Airports
  'YYZ': [-79.6306, 43.6777], 'CYYZ': [-79.6306, 43.6777], // Toronto Pearson
  'YVR': [-123.1844, 49.1967], 'CYVR': [-123.1844, 49.1967], // Vancouver
  'YUL': [-73.7408, 45.4706], 'CYUL': [-73.7408, 45.4706], // Montreal
  'YYC': [-114.0203, 51.1139], 'CYYC': [-114.0203, 51.1139], // Calgary
  
  // Australian & Pacific Airports
  'SYD': [151.1772, -33.9399], 'YSSY': [151.1772, -33.9399], // Sydney
  'MEL': [144.9631, -37.8136], 'YMML': [144.9631, -37.8136], // Melbourne
  'BNE': [153.1171, -27.4698], 'YBBN': [153.1171, -27.4698], // Brisbane
  'PER': [115.9672, -31.9404], 'YPPH': [115.9672, -31.9404], // Perth
  
  // Middle Eastern Airports
  'DXB': [55.2708, 25.2532], 'OMDB': [55.2708, 25.2532], // Dubai
  'DOH': [51.6081, 25.2730], 'OTHH': [51.6081, 25.2730], // Doha
  'AUH': [54.6511, 24.4331], 'OMAA': [54.6511, 24.4331], // Abu Dhabi
};

// Function to generate approximate coordinates based on airport code patterns
const generateCoordinatesForAirport = (airportCode: string): [number, number] => {
  const code = airportCode.toUpperCase();
  
  // Generate deterministic coordinates based on the airport code
  const hash = code.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  // Base coordinates by region (rough estimates)
  let baseLng = 0;
  let baseLat = 0;
  let lngRange = 60;
  let latRange = 30;
  
  // Infer region from airport code patterns
  if (code.startsWith('K') || code.startsWith('P')) { // North America
    baseLng = -100;
    baseLat = 40;
    lngRange = 60;
    latRange = 30;
  } else if (code.startsWith('EG') || code.startsWith('LF') || code.startsWith('ED') || code.startsWith('E')) { // Europe
    baseLng = 10;
    baseLat = 50;
    lngRange = 40;
    latRange = 20;
  } else if (code.startsWith('V') || code.startsWith('Z') || code.startsWith('R') || code.startsWith('W')) { // Asia
    baseLng = 110;
    baseLat = 30;
    lngRange = 60;
    latRange = 40;
  } else if (code.startsWith('O')) { // Middle East
    baseLng = 45;
    baseLat = 25;
    lngRange = 30;
    latRange = 20;
  } else if (code.startsWith('C')) { // Canada
    baseLng = -100;
    baseLat = 55;
    lngRange = 60;
    latRange = 15;
  } else if (code.startsWith('Y')) { // Australia/Pacific
    baseLng = 140;
    baseLat = -25;
    lngRange = 40;
    latRange = 30;
  } else if (code.startsWith('S')) { // South America
    baseLng = -60;
    baseLat = -15;
    lngRange = 40;
    latRange = 40;
  } else if (code.startsWith('H') || code.startsWith('F')) { // Africa
    baseLng = 20;
    baseLat = 0;
    lngRange = 40;
    latRange = 60;
  }
  
  // Generate coordinates within the region
  const lng = baseLng + ((hash % 1000) / 1000 * lngRange) - (lngRange / 2);
  const lat = baseLat + (((hash * 7) % 1000) / 1000 * latRange) - (latRange / 2);
  
  return [lng, lat];
};

// Function to get airport coordinates with fallback
const getAirportCoordinates = (airportCode: string): [number, number] => {
  const upperCode = airportCode.toUpperCase();
  
  // Try direct lookup
  if (AIRPORT_COORDINATES[upperCode]) {
    return AIRPORT_COORDINATES[upperCode];
  }
  
  // Generate fallback coordinates
  return generateCoordinatesForAirport(upperCode);
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance);
};

// Calculate estimated flight time based on distance
const calculateFlightTime = (distance: number): string => {
  // Assume average commercial speed of 500 mph
  const hours = distance / 500;
  const totalMinutes = Math.round(hours * 60);
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = totalMinutes % 60;
  
  if (displayHours > 0) {
    return `${displayHours}h ${displayMinutes}m`;
  } else {
    return `${displayMinutes}m`;
  }
};

const FlightMap: React.FC<FlightMapProps> = ({ from, to, style }) => {
  // Show placeholder when no airports are specified
  if (!from || !to) {
    return (
      <View style={[styles.placeholder, style]}>
        <Icon name="plane" size={48} color={Colors.neutral.gray400} />
        <Text style={styles.placeholderTitle}>Flight Route Map</Text>
        <Text style={styles.placeholderSubtitle}>
          Enter departure and arrival airports to view route
        </Text>
      </View>
    );
  }

  const fromCoords = getAirportCoordinates(from);
  const toCoords = getAirportCoordinates(to);
  const distance = calculateDistance(fromCoords, toCoords);
  const flightTime = calculateFlightTime(distance);

  return (
    <View style={[styles.container, style]}>
      {/* Map placeholder with route info */}
      <View style={styles.mapPlaceholder}>
        <Icon name="map" size={32} color={Colors.neutral.gray400} />
        <Text style={styles.mapTitle}>Interactive Flight Map</Text>
        <Text style={styles.routeInfo}>Route: {from} → {to}</Text>
      </View>

      {/* Flight details */}
      <View style={styles.flightDetails}>
        <View style={styles.airportRow}>
          <View style={styles.airport}>
            <View style={styles.airportMarker}>
              <Icon name="plane" size={12} color={Colors.primary.white} />
            </View>
            <Text style={styles.airportCode}>{from}</Text>
            <Text style={styles.airportLabel}>Departure</Text>
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.dottedLine} />
            <Icon name="arrowRight" size={16} color={Colors.neutral.gray400} />
          </View>
          
          <View style={styles.airport}>
            <View style={[styles.airportMarker, styles.arrivalMarker]}>
              <Icon name="mapPin" size={12} color={Colors.primary.white} />
            </View>
            <Text style={styles.airportCode}>{to}</Text>
            <Text style={styles.airportLabel}>Arrival</Text>
          </View>
        </View>

        <View style={styles.flightInfo}>
          <View style={styles.infoItem}>
            <Icon name="route" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{distance} miles</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="clock" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.infoLabel}>Est. Flight Time</Text>
            <Text style={styles.infoValue}>{flightTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  placeholderTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginTop: 12,
    marginBottom: 4,
  },
  placeholderSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    textAlign: 'center',
  },
  mapPlaceholder: {
    backgroundColor: Colors.neutral.gray100,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  mapTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  routeInfo: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 4,
  },
  flightDetails: {
    padding: 20,
  },
  airportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  airport: {
    alignItems: 'center',
    flex: 1,
  },
  airportMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e3a8a', // Dark blue
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  arrivalMarker: {
    backgroundColor: '#93c5fd', // Light blue
  },
  airportCode: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  airportLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 16,
  },
  dottedLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.neutral.gray300,
    marginRight: 8,
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
});

export default FlightMap;

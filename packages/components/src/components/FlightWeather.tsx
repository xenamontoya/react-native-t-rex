import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  humidity: number;
  pressure: number;
}

interface FlightWeatherProps {
  from: string;
  to: string;
  style?: any;
}

// ICAO to IATA code mapping for worldwide airports
const ICAO_TO_IATA: { [key: string]: string } = {
  // US Airports
  'KLAX': 'LAX', 'KJFK': 'JFK', 'KSFO': 'SFO', 'KORD': 'ORD', 'KDFW': 'DFW',
  'KATL': 'ATL', 'KMIA': 'MIA', 'KDEN': 'DEN', 'KSEA': 'SEA', 'KLAS': 'LAS',
  'KPHX': 'PHX', 'KIAH': 'IAH', 'KMCO': 'MCO', 'KCLT': 'CLT', 'KEWR': 'EWR',
  'KDTW': 'DTW', 'KBOS': 'BOS', 'KPHL': 'PHL', 'KLGA': 'LGA', 'KFLL': 'FLL',
  'KBWI': 'BWI', 'KIAD': 'IAD', 'KSAN': 'SAN', 'PHNL': 'HNL', 'KAUS': 'AUS',
  'KBNA': 'BNA', 'KRDU': 'RDU', 'KCLE': 'CLE', 'KPIT': 'PIT', 'KIND': 'IND',
  'KCVG': 'CVG', 'KMSP': 'MSP', 'KPDX': 'PDX', 'KSLC': 'SLC',
  // Training airports
  'KPAO': 'PAO', 'KRHV': 'RHV', 'KLVK': 'LVK', 'KHWD': 'HWD', 'KSQL': 'SQL',
  'KNUQ': 'NUQ', 'KCCR': 'CCR', 'KSTS': 'STS',
  
  // European Airports
  'EGLL': 'LHR', 'LFPG': 'CDG', 'EDDF': 'FRA', 'EHAM': 'AMS', 'LEMD': 'MAD',
  'LEBL': 'BCN', 'EDDM': 'MUC', 'LSZH': 'ZRH', 'LOWW': 'VIE', 'EKCH': 'CPH',
  
  // Asian Airports  
  'RJAA': 'NRT', 'RJTT': 'HND', 'RKSI': 'ICN', 'ZBAA': 'PEK', 'ZSPD': 'PVG',
  'VHHH': 'HKG', 'WSSS': 'SIN', 'VTBS': 'BKK', 'WMKK': 'KUL',
  
  // Canadian Airports
  'CYYZ': 'YYZ', 'CYVR': 'YVR', 'CYUL': 'YUL', 'CYYC': 'YYC', 'CYOW': 'YOW',
  
  // Australian Airports
  'YSSY': 'SYD', 'YMML': 'MEL', 'YBBN': 'BNE', 'YPPH': 'PER',
};

// Function to normalize airport code (convert ICAO to IATA if possible)
const normalizeAirportCode = (code: string): string => {
  const upperCode = code.toUpperCase();
  if (ICAO_TO_IATA[upperCode]) {
    return ICAO_TO_IATA[upperCode];
  }
  return upperCode;
};

// Generate realistic weather data based on airport code and region
const generateWeatherForAirport = (code: string): WeatherData => {
  // Create deterministic hash from airport code for consistent weather
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = ((hash << 5) - hash + code.charCodeAt(i)) & 0xffffffff;
  }
  hash = Math.abs(hash);

  // Regional defaults based on airport code patterns
  let defaultTemp = 72;
  let defaultHumidity = 60;
  
  if (code.startsWith('K')) { // US
    defaultTemp = 68;
    defaultHumidity = 55;
  } else if (code.startsWith('C')) { // Canada
    defaultTemp = 50;
    defaultHumidity = 65;
  } else if (code.startsWith('E')) { // Europe
    defaultTemp = 60;
    defaultHumidity = 70;
  } else if (code.startsWith('R') || code.startsWith('Z')) { // Asia
    defaultTemp = 75;
    defaultHumidity = 80;
  } else if (code.startsWith('Y')) { // Australia
    defaultTemp = 77;
    defaultHumidity = 50;
  }

  const tempVariation = ((hash % 40) - 20); // ±20°F variation
  const windVariation = 5 + (hash % 25); // 5-30 kts
  
  const conditions = ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Hazy', 'Scattered Clouds'];
  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  return {
    temperature: Math.round(defaultTemp + tempVariation),
    condition: conditions[hash % conditions.length],
    windSpeed: windVariation,
    windDirection: windDirections[hash % windDirections.length],
    visibility: Math.max(3, 25 - (hash % 20)), // 3-25 miles
    humidity: Math.max(20, Math.min(95, defaultHumidity + ((hash % 40) - 20))),
    pressure: 29.8 + ((hash % 40) / 100) // 29.8-30.2 inHg
  };
};

// Get weather icon based on condition
const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return { name: 'sun', color: '#F59E0B' }; // yellow-500
  } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return { name: 'cloud-rain', color: '#3B82F6' }; // blue-500
  } else if (conditionLower.includes('snow')) {
    return { name: 'snowflake', color: '#93C5FD' }; // blue-300
  } else if (conditionLower.includes('partly') || conditionLower.includes('scattered')) {
    return { name: 'cloud-sun', color: '#9CA3AF' }; // gray-400
  } else {
    return { name: 'cloud', color: '#6B7280' }; // gray-500
  }
};

// Weather card component
const WeatherCard: React.FC<{
  airport: string;
  weather: WeatherData;
  title: string;
}> = ({ airport, weather, title }) => {
  const weatherIcon = getWeatherIcon(weather.condition);

  return (
    <View style={styles.weatherCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.airportCode}>{airport}</Text>
      </View>

      {/* Main Weather Info */}
      <View style={styles.mainWeatherInfo}>
        {/* Temperature and Condition */}
        <View style={styles.tempConditionRow}>
          <View style={styles.temperatureSection}>
            <FontAwesome6 name="thermometer-half" size={16} color="#EF4444" />
            <Text style={styles.temperature}>{weather.temperature}°F</Text>
          </View>
          <View style={styles.conditionSection}>
            <FontAwesome6 name={weatherIcon.name as any} size={16} color={weatherIcon.color} />
            <Text style={styles.condition}>{weather.condition}</Text>
          </View>
        </View>

        {/* Wind */}
        <View style={styles.weatherDataRow}>
          <View style={styles.weatherDataLabel}>
            <FontAwesome6 name="wind" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.dataLabel}>Wind</Text>
          </View>
          <Text style={styles.dataValue}>
            {weather.windSpeed} kts {weather.windDirection}
          </Text>
        </View>

        {/* Visibility */}
        <View style={styles.weatherDataRow}>
          <View style={styles.weatherDataLabel}>
            <FontAwesome6 name="eye" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.dataLabel}>Visibility</Text>
          </View>
          <Text style={styles.dataValue}>{weather.visibility} mi</Text>
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalText}>Humidity: {weather.humidity}%</Text>
          <Text style={styles.additionalText}>Pressure: {weather.pressure.toFixed(2)}"</Text>
        </View>
      </View>
    </View>
  );
};

// Main FlightWeather component
export const FlightWeather: React.FC<FlightWeatherProps> = ({ from, to, style }) => {
  const [departureWeather, setDepartureWeather] = useState<WeatherData | null>(null);
  const [arrivalWeather, setArrivalWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!from || !to) return;

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const normalizedFrom = normalizeAirportCode(from);
      const normalizedTo = normalizeAirportCode(to);

      const fromWeather = generateWeatherForAirport(normalizedFrom);
      const toWeather = generateWeatherForAirport(normalizedTo);

      setDepartureWeather(fromWeather);
      setArrivalWeather(toWeather);
      setLoading(false);
    }, 500);
  }, [from, to]);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={Colors.secondary.electricBlue} />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {departureWeather && (
        <WeatherCard
          airport={from}
          weather={departureWeather}
          title="Departure Weather"
        />
      )}
      {arrivalWeather && (
        <WeatherCard
          airport={to}
          weather={arrivalWeather}
          title="Arrival Weather"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  weatherCard: {
    backgroundColor: 'rgba(246, 163, 69, 0.1)', // Matches your web app
    borderWidth: 1,
    borderColor: 'rgba(246, 163, 69, 0.3)',
    borderRadius: 8,
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  airportCode: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: '#C44510', // Matches your web app
  },
  mainWeatherInfo: {
    gap: Spacing.sm,
  },
  tempConditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  temperature: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray800,
  },
  conditionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  condition: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  weatherDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherDataLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dataLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  dataValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray800,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  additionalText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  loadingCard: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  loadingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface FlightWeatherProps {
  from: string;
  to: string;
  style?: any;
}

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  humidity: number;
  pressure: number;
}

// ICAO to IATA code mapping for common airports
const ICAO_TO_IATA: { [key: string]: string } = {
  // US Airports
  'KLAX': 'LAX', 'KJFK': 'JFK', 'KSFO': 'SFO', 'KORD': 'ORD', 'KDFW': 'DFW',
  'KATL': 'ATL', 'KMIA': 'MIA', 'KDEN': 'DEN', 'KSEA': 'SEA', 'KLAS': 'LAS',
  'KPHX': 'PHX', 'KIAH': 'IAH', 'KMCO': 'MCO', 'KCLT': 'CLT', 'KEWR': 'EWR',
  'KDTW': 'DTW', 'KBOS': 'BOS', 'KPHL': 'PHL', 'KLGA': 'LGA', 'KFLL': 'FLL',
  'KBWI': 'BWI', 'KIAD': 'IAD', 'KSAN': 'SAN', 'PHNL': 'HNL', 'KAUS': 'AUS',
  'KBNA': 'BNA', 'KRDU': 'RDU', 'KCLE': 'CLE', 'KPIT': 'PIT', 'KIND': 'IND',
  'KCVG': 'CVG', 'KMSP': 'MSP', 'KPDX': 'PDX', 'KSLC': 'SLC',
  
  // European Airports
  'EGLL': 'LHR', 'LFPG': 'CDG', 'EDDF': 'FRA', 'EHAM': 'AMS', 'LEMD': 'MAD',
  'LEBL': 'BCN', 'EDDM': 'MUC', 'LSZH': 'ZRH', 'LOWW': 'VIE', 'EKCH': 'CPH',
  'ESSA': 'ARN', 'ENGM': 'OSL', 'EFHK': 'HEL', 'EPWA': 'WAW', 'LKPR': 'PRG',
  'LHBP': 'BUD', 'LTFM': 'IST', 'LGAV': 'ATH', 'LPPT': 'LIS', 'LPPR': 'OPO',
  'EIDW': 'DUB', 'EGPH': 'EDI', 'EGCC': 'MAN', 'EGBB': 'BHX', 'EGPF': 'GLA',
  
  // Asian Airports
  'RJAA': 'NRT', 'RJTT': 'HND', 'RKSI': 'ICN', 'ZBAA': 'PEK', 'ZSPD': 'PVG',
  'VHHH': 'HKG', 'WSSS': 'SIN', 'VTBS': 'BKK', 'WMKK': 'KUL', 'VIDP': 'DEL',
  'VABB': 'BOM', 'VOBL': 'BLR', 'VOMM': 'MAA', 'VOHS': 'HYD', 'VECC': 'CCU',
  
  // Canadian Airports
  'CYYZ': 'YYZ', 'CYVR': 'YVR', 'CYUL': 'YUL', 'CYYC': 'YYC', 'CYOW': 'YOW',
  'CYEG': 'YEG', 'CYHZ': 'YHZ', 'CYWG': 'YWG',
  
  // Australian Airports
  'YSSY': 'SYD', 'YMML': 'MEL', 'YBBN': 'BNE', 'YPPH': 'PER', 'YPAD': 'ADL',
  'YSCB': 'CBR', 'YPDN': 'DRW', 'YMHB': 'HOB',
  
  // Middle Eastern Airports
  'OMDB': 'DXB', 'OMAA': 'AUH', 'OTHH': 'DOH', 'OERK': 'RUH', 'OEJN': 'JED',
  'OJAI': 'AMM', 'OLBA': 'BEY', 'LLBG': 'TLV', 'HECA': 'CAI', 'OKBK': 'KWI',
  
  // Latin American Airports
  'SBGR': 'GRU', 'SBBR': 'BSB', 'SBGL': 'GIG', 'MMMX': 'MEX', 'SKBO': 'BOG',
  'SCEL': 'SCL', 'SAEZ': 'EZE', 'SUMU': 'MVD', 'SPJC': 'LIM'
};

// Function to normalize airport code (convert ICAO to IATA if possible)
const normalizeAirportCode = (code: string): string => {
  const upperCode = code.toUpperCase();
  // If it's an ICAO code, convert to IATA
  if (ICAO_TO_IATA[upperCode]) {
    return ICAO_TO_IATA[upperCode];
  }
  // If it's already IATA or unknown, return as is
  return upperCode;
};

// Function to generate weather based on airport code and location hints
const generateWeatherForAirport = (airportCode: string): WeatherData => {
  const code = airportCode.toUpperCase();
  
  // Base weather patterns by region/airport characteristics
  const weatherPatterns: { [key: string]: Partial<WeatherData> } = {
    // US West Coast - generally mild
    'LAX': { temperature: 72, condition: 'Clear', humidity: 65 },
    'SFO': { temperature: 62, condition: 'Foggy', humidity: 85 },
    'SEA': { temperature: 58, condition: 'Overcast', humidity: 80 },
    'PDX': { temperature: 60, condition: 'Light Rain', humidity: 75 },
    
    // US East Coast - variable
    'JFK': { temperature: 68, condition: 'Partly Cloudy', humidity: 60 },
    'BOS': { temperature: 65, condition: 'Clear', humidity: 55 },
    'MIA': { temperature: 85, condition: 'Partly Cloudy', humidity: 75 },
    'ATL': { temperature: 78, condition: 'Clear', humidity: 65 },
    
    // US Central - continental
    'ORD': { temperature: 70, condition: 'Overcast', humidity: 60 },
    'DFW': { temperature: 85, condition: 'Clear', humidity: 45 },
    'DEN': { temperature: 45, condition: 'Clear', humidity: 30 },
    'LAS': { temperature: 95, condition: 'Clear', humidity: 15 },
    
    // European - temperate
    'LHR': { temperature: 62, condition: 'Overcast', humidity: 80 },
    'CDG': { temperature: 65, condition: 'Partly Cloudy', humidity: 70 },
    'FRA': { temperature: 60, condition: 'Light Rain', humidity: 75 },
    'AMS': { temperature: 58, condition: 'Overcast', humidity: 85 },
    
    // Asian - varied
    'NRT': { temperature: 70, condition: 'Clear', humidity: 65 },
    'PEK': { temperature: 68, condition: 'Hazy', humidity: 45 },
    'SIN': { temperature: 88, condition: 'Partly Cloudy', humidity: 85 },
    'BKK': { temperature: 90, condition: 'Partly Cloudy', humidity: 80 },
    
    // Middle Eastern - hot and dry
    'DXB': { temperature: 95, condition: 'Clear', humidity: 40 },
    'DOH': { temperature: 92, condition: 'Clear', humidity: 45 },
    
    // Australian - varied
    'SYD': { temperature: 75, condition: 'Clear', humidity: 60 },
    'MEL': { temperature: 65, condition: 'Overcast', humidity: 70 }
  };
  
  // Get base weather or use fallback
  const baseWeather = weatherPatterns[code] || {};
  
  // Generate reasonable defaults with some variation
  const hash = code.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const tempVariation = (hash % 20) - 10; // ±10°F variation
  const windVariation = (hash % 15) + 5; // 5-20 kts
  
  // Default patterns based on code characteristics
  let defaultTemp = 70;
  let defaultCondition = 'Clear';
  let defaultHumidity = 60;
  
  // Infer climate from airport code patterns
  if (code.startsWith('K')) { // US airports
    defaultTemp = 75;
  } else if (code.startsWith('EG') || code.startsWith('LF') || code.startsWith('ED')) { // European
    defaultTemp = 60;
    defaultCondition = 'Overcast';
    defaultHumidity = 75;
  } else if (code.startsWith('V') || code.startsWith('Z')) { // Asian
    defaultTemp = 80;
    defaultHumidity = 70;
  } else if (code.startsWith('O')) { // Middle Eastern
    defaultTemp = 90;
    defaultHumidity = 35;
  } else if (code.startsWith('Y')) { // Canadian
    defaultTemp = 50;
    defaultHumidity = 65;
  }
  
  const conditions = ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Hazy'];
  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  return {
    temperature: Math.round((baseWeather.temperature || defaultTemp) + tempVariation),
    condition: baseWeather.condition || conditions[hash % conditions.length],
    windSpeed: windVariation,
    windDirection: windDirections[hash % windDirections.length],
    visibility: Math.max(3, 25 - (hash % 20)), // 3-25 miles
    humidity: baseWeather.humidity || defaultHumidity,
    pressure: 29.8 + ((hash % 40) / 100) // 29.8-30.2 inHg
  };
};

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'sun';
  } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return 'cloudRain';
  } else if (conditionLower.includes('snow')) {
    return 'snowflake';
  } else {
    return 'cloud';
  }
};

const getWeatherIconColor = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return '#fbbf24';
  } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return '#3b82f6';
  } else if (conditionLower.includes('snow')) {
    return '#93c5fd';
  } else {
    return '#6b7280';
  }
};

const WeatherCard: React.FC<{ airport: string; weather: WeatherData; title: string }> = ({ airport, weather, title }) => {
  return (
    <View style={styles.weatherCard}>
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherTitle}>{title}</Text>
        <Text style={styles.airportCode}>{airport}</Text>
      </View>
      
      <View style={styles.weatherContent}>
        {/* Temperature and Condition */}
        <View style={styles.weatherRow}>
          <View style={styles.weatherSection}>
            <Icon name="thermometer" size={16} color="#ef4444" />
            <Text style={styles.temperatureText}>{weather.temperature}°F</Text>
          </View>
          <View style={styles.weatherSection}>
            <Icon name={getWeatherIcon(weather.condition)} size={16} color={getWeatherIconColor(weather.condition)} />
            <Text style={styles.conditionText}>{weather.condition}</Text>
          </View>
        </View>
        
        {/* Wind */}
        <View style={styles.weatherRow}>
          <View style={styles.weatherSection}>
            <Icon name="wind" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.weatherLabel}>Wind</Text>
          </View>
          <Text style={styles.weatherValue}>
            {weather.windSpeed} kts {weather.windDirection}
          </Text>
        </View>
        
        {/* Visibility */}
        <View style={styles.weatherRow}>
          <View style={styles.weatherSection}>
            <Icon name="eye" size={14} color={Colors.neutral.gray500} />
            <Text style={styles.weatherLabel}>Visibility</Text>
          </View>
          <Text style={styles.weatherValue}>
            {weather.visibility} mi
          </Text>
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

const FlightWeather: React.FC<FlightWeatherProps> = ({ from, to, style }) => {
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

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Loading weather...</Text>
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
    gap: 16,
  },
  weatherCard: {
    backgroundColor: '#fef7ec', // rgba(246, 163, 69, 0.1) equivalent
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fed7aa', // rgba(246, 163, 69, 0.3) equivalent
    padding: 16,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  airportCode: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#c44510',
  },
  weatherContent: {
    gap: 12,
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  temperatureText: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray800,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  weatherLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  weatherValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray800,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  additionalText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  loadingCard: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
});

export default FlightWeather;

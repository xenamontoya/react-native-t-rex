import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';
import { StatusBadge } from './StatusBadge';

export interface AircraftInfo {
  id: string;
  registration: string; // N-number (e.g., "N12345")
  type: string; // Aircraft type (e.g., "Cessna 172S")
  model?: string; // Specific model (e.g., "172S")
  year?: number;
  status: 'available' | 'in-flight' | 'maintenance' | 'reserved';
  location?: string; // Current location
  hobbsTime?: number; // Current hobbs time
  tachTime?: number; // Current tach time
  nextMaintenance?: Date;
  fuelLevel?: number; // Percentage
  lastFlight?: Date;
  totalTime?: number; // Total aircraft hours
  image?: string;
}

export interface AircraftCardProps {
  aircraft: AircraftInfo;
  onPress?: () => void;
  showDetails?: boolean;
  compact?: boolean;
}

export const AircraftCard: React.FC<AircraftCardProps> = ({
  aircraft,
  onPress,
  showDetails = true,
  compact = false,
}) => {
  const getStatusColor = (status: AircraftInfo['status']) => {
    switch (status) {
      case 'available':
        return 'complete'; // Green
      case 'in-flight':
        return 'in-progress'; // Orange
      case 'maintenance':
        return 'cancelled'; // Red
      case 'reserved':
        return 'pending'; // Yellow
      default:
        return 'pending';
    }
  };

  const getAircraftIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('cessna') || lowerType.includes('172') || lowerType.includes('152')) {
      return 'plane';
    } else if (lowerType.includes('piper') || lowerType.includes('cherokee')) {
      return 'plane';
    } else if (lowerType.includes('diamond') || lowerType.includes('da20')) {
      return 'plane';
    } else {
      return 'plane';
    }
  };

  const CardContent = (
    <View style={[styles.card, compact && styles.cardCompact]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.aircraftInfo}>
          <View style={styles.iconContainer}>
            <FontAwesome6 
              name={getAircraftIcon(aircraft.type)} 
              size={compact ? 20 : 24} 
              color={Colors.secondary.electricBlue} 
            />
          </View>
          <View style={styles.aircraftDetails}>
            <Text style={[styles.registration, compact && styles.registrationCompact]}>
              {aircraft.registration}
            </Text>
            <Text style={[styles.aircraftType, compact && styles.aircraftTypeCompact]}>
              {aircraft.type}
            </Text>
          </View>
        </View>
        
        <StatusBadge status={getStatusColor(aircraft.status)} />
      </View>

      {/* Details */}
      {showDetails && !compact && (
        <View style={styles.details}>
          {/* Flight Hours */}
          {(aircraft.hobbsTime || aircraft.tachTime) && (
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <FontAwesome6 name="clock" size={14} color={Colors.neutral.gray500} />
                <Text style={styles.detailLabel}>Hobbs</Text>
                <Text style={styles.detailValue}>
                  {aircraft.hobbsTime?.toFixed(1) || '—'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome6 name="tachometer-alt" size={14} color={Colors.neutral.gray500} />
                <Text style={styles.detailLabel}>Tach</Text>
                <Text style={styles.detailValue}>
                  {aircraft.tachTime?.toFixed(1) || '—'}
                </Text>
              </View>
            </View>
          )}

          {/* Location & Fuel */}
          <View style={styles.detailRow}>
            {aircraft.location && (
              <View style={styles.detailItem}>
                <FontAwesome6 name="location-dot" size={14} color={Colors.neutral.gray500} />
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{aircraft.location}</Text>
              </View>
            )}
            {aircraft.fuelLevel !== undefined && (
              <View style={styles.detailItem}>
                <FontAwesome6 name="gas-pump" size={14} color={Colors.neutral.gray500} />
                <Text style={styles.detailLabel}>Fuel</Text>
                <Text style={styles.detailValue}>{aircraft.fuelLevel}%</Text>
              </View>
            )}
          </View>

          {/* Maintenance */}
          {aircraft.nextMaintenance && (
            <View style={styles.maintenanceRow}>
              <FontAwesome6 name="wrench" size={14} color={Colors.neutral.gray500} />
              <Text style={styles.maintenanceText}>
                Next: {aircraft.nextMaintenance.toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Compact details */}
      {compact && showDetails && (
        <View style={styles.compactDetails}>
          <Text style={styles.compactDetailText}>
            {aircraft.location} • {aircraft.hobbsTime?.toFixed(1)}h
          </Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

// Aircraft grid for displaying multiple aircraft
export const AircraftGrid: React.FC<{
  aircraft: AircraftInfo[];
  onAircraftPress?: (aircraft: AircraftInfo) => void;
  compact?: boolean;
  numColumns?: number;
}> = ({ aircraft, onAircraftPress, compact = false, numColumns = 2 }) => {
  return (
    <View style={styles.grid}>
      {aircraft.map((plane) => (
        <View key={plane.id} style={[styles.gridItem, { width: `${100 / numColumns}%` }]}>
          <AircraftCard
            aircraft={plane}
            onPress={() => onAircraftPress?.(plane)}
            compact={compact}
          />
        </View>
      ))}
    </View>
  );
};

// Flight training aircraft presets
export const TrainingAircraft: AircraftInfo[] = [
  {
    id: '1',
    registration: 'N1234P',
    type: 'Cessna 172S',
    year: 2018,
    status: 'available',
    location: 'PAO',
    hobbsTime: 1234.5,
    tachTime: 987.2,
    fuelLevel: 85,
    totalTime: 1234.5,
    nextMaintenance: new Date('2025-04-15'),
  },
  {
    id: '2',
    registration: 'N5678T',
    type: 'Cessna 152',
    year: 1995,
    status: 'in-flight',
    location: 'Local',
    hobbsTime: 2456.8,
    tachTime: 1987.4,
    fuelLevel: 60,
    totalTime: 2456.8,
    nextMaintenance: new Date('2025-03-28'),
  },
  {
    id: '3',
    registration: 'N9012S',
    type: 'Piper PA-28',
    year: 2015,
    status: 'reserved',
    location: 'RHV',
    hobbsTime: 876.3,
    tachTime: 654.1,
    fuelLevel: 95,
    totalTime: 876.3,
    nextMaintenance: new Date('2025-05-10'),
  },
  {
    id: '4',
    registration: 'N3456F',
    type: 'Diamond DA20',
    year: 2020,
    status: 'maintenance',
    location: 'Hangar A',
    hobbsTime: 234.7,
    tachTime: 189.2,
    fuelLevel: 0,
    totalTime: 234.7,
    nextMaintenance: new Date('2025-02-20'),
  },
];

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  cardCompact: {
    padding: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  aircraftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary.electricBlue + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  aircraftDetails: {
    flex: 1,
  },
  registration: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  registrationCompact: {
    fontSize: Typography.fontSize.base,
  },
  aircraftType: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  aircraftTypeCompact: {
    fontSize: Typography.fontSize.xs,
  },
  details: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.xs,
  },
  detailLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  maintenanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  maintenanceText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  compactDetails: {
    marginTop: Spacing.xs,
  },
  compactDetailText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -Spacing.xs,
  },
  gridItem: {
    padding: Spacing.xs,
  },
});

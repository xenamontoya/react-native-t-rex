import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';
import { StatusBadge } from './StatusBadge';

export interface DataListItem {
  label: string;
  value: string | React.ReactNode;
  type?: 'text' | 'status' | 'custom';
  statusType?: 'scheduled' | 'confirmed' | 'complete' | 'pending' | 'cancelled' | 'in-progress';
}

export interface DataListProps {
  items: DataListItem[];
  showBorders?: boolean;
  spacing?: 'compact' | 'comfortable';
}

export interface DataCardProps {
  title?: string;
  subtitle?: string;
  status?: string;
  statusType?: 'scheduled' | 'confirmed' | 'complete' | 'pending' | 'cancelled' | 'in-progress';
  items: DataListItem[];
  onPress?: () => void;
  showBorders?: boolean;
  actions?: React.ReactNode;
}

// Key-value data list that matches your web app pattern
export const DataList: React.FC<DataListProps> = ({ 
  items, 
  showBorders = true, 
  spacing = 'comfortable' 
}) => {
  const paddingVertical = spacing === 'compact' ? Spacing.xs : Spacing.sm;

  return (
    <View style={styles.dataList}>
      {items.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.dataListItem,
            { paddingVertical },
            showBorders && index !== items.length - 1 && styles.dataListItemBorder,
          ]}
        >
          <Text style={styles.dataListLabel}>{item.label}</Text>
          
          {item.type === 'status' && item.statusType ? (
            <StatusBadge status={item.statusType} />
          ) : item.type === 'custom' ? (
            item.value
          ) : (
            <Text style={styles.dataListValue}>{item.value}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

// Complete card component matching your reservation/flight cards
export const DataCard: React.FC<DataCardProps> = ({
  title,
  subtitle,
  status,
  statusType,
  items,
  onPress,
  showBorders = true,
  actions,
}) => {
  const CardContent = (
    <View style={styles.card}>
      {/* Card Header */}
      {(title || subtitle || status) && (
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderText}>
            {title && <Text style={styles.cardTitle}>{title}</Text>}
            {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
          </View>
          {status && statusType && (
            <StatusBadge status={statusType} />
          )}
        </View>
      )}

      {/* Card Data */}
      <DataList 
        items={items} 
        showBorders={showBorders}
        spacing="comfortable"
      />

      {/* Actions */}
      {actions && (
        <View style={styles.cardActions}>
          {actions}
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

// Reservation card that matches your exact web app pattern
export const ReservationCard: React.FC<{
  reservation: {
    id: string;
    type: string;
    date: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    aircraft: string;
    aircraftType: string;
    instructor?: string;
    student?: string;
    status: 'scheduled' | 'confirmed' | 'complete' | 'pending' | 'cancelled';
  };
  onPress?: () => void;
}> = ({ reservation, onPress }) => {
  const items: DataListItem[] = [
    { label: 'Date', value: reservation.date },
    { label: 'Time', value: `${reservation.startTime} - ${reservation.endTime}` },
    { label: 'Aircraft', value: reservation.aircraft },
    { label: 'Aircraft Type', value: reservation.aircraftType },
    ...(reservation.instructor ? [{ label: 'Instructor', value: reservation.instructor }] : []),
    ...(reservation.student ? [{ label: 'Student', value: reservation.student }] : []),
    { 
      label: 'Status', 
      value: '', 
      type: 'status' as const, 
      statusType: reservation.status 
    },
  ];

  return (
    <DataCard
      title={reservation.type}
      subtitle={`${reservation.dayOfWeek}, ${reservation.date}`}
      status={reservation.status}
      statusType={reservation.status}
      items={items}
      onPress={onPress}
    />
  );
};

// Flight logbook entry card
export const FlightCard: React.FC<{
  flight: {
    id: string;
    date: string;
    flightNumber?: string;
    aircraft: string;
    aircraftType: string;
    from: string;
    to: string;
    totalTime: string;
    instructor?: string;
    dayLandings?: number;
    nightLandings?: number;
    pic?: string;
    dual?: string;
  };
  onPress?: () => void;
}> = ({ flight, onPress }) => {
  const items: DataListItem[] = [
    { label: 'Date', value: flight.date },
    ...(flight.flightNumber ? [{ label: 'Flight Number', value: flight.flightNumber }] : []),
    { label: 'Aircraft', value: `${flight.aircraft} (${flight.aircraftType})` },
    { label: 'Route', value: `${flight.from} → ${flight.to}` },
    { label: 'Total Time', value: flight.totalTime },
    ...(flight.instructor ? [{ label: 'Instructor', value: flight.instructor }] : []),
    ...(flight.dayLandings ? [{ label: 'Day Landings', value: flight.dayLandings.toString() }] : []),
    ...(flight.nightLandings ? [{ label: 'Night Landings', value: flight.nightLandings.toString() }] : []),
    ...(flight.pic ? [{ label: 'PIC', value: flight.pic }] : []),
    ...(flight.dual ? [{ label: 'Dual', value: flight.dual }] : []),
  ];

  return (
    <DataCard
      title={`${flight.from} → ${flight.to}`}
      subtitle={flight.date}
      items={items}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  dataList: {
    // Container for data list items
  },
  dataListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  dataListItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  dataListLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    flex: 1,
  },
  dataListValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    textAlign: 'right',
    flex: 2,
  },
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  cardHeaderText: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  cardActions: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
});

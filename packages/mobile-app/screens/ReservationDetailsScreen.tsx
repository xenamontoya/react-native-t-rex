import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

interface ReservationDetailsScreenProps {
  route?: {
    params?: {
      reservation?: any;
    };
  };
  navigation?: any;
}

export default function ReservationDetailsScreen({ route, navigation }: ReservationDetailsScreenProps) {
  const reservation = route?.params?.reservation || {
    id: '1',
    aircraft: { tail_number: 'N12345', type: 'Cessna 172' },
    date: 'DEC 15, 2025',
    time: '2:00 - 4:00 PM',
    duration: '2.0 HOURS',
    instructor: 'Sarah Mitchell',
    type: 'Dual Instruction',
    cost: '$485.00',
    status: 'Confirmed',
    location: 'Reid-Hillview Airport (KRHV)',
    notes: 'Practice maneuvers and landing pattern work'
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action: string) => {
    Alert.alert('Action', `${action} - ${reservation.aircraft.tail_number}`);
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    handleAction(action);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrowLeft" size={24} color={Colors.primary.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservation Details</Text>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Icon name="ellipsisV" size={20} color={Colors.primary.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Reservation Card */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.h1}>{reservation.aircraft.tail_number}</Text>
            <View style={[styles.statusBadge, reservation.status === 'Confirmed' && styles.confirmedBadge]}>
              <Text style={[styles.statusText, reservation.status === 'Confirmed' && styles.confirmedText]}>
                {reservation.status}
              </Text>
            </View>
          </View>

          <Text style={styles.aircraftType}>{reservation.aircraft.type}</Text>
          <Text style={styles.instructionType}>{reservation.type} with {reservation.instructor}</Text>

          {/* Date and Time */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Date & Time</Text>
            </View>
            <Text style={styles.detailValue}>{reservation.date}, {reservation.time}</Text>
          </View>

          {/* Duration */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="clock" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Duration</Text>
            </View>
            <Text style={styles.detailValue}>{reservation.duration}</Text>
          </View>

          {/* Location */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="mapMarkerAlt" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Location</Text>
            </View>
            <Text style={styles.detailValue}>{reservation.location}</Text>
          </View>

          {/* Cost */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="creditCard" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Estimated Cost</Text>
            </View>
            <Text style={styles.costValue}>{reservation.cost}</Text>
          </View>

          {/* Notes */}
          {reservation.notes && (
            <View style={styles.detailSection}>
              <View style={styles.detailRow}>
                <Icon name="fileText" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
                <Text style={styles.detailLabel}>Notes</Text>
              </View>
              <Text style={styles.detailValue}>{reservation.notes}</Text>
            </View>
          )}
        </View>

        {/* Aircraft Details Card */}
        <View style={styles.secondaryCard}>
          <Text style={styles.h2}>Aircraft Information</Text>
          <View style={styles.aircraftInfo}>
            <View style={styles.aircraftRow}>
              <Text style={styles.aircraftLabel}>Tail Number:</Text>
              <Text style={styles.aircraftValue}>{reservation.aircraft.tail_number}</Text>
            </View>
            <View style={styles.aircraftRow}>
              <Text style={styles.aircraftLabel}>Aircraft Type:</Text>
              <Text style={styles.aircraftValue}>{reservation.aircraft.type}</Text>
            </View>
            <View style={styles.aircraftRow}>
              <Text style={styles.aircraftLabel}>Engine Type:</Text>
              <Text style={styles.aircraftValue}>Single Engine</Text>
            </View>
          </View>
        </View>

        {/* Instructor Details Card */}
        <View style={styles.secondaryCard}>
          <Text style={styles.h2}>Instructor Information</Text>
          <View style={styles.instructorInfo}>
            <View style={styles.instructorRow}>
              <Icon name="user" size={16} color={Colors.neutral.gray500} style={styles.instructorIcon} />
              <View>
                <Text style={styles.instructorName}>{reservation.instructor}</Text>
                <Text style={styles.instructorTitle}>Certified Flight Instructor (CFI)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom padding for CTAs */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Menu Dropdown */}
      {showMenu && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={styles.menuBackdrop} onPress={() => setShowMenu(false)} />
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Duplicate')}>
              <Icon name="copy" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.menuText}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Export')}>
              <Icon name="externalLink" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.menuText}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Cancel Reservation')}>
              <Icon name="trash" size={16} color={Colors.secondary.red} />
              <Text style={[styles.menuText, styles.dangerText]}>Cancel Reservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Sticky Footer CTAs */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => handleAction('Modify')}
        >
          <Text style={styles.secondaryButtonText}>Modify</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => handleAction('Check In')}
        >
          <Text style={styles.primaryButtonText}>Check In</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  mainCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  h1: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  h2: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  confirmedBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  confirmedText: {
    color: '#166534',
  },
  aircraftType: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginBottom: 4,
  },
  instructionType: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    marginBottom: 24,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    marginLeft: 24,
  },
  costValue: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginLeft: 24,
  },
  secondaryCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  aircraftInfo: {
    gap: 12,
  },
  aircraftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aircraftLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  aircraftValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  instructorInfo: {
    gap: 12,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorIcon: {
    marginRight: 12,
  },
  instructorName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  instructorTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  bottomPadding: {
    height: 100,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContent: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginLeft: 12,
  },
  dangerText: {
    color: Colors.secondary.red,
  },
  stickyFooter: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary.black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.primary.black,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    borderStyle: 'solid',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
});


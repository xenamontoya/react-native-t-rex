import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Project T-Rex Brand Colors
const Colors = {
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F', 
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },
  neutral: {
    gray50: '#f9fafb',
    gray200: '#e5e7eb',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

export default function ReservationsScreen() {
  const handleReservationPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reservations</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => handleReservationPress('New Reservation')}
          >
            <Text style={styles.primaryButtonText}>+ New Reservation</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Reservations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          
          <View style={styles.reservationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.reservationTitle}>Cessna 172 - N12345</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>
            
            <Text style={styles.reservationDetails}>Dual Instruction with Sarah Mitchell</Text>
            
            <View style={styles.reservationMeta}>
              <Text style={styles.metaText}>📅 DEC 15, 2:00 - 4:00 PM</Text>
              <Text style={styles.metaText}>⏰ 2.0 HOURS</Text>
            </View>
            
            <Text style={styles.costText}>Est. Cost: $485.00</Text>
            
            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => handleReservationPress('Modify')}
              >
                <Text style={styles.secondaryButtonText}>Modify</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.checkInButton}
                onPress={() => handleReservationPress('Check In')}
              >
                <Text style={styles.checkInButtonText}>Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Reservations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          
          <View style={styles.reservationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.reservationTitle}>Cessna 152 - N67890</Text>
              <View style={[styles.statusBadge, styles.completeBadge]}>
                <Text style={[styles.statusText, styles.completeText]}>Complete</Text>
              </View>
            </View>
            
            <Text style={styles.reservationDetails}>Solo Flight</Text>
            
            <View style={styles.reservationMeta}>
              <Text style={styles.metaText}>📅 DEC 10, 10:00 - 11:30 AM</Text>
              <Text style={styles.metaText}>⏰ 1.5 HOURS</Text>
            </View>
            
            <Text style={styles.costText}>Cost: $285.00</Text>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quickActions: {
    marginTop: 16,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: Colors.tertiary.denimBlue,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 12,
  },
  reservationCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: Colors.tertiary.beige,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  completeBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
  },
  completeText: {
    color: '#004D47',
  },
  reservationDetails: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  reservationMeta: {
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginBottom: 4,
    fontWeight: '500',
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#008333',
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.neutral.gray500,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral.gray600,
  },
  checkInButton: {
    flex: 1,
    backgroundColor: Colors.tertiary.denimBlue,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  bottomPadding: {
    height: 100,
  },
});

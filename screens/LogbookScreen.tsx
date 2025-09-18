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

export default function LogbookScreen() {
  const handleFlightPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Logbook</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Flight Time Summary</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24.5</Text>
              <Text style={styles.statLabel}>TOTAL HOURS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>22.1</Text>
              <Text style={styles.statLabel}>DUAL RECEIVED</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.4</Text>
              <Text style={styles.statLabel}>SOLO TIME</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => handleFlightPress('Add Flight')}
          >
            <Text style={styles.primaryButtonText}>+ Add Flight</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Flights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Flights</Text>
          
          <View style={styles.flightCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.flightTitle}>N12345 • Cessna 172</Text>
              <Text style={styles.flightDate}>DEC 10</Text>
            </View>
            
            <View style={styles.flightRoute}>
              <Text style={styles.routeText}>KPHX → Local → KPHX</Text>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Time:</Text>
                <Text style={styles.detailValue}>1.5 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Solo:</Text>
                <Text style={styles.detailValue}>1.5 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Landings:</Text>
                <Text style={styles.detailValue}>8 Day</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => handleFlightPress('View Flight Details')}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.flightCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.flightTitle}>N67890 • Cessna 152</Text>
              <Text style={styles.flightDate}>DEC 05</Text>
            </View>
            
            <View style={styles.flightRoute}>
              <Text style={styles.routeText}>KPHX → KSDL → KPHX</Text>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Time:</Text>
                <Text style={styles.detailValue}>2.1 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dual Received:</Text>
                <Text style={styles.detailValue}>2.1 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Instructor:</Text>
                <Text style={styles.detailValue}>Sarah Mitchell</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => handleFlightPress('View Flight Details')}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.flightCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.flightTitle}>N12345 • Cessna 172</Text>
              <Text style={styles.flightDate}>NOV 28</Text>
            </View>
            
            <View style={styles.flightRoute}>
              <Text style={styles.routeText}>KPHX → KGEU → KPHX</Text>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Time:</Text>
                <Text style={styles.detailValue}>1.8 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dual Received:</Text>
                <Text style={styles.detailValue}>1.8 hrs</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cross Country:</Text>
                <Text style={styles.detailValue}>1.8 hrs</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => handleFlightPress('View Flight Details')}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.neutral.gray500,
    marginTop: 4,
    textAlign: 'center',
  },
  quickActions: {
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
  flightCard: {
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
    alignItems: 'center',
    marginBottom: 8,
  },
  flightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
  },
  flightDate: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray500,
  },
  flightRoute: {
    marginBottom: 12,
  },
  routeText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  flightDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  viewButton: {
    backgroundColor: Colors.neutral.gray50,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.tertiary.denimBlue,
  },
  bottomPadding: {
    height: 100,
  },
});

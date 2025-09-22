import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

export default function AnalyticsScreen({ navigation }: any) {
  const [isPrivatePilotExpanded, setIsPrivatePilotExpanded] = useState(false);

  const handleGoBack = () => {
    navigation?.goBack();
  };

  // Mock flight data - in real app this would come from flight store
  const mockFlights = [
    { total_time: '2.5', solo: '0', dual_received: '2.5', night: '0', actual_inst: '0', sim_inst: '0', day_ldg: '3', night_ldg: '0', date: '2024-09-20' },
    { total_time: '1.8', solo: '1.8', dual_received: '0', night: '0', actual_inst: '0', sim_inst: '0.5', day_ldg: '2', night_ldg: '0', date: '2024-09-15' },
    { total_time: '2.2', solo: '0', dual_received: '2.2', night: '0.5', actual_inst: '0', sim_inst: '0', day_ldg: '2', night_ldg: '1', date: '2024-09-10' },
    // Add more mock flights for different time periods
  ];

  // Calculate time periods
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last28Days = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);
  const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const last6Months = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const last12Months = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  // Filter flights by time periods
  const filterFlightsByDate = (flights: any[], fromDate: Date) => {
    return flights.filter(flight => {
      const flightDate = new Date(flight.date);
      return flightDate >= fromDate;
    });
  };

  const calculateTotalTime = (flights: any[]) => {
    return flights.reduce((total, flight) => {
      const time = parseFloat(flight.total_time || '0');
      return total + time;
    }, 0);
  };

  const calculateSoloTime = (flights: any[]) => {
    return flights.reduce((total, flight) => {
      const time = parseFloat(flight.solo || '0');
      return total + time;
    }, 0);
  };

  const calculateDualTime = (flights: any[]) => {
    return flights.reduce((total, flight) => {
      const time = parseFloat(flight.dual_received || '0');
      return total + time;
    }, 0);
  };

  const calculateInstrumentTime = (flights: any[]) => {
    return flights.reduce((total, flight) => {
      const actual = parseFloat(flight.actual_inst || '0');
      const sim = parseFloat(flight.sim_inst || '0');
      return total + actual + sim;
    }, 0);
  };

  // Totals
  const totals = {
    allTime: calculateTotalTime(mockFlights),
    last7Days: calculateTotalTime(filterFlightsByDate(mockFlights, last7Days)),
    last28Days: calculateTotalTime(filterFlightsByDate(mockFlights, last28Days)),
    last90Days: calculateTotalTime(filterFlightsByDate(mockFlights, last90Days)),
    last6Months: calculateTotalTime(filterFlightsByDate(mockFlights, last6Months)),
    last12Months: calculateTotalTime(filterFlightsByDate(mockFlights, last12Months)),
    soloTime: calculateSoloTime(mockFlights),
    dualTime: calculateDualTime(mockFlights),
    instrumentTime: calculateInstrumentTime(mockFlights),
    dayLandings: mockFlights.reduce((total, flight) => total + parseInt(flight.day_ldg || '0'), 0),
    nightLandings: mockFlights.reduce((total, flight) => total + parseInt(flight.night_ldg || '0'), 0)
  };

  // FAA Private Pilot Requirements
  const privateRequirements = {
    totalTime: 40,
    dualTime: 20,
    soloTime: 10,
    practicalTest: 3
  };

  const progress = {
    totalTime: Math.min(totals.allTime, privateRequirements.totalTime),
    dualTime: Math.min(totals.dualTime, privateRequirements.dualTime),
    soloTime: Math.min(totals.soloTime, privateRequirements.soloTime),
    practicalTest: Math.min(2, privateRequirements.practicalTest) // Mock data
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Flight statistics and insights</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionsContainer}>
          {/* Logbook Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOGBOOK</Text>
            <View style={styles.itemsContainer}>
              {/* All Entries */}
              <View style={styles.analyticsItem}>
                <View style={styles.itemContent}>
                  <Icon name="book" size={20} color={Colors.neutral.gray500} />
                  <Text style={styles.itemLabel}>All Entries</Text>
                </View>
                <View style={styles.itemValue}>
                  <Text style={styles.valueText}>{totals.allTime.toFixed(1)}</Text>
                  <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
                </View>
              </View>

              {/* Time Periods */}
              {[
                { label: 'Last 7 Days', total: totals.last7Days },
                { label: 'Last 28 Days', total: totals.last28Days },
                { label: 'Last 90 Days', total: totals.last90Days },
                { label: 'Last 6 Months', total: totals.last6Months },
                { label: 'Last 12 Months', total: totals.last12Months }
              ].map((period) => (
                <View key={period.label} style={styles.analyticsItem}>
                  <View style={styles.itemContent}>
                    <Icon name="chartBar" size={20} color={Colors.neutral.gray500} />
                    <Text style={styles.itemLabel}>{period.label}</Text>
                  </View>
                  <View style={styles.itemValue}>
                    <Text style={styles.valueText}>{period.total.toFixed(1)}</Text>
                    <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Smart Groups Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SMART GROUPS</Text>
              <Icon name="plus" size={16} color={Colors.neutral.gray500} />
            </View>
            
            {/* FAA Private Pilot License */}
            <View style={styles.smartGroupContainer}>
              <TouchableOpacity
                style={styles.smartGroupHeader}
                onPress={() => setIsPrivatePilotExpanded(!isPrivatePilotExpanded)}
              >
                <View style={styles.itemContent}>
                  <Icon name="certificate" size={20} color={Colors.neutral.gray500} />
                  <Text style={styles.itemLabel}>FAA Private Pilot License</Text>
                </View>
                <View style={styles.itemValue}>
                  <Text style={[styles.valueText, { color: Colors.secondary.forestGreen }]}>
                    {Math.round((progress.totalTime / privateRequirements.totalTime) * 100)}%
                  </Text>
                  <Icon 
                    name={isPrivatePilotExpanded ? "chevronDown" : "chevronRight"} 
                    size={16} 
                    color={Colors.neutral.gray400} 
                  />
                </View>
              </TouchableOpacity>

              {/* Sub-requirements - only show when expanded */}
              {isPrivatePilotExpanded && (
                <View style={styles.subRequirements}>
                  {[
                    { label: '40 Hours', current: progress.totalTime, required: 40, color: Colors.secondary.forestGreen },
                    { label: 'Dual Received', current: progress.dualTime, required: 20, color: Colors.secondary.forestGreen },
                    { label: 'Practical Test Recency', current: 2, required: 3, color: '#F59E0B' },
                    { label: 'Solo', current: progress.soloTime, required: 10, color: '#EF4444' }
                  ].map((req) => (
                    <View key={req.label} style={styles.subRequirement}>
                      <Text style={styles.subLabel}>{req.label}</Text>
                      <Text style={[styles.subValue, { color: req.color }]}>
                        {Math.round(req.current)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Currencies Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>CURRENCIES</Text>
              <Icon name="plus" size={16} color={Colors.neutral.gray500} />
            </View>
            <View style={styles.itemsContainer}>
              {[
                { label: 'Day', total: totals.dayLandings, icon: 'sun', color: Colors.secondary.forestGreen },
                { label: 'Night', total: totals.nightLandings, icon: 'moon', color: Colors.secondary.forestGreen },
                { label: 'Instrument', total: Math.round(totals.instrumentTime), icon: 'cloud', color: '#F59E0B' }
              ].map((currency) => (
                <View key={currency.label} style={styles.analyticsItem}>
                  <View style={styles.itemContent}>
                    <Icon name={currency.icon as any} size={20} color={Colors.neutral.gray500} />
                    <Text style={styles.itemLabel}>{currency.label}</Text>
                  </View>
                  <View style={styles.itemValue}>
                    <Text style={[styles.valueText, { color: currency.color }]}>
                      {currency.total}
                    </Text>
                    <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  sectionsContainer: {
    padding: 24,
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    letterSpacing: 1,
  },
  itemsContainer: {
    gap: 12,
  },
  analyticsItem: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginLeft: 12,
  },
  itemValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  smartGroupContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  smartGroupHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subRequirements: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subRequirement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    marginLeft: 32,
  },
  subLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  subValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
  },
  bottomPadding: {
    height: 32,
  },
});
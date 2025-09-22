import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Share,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface FlightDetailsProps {
  navigation: any;
  route: any;
}

export default function FlightDetailsScreen({ navigation, route }: FlightDetailsProps) {
  const flight = route?.params?.flight || {
    id: 'F001',
    date: '2024-09-20',
    tailNumber: 'N9567L',
    aircraftType: 'C172',
    aircraftMake: 'Cessna 172',
    departure: 'KPHX',
    departureName: 'Phoenix Sky Harbor',
    arrival: 'KLAS',
    arrivalName: 'Las Vegas McCarran',
    departureTime: '14:30',
    arrivalTime: '16:45',
    totalTime: 2.25,
    picTime: 2.25,
    dualReceived: 0,
    crossCountry: 2.25,
    nightTime: 0,
    actualInstrument: 0,
    simulatedInstrument: 0,
    approaches: 0,
    dayLandings: 2,
    nightLandings: 0,
    instructor: '',
    purpose: 'Personal',
    maneuvers: '',
    remarks: 'Beautiful cross-country flight with excellent visibility',
    isNight: false,
    isCrossCountry: true,
    isActualInstrument: false,
    isSimulatedInstrument: false,
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    navigation.navigate('FlightDetailsForm', { flightData: flight, mode: 'edit' });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Flight',
      'Are you sure you want to delete this flight? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Flight Deleted', 'The flight has been removed from your logbook.');
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleShare = async () => {
    try {
      const shareContent = `Flight Log Entry
Date: ${flight.date}
Aircraft: ${flight.tailNumber} (${flight.aircraftMake})
Route: ${flight.departure} → ${flight.arrival}
Time: ${flight.departureTime} - ${flight.arrivalTime}
Total Time: ${flight.totalTime} hours
${flight.isCrossCountry ? 'Cross Country: Yes' : ''}
${flight.remarks ? `Notes: ${flight.remarks}` : ''}

Logged with Project T-Rex`;

      await Share.share({
        message: shareContent,
        title: 'Flight Log Entry',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleDuplicate = () => {
    // Create a copy for editing
    const duplicateData = {
      ...flight,
      id: undefined,
      date: new Date().toISOString().split('T')[0], // Today's date
      remarks: flight.remarks ? `${flight.remarks} (Copy)` : 'Copy of previous flight',
    };
    
    navigation.navigate('FlightDetailsForm', { flightData: duplicateData, mode: 'duplicate' });
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  const formatDecimalTime = (hours: number) => {
    return hours > 0 ? hours.toFixed(1) : '0.0';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Details</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Icon name="externalLink" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Flight Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.routeHeader}>
            <View style={styles.routeInfo}>
              <Text style={styles.routeAirports}>
                {flight.departure} → {flight.arrival}
              </Text>
              <Text style={styles.routeNames}>
                {flight.departureName} to {flight.arrivalName}
              </Text>
            </View>
            <View style={styles.flightDate}>
              <Text style={styles.dateText}>{flight.date}</Text>
            </View>
          </View>

          {/* Route Graphic */}
          <View style={styles.routeGraphic}>
            <View style={styles.routeContainer}>
              <View style={styles.airportDot} />
              <View style={styles.routeLine}>
                <View style={styles.dottedLine} />
                <View style={styles.aircraftIcon}>
                  <Icon name="plane" size={20} color={Colors.primary.black} />
                </View>
                <View style={styles.dottedLine} />
              </View>
              <View style={styles.airportDot} />
            </View>
            <View style={styles.airportCodes}>
              <Text style={styles.airportCode}>{flight.departure}</Text>
              <Text style={styles.airportCode}>{flight.arrival}</Text>
            </View>
          </View>

          {/* Flight Times */}
          <View style={styles.flightTimes}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>{flight.departureTime}</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Total Time</Text>
              <Text style={styles.timeValueLarge}>{formatTime(flight.totalTime)}</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>{flight.arrivalTime}</Text>
            </View>
          </View>
        </View>

        {/* Aircraft Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Aircraft</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tail Number</Text>
            <Text style={styles.infoValue}>{flight.tailNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Aircraft Type</Text>
            <Text style={styles.infoValue}>{flight.aircraftType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Make & Model</Text>
            <Text style={styles.infoValue}>{flight.aircraftMake}</Text>
          </View>
        </View>

        {/* Flight Times Breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Flight Times</Text>
          
          <View style={styles.timeGrid}>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>Total Time</Text>
              <Text style={styles.timeItemValue}>{formatDecimalTime(flight.totalTime)}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>PIC</Text>
              <Text style={styles.timeItemValue}>{formatDecimalTime(flight.picTime)}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>Dual Received</Text>
              <Text style={styles.timeItemValue}>{formatDecimalTime(flight.dualReceived)}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>Cross Country</Text>
              <Text style={styles.timeItemValue}>{formatDecimalTime(flight.crossCountry)}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>Night</Text>
              <Text style={styles.timeItemValue}>{formatDecimalTime(flight.nightTime)}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeItemLabel}>Instrument</Text>
              <Text style={styles.timeItemValue}>
                {formatDecimalTime(flight.actualInstrument + flight.simulatedInstrument)}
              </Text>
            </View>
          </View>
        </View>

        {/* Approaches & Landings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Approaches & Landings</Text>
          
          <View style={styles.approachGrid}>
            <View style={styles.approachItem}>
              <Text style={styles.approachValue}>{flight.approaches}</Text>
              <Text style={styles.approachLabel}>Approaches</Text>
            </View>
            <View style={styles.approachItem}>
              <Text style={styles.approachValue}>{flight.dayLandings}</Text>
              <Text style={styles.approachLabel}>Day Landings</Text>
            </View>
            <View style={styles.approachItem}>
              <Text style={styles.approachValue}>{flight.nightLandings}</Text>
              <Text style={styles.approachLabel}>Night Landings</Text>
            </View>
          </View>
        </View>

        {/* Flight Conditions */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Flight Conditions</Text>
          
          <View style={styles.conditionsGrid}>
            <View style={[styles.conditionBadge, flight.isCrossCountry && styles.conditionBadgeActive]}>
              <Text style={[styles.conditionText, flight.isCrossCountry && styles.conditionTextActive]}>
                Cross Country
              </Text>
            </View>
            <View style={[styles.conditionBadge, flight.isNight && styles.conditionBadgeActive]}>
              <Text style={[styles.conditionText, flight.isNight && styles.conditionTextActive]}>
                Night
              </Text>
            </View>
            <View style={[styles.conditionBadge, flight.isActualInstrument && styles.conditionBadgeActive]}>
              <Text style={[styles.conditionText, flight.isActualInstrument && styles.conditionTextActive]}>
                Actual IMC
              </Text>
            </View>
            <View style={[styles.conditionBadge, flight.isSimulatedInstrument && styles.conditionBadgeActive]}>
              <Text style={[styles.conditionText, flight.isSimulatedInstrument && styles.conditionTextActive]}>
                Simulated IMC
              </Text>
            </View>
          </View>
        </View>

        {/* People & Purpose */}
        {(flight.instructor || flight.purpose) && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>People & Purpose</Text>
            {flight.instructor && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Instructor</Text>
                <Text style={styles.infoValue}>{flight.instructor}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Purpose</Text>
              <Text style={styles.infoValue}>{flight.purpose}</Text>
            </View>
          </View>
        )}

        {/* Notes */}
        {(flight.maneuvers || flight.remarks) && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Notes</Text>
            {flight.maneuvers && (
              <View style={styles.noteSection}>
                <Text style={styles.noteLabel}>Maneuvers Practiced</Text>
                <Text style={styles.noteText}>{flight.maneuvers}</Text>
              </View>
            )}
            {flight.remarks && (
              <View style={styles.noteSection}>
                <Text style={styles.noteLabel}>Remarks</Text>
                <Text style={styles.noteText}>{flight.remarks}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDuplicate}>
          <Icon name="copy" size={20} color="#5177BB" />
          <Text style={styles.actionButtonText}>Duplicate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Icon name="edit" size={20} color="#5177BB" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Icon name="trash" size={20} color="#EF4444" />
          <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  overviewCard: {
    backgroundColor: Colors.primary.white,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  routeInfo: {
    flex: 1,
  },
  routeAirports: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  routeNames: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  flightDate: {
    backgroundColor: Colors.neutral.gray50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  routeGraphic: {
    marginVertical: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  airportDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.black,
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  dottedLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.neutral.gray300,
    borderStyle: 'dashed' as any,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  aircraftIcon: {
    backgroundColor: Colors.primary.white,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    marginHorizontal: 8,
  },
  airportCodes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airportCode: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  flightTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  timeValueLarge: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  sectionCard: {
    backgroundColor: Colors.primary.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  timeItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    padding: 16,
    borderRadius: 8,
  },
  timeItemValue: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  timeItemLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  approachGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  approachItem: {
    alignItems: 'center',
  },
  approachValue: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  approachLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray100,
  },
  conditionBadgeActive: {
    backgroundColor: '#00FFF2',
  },
  conditionText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  conditionTextActive: {
    color: Colors.primary.black,
  },
  noteSection: {
    marginBottom: 16,
  },
  noteLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  actionButtons: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 32,
  },
});


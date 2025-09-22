import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface FlightData {
  // Aircraft Information
  tailNumber: string;
  aircraftType: string;
  aircraftMake: string;
  
  // Route Information
  departure: string;
  arrival: string;
  route: string;
  
  // Times (in decimal hours)
  totalTime: string;
  picTime: string;
  dualReceived: string;
  dualGiven: string;
  soloTime: string;
  crossCountry: string;
  nightTime: string;
  actualInstrument: string;
  simulatedInstrument: string;
  groundTrainer: string;
  
  // Date and Times
  date: string;
  departureTime: string;
  arrivalTime: string;
  
  // Approaches and Landings
  approaches: string;
  dayLandings: string;
  nightLandings: string;
  
  // Conditions
  isActualInstrument: boolean;
  isSimulatedInstrument: boolean;
  isNight: boolean;
  isCrossCountry: boolean;
  
  // People
  instructor: string;
  safety: string;
  
  // Flight Purpose
  purpose: string;
  maneuvers: string;
  remarks: string;
}

export default function FlightDetailsFormScreen({ navigation, route }: any) {
  const prefilledData = route?.params?.flightData || {};
  
  const [flightData, setFlightData] = useState<FlightData>({
    tailNumber: prefilledData.registration || '',
    aircraftType: prefilledData.aircraft_type || '',
    aircraftMake: prefilledData.aircraft_manufacturer || '',
    departure: prefilledData.origin?.code || '',
    arrival: prefilledData.destination?.code || '',
    route: '',
    totalTime: '',
    picTime: '',
    dualReceived: '',
    dualGiven: '',
    soloTime: '',
    crossCountry: '',
    nightTime: '',
    actualInstrument: '',
    simulatedInstrument: '',
    groundTrainer: '',
    date: prefilledData.scheduled_out ? new Date(prefilledData.scheduled_out).toISOString().split('T')[0] : '',
    departureTime: prefilledData.scheduled_out ? new Date(prefilledData.scheduled_out).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '',
    arrivalTime: prefilledData.scheduled_in ? new Date(prefilledData.scheduled_in).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '',
    approaches: '',
    dayLandings: '',
    nightLandings: '',
    isActualInstrument: false,
    isSimulatedInstrument: false,
    isNight: false,
    isCrossCountry: false,
    instructor: '',
    safety: '',
    purpose: 'Training',
    maneuvers: '',
    remarks: '',
  });

  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Aircraft & Route', icon: 'plane' },
    { title: 'Flight Times', icon: 'clock' },
    { title: 'Conditions', icon: 'cloud' },
    { title: 'People & Notes', icon: 'user' },
  ];

  const updateField = (field: keyof FlightData, value: string | boolean) => {
    setFlightData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!flightData.tailNumber || !flightData.date || !flightData.totalTime) {
      Alert.alert('Missing Information', 'Please fill in at least tail number, date, and total time.');
      return;
    }

    Alert.alert(
      'Flight Saved',
      'Your flight has been added to your logbook.',
      [
        {
          text: 'View Logbook',
          onPress: () => navigation.navigate('Logbook')
        },
        {
          text: 'Add Another',
          onPress: () => {
            setFlightData({
              tailNumber: '',
              aircraftType: '',
              aircraftMake: '',
              departure: '',
              arrival: '',
              route: '',
              totalTime: '',
              picTime: '',
              dualReceived: '',
              dualGiven: '',
              soloTime: '',
              crossCountry: '',
              nightTime: '',
              actualInstrument: '',
              simulatedInstrument: '',
              groundTrainer: '',
              date: '',
              departureTime: '',
              arrivalTime: '',
              approaches: '',
              dayLandings: '',
              nightLandings: '',
              isActualInstrument: false,
              isSimulatedInstrument: false,
              isNight: false,
              isCrossCountry: false,
              instructor: '',
              safety: '',
              purpose: 'Training',
              maneuvers: '',
              remarks: '',
            });
            setCurrentSection(0);
          }
        }
      ]
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Aircraft & Route
        return (
          <View style={styles.sectionContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Aircraft Tail Number *</Text>
              <TextInput
                style={styles.input}
                value={flightData.tailNumber}
                onChangeText={(value) => updateField('tailNumber', value)}
                placeholder="N123AB"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Aircraft Type</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.aircraftType}
                  onChangeText={(value) => updateField('aircraftType', value)}
                  placeholder="C172"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Make/Model</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.aircraftMake}
                  onChangeText={(value) => updateField('aircraftMake', value)}
                  placeholder="Cessna 172"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>From</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.departure}
                  onChangeText={(value) => updateField('departure', value)}
                  placeholder="KPHX"
                  autoCapitalize="characters"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>To</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.arrival}
                  onChangeText={(value) => updateField('arrival', value)}
                  placeholder="KLAS"
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Route</Text>
              <TextInput
                style={styles.input}
                value={flightData.route}
                onChangeText={(value) => updateField('route', value)}
                placeholder="Direct, VFR"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date *</Text>
              <TextInput
                style={styles.input}
                value={flightData.date}
                onChangeText={(value) => updateField('date', value)}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Departure Time</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.departureTime}
                  onChangeText={(value) => updateField('departureTime', value)}
                  placeholder="14:30"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Arrival Time</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.arrivalTime}
                  onChangeText={(value) => updateField('arrivalTime', value)}
                  placeholder="16:45"
                />
              </View>
            </View>
          </View>
        );

      case 1: // Flight Times
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionDescription}>
              Enter time in decimal hours (e.g., 1.5 for 1 hour 30 minutes)
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Total Flight Time *</Text>
              <TextInput
                style={styles.input}
                value={flightData.totalTime}
                onChangeText={(value) => updateField('totalTime', value)}
                placeholder="1.5"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>PIC Time</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.picTime}
                  onChangeText={(value) => updateField('picTime', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Solo Time</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.soloTime}
                  onChangeText={(value) => updateField('soloTime', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Dual Received</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.dualReceived}
                  onChangeText={(value) => updateField('dualReceived', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Dual Given</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.dualGiven}
                  onChangeText={(value) => updateField('dualGiven', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Cross Country</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.crossCountry}
                  onChangeText={(value) => updateField('crossCountry', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Night Time</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.nightTime}
                  onChangeText={(value) => updateField('nightTime', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Actual Instrument</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.actualInstrument}
                  onChangeText={(value) => updateField('actualInstrument', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Simulated Instrument</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.simulatedInstrument}
                  onChangeText={(value) => updateField('simulatedInstrument', value)}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Ground Trainer</Text>
              <TextInput
                style={styles.input}
                value={flightData.groundTrainer}
                onChangeText={(value) => updateField('groundTrainer', value)}
                placeholder="0.0"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        );

      case 2: // Conditions
        return (
          <View style={styles.sectionContent}>
            <View style={styles.switchGroup}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Cross Country</Text>
                <Switch
                  value={flightData.isCrossCountry}
                  onValueChange={(value) => updateField('isCrossCountry', value)}
                  trackColor={{ false: Colors.neutral.gray200, true: '#00FFF2' }}
                  thumbColor={flightData.isCrossCountry ? Colors.primary.white : Colors.neutral.gray500}
                />
              </View>
              
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Night Flight</Text>
                <Switch
                  value={flightData.isNight}
                  onValueChange={(value) => updateField('isNight', value)}
                  trackColor={{ false: Colors.neutral.gray200, true: '#00FFF2' }}
                  thumbColor={flightData.isNight ? Colors.primary.white : Colors.neutral.gray500}
                />
              </View>
              
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Actual Instrument Conditions</Text>
                <Switch
                  value={flightData.isActualInstrument}
                  onValueChange={(value) => updateField('isActualInstrument', value)}
                  trackColor={{ false: Colors.neutral.gray200, true: '#00FFF2' }}
                  thumbColor={flightData.isActualInstrument ? Colors.primary.white : Colors.neutral.gray500}
                />
              </View>
              
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Simulated Instrument</Text>
                <Switch
                  value={flightData.isSimulatedInstrument}
                  onValueChange={(value) => updateField('isSimulatedInstrument', value)}
                  trackColor={{ false: Colors.neutral.gray200, true: '#00FFF2' }}
                  thumbColor={flightData.isSimulatedInstrument ? Colors.primary.white : Colors.neutral.gray500}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Approaches</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.approaches}
                  onChangeText={(value) => updateField('approaches', value)}
                  placeholder="0"
                  keyboardType="number-pad"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>Day Landings</Text>
                <TextInput
                  style={styles.input}
                  value={flightData.dayLandings}
                  onChangeText={(value) => updateField('dayLandings', value)}
                  placeholder="0"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Night Landings</Text>
              <TextInput
                style={[styles.input, { width: '48%' }]}
                value={flightData.nightLandings}
                onChangeText={(value) => updateField('nightLandings', value)}
                placeholder="0"
                keyboardType="number-pad"
              />
            </View>
          </View>
        );

      case 3: // People & Notes
        return (
          <View style={styles.sectionContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Instructor Name</Text>
              <TextInput
                style={styles.input}
                value={flightData.instructor}
                onChangeText={(value) => updateField('instructor', value)}
                placeholder="John Smith, CFI"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Safety Pilot</Text>
              <TextInput
                style={styles.input}
                value={flightData.safety}
                onChangeText={(value) => updateField('safety', value)}
                placeholder="Safety pilot name (if applicable)"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Flight Purpose</Text>
              <TextInput
                style={styles.input}
                value={flightData.purpose}
                onChangeText={(value) => updateField('purpose', value)}
                placeholder="Training, Personal, Business"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Maneuvers Practiced</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={flightData.maneuvers}
                onChangeText={(value) => updateField('maneuvers', value)}
                placeholder="Steep turns, stalls, emergency procedures..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Remarks</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={flightData.remarks}
                onChangeText={(value) => updateField('remarks', value)}
                placeholder="Additional notes about the flight..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Details</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Section Navigation */}
      <View style={styles.sectionNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sectionTab, currentSection === index && styles.sectionTabActive]}
              onPress={() => setCurrentSection(index)}
            >
              <Icon 
                name={section.icon as any} 
                size={16} 
                color={currentSection === index ? Colors.primary.white : Colors.neutral.gray500} 
              />
              <Text style={[
                styles.sectionTabText,
                currentSection === index && styles.sectionTabTextActive
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSection()}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          <Text style={[styles.navButtonText, currentSection === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.sectionIndicator}>
          <Text style={styles.sectionIndicatorText}>
            {currentSection + 1} of {sections.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, currentSection === sections.length - 1 && styles.navButtonDisabled]}
          onPress={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          disabled={currentSection === sections.length - 1}
        >
          <Text style={[styles.navButtonText, currentSection === sections.length - 1 && styles.navButtonTextDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary.black,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  sectionNav: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: Colors.neutral.gray50,
  },
  sectionTabActive: {
    backgroundColor: Colors.primary.black,
  },
  sectionTabText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    marginLeft: 8,
  },
  sectionTabTextActive: {
    color: Colors.primary.white,
  },
  content: {
    flex: 1,
  },
  sectionContent: {
    padding: 20,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    backgroundColor: Colors.primary.white,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchGroup: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
  },
  navButtonTextDisabled: {
    color: Colors.neutral.gray500,
  },
  sectionIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 20,
  },
  sectionIndicatorText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  bottomPadding: {
    height: 32,
  },
});


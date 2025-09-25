import React, { useState, useEffect } from 'react';
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
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography, Button } from '../../components/src';
// Using direct require() instead of broken asset imports

interface FlightData {
  // Flight Details
  date: string;
  flightNumber: string;
  aircraftId: string;
  aircraftType: string;
  from: string;
  to: string;
  route: string;
  scheduledOut: string;
  scheduledIn: string;
  hobbsOut: string;
  hobbsIn: string;
  tachOut: string;
  tachIn: string;
  
  // Time - Basic
  totalTime: string;
  dualReceived: string;
  pic: string;
  xc: string;
  night: string;
  simInst: string;
  solo: string;
  actualInst: string;
  ground: string;
  
  // Time - Granular
  dualDayLocal: string;
  dualNightLocal: string;
  soloDayLocal: string;
  soloNightLocal: string;
  dualDayXc: string;
  dualNightXc: string;
  soloDayXc: string;
  soloNightXc: string;
  instrumentActual: string;
  instrumentHood: string;
  instrumentXc: string;
  
  // Landings
  dayLdg: string;
  nightLdg: string;
  dualDayLandings: string;
  dualNightLandings: string;
  soloDayLandings: string;
  soloNightLandings: string;
  
  // Crew
  instructor: string;
  student: string;
  
  // Notes
  remarks: string;
  photos: any[];
  signature: string | null;
}

export default function FlightDetailsFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Parse flight data from route params (same pattern as other screens)
  let prefilledData: any = {};
  try {
    const params = route?.params as any;
    if (params?.flightData && typeof params.flightData === 'string') {
      prefilledData = JSON.parse(decodeURIComponent(params.flightData));
    } else if (params?.flightData) {
      prefilledData = params.flightData;
    }
  } catch (error) {
    console.error('Error parsing flight data:', error);
    prefilledData = {};
  }

  const [flightData, setFlightData] = useState<FlightData>({
    // Flight Details - mapped from original flight data
    date: prefilledData.scheduled_out ? new Date(prefilledData.scheduled_out).toISOString().split('T')[0] : '',
    flightNumber: prefilledData.flight_number || prefilledData.ident || '',
    aircraftId: prefilledData.registration || prefilledData.aircraft_id || '',
    aircraftType: prefilledData.aircraft_type || '',
    from: (typeof prefilledData.origin === 'string' ? prefilledData.origin : prefilledData.origin?.code) || '',
    to: (typeof prefilledData.destination === 'string' ? prefilledData.destination : prefilledData.destination?.code) || '',
    route: '',
    scheduledOut: prefilledData.scheduled_out ? new Date(prefilledData.scheduled_out).toISOString().slice(0, 16) : '',
    scheduledIn: prefilledData.scheduled_in ? new Date(prefilledData.scheduled_in).toISOString().slice(0, 16) : '',
    hobbsOut: '',
    hobbsIn: '',
    tachOut: '',
    tachIn: '',
    
    // Time - Basic
    totalTime: prefilledData.total_time || '',
    dualReceived: prefilledData.dual_received || '',
    pic: prefilledData.pic || '',
    xc: prefilledData.xc || '',
    night: prefilledData.night || '',
    simInst: prefilledData.sim_inst || '',
    solo: prefilledData.solo || '',
    actualInst: prefilledData.actual_inst || '',
    ground: prefilledData.ground || '',
    
    // Time - Granular
    dualDayLocal: prefilledData.dual_day_local || '',
    dualNightLocal: prefilledData.dual_night_local || '',
    soloDayLocal: prefilledData.solo_day_local || '',
    soloNightLocal: prefilledData.solo_night_local || '',
    dualDayXc: prefilledData.dual_day_xc || '',
    dualNightXc: prefilledData.dual_night_xc || '',
    soloDayXc: prefilledData.solo_day_xc || '',
    soloNightXc: prefilledData.solo_night_xc || '',
    instrumentActual: prefilledData.instrument_actual || '',
    instrumentHood: prefilledData.instrument_hood || '',
    instrumentXc: prefilledData.instrument_xc || '',
    
    // Landings
    dayLdg: prefilledData.day_ldg || '',
    nightLdg: prefilledData.night_ldg || '',
    dualDayLandings: prefilledData.dual_day_landings || '',
    dualNightLandings: prefilledData.dual_night_landings || '',
    soloDayLandings: prefilledData.solo_day_landings || '',
    soloNightLandings: prefilledData.solo_night_landings || '',
    
    // Crew
    instructor: prefilledData.instructor || '',
    student: prefilledData.student || '',
    
    // Notes
    remarks: prefilledData.remarks || '',
    photos: [],
    signature: prefilledData.signature || null,
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Get screen dimensions
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const sections = [
    { title: 'Flight Details', key: 'flight' },
    { title: 'Time', key: 'time' },
    { title: 'Landings', key: 'landings' },
    { title: 'Crew', key: 'crew' },
    { title: 'Notes', key: 'notes' },
  ];

  const handleInputChange = (field: keyof FlightData, value: string) => {
    setFlightData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create flight object to save (same mapping as original logbook.tsx)
      const flightToSave = {
        id: prefilledData?.id || `flight_${Date.now()}`,
        ident: flightData.flightNumber,
        flight_number: flightData.flightNumber,
        registration: flightData.aircraftId,
        aircraft_type: flightData.aircraftType,
        origin: { code: flightData.from, city: '' },
        destination: { code: flightData.to, city: '' },
        scheduled_out: flightData.scheduledOut,
        scheduled_in: flightData.scheduledIn,
        duration: parseFloat(flightData.totalTime || '0') * 60, // Convert hours to minutes
        status: 'completed',
        remarks: flightData.remarks,
        signature: flightData.signature,
        
        // Time fields - Basic
        total_time: flightData.totalTime,
        dual_received: flightData.dualReceived,
        pic: flightData.pic,
        xc: flightData.xc,
        night: flightData.night,
        sim_inst: flightData.simInst,
        solo: flightData.solo,
        actual_inst: flightData.actualInst,
        ground: flightData.ground,
        
        // Time fields - Granular
        dual_day_local: flightData.dualDayLocal,
        dual_night_local: flightData.dualNightLocal,
        solo_day_local: flightData.soloDayLocal,
        solo_night_local: flightData.soloNightLocal,
        dual_day_xc: flightData.dualDayXc,
        dual_night_xc: flightData.dualNightXc,
        solo_day_xc: flightData.soloDayXc,
        solo_night_xc: flightData.soloNightXc,
        instrument_actual: flightData.instrumentActual,
        instrument_hood: flightData.instrumentHood,
        instrument_xc: flightData.instrumentXc,
        
        // Landing fields
        day_ldg: flightData.dayLdg,
        night_ldg: flightData.nightLdg,
        dual_day_landings: flightData.dualDayLandings,
        dual_night_landings: flightData.dualNightLandings,
        solo_day_landings: flightData.soloDayLandings,
        solo_night_landings: flightData.soloNightLandings,
        
        // Crew fields
        instructor: flightData.instructor,
        student: flightData.student,
      };

      console.log('Saving flight log:', flightToSave);
      Alert.alert('Success', 'Flight saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error saving flight:', error);
      Alert.alert('Error', 'Failed to save flight. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignFlight = () => {
    Alert.alert(
      'Sign Flight',
      'Flight signature functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const renderFlightDetailsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Flight Details</Text>
      
      <View style={styles.formGrid}>
        {/* Date */}
        <View style={styles.formField}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={flightData.date}
            onChangeText={(value) => handleInputChange('date', value)}
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Flight Number */}
        <View style={styles.formField}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.label}>Flight Number</Text>
            {/* FlightAware logo for flights with external data source */}
            {prefilledData?.fa_flight_id && (
              <Image 
                source={require('../assets/images/logos/flight-aware.png')}
                style={styles.dataSourceLogo}
                resizeMode="contain"
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            value={flightData.flightNumber}
            onChangeText={(value) => handleInputChange('flightNumber', value)}
            placeholder="Enter Flight Number"
          />
        </View>

        {/* Aircraft ID */}
        <View style={styles.formField}>
          <Text style={styles.label}>Aircraft ID</Text>
          <TextInput
            style={styles.input}
            value={flightData.aircraftId}
            onChangeText={(value) => handleInputChange('aircraftId', value)}
            placeholder="Enter Aircraft ID"
          />
        </View>

        {/* Aircraft Type */}
        <View style={styles.formField}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.label}>Aircraft Type</Text>
            {/* Pilotbase icon for internal app data (reservation/lesson) */}
            {(prefilledData?.reservationId || prefilledData?.lessonType || prefilledData?.instructor) && (
              <Image 
                source={require('../assets/images/logos/pilotbase-icon-6x.png')}
                style={styles.dataSourceLogo}
                resizeMode="contain"
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            value={flightData.aircraftType}
            onChangeText={(value) => handleInputChange('aircraftType', value)}
            placeholder="Enter Aircraft Type"
          />
        </View>

        {/* From */}
        <View style={styles.formField}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            value={flightData.from}
            onChangeText={(value) => handleInputChange('from', value)}
            placeholder="Departure Airport"
            autoCapitalize="characters"
          />
        </View>

        {/* To */}
        <View style={styles.formField}>
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.input}
            value={flightData.to}
            onChangeText={(value) => handleInputChange('to', value)}
            placeholder="Arrival Airport"
            autoCapitalize="characters"
          />
        </View>

        {/* Route */}
        <View style={styles.formField}>
          <Text style={styles.label}>Route</Text>
          <TextInput
            style={styles.input}
            value={flightData.route}
            onChangeText={(value) => handleInputChange('route', value)}
            placeholder="Flight Route"
          />
        </View>

        {/* Scheduled Out */}
        <View style={styles.formField}>
          <Text style={styles.label}>Scheduled Out</Text>
          <TextInput
            style={styles.input}
            value={flightData.scheduledOut}
            onChangeText={(value) => handleInputChange('scheduledOut', value)}
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </View>

        {/* Scheduled In */}
        <View style={styles.formField}>
          <Text style={styles.label}>Scheduled In</Text>
          <TextInput
            style={styles.input}
            value={flightData.scheduledIn}
            onChangeText={(value) => handleInputChange('scheduledIn', value)}
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </View>

        {/* Hobbs Out */}
        <View style={styles.formField}>
          <Text style={styles.label}>Hobbs Out</Text>
          <TextInput
            style={styles.input}
            value={flightData.hobbsOut}
            onChangeText={(value) => handleInputChange('hobbsOut', value)}
            placeholder="Enter Hobbs Time"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Hobbs In */}
        <View style={styles.formField}>
          <Text style={styles.label}>Hobbs In</Text>
          <TextInput
            style={styles.input}
            value={flightData.hobbsIn}
            onChangeText={(value) => handleInputChange('hobbsIn', value)}
            placeholder="Enter Hobbs Time"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Tach Out */}
        <View style={styles.formField}>
          <Text style={styles.label}>Tach Out</Text>
          <TextInput
            style={styles.input}
            value={flightData.tachOut}
            onChangeText={(value) => handleInputChange('tachOut', value)}
            placeholder="Enter Tach Time"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Tach In */}
        <View style={styles.formField}>
          <Text style={styles.label}>Tach In</Text>
          <TextInput
            style={styles.input}
            value={flightData.tachIn}
            onChangeText={(value) => handleInputChange('tachIn', value)}
            placeholder="Enter Tach Time"
            keyboardType="decimal-pad"
          />
        </View>
      </View>
    </View>
  );

  const renderTimeSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Time</Text>
      
      <View style={styles.formGrid}>
        {/* Basic Time Fields */}
        <View style={styles.formField}>
          <Text style={styles.label}>Total Time</Text>
          <TextInput
            style={styles.input}
            value={flightData.totalTime}
            onChangeText={(value) => handleInputChange('totalTime', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Received</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualReceived}
            onChangeText={(value) => handleInputChange('dualReceived', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>PIC</Text>
          <TextInput
            style={styles.input}
            value={flightData.pic}
            onChangeText={(value) => handleInputChange('pic', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.xc}
            onChangeText={(value) => handleInputChange('xc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Night</Text>
          <TextInput
            style={styles.input}
            value={flightData.night}
            onChangeText={(value) => handleInputChange('night', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Sim Inst</Text>
          <TextInput
            style={styles.input}
            value={flightData.simInst}
            onChangeText={(value) => handleInputChange('simInst', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo</Text>
          <TextInput
            style={styles.input}
            value={flightData.solo}
            onChangeText={(value) => handleInputChange('solo', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Actual Inst</Text>
          <TextInput
            style={styles.input}
            value={flightData.actualInst}
            onChangeText={(value) => handleInputChange('actualInst', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Ground</Text>
          <TextInput
            style={styles.input}
            value={flightData.ground}
            onChangeText={(value) => handleInputChange('ground', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Granular Time Fields */}
        <View style={styles.formField}>
          <Text style={styles.label}>Dual Day Local</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualDayLocal}
            onChangeText={(value) => handleInputChange('dualDayLocal', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Night Local</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualNightLocal}
            onChangeText={(value) => handleInputChange('dualNightLocal', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Day Local</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloDayLocal}
            onChangeText={(value) => handleInputChange('soloDayLocal', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Night Local</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloNightLocal}
            onChangeText={(value) => handleInputChange('soloNightLocal', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Day XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualDayXc}
            onChangeText={(value) => handleInputChange('dualDayXc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Night XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualNightXc}
            onChangeText={(value) => handleInputChange('dualNightXc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Day XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloDayXc}
            onChangeText={(value) => handleInputChange('soloDayXc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Night XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloNightXc}
            onChangeText={(value) => handleInputChange('soloNightXc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Instrument (Actual)</Text>
          <TextInput
            style={styles.input}
            value={flightData.instrumentActual}
            onChangeText={(value) => handleInputChange('instrumentActual', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Instrument (Hood)</Text>
          <TextInput
            style={styles.input}
            value={flightData.instrumentHood}
            onChangeText={(value) => handleInputChange('instrumentHood', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Instrument XC</Text>
          <TextInput
            style={styles.input}
            value={flightData.instrumentXc}
            onChangeText={(value) => handleInputChange('instrumentXc', value)}
            placeholder="Enter Hours"
            keyboardType="decimal-pad"
          />
        </View>
      </View>
    </View>
  );

  const renderLandingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Landings</Text>
      
      <View style={styles.formGrid}>
        <View style={styles.formField}>
          <Text style={styles.label}>Day Ldg</Text>
          <TextInput
            style={styles.input}
            value={flightData.dayLdg}
            onChangeText={(value) => handleInputChange('dayLdg', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Night Ldg</Text>
          <TextInput
            style={styles.input}
            value={flightData.nightLdg}
            onChangeText={(value) => handleInputChange('nightLdg', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Day Landings</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualDayLandings}
            onChangeText={(value) => handleInputChange('dualDayLandings', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Dual Night Landings</Text>
          <TextInput
            style={styles.input}
            value={flightData.dualNightLandings}
            onChangeText={(value) => handleInputChange('dualNightLandings', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Day Landings</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloDayLandings}
            onChangeText={(value) => handleInputChange('soloDayLandings', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Solo Night Landings</Text>
          <TextInput
            style={styles.input}
            value={flightData.soloNightLandings}
            onChangeText={(value) => handleInputChange('soloNightLandings', value)}
            placeholder="Enter Landings"
            keyboardType="number-pad"
          />
        </View>
      </View>
    </View>
  );

  const renderCrewSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Crew</Text>
      
      <View style={styles.formGrid}>
        <View style={styles.formField}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.label}>Instructor</Text>
            {/* Pilotbase icon for internal lesson data */}
            {(prefilledData?.lessonType || prefilledData?.instructor) && (
              <Image 
                source={require('../assets/images/logos/pilotbase-icon-6x.png')}
                style={styles.dataSourceLogo}
                resizeMode="contain"
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            value={flightData.instructor}
            onChangeText={(value) => handleInputChange('instructor', value)}
            placeholder="Enter Instructor Name"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Student</Text>
          <TextInput
            style={styles.input}
            value={flightData.student}
            onChangeText={(value) => handleInputChange('student', value)}
            placeholder="Enter Student Name"
          />
        </View>
      </View>
    </View>
  );

  const renderNotesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notes</Text>
      
      <View style={styles.formField}>
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={flightData.remarks}
          onChangeText={(value) => handleInputChange('remarks', value)}
          placeholder="Enter flight remarks, notes, or observations..."
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Photos</Text>
        <TouchableOpacity style={styles.photoUpload}>
          <Icon name="plus" size={24} color={Colors.neutral.gray400} />
          <Text style={styles.photoUploadText}>Add Photos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Signature</Text>
        <TouchableOpacity style={styles.signatureUpload}>
          <Icon name="edit" size={24} color={Colors.neutral.gray400} />
          <Text style={styles.signatureUploadText}>Add Signature</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: return renderFlightDetailsSection();
      case 1: return renderTimeSection();
      case 2: return renderLandingsSection();
      case 3: return renderCrewSection();
      case 4: return renderNotesSection();
      default: return renderFlightDetailsSection();
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
        <Text style={styles.headerTitle}>Flight Form</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Section Navigation */}
      <View style={styles.sectionNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sectionScroll}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.key}
              style={[
                styles.sectionTab,
                currentSection === index && styles.sectionTabActive
              ]}
              onPress={() => setCurrentSection(index)}
            >
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

      {/* Form Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {renderCurrentSection()}
        </View>
      </ScrollView>

      {/* Mobile Action Buttons Footer */}
      <View style={styles.actionFooter}>
        <View style={styles.actionButtons}>
          {/* Sign Flight Button - Left, Secondary (Gray) */}
          <Button 
            variant="secondary" 
            onPress={handleSignFlight}
            style={styles.signButton}
          >
            Sign Flight
          </Button>

          {/* Save Flight Button - Right, Primary (Black) */}
          <Button 
            variant="primary" 
            onPress={handleSave}
            disabled={isSaving}
            style={styles.saveButton}
          >
            {isSaving ? 'Saving...' : 'Save Flight'}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
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
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
    textAlign: 'center',
  },
  sectionNav: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  sectionScroll: {
    paddingHorizontal: 16,
  },
  sectionTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  sectionTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.tertiary.denimBlue,
  },
  sectionTabText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  sectionTabTextActive: {
    color: Colors.tertiary.denimBlue,
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
  },
  section: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  formGrid: {
    gap: 16,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    backgroundColor: Colors.primary.white,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  photoUpload: {
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
  },
  photoUploadText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  signatureUpload: {
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
  },
  signatureUploadText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  
  // Data source logo styles
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataSourceLogo: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  
  // Action Footer Styles
  actionFooter: {
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  signButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});
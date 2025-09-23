import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Slider } from 'react-native';
import { Icon } from '../components';
import { useNavigation } from '@react-navigation/native';

// This is a React Native conversion of the original prospective/calculator.tsx
const ProspectiveCalculator: React.FC = () => {
  const navigation = useNavigation();
  const isDark = false; // TODO: Connect to theme store
  const [selectedCertificate, setSelectedCertificate] = useState('private');
  const [selectedLocation, setSelectedLocation] = useState('national');
  const [experienceYears, setExperienceYears] = useState(0);

  const certificates = [
    { id: 'private', name: 'Private Pilot', cost: 8000, salary: 0, time: '3-6 months' },
    { id: 'instrument', name: 'Instrument Rating', cost: 12000, salary: 45000, time: '2-4 months' },
    { id: 'commercial', name: 'Commercial Pilot', cost: 25000, salary: 65000, time: '6-12 months' },
    { id: 'atp', name: 'Airline Transport Pilot', cost: 35000, salary: 85000, time: '12-18 months' },
    { id: 'cfi', name: 'Certified Flight Instructor', cost: 28000, salary: 55000, time: '8-12 months' }
  ];

  const locations = [
    { id: 'national', name: 'National Average', multiplier: 1.0 },
    { id: 'west', name: 'West Coast', multiplier: 1.3 },
    { id: 'east', name: 'East Coast', multiplier: 1.2 },
    { id: 'midwest', name: 'Midwest', multiplier: 0.9 },
    { id: 'south', name: 'South', multiplier: 0.8 }
  ];

  const selectedCert = certificates.find(cert => cert.id === selectedCertificate);
  const selectedLoc = locations.find(loc => loc.id === selectedLocation);
  
  const totalCost = selectedCert && selectedLoc ? Math.round(selectedCert.cost * selectedLoc.multiplier) : 0;
  const baseSalary = selectedCert ? selectedCert.salary : 0;
  const adjustedSalary = Math.round(baseSalary * (1 + (experienceYears * 0.05)));

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getLocationAdjustmentText = (multiplier: number) => {
    if (multiplier > 1) {
      return `+${Math.round((multiplier - 1) * 100)}% cost adjustment`;
    } else if (multiplier < 1) {
      return `${Math.round((1 - multiplier) * 100)}% cost savings`;
    } else {
      return 'Standard pricing';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Training Calculator</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Certificate Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Your Training Path</Text>
          <View style={styles.certificateList}>
            {certificates.map((cert) => (
              <TouchableOpacity
                key={cert.id}
                style={[
                  styles.certificateItem,
                  selectedCertificate === cert.id && styles.certificateItemSelected
                ]}
                onPress={() => setSelectedCertificate(cert.id)}
              >
                <View style={styles.certificateContent}>
                  <View style={styles.certificateLeft}>
                    <View style={[
                      styles.radioButton,
                      selectedCertificate === cert.id && styles.radioButtonSelected
                    ]}>
                      {selectedCertificate === cert.id && (
                        <Icon name="check" size={12} color="white" />
                      )}
                    </View>
                    <View>
                      <Text style={styles.certificateName}>{cert.name}</Text>
                      <Text style={styles.certificateDetails}>
                        {cert.time} • {formatCurrency(cert.cost)}
                      </Text>
                    </View>
                  </View>
                  {cert.salary > 0 && (
                    <Text style={styles.salaryText}>
                      {formatCurrency(cert.salary)}/year
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location and Experience */}
        <View style={styles.doubleCard}>
          {/* Location Selection */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Training Location</Text>
            <View style={styles.locationList}>
              {locations.map((loc) => (
                <TouchableOpacity
                  key={loc.id}
                  style={[
                    styles.locationItem,
                    selectedLocation === loc.id && styles.locationItemSelected
                  ]}
                  onPress={() => setSelectedLocation(loc.id)}
                >
                  <View style={styles.locationContent}>
                    <View style={[
                      styles.radioButton,
                      selectedLocation === loc.id && styles.radioButtonSelected
                    ]}>
                      {selectedLocation === loc.id && (
                        <Icon name="check" size={12} color="white" />
                      )}
                    </View>
                    <View>
                      <Text style={styles.locationName}>{loc.name}</Text>
                      <Text style={styles.locationDetails}>
                        {getLocationAdjustmentText(loc.multiplier)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.locationNote}>
              Location affects training costs and salary expectations
            </Text>
          </View>

          {/* Experience Level */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Years of Experience</Text>
            <View style={styles.experienceContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={experienceYears}
                onValueChange={(value) => setExperienceYears(Math.round(value))}
                step={1}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                minimumTrackTintColor="#3b82f6"
                maximumTrackTintColor="#e5e7eb"
              />
              <Text style={styles.experienceValue}>{experienceYears}</Text>
            </View>
            <Text style={styles.experienceNote}>
              Experience increases salary potential
            </Text>
          </View>
        </View>

        {/* Results */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Results</Text>
          <View style={styles.resultsGrid}>
            {/* Total Cost */}
            <View style={[styles.resultItem, { backgroundColor: '#fef2f2' }]}>
              <Icon name="dollar" size={32} color="#dc2626" style={styles.resultIcon} />
              <Text style={styles.resultLabel}>Total Training Cost</Text>
              <Text style={[styles.resultValue, { color: '#dc2626' }]}>
                {formatCurrency(totalCost)}
              </Text>
              <Text style={styles.resultNote}>Including location adjustment</Text>
            </View>

            {/* Time to Complete */}
            <View style={[styles.resultItem, { backgroundColor: '#eff6ff' }]}>
              <Icon name="graduation-cap" size={32} color="#2563eb" style={styles.resultIcon} />
              <Text style={styles.resultLabel}>Time to Complete</Text>
              <Text style={[styles.resultValue, { color: '#2563eb' }]}>
                {selectedCert?.time}
              </Text>
              <Text style={styles.resultNote}>Estimated duration</Text>
            </View>

            {/* Expected Salary */}
            <View style={[styles.resultItem, { backgroundColor: '#f0fdf4' }]}>
              <Icon name="line-chart" size={32} color="#16a34a" style={styles.resultIcon} />
              <Text style={styles.resultLabel}>Expected Salary</Text>
              <Text style={[styles.resultValue, { color: '#16a34a' }]}>
                {formatCurrency(adjustedSalary)}
              </Text>
              <Text style={styles.resultNote}>With {experienceYears} years experience</Text>
            </View>
          </View>
        </View>

        {/* ROI Analysis */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Return on Investment Analysis</Text>
          <View style={styles.roiList}>
            <View style={styles.roiItem}>
              <Text style={styles.roiLabel}>Training Investment</Text>
              <Text style={[styles.roiValue, { color: '#dc2626' }]}>
                -{formatCurrency(totalCost)}
              </Text>
            </View>
            <View style={styles.roiItem}>
              <Text style={styles.roiLabel}>Annual Salary (Year 1)</Text>
              <Text style={[styles.roiValue, { color: '#16a34a' }]}>
                +{formatCurrency(adjustedSalary)}
              </Text>
            </View>
            <View style={[styles.roiItem, { backgroundColor: '#eff6ff' }]}>
              <Text style={styles.roiLabel}>Break-even Time</Text>
              <Text style={[styles.roiValue, { color: '#2563eb' }]}>
                {adjustedSalary > 0 ? `${Math.ceil(totalCost / adjustedSalary)} years` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Steps</Text>
          <View style={styles.nextStepsList}>
            <View style={styles.nextStepItem}>
              <View style={styles.nextStepContent}>
                <Text style={styles.nextStepTitle}>Find a Flight School</Text>
                <Text style={styles.nextStepDescription}>
                  Locate schools offering your chosen certification
                </Text>
              </View>
              <TouchableOpacity
                style={styles.nextStepButton}
                onPress={() => navigation.navigate('ProspectiveFindSchool' as never)}
              >
                <Text style={styles.nextStepButtonText}>Browse Schools</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.nextStepItem}>
              <View style={styles.nextStepContent}>
                <Text style={styles.nextStepTitle}>Explore Career Paths</Text>
                <Text style={styles.nextStepDescription}>
                  Learn more about aviation career opportunities
                </Text>
              </View>
              <TouchableOpacity
                style={styles.nextStepButton}
                onPress={() => navigation.navigate('ProspectiveExplore' as never)}
              >
                <Text style={styles.nextStepButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.nextStepItem}>
              <View style={styles.nextStepContent}>
                <Text style={styles.nextStepTitle}>Apply for Financing</Text>
                <Text style={styles.nextStepDescription}>
                  Explore loan options and financing programs
                </Text>
              </View>
              <TouchableOpacity
                style={styles.nextStepButton}
                onPress={() => navigation.navigate('ProspectiveFinancing' as never)}
              >
                <Text style={styles.nextStepButtonText}>Loan Options</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 128,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  certificateList: {
    gap: 12,
  },
  certificateItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  certificateItemSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  certificateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  certificateName: {
    fontWeight: '500',
    color: '#111827',
  },
  certificateDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
  },
  doubleCard: {
    gap: 24,
  },
  locationList: {
    gap: 12,
  },
  locationItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  locationItemSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    fontWeight: '500',
    color: '#111827',
  },
  locationDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  locationNote: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 16,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#3b82f6',
    width: 20,
    height: 20,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
  experienceValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    minWidth: 48,
    textAlign: 'center',
  },
  experienceNote: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  resultsGrid: {
    gap: 24,
  },
  resultItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  resultIcon: {
    marginBottom: 8,
  },
  resultLabel: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultNote: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  roiList: {
    gap: 16,
  },
  roiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  roiLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  roiValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  nextStepsList: {
    gap: 12,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepTitle: {
    fontWeight: '500',
    color: '#111827',
  },
  nextStepDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  nextStepButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  nextStepButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProspectiveCalculator;

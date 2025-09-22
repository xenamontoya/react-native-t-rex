import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

export default function IncidentReportScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    reportType: '',
    date: '',
    time: '',
    location: '',
    aircraft: '',
    description: '',
    weatherConditions: '',
    injuriesReported: false,
    emergencyServicesContacted: false,
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    anonymousReport: false,
  });

  const handleGoBack = () => {
    navigation?.goBack();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitReport = () => {
    if (!formData.reportType || !formData.description) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Submit Report',
      'Are you sure you want to submit this incident report? This will be sent to our safety team for review.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          style: 'default',
          onPress: () => {
            Alert.alert('Report Submitted', 'Your incident report has been submitted successfully. Our safety team will review it promptly.');
            navigation?.goBack();
          }
        }
      ]
    );
  };

  const reportTypes = [
    'Aircraft Malfunction',
    'Weather-Related Incident',
    'Near Miss / Close Call',
    'Ground Incident',
    'Medical Emergency',
    'Security Concern',
    'Other Safety Issue',
  ];

  const aircraftOptions = [
    'N12345 - Cessna 172',
    'N67890 - Cessna 152',
    'N54321 - Piper Archer',
    'Ground Equipment',
    'Other/Unknown',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={24} color={Colors.primary.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incident Report</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Safety Notice */}
        <View style={styles.safetyNotice}>
          <View style={styles.safetyHeader}>
            <Icon name="exclamationTriangle" size={20} color={Colors.secondary.orange3} />
            <Text style={styles.safetyTitle}>Safety First</Text>
          </View>
          <Text style={styles.safetyDescription}>
            If this is an emergency, call 911 immediately. This form is for non-emergency incident reporting only.
            All reports are confidential and help improve safety for everyone.
          </Text>
        </View>

        {/* Report Type Selection */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Report Type *</Text>
          <View style={styles.optionsList}>
            {reportTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  formData.reportType === type && styles.optionItemSelected,
                ]}
                onPress={() => handleInputChange('reportType', type)}
              >
                <View style={[
                  styles.radioButton,
                  formData.reportType === type && styles.radioButtonSelected,
                ]}>
                  {formData.reportType === type && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={[
                  styles.optionText,
                  formData.reportType === type && styles.optionTextSelected,
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Incident Details */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Incident Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Incident</Text>
            <TextInput
              style={styles.textInput}
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={Colors.neutral.gray500}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Time of Incident</Text>
            <TextInput
              style={styles.textInput}
              value={formData.time}
              onChangeText={(value) => handleInputChange('time', value)}
              placeholder="HH:MM (Local Time)"
              placeholderTextColor={Colors.neutral.gray500}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholder="Airport, runway, ramp area, etc."
              placeholderTextColor={Colors.neutral.gray500}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Aircraft Involved</Text>
            <View style={styles.aircraftList}>
              {aircraftOptions.map((aircraft, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.aircraftOption,
                    formData.aircraft === aircraft && styles.aircraftOptionSelected,
                  ]}
                  onPress={() => handleInputChange('aircraft', aircraft)}
                >
                  <View style={[
                    styles.radioButton,
                    formData.aircraft === aircraft && styles.radioButtonSelected,
                  ]}>
                    {formData.aircraft === aircraft && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={[
                    styles.aircraftText,
                    formData.aircraft === aircraft && styles.aircraftTextSelected,
                  ]}>
                    {aircraft}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description of Incident *</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Please provide a detailed description of what happened..."
              placeholderTextColor={Colors.neutral.gray500}
              multiline
              numberOfLines={6}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weather Conditions</Text>
            <TextInput
              style={styles.textInput}
              value={formData.weatherConditions}
              onChangeText={(value) => handleInputChange('weatherConditions', value)}
              placeholder="Clear, cloudy, windy, etc."
              placeholderTextColor={Colors.neutral.gray500}
            />
          </View>
        </View>

        {/* Safety Questions */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Safety Questions</Text>
          
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => handleInputChange('injuriesReported', !formData.injuriesReported)}
          >
            <View style={[
              styles.checkbox,
              formData.injuriesReported && styles.checkboxChecked,
            ]}>
              {formData.injuriesReported && (
                <Icon name="check" size={14} color={Colors.primary.white} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Were there any injuries reported?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => handleInputChange('emergencyServicesContacted', !formData.emergencyServicesContacted)}
          >
            <View style={[
              styles.checkbox,
              formData.emergencyServicesContacted && styles.checkboxChecked,
            ]}>
              {formData.emergencyServicesContacted && (
                <Icon name="check" size={14} color={Colors.primary.white} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Were emergency services contacted?</Text>
          </TouchableOpacity>
        </View>

        {/* Reporter Information */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Reporter Information</Text>
          
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => handleInputChange('anonymousReport', !formData.anonymousReport)}
          >
            <View style={[
              styles.checkbox,
              formData.anonymousReport && styles.checkboxChecked,
            ]}>
              {formData.anonymousReport && (
                <Icon name="check" size={14} color={Colors.primary.white} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Submit as anonymous report</Text>
          </TouchableOpacity>

          {!formData.anonymousReport && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.reporterName}
                  onChangeText={(value) => handleInputChange('reporterName', value)}
                  placeholder="Full name"
                  placeholderTextColor={Colors.neutral.gray500}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.reporterEmail}
                  onChangeText={(value) => handleInputChange('reporterEmail', value)}
                  placeholder="email@example.com"
                  placeholderTextColor={Colors.neutral.gray500}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.reporterPhone}
                  onChangeText={(value) => handleInputChange('reporterPhone', value)}
                  placeholder="(555) 123-4567"
                  placeholderTextColor={Colors.neutral.gray500}
                  keyboardType="phone-pad"
                />
              </View>
            </>
          )}
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Text style={styles.privacyTitle}>Privacy & Confidentiality</Text>
          <Text style={styles.privacyText}>
            • Your report will be reviewed by our safety team only{'\n'}
            • Personal information is kept confidential{'\n'}
            • Anonymous reports are completely untraceable{'\n'}
            • Reports help improve safety for all pilots{'\n'}
            • No disciplinary action will result from safety reports
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Icon name="exclamationTriangle" size={16} color={Colors.primary.white} style={styles.submitIcon} />
          <Text style={styles.submitButtonText}>Submit Incident Report</Text>
        </TouchableOpacity>

        {/* Emergency Contact */}
        <View style={styles.emergencyContact}>
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          <Text style={styles.emergencyDescription}>
            For immediate emergencies, call 911 or contact our safety hotline:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Emergency', 'Calling emergency safety hotline...')}
          >
            <Icon name="phone" size={16} color={Colors.secondary.orange3} style={styles.emergencyButtonIcon} />
            <Text style={styles.emergencyButtonText}>1-800-SAFETY-1</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.white,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  headerRight: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  safetyNotice: {
    backgroundColor: Colors.secondary.orange1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.secondary.orange2,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.secondary.orange3,
    marginLeft: 8,
  },
  safetyDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.secondary.orange3,
    lineHeight: 20,
  },
  formSection: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  optionsList: {
    gap: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  optionItemSelected: {
    borderColor: Colors.secondary.electricBlue,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: Colors.secondary.electricBlue,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary.electricBlue,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  optionTextSelected: {
    fontFamily: Typography.fontFamily.medium,
    color: Colors.secondary.electricBlue,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    backgroundColor: Colors.primary.white,
  },
  textAreaInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  aircraftList: {
    gap: 8,
  },
  aircraftOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  aircraftOptionSelected: {
    borderColor: Colors.secondary.electricBlue,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  aircraftText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  aircraftTextSelected: {
    fontFamily: Typography.fontFamily.medium,
    color: Colors.secondary.electricBlue,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.secondary.electricBlue,
    borderColor: Colors.secondary.electricBlue,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    flex: 1,
  },
  privacyNotice: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  privacyTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary.orange3,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  emergencyContact: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  emergencyTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary.orange1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary.orange2,
  },
  emergencyButtonIcon: {
    marginRight: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.secondary.orange3,
  },
  bottomPadding: {
    height: 40,
  },
});


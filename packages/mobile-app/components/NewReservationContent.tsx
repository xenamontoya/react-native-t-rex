import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface NewReservationContentProps {
  onClose: () => void;
  onComplete: (reservationData: ReservationData) => void;
  showBackButton?: boolean;
  initialStudentName?: string;
  initialActivityType?: string;
}

interface ReservationData {
  studentName: string;
  instructorName: string;
  activityType: string;
  aircraft: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  notes: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  aircraft?: string;
}

const NewReservationContent: React.FC<NewReservationContentProps> = ({
  onClose,
  onComplete,
  showBackButton = true,
  initialStudentName = '',
  initialActivityType = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ReservationData>>({
    studentName: initialStudentName,
    activityType: initialActivityType,
    instructorName: '',
    aircraft: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: 1,
    location: 'Main Campus',
    notes: '',
  });

  // Mock data
  const activityTypes = [
    'Training Flight',
    'Stage Check',
    'Solo Practice',
    'Cross Country',
    'Instrument Training',
    'Commercial Training',
    'Multi-Engine Training',
    'Discovery Flight',
  ];

  const instructors = [
    'John Smith',
    'Sarah Johnson',
    'Mike Wilson',
    'Lisa Brown',
    'David Chen',
    'Maria Garcia',
  ];

  const aircraft = [
    'N12345 - Cessna 172',
    'N23456 - Cessna 152',
    'N34567 - Piper Cherokee',
    'N45678 - Cessna 172SP',
    'N56789 - Piper Archer',
  ];

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '8:00 AM', available: true, aircraft: 'N12345' },
    { id: '2', time: '9:00 AM', available: true, aircraft: 'N23456' },
    { id: '3', time: '10:00 AM', available: false },
    { id: '4', time: '11:00 AM', available: true, aircraft: 'N34567' },
    { id: '5', time: '12:00 PM', available: true, aircraft: 'N45678' },
    { id: '6', time: '1:00 PM', available: false },
    { id: '7', time: '2:00 PM', available: true, aircraft: 'N12345' },
    { id: '8', time: '3:00 PM', available: true, aircraft: 'N56789' },
    { id: '9', time: '4:00 PM', available: true, aircraft: 'N23456' },
    { id: '10', time: '5:00 PM', available: false },
  ];

  const steps = [
    'Activity Details',
    'Schedule & Aircraft',
    'Review & Confirm',
  ];

  const updateFormData = (field: keyof ReservationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return formData.studentName && formData.activityType && formData.instructorName;
      case 1:
        return formData.aircraft && formData.date && formData.startTime;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    if (formData.studentName && formData.instructorName && formData.activityType && 
        formData.aircraft && formData.date && formData.startTime) {
      
      // Calculate end time based on duration
      const startHour = parseInt(formData.startTime.split(':')[0]);
      const endHour = startHour + (formData.duration || 1);
      const endTime = `${endHour}:00 ${endHour >= 12 ? 'PM' : 'AM'}`;
      
      const completeData: ReservationData = {
        studentName: formData.studentName,
        instructorName: formData.instructorName,
        activityType: formData.activityType,
        aircraft: formData.aircraft,
        date: formData.date,
        startTime: formData.startTime,
        endTime,
        duration: formData.duration || 1,
        location: formData.location || 'Main Campus',
        notes: formData.notes || '',
      };

      onComplete(completeData);
    } else {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          <View style={[
            styles.stepNumber,
            index <= currentStep && styles.stepNumberActive,
            index < currentStep && styles.stepNumberCompleted
          ]}>
            {index < currentStep ? (
              <Icon name="check" size={12} color={Colors.primary.white} />
            ) : (
              <Text style={[
                styles.stepNumberText,
                index <= currentStep && styles.stepNumberTextActive
              ]}>
                {index + 1}
              </Text>
            )}
          </View>
          <Text style={[
            styles.stepLabel,
            index <= currentStep && styles.stepLabelActive
          ]}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderStep0 = () => (
    <ScrollView style={styles.stepContent}>
      <Text style={styles.stepTitle}>Activity Details</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Student Name *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.studentName}
          onChangeText={(value) => updateFormData('studentName', value)}
          placeholder="Enter student name"
          placeholderTextColor={Colors.neutral.gray400}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Activity Type *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
          {activityTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionChip,
                formData.activityType === type && styles.optionChipSelected
              ]}
              onPress={() => updateFormData('activityType', type)}
            >
              <Text style={[
                styles.optionChipText,
                formData.activityType === type && styles.optionChipTextSelected
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Instructor *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
          {instructors.map((instructor) => (
            <TouchableOpacity
              key={instructor}
              style={[
                styles.optionChip,
                formData.instructorName === instructor && styles.optionChipSelected
              ]}
              onPress={() => updateFormData('instructorName', instructor)}
            >
              <Text style={[
                styles.optionChipText,
                formData.instructorName === instructor && styles.optionChipTextSelected
              ]}>
                {instructor}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Notes (Optional)</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.notes}
          onChangeText={(value) => updateFormData('notes', value)}
          placeholder="Add any special notes or requirements..."
          placeholderTextColor={Colors.neutral.gray400}
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );

  const renderStep1 = () => (
    <ScrollView style={styles.stepContent}>
      <Text style={styles.stepTitle}>Schedule & Aircraft</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Date *</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => {
            // In a real app, this would open a date picker
            const today = new Date();
            const dateString = today.toDateString();
            updateFormData('date', dateString);
          }}
        >
          <Icon name="calendar" size={16} color={Colors.neutral.gray600} />
          <Text style={styles.dateButtonText}>
            {formData.date || 'Select Date'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Duration</Text>
        <View style={styles.durationContainer}>
          {[1, 2, 3, 4].map((hours) => (
            <TouchableOpacity
              key={hours}
              style={[
                styles.durationButton,
                formData.duration === hours && styles.durationButtonSelected
              ]}
              onPress={() => updateFormData('duration', hours)}
            >
              <Text style={[
                styles.durationButtonText,
                formData.duration === hours && styles.durationButtonTextSelected
              ]}>
                {hours}h
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Available Time Slots *</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                !slot.available && styles.timeSlotUnavailable,
                formData.startTime === slot.time && styles.timeSlotSelected
              ]}
              onPress={() => {
                if (slot.available) {
                  updateFormData('startTime', slot.time);
                  if (slot.aircraft) {
                    updateFormData('aircraft', slot.aircraft);
                  }
                }
              }}
              disabled={!slot.available}
            >
              <Text style={[
                styles.timeSlotText,
                !slot.available && styles.timeSlotTextUnavailable,
                formData.startTime === slot.time && styles.timeSlotTextSelected
              ]}>
                {slot.time}
              </Text>
              {slot.aircraft && slot.available && (
                <Text style={[
                  styles.timeSlotAircraft,
                  formData.startTime === slot.time && styles.timeSlotAircraftSelected
                ]}>
                  {slot.aircraft}
                </Text>
              )}
              {!slot.available && (
                <Text style={styles.unavailableLabel}>Unavailable</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {formData.startTime && !formData.aircraft && (
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Aircraft *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
            {aircraft.map((plane) => (
              <TouchableOpacity
                key={plane}
                style={[
                  styles.optionChip,
                  formData.aircraft === plane && styles.optionChipSelected
                ]}
                onPress={() => updateFormData('aircraft', plane)}
              >
                <Text style={[
                  styles.optionChipText,
                  formData.aircraft === plane && styles.optionChipTextSelected
                ]}>
                  {plane}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView style={styles.stepContent}>
      <Text style={styles.stepTitle}>Review & Confirm</Text>
      
      <View style={styles.reviewContainer}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Activity Details</Text>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Student:</Text>
            <Text style={styles.reviewValue}>{formData.studentName}</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Activity:</Text>
            <Text style={styles.reviewValue}>{formData.activityType}</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Instructor:</Text>
            <Text style={styles.reviewValue}>{formData.instructorName}</Text>
          </View>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Schedule</Text>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Date:</Text>
            <Text style={styles.reviewValue}>{formData.date}</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Time:</Text>
            <Text style={styles.reviewValue}>{formData.startTime}</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Duration:</Text>
            <Text style={styles.reviewValue}>{formData.duration} hour(s)</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Aircraft:</Text>
            <Text style={styles.reviewValue}>{formData.aircraft}</Text>
          </View>
        </View>

        {formData.notes && (
          <View style={styles.reviewSection}>
            <Text style={styles.reviewSectionTitle}>Notes</Text>
            <Text style={styles.reviewNotes}>{formData.notes}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderStep0();
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return renderStep0();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showBackButton && currentStep > 0 ? (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        
        <Text style={styles.headerTitle}>New Reservation</Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="times" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Content */}
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        {currentStep < steps.length - 1 ? (
          <TouchableOpacity
            style={[styles.nextButton, !canProceedToNext() && styles.nextButtonDisabled]}
            onPress={nextStep}
            disabled={!canProceedToNext()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrow-right" size={16} color={Colors.primary.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>Create Reservation</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.neutral.gray50,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepNumberActive: {
    backgroundColor: Colors.status.info,
  },
  stepNumberCompleted: {
    backgroundColor: '#10b981',
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  stepNumberTextActive: {
    color: Colors.primary.white,
  },
  stepLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: Colors.neutral.gray900,
    fontFamily: Typography.fontFamily.medium,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
    padding: 20,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  textInput: {
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
    height: 80,
    textAlignVertical: 'top',
  },
  optionsScroll: {
    flexDirection: 'row',
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  optionChipSelected: {
    backgroundColor: Colors.status.info,
    borderColor: Colors.status.info,
  },
  optionChipText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  optionChipTextSelected: {
    color: Colors.primary.white,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    backgroundColor: Colors.primary.white,
    gap: 12,
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  durationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  durationButtonSelected: {
    backgroundColor: Colors.status.info,
    borderColor: Colors.status.info,
  },
  durationButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  durationButtonTextSelected: {
    color: Colors.primary.white,
  },
  timeSlotsContainer: {
    gap: 12,
  },
  timeSlot: {
    padding: 16,
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
  },
  timeSlotSelected: {
    backgroundColor: '#eff6ff',
    borderColor: Colors.status.info,
  },
  timeSlotUnavailable: {
    backgroundColor: Colors.neutral.gray50,
    opacity: 0.6,
  },
  timeSlotText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  timeSlotTextSelected: {
    color: Colors.status.info,
  },
  timeSlotTextUnavailable: {
    color: Colors.neutral.gray500,
  },
  timeSlotAircraft: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  timeSlotAircraftSelected: {
    color: Colors.status.info,
  },
  unavailableLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  reviewContainer: {
    gap: 24,
  },
  reviewSection: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 16,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  reviewValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  reviewNotes: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.status.info,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
});

export default NewReservationContent;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface TimePickerProps {
  label?: string;
  value?: string; // Format: "HH:MM" (e.g., "08:30")
  onTimeChange: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  interval?: 15 | 30 | 60; // Minutes between time slots
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onTimeChange,
  placeholder = 'Time',
  disabled = false,
  error,
  required = false,
  interval = 30, // Default to 30 minutes like your web app
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // Generate time options exactly like your web app
  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    
    // Generate 24 hours of time slots
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      
      if (interval === 60) {
        times.push(`${hourStr}:00`);
      } else if (interval === 30) {
        // 30-minute intervals like your web app: 00:00, 00:30, 01:00, 01:30, etc.
        times.push(`${hourStr}:00`);
        times.push(`${hourStr}:30`);
      } else if (interval === 15) {
        times.push(`${hourStr}:00`);
        times.push(`${hourStr}:15`);
        times.push(`${hourStr}:30`);
        times.push(`${hourStr}:45`);
      }
    }
    
    return times;
  };

  const timeOptions = generateTimeOptions();

  const formatDisplayTime = (time: string): string => {
    if (!time) return '';
    
    // Convert 24-hour to 12-hour format for display (optional)
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleTimeSelect = (selectedTime: string) => {
    onTimeChange(selectedTime);
    setShowPicker(false);
  };

  const openPicker = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}{required && '*'}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          error && styles.inputError,
        ]}
        onPress={openPicker}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.inputText,
          !value && styles.placeholderText,
          disabled && styles.inputTextDisabled,
        ]}>
          {value ? formatDisplayTime(value) : placeholder}
        </Text>
        
        <FontAwesome6 
          name="clock" 
          size={16} 
          color={disabled ? Colors.neutral.gray400 : Colors.neutral.gray600} 
        />
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {showPicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Time</Text>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <FontAwesome6 name="xmark" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.timeList} showsVerticalScrollIndicator={false}>
                {timeOptions.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeOption,
                      value === time && styles.timeOptionSelected,
                    ]}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <Text style={[
                      styles.timeOptionText,
                      value === time && styles.timeOptionTextSelected,
                    ]}>
                      {formatDisplayTime(time)}
                    </Text>
                    <Text style={[
                      styles.timeOptionSubtext,
                      value === time && styles.timeOptionSubtextSelected,
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: Spacing.xs,
  },
  labelDisabled: {
    color: Colors.neutral.gray400,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    minHeight: 48,
  },
  inputDisabled: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.neutral.gray200,
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  inputText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    flex: 1,
  },
  placeholderText: {
    color: Colors.neutral.gray500,
  },
  inputTextDisabled: {
    color: Colors.neutral.gray400,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.status.error,
    marginTop: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.lg,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  timeList: {
    maxHeight: 300,
  },
  timeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    marginVertical: 2,
  },
  timeOptionSelected: {
    backgroundColor: Colors.secondary.electricBlue,
  },
  timeOptionText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  timeOptionTextSelected: {
    color: Colors.neutral.white,
  },
  timeOptionSubtext: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  timeOptionSubtextSelected: {
    color: Colors.neutral.white,
    opacity: 0.8,
  },
});

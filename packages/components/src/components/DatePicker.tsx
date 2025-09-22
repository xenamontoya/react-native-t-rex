import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface DatePickerProps {
  label?: string;
  value?: Date;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onDateChange,
  placeholder = 'Select Date',
  disabled = false,
  error,
  required = false,
  minimumDate,
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date): string => {
    // Format to match your web app: "YYYY-MM-DD" for display
    return date.toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format
  };

  const formatDisplayDate = (date: Date): string => {
    // Format for display: "Mar 23, 2025"
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const handleDateSelect = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate) {
      onDateChange(selectedDate);
    }
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
          {value ? formatDisplayDate(value) : placeholder}
        </Text>
        
        <FontAwesome6 
          name="calendar" 
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
          animationType="fade"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date</Text>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <FontAwesome6 name="xmark" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              </View>
              
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateSelect}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                style={styles.picker}
              />
              
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.lg,
    width: '90%',
    maxWidth: 320,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  picker: {
    width: '100%',
  },
  doneButton: {
    backgroundColor: Colors.secondary.electricBlue,
    borderRadius: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.white,
  },
});

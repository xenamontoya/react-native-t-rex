import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { Colors, Typography, Spacing } from '../design-system';

export interface DateTimePickerProps {
  label?: string;
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  onStartDateChange: (date: Date) => void;
  onStartTimeChange: (time: string) => void;
  onEndDateChange: (date: Date) => void;
  onEndTimeChange: (time: string) => void;
  disabled?: boolean;
  required?: boolean;
  showEndDateTime?: boolean;
  error?: string;
}

// Combined Date + Time picker that matches your reservation form exactly
export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  startDate,
  startTime,
  endDate,
  endTime,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  disabled = false,
  required = false,
  showEndDateTime = true,
  error,
}) => {
  return (
    <View style={styles.container}>
      {/* Start Date & Time */}
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, disabled && styles.labelDisabled]}>
          Start{required && '*'}
        </Text>
        <View style={styles.dateTimeRow}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              value={startDate}
              onDateChange={onStartDateChange}
              placeholder="Select Date"
              disabled={disabled}
            />
          </View>
          <View style={styles.timePickerContainer}>
            <TimePicker
              value={startTime}
              onTimeChange={onStartTimeChange}
              placeholder="Time"
              disabled={disabled}
              interval={30} // 30-minute intervals like your web app
            />
          </View>
        </View>
      </View>

      {/* End Date & Time */}
      {showEndDateTime && (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, disabled && styles.labelDisabled]}>
            End{required && '*'}
          </Text>
          <View style={styles.dateTimeRow}>
            <View style={styles.datePickerContainer}>
              <DatePicker
                value={endDate}
                onDateChange={onEndDateChange}
                placeholder="Select Date"
                disabled={disabled}
                minimumDate={startDate} // End date can't be before start date
              />
            </View>
            <View style={styles.timePickerContainer}>
              <TimePicker
                value={endTime}
                onTimeChange={onEndTimeChange}
                placeholder="Time"
                disabled={disabled}
                interval={30}
              />
            </View>
          </View>
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

// Simple single date picker that matches your logbook form
export const FlightDatePicker: React.FC<{
  label?: string;
  value?: Date;
  onDateChange: (date: Date) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}> = ({ label = 'Date', value, onDateChange, disabled, required, error }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onDateChange={onDateChange}
      disabled={disabled}
      required={required}
      error={error}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: Spacing.sm,
  },
  labelDisabled: {
    color: Colors.neutral.gray400,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  datePickerContainer: {
    flex: 1,
  },
  timePickerContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.status.error,
    marginTop: Spacing.xs,
  },
});

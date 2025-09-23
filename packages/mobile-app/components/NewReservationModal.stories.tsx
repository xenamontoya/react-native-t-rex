import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import NewReservationModal from './NewReservationModal';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof NewReservationModal> = {
  title: 'Features/NewReservationModal',
  component: NewReservationModal,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isOpen: false,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const NewReservationModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (reservationData: any) => {
    action('reservation-created')(reservationData);
    setIsOpen(false);
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>New Reservation Modal</Text>
      <Text style={styles.demoDescription}>
        Multi-step form for creating flight reservations and lesson bookings. 
        Includes student selection, aircraft booking, and scheduling.
      </Text>
      
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>👨‍🎓 Student selection and details</Text>
        <Text style={styles.featureItem}>✈️ Activity type selection</Text>
        <Text style={styles.featureItem}>👨‍✈️ Instructor assignment</Text>
        <Text style={styles.featureItem}>🛩️ Aircraft selection</Text>
        <Text style={styles.featureItem}>📅 Date and time scheduling</Text>
        <Text style={styles.featureItem}>📝 Notes and special requests</Text>
      </View>

      <View style={styles.stepFlow}>
        <Text style={styles.flowTitle}>Booking Flow:</Text>
        <Text style={styles.flowStep}>1. Activity Details → 2. Aircraft & Time → 3. Review & Confirm</Text>
      </View>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Create New Reservation</Text>
      </TouchableOpacity>

      <NewReservationModal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          action('modal-closed')();
        }}
        onComplete={handleComplete}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <NewReservationModalDemo {...args} />,
};

export const OpenedModal: Story = {
  render: (args) => <NewReservationModalDemo {...args} />,
  args: {
    isOpen: true,
  },
};

export const BookingWorkflow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Reservation Booking Flow</Text>
        <Text style={styles.demoDescription}>
          Experience the complete reservation creation process with form validation and scheduling.
        </Text>
        
        <View style={styles.activityTypes}>
          <Text style={styles.typesTitle}>Available Activities:</Text>
          <Text style={styles.activityType}>🎯 Solo Practice</Text>
          <Text style={styles.activityType}>👨‍✈️ Dual Instruction</Text>
          <Text style={styles.activityType}>✅ Checkride</Text>
          <Text style={styles.activityType}>📚 Ground School</Text>
          <Text style={styles.activityType}>🛠️ Aircraft Maintenance</Text>
        </View>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Start Booking Process</Text>
        </TouchableOpacity>

        <NewReservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            action('booking-completed')(data);
          }}
        />
      </View>
    );
  },
};

export const QuickBooking: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Quick Booking Demo</Text>
        <Text style={styles.demoDescription}>
          Streamlined booking experience for regular flight lessons and practice sessions.
        </Text>
        
        <View style={styles.quickTips}>
          <Text style={styles.tipsTitle}>Quick Tips:</Text>
          <Text style={styles.tip}>• Pre-filled student information for faster booking</Text>
          <Text style={styles.tip}>• Smart aircraft suggestions based on lesson type</Text>
          <Text style={styles.tip}>• Automatic instructor matching by availability</Text>
          <Text style={styles.tip}>• Conflict detection and alternative suggestions</Text>
        </View>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Quick Book Lesson</Text>
        </TouchableOpacity>

        <NewReservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            action('quick-booking-completed')(data);
          }}
        />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  demoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  demoTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
  },
  demoDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  featureList: {
    gap: 8,
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 18,
  },
  stepFlow: {
    backgroundColor: Colors.brand.blueAzure + '10',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  flowTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginBottom: 8,
  },
  flowStep: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 16,
  },
  activityTypes: {
    backgroundColor: Colors.neutral.gray100,
    padding: 16,
    borderRadius: 8,
    gap: 6,
  },
  typesTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginBottom: 4,
  },
  activityType: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
  quickTips: {
    backgroundColor: Colors.status.success + '10',
    padding: 16,
    borderRadius: 8,
    gap: 6,
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginBottom: 4,
  },
  tip: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
  triggerButton: {
    backgroundColor: Colors.brand.blueAzure,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  triggerButtonText: {
    color: Colors.primary.white,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
});

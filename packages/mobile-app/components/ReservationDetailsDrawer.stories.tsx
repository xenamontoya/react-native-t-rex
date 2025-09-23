import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ReservationDetailsDrawer from './ReservationDetailsDrawer';
import { ConfirmationModalProvider } from './ConfirmationModal';
import { ActionSheetProvider } from './ActionSheet';
import { ToastProvider } from './SuccessToast';
import { Colors, Typography } from '../../components/src';

// Mock reservation data
const mockReservation = {
  id: 'res_001',
  date: '2024-12-15',
  startTime: '14:00',
  endTime: '16:00',
  status: 'Confirmed',
  aircraft: {
    type: 'Cessna 172S',
    registration: 'N12345',
    image: 'https://example.com/aircraft.jpg',
  },
  student: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    profileImage: 'https://example.com/student.jpg',
  },
  instructor: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@flightschool.com',
    phone: '+1-555-0456',
    profileImage: 'https://example.com/instructor.jpg',
  },
  lesson: {
    id: 'lesson_001',
    title: 'Private Pilot - Solo Practice',
    objectives: ['Traffic Pattern Practice', 'Landing Techniques', 'Radio Communications'],
  },
  flight: {
    id: 'flight_001',
    route: 'KPAO → KNUQ → KPAO',
    duration: '2.0',
  },
  notes: 'Focus on crosswind landings and radio communication procedures.',
};

const meta: Meta<typeof ReservationDetailsDrawer> = {
  title: 'Details/ReservationDetailsDrawer',
  component: ReservationDetailsDrawer,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    reservation: {
      control: { type: 'object' },
    },
  },
  args: {
    isOpen: false,
    reservation: mockReservation,
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <ActionSheetProvider>
          <ConfirmationModalProvider>
            <View style={styles.decorator}>
              <Story />
            </View>
          </ConfirmationModalProvider>
        </ActionSheetProvider>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ReservationDetailsDrawerDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Reservation Details Drawer</Text>
      <Text style={styles.demoDescription}>
        Comprehensive reservation details view with student/instructor info, 
        lesson objectives, and quick actions for communication and management.
      </Text>
      
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>📅 Reservation scheduling details</Text>
        <Text style={styles.featureItem}>✈️ Aircraft information and images</Text>
        <Text style={styles.featureItem}>👨‍🎓 Student contact and profile</Text>
        <Text style={styles.featureItem}>👨‍✈️ Instructor assignment details</Text>
        <Text style={styles.featureItem}>📚 Lesson objectives and progress</Text>
        <Text style={styles.featureItem}>📞 Quick contact actions</Text>
        <Text style={styles.featureItem}>🎯 Flight planning integration</Text>
      </View>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Reservation Details</Text>
      </TouchableOpacity>

      <ReservationDetailsDrawer
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          action('drawer-closed')();
        }}
      />
    </View>
  );
};

const StatusVariantsDemo = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const reservationVariants = [
    {
      ...mockReservation,
      id: 'res_confirmed',
      status: 'Confirmed',
      date: '2024-12-15',
      notes: 'Standard lesson with crosswind practice.',
    },
    {
      ...mockReservation,
      id: 'res_completed',
      status: 'Completed',
      date: '2024-12-10',
      notes: 'Excellent progress on solo maneuvers.',
    },
    {
      ...mockReservation,
      id: 'res_cancelled',
      status: 'Cancelled',
      date: '2024-12-08',
      notes: 'Cancelled due to weather conditions.',
    },
    {
      ...mockReservation,
      id: 'res_noshow',
      status: 'No Show',
      date: '2024-12-05',
      notes: 'Student did not arrive for scheduled lesson.',
    },
  ];

  const handleOpenReservation = (reservation: any) => {
    setSelectedReservation(reservation);
    setIsOpen(true);
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.variantsTitle}>Reservation Status Variants</Text>
      <Text style={styles.variantsDescription}>
        Different reservation statuses with appropriate styling and available actions.
      </Text>
      
      <View style={styles.variantsGrid}>
        {reservationVariants.map((reservation) => (
          <TouchableOpacity
            key={reservation.id}
            style={[
              styles.variantCard,
              reservation.status === 'Confirmed' && styles.confirmedCard,
              reservation.status === 'Completed' && styles.completedCard,
              reservation.status === 'Cancelled' && styles.cancelledCard,
              reservation.status === 'No Show' && styles.noShowCard,
            ]}
            onPress={() => handleOpenReservation(reservation)}
          >
            <Text style={styles.variantStatus}>{reservation.status}</Text>
            <Text style={styles.variantDate}>{reservation.date}</Text>
            <Text style={styles.variantTime}>{reservation.startTime} - {reservation.endTime}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ReservationDetailsDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        reservation={selectedReservation}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ReservationDetailsDrawerDemo {...args} />,
};

export const OpenedDrawer: Story = {
  render: (args) => <ReservationDetailsDrawerDemo {...args} />,
  args: {
    isOpen: true,
  },
};

export const StatusVariants: Story = {
  render: () => <StatusVariantsDemo />,
};

export const CompletedReservation: Story = {
  render: (args) => <ReservationDetailsDrawerDemo {...args} />,
  args: {
    isOpen: true,
    reservation: {
      ...mockReservation,
      status: 'Completed',
      date: '2024-12-10',
      notes: 'Excellent lesson with successful solo flight completion.',
    },
  },
};

export const CancelledReservation: Story = {
  render: (args) => <ReservationDetailsDrawerDemo {...args} />,
  args: {
    isOpen: true,
    reservation: {
      ...mockReservation,
      status: 'Cancelled',
      date: '2024-12-08',
      notes: 'Cancelled due to adverse weather conditions.',
    },
  },
};

export const InteractiveFeatures: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.interactiveTitle}>Interactive Features Demo</Text>
        <Text style={styles.interactiveDescription}>
          This demo showcases all interactive elements including contact actions, 
          navigation to related screens, and management options.
        </Text>
        
        <View style={styles.featuresGrid}>
          <View style={styles.featureBox}>
            <Text style={styles.featureBoxTitle}>Contact Actions</Text>
            <Text style={styles.featureBoxText}>Call, text, or email student/instructor directly</Text>
          </View>
          
          <View style={styles.featureBox}>
            <Text style={styles.featureBoxTitle}>Navigation</Text>
            <Text style={styles.featureBoxText}>Jump to lesson details, flight planning, or logbook</Text>
          </View>
          
          <View style={styles.featureBox}>
            <Text style={styles.featureBoxTitle}>Management</Text>
            <Text style={styles.featureBoxText}>Modify, cancel, or complete reservations</Text>
          </View>
          
          <View style={styles.featureBox}>
            <Text style={styles.featureBoxTitle}>Status Updates</Text>
            <Text style={styles.featureBoxText}>Mark attendance, add notes, update progress</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Test Interactive Features</Text>
        </TouchableOpacity>

        <ReservationDetailsDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reservation={mockReservation}
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
  variantsTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 8,
  },
  variantsDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: 20,
  },
  variantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  variantCard: {
    backgroundColor: Colors.primary.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
    minWidth: 140,
    alignItems: 'center',
  },
  confirmedCard: {
    borderColor: Colors.status.success,
  },
  completedCard: {
    borderColor: Colors.brand.blueAzure,
  },
  cancelledCard: {
    borderColor: Colors.status.error,
  },
  noShowCard: {
    borderColor: Colors.status.warning,
  },
  variantStatus: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  variantDate: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 2,
  },
  variantTime: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  interactiveTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 8,
  },
  interactiveDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    maxWidth: 400,
  },
  featureBox: {
    backgroundColor: Colors.neutral.gray100,
    padding: 12,
    borderRadius: 8,
    width: '45%',
    minWidth: 160,
  },
  featureBoxTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  featureBoxText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
});

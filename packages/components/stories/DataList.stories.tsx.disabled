import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { DataList, DataCard, ReservationCard, FlightCard } from '../src/components/DataList';
import { Button } from '../src/components/Button';

const meta: Meta<typeof DataList> = {
  title: '🧩 Components/DataList',
  component: DataList,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleDataList: Story = {
  args: {
    items: [
      { label: 'Date', value: 'Mar 23, 2025' },
      { label: 'Time', value: '8:30 - 10:30' },
      { label: 'Aircraft', value: 'N12345' },
      { label: 'Aircraft Type', value: 'Cessna 172S' },
      { label: 'Instructor', value: 'Sarah Chen - CFI' },
      { 
        label: 'Status', 
        value: '', 
        type: 'status', 
        statusType: 'confirmed' 
      },
    ],
    showBorders: true,
  },
};

export const ReservationExample: Story = {
  render: () => (
    <ReservationCard
      reservation={{
        id: '1',
        type: 'Flight Training',
        date: 'MAR 23, 2025',
        dayOfWeek: 'MON',
        startTime: '8:30',
        endTime: '10:30',
        aircraft: 'N12345',
        aircraftType: 'Cessna 172S',
        instructor: 'Sarah Chen - CFI',
        status: 'confirmed',
      }}
      onPress={() => console.log('Reservation pressed')}
    />
  ),
};

export const FlightLogbookEntry: Story = {
  render: () => (
    <FlightCard
      flight={{
        id: '1',
        date: 'Mar 15, 2025',
        flightNumber: 'N12345',
        aircraft: 'N12345',
        aircraftType: 'Cessna 172S',
        from: 'KPAO',
        to: 'KPAO',
        totalTime: '1.5',
        instructor: 'John Smith - CFI',
        dayLandings: 8,
        dual: '1.5',
      }}
      onPress={() => console.log('Flight pressed')}
    />
  ),
};

export const DataCardWithActions: Story = {
  render: () => (
    <DataCard
      title="Lesson Review"
      subtitle="MON, MAR 23, 2025"
      status="pending"
      statusType="pending"
      items={[
        { label: 'Lesson Type', value: 'Pattern Work' },
        { label: 'Duration', value: '2.0 hours' },
        { label: 'Maneuvers', value: 'Takeoffs & Landings' },
        { label: 'Performance', value: 'Excellent' },
      ]}
      actions={
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button 
            title="Approve" 
            variant="primary" 
            size="small" 
            onPress={() => {}} 
          />
          <Button 
            title="Review" 
            variant="secondary" 
            size="small" 
            onPress={() => {}} 
          />
        </View>
      }
    />
  ),
};

export const MultipleReservations: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ReservationCard
        reservation={{
          id: '1',
          type: 'Flight Training',
          date: 'MAR 23, 2025',
          dayOfWeek: 'MON',
          startTime: '8:30',
          endTime: '10:30',
          aircraft: 'N12345',
          aircraftType: 'Cessna 172S',
          instructor: 'Sarah Chen - CFI',
          status: 'confirmed',
        }}
      />
      
      <ReservationCard
        reservation={{
          id: '2',
          type: 'Solo Practice',
          date: 'MAR 25, 2025',
          dayOfWeek: 'WED',
          startTime: '14:00',
          endTime: '16:00',
          aircraft: 'N54321',
          aircraftType: 'Piper Cherokee',
          status: 'scheduled',
        }}
      />
      
      <ReservationCard
        reservation={{
          id: '3',
          type: 'Checkride Prep',
          date: 'MAR 27, 2025',
          dayOfWeek: 'FRI',
          startTime: '9:00',
          endTime: '12:00',
          aircraft: 'N98765',
          aircraftType: 'Cessna 172S',
          instructor: 'Mike Johnson - CFI',
          status: 'pending',
        }}
      />
    </View>
  ),
};

export const CompactSpacing: Story = {
  args: {
    items: [
      { label: 'Aircraft', value: 'N12345' },
      { label: 'Type', value: 'C172S' },
      { label: 'Time', value: '1.5' },
      { label: 'Landings', value: '3' },
    ],
    spacing: 'compact',
    showBorders: false,
  },
};

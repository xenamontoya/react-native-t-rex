import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { DatePicker, TimePicker, DateTimePicker, FlightDatePicker } from '../src/components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: '🧩 Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FlightDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
      <DatePicker
        label="Flight Date"
        value={date}
        onDateChange={setDate}
        placeholder="Select flight date"
        required
      />
    );
  },
};

export const ReservationTime: Story = {
  render: () => {
    const [time, setTime] = useState<string>('08:30');
    
    return (
      <TimePicker
        label="Start Time"
        value={time}
        onTimeChange={setTime}
        placeholder="Select time"
        interval={30}
        required
      />
    );
  },
};

export const ReservationBooking: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<string>('08:30');
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [endTime, setEndTime] = useState<string>('10:30');
    
    return (
      <DateTimePicker
        label="Reservation Schedule"
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        onStartDateChange={setStartDate}
        onStartTimeChange={setStartTime}
        onEndDateChange={setEndDate}
        onEndTimeChange={setEndTime}
        required
        showEndDateTime
      />
    );
  },
};

export const LogbookEntry: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <FlightDatePicker
        label="Date"
        value={date}
        onDateChange={setDate}
        required
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <DatePicker
        label="Flight Date"
        value={date}
        onDateChange={setDate}
        error="Please select a valid flight date"
        required
      />
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <DatePicker
        label="Completed Flight Date"
        value={new Date('2025-01-15')}
        onDateChange={() => {}}
        disabled
      />
      <TimePicker
        label="Departure Time"
        value="14:30"
        onTimeChange={() => {}}
        disabled
      />
    </View>
  ),
};

export const TimeIntervals: Story = {
  render: () => {
    const [time15, setTime15] = useState<string>('');
    const [time30, setTime30] = useState<string>('');
    const [time60, setTime60] = useState<string>('');
    
    return (
      <View style={{ gap: 20 }}>
        <TimePicker
          label="15-minute intervals"
          value={time15}
          onTimeChange={setTime15}
          interval={15}
        />
        <TimePicker
          label="30-minute intervals (default)"
          value={time30}
          onTimeChange={setTime30}
          interval={30}
        />
        <TimePicker
          label="60-minute intervals"
          value={time60}
          onTimeChange={setTime60}
          interval={60}
        />
      </View>
    );
  },
};

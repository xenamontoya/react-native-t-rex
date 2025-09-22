import type { Meta, StoryObj } from '@storybook/react';
import { View, Alert } from 'react-native';
import { DateTimePicker } from '../src/components/DateTimePicker';

const meta: Meta<typeof DateTimePicker> = {
  title: '📅 Forms/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A combined date and time picker for React Native, perfect for flight reservations and lesson scheduling.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 320, backgroundColor: 'white' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: {
      description: 'Label for the date-time picker',
      control: 'text',
    },
    dateValue: {
      description: 'Selected date value',
      control: 'text',
    },
    timeValue: {
      description: 'Selected time value',
      control: 'text',
    },
    onDateChange: {
      description: 'Callback when date changes',
      action: 'onDateChange',
    },
    onTimeChange: {
      description: 'Callback when time changes',
      action: 'onTimeChange',
    },
    dateLabel: {
      description: 'Custom label for date field',
      control: 'text',
    },
    timeLabel: {
      description: 'Custom label for time field',
      control: 'text',
    },
    datePlaceholder: {
      description: 'Placeholder for date field',
      control: 'text',
    },
    timePlaceholder: {
      description: 'Placeholder for time field',
      control: 'text',
    },
    disabled: {
      description: 'Whether the picker is disabled',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Reservation Date & Time',
    onDateChange: (date: string) => Alert.alert('Date Selected', date),
    onTimeChange: (time: string) => Alert.alert('Time Selected', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic combined date and time picker.',
      },
    },
  },
};

export const FlightReservation: Story = {
  args: {
    label: 'Flight Lesson Schedule',
    dateLabel: 'Lesson Date',
    timeLabel: 'Start Time',
    datePlaceholder: 'Choose date',
    timePlaceholder: 'Choose time',
    onDateChange: (date: string) => Alert.alert('Lesson Date', date),
    onTimeChange: (time: string) => Alert.alert('Lesson Time', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Date-time picker customized for flight lesson reservations.',
      },
    },
  },
};

export const WithValues: Story = {
  args: {
    label: 'Scheduled Flight',
    dateValue: '2024-02-15',
    timeValue: '14:00',
    onDateChange: (date: string) => Alert.alert('Date Changed', date),
    onTimeChange: (time: string) => Alert.alert('Time Changed', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Date-time picker with pre-selected values.',
      },
    },
  },
};

export const CheckRide: Story = {
  args: {
    label: 'Checkride Appointment',
    dateLabel: 'Examination Date',
    timeLabel: 'Meeting Time',
    dateValue: '2024-03-01',
    timeValue: '09:00',
    onDateChange: (date: string) => Alert.alert('Checkride Date', date),
    onTimeChange: (time: string) => Alert.alert('Checkride Time', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Date-time picker for important checkride scheduling.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Completed Flight',
    dateValue: '2024-01-15',
    timeValue: '16:30',
    disabled: true,
    onDateChange: (date: string) => Alert.alert('Date Selected', date),
    onTimeChange: (time: string) => Alert.alert('Time Selected', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled date-time picker for completed or locked reservations.',
      },
    },
  },
};

export const MultipleReservations: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <DateTimePicker
        label="Flight #1 - Pattern Work"
        dateValue="2024-02-10"
        timeValue="09:00"
        onDateChange={(date) => Alert.alert('Flight 1 Date', date)}
        onTimeChange={(time) => Alert.alert('Flight 1 Time', time)}
      />
      <DateTimePicker
        label="Flight #2 - Cross Country"
        dateValue="2024-02-12"
        timeValue="13:30"
        onDateChange={(date) => Alert.alert('Flight 2 Date', date)}
        onTimeChange={(time) => Alert.alert('Flight 2 Time', time)}
      />
      <DateTimePicker
        label="Flight #3 - Solo Practice"
        datePlaceholder="Choose date"
        timePlaceholder="Choose time"
        onDateChange={(date) => Alert.alert('Flight 3 Date', date)}
        onTimeChange={(time) => Alert.alert('Flight 3 Time', time)}
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple date-time pickers for scheduling multiple flights.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { View, Alert } from 'react-native';
import { TimePicker } from '../src/components/TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: '📅 Forms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A time picker component for React Native with 30-minute intervals, matching aviation scheduling requirements.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 300, backgroundColor: 'white' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: {
      description: 'Label for the time picker',
      control: 'text',
    },
    value: {
      description: 'Selected time value',
      control: 'text',
    },
    onTimeChange: {
      description: 'Callback when time changes',
      action: 'onTimeChange',
    },
    placeholder: {
      description: 'Placeholder text when no time selected',
      control: 'text',
    },
    disabled: {
      description: 'Whether the picker is disabled',
      control: 'boolean',
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Departure Time',
    placeholder: 'Select time',
    onTimeChange: (time: string) => Alert.alert('Time Selected', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic time picker with 30-minute intervals.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    label: 'Scheduled Out',
    value: '14:00',
    onTimeChange: (time: string) => Alert.alert('Time Changed', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with pre-selected value.',
      },
    },
  },
};

export const FlightScheduling: Story = {
  args: {
    label: 'Lesson Start Time',
    placeholder: 'Choose lesson time',
    onTimeChange: (time: string) => Alert.alert('Lesson Scheduled', `Flight lesson at ${time}`),
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker for flight lesson scheduling.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Arrival Time',
    value: '09:00',
    error: 'Arrival time must be after departure time',
    onTimeChange: (time: string) => Alert.alert('Time Selected', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with validation error message.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Fixed Schedule Time',
    value: '16:30',
    disabled: true,
    onTimeChange: (time: string) => Alert.alert('Time Selected', time),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled time picker for read-only scenarios.',
      },
    },
  },
};

export const MultipleTimePickers: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <TimePicker
        label="Departure Time"
        value="09:00"
        onTimeChange={(time) => Alert.alert('Departure', time)}
      />
      <TimePicker
        label="Arrival Time"
        value="11:30"
        onTimeChange={(time) => Alert.alert('Arrival', time)}
      />
      <TimePicker
        label="Break Time"
        placeholder="Optional break"
        onTimeChange={(time) => Alert.alert('Break', time)}
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple time pickers for complex flight scheduling.',
      },
    },
  },
};

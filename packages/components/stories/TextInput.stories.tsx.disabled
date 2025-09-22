import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { TextInput } from '../src/components/TextInput';

const meta: Meta<typeof TextInput> = {
  title: '🧩 Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        label="Email Address"
        value={value}
        onChangeText={setValue}
        placeholder="pilot@example.com"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('invalid-email');
    return (
      <TextInput
        label="Email Address"
        value={value}
        onChangeText={setValue}
        error="Please enter a valid email address"
        variant="error"
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        label="Password"
        value={value}
        onChangeText={setValue}
        placeholder="Enter password..."
        required
        secureTextEntry
      />
    );
  },
};
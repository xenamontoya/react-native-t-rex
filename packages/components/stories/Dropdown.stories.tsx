import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { Dropdown, DropdownOption } from '../src/components/Dropdown';

const aircraftOptions: DropdownOption[] = [
  { label: 'Cessna 152', value: 'c152' },
  { label: 'Cessna 172', value: 'c172' },
  { label: 'Piper Cherokee', value: 'pa28' },
  { label: 'Beechcraft Bonanza', value: 'be35' },
];

const meta: Meta<typeof Dropdown> = {
  title: '🧩 Components/Dropdown',
  component: Dropdown,
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
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        label="Aircraft Type"
        placeholder="Select Aircraft"
        options={aircraftOptions}
        value={value}
        onSelect={(option) => setValue(option.value)}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('c172');
    
    return (
      <Dropdown
        label="Aircraft Type"
        options={aircraftOptions}
        value={value}
        onSelect={(option) => setValue(option.value)}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        label="Required Field"
        options={aircraftOptions}
        value={value}
        onSelect={(option) => setValue(option.value)}
        error="Please select an aircraft type"
        required
      />
    );
  },
};
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { Toggle } from '../src/components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: '🧩 Components/Toggle',
  component: Toggle,
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
    const [enabled, setEnabled] = useState(false);
    return (
      <Toggle
        value={enabled}
        onValueChange={setEnabled}
        label="Enable notifications"
      />
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);
    return (
      <Toggle
        value={enabled}
        onValueChange={setEnabled}
        label="Dark Mode"
        description="Switch to dark theme for better visibility"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(true);
    const [large, setLarge] = useState(false);

    return (
      <View style={{ gap: 24 }}>
        <Toggle
          value={small}
          onValueChange={setSmall}
          label="Small Toggle"
          size="small"
        />
        <Toggle
          value={medium}
          onValueChange={setMedium}
          label="Medium Toggle"
          size="medium"
        />
        <Toggle
          value={large}
          onValueChange={setLarge}
          label="Large Toggle"
          size="large"
        />
      </View>
    );
  },
};
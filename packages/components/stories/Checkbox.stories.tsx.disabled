import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { Checkbox } from '../src/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: '🧩 Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Enable flight notifications"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        label="This checkbox is checked"
        checked={checked}
        onChange={setChecked}
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
      <View style={{ gap: 16 }}>
        <Checkbox
          label="Small checkbox"
          checked={small}
          onChange={setSmall}
          size="small"
        />
        <Checkbox
          label="Medium checkbox"
          checked={medium}
          onChange={setMedium}
          size="medium"
        />
        <Checkbox
          label="Large checkbox"
          checked={large}
          onChange={setLarge}
          size="large"
        />
      </View>
    );
  },
};
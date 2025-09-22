import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: '🧩 Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPress: { action: 'pressed' },
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

export const Primary: Story = {
  args: {
    title: '+ Add Flight',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Schedule',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    title: 'View All →',
    variant: 'tertiary',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Button title="Small Button" variant="primary" size="small" onPress={() => {}} />
      <Button title="Medium Button" variant="primary" size="medium" onPress={() => {}} />
      <Button title="Large Button" variant="primary" size="large" onPress={() => {}} />
    </View>
  ),
};
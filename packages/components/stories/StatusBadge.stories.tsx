import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StatusBadge } from '../src/components/StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: '🧩 Components/StatusBadge',
  component: StatusBadge,
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

export const Scheduled: Story = {
  args: {
    status: 'scheduled',
  },
};

export const Confirmed: Story = {
  args: {
    status: 'confirmed',
  },
};

export const Complete: Story = {
  args: {
    status: 'complete',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <StatusBadge status="scheduled" />
      <StatusBadge status="confirmed" />
      <StatusBadge status="complete" />
      <StatusBadge status="pending" />
      <StatusBadge status="cancelled" />
      <StatusBadge status="in-progress" />
    </View>
  ),
};
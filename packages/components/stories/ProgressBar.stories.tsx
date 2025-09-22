import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProgressBar } from '../src/components/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: '🧩 Components/ProgressBar',
  component: ProgressBar,
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
  args: {
    progress: 75,
  },
};

export const WithPercentage: Story = {
  args: {
    progress: 65,
    showPercentage: true,
  },
};

export const Different_Progresses: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <ProgressBar progress={25} showPercentage />
      <ProgressBar progress={50} showPercentage />
      <ProgressBar progress={75} showPercentage />
      <ProgressBar progress={100} showPercentage />
    </View>
  ),
};

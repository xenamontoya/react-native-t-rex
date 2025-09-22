import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Header } from '../src/components/Header';

const meta: Meta<typeof Header> = {
  title: '🧩 Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onMenuPress: { action: 'menu pressed' },
    onTimerPress: { action: 'timer pressed' },
    onStartTimer: { action: 'start timer pressed' },
    onAlertsPress: { action: 'alerts pressed' },
    onSettingsPress: { action: 'settings pressed' },
    onUserPress: { action: 'user pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Flight Schedule Pro',
    timerValue: '01:23',
    showTimer: true,
    showAlerts: true,
    alertsActive: false,
  },
};

export const ActiveAlerts: Story = {
  args: {
    title: 'Flight Schedule Pro',
    timerValue: '02:45',
    showTimer: true,
    showAlerts: true,
    alertsActive: true,
  },
};

export const MinimalVariant: Story = {
  args: {
    title: 'Student Dashboard',
    variant: 'minimal',
  },
};

export const WithoutTimer: Story = {
  args: {
    title: 'Flight Schedule Pro',
    showTimer: false,
    showAlerts: true,
    alertsActive: false,
  },
};

export const MobileLayout: Story = {
  render: (args) => (
    <View style={{ maxWidth: 375 }}>
      <Header {...args} />
    </View>
  ),
  args: {
    title: 'Flight Pro',
    timerValue: '00:45',
    showTimer: true,
    showAlerts: false,
  },
};

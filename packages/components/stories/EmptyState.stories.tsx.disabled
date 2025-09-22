import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { 
  EmptyState, 
  FlightLogEmptyState, 
  ReservationsEmptyState, 
  LessonsEmptyState, 
  SearchEmptyState, 
  ErrorEmptyState 
} from '../src/components/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: '🧩 Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 350, height: 400, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onActionPress: { action: 'action pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No flights logged yet',
    description: 'Start building your flight logbook by importing your existing flight data or adding new flights manually.',
    actionText: 'Import Prior Flight Data',
    icon: 'plane',
  },
};

export const FlightLogEmpty: Story = {
  render: () => <FlightLogEmptyState onImportPress={() => {}} />,
};

export const ReservationsEmpty: Story = {
  render: () => <ReservationsEmptyState onBookPress={() => {}} />,
};

export const LessonsEmpty: Story = {
  render: () => <LessonsEmptyState onSchedulePress={() => {}} />,
};

export const SearchEmpty: Story = {
  render: () => <SearchEmptyState />,
};

export const ErrorState: Story = {
  render: () => <ErrorEmptyState onRetryPress={() => {}} />,
};

export const CustomIcon: Story = {
  args: {
    title: 'No aircraft available',
    description: 'All aircraft are currently reserved. Check back later or book for a future date.',
    actionText: 'View Schedule',
    icon: 'helicopter',
    iconSize: 56,
  },
};

export const NoAction: Story = {
  args: {
    title: 'End of results',
    description: 'You have reached the end of your flight history.',
    icon: 'flag-checkered',
    variant: 'minimal',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { 
  TrainingProgressBar, 
  StatsGrid, 
  CareerMilestone, 
  TrainingProgress, 
  HoursBreakdown 
} from '../src/components/ProgressChart';

const meta: Meta<typeof TrainingProgressBar> = {
  title: '🧩 Components/ProgressChart',
  component: TrainingProgressBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350, backgroundColor: 'white' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const StudentTrainingProgress: Story = {
  render: () => (
    <TrainingProgress
      course="Private Pilot License"
      progress="65%"
      totalHours={26.3}
      lessonsCompleted={12}
      flightsLogged={18}
    />
  ),
};

export const PrivatePilotMilestone: Story = {
  render: () => (
    <CareerMilestone
      title="Private Pilot License"
      current={26.3}
      total={40}
      unit="hours"
      status="In Progress"
      statusColor="#D4511E"
    />
  ),
};

export const FlightHoursBreakdown: Story = {
  render: () => (
    <HoursBreakdown
      totalHours={26.3}
      soloHours={8.5}
      dualHours={17.8}
      picHours={8.5}
      crossCountryHours={4.2}
      nightHours={2.1}
      instrumentHours={3.5}
    />
  ),
};

export const SimpleProgressBar: Story = {
  render: () => (
    <TrainingProgressBar
      label="Lesson Progress"
      current={8}
      total={12}
      unit="lessons"
      showPercentage={true}
      showValues={true}
    />
  ),
};

export const StatsGridExample: Story = {
  render: () => (
    <StatsGrid
      stats={[
        { label: 'Total Hours', value: '26.3' },
        { label: 'Lessons Completed', value: 12 },
        { label: 'Flights Logged', value: 18 },
      ]}
      columns={3}
    />
  ),
};

export const CommercialPilotProgress: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <CareerMilestone
        title="Commercial Pilot License"
        current={87.5}
        total={250}
        unit="hours"
        status="35% Complete"
        statusColor="#D4511E"
      />
      
      <CareerMilestone
        title="Instrument Rating"
        current={35.2}
        total={40}
        unit="hours"
        status="88% Complete"
        statusColor="#008333"
      />
    </View>
  ),
};

export const InstructorHours: Story = {
  render: () => (
    <HoursBreakdown
      totalHours={156.7}
      soloHours={45.2}
      dualHours={89.5}
      picHours={67.0}
      crossCountryHours={23.4}
      nightHours={12.8}
      instrumentHours={18.3}
    />
  ),
};

export const CheckrideReadiness: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <TrainingProgressBar
        label="Checkride Requirements"
        sublabel="Private Pilot Prerequisites"
        current={38.5}
        total={40}
        unit="hours"
        status="96% Complete"
        statusColor="#008333"
        gradientColors={['#10b981', '#059669']}
      />
      
      <StatsGrid
        stats={[
          { label: 'Total Time', value: '38.5', color: '#059669' },
          { label: 'Solo Time', value: '12.3', color: '#059669' },
          { label: 'Cross Country', value: '8.7', color: '#059669' },
          { label: 'Night Time', value: '3.2', color: '#059669' },
        ]}
        columns={2}
      />
    </View>
  ),
};

export const BeginnerStudent: Story = {
  render: () => (
    <TrainingProgress
      course="Ground School & First Solo"
      progress="15%"
      totalHours={6.2}
      lessonsCompleted={4}
      flightsLogged={7}
    />
  ),
};

export const CustomColors: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <TrainingProgressBar
        label="Night Flying Hours"
        current={12.5}
        total={20}
        unit="hours"
        gradientColors={['#1e3a8a', '#3b82f6']}
        statusColor="#1e3a8a"
      />
      
      <TrainingProgressBar
        label="Instrument Training"
        current={28}
        total={40}
        unit="hours"
        gradientColors={['#7c3aed', '#a855f7']}
        statusColor="#7c3aed"
      />
    </View>
  ),
};

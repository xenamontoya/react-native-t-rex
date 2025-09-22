import type { Meta, StoryObj } from '@storybook/react';
import { View, Alert } from 'react-native';
import { FlightWeather } from '../src/components/FlightWeather';
import { AircraftCard, AircraftGrid, TrainingAircraft } from '../src/components/AircraftCard';
import { FlightRoute, TrainingRoutes } from '../src/components/FlightRoute';

const meta: Meta<typeof FlightWeather> = {
  title: '✈️ Aviation/FlightWeather',
  component: FlightWeather,
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

export const FlightWeatherExample: Story = {
  args: {
    from: 'KPAO',
    to: 'KLVK',
  },
};

export const CrossCountryWeather: Story = {
  args: {
    from: 'KSFO',
    to: 'KLAX',
  },
};

export const TrainingFlightWeather: Story = {
  args: {
    from: 'PAO',
    to: 'RHV',
  },
};

export const InternationalWeather: Story = {
  args: {
    from: 'KJFK',
    to: 'EGLL',
  },
};

// Aircraft Stories
export const AircraftCardStory: Story = {
  title: '✈️ Aviation/AircraftCard',
  render: () => (
    <AircraftCard
      aircraft={TrainingAircraft[0]}
      onPress={() => Alert.alert('Aircraft Selected', 'N1234P - Cessna 172S')}
    />
  ),
};

export const CompactAircraftCard: Story = {
  render: () => (
    <AircraftCard
      aircraft={TrainingAircraft[1]}
      compact
      onPress={() => Alert.alert('Aircraft Selected', 'N5678T - Cessna 152')}
    />
  ),
};

export const AircraftStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {TrainingAircraft.map((aircraft) => (
        <AircraftCard
          key={aircraft.id}
          aircraft={aircraft}
          compact
          onPress={() => Alert.alert('Aircraft', `${aircraft.registration} - ${aircraft.status}`)}
        />
      ))}
    </View>
  ),
};

export const AircraftGridStory: Story = {
  render: () => (
    <AircraftGrid
      aircraft={TrainingAircraft}
      onAircraftPress={(aircraft) => 
        Alert.alert('Aircraft Selected', `${aircraft.registration} - ${aircraft.type}`)
      }
      compact
      numColumns={2}
    />
  ),
};

// Flight Route Stories
export const FlightRouteStory: Story = {
  title: '✈️ Aviation/FlightRoute',
  render: () => (
    <FlightRoute
      from="KPAO"
      to="KLVK"
    />
  ),
};

export const PatternWork: Story = {
  render: () => (
    <FlightRoute
      from="KPAO"
      to="KPAO"
      flightType="pattern"
    />
  ),
};

export const CrossCountryRoute: Story = {
  render: () => (
    <FlightRoute
      from="KPAO"
      to="KSFO"
      flightType="cross-country"
    />
  ),
};

export const LocalTraining: Story = {
  render: () => (
    <FlightRoute
      from="KPAO"
      to="KSQL"
      flightType="local"
    />
  ),
};

export const TrainingRoutesStory: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {TrainingRoutes.map((route, index) => (
        <FlightRoute
          key={index}
          from={route.from}
          to={route.to}
          showDetails={false}
        />
      ))}
    </View>
  ),
};

export const CompactRoute: Story = {
  render: () => (
    <FlightRoute
      from="RHV"
      to="HWD"
      showDetails={false}
      style={{ marginVertical: 8 }}
    />
  ),
};

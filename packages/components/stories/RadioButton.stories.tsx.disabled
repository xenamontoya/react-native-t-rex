import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { RadioButton, RadioGroup, RadioOption } from '../src/components/RadioButton';

const fatigueOptions: RadioOption[] = [
  { 
    value: 'low', 
    label: 'Well-rested and alert', 
    description: 'I feel energetic and ready to fly' 
  },
  { 
    value: 'medium', 
    label: 'Slightly tired', 
    description: 'I could use more rest but feel capable' 
  },
  { 
    value: 'high', 
    label: 'Very fatigued', 
    description: 'I feel exhausted and should not fly' 
  },
];

const weatherOptions: RadioOption[] = [
  { 
    value: 'density-altitude', 
    label: 'Density Altitude Effects', 
    description: 'High humidity reduces air density, affecting aircraft performance and takeoff distance' 
  },
  { 
    value: 'engine-performance', 
    label: 'Engine Performance', 
    description: 'Humid air can reduce engine power output and increase fuel consumption' 
  },
  { 
    value: 'weather-changes', 
    label: 'Potential Weather Changes', 
    description: 'High humidity may indicate approaching weather systems or precipitation' 
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: '🧩 Components/RadioButton',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FatigueAssessment: Story = {
  render: () => {
    const [fatigue, setFatigue] = useState('');
    
    return (
      <RadioGroup
        label="How are you feeling regarding fatigue?"
        options={fatigueOptions}
        value={fatigue}
        onValueChange={setFatigue}
      />
    );
  },
};

export const WeatherConsiderations: Story = {
  render: () => {
    const [consideration, setConsideration] = useState('density-altitude');
    
    return (
      <RadioGroup
        label="What should you consider when flying in high humidity?"
        options={weatherOptions}
        value={consideration}
        onValueChange={setConsideration}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState('option1');
    const [medium, setMedium] = useState('option2');
    const [large, setLarge] = useState('option1');

    const sizeOptions = [
      { value: 'option1', label: 'Option 1', description: 'First choice' },
      { value: 'option2', label: 'Option 2', description: 'Second choice' },
    ];

    return (
      <View style={{ gap: 24 }}>
        <RadioGroup
          label="Small Size"
          options={sizeOptions}
          value={small}
          onValueChange={setSmall}
          size="small"
        />
        <RadioGroup
          label="Medium Size"
          options={sizeOptions}
          value={medium}
          onValueChange={setMedium}
          size="medium"
        />
        <RadioGroup
          label="Large Size"
          options={sizeOptions}
          value={large}
          onValueChange={setLarge}
          size="large"
        />
      </View>
    );
  },
};

export const DisabledStates: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    const disabledOptions = [
      { value: 'option1', label: 'Available Option', description: 'This option is selectable' },
      { value: 'option2', label: 'Disabled Option', description: 'This option is disabled', disabled: true },
      { value: 'option3', label: 'Another Option', description: 'This option is also selectable' },
    ];

    return (
      <View style={{ gap: 24 }}>
        <RadioGroup
          label="Mixed States"
          options={disabledOptions}
          value={value}
          onValueChange={setValue}
        />
        
        <RadioGroup
          label="Entirely Disabled Group"
          options={fatigueOptions}
          value=""
          onValueChange={() => {}}
          disabled
        />
      </View>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tooltip, HoursTooltip, HelpTooltip } from '../src/components/Tooltip';
import { Button } from '../src/components/Button';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../src/design-system';

const meta: Meta<typeof Tooltip> = {
  title: '🧩 Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ 
        padding: 40, 
        width: 350, 
        height: 300, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5' 
      }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTooltip: Story = {
  render: () => (
    <Tooltip content="This is a helpful tooltip that provides additional information about this button." trigger="press">
      <Button title="Press for Help" onPress={() => {}} />
    </Tooltip>
  ),
};

export const LongPressTooltip: Story = {
  render: () => (
    <Tooltip 
      content="Long press to see this tooltip appear with detailed information." 
      trigger="longPress"
      position="top"
    >
      <TouchableOpacity style={{ 
        backgroundColor: Colors.secondary.electricBlue, 
        padding: 16, 
        borderRadius: 8 
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Long Press Me
        </Text>
      </TouchableOpacity>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <View style={{ 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      gap: 20, 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="Tooltip on top" position="top" trigger="press">
        <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 4 }}>
          <Text>Top</Text>
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip content="Tooltip on bottom" position="bottom" trigger="press">
        <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 4 }}>
          <Text>Bottom</Text>
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip content="Tooltip on left" position="left" trigger="press">
        <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 4 }}>
          <Text>Left</Text>
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip content="Tooltip on right" position="right" trigger="press">
        <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 4 }}>
          <Text>Right</Text>
        </TouchableOpacity>
      </Tooltip>
    </View>
  ),
};

export const HoursDisplay: Story = {
  render: () => (
    <HoursTooltip 
      totalHours={125.5} 
      soloHours={45.2} 
      dualHours={80.3} 
      picHours={30.0}
    >
      <TouchableOpacity style={{ 
        backgroundColor: Colors.neutral.white, 
        padding: 16, 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.neutral.gray200,
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.primary.black }}>
          125.5
        </Text>
        <Text style={{ fontSize: 14, color: Colors.neutral.gray600 }}>
          Total Hours
        </Text>
      </TouchableOpacity>
    </HoursTooltip>
  ),
};

export const HelpIcon: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 16, color: Colors.primary.black }}>
        Complex Setting
      </Text>
      <HelpTooltip content="This setting controls the advanced flight planning algorithm. When enabled, the system will automatically calculate optimal routes based on weather, airspace, and fuel considerations." />
    </View>
  ),
};

export const ContactActions: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Tooltip content="Call Instructor" trigger="press">
        <TouchableOpacity style={{ 
          backgroundColor: Colors.accent.success, 
          padding: 12, 
          borderRadius: 8 
        }}>
          <FontAwesome6 name="phone" size={16} color="white" />
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip content="Email Instructor" trigger="press">
        <TouchableOpacity style={{ 
          backgroundColor: Colors.secondary.electricBlue, 
          padding: 12, 
          borderRadius: 8 
        }}>
          <FontAwesome6 name="envelope" size={16} color="white" />
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip content="Text Instructor" trigger="press">
        <TouchableOpacity style={{ 
          backgroundColor: Colors.secondary.orange3, 
          padding: 12, 
          borderRadius: 8 
        }}>
          <FontAwesome6 name="message" size={16} color="white" />
        </TouchableOpacity>
      </Tooltip>
    </View>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Tooltip 
      content="This is a custom styled tooltip with a different background and text color."
      backgroundColor={Colors.secondary.orange3}
      textColor={Colors.neutral.white}
      trigger="press"
      maxWidth={200}
    >
      <TouchableOpacity style={{ 
        backgroundColor: Colors.secondary.orange3, 
        padding: 16, 
        borderRadius: 8 
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Custom Tooltip
        </Text>
      </TouchableOpacity>
    </Tooltip>
  ),
};

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { AdaptiveAIModal } from './index';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof AdaptiveAIModal> = {
  title: 'Modals/AdaptiveAIModal',
  component: AdaptiveAIModal,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['insights', 'preparation', 'career'],
    },
    tabletLayout: {
      control: { type: 'select' },
      options: ['fullScreen', 'largeModal'],
    },
    lessonTitle: {
      control: { type: 'text' },
    },
  },
  args: {
    lessonTitle: 'Private Pilot - Solo Flight',
    mode: 'insights',
    tabletLayout: 'fullScreen',
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Story with Toggle
const AdaptiveAIModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Wingman AI Assistant</Text>
      <Text style={styles.demoDescription}>
        Adaptive AI chat interface that provides personalized flight training assistance. 
        Shows as bottom sheet on mobile and full-screen modal on tablets.
      </Text>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Chat with Wingman AI</Text>
      </TouchableOpacity>

      <View style={styles.modeInfo}>
        <Text style={styles.modeLabel}>Current Mode:</Text>
        <Text style={styles.modeValue}>{props.mode}</Text>
      </View>

      <AdaptiveAIModal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
};

export const InsightsMode: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
  args: {
    mode: 'insights',
    lessonTitle: 'Cross-Country Navigation',
  },
};

export const PreparationMode: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
  args: {
    mode: 'preparation',
    lessonTitle: 'Instrument Flight Rules (IFR)',
  },
};

export const CareerMode: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
  args: {
    mode: 'career',
    lessonTitle: 'Commercial Pilot Career Path',
  },
};

export const TabletLargeModal: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
  args: {
    mode: 'insights',
    tabletLayout: 'largeModal',
    lessonTitle: 'Emergency Procedures',
  },
};

export const CheckridePreparation: Story = {
  render: (args) => <AdaptiveAIModalDemo {...args} />,
  args: {
    mode: 'preparation',
    lessonTitle: 'Private Pilot Checkride',
    tabletLayout: 'fullScreen',
  },
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  demoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  demoTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
  },
  demoDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  triggerButton: {
    backgroundColor: Colors.brand.blueAzure,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  triggerButtonText: {
    color: Colors.primary.white,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
  },
  modeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  modeValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.brand.blueAzure,
    textTransform: 'capitalize',
  },
});

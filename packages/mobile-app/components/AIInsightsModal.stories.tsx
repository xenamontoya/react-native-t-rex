import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import AIInsightsModal from './AIInsightsModal';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof AIInsightsModal> = {
  title: 'Legacy/AIInsightsModal',
  component: AIInsightsModal,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['insights', 'preparation', 'career'],
    },
    lessonTitle: {
      control: { type: 'text' },
    },
  },
  args: {
    lessonTitle: 'Private Pilot - Solo Flight',
    mode: 'insights',
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
const AIInsightsModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <View style={styles.deprecationBanner}>
        <Text style={styles.deprecationText}>⚠️ DEPRECATED</Text>
        <Text style={styles.deprecationDescription}>
          This component has been replaced by AdaptiveAIModal. Use AdaptiveAIModal for new implementations.
        </Text>
      </View>

      <Text style={styles.demoTitle}>Legacy AI Insights Modal</Text>
      <Text style={styles.demoDescription}>
        Original AI chat interface component. This version only supports bottom sheet layout.
        For adaptive tablet support, use AdaptiveAIModal instead.
      </Text>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Legacy AI Modal</Text>
      </TouchableOpacity>

      <View style={styles.modeInfo}>
        <Text style={styles.modeLabel}>Current Mode:</Text>
        <Text style={styles.modeValue}>{props.mode}</Text>
      </View>

      <AIInsightsModal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <AIInsightsModalDemo {...args} />,
};

export const InsightsMode: Story = {
  render: (args) => <AIInsightsModalDemo {...args} />,
  args: {
    mode: 'insights',
    lessonTitle: 'Cross-Country Navigation',
  },
};

export const PreparationMode: Story = {
  render: (args) => <AIInsightsModalDemo {...args} />,
  args: {
    mode: 'preparation',
    lessonTitle: 'Instrument Flight Rules (IFR)',
  },
};

export const CareerMode: Story = {
  render: (args) => <AIInsightsModalDemo {...args} />,
  args: {
    mode: 'career',
    lessonTitle: 'Commercial Pilot Career Path',
  },
};

export const ComparisonWithAdaptive: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <Text style={styles.comparisonTitle}>Legacy vs Adaptive AI Modal</Text>
      
      <View style={styles.comparisonGrid}>
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonHeader}>Legacy AIInsightsModal</Text>
          <Text style={styles.comparisonFeature}>• Bottom sheet only</Text>
          <Text style={styles.comparisonFeature}>• Fixed snap points</Text>
          <Text style={styles.comparisonFeature}>• No tablet optimization</Text>
          <Text style={styles.comparisonFeature}>• Limited responsive design</Text>
        </View>
        
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonHeader}>New AdaptiveAIModal</Text>
          <Text style={styles.comparisonFeature}>• Adaptive layout</Text>
          <Text style={styles.comparisonFeature}>• Full-screen on tablets</Text>
          <Text style={styles.comparisonFeature}>• Better chat UX</Text>
          <Text style={styles.comparisonFeature}>• Responsive design</Text>
        </View>
      </View>

      <View style={styles.migrationNote}>
        <Text style={styles.migrationTitle}>Migration Guide:</Text>
        <Text style={styles.migrationText}>
          Replace `AIInsightsModal` imports with `AdaptiveAIModal` and add the `tabletLayout="fullScreen"` prop for optimal tablet experience.
        </Text>
      </View>
    </View>
  ),
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
  deprecationBanner: {
    backgroundColor: Colors.status.warning + '20',
    borderColor: Colors.status.warning,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  deprecationText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.status.warning,
  },
  deprecationDescription: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginTop: 4,
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
    backgroundColor: Colors.neutral.gray600,
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
    color: Colors.neutral.gray800,
    textTransform: 'capitalize',
  },
  comparisonTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: 16,
    maxWidth: 500,
  },
  comparisonItem: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  comparisonHeader: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  comparisonFeature: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
  migrationNote: {
    backgroundColor: Colors.brand.blueAzure + '10',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  migrationTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  migrationText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 18,
  },
});

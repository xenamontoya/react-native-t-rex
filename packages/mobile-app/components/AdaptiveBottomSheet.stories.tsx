import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { AdaptiveBottomSheet } from './index';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof AdaptiveBottomSheet> = {
  title: 'Modals/AdaptiveBottomSheet',
  component: AdaptiveBottomSheet,
  argTypes: {
    snapPoints: {
      control: { type: 'object' },
    },
    enablePanGesture: {
      control: { type: 'boolean' },
    },
    showHandle: {
      control: { type: 'boolean' },
    },
    tabletLayout: {
      control: { type: 'select' },
      options: ['centeredModal', 'fullScreen'],
    },
  },
  args: {
    title: 'Sample Bottom Sheet',
    snapPoints: [0.6],
    initialSnapPoint: 0,
    enablePanGesture: true,
    showHandle: true,
    tabletLayout: 'centeredModal',
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

// Sample Content Component
const SampleContent = ({ title = "Sample Content" }: { title?: string }) => (
  <View style={styles.sampleContent}>
    <Text style={styles.contentTitle}>{title}</Text>
    <Text style={styles.contentText}>
      This is sample content inside the adaptive bottom sheet. On mobile devices, this appears as a bottom sheet that slides up from the bottom. On tablets, it appears as a centered modal for better user experience.
    </Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.primaryButton} onPress={action('primary-action')}>
        <Text style={styles.primaryButtonText}>Primary Action</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={action('secondary-action')}>
        <Text style={styles.secondaryButtonText}>Secondary Action</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Interactive Story with Toggle
const AdaptiveBottomSheetDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <AdaptiveBottomSheet
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SampleContent />
      </AdaptiveBottomSheet>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
};

export const SmallSheet: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
  args: {
    title: 'Small Bottom Sheet',
    snapPoints: [0.4],
  },
};

export const LargeSheet: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
  args: {
    title: 'Large Bottom Sheet',
    snapPoints: [0.9],
  },
};

export const MultipleSnapPoints: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
  args: {
    title: 'Multi-Snap Bottom Sheet',
    snapPoints: [0.3, 0.6, 0.9],
    initialSnapPoint: 1, // Start at middle snap point
  },
};

export const NoHandle: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
  args: {
    title: 'No Handle Sheet',
    showHandle: false,
    enablePanGesture: false,
  },
};

export const TabletFullScreen: Story = {
  render: (args) => <AdaptiveBottomSheetDemo {...args} />,
  args: {
    title: 'Tablet Full Screen',
    tabletLayout: 'fullScreen',
    snapPoints: [0.8],
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
  },
  triggerButton: {
    backgroundColor: Colors.brand.blueAzure,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  triggerButtonText: {
    color: Colors.primary.white,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
  sampleContent: {
    padding: 20,
    gap: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.brand.blueAzure,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.primary.white,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.neutral.gray700,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
});

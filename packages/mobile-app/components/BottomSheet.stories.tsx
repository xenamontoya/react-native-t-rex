import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BottomSheet from './BottomSheet';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof BottomSheet> = {
  title: 'Base/BottomSheet',
  component: BottomSheet,
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
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
  args: {
    title: 'Base Bottom Sheet',
    snapPoints: [0.6],
    initialSnapPoint: 0,
    enablePanGesture: true,
    showHandle: true,
    showCloseButton: true,
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

const SampleContent = () => (
  <View style={styles.content}>
    <Text style={styles.title}>Base Bottom Sheet</Text>
    <Text style={styles.description}>
      This is the foundational bottom sheet component used throughout the app. 
      It provides swipe gestures, multiple snap points, and safe area handling.
    </Text>
    <TouchableOpacity style={styles.button} onPress={action('button-pressed')}>
      <Text style={styles.buttonText}>Sample Action</Text>
    </TouchableOpacity>
  </View>
);

const BottomSheetDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <BottomSheet
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SampleContent />
      </BottomSheet>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
};

export const SmallSheet: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: {
    snapPoints: [0.3],
    title: 'Small Sheet',
  },
};

export const LargeSheet: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: {
    snapPoints: [0.9],
    title: 'Large Sheet',
  },
};

export const MultiSnapPoints: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: {
    snapPoints: [0.3, 0.6, 0.9],
    initialSnapPoint: 1,
    title: 'Multi-Snap Sheet',
  },
};

export const NoGestures: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: {
    enablePanGesture: false,
    showHandle: false,
    title: 'Fixed Sheet',
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
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  description: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.brand.blueAzure,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary.white,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
});

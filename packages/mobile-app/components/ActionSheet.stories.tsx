import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ActionSheet, { ActionSheetProvider, showActionSheet } from './ActionSheet';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof ActionSheet> = {
  title: 'UI/ActionSheet',
  component: ActionSheet,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    destructive: {
      control: { type: 'boolean' },
    },
  },
  args: {
    title: 'Choose an Option',
    destructive: false,
  },
  decorators: [
    (Story) => (
      <ActionSheetProvider>
        <View style={styles.decorator}>
          <Story />
        </View>
      </ActionSheetProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ActionSheetDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const sampleOptions = [
    { label: 'Edit', onPress: action('edit-pressed') },
    { label: 'Share', onPress: action('share-pressed') },
    { label: 'Duplicate', onPress: action('duplicate-pressed') },
    { label: 'Delete', onPress: action('delete-pressed'), destructive: true },
  ];

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>ActionSheet Component</Text>
      <Text style={styles.demoDescription}>
        Native-style action sheet for contextual actions. Slides up from bottom on mobile.
      </Text>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Show Action Sheet</Text>
      </TouchableOpacity>

      <ActionSheet
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={sampleOptions}
      />
    </View>
  );
};

const GlobalActionSheetDemo = () => {
  const handleShowGlobal = () => {
    showActionSheet({
      title: 'Global Action Sheet',
      options: [
        { label: 'Option 1', onPress: action('global-option-1') },
        { label: 'Option 2', onPress: action('global-option-2') },
        { label: 'Destructive Action', onPress: action('global-destructive'), destructive: true },
      ],
    });
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Global ActionSheet</Text>
      <Text style={styles.demoDescription}>
        Use the global showActionSheet helper for quick access anywhere in the app.
      </Text>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={handleShowGlobal}
      >
        <Text style={styles.triggerButtonText}>Show Global Action Sheet</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ActionSheetDemo {...args} />,
};

export const WithoutTitle: Story = {
  render: (args) => <ActionSheetDemo {...args} />,
  args: {
    title: undefined,
  },
};

export const DestructiveAction: Story = {
  render: (args) => <ActionSheetDemo {...args} />,
  args: {
    title: 'Confirm Action',
    destructive: true,
  },
};

export const SimpleOptions: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const simpleOptions = [
      { label: 'Camera', onPress: action('camera') },
      { label: 'Photo Library', onPress: action('library') },
    ];

    return (
      <View style={styles.demoContainer}>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Add Photo</Text>
        </TouchableOpacity>

        <ActionSheet
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          options={simpleOptions}
        />
      </View>
    );
  },
  args: {
    title: 'Add Photo',
  },
};

export const GlobalActionSheet: Story = {
  render: () => <GlobalActionSheetDemo />,
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
    fontSize: 20,
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
    maxWidth: 280,
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
});

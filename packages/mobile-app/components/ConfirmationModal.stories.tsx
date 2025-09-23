import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ConfirmationModal, { ConfirmationModalProvider, showConfirmationModal, showDeleteConfirmation, showSaveConfirmation } from './ConfirmationModal';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof ConfirmationModal> = {
  title: 'UI/ConfirmationModal',
  component: ConfirmationModal,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    message: {
      control: { type: 'text' },
    },
    confirmText: {
      control: { type: 'text' },
    },
    cancelText: {
      control: { type: 'text' },
    },
    destructive: {
      control: { type: 'boolean' },
    },
  },
  args: {
    title: 'Confirm Action',
    message: 'Are you sure you want to continue?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    destructive: false,
  },
  decorators: [
    (Story) => (
      <ConfirmationModalProvider>
        <View style={styles.decorator}>
          <Story />
        </View>
      </ConfirmationModalProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ConfirmationModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Confirmation Modal</Text>
      <Text style={styles.demoDescription}>
        Modal dialog for confirming important actions. Overlays the screen with a backdrop.
      </Text>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Show Confirmation</Text>
      </TouchableOpacity>

      <ConfirmationModal
        {...props}
        isVisible={isOpen}
        onConfirm={() => {
          action('confirmed')();
          setIsOpen(false);
        }}
        onCancel={() => {
          action('cancelled')();
          setIsOpen(false);
        }}
      />
    </View>
  );
};

const GlobalConfirmationDemo = () => {
  const handleShowGlobal = () => {
    showConfirmationModal({
      title: 'Global Confirmation',
      message: 'This uses the global confirmation helper.',
      confirmText: 'Yes, Continue',
      cancelText: 'No, Cancel',
      onConfirm: action('global-confirmed'),
      onCancel: action('global-cancelled'),
    });
  };

  const handleShowDelete = () => {
    showDeleteConfirmation({
      title: 'Delete Flight',
      message: 'This action cannot be undone. The flight will be permanently removed from your logbook.',
      onConfirm: action('delete-confirmed'),
      onCancel: action('delete-cancelled'),
    });
  };

  const handleShowSave = () => {
    showSaveConfirmation({
      title: 'Save Changes',
      message: 'You have unsaved changes. Would you like to save before continuing?',
      onConfirm: action('save-confirmed'),
      onCancel: action('save-cancelled'),
    });
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Global Confirmations</Text>
      <Text style={styles.demoDescription}>
        Pre-configured helpers for common confirmation patterns.
      </Text>
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={handleShowGlobal}
        >
          <Text style={styles.triggerButtonText}>Generic Confirmation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.triggerButton, styles.destructiveButton]}
          onPress={handleShowDelete}
        >
          <Text style={styles.triggerButtonText}>Delete Confirmation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.triggerButton, styles.saveButton]}
          onPress={handleShowSave}
        >
          <Text style={styles.triggerButtonText}>Save Confirmation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ConfirmationModalDemo {...args} />,
};

export const DestructiveAction: Story = {
  render: (args) => <ConfirmationModalDemo {...args} />,
  args: {
    title: 'Delete Item',
    message: 'This action cannot be undone. Are you sure you want to delete this item?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    destructive: true,
  },
};

export const SaveConfirmation: Story = {
  render: (args) => <ConfirmationModalDemo {...args} />,
  args: {
    title: 'Save Changes',
    message: 'You have unsaved changes. Would you like to save before leaving?',
    confirmText: 'Save',
    cancelText: 'Discard',
    destructive: false,
  },
};

export const LongMessage: Story = {
  render: (args) => <ConfirmationModalDemo {...args} />,
  args: {
    title: 'Important Notice',
    message: 'This is a longer message that explains the consequences of the action in more detail. It should wrap properly and remain readable on different screen sizes.',
    confirmText: 'I Understand',
    cancelText: 'Cancel',
  },
};

export const GlobalHelpers: Story = {
  render: () => <GlobalConfirmationDemo />,
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
    minWidth: 200,
    alignItems: 'center',
  },
  triggerButtonText: {
    color: Colors.primary.white,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
  destructiveButton: {
    backgroundColor: Colors.status.error,
  },
  saveButton: {
    backgroundColor: Colors.status.success,
  },
  buttonGroup: {
    gap: 12,
    alignItems: 'stretch',
  },
});

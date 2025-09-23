import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import SuccessToast, { ToastProvider, showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from './SuccessToast';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof SuccessToast> = {
  title: 'UI/Toast',
  component: SuccessToast,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    title: {
      control: { type: 'text' },
    },
    message: {
      control: { type: 'text' },
    },
    duration: {
      control: { type: 'number' },
    },
  },
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully.',
    duration: 3000,
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <View style={styles.decorator}>
          <Story />
        </View>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = () => {
  const handleShowSuccess = () => {
    showSuccessToast({
      title: 'Flight Saved',
      message: 'Your flight has been added to your logbook.',
    });
    action('success-toast-shown')();
  };

  const handleShowError = () => {
    showErrorToast({
      title: 'Upload Failed',
      message: 'Unable to upload file. Please check your connection and try again.',
    });
    action('error-toast-shown')();
  };

  const handleShowWarning = () => {
    showWarningToast({
      title: 'Low Fuel Warning',
      message: 'Fuel level is below minimum reserves for this flight.',
    });
    action('warning-toast-shown')();
  };

  const handleShowInfo = () => {
    showInfoToast({
      title: 'Weather Update',
      message: 'Winds have changed at your destination airport.',
    });
    action('info-toast-shown')();
  };

  const handleShowLongMessage = () => {
    showSuccessToast({
      title: 'Import Complete',
      message: 'Successfully imported 25 flights from ForeFlight. All flight times and aircraft information have been preserved and added to your digital logbook.',
    });
    action('long-message-toast-shown')();
  };

  const handleShowNoTitle = () => {
    showInfoToast({
      message: 'This toast has no title, just a message.',
    });
    action('no-title-toast-shown')();
  };

  const handleShowCustomDuration = () => {
    showWarningToast({
      title: 'Custom Duration',
      message: 'This toast will stay visible for 8 seconds.',
      duration: 8000,
    });
    action('custom-duration-toast-shown')();
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Toast Notifications</Text>
      <Text style={styles.demoDescription}>
        Non-blocking feedback messages that appear at the top of the screen. 
        They automatically dismiss after a few seconds.
      </Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.toastButton, styles.successButton]}
          onPress={handleShowSuccess}
        >
          <Text style={styles.buttonText}>Success Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.errorButton]}
          onPress={handleShowError}
        >
          <Text style={styles.buttonText}>Error Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.warningButton]}
          onPress={handleShowWarning}
        >
          <Text style={styles.buttonText}>Warning Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.infoButton]}
          onPress={handleShowInfo}
        >
          <Text style={styles.buttonText}>Info Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.neutralButton]}
          onPress={handleShowLongMessage}
        >
          <Text style={styles.buttonText}>Long Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.neutralButton]}
          onPress={handleShowNoTitle}
        >
          <Text style={styles.buttonText}>No Title</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toastButton, styles.neutralButton]}
          onPress={handleShowCustomDuration}
        >
          <Text style={styles.buttonText}>Custom Duration</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        💡 Tip: Toasts appear at the top of the screen and stack if multiple are shown.
      </Text>
    </View>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const SuccessExample: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={[styles.toastButton, styles.successButton]}
        onPress={() => showSuccessToast({
          title: 'Success!',
          message: 'Operation completed successfully.',
        })}
      >
        <Text style={styles.buttonText}>Show Success Toast</Text>
      </TouchableOpacity>
    </View>
  ),
};

export const ErrorExample: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={[styles.toastButton, styles.errorButton]}
        onPress={() => showErrorToast({
          title: 'Error!',
          message: 'Something went wrong. Please try again.',
        })}
      >
        <Text style={styles.buttonText}>Show Error Toast</Text>
      </TouchableOpacity>
    </View>
  ),
};

export const WarningExample: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={[styles.toastButton, styles.warningButton]}
        onPress={() => showWarningToast({
          title: 'Warning!',
          message: 'Please review this information carefully.',
        })}
      >
        <Text style={styles.buttonText}>Show Warning Toast</Text>
      </TouchableOpacity>
    </View>
  ),
};

export const InfoExample: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <TouchableOpacity
        style={[styles.toastButton, styles.infoButton]}
        onPress={() => showInfoToast({
          title: 'Info',
          message: 'Here is some helpful information.',
        })}
      >
        <Text style={styles.buttonText}>Show Info Toast</Text>
      </TouchableOpacity>
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
    gap: 20,
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
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    maxWidth: 300,
  },
  toastButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary.white,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
  successButton: {
    backgroundColor: Colors.status.success,
  },
  errorButton: {
    backgroundColor: Colors.status.error,
  },
  warningButton: {
    backgroundColor: Colors.status.warning,
  },
  infoButton: {
    backgroundColor: Colors.brand.blueAzure,
  },
  neutralButton: {
    backgroundColor: Colors.neutral.gray600,
  },
  note: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

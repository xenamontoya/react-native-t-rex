import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import NewReservationContent from './NewReservationContent';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof NewReservationContent> = {
  title: 'Forms/NewReservationContent',
  component: NewReservationContent,
  argTypes: {
    showBackButton: {
      control: { type: 'boolean' },
    },
  },
  args: {
    showBackButton: true,
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

const NewReservationContentDemo = (props: any) => {
  return (
    <View style={styles.demoContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reservation Form Component</Text>
        <Text style={styles.headerDescription}>
          Multi-step form component for creating new flight reservations. 
          Can be used standalone or within modals.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <NewReservationContent
          {...props}
          onClose={() => action('form-closed')()}
          onComplete={(data) => action('form-completed')(data)}
        />
      </View>
    </View>
  );
};

const StandaloneDemo = () => {
  return (
    <ScrollView style={styles.standaloneContainer} contentContainerStyle={styles.standaloneContent}>
      <Text style={styles.standaloneTitle}>Standalone Form Usage</Text>
      <Text style={styles.standaloneDescription}>
        This demonstrates how the NewReservationContent component appears when used directly in a screen 
        rather than within a modal wrapper.
      </Text>
      
      <View style={styles.featuresBox}>
        <Text style={styles.featuresTitle}>Form Features:</Text>
        <Text style={styles.featureItem}>• Step-by-step wizard interface</Text>
        <Text style={styles.featureItem}>• Form validation and error handling</Text>
        <Text style={styles.featureItem}>• Student and instructor selection</Text>
        <Text style={styles.featureItem}>• Aircraft type and availability</Text>
        <Text style={styles.featureItem}>• Date and time scheduling</Text>
        <Text style={styles.featureItem}>• Notes and special requests</Text>
      </View>

      <NewReservationContent
        showBackButton={false}
        onClose={() => action('standalone-closed')()}
        onComplete={(data) => action('standalone-completed')(data)}
      />
    </ScrollView>
  );
};

const FormStepsDemo = () => {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.stepsTitle}>Form Flow Overview</Text>
      
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Activity Details</Text>
            <Text style={styles.stepDescription}>Student selection, activity type, and instructor assignment</Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Aircraft & Schedule</Text>
            <Text style={styles.stepDescription}>Aircraft selection, date/time picker, and availability check</Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Confirm</Text>
            <Text style={styles.stepDescription}>Summary review, notes, and final confirmation</Text>
          </View>
        </View>
      </View>

      <View style={styles.formPreview}>
        <NewReservationContent
          showBackButton={true}
          onClose={() => action('steps-demo-closed')()}
          onComplete={(data) => action('steps-demo-completed')(data)}
        />
      </View>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <NewReservationContentDemo {...args} />,
};

export const WithBackButton: Story = {
  render: (args) => <NewReservationContentDemo {...args} />,
  args: {
    showBackButton: true,
  },
};

export const WithoutBackButton: Story = {
  render: (args) => <NewReservationContentDemo {...args} />,
  args: {
    showBackButton: false,
  },
};

export const StandaloneForm: Story = {
  render: () => <StandaloneDemo />,
};

export const FormSteps: Story = {
  render: () => <FormStepsDemo />,
};

export const ResponsiveLayout: Story = {
  render: () => (
    <View style={styles.demoContainer}>
      <Text style={styles.responsiveTitle}>Responsive Form Layout</Text>
      <Text style={styles.responsiveDescription}>
        The form automatically adapts to different screen sizes and orientations. 
        Form fields stack vertically on narrow screens and use optimized layouts on tablets.
      </Text>
      
      <View style={styles.responsiveDemo}>
        <NewReservationContent
          showBackButton={false}
          onClose={() => action('responsive-closed')()}
          onComplete={(data) => action('responsive-completed')(data)}
        />
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
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
  },
  standaloneContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  standaloneContent: {
    padding: 20,
  },
  standaloneTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  standaloneDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresBox: {
    backgroundColor: Colors.neutral.gray100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 18,
    marginBottom: 4,
  },
  stepsTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: Colors.brand.blueAzure,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 18,
  },
  formPreview: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
  },
  responsiveTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 12,
  },
  responsiveDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  responsiveDemo: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
  },
});

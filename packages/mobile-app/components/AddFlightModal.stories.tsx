import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import AddFlightModal from './AddFlightModal';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof AddFlightModal> = {
  title: 'Features/AddFlightModal',
  component: AddFlightModal,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isOpen: false,
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

const AddFlightModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Add Flight Modal</Text>
      <Text style={styles.demoDescription}>
        Multi-step modal for searching and adding flights to the logbook. 
        Supports flight number and tail number searches with route visualization.
      </Text>
      
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>✈️ Flight search by number or tail</Text>
        <Text style={styles.featureItem}>🗺️ Route visualization with airports</Text>
        <Text style={styles.featureItem}>📊 Flight details and aircraft info</Text>
        <Text style={styles.featureItem}>📝 Direct logbook integration</Text>
        <Text style={styles.featureItem}>🔄 Error handling and retry logic</Text>
      </View>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Add Flight Modal</Text>
      </TouchableOpacity>

      <AddFlightModal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          action('modal-closed')();
        }}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <AddFlightModalDemo {...args} />,
};

export const OpenedModal: Story = {
  render: (args) => <AddFlightModalDemo {...args} />,
  args: {
    isOpen: true,
  },
};

export const FlightSearchWorkflow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Flight Search Workflow</Text>
        <Text style={styles.demoDescription}>
          Try searching for real flight numbers to see the complete workflow:
        </Text>
        
        <View style={styles.exampleList}>
          <Text style={styles.exampleItem}>🔹 "UA123" - United Airlines flight</Text>
          <Text style={styles.exampleItem}>🔹 "N12345" - Aircraft tail number</Text>
          <Text style={styles.exampleItem}>🔹 "AA100" - American Airlines flight</Text>
        </View>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Try Flight Search</Text>
        </TouchableOpacity>

        <AddFlightModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </View>
    );
  },
};

export const MobileExperience: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Mobile Experience</Text>
        <Text style={styles.demoDescription}>
          On mobile devices, this appears as a bottom sheet with swipe gestures. 
          On tablets, it displays as a centered modal.
        </Text>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Test Mobile Modal</Text>
        </TouchableOpacity>

        <AddFlightModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </View>
    );
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
    maxWidth: 320,
  },
  featureList: {
    gap: 8,
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 18,
  },
  exampleList: {
    gap: 6,
    alignItems: 'flex-start',
    backgroundColor: Colors.neutral.gray100,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  exampleItem: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
  triggerButton: {
    backgroundColor: Colors.brand.blueAzure,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  triggerButtonText: {
    color: Colors.primary.white,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
});

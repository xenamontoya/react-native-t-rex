import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ImportLogbookModal from './ImportLogbookModal';
import { Colors, Typography } from '../../components/src';

const meta: Meta<typeof ImportLogbookModal> = {
  title: 'Features/ImportLogbookModal',
  component: ImportLogbookModal,
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

const ImportLogbookModalDemo = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImportComplete = (flights: any[]) => {
    action('import-completed')(flights);
    setIsOpen(false);
  };

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>Import Logbook Modal</Text>
      <Text style={styles.demoDescription}>
        Multi-step wizard for importing flight data from various logbook systems. 
        Supports file upload, data mapping, and flight selection.
      </Text>
      
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>📁 Multiple logbook format support</Text>
        <Text style={styles.featureItem}>📤 File upload with validation</Text>
        <Text style={styles.featureItem}>🔄 Automatic data processing</Text>
        <Text style={styles.featureItem}>🗂️ Field mapping and review</Text>
        <Text style={styles.featureItem}>✅ Flight selection and import</Text>
      </View>

      <View style={styles.supportedFormats}>
        <Text style={styles.formatsTitle}>Supported Formats:</Text>
        <Text style={styles.formatItem}>• ForeFlight (.csv)</Text>
        <Text style={styles.formatItem}>• LogTen Pro (.csv)</Text>
        <Text style={styles.formatItem}>• MyFlightbook (.csv)</Text>
        <Text style={styles.formatItem}>• Garmin Pilot (.xlsx)</Text>
        <Text style={styles.formatItem}>• Paper Logbook (Manual)</Text>
      </View>
      
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerButtonText}>Open Import Wizard</Text>
      </TouchableOpacity>

      <ImportLogbookModal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          action('modal-closed')();
        }}
        onImportComplete={handleImportComplete}
      />
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ImportLogbookModalDemo {...args} />,
};

export const OpenedModal: Story = {
  render: (args) => <ImportLogbookModalDemo {...args} />,
  args: {
    isOpen: true,
  },
};

export const ImportWorkflow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Import Workflow Demo</Text>
        <Text style={styles.demoDescription}>
          Experience the complete 5-step import process from source selection to final review.
        </Text>
        
        <View style={styles.workflowSteps}>
          <Text style={styles.stepItem}>1️⃣ Select Logbook Source</Text>
          <Text style={styles.stepItem}>2️⃣ Upload File</Text>
          <Text style={styles.stepItem}>3️⃣ Process Data</Text>
          <Text style={styles.stepItem}>4️⃣ Map Fields</Text>
          <Text style={styles.stepItem}>5️⃣ Review & Import</Text>
        </View>
        
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.triggerButtonText}>Start Import Process</Text>
        </TouchableOpacity>

        <ImportLogbookModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onImportComplete={(flights) => {
            action('workflow-completed')(flights);
          }}
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
  supportedFormats: {
    backgroundColor: Colors.neutral.gray100,
    padding: 16,
    borderRadius: 8,
    gap: 6,
  },
  formatsTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginBottom: 4,
  },
  formatItem: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 16,
  },
  workflowSteps: {
    gap: 8,
    alignItems: 'flex-start',
    backgroundColor: Colors.brand.blueAzure + '10',
    padding: 16,
    borderRadius: 8,
  },
  stepItem: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 18,
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

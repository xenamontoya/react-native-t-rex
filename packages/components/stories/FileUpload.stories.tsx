import type { Meta, StoryObj } from '@storybook/react';
import { View, Alert } from 'react-native';
import { useState } from 'react';
import { FileUpload, UploadedFile } from '../src/components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: '🧩 Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LogbookImport: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    
    return (
      <FileUpload
        label="Upload Your Logbook Files"
        description="Select your logbook files to import flight data"
        supportedFormats="Supports CSV, Excel (.xlsx), and PDF files"
        onFilesSelected={(newFiles) => {
          setFiles(newFiles);
          console.log('Files selected:', newFiles.map(f => f.name));
        }}
        onFileRemove={(fileId) => {
          console.log('File removed:', fileId);
        }}
        maxFiles={5}
        maxFileSize={10}
      />
    );
  },
};

export const DocumentUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    
    return (
      <FileUpload
        label="Upload Documents"
        description="Select documents to upload"
        supportedFormats="Supports PDF files only"
        acceptedTypes={['application/pdf']}
        onFilesSelected={setFiles}
        maxFiles={3}
        maxFileSize={5}
      />
    );
  },
};

export const SingleFileUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    
    return (
      <FileUpload
        label="Upload Certificate"
        description="Select your pilot certificate PDF"
        supportedFormats="PDF files only, max 5MB"
        acceptedTypes={['application/pdf']}
        onFilesSelected={setFiles}
        maxFiles={1}
        maxFileSize={5}
      />
    );
  },
};

export const ExcelOnlyUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    
    return (
      <FileUpload
        label="Upload Spreadsheet"
        description="Import data from Excel file"
        supportedFormats="Excel (.xlsx) files only"
        acceptedTypes={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
        onFilesSelected={setFiles}
        maxFiles={1}
        maxFileSize={25}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    
    return (
      <FileUpload
        label="Upload Failed"
        description="Please try again"
        onFilesSelected={setFiles}
        error="Failed to upload files. Please check your connection and try again."
      />
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <FileUpload
      label="Upload Disabled"
      description="File upload is temporarily unavailable"
      onFilesSelected={() => {}}
      disabled
    />
  ),
};

export const PreloadedFiles: Story = {
  render: () => {
    // Simulate pre-loaded files
    const preloadedFiles: UploadedFile[] = [
      {
        id: '1',
        name: 'flight_logbook_2024.csv',
        size: 15678,
        type: 'text/csv',
        uri: 'file://temp/logbook.csv',
      },
      {
        id: '2',
        name: 'training_records.xlsx',
        size: 45234,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uri: 'file://temp/training.xlsx',
      },
      {
        id: '3',
        name: 'medical_certificate.pdf',
        size: 234567,
        type: 'application/pdf',
        uri: 'file://temp/medical.pdf',
      },
    ];

    const [files, setFiles] = useState<UploadedFile[]>(preloadedFiles);
    
    return (
      <FileUpload
        label="Additional Files"
        description="Add more files to your upload"
        onFilesSelected={setFiles}
        onFileRemove={(fileId) => {
          setFiles(prev => prev.filter(f => f.id !== fileId));
        }}
        maxFiles={5}
      />
    );
  },
};

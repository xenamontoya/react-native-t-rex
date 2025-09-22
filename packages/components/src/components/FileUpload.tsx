import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Typography, Spacing } from '../design-system';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

export interface FileUploadProps {
  label?: string;
  description?: string;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number; // in MB
  onFilesSelected: (files: UploadedFile[]) => void;
  onFileRemove?: (fileId: string) => void;
  disabled?: boolean;
  error?: string;
  supportedFormats?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Your Logbook Files',
  description = 'Select your logbook files to import',
  acceptedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf'],
  maxFiles = 5,
  maxFileSize = 10, // 10MB default
  onFilesSelected,
  onFileRemove,
  disabled = false,
  error,
  supportedFormats = 'Supports CSV, Excel (.xlsx), and PDF files',
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('csv')) return 'file-csv';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'file-excel';
    if (type.includes('pdf')) return 'file-pdf';
    return 'file';
  };

  const getFileTypeDisplay = (type: string): string => {
    if (type.includes('csv')) return 'CSV';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'Excel';
    if (type.includes('pdf')) return 'PDF';
    return 'File';
  };

  const handleFilePicker = async () => {
    if (disabled || isUploading) return;

    try {
      setIsUploading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
        multiple: maxFiles > 1,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const newFiles: UploadedFile[] = [];
        
        for (const asset of result.assets) {
          // Check file size
          if (asset.size && asset.size > maxFileSize * 1024 * 1024) {
            Alert.alert(
              'File Too Large',
              `${asset.name} is larger than ${maxFileSize}MB. Please select a smaller file.`
            );
            continue;
          }

          // Check if we're at max files
          if (uploadedFiles.length + newFiles.length >= maxFiles) {
            Alert.alert(
              'Too Many Files',
              `You can only upload up to ${maxFiles} files at once.`
            );
            break;
          }

          const uploadedFile: UploadedFile = {
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: asset.name || 'Unknown file',
            size: asset.size || 0,
            type: asset.mimeType || 'application/octet-stream',
            uri: asset.uri,
          };

          newFiles.push(uploadedFile);
        }

        if (newFiles.length > 0) {
          const allFiles = [...uploadedFiles, ...newFiles];
          setUploadedFiles(allFiles);
          onFilesSelected(allFiles);
        }
      }
    } catch (error) {
      console.error('File picker error:', error);
      Alert.alert('Error', 'Failed to select files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    onFileRemove?.(fileId);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Files',
      'Are you sure you want to remove all uploaded files?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setUploadedFiles([]);
            onFilesSelected([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Upload Zone */}
      {uploadedFiles.length === 0 ? (
        <TouchableOpacity
          style={[
            styles.uploadZone,
            disabled && styles.uploadZoneDisabled,
            error && styles.uploadZoneError,
          ]}
          onPress={handleFilePicker}
          disabled={disabled || isUploading}
          activeOpacity={0.8}
        >
          <FontAwesome6 
            name="cloud-arrow-up" 
            size={48} 
            color={disabled ? Colors.neutral.gray400 : Colors.neutral.gray400} 
            style={styles.uploadIcon}
          />
          
          <Text style={[styles.uploadTitle, disabled && styles.uploadTitleDisabled]}>
            {label}
          </Text>
          
          <Text style={[styles.uploadDescription, disabled && styles.uploadDescriptionDisabled]}>
            {description}
          </Text>
          
          <Text style={[styles.supportedFormats, disabled && styles.supportedFormatsDisabled]}>
            {supportedFormats}
          </Text>

          {isUploading && (
            <View style={styles.uploadingIndicator}>
              <FontAwesome6 name="spinner" size={20} color={Colors.secondary.electricBlue} />
              <Text style={styles.uploadingText}>Selecting files...</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        /* File List */
        <View style={styles.fileListContainer}>
          <View style={styles.fileListHeader}>
            <Text style={styles.fileListTitle}>Uploaded Files</Text>
            <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.fileList} showsVerticalScrollIndicator={false}>
            {uploadedFiles.map((file) => (
              <View key={file.id} style={styles.fileItem}>
                <View style={styles.fileInfo}>
                  <FontAwesome6 
                    name={getFileIcon(file.type)} 
                    size={24} 
                    color={Colors.secondary.electricBlue} 
                    style={styles.fileIcon}
                  />
                  
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.name}
                    </Text>
                    <View style={styles.fileMetadata}>
                      <Text style={styles.fileType}>
                        {getFileTypeDisplay(file.type)}
                      </Text>
                      <Text style={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemoveFile(file.id)}
                  style={styles.removeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome6 name="xmark" size={16} color={Colors.status.error} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Add More Files Button */}
          {uploadedFiles.length < maxFiles && (
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={handleFilePicker}
              disabled={disabled || isUploading}
            >
              <FontAwesome6 name="plus" size={16} color={Colors.secondary.electricBlue} />
              <Text style={styles.addMoreText}>Add More Files</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  uploadZone: {
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
  },
  uploadZoneDisabled: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.neutral.gray200,
  },
  uploadZoneError: {
    borderColor: Colors.status.error,
    backgroundColor: '#FEF2F2', // red-50
  },
  uploadIcon: {
    marginBottom: Spacing.md,
  },
  uploadTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  uploadTitleDisabled: {
    color: Colors.neutral.gray400,
  },
  uploadDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  uploadDescriptionDisabled: {
    color: Colors.neutral.gray400,
  },
  supportedFormats: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    textAlign: 'center',
  },
  supportedFormatsDisabled: {
    color: Colors.neutral.gray400,
  },
  uploadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  uploadingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary.electricBlue,
  },
  fileListContainer: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 12,
    backgroundColor: Colors.neutral.white,
    overflow: 'hidden',
  },
  fileListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.neutral.gray50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  fileListTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  clearAllButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  clearAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
  },
  fileList: {
    maxHeight: 200,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    marginRight: Spacing.sm,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  fileMetadata: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  fileType: {
    fontSize: Typography.fontSize.xs,
    color: Colors.secondary.electricBlue,
    fontFamily: Typography.fontFamily.medium,
  },
  fileSize: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.gray500,
  },
  removeButton: {
    padding: Spacing.xs,
    borderRadius: 4,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  addMoreText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary.electricBlue,
    fontFamily: Typography.fontFamily.medium,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.status.error,
    marginTop: Spacing.xs,
  },
});

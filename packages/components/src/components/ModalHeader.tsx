import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeIcon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | 'centered' | 'minimal';
}

/**
 * 📱 MODAL HEADER COMPONENT
 * 
 * Unified header component for modals and bottom sheets
 * Eliminates duplication of modal header pattern across 6+ modals
 * 
 * Usage:
 * <ModalHeader title="Flight Details" onClose={handleClose} />
 * <ModalHeader title="Settings" variant="centered" />
 * <ModalHeader title="Edit" leftElement={<BackButton />} rightElement={<SaveButton />} />
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showCloseButton = true,
  closeIcon,
  leftElement,
  rightElement,
  titleStyle,
  containerStyle,
  variant = 'default',
}) => {
  const isCentered = variant === 'centered';
  const isMinimal = variant === 'minimal';

  const renderCloseButton = () => {
    if (!showCloseButton && !leftElement) return null;

    return (
      <TouchableOpacity 
        onPress={onClose}
        style={styles.actionButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {closeIcon || (
          <Text style={styles.closeIcon}>✕</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderRightElement = () => {
    if (rightElement) return rightElement;
    if (isCentered && showCloseButton) return renderCloseButton();
    return <View style={styles.spacer} />;
  };

  if (isMinimal) {
    return (
      <View style={[styles.minimalContainer, containerStyle]}>
        <Text style={[styles.minimalTitle, titleStyle]}>{title}</Text>
        {showCloseButton && (
          <TouchableOpacity onPress={onClose} style={styles.minimalClose}>
            {closeIcon || <Text style={styles.closeIcon}>✕</Text>}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (isCentered) {
    return (
      <View style={[styles.centeredContainer, containerStyle]}>
        <View style={styles.spacer} />
        <Text style={[styles.centeredTitle, titleStyle]}>{title}</Text>
        {renderRightElement()}
      </View>
    );
  }

  // Default layout
  return (
    <View style={[styles.container, containerStyle]}>
      {leftElement || renderCloseButton()}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {renderRightElement()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  centeredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  minimalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  centeredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  minimalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimalClose: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
  spacer: {
    width: 40,
  },
});

export default ModalHeader;

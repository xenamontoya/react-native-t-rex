import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
  Text,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Colors, Typography } from '../../components/src';
import BottomSheet from './BottomSheet';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AdaptiveBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  snapPoints?: number[]; // Percentage heights (e.g., [0.3, 0.6, 0.9])
  initialSnapPoint?: number; // Index of snapPoints array
  enablePanGesture?: boolean;
  showHandle?: boolean;
  backgroundColor?: string;
  overlayOpacity?: number;
  tabletLayout?: 'centeredModal' | 'bottomSheet'; // New option for iPad layout
}

const AdaptiveBottomSheet: React.FC<AdaptiveBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  snapPoints = [0.5, 0.8],
  initialSnapPoint = 0,
  enablePanGesture = true,
  showHandle = true,
  backgroundColor = Colors.primary.white,
  overlayOpacity = 0.5,
  tabletLayout = 'centeredModal', // Default to centered modal for tablets
}) => {
  // Detect device type for adaptive design
  const isTablet = screenWidth >= 768;
  const isLandscape = screenWidth > screenHeight;
  const insets = useSafeAreaInsets();

  // ADAPTIVE RENDERING: Bottom Sheet on Phone, Centered Modal on iPad
  if (isTablet && tabletLayout === 'centeredModal') {
    // iPad: Use centered modal for better UX
    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.tabletOverlay}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.tabletBackdrop} />
          </TouchableWithoutFeedback>
          
          <View style={[
            styles.tabletModal,
            isLandscape && styles.tabletModalLandscape,
            { backgroundColor }
          ]}>
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={styles.tabletHeader}>
                {title && (
                  <Text style={styles.tabletTitle}>{title}</Text>
                )}
                {showCloseButton && (
                  <TouchableOpacity onPress={onClose} style={styles.tabletCloseButton}>
                    <Icon name="times" size={20} color={Colors.neutral.gray600} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            {/* Content */}
            <View style={[styles.tabletContent, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
              {children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // Phone OR iPad with bottomSheet layout: Use original bottom sheet
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={showCloseButton}
      snapPoints={snapPoints}
      initialSnapPoint={initialSnapPoint}
      enablePanGesture={enablePanGesture}
      showHandle={showHandle}
      backgroundColor={backgroundColor}
      overlayOpacity={overlayOpacity}
    >
      {children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  // Tablet Centered Modal Styles
  tabletOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tabletBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabletModal: {
    width: '70%',
    maxWidth: 500,
    maxHeight: '80%',
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  tabletModalLandscape: {
    width: '60%',
    maxHeight: '85%',
  },
  tabletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  tabletTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  tabletCloseButton: {
    padding: 4,
    marginLeft: 8,
  },
  tabletContent: {
    flex: 1,
  },
});

export default AdaptiveBottomSheet;

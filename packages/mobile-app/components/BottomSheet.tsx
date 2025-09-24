import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Colors, Typography } from '../../components/src';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
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
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  snapPoints = [0.6],
  initialSnapPoint = 0,
  enablePanGesture = true,
  showHandle = true,
  backgroundColor = Colors.primary.white,
  overlayOpacity = 0.5,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const currentSnapPoint = useRef(initialSnapPoint);
  const gestureState = useRef({ isGesturing: false, startY: 0 });

  const maxHeight = screenHeight * snapPoints[currentSnapPoint.current];

  // Pan responder for gesture handling
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return enablePanGesture && Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: (_, gestureState) => {
      gestureState.isGesturing = true;
      gestureState.startY = gestureState.y0;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        // Only allow downward movement
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      gestureState.isGesturing = false;
      
      const velocity = gestureState.vy;
      const displacement = gestureState.dy;
      
      // Determine if we should close, snap to different point, or return to current
      if (displacement > maxHeight * 0.3 || velocity > 0.5) {
        // Close the sheet
        closeSheet();
      } else if (displacement < -50 && currentSnapPoint.current < snapPoints.length - 1) {
        // Snap to higher point if available
        snapToPoint(currentSnapPoint.current + 1);
      } else {
        // Return to current snap point
        snapToPoint(currentSnapPoint.current);
      }
    },
  });

  const snapToPoint = (pointIndex: number) => {
    const targetHeight = screenHeight * snapPoints[pointIndex];
    const availableHeight = screenHeight - insets.bottom;
    currentSnapPoint.current = pointIndex;
    
    Animated.spring(translateY, {
      toValue: availableHeight - targetHeight,
      useNativeDriver: false, // Disabled for web compatibility
      tension: 100,
      friction: 8,
    }).start();
  };

  const openSheet = () => {
    const targetHeight = screenHeight * snapPoints[currentSnapPoint.current];
    // Account for bottom safe area to prevent content from being cut off
    const availableHeight = screenHeight - insets.bottom;
    
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: availableHeight - targetHeight,
        useNativeDriver: false, // Disabled for web compatibility
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false, // Disabled for web compatibility
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: screenHeight,
        useNativeDriver: false, // Disabled for web compatibility
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false, // Disabled for web compatibility
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (isOpen) {
      openSheet();
    } else {
      translateY.setValue(screenHeight);
      opacity.setValue(0);
    }
  }, [isOpen]);

  const handleOverlayPress = () => {
    closeSheet();
  };

  const handleClosePress = () => {
    closeSheet();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeSheet}
    >
      <View style={styles.container}>
        {/* Overlay */}
        <Pressable onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, overlayOpacity],
                }),
              },
            ]}
          />
        </Pressable>

        {/* Bottom Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor,
              transform: [{ translateY }],
              maxHeight: snapPoints[snapPoints.length - 1] * screenHeight,
            },
          ]}
          {...(enablePanGesture ? panResponder.panHandlers : {})}
        >
          {/* Handle */}
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}

          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClosePress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Icon name="times" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <View style={[styles.content, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.neutral.gray300,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});

export default BottomSheet;

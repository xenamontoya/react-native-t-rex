/**
 * Toast Component - Converted from original project-t-rex
 * Notification toasts for success/error/info messages
 */

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Dimensions 
} from 'react-native';
import { Icon } from '../Icons';
import { Colors, Typography, Spacing } from '../design-system';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  visible: boolean;
  duration?: number;
  onDismiss: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
  isDark?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  visible,
  duration = 4000,
  onDismiss,
  action,
  style,
  isDark = false,
}) => {
  const [slideAnim] = useState(new Animated.Value(-100));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Slide in and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      handleDismiss();
    }
  }, [visible, duration]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getToastStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'absolute',
      top: 50,
      left: Spacing.md,
      right: Spacing.md,
      borderRadius: 12,
      padding: Spacing.md,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      shadowColor: Colors.primary.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 9999,
    };

    // Type-based styling (matching original colors)
    const typeStyles: Record<ToastType, ViewStyle> = {
      success: {
        backgroundColor: '#e1fdec', // bg-[rgb(225,253,236)] from original
        borderColor: '#02d353', // border-[rgb(2,211,83)] from original
      },
      error: {
        backgroundColor: '#fbE9E8', // bg-[rgb(251,233,232)] from original  
        borderColor: '#FF4B3B', // border-[rgb(255,75,59)] from original
      },
      warning: {
        backgroundColor: '#fef3c7', // Light amber background
        borderColor: Colors.status.warning,
      },
      info: {
        backgroundColor: Colors.secondary.electricBlue + '15', // 15% opacity
        borderColor: Colors.secondary.electricBlue,
      },
    };

    // Dark mode adjustments
    if (isDark) {
      const darkAdjustments: Record<ToastType, ViewStyle> = {
        success: {
          backgroundColor: '#064e3b',
          borderColor: '#10b981',
        },
        error: {
          backgroundColor: '#7f1d1d',
          borderColor: '#ef4444',
        },
        warning: {
          backgroundColor: '#78350f',
          borderColor: '#f59e0b',
        },
        info: {
          backgroundColor: '#1e3a8a',
          borderColor: Colors.secondary.electricBlue,
        },
      };
      
      return {
        ...baseStyle,
        ...darkAdjustments[type],
      };
    }

    return {
      ...baseStyle,
      ...typeStyles[type],
    };
  };

  const getIconName = (): string => {
    const iconMap: Record<ToastType, string> = {
      success: 'checkCircle',
      error: 'exclamationTriangle',
      warning: 'exclamationTriangle',
      info: 'questionCircle',
    };
    return iconMap[type];
  };

  const getIconColor = (): string => {
    if (isDark) {
      const darkColors: Record<ToastType, string> = {
        success: '#10b981',
        error: '#ef4444', 
        warning: '#f59e0b',
        info: Colors.secondary.electricBlue,
      };
      return darkColors[type];
    }

    const lightColors: Record<ToastType, string> = {
      success: '#02d353', // Original green
      error: '#FF4B3B', // Original red
      warning: Colors.status.warning,
      info: Colors.secondary.electricBlue,
    };
    return lightColors[type];
  };

  const getTitleStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.semibold,
      fontSize: Typography.fontSize.sm,
      marginBottom: title ? Spacing.xs / 2 : 0,
    };

    const textColor = isDark ? Colors.dark.text : Colors.primary.black;

    return {
      ...baseStyle,
      color: textColor,
    };
  };

  const getMessageStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: Typography.fontFamily.regular,
      fontSize: Typography.fontSize.sm,
      lineHeight: Typography.fontSize.sm * 1.4,
      flex: 1,
    };

    const textColor = isDark ? Colors.dark.textMuted : Colors.neutral.gray600;

    return {
      ...baseStyle,
      color: textColor,
    };
  };

  const getActionStyles = (): TextStyle => {
    return {
      fontFamily: Typography.fontFamily.medium,
      fontSize: Typography.fontSize.sm,
      color: getIconColor(),
      marginLeft: Spacing.sm,
    };
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        getToastStyles(),
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={{ marginRight: Spacing.sm, marginTop: 2 }}>
        <Icon 
          name={getIconName() as any} 
          size={20} 
          color={getIconColor()} 
        />
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {title && (
          <Text style={getTitleStyles()}>
            {title}
          </Text>
        )}
        <Text style={getMessageStyles()}>
          {message}
        </Text>
      </View>

      {/* Action Button */}
      {action && (
        <TouchableOpacity onPress={action.onPress}>
          <Text style={getActionStyles()}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}

      {/* Close Button */}
      <TouchableOpacity 
        onPress={handleDismiss}
        style={{ 
          marginLeft: Spacing.sm,
          padding: 4,
        }}
      >
        <Icon 
          name="times" 
          size={16} 
          color={isDark ? Colors.dark.textMuted : Colors.neutral.gray400} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Toast Manager Hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
    action?: {
      label: string;
      onPress: () => void;
    };
  }>>([]);

  const showToast = (config: {
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
    action?: {
      label: string;
      onPress: () => void;
    };
  }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...config, id }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message: string, title?: string) => {
    showToast({ type: 'success', message, title });
  };

  const showError = (message: string, title?: string) => {
    showToast({ type: 'error', message, title });
  };

  const showWarning = (message: string, title?: string) => {
    showToast({ type: 'warning', message, title });
  };

  const showInfo = (message: string, title?: string) => {
    showToast({ type: 'info', message, title });
  };

  return {
    toasts,
    showToast,
    dismissToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default Toast;

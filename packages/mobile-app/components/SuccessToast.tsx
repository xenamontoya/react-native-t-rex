import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

const { width: screenWidth } = Dimensions.get('window');

interface SuccessToastProps {
  visible: boolean;
  message: string;
  onHide?: () => void;
  duration?: number; // Auto-hide duration in milliseconds (0 = no auto-hide)
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top' | 'bottom';
  showIcon?: boolean;
  showCloseButton?: boolean;
}

const SuccessToast: React.FC<SuccessToastProps> = ({
  visible,
  message,
  onHide,
  duration = 3000,
  type = 'success',
  position = 'top',
  showIcon = true,
  showCloseButton = false,
}) => {
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10b981', // green-500
          icon: 'check-circle',
          iconColor: Colors.primary.white,
        };
      case 'error':
        return {
          backgroundColor: '#ef4444', // red-500
          icon: 'times-circle',
          iconColor: Colors.primary.white,
        };
      case 'warning':
        return {
          backgroundColor: '#f59e0b', // amber-500
          icon: 'exclamation-triangle',
          iconColor: Colors.primary.white,
        };
      case 'info':
        return {
          backgroundColor: '#3b82f6', // blue-500
          icon: 'info-circle',
          iconColor: Colors.primary.white,
        };
      default:
        return {
          backgroundColor: '#10b981',
          icon: 'check-circle',
          iconColor: Colors.primary.white,
        };
    }
  };

  const typeConfig = getTypeConfig();

  const showToast = () => {
    const toValue = position === 'top' ? 0 : 0;
    
    Animated.parallel([
      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide after duration
    if (duration > 0 && onHide) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  const hideToast = () => {
    const toValue = position === 'top' ? -100 : 100;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    Animated.parallel([
      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) {
        onHide();
      }
    });
  };

  useEffect(() => {
    if (visible) {
      showToast();
    } else {
      hideToast();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible]);

  const handleClosePress = () => {
    hideToast();
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        {
          backgroundColor: typeConfig.backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.content}>
        {showIcon && (
          <View style={styles.iconContainer}>
            <Icon
              name={typeConfig.icon}
              size={20}
              color={typeConfig.iconColor}
            />
          </View>
        )}
        
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>

        {showCloseButton && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="times" size={16} color={Colors.primary.white} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// Toast Manager for programmatic usage
class ToastManager {
  private static instance: ToastManager;
  private toastRef: React.RefObject<any> = React.createRef();

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  show(message: string, options?: Partial<SuccessToastProps>) {
    if (this.toastRef.current) {
      this.toastRef.current.show(message, options);
    }
  }

  hide() {
    if (this.toastRef.current) {
      this.toastRef.current.hide();
    }
  }

  setRef(ref: any) {
    this.toastRef.current = ref;
  }
}

// Global Toast Provider Component
interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastConfig, setToastConfig] = React.useState<{
    visible: boolean;
    message: string;
    options: Partial<SuccessToastProps>;
  }>({
    visible: false,
    message: '',
    options: {},
  });

  const toastManager = React.useRef(ToastManager.getInstance());

  React.useEffect(() => {
    const manager = toastManager.current;
    
    manager.setRef({
      show: (message: string, options: Partial<SuccessToastProps> = {}) => {
        setToastConfig({
          visible: true,
          message,
          options,
        });
      },
      hide: () => {
        setToastConfig(prev => ({
          ...prev,
          visible: false,
        }));
      },
    });
  }, []);

  const handleHide = () => {
    setToastConfig(prev => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      {children}
      <SuccessToast
        visible={toastConfig.visible}
        message={toastConfig.message}
        onHide={handleHide}
        {...toastConfig.options}
      />
    </View>
  );
};

// Helper functions for easy usage
export const showSuccessToast = (message: string, options?: Partial<SuccessToastProps>) => {
  ToastManager.getInstance().show(message, { type: 'success', ...options });
};

export const showErrorToast = (message: string, options?: Partial<SuccessToastProps>) => {
  ToastManager.getInstance().show(message, { type: 'error', ...options });
};

export const showWarningToast = (message: string, options?: Partial<SuccessToastProps>) => {
  ToastManager.getInstance().show(message, { type: 'warning', ...options });
};

export const showInfoToast = (message: string, options?: Partial<SuccessToastProps>) => {
  ToastManager.getInstance().show(message, { type: 'info', ...options });
};

export const hideToast = () => {
  ToastManager.getInstance().hide();
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topPosition: {
    top: 60, // Account for status bar and some padding
  },
  bottomPosition: {
    bottom: 100, // Account for tab bar and some padding
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SuccessToast;

import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

const { width: screenWidth } = Dimensions.get('window');

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'destructive' | 'warning' | 'success';
  icon?: string;
  showIcon?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default',
  icon,
  showIcon = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const getTypeConfig = () => {
    switch (type) {
      case 'destructive':
        return {
          iconName: icon || 'exclamation-triangle',
          iconColor: Colors.status.danger,
          iconBackground: '#fef2f2', // red-50
          confirmButtonColor: Colors.status.danger,
          confirmTextColor: Colors.primary.white,
        };
      case 'warning':
        return {
          iconName: icon || 'exclamation-triangle',
          iconColor: '#f59e0b', // amber-500
          iconBackground: '#fefce8', // amber-50
          confirmButtonColor: '#f59e0b',
          confirmTextColor: Colors.primary.white,
        };
      case 'success':
        return {
          iconName: icon || 'check-circle',
          iconColor: '#10b981', // emerald-500
          iconBackground: '#f0fdf4', // emerald-50
          confirmButtonColor: '#10b981',
          confirmTextColor: Colors.primary.white,
        };
      default:
        return {
          iconName: icon || 'info-circle',
          iconColor: Colors.status.info,
          iconBackground: '#eff6ff', // blue-50
          confirmButtonColor: Colors.status.info,
          confirmTextColor: Colors.primary.white,
        };
    }
  };

  const typeConfig = getTypeConfig();

  const showModal = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideModal = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const handleOverlayPress = () => {
    hideModal();
  };

  const handleConfirm = () => {
    onConfirm();
    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={hideModal}
    >
      <View style={styles.container}>
        {/* Overlay */}
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Modal */}
        <Animated.View
          style={[
            styles.modal,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icon */}
          {showIcon && (
            <View style={styles.iconContainer}>
              <View
                style={[
                  styles.iconBackground,
                  { backgroundColor: typeConfig.iconBackground },
                ]}
              >
                <Icon
                  name={typeConfig.iconName}
                  size={24}
                  color={typeConfig.iconColor}
                />
              </View>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            {title && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.confirmButton,
                { backgroundColor: typeConfig.confirmButtonColor },
              ]}
              onPress={handleConfirm}
            >
              <Text
                style={[
                  styles.confirmButtonText,
                  { color: typeConfig.confirmTextColor },
                ]}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Confirmation Modal Manager for programmatic usage
class ConfirmationModalManager {
  private static instance: ConfirmationModalManager;
  private modalRef: React.RefObject<any> = React.createRef();

  static getInstance(): ConfirmationModalManager {
    if (!ConfirmationModalManager.instance) {
      ConfirmationModalManager.instance = new ConfirmationModalManager();
    }
    return ConfirmationModalManager.instance;
  }

  show(config: Omit<ConfirmationModalProps, 'visible' | 'onClose'>) {
    if (this.modalRef.current) {
      this.modalRef.current.show(config);
    }
  }

  hide() {
    if (this.modalRef.current) {
      this.modalRef.current.hide();
    }
  }

  setRef(ref: any) {
    this.modalRef.current = ref;
  }
}

// Global Confirmation Modal Provider Component
interface ConfirmationModalProviderProps {
  children: React.ReactNode;
}

export const ConfirmationModalProvider: React.FC<ConfirmationModalProviderProps> = ({ children }) => {
  const [modalConfig, setModalConfig] = React.useState<{
    visible: boolean;
    config: Partial<ConfirmationModalProps>;
  }>({
    visible: false,
    config: {},
  });

  const modalManager = React.useRef(ConfirmationModalManager.getInstance());

  React.useEffect(() => {
    const manager = modalManager.current;
    
    manager.setRef({
      show: (config: Omit<ConfirmationModalProps, 'visible' | 'onClose'>) => {
        setModalConfig({
          visible: true,
          config,
        });
      },
      hide: () => {
        setModalConfig(prev => ({
          ...prev,
          visible: false,
        }));
      },
    });
  }, []);

  const handleClose = () => {
    setModalConfig(prev => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      {children}
      <ConfirmationModal
        visible={modalConfig.visible}
        onClose={handleClose}
        message=""
        {...modalConfig.config}
      />
    </View>
  );
};

// Helper functions for easy usage
export const showConfirmationModal = (
  config: Omit<ConfirmationModalProps, 'visible' | 'onClose'>
) => {
  ConfirmationModalManager.getInstance().show(config);
};

export const showDeleteConfirmation = (
  itemName: string,
  onConfirm: () => void,
  customMessage?: string
) => {
  showConfirmationModal({
    title: 'Delete Confirmation',
    message: customMessage || `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    confirmText: 'Delete',
    type: 'destructive',
    onConfirm,
  });
};

export const showSaveConfirmation = (
  onConfirm: () => void,
  customMessage?: string
) => {
  showConfirmationModal({
    title: 'Save Changes',
    message: customMessage || 'Do you want to save your changes?',
    confirmText: 'Save',
    type: 'success',
    onConfirm,
  });
};

export const hideConfirmationModal = () => {
  ConfirmationModalManager.getInstance().hide();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modal: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 24,
    width: Math.min(screenWidth - 40, 400),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
  },
});

export default ConfirmationModal;

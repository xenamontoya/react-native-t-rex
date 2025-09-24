import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

const { height: screenHeight } = Dimensions.get('window');

interface ActionSheetOption {
  id: string;
  title: string;
  icon?: string;
  iconColor?: string;
  textColor?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  showCancel?: boolean;
  cancelText?: string;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  message,
  options,
  showCancel = true,
  cancelText = 'Cancel',
}) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const openSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
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
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: screenHeight,
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

  const handleOptionPress = (option: ActionSheetOption) => {
    if (!option.disabled) {
      option.onPress();
      closeSheet();
    }
  };

  const handleCancelPress = () => {
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
      <SafeAreaView style={styles.container}>
        {/* Overlay */}
        <Pressable onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            ]}
          />
        </Pressable>

        {/* Action Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Header */}
          {(title || message) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {message && <Text style={styles.message}>{message}</Text>}
            </View>
          )}

          {/* Options */}
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  index === 0 && (title || message) && styles.firstOption,
                  index === options.length - 1 && styles.lastOption,
                  option.disabled && styles.optionDisabled,
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={option.disabled}
              >
                <View style={styles.optionContent}>
                  {option.icon && (
                    <Icon
                      name={option.icon}
                      size={20}
                      color={
                        option.iconColor ||
                        (option.destructive
                          ? Colors.status.danger
                          : option.disabled
                          ? Colors.neutral.gray400
                          : Colors.neutral.gray700)
                      }
                      style={styles.optionIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      option.destructive && styles.optionTextDestructive,
                      option.disabled && styles.optionTextDisabled,
                      option.textColor && { color: option.textColor },
                    ]}
                  >
                    {option.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cancel Button */}
          {showCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

// Action Sheet Manager for programmatic usage
class ActionSheetManager {
  private static instance: ActionSheetManager;
  private actionSheetRef: React.RefObject<any> = React.createRef();

  static getInstance(): ActionSheetManager {
    if (!ActionSheetManager.instance) {
      ActionSheetManager.instance = new ActionSheetManager();
    }
    return ActionSheetManager.instance;
  }

  show(options: ActionSheetOption[], config?: Partial<ActionSheetProps>) {
    if (this.actionSheetRef.current) {
      this.actionSheetRef.current.show(options, config);
    }
  }

  hide() {
    if (this.actionSheetRef.current) {
      this.actionSheetRef.current.hide();
    }
  }

  setRef(ref: any) {
    this.actionSheetRef.current = ref;
  }
}

// Global Action Sheet Provider Component
interface ActionSheetProviderProps {
  children: React.ReactNode;
}

export const ActionSheetProvider: React.FC<ActionSheetProviderProps> = ({ children }) => {
  const [actionSheetConfig, setActionSheetConfig] = React.useState<{
    isOpen: boolean;
    options: ActionSheetOption[];
    config: Partial<ActionSheetProps>;
  }>({
    isOpen: false,
    options: [],
    config: {},
  });

  const actionSheetManager = React.useRef(ActionSheetManager.getInstance());

  React.useEffect(() => {
    const manager = actionSheetManager.current;
    
    manager.setRef({
      show: (options: ActionSheetOption[], config: Partial<ActionSheetProps> = {}) => {
        setActionSheetConfig({
          isOpen: true,
          options,
          config,
        });
      },
      hide: () => {
        setActionSheetConfig(prev => ({
          ...prev,
          isOpen: false,
        }));
      },
    });
  }, []);

  const handleClose = () => {
    setActionSheetConfig(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      {children}
      <ActionSheet
        isOpen={actionSheetConfig.isOpen}
        onClose={handleClose}
        options={actionSheetConfig.options}
        {...actionSheetConfig.config}
      />
    </View>
  );
};

// Helper function for easy usage
export const showActionSheet = (
  options: ActionSheetOption[],
  config?: Partial<ActionSheetProps>
) => {
  ActionSheetManager.getInstance().show(options, config);
};

export const hideActionSheet = () => {
  ActionSheetManager.getInstance().hide();
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
    backgroundColor: Colors.primary.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34, // Safe area bottom padding
    marginHorizontal: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    paddingVertical: 8,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.gray200,
  },
  firstOption: {
    // Special styling for first option if needed
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    textAlign: 'center',
  },
  optionTextDestructive: {
    color: Colors.status.danger,
  },
  optionTextDisabled: {
    color: Colors.neutral.gray400,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 16,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
  },
});

export default ActionSheet;

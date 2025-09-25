import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp, Dimensions } from 'react-native';
import { Icon } from '../Icons';
import { PilotbaseIcon } from './PilotbaseIcon';
import { Colors } from '../design-system';

interface FloatingAIButtonProps {
  onPress: () => void;
  iconType?: 'pilotbase' | 'plus' | 'user' | 'comments' | 'search' | 'upload' | 'award' | 'calendar' | 'ellipsisV';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * 🚀 FLOATING AI BUTTON COMPONENT
 * 
 * Enhanced floating button for single-action buttons (AI, simple actions)
 * - Responsive positioning (Mobile: above tab bar, Tablet: lower)
 * - Customizable colors and icons
 * - Consistent sizing and styling
 * - Single source of truth for single-action floating buttons
 * 
 * Usage:
 * <FloatingAIButton onPress={handleAI} iconType="pilotbase" />
 * <FloatingAIButton onPress={handleAdd} iconType="plus" />
 * <FloatingAIButton onPress={handleMenu} iconType="ellipsisV" backgroundColor="#212121" borderColor="#00FFF2" />
 */
export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({
  onPress,
  iconType = 'plus',
  size = 'medium',
  backgroundColor = Colors.primary.black,
  borderColor = Colors.secondary.electricBlue,
  style,
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768; // Standard tablet breakpoint

  const getResponsivePosition = () => {
    return {
      bottom: isTablet ? 32 : 24, // Same positioning for both - closer to bottom
      right: 24,
    };
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 48, height: 48, borderRadius: 24 };
      case 'large':
        return { width: 64, height: 64, borderRadius: 32 };
      case 'medium':
      default:
        return { width: 56, height: 56, borderRadius: 28 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 28;
      case 'medium':
      default: return 24;
    }
  };

  const renderIcon = () => {
    const iconSize = getIconSize();
    
    switch (iconType) {
      case 'pilotbase':
        return <PilotbaseIcon width={iconSize} height={iconSize} />;
      case 'plus':
        return <Icon name="plus" size={iconSize} color={Colors.primary.white} />;
      case 'user':
        return <Icon name="user" size={iconSize} color={Colors.primary.white} />;
      case 'comments':
        return <Icon name="comments" size={iconSize} color={Colors.primary.white} />;
      case 'search':
        return <Icon name="search" size={iconSize} color={Colors.primary.white} />;
      case 'upload':
        return <Icon name="upload" size={iconSize} color={Colors.primary.white} />;
      case 'award':
        return <Icon name="award" size={iconSize} color={Colors.primary.white} />;
      case 'calendar':
        return <Icon name="calendar" size={iconSize} color={Colors.primary.white} />;
      case 'ellipsisV':
        return <Icon name="ellipsisV" size={iconSize} color={Colors.primary.white} />;
      default:
        return <Icon name="plus" size={iconSize} color={Colors.primary.white} />;
    }
  };

  const position = getResponsivePosition();
  
  return (
    <TouchableOpacity
      style={[
        styles.floatingButton,
        getSizeStyles(),
        { 
          bottom: position.bottom, 
          right: position.right,
          backgroundColor,
          borderColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
});

export default FloatingAIButton;

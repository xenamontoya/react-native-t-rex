import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Icon } from '../Icons';
import { Colors, Typography } from '../design-system';

export interface FloatingActionItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
}

export interface FloatingActionButtonProps {
  items: FloatingActionItem[];
  mainIcon?: string;
  style?: any;
  bottom?: number;
  right?: number;
  isTablet?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  items,
  mainIcon = 'plus',
  style,
  bottom,
  right = 24,
  isTablet,
}) => {
  const { width } = Dimensions.get('window');
  const autoDetectedTablet = width >= 768;
  const effectiveIsTablet = isTablet !== undefined ? isTablet : autoDetectedTablet;
  
  // Calculate responsive bottom position
  const dynamicBottom = bottom !== undefined ? bottom : (effectiveIsTablet ? 32 : 24);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotateValue] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.timing(rotateValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleItemPress = (onPress: () => void) => {
    onPress();
    setIsExpanded(false);
    
    // Reset rotation
    Animated.timing(rotateValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={[styles.container, { bottom: dynamicBottom, right }, style]}>
      {/* Backdrop */}
      {isExpanded && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setIsExpanded(false)}
          activeOpacity={1}
        />
      )}

      {/* Menu Items */}
      {isExpanded && (
        <View style={styles.menuItems}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                { bottom: (index + 1) * 60 } // Stack items above FAB
              ]}
              onPress={() => handleItemPress(item.onPress)}
            >
              <View style={styles.menuItemContent}>
                <Icon name={item.icon as any} size={16} color={Colors.neutral.gray600} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Main FAB */}
      <TouchableOpacity
        style={[
          styles.fab,
          isExpanded && styles.fabExpanded
        ]}
        onPress={toggleExpanded}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon 
            name={mainIcon as any} 
            size={20} 
            color={Colors.primary.white} 
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 55,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.black,
    borderWidth: 3,
    borderColor: Colors.secondary.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 60,
  },
  fabExpanded: {
    zIndex: 65,
  },
  menuItems: {
    position: 'absolute',
    right: 0,
    zIndex: 70,
  },
  menuItem: {
    position: 'absolute',
    right: 0,
    width: 192, // w-48 = 12rem = 192px
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
});

export default FloatingActionButton;

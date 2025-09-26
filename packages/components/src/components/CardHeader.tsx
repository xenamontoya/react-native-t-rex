import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors, applyTextStyle } from '../design-system';

interface CardHeaderProps {
  title: string;
  showViewAll?: boolean;
  viewAllText?: string;
  onViewAllPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  viewAllTextColor?: string;
  showArrow?: boolean;
}

/**
 * 📋 CARD HEADER COMPONENT
 * 
 * Reusable header for cards with optional "View All" functionality
 * Eliminates duplication of card header + view all button pattern
 * 
 * Usage:
 * <CardHeader title="Recent Lessons" onViewAllPress={() => navigate(...)} />
 * <CardHeader title="Flight Statistics" viewAllText="View Logbook" />
 * <CardHeader title="Simple Title" showViewAll={false} />
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  showViewAll = true,
  viewAllText = 'View All',
  onViewAllPress,
  titleStyle,
  containerStyle,
  viewAllTextColor = Colors.tertiary.denimBlue,
  showArrow = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      {showViewAll && (
        <TouchableOpacity 
          style={styles.viewAllButton} 
          onPress={onViewAllPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.viewAllText, { color: viewAllTextColor }]}>
            {viewAllText}
          </Text>
          {showArrow && (
            <Text style={[styles.arrow, { color: viewAllTextColor }]}> →</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...applyTextStyle('cardTitle'),
    color: Colors.neutral.gray900,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...applyTextStyle('cardSubtitle'),
  },
  arrow: {
    ...applyTextStyle('cardSubtitle'),
  },
});

export default CardHeader;

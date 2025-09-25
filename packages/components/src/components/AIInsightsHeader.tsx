import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { PilotbaseIcon } from './PilotbaseIcon';

interface AIInsightsHeaderProps {
  title: string;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  spacing?: number;
}

/**
 * 🤖 AI INSIGHTS HEADER COMPONENT
 * 
 * Reusable header component for AI insight cards throughout the app
 * Provides consistent Pilotbase branding and spacing
 * 
 * Usage:
 * <AIInsightsHeader title="AI Training Insights" />
 * <AIInsightsHeader title="AI Career Insights" />
 * <AIInsightsHeader title="Wingman AI Career Insights" />
 */
export const AIInsightsHeader: React.FC<AIInsightsHeaderProps> = ({
  title,
  iconSize = 16,
  textStyle,
  containerStyle,
  spacing = 8,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ marginRight: spacing }}>
        <PilotbaseIcon width={iconSize} height={iconSize} />
      </View>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891B2',
  },
});

export default AIInsightsHeader;

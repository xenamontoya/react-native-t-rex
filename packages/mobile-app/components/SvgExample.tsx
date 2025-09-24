import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogoCollapsed, LogoExpanded, FlightsIcon, SvgIcon } from './svgs';
import { Colors, Typography } from '../../components/src';

/**
 * Example component showing how to use high-quality SVG assets
 * This demonstrates the crisp, scalable SVG components vs pixelated PNGs
 */
export const SvgExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 High-Quality SVG Assets</Text>
      
      <View style={styles.logoRow}>
        <View style={styles.logoItem}>
          <Text style={styles.label}>Logo Collapsed</Text>
          <LogoCollapsed width={40} height={40} />
        </View>
        
        <View style={styles.logoItem}>
          <Text style={styles.label}>Logo Expanded</Text>
          <LogoExpanded width={120} height={20} />
        </View>
      </View>
      
      <View style={styles.logoRow}>
        <View style={styles.logoItem}>
          <Text style={styles.label}>Flights Icon (Blue)</Text>
          <FlightsIcon width={32} height={32} color={Colors.brand.blueAzure} />
        </View>
        
        <View style={styles.logoItem}>
          <Text style={styles.label}>Flights Icon (Green)</Text>
          <FlightsIcon width={32} height={32} color={Colors.status.success} />
        </View>
      </View>
      
      <Text style={styles.description}>
        ✨ Crisp at any size, customizable colors, smaller file sizes!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    margin: 20,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SvgExample;

import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface PoweredByPilotbaseProProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  logoStyle?: StyleProp<any>;
  spacing?: 'compact' | 'default' | 'spacious';
}

/**
 * 🛩️ POWERED BY PILOTBASE PRO COMPONENT
 * 
 * Single source of truth for "Powered by Pilotbase Pro" branding
 * Ensures consistent sizing, spacing, and colors across all screens
 * 
 * Usage:
 * <PoweredByPilotbasePro />
 * <PoweredByPilotbasePro spacing="compact" />
 * <PoweredByPilotbasePro containerStyle={customStyle} />
 */
export const PoweredByPilotbasePro: React.FC<PoweredByPilotbaseProProps> = ({
  containerStyle,
  textStyle,
  logoStyle,
  spacing = 'default',
}) => {
  const getSpacingStyle = () => {
    switch (spacing) {
      case 'compact':
        return { marginVertical: 8 }; // Minimal equal space (accounting for container padding)
      case 'spacious':
        return { marginVertical: 24 }; // More space for special cases
      case 'default':
      default:
        return { marginVertical: 16 }; // Balanced equal spacing
    }
  };

  return (
    <View style={[
      styles.container,
      getSpacingStyle(),
      containerStyle
    ]}>
      <Text style={[styles.poweredByText, textStyle]}>
        Powered by
      </Text>
      <Image 
        source={require('../../../mobile-app/assets/images/logos/pilotbase-pro-6x.png')}
        style={[styles.pilotbaseProLogo, logoStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8, // Internal spacing within the component
  },
  poweredByText: {
    fontSize: 12,
    color: '#6b7280', // Consistent gray-500 color
    marginBottom: 8,
    fontWeight: '400',
  },
  pilotbaseProLogo: {
    width: 120,
    height: 24, // Consistent aspect ratio
  },
});

export default PoweredByPilotbasePro;

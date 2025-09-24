/**
 * 🛩️ PILOTBASE LOGO COMPONENTS
 * 
 * Dedicated components for Pilotbase branding
 * Handles PNG fallbacks and reliable rendering
 */

import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

// Direct PNG imports (most reliable approach)
const pilotbaseIconPng = require('../assets/images/logos/pilotbase-icon-6x.png');
const pilotbaseProPng = require('../assets/images/logos/pilotbase-pro-6x.png');
const pilotbaseMainPng = require('../assets/images/logos/pilotbase-6x.png');

interface PilotbaseLogoProps {
  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
  tintColor?: string;
}

// Main Pilotbase Icon - Used in AI features
export const PilotbaseIcon: React.FC<PilotbaseLogoProps> = ({ 
  size = 16, 
  width, 
  height, 
  style,
  tintColor 
}) => {
  return (
    <Image
      source={pilotbaseIconPng}
      style={[
        {
          width: width || size,
          height: height || size,
          tintColor: tintColor
        },
        style
      ]}
      resizeMode="contain"
    />
  );
};

// Pilotbase Pro Wordmark - Used in footers
export const PilotbasePro: React.FC<PilotbaseLogoProps> = ({ 
  size = 100, 
  width, 
  height, 
  style 
}) => {
  return (
    <Image
      source={pilotbaseProPng}
      style={[
        {
          width: width || size,
          height: height || (size * 0.3), // Maintain aspect ratio
        },
        style
      ]}
      resizeMode="contain"
    />
  );
};

// Full Pilotbase Logo - Used in headers/branding
export const PilotbaseLogo: React.FC<PilotbaseLogoProps> = ({ 
  size = 120, 
  width, 
  height, 
  style 
}) => {
  return (
    <Image
      source={pilotbaseMainPng}
      style={[
        {
          width: width || size,
          height: height || (size * 0.4), // Maintain aspect ratio
        },
        style
      ]}
      resizeMode="contain"
    />
  );
};

// Convenient exports
export default {
  Icon: PilotbaseIcon,
  Pro: PilotbasePro,
  Logo: PilotbaseLogo,
};

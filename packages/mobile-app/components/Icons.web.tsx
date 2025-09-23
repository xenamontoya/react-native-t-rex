import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../components/src';

// Web-only mock for Icons component to work in Storybook
// This provides a fallback when FontAwesome dependencies cause issues

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  solid?: boolean;
}

interface NavIconProps extends IconProps {
  isActive?: boolean;
  activeColor?: string;
}

// Simple icon mapping for web display in Storybook
const iconSymbols: Record<string, string> = {
  // Common icons with Unicode symbols
  home: '🏠',
  user: '👤',
  plane: '✈️',
  clock: '🕐',
  calendar: '📅',
  search: '🔍',
  settings: '⚙️',
  star: '⭐',
  heart: '❤️',
  plus: '+',
  minus: '-',
  times: '×',
  check: '✓',
  'arrow-left': '←',
  'arrow-right': '→',
  'chevron-down': '▼',
  'chevron-up': '▲',
  'chevron-left': '◀',
  'chevron-right': '▶',
  bell: '🔔',
  envelope: '✉️',
  phone: '📞',
  edit: '✏️',
  trash: '🗑️',
  download: '⬇️',
  upload: '⬆️',
  share: '📤',
  copy: '📋',
  save: '💾',
  filter: '🔽',
  list: '📄',
  map: '🗺️',
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
  // Fallback for unknown icons
  fallback: '◯',
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = Colors.neutral.gray600,
  solid = false 
}) => {
  const symbol = iconSymbols[name] || iconSymbols.fallback;
  
  return (
    <Text 
      style={{ 
        fontSize: size, 
        color,
        fontWeight: solid ? 'bold' : 'normal',
        lineHeight: size,
        textAlign: 'center',
        width: size,
        height: size,
      }}
    >
      {symbol}
    </Text>
  );
};

export const NavIcon: React.FC<NavIconProps> = ({
  name,
  size = 24,
  color = Colors.neutral.gray600,
  activeColor = Colors.brand.blueAzure,
  isActive = false,
  solid = false
}) => {
  return (
    <Icon
      name={name}
      size={size}
      color={isActive ? activeColor : color}
      solid={isActive || solid}
    />
  );
};

// For stories that need icon names
export const IconNames = Object.keys(iconSymbols).reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<string, string>);

export default Icon;

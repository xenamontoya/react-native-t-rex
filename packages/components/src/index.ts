/**
 * 📦 PROJECT T-REX COMPONENT LIBRARY
 * 
 * This file exports everything from your component library.
 * When you import from '@project-t-rex/components', this is what you get!
 */

// 🎨 Design System - Colors, typography, spacing (NEW - from original web app)
export { Colors, Typography, Spacing, StatusColors } from './design-system';

// 🎨 Legacy Design Tokens - Colors, spacing, typography (renamed to avoid conflicts)
export { 
  Colors as LegacyColors, 
  Typography as LegacyTypography, 
  Spacing as LegacySpacing,
  BorderRadius,
  Shadows 
} from './tokens';

// 🎯 Icons - FontAwesome Pro icon system
export * from './Icons';

// 🧩 Components - Converted from original project-t-rex web app
export * from './components/Button';
export * from './components/Card';
export * from './components/StatusBadge';
export * from './components/ProgressBar';
export * from './components/TextInput';
export * from './components/Checkbox';
export * from './components/Toggle';
export * from './components/Dropdown';
export * from './components/Toast';
export * from './components/RadioButton';
export * from './components/Header';
export * from './components/EmptyState';
export * from './components/Tooltip';
export * from './components/DatePicker';
export * from './components/TimePicker';
export * from './components/DateTimePicker';
export * from './components/DataList';
export * from './components/FileUpload';
export * from './components/ProgressChart';
export * from './components/TabBar';
export * from './components/DrawerMenu';
export * from './components/FlightWeather';
export * from './components/AircraftCard';
export * from './components/FlightRoute';
export * from './components/FloatingActionButton';

// 📋 Types (for TypeScript users)
export type { IconProps, NavIconProps } from './Icons';

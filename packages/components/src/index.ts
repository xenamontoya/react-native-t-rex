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
export * from './components/PilotbaseIcon';
export * from './components/PilotbaseWordmark';
export * from './components/AIInsightsHeader';
export * from './components/CardHeader';
export * from './components/StatCard';
export * from './components/LessonCard';
export * from './components/ModalHeader';
export * from './components/FlightCard';
export * from './components/ReservationCard';
export * from './components/JobCard';
export * from './components/AchievementItem';
export * from './components/PoweredByPilotbasePro';
export * from './components/FloatingAIButton';
export * from './components/ScreenHeader';

// 📋 Types (for TypeScript users)
export type { IconProps, NavIconProps } from './Icons';

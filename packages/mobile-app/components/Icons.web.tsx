import React from 'react';
import { Colors } from '../../components/src';

// Import FontAwesome for web (using regular web FontAwesome, not React Native version)
// This provides web-compatible FontAwesome icons
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

// FontAwesome icon mapping - Regular when available, Solid as fallback
// Using Font Awesome CSS classes for web compatibility
const iconClasses: Record<string, string> = {
  // Navigation - Regular when available
  home: 'far fa-home',
  homeActive: 'fas fa-home',
  calendar: 'far fa-calendar',
  calendarActive: 'fas fa-calendar',
  graduation: 'fas fa-graduation-cap', // Only exists in solid
  graduationActive: 'fas fa-graduation-cap',
  user: 'far fa-user',
  userActive: 'fas fa-user',
  more: 'fas fa-ellipsis-h', // Only exists in solid
  moreActive: 'fas fa-ellipsis-h',
  
  // Analytics & Reports
  chartBar: 'far fa-chart-bar',
  chartLine: 'fas fa-chart-line', // Only exists in solid
  clipboard: 'far fa-clipboard',
  
  // Business & Career
  briefcase: 'fas fa-briefcase', // Only exists in solid
  userTie: 'fas fa-user-tie', // Only exists in solid
  fileText: 'far fa-file-text',
  comments: 'far fa-comments',
  users: 'fas fa-users', // Only exists in solid
  
  // System & Settings
  cog: 'fas fa-cog', // Only exists in solid
  bell: 'far fa-bell',
  bellActive: 'fas fa-bell',
  lock: 'fas fa-lock', // Only exists in solid
  
  // Actions - Regular when available
  plus: 'fas fa-plus', // Only exists in solid
  edit: 'far fa-edit',
  check: 'fas fa-check', // Only exists in solid
  times: 'fas fa-times', // Only exists in solid
  search: 'fas fa-search', // Only exists in solid
  filter: 'fas fa-filter', // Only exists in solid
  download: 'fas fa-download', // Only exists in solid
  share: 'fas fa-share', // Only exists in solid
  star: 'far fa-star',
  starActive: 'fas fa-star',
  heart: 'far fa-heart',
  heartActive: 'fas fa-heart',
  
  // Content
  book: 'fas fa-book', // Only exists in solid
  plane: 'fas fa-plane', // Only exists in solid
  planeActive: 'fas fa-plane',
  clock: 'far fa-clock',
  mapMarker: 'fas fa-map-marker', // Only exists in solid
  mapMarkerAlt: 'fas fa-map-marker-alt', // Only exists in solid
  award: 'fas fa-award', // Only exists in solid
  checkCircle: 'far fa-check-circle',
  creditCard: 'far fa-credit-card',
  questionCircle: 'far fa-question-circle',
  exclamationTriangle: 'fas fa-exclamation-triangle', // Only exists in solid
  infoCircle: 'fas fa-info-circle', // Only exists in solid
  externalLink: 'fas fa-external-link-alt', // Only exists in solid
  bookOpen: 'fas fa-book-open', // Only exists in solid
  calendarPlus: 'fas fa-calendar-plus', // Only exists in solid
  alertCircle: 'fas fa-exclamation-circle', // Only exists in solid
  helpCircle: 'far fa-question-circle',
  graduationCap: 'fas fa-graduation-cap',
  list: 'fas fa-list', // Only exists in solid
  map: 'far fa-map',
  ellipsisV: 'fas fa-ellipsis-v', // Only exists in solid
  copy: 'far fa-copy',
  trash: 'far fa-trash-alt',
  upload: 'fas fa-upload', // Only exists in solid
  robot: 'fas fa-robot', // Only exists in solid
  phone: 'fas fa-phone', // Only exists in solid
  minus: 'fas fa-minus', // Only exists in solid
  play: 'far fa-play-circle',
  email: 'far fa-envelope',
  envelope: 'far fa-envelope',
  eye: 'far fa-eye',
  fileExcel: 'far fa-file-excel',
  fileCode: 'fas fa-file-code', // Only exists in solid
  refresh: 'fas fa-sync-alt', // Only exists in solid
  university: 'fas fa-university', // Only exists in solid
  circle: 'far fa-circle',
  
  // Weather
  cloud: 'fas fa-cloud', // Only exists in solid
  thermometer: 'fas fa-thermometer-half', // Only exists in solid
  wind: 'fas fa-wind', // Only exists in solid
  droplet: 'fas fa-tint', // Only exists in solid
  
  // Arrows
  arrowRight: 'fas fa-arrow-right', // Only exists in solid
  arrowLeft: 'fas fa-arrow-left', // Only exists in solid
  chevronRight: 'fas fa-chevron-right', // Only exists in solid
  chevronLeft: 'fas fa-chevron-left', // Only exists in solid
  chevronDown: 'fas fa-chevron-down', // Only exists in solid
  chevronUp: 'fas fa-chevron-up', // Only exists in solid
  
  // Audio/Media
  microphone: 'fas fa-microphone', // Only exists in solid
  pause: 'far fa-pause-circle',
  
  // Additional icons
  comment: 'far fa-comment',
  save: 'far fa-save',
  xmark: 'fas fa-times',
  caretDown: 'fas fa-caret-down', // Only exists in solid
  towerBroadcast: 'fas fa-broadcast-tower', // Only exists in solid
  userCheck: 'fas fa-user-check', // Only exists in solid
  sun: 'far fa-sun',
  floppyDisk: 'far fa-save',
  
  // Fallback for unknown icons
  fallback: 'far fa-circle',
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 16, 
  color = Colors.neutral.gray600,
  solid = false 
}) => {
  const iconClass = iconClasses[name] || iconClasses.fallback;
  
  return (
    <i 
      className={iconClass}
      style={{ 
        fontSize: size, 
        color,
        width: size,
        height: size,
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: 1,
      }}
    />
  );
};

export const NavIcon: React.FC<NavIconProps> = ({
  name,
  size = 20,
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
export const IconNames = Object.keys(iconClasses).reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<string, string>);

export default Icon;
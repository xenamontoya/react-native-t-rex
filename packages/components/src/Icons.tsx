import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Import Pro Regular icons (primary style)
import {
  faHome,
  faCalendarDays,
  faGraduationCap, 
  faUser,
  faEllipsisH,
  faChartBar,
  faChartLine,
  faClipboardList,
  faBriefcase,
  faCog,
  faBook,
  faUpload,
  faUserTie,
  faFileText,
  faComments,
  faUsers,
  faCreditCard,
  faQuestionCircle,
  faExclamationTriangle,
  faBell,
  faPlane,
  faClock,
  faMapMarkerAlt,
  faAward,
  faCheckCircle,
  faLock,
  faArrowRight,
  faChevronRight,
  faEdit,
  faPlus,
  faCheck,
  faTimes,
  faSearch,
  faFilter,
  faStar,
  faHeart,
  faShare,
  faDownload,
  faEllipsisV,
  faCopy,
  faTrash,
  faList,
  faMap,
} from '@fortawesome/pro-regular-svg-icons';

// Import Pro Solid icons (for emphasis/active states)
import {
  faHome as faHomeSolid,
  faCalendarDays as faCalendarDaysSolid,
  faGraduationCap as faGraduationCapSolid,
  faUser as faUserSolid,
  faBell as faBellSolid,
  faPlane as faPlaneSolid,
  faHeart as faHeartSolid,
  faStar as faStarSolid,
} from '@fortawesome/pro-solid-svg-icons';

// Add icons to the library
(library.add as any)(
  // Regular icons
  faHome,
  faCalendarDays,
  faGraduationCap,
  faUser,
  faEllipsisH,
  faChartBar,
  faChartLine,
  faClipboardList,
  faBriefcase,
  faCog,
  faBook,
  faUpload,
  faUserTie,
  faFileText,
  faComments,
  faUsers,
  faCreditCard,
  faQuestionCircle,
  faExclamationTriangle,
  faBell,
  faPlane,
  faClock,
  faMapMarkerAlt,
  faAward,
  faCheckCircle,
  faLock,
  faArrowRight,
  faChevronRight,
  faEdit,
  faPlus,
  faCheck,
  faTimes,
  faSearch,
  faFilter,
  faStar,
  faHeart,
  faShare,
  faDownload,
  faEllipsisV,
  faCopy,
  faTrash,
  faList,
  faMap,
  
  // Solid icons
  faHomeSolid,
  faCalendarDaysSolid,
  faGraduationCapSolid,
  faUserSolid,
  faBellSolid,
  faPlaneSolid,
  faHeartSolid,
  faStarSolid,
);

// Icon mapping for easy reference
export const IconNames = {
  // Navigation
  home: faHome,
  homeActive: faHomeSolid,
  calendar: faCalendarDays,
  calendarActive: faCalendarDaysSolid,
  graduation: faGraduationCap,
  graduationActive: faGraduationCapSolid,
  user: faUser,
  userActive: faUserSolid,
  more: faEllipsisH,
  
  // Analytics & Reports
  chartBar: faChartBar,
  chartLine: faChartLine,
  clipboard: faClipboardList,
  
  // Business & Career
  briefcase: faBriefcase,
  userTie: faUserTie,
  fileText: faFileText,
  comments: faComments,
  users: faUsers,
  
  // System & Settings
  cog: faCog,
  bell: faBell,
  bellActive: faBellSolid,
  lock: faLock,
  
  // Actions
  plus: faPlus,
  edit: faEdit,
  check: faCheck,
  times: faTimes,
  search: faSearch,
  filter: faFilter,
  upload: faUpload,
  download: faDownload,
  share: faShare,
  ellipsisV: faEllipsisV,
  copy: faCopy,
  trash: faTrash,
  list: faList,
  map: faMap,
  
  // Content
  book: faBook,
  plane: faPlane,
  planeActive: faPlaneSolid,
  clock: faClock,
  mapMarker: faMapMarkerAlt,
  award: faAward,
  checkCircle: faCheckCircle,
  creditCard: faCreditCard,
  questionCircle: faQuestionCircle,
  exclamationTriangle: faExclamationTriangle,
  
  // Arrows
  arrowRight: faArrowRight,
  chevronRight: faChevronRight,
  
  // Engagement
  star: faStar,
  starActive: faStarSolid,
  heart: faHeart,
  heartActive: faHeartSolid,
};

// Reusable Icon Component
export interface IconProps {
  name: keyof typeof IconNames;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 16, 
  color = '#6b7280', 
  style 
}) => {
  return (
    <FontAwesomeIcon
      icon={IconNames[name] as any}
      size={size}
      color={color}
      style={style}
    />
  );
};

// Navigation Icon Component (with active states)
export interface NavIconProps {
  name: 'home' | 'calendar' | 'graduation' | 'user' | 'bell' | 'plane' | 'star' | 'heart' | 'more' | 'book';
  isActive?: boolean;
  size?: number;
  color?: string;
  activeColor?: string;
  style?: any;
}

export const NavIcon: React.FC<NavIconProps> = ({ 
  name, 
  isActive = false, 
  size = 20, 
  color = '#6b7280',
  activeColor = '#212121',
  style 
}) => {
  // Handle icons that don't have active variants
  const hasActiveVariant = ['home', 'calendar', 'graduation', 'user', 'bell', 'plane', 'star', 'heart'].includes(name);
  const iconName = (isActive && hasActiveVariant) ? `${name}Active` as keyof typeof IconNames : name;
  const iconColor = isActive ? activeColor : color;
  
  return (
    <FontAwesomeIcon
      icon={IconNames[iconName] as any}
      size={size}
      color={iconColor}
      style={style}
    />
  );
};

export default Icon;

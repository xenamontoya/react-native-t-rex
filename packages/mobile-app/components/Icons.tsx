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
  faArrowLeft,
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
  faRobot,
  faInfoCircle,
  faExternalLinkAlt,
  faList,
  faMap,
  faEllipsisV,
  faCopy,
  faTrash,
  faUpload,
  faPhone,
  faMinus,
  faPlay,
  faEnvelope,
  faEye,
  faFileExcel,
  faFileCode,
  faRefresh,
  faUniversity,
  faCircle,
  faCloud,
  faThermometerHalf,
  faWind,
  faTint,
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
  faEllipsisH as faEllipsisHSolid,
} from '@fortawesome/pro-solid-svg-icons';

// Add icons to the library
library.add(
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
  faUserTie,
  faFileText,
  faComments,
  faUsers,
  faCreditCard,
  faQuestionCircle,
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
  faRobot,
  faInfoCircle,
  faExternalLinkAlt,
  faList,
  faMap,
  faEllipsisV,
  faCopy,
  faTrash,
  faArrowLeft,
  faPhone,
  faMinus,
  faPlay,
  faEnvelope,
  faEye,
  faFileExcel,
  faFileCode,
  faRefresh,
  faUniversity,
  faCircle,
  faCloud,
  faThermometerHalf,
  faWind,
  faTint,
  
  // Solid icons
  faHomeSolid,
  faCalendarDaysSolid,
  faGraduationCapSolid,
  faUserSolid,
  faBellSolid,
  faPlaneSolid,
  faHeartSolid,
  faStarSolid,
  faEllipsisHSolid,
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
  download: faDownload,
  share: faShare,
  star: faStar,
  heart: faHeart,
  
  // Content
  book: faBook,
  plane: faPlane,
  planeActive: faPlaneSolid,
  clock: faClock,
  mapMarker: faMapMarkerAlt,
  mapMarkerAlt: faMapMarkerAlt,
  fileText: faFileText,
  award: faAward,
  checkCircle: faCheckCircle,
  creditCard: faCreditCard,
  questionCircle: faQuestionCircle,
  exclamationTriangle: faExclamationTriangle,
  infoCircle: faInfoCircle,
  externalLink: faExternalLinkAlt,
  graduationCap: faGraduationCap,
  list: faList,
  map: faMap,
  ellipsisV: faEllipsisV,
  copy: faCopy,
  trash: faTrash,
  upload: faUpload,
  robot: faRobot,
  phone: faPhone,
  minus: faMinus,
  play: faPlay,
  email: faEnvelope,
  eye: faEye,
  fileExcel: faFileExcel,
  fileCode: faFileCode,
  refresh: faRefresh,
  university: faUniversity,
  circle: faCircle,
  
  // Weather
  cloud: faCloud,
  thermometer: faThermometerHalf,
  wind: faWind,
  droplet: faTint,
  
  // Arrows
  arrowRight: faArrowRight,
  arrowLeft: faArrowLeft,
  chevronRight: faChevronRight,
  
  // Engagement
  star: faStar,
  starActive: faStarSolid,
  heart: faHeart,
  heartActive: faHeartSolid,
  moreActive: faEllipsisHSolid,
};

// Reusable Icon Component
interface IconProps {
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
      icon={IconNames[name]}
      size={size}
      color={color}
      style={style}
    />
  );
};

// Navigation Icon Component (with active states)
interface NavIconProps {
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
  const hasActiveVariant = ['home', 'calendar', 'graduation', 'user', 'bell', 'plane', 'star', 'heart', 'book', 'more'].includes(name);
  const iconName = (isActive && hasActiveVariant) ? `${name}Active` as keyof typeof IconNames : name;
  const iconColor = isActive ? activeColor : color;
  
  return (
    <FontAwesomeIcon
      icon={IconNames[iconName]}
      size={size}
      color={iconColor}
      style={style}
    />
  );
};

export default Icon;

# Project T-Rex React Native Mobile App

A mobile-first React Native application for flight training management, ported from the original React web application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run web    # Web browser (for testing)
npm run ios    # iOS Simulator  
npm run android # Android Emulator
npm start      # Expo Development Server with QR code
```

## 📱 Live Demo

- **Live App**: https://react-native-t-rex.vercel.app
- **Source Code**: https://github.com/xenamontoya/react-native-t-rex

## ✨ Features

### Responsive Navigation System
- **Mobile Navigation** - Bottom tab bar with Home, Reservations, Training, Profile, More
- **Tablet Navigation** - Sidebar drawer with expanded menu access including logbook
- **Responsive Breakpoint** - Automatically switches at 768px width
- **Profile Screen** - Comprehensive pilot profile with progress, achievements, and quick actions
- **More Page** - Categorized menu items (Logbook, Careers, Account, Safety)
- **Role Switching** - Student/Instructor/Prospective experience modes

### Student Dashboard
- **Welcome Header** - Profile avatar, notifications, training progress
- **Progress Tracking** - Visual progress bars and completion statistics
- **What's Next** - AI-powered lesson preparation and scheduled lessons
- **Career Progress** - Milestone tracking towards pilot licenses
- **Recent Activity** - Completed lessons and achievements
- **Flight Statistics** - Detailed flight time breakdown

### Core Functionality
- **Reservations** - Aircraft booking and lesson scheduling
- **Training** - Lesson progress, scheduling, and completion tracking
- **Profile** - Pilot information, achievements, progress tracking, and quick actions
- **Logbook** - Flight time recording and statistics (accessible via More/sidebar)
- **More** - Extended menu with careers, settings, and account features

### Design System
- **Brand Colors** - Primary black (#212121), electric blue (#00FFF2), orange gradients
- **Typography** - Degular font family with appropriate weights
- **Professional Icons** - Font Awesome Pro with regular and solid variants
- **Mobile-First** - Optimized for touch interactions and mobile screens
- **Consistent UI** - Cards, badges, buttons following design system

### Technical Stack
- **React Native** - Cross-platform mobile development
- **React Navigation** - Professional navigation with tabs and drawer
- **Font Awesome Pro** - Professional icon system with regular and solid styles
- **Expo** - Development tooling and deployment
- **TypeScript** - Type-safe development
- **StyleSheet** - Native styling with brand colors

## 🎨 UI Components

### Welcome Section
- Profile avatar with initials
- Training progress visualization
- Real-time statistics grid

### Interactive Cards
- **What's Next** - Highlighted with electric blue border
- **AI Wingman** - Black card with electric blue accents
- **Career Progress** - Milestone tracking with progress bars
- **Recent Lessons** - Status badges and completion indicators

### Navigation
- Touch-friendly button sizes
- Proper spacing for mobile interaction
- Visual feedback on touch

## 🔄 Original React App Compatibility

This React Native app maintains **exact visual parity** with the original React web application:
- Same color scheme and branding
- Identical layout structure and information hierarchy  
- Matching typography and spacing
- Consistent user experience across platforms

## 📋 Development Status

✅ **Completed**
- Core React Native foundation
- Complete UI port from React app
- All brand colors and styling
- Interactive navigation
- Mobile-optimized components
- GitHub repository and deployment

🔄 **Next Steps**
- Real data integration
- Navigation between screens
- User authentication
- Flight logging functionality
- Lesson booking system

## 🤝 Team Review

This prototype demonstrates:
1. **React Native feasibility** for Project T-Rex mobile
2. **UI/UX consistency** with existing React app
3. **Mobile-first design** principles
4. **Technical architecture** for cross-platform development

## 📱 Testing

**Web Browser** (Development)
```bash
npm run web
# Open http://localhost:8081
# Use mobile responsive mode
```

**Mobile Device** (Recommended)
```bash
npm start
# Scan QR code with Expo Go app
```

**iOS Simulator**
```bash
npm run ios
```

**Android Emulator** 
```bash
npm run android
```

---

*Built with React Native + Expo for cross-platform mobile development*

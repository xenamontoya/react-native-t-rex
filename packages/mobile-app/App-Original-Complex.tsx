/**
 * 🚀 PROJECT T-REX - FAITHFUL REACT NATIVE CONVERSION
 * 
 * 1:1 conversion of original Project T-Rex React web app
 * Matches original role-based structure and navigation
 */

import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';

// Import original design tokens  
import { Colors, Typography, getThemeColors } from '../components/src/tokens-original';

// Import stores (like original)
import { useRoleStore } from './stores/roleStore';
import { useThemeStore } from './stores/themeStore';

// Import existing screens (preserve monorepo structure)
import HomeScreen from './screens/HomeScreen';
import TrainingScreen from './screens/TrainingScreen';
import LogbookScreen from './screens/LogbookScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MoreScreen from './screens/MoreScreen';

// Import navigation components
import { NavIcon } from '../components/src';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Role-aware home component (use existing HomeScreen for now)
function RoleAwareHome() {
  const { currentRole, isInitialized: roleInitialized, initializeStore } = useRoleStore();
  
  useEffect(() => {
    if (!roleInitialized) {
      initializeStore();
    }
  }, [roleInitialized, initializeStore]);

  if (!roleInitialized) {
    return null; // Loading...
  }

  // For now, use existing HomeScreen (we'll customize per role later)
  return <HomeScreen />;
}

// Student Tab Navigator (like original DashboardLayout + MobileBottomNav)
function StudentTabNavigator() {
  const { isDark } = useThemeStore();
  const themeColors = getThemeColors(isDark);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.electric,
        tabBarInactiveTintColor: themeColors.textMuted,
        tabBarStyle: {
          backgroundColor: themeColors.bgCard,
          borderTopColor: themeColors.border,
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: Typography.fontSize.xs,
          fontFamily: Typography.fontFamily.medium,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={RoleAwareHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="home" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.electric}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Training" 
        component={TrainingScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="graduation" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.electric}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Logbook" 
        component={LogbookScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="user" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.electric}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Reservations" 
        component={ReservationsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="calendar" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.electric}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="more" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.electric}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Instructor Tab Navigator (different layout like original)
function InstructorTabNavigator() {
  const { isDark } = useThemeStore();
  const themeColors = getThemeColors(isDark);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.electric,
        tabBarInactiveTintColor: themeColors.textMuted,
        tabBarStyle: {
          backgroundColor: themeColors.bgCard,
          borderTopColor: themeColors.border,
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={RoleAwareHome} />
      <Tab.Screen name="Students" component={MoreScreen} />
      <Tab.Screen name="Schedule" component={ReservationsScreen} />
      <Tab.Screen name="Reports" component={MoreScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

// Prospective Tab Navigator 
function ProspectiveTabNavigator() {
  const { isDark } = useThemeStore();
  const themeColors = getThemeColors(isDark);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.electric,
        tabBarInactiveTintColor: themeColors.textMuted,
        tabBarStyle: {
          backgroundColor: themeColors.bgCard,
          borderTopColor: themeColors.border,
        },
      }}
    >
      <Tab.Screen name="Explore" component={RoleAwareHome} />
      <Tab.Screen name="Programs" component={MoreScreen} />
      <Tab.Screen name="Contact" component={MoreScreen} />
      <Tab.Screen name="About" component={MoreScreen} />
    </Tab.Navigator>
  );
}

// Main App Component (like original _app.tsx + role routing)
export default function App() {
  const { width } = useWindowDimensions();
  const { currentRole } = useRoleStore();
  
  // Load fonts (original uses Degular)
  const [fontsLoaded] = useFonts({
    'Degular-Regular': require('./assets/fonts/Degular-Regular.otf'),
    'Degular-Medium': require('./assets/fonts/Degular-Medium.otf'),
    'Degular-Semibold': require('./assets/fonts/Degular-Semibold.otf'),
    'Degular-Bold': require('./assets/fonts/Degular-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Role-based navigation (like original)
  const getNavigatorForRole = () => {
    switch (currentRole) {
      case 'instructor':
        return <InstructorTabNavigator />;
      case 'prospective':
        return <ProspectiveTabNavigator />;
      default:
        return <StudentTabNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {getNavigatorForRole()}
    </NavigationContainer>
  );
}
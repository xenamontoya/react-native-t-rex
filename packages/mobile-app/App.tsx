import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';


// Import screens
import MoreScreen from './screens/MoreScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import TrainingScreen from './screens/TrainingScreen';
import LogbookScreen from './screens/LogbookScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ReservationDetailsScreen from './screens/ReservationDetailsScreen';
import LessonDetailsScreen from './screens/LessonDetailsScreen';
import StudentDetailsScreen from './screens/StudentDetailsScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import StudentReservationsScreen from './screens/StudentReservationsScreen';
import InstructorReservationsScreen from './screens/InstructorReservationsScreen';
import ProspectiveExploreScreen from './screens/ProspectiveExploreScreen';
import ProspectiveFindSchoolScreen from './screens/ProspectiveFindSchoolScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import { ToastProvider, ActionSheetProvider, ConfirmationModalProvider } from './components';
import IncidentReportScreen from './screens/IncidentReportScreen';
import BillingScreen from './screens/BillingScreen';
import CareersScreen from './screens/CareersScreen';
import EndorsementsScreen from './screens/EndorsementsScreen';
import ReportsScreen from './screens/ReportsScreen';
import AddFlightScreen from './screens/AddFlightScreen';
import PreflightChecklistScreen from './screens/PreflightChecklistScreen';
import WeatherReviewScreen from './screens/WeatherReviewScreen';
import FlightDetailsFormScreen from './screens/FlightDetailsFormScreen';
import AudioDebriefScreen from './screens/AudioDebriefScreen';
import LessonGradingScreen from './screens/LessonGradingScreen';
import FlightDetailsScreen from './screens/FlightDetailsScreen';
import WeightBalanceScreen from './screens/WeightBalanceScreen';
import FRATScreen from './screens/FRATScreen';
import AccountScreen from './screens/AccountScreen';
import CommunityScreen from './screens/CommunityScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import CareerCoachingScreen from './screens/CareerCoachingScreen';
import InterviewPrepScreen from './screens/InterviewPrepScreen';
import ResumeServicesScreen from './screens/ResumeServicesScreen';

// Import new dashboard screens
import StudentDashboardMain from './screens/StudentDashboardMain';
import InstructorDashboard from './screens/InstructorDashboard';
import ProspectiveDashboard from './screens/ProspectiveDashboard';
import ProspectiveCalculator from './screens/ProspectiveCalculator';
import InstructorMyFlights from './screens/InstructorMyFlights';

// Import custom drawer content
import CustomDrawerContent from './components/CustomDrawerContent';

// Import components from new design system  
import { Colors, Typography } from '../components/src';
import { Icon } from './components/Icons';
import StudentDashboard from './screens/StudentDashboard';

// Import role store
import { useRoleStore } from './utils/roleStore';

// Create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  const tabData = [
    { name: 'Home', icon: 'home', label: 'Home' },
    { name: 'Reservations', icon: 'calendar', label: 'Reservations' },
    { name: 'Training', icon: 'graduationCap', label: 'Training' },
    { name: 'Logbook', icon: 'book', label: 'Logbook' },
    { name: 'More', icon: 'ellipsisV', label: 'More' },
  ];

  return (
    <View style={customTabBarStyles.container}>
      {tabData.map((tab, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[index].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            style={customTabBarStyles.tab}
            onPress={onPress}
          >
            <Icon 
              name={tab.icon as any}
              size={24}
              color={isFocused ? Colors.primary.black : Colors.neutral.gray500}
            />
            <Text style={[
              customTabBarStyles.label,
              { color: isFocused ? Colors.primary.black : Colors.neutral.gray500 }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const customTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    height: 110,
    paddingBottom: 25,
    paddingTop: 10,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 14,
  },
});

// Home Screen Component - Role-aware dashboard switcher
function HomeScreen({ navigation }: any) {
  const { currentRole, initializeStore, isInitialized } = useRoleStore();

  // Initialize role store on first load
  React.useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

  // Loading state while initializing
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Return appropriate dashboard based on current role
  switch (currentRole) {
    case 'instructor':
      return <InstructorDashboard />;
    case 'prospective':
      return <ProspectiveDashboard />;
    case 'student':
    default:
      return <StudentDashboardMain />;
  }
}

// Legacy Home Screen Component (keeping for reference)
function LegacyHomeScreen({ navigation }: any) {
  const handleButtonPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  // Mock student data (matching original React app)
  const student = {
    name: 'Alex Johnson',
    progress: '75%',
    totalHours: '24.5',
    stage: 'Pre-Solo',
    course: 'Private Pilot License (PPL)',
    completedLessons: 8,
    totalFlights: 12
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Sticky Header - Welcome Only */}
      <View style={styles.stickyHeader}>
        <View style={styles.welcomeContent}>
          <View style={styles.profileSection}>
            {/* Profile Avatar */}
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>
            
            {/* Welcome Text */}
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeLabel}>Welcome back,</Text>
                  <Text style={styles.h1}>{student.name}</Text>
            </View>
          </View>

          {/* Notifications Bell */}
          <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell" size={24} color={Colors.primary.black} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Training Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.h2}>Training Progress</Text>
                <Text style={styles.courseText}>{student.course}</Text>
              </View>
              <Text style={styles.progressPercentage}>{student.progress}</Text>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: student.progress as any }]} />
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{student.totalHours}</Text>
              <Text style={styles.statLabel}>TOTAL HOURS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{student.completedLessons}</Text>
              <Text style={styles.statLabel}>LESSONS COMPLETED</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{student.totalFlights}</Text>
              <Text style={styles.statLabel}>FLIGHTS LOGGED</Text>
            </View>
          </View>
        </View>

        {/* What's Next Card */}
        <View style={styles.nextCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.h2}>What's Next</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View All Training')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* AI Preparation Card */}
          <TouchableOpacity style={styles.aiCard} onPress={() => handleButtonPress('AI Wingman')}>
            <View style={styles.aiCardContent}>
              <View style={styles.aiIcon}>
                <Icon name="robot" size={20} color={Colors.secondary.electricBlue} />
              </View>
              <View style={styles.aiTextContent}>
                <Text style={styles.h3OnDark}>Prepare with Wingman AI</Text>
                <Text style={styles.aiSubtitle}>Get ready for your Basic Maneuvers lesson</Text>
              </View>
              <Icon name="arrowRight" size={16} color={Colors.secondary.electricBlue} />
            </View>
          </TouchableOpacity>

          {/* Next Lesson */}
          <View style={styles.lessonCard}>
            <Text style={styles.h3}>Basic Maneuvers</Text>
            <Text style={styles.lessonDescription}>Straight and level, climbs, descents, turns</Text>
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Icon name="calendar" size={12} color={Colors.neutral.gray500} style={styles.metaIcon} />
                <Text style={styles.metaText}>AUG 15</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="clock" size={12} color={Colors.neutral.gray500} style={styles.metaIcon} />
                <Text style={styles.metaText}>1.8 HOURS</Text>
              </View>
            </View>
            <Text style={styles.costText}>Est. Cost: $485.00</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Scheduled</Text>
            </View>
          </View>
        </View>

        {/* Career Progress Card */}
        <View style={styles.card}>
          <Text style={styles.h2}>Career Progress</Text>
          
          {/* Current Goal */}
          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={styles.h3}>Private Pilot License</Text>
              <Text style={styles.goalStatus}>In Progress</Text>
            </View>
            <View style={styles.goalProgressBar}>
              <View style={[styles.goalProgress, { width: '61%' as any }]} />
            </View>
            <View style={styles.goalStats}>
              <Text style={styles.goalStatsText}>24.5 / 40 hours</Text>
              <Text style={styles.goalStatsText}>61% complete</Text>
            </View>
          </View>

          {/* Career Milestones */}
          <View style={styles.milestonesContainer}>
            <View style={styles.milestoneActive}>
              <View style={styles.milestoneNumber}>
                <Text style={styles.milestoneNumberText}>1</Text>
              </View>
              <Text style={styles.milestoneTitle}>Private Pilot</Text>
              <View style={styles.milestoneCurrentBadge}>
                <Text style={styles.milestoneCurrentText}>Current Goal</Text>
              </View>
            </View>
            
            <View style={styles.milestoneInactive}>
              <View style={styles.milestoneNumberInactive}>
                <Text style={styles.milestoneNumberInactiveText}>2</Text>
              </View>
              <Text style={styles.milestoneTitleInactive}>Instrument Rating</Text>
              <View style={styles.milestoneRequirementBadge}>
                <Text style={styles.milestoneRequirementText}>250+ hrs</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.h2}>Recent Lessons</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View All Lessons')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentLesson}>
            <Text style={styles.recentLessonTitle}>First Flight - Familiarization</Text>
            <Text style={styles.recentLessonDescription}>Aircraft familiarization and basic controls</Text>
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Icon name="calendar" size={12} color={Colors.neutral.gray500} style={styles.metaIcon} />
                <Text style={styles.metaText}>OCT 01</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="clock" size={12} color={Colors.neutral.gray500} style={styles.metaIcon} />
                <Text style={styles.metaText}>1.5 HOURS</Text>
              </View>
            </View>
            <View style={styles.completeBadge}>
              <Text style={styles.completeText}>Complete</Text>
            </View>
          </View>
        </View>

        {/* Flight Statistics */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.h2}>Flight Statistics</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View Logbook')}>
              <Text style={styles.viewAllText}>View Logbook →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Icon name="clock" size={16} color={Colors.neutral.gray600} style={styles.statIconSpacing} />
                <Text style={styles.statRowLabel}>Total Flight Time</Text>
              </View>
              <Text style={styles.statRowValue}>24.5 hrs</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Icon name="userTie" size={16} color={Colors.neutral.gray600} style={styles.statIconSpacing} />
                <Text style={styles.statRowLabel}>Dual Instruction</Text>
              </View>
              <Text style={styles.statRowValue}>22.1 hrs</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Icon name="plane" size={16} color={Colors.neutral.gray600} style={styles.statIconSpacing} />
                <Text style={styles.statRowLabel}>Solo Time</Text>
              </View>
              <Text style={styles.statRowValue}>2.4 hrs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Bottom Tab Navigator for Mobile
function MobileTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} />
      <Tab.Screen name="Training" component={TrainingScreen} />
      <Tab.Screen name="Logbook" component={LogbookScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
             {/* Hidden detail screens for navigation */}
             <Tab.Screen 
               name="ReservationDetails" 
               component={ReservationDetailsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="FlightDetails" 
               component={FlightDetailsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="LessonDetails" 
               component={LessonDetailsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="StudentDetails" 
               component={StudentDetailsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="JobDetails" 
               component={JobDetailsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="StudentReservations" 
               component={StudentReservationsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="InstructorReservations" 
               component={InstructorReservationsScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="ProspectiveExplore" 
               component={ProspectiveExploreScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="ProspectiveFindSchool" 
               component={ProspectiveFindSchoolScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="AddFlight" 
               component={AddFlightScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
             <Tab.Screen 
               name="PreflightChecklist" 
               component={PreflightChecklistScreen}
               options={{
                 tabBarButton: () => null, // Hide from tab bar
               }}
             />
        <Tab.Screen
          name="WeatherReview"
          component={WeatherReviewScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="FlightDetailsForm"
          component={FlightDetailsFormScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="WeightBalance"
          component={WeightBalanceScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="FRAT"
          component={FRATScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Endorsements"
          component={EndorsementsScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Help"
          component={HelpScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="IncidentReport"
          component={IncidentReportScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Careers"
          component={CareersScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Billing"
          component={BillingScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="Documents"
          component={DocumentsScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="CareerCoaching"
          component={CareerCoachingScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="InterviewPrep"
          component={InterviewPrepScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="ResumeServices"
          component={ResumeServicesScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="ProspectiveCalculator"
          component={ProspectiveCalculator}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="InstructorMyFlights"
          component={InstructorMyFlights}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="AudioDebrief"
          component={AudioDebriefScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
        <Tab.Screen
          name="LessonGrading"
          component={LessonGradingScreen}
          options={{
            tabBarButton: () => null, // Hide from tab bar
          }}
        />
    </Tab.Navigator>
  );
}

// Drawer Navigator for Tablet
function TabletDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.primary.white,
          width: 280,
        },
        drawerType: 'permanent', // Always visible on tablet
        overlayColor: 'transparent', // No overlay since it's permanent
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Reservations" component={ReservationsScreen} />
      <Drawer.Screen name="Training" component={TrainingScreen} />
      <Drawer.Screen name="Logbook" component={LogbookScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="More" component={MoreScreen} />
             <Drawer.Screen name="Notifications" component={NotificationsScreen} />
             {/* Detail screens for navigation */}
             <Drawer.Screen name="ReservationDetails" component={ReservationDetailsScreen} />
             <Drawer.Screen name="FlightDetails" component={FlightDetailsScreen} />
             <Drawer.Screen name="LessonDetails" component={LessonDetailsScreen} />
             <Drawer.Screen name="StudentDetails" component={StudentDetailsScreen} />
             <Drawer.Screen name="JobDetails" component={JobDetailsScreen} />
             <Drawer.Screen name="StudentReservations" component={StudentReservationsScreen} />
             <Drawer.Screen name="InstructorReservations" component={InstructorReservationsScreen} />
             <Drawer.Screen name="ProspectiveExplore" component={ProspectiveExploreScreen} />
             <Drawer.Screen name="ProspectiveFindSchool" component={ProspectiveFindSchoolScreen} />
             <Drawer.Screen name="AddFlight" component={AddFlightScreen} />
             <Drawer.Screen name="PreflightChecklist" component={PreflightChecklistScreen} />
      <Drawer.Screen name="WeatherReview" component={WeatherReviewScreen} />
      <Drawer.Screen name="FlightDetailsForm" component={FlightDetailsFormScreen} />
      <Drawer.Screen name="WeightBalance" component={WeightBalanceScreen} />
      <Drawer.Screen name="FRAT" component={FRATScreen} />
      {/* Additional screens for sidebar navigation */}
             <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
             <Drawer.Screen name="Reports" component={ReportsScreen} />
             <Drawer.Screen name="Endorsements" component={EndorsementsScreen} />
             <Drawer.Screen name="Careers" component={CareersScreen} />
             <Drawer.Screen name="Settings" component={SettingsScreen} />
             <Drawer.Screen name="Billing" component={BillingScreen} />
             <Drawer.Screen name="Help" component={HelpScreen} />
             <Drawer.Screen name="IncidentReport" component={IncidentReportScreen} />
             <Drawer.Screen name="Account" component={AccountScreen} />
             <Drawer.Screen name="Community" component={CommunityScreen} />
             <Drawer.Screen name="Documents" component={DocumentsScreen} />
             <Drawer.Screen name="CareerCoaching" component={CareerCoachingScreen} />
             <Drawer.Screen name="InterviewPrep" component={InterviewPrepScreen} />
             <Drawer.Screen name="ResumeServices" component={ResumeServicesScreen} />
             <Drawer.Screen name="ProspectiveCalculator" component={ProspectiveCalculator} />
             <Drawer.Screen name="InstructorMyFlights" component={InstructorMyFlights} />
             <Drawer.Screen name="AudioDebrief" component={AudioDebriefScreen} />
             <Drawer.Screen name="LessonGrading" component={LessonGradingScreen} />
    </Drawer.Navigator>
  );
}

// Main App Component with Responsive Navigation
export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Use drawer navigation on tablet sizes

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Degular-Regular': require('./assets/fonts/Degular-Regular.otf'),
    'Degular-Medium': require('./assets/fonts/Degular-Medium.otf'),
    'Degular-Semibold': require('./assets/fonts/Degular-Semibold.otf'),
    'Degular-Bold': require('./assets/fonts/Degular-Bold.otf'),
    'Degular-Black': require('./assets/fonts/Degular-Black.otf'),
    'DegularMono-Regular': require('./assets/fonts/DegularMono-Regular.otf'),
    'DegularMono-Medium': require('./assets/fonts/DegularMono-Medium.otf'),
    'DegularMono-Semibold': require('./assets/fonts/DegularMono-Semibold.otf'),
    'DegularMono-Bold': require('./assets/fonts/DegularMono-Bold.otf'),
  });

  // Show loading screen while fonts load
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ToastProvider>
      <ActionSheetProvider>
        <ConfirmationModalProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            {isTablet ? <TabletDrawerNavigator /> : <MobileTabNavigator />}
          </NavigationContainer>
        </ConfirmationModalProvider>
      </ActionSheetProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  
  // Sticky Header Styles
  stickyHeader: {
    backgroundColor: Colors.neutral.gray50,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    lineHeight: 22,
  },
  studentName: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginTop: -2,
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  
  // Progress Card
  progressCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Progress Section
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  courseText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  progressPercentage: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.secondary.orange2,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.secondary.orange1,
    borderRadius: 4,
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  // Heading Hierarchy
  h1: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  h2: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  h3: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  // Color variations for dark backgrounds
  h1OnDark: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  h2OnDark: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  h3OnDark: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
    marginTop: 4,
    textAlign: 'center',
  },
  
  // Content Area
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  
  // Card Styles
  card: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.tertiary.denimBlue,
  },
  
  // What's Next Card
  nextCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    borderStyle: 'solid',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // AI Card
  aiCard: {
    backgroundColor: Colors.primary.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.black,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiTextContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Lesson Card
  lessonCard: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    position: 'relative',
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
  },
  costText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: '#008333',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#C44510',
  },
  
  // Career Progress
  goalSection: {
    marginBottom: 24,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  goalStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondary.orange2,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    marginBottom: 8,
  },
  goalProgress: {
    height: 8,
    backgroundColor: Colors.secondary.orange1,
    borderRadius: 4,
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalStatsText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  
  // Milestones
  milestonesContainer: {
    gap: 12,
  },
  milestoneActive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    borderStyle: 'solid',
  },
  milestoneNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  milestoneNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary.black,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.black,
    flex: 1,
  },
  milestoneCurrentBadge: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  milestoneCurrentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C44510',
  },
  milestoneInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  milestoneNumberInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  milestoneNumberInactiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.neutral.gray600,
  },
  milestoneTitleInactive: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  milestoneRequirementBadge: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  milestoneRequirementText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral.gray600,
  },
  
  // Recent Lessons
  recentLesson: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  recentLessonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  recentLessonDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  completeBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#004D47',
  },
  
  // Flight Statistics
  statsContainer: {
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  statRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  statIconSpacing: {
    marginRight: 8,
  },
  statRowLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  statRowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
  },
});

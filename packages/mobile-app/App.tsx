import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import MoreScreen from './screens/MoreScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import TrainingScreen from './screens/TrainingScreen';
import LogbookScreen from './screens/LogbookScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import custom drawer content
import CustomDrawerContent from './components/CustomDrawerContent';

// Import icon components
import { NavIcon } from './components/Icons';

// Project T-Rex Brand Colors
const Colors = {
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F', 
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },
  neutral: {
    gray50: '#f9fafb',
    gray200: '#e5e7eb',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

// Create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Home Screen Component (our existing dashboard)
function HomeScreen() {
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
      
      {/* Welcome Header */}
      <View style={styles.welcomeHeader}>
        <View style={styles.welcomeContent}>
          <View style={styles.profileSection}>
            {/* Profile Avatar */}
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>
            
            {/* Welcome Text */}
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeLabel}>Welcome back,</Text>
              <Text style={styles.studentName}>{student.name}</Text>
            </View>
          </View>

          {/* Notifications Bell */}
          <TouchableOpacity style={styles.notificationButton} onPress={() => handleButtonPress('Notifications')}>
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Training Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Training Progress</Text>
              <Text style={styles.courseText}>{student.course}</Text>
            </View>
            <Text style={styles.progressPercentage}>{student.progress}</Text>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: student.progress }]} />
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* What's Next Card */}
        <View style={styles.nextCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>What's Next</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View All Training')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* AI Preparation Card */}
          <TouchableOpacity style={styles.aiCard} onPress={() => handleButtonPress('AI Wingman')}>
            <View style={styles.aiCardContent}>
              <View style={styles.aiIcon}>
                <Text style={styles.aiIconText}>🤖</Text>
              </View>
              <View style={styles.aiTextContent}>
                <Text style={styles.aiTitle}>Prepare with Wingman AI</Text>
                <Text style={styles.aiSubtitle}>Get ready for your Basic Maneuvers lesson</Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Next Lesson */}
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Basic Maneuvers</Text>
            <Text style={styles.lessonDescription}>Straight and level, climbs, descents, turns</Text>
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>📅 AUG 15</Text>
              <Text style={styles.metaText}>⏰ 1.8 HOURS</Text>
            </View>
            <Text style={styles.costText}>Est. Cost: $485.00</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Scheduled</Text>
            </View>
          </View>
        </View>

        {/* Career Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Career Progress</Text>
          
          {/* Current Goal */}
          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Private Pilot License</Text>
              <Text style={styles.goalStatus}>In Progress</Text>
            </View>
            <View style={styles.goalProgressBar}>
              <View style={[styles.goalProgress, { width: '61%' }]} />
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
            <Text style={styles.cardTitle}>Recent Lessons</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View All Lessons')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentLesson}>
            <Text style={styles.recentLessonTitle}>First Flight - Familiarization</Text>
            <Text style={styles.recentLessonDescription}>Aircraft familiarization and basic controls</Text>
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>📅 OCT 01</Text>
              <Text style={styles.metaText}>⏰ 1.5 HOURS</Text>
            </View>
            <View style={styles.completeBadge}>
              <Text style={styles.completeText}>Complete</Text>
            </View>
          </View>
        </View>

        {/* Flight Statistics */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Flight Statistics</Text>
            <TouchableOpacity onPress={() => handleButtonPress('View Logbook')}>
              <Text style={styles.viewAllText}>View Logbook →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Text style={styles.statIcon}>⏰</Text>
                <Text style={styles.statRowLabel}>Total Flight Time</Text>
              </View>
              <Text style={styles.statRowValue}>24.5 hrs</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Text style={styles.statIcon}>👨‍🏫</Text>
                <Text style={styles.statRowLabel}>Dual Instruction</Text>
              </View>
              <Text style={styles.statRowValue}>22.1 hrs</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statRowContent}>
                <Text style={styles.statIcon}>✈️</Text>
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
        tabBarActiveTintColor: Colors.primary.black,
        tabBarInactiveTintColor: Colors.neutral.gray500,
        tabBarStyle: {
          backgroundColor: Colors.primary.white,
          borderTopWidth: 1,
          borderTopColor: Colors.neutral.gray200,
          height: 100,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="home" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.primary.black}
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
              activeColor={Colors.primary.black}
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
              activeColor={Colors.primary.black}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <NavIcon 
              name="user" 
              isActive={focused}
              size={24}
              color={color}
              activeColor={Colors.primary.black}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <NavIcon 
              name="more" 
              size={24}
              color={color}
            />
          ),
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
      {/* Additional screens for sidebar navigation */}
      <Drawer.Screen name="Analytics" component={MoreScreen} />
      <Drawer.Screen name="Reports" component={MoreScreen} />
      <Drawer.Screen name="Endorsements" component={MoreScreen} />
      <Drawer.Screen name="Careers" component={MoreScreen} />
      <Drawer.Screen name="Settings" component={MoreScreen} />
      <Drawer.Screen name="Profile" component={MoreScreen} />
      <Drawer.Screen name="Billing" component={MoreScreen} />
      <Drawer.Screen name="Help" component={MoreScreen} />
      <Drawer.Screen name="IncidentReport" component={MoreScreen} />
    </Drawer.Navigator>
  );
}

// Main App Component with Responsive Navigation
export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Use drawer navigation on tablet sizes

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isTablet ? <TabletDrawerNavigator /> : <MobileTabNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  
  // Welcome Header Styles
  welcomeHeader: {
    backgroundColor: Colors.neutral.gray50,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    backgroundColor: Colors.tertiary.denimBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.white,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 18,
    color: Colors.neutral.gray500,
    lineHeight: 22,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginTop: -2,
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
  },
  bellIcon: {
    fontSize: 24,
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
    fontWeight: 'bold',
    color: Colors.primary.white,
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
    fontWeight: '600',
    color: Colors.primary.black,
  },
  courseText: {
    fontSize: 14,
    color: Colors.neutral.gray500,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
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
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.neutral.gray500,
    marginTop: 4,
    textAlign: 'center',
  },
  
  // Content Area
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
    fontWeight: '600',
    color: Colors.primary.black,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.tertiary.denimBlue,
  },
  
  // What's Next Card
  nextCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiIconText: {
    fontSize: 20,
  },
  aiTextContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.white,
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  arrowIcon: {
    fontSize: 16,
    color: Colors.secondary.electricBlue,
    fontWeight: 'bold',
  },
  
  // Lesson Card
  lessonCard: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    border: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    position: 'relative',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginRight: 16,
    fontWeight: '500',
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: Colors.neutral.gray300,
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

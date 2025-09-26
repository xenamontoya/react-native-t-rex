import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image,
  Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

// Import stores
import { useRoleStore, roleConfig } from '../utils/roleStore';
import { usePhaseStore, phaseConfig, type Phase } from '../utils/phaseStore';

// Mock theme store for mobile
const useThemeStore = () => ({
  isDark: false,
  toggleTheme: () => {}
});

export default function MoreScreen({ navigation }: any) {
  const { isDark } = useThemeStore();
  const { currentRole, setRole, initializeStore, isInitialized } = useRoleStore();
  const { currentPhase, setPhase, initializeStore: initializePhaseStore, isInitialized: isPhaseInitialized } = usePhaseStore();
  const [showDeveloperOptions, setShowDeveloperOptions] = useState(false);
  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
    if (!isPhaseInitialized) {
      initializePhaseStore();
    }
  }, [isInitialized, initializeStore, isPhaseInitialized, initializePhaseStore]);



  const handleNavigation = (path: string) => {
    // Convert web routes to mobile navigation
    const routeMap: { [key: string]: string } = {
      '/analytics': 'Analytics',
      '/reports': 'Reports', 
      '/endorsements': 'Endorsements',
      '/careers': 'Careers',
      '/career-coaching': 'CareerCoaching',
      '/resume-services': 'ResumeServices',
      '/interview-prep': 'InterviewPrep',
      '/community': 'Community',
      '/billing': 'Billing',
      '/settings': 'Settings',
      '/help': 'Help',
      '/incident-report': 'IncidentReport',
      '/profile': 'Profile',
      '/logbook': 'Logbook',
      '/student/my-flights?import=true': 'Logbook', // Import flights goes to logbook
      '/my-flights?import=true': 'Logbook',
      '/component-library': 'ComponentLibrary',
      '/home': 'Home' // Add missing home route mapping
    };

    // Handle component library with section parameters
    if (path.startsWith('/component-library')) {
      const urlParams = new URLSearchParams(path.split('?')[1] || '');
      const section = urlParams.get('section') || 'overview';
      navigation?.navigate('ComponentLibrary', { section });
      return;
    }

    const screen = routeMap[path];
    console.log('MoreScreen: handleNavigation called with path:', path, '-> screen:', screen);
    if (screen) {
      console.log('MoreScreen: Navigating to screen:', screen);
      navigation?.navigate(screen);
    } else {
      console.log('MoreScreen: No route mapping found for path:', path);
      Alert.alert('Coming Soon', 'This feature will be available in a future update.');
    }
  };

  const handleRoleSwitch = (role: 'student' | 'instructor' | 'prospective') => {
    setRole(role);
    Alert.alert('Role Changed', `Switched to ${roleConfig[role].title} experience`);
  };

  const handlePhaseSwitch = (phase: Phase) => {
    setPhase(phase);
    Alert.alert('Phase Changed', `Switched to ${phaseConfig[phase].title}`);
  };


  const menuCategories = [
    {
      title: 'Logbook',
      items: [
        {
          icon: 'chartLine',
          title: 'Analytics',
          description: 'View comprehensive flight statistics and trends',
          path: '/analytics',
          color: 'text-gray-600'
        },
        {
          icon: 'chartBar',
          title: 'Reports',
          description: 'Generate custom flight reports and summaries',
          path: '/reports',
          color: 'text-gray-600'
        },
        {
          icon: 'fileText',
          title: 'Endorsements',
          description: 'View your pilot endorsements and qualifications',
          path: '/endorsements',
          color: 'text-gray-600'
        },
        {
          icon: 'upload',
          title: 'Import Flights',
          description: 'Import flights from external logbooks and apps',
          path: currentRole === 'instructor' ? '/instructor/my-flights?import=true' : 
                currentRole === 'student' ? '/student/my-flights?import=true' : '/my-flights?import=true',
          color: 'text-gray-600'
        }
      ]
    },
    {
      title: 'Careers',
      items: [
        {
          icon: 'briefcase',
          title: 'Job Dashboard',
          description: 'Explore career opportunities and track progress',
          path: '/careers',
          color: 'text-gray-600'
        },
        {
          icon: 'user',
          title: 'Career Coaching',
          description: 'One-on-one personalized career guidance',
          path: '/career-coaching',
          color: 'text-gray-600'
        },
        {
          icon: 'fileText',
          title: 'Resume & Cover Letter',
          description: 'Professional writing services for aviation careers',
          path: '/resume-services',
          color: 'text-gray-600'
        },
        {
          icon: 'comments',
          title: 'Interview Preparation',
          description: 'Customized prep for airline and corporate interviews',
          path: '/interview-prep',
          color: 'text-gray-600'
        },
        {
          icon: 'users',
          title: 'Community',
          description: 'Connect with pilots and stay updated with industry news',
          path: '/community',
          color: 'text-gray-600'
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: 'creditCard',
          title: 'Billing',
          description: 'Manage your training package and financing',
          path: '/billing',
          color: 'text-gray-600'
        },
        {
          icon: 'cog',
          title: 'Settings',
          description: 'Manage your account and app preferences',
          path: '/settings',
          color: 'text-gray-600'
        },
        {
          icon: 'questionCircle',
          title: 'Help & Support',
          description: 'Get help and contact support',
          path: '/help',
          color: 'text-gray-600'
        }
      ]
    },
    {
      title: 'Safety',
      items: [
        {
          icon: 'exclamationTriangle',
          title: 'Submit an Incident Report',
          description: 'Anonymously report an incident or safety issue',
          path: '/incident-report',
          color: 'text-gray-600'
        }
      ]
    }
  ];



  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
          <View style={styles.profileSection}>
            {/* Profile Picture */}
            <Image 
              source={{ uri: 'https://i.pravatar.cc/64?seed=Alex Johnson' }}
              style={styles.profileImage}
            />
            
            {/* User Info */}
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: isDark ? '#ffffff' : '#111827' }]}>
                Alex Johnson
              </Text>
              <Text style={[styles.profileDetails, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                Student Pilot • Phoenix, AZ
              </Text>
              
              {/* View Profile Button */}
              <TouchableOpacity
                onPress={() => handleNavigation('/profile')}
                style={[styles.profileButton, { backgroundColor: isDark ? '#404040' : '#f3f4f6' }]}
              >
                <Text style={[styles.profileButtonText, { color: isDark ? '#ffffff' : '#374151' }]}>
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>

            {/* Developer Options Toggle */}
            <TouchableOpacity
              onPress={() => setShowDeveloperOptions(!showDeveloperOptions)}
              style={[
                styles.developerToggle, 
                { backgroundColor: isDark ? '#404040' : '#f3f4f6' }
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View 
                style={{ 
                  transform: [{ rotate: showDeveloperOptions ? '270deg' : '90deg' }]
                }}
              >
                <Icon 
                  name="chevronRight" 
                  size={16} 
                  color={isDark ? '#a0a0a0' : '#6b7280'}
                />
              </View>
            </TouchableOpacity>
          </View>

        </View>
        
        {/* Navigation - Always shows full app menu */}
        <View style={styles.menuSections}>
          {(() => {
            console.log('MoreScreen: RENDER - Always showing FULL APP MENU (component library nav is in hamburger menu)');
            return null;
          })()}
          {menuCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.menuSection}>
              {/* Category Header */}
              <Text style={[styles.sectionTitle, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                {category.title.toUpperCase()}
              </Text>

              {/* Category Items */}
              <View style={styles.menuItems}>
                {category.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={() => handleNavigation(item.path)}
                    style={[
                      styles.menuItem,
                      {
                        backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                        borderColor: isDark ? '#404040' : '#e5e7eb'
                      }
                    ]}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.menuItemIcon, { backgroundColor: isDark ? '#404040' : '#f9fafb' }]}>
                        <Icon
                          name={item.icon as any}
                          size={16}
                          color={isDark ? '#a0a0a0' : '#6b7280'}
                        />
                      </View>
                      <View style={styles.menuItemText}>
                        <Text style={[styles.menuItemTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                          {item.title}
                        </Text>
                        <Text style={[styles.menuItemDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        

        {/* Bottom Padding for Tab Navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Developer Options Modal */}
      <Modal
        visible={showDeveloperOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeveloperOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDeveloperOptions(false)}
        >
          <View style={[styles.developerModal, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#ffffff' : '#111827' }]}>Developer Options</Text>
            
            {/* Mode Switcher */}
            <View style={styles.modalSection}>
              <Text style={[styles.modalSectionTitle, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                SWITCH INTERFACE
              </Text>
              <TouchableOpacity
                style={[styles.modalMenuItem, { backgroundColor: isDark ? '#333333' : '#f9fafb' }]}
                onPress={async () => {
                  setShowDeveloperOptions(false);
                  try {
                    // Always switch to Component Library from MoreScreen (prototype)
                    console.log('MoreScreen: Switching to Component Library mode');
                    
                    // Set AsyncStorage to component library mode
                    await AsyncStorage.removeItem('componentLibraryMode');
                    await AsyncStorage.setItem('componentLibraryMode', 'true');
                    console.log('MoreScreen: AsyncStorage updated to true, navigating to component library');
                    
                    handleNavigation('/component-library');
                  } catch (error) {
                    console.error('MoreScreen: Error switching to component library:', error);
                  }
                }}
              >
                <View style={[styles.modalMenuIcon, { backgroundColor: isDark ? '#555555' : '#e5e7eb' }]}>
                  <Icon
                    name="bookOpen"
                    size={16}
                    color={isDark ? '#a0a0a0' : '#6b7280'}
                  />
                </View>
                <View style={styles.modalMenuContent}>
                  <Text style={[styles.modalMenuTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                    Switch to Component Library
                  </Text>
                  <Text style={[styles.modalMenuDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                    View design system & components
                  </Text>
                </View>
                <Icon
                  name="arrowRight"
                  size={18}
                  color={isDark ? '#555555' : '#d1d5db'}
                />
              </TouchableOpacity>
            </View>

            {/* Always show prototype sections */}
                {/* Experience Mode */}
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                    EXPERIENCE MODE
                  </Text>
                  {Object.entries(roleConfig).map(([role, config]) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.modalMenuItem,
                        { 
                          backgroundColor: currentRole === role 
                            ? `${config.color}10` 
                            : (isDark ? '#333333' : '#f9fafb')
                        }
                      ]}
                      onPress={() => {
                        setShowDeveloperOptions(false);
                        handleRoleSwitch(role as any);
                      }}
                    >
                      <View style={[
                        styles.modalMenuIcon,
                        { 
                          backgroundColor: currentRole === role 
                            ? `${config.color}20` 
                            : (isDark ? '#555555' : '#e5e7eb')
                        }
                      ]}>
                        <Icon
                          name={
                            role === 'student' ? 'graduationCap' : 
                            role === 'instructor' ? 'userTie' : 'search'
                          }
                          size={16}
                          color={currentRole === role ? config.color : (isDark ? '#a0a0a0' : '#6b7280')}
                        />
                      </View>
                      <View style={styles.modalMenuContent}>
                        <Text style={[styles.modalMenuTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                          {config.title}
                        </Text>
                        <Text style={[styles.modalMenuDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                          {config.description}
                        </Text>
                      </View>
                      <Icon
                        name={currentRole === role ? 'checkCircle' : 'check'}
                        size={18}
                        color={currentRole === role ? config.color : (isDark ? '#555555' : '#d1d5db')}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Development Phase */}
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                    DEVELOPMENT PHASE
                  </Text>
                  {(Object.keys(phaseConfig) as Phase[]).map((phase) => (
                    <TouchableOpacity
                      key={phase}
                      style={[
                        styles.modalMenuItem,
                        { 
                          backgroundColor: currentPhase === phase 
                            ? `${phaseConfig[phase].color}10` 
                            : (isDark ? '#333333' : '#f9fafb')
                        }
                      ]}
                      onPress={() => {
                        setShowDeveloperOptions(false);
                        handlePhaseSwitch(phase);
                      }}
                    >
                      <View style={[
                        styles.modalMenuIcon,
                        { 
                          backgroundColor: currentPhase === phase 
                            ? `${phaseConfig[phase].color}20` 
                            : (isDark ? '#555555' : '#e5e7eb')
                        }
                      ]}>
                        <Text style={[
                          styles.modalPhaseNumber,
                          { color: currentPhase === phase ? phaseConfig[phase].color : (isDark ? '#a0a0a0' : '#6b7280') }
                        ]}>
                          {phase.replace('phase', '')}
                        </Text>
                      </View>
                      <View style={styles.modalMenuContent}>
                        <Text style={[styles.modalMenuTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                          {phaseConfig[phase].title}
                        </Text>
                        <Text style={[styles.modalMenuDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                          {phaseConfig[phase].description}
                        </Text>
                      </View>
                      <Icon
                        name={currentPhase === phase ? 'checkCircle' : 'check'}
                        size={18}
                        color={currentPhase === phase ? phaseConfig[phase].color : (isDark ? '#555555' : '#d1d5db')}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  
  // Card styles (used for all sections)
  card: {
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  
  // Profile Section
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    marginRight: 12, // Ensure space for the dropdown toggle on tablet
  },
  profileName: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    marginBottom: 12,
  },
  profileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  profileButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Menu Sections
  menuSections: {
    marginBottom: 20,
  },
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 12,
    marginHorizontal: 24,
    letterSpacing: 1,
  },
  menuItems: {
    marginHorizontal: 24,
    gap: 8,
  },
  menuItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
  },
  
  // Role Selector
  
  // Testing URLs
  testingSection: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  testingText: {
    fontSize: 12,
    marginBottom: 8,
  },
  testingUrls: {
    gap: 4,
  },
  testingUrl: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.mono,
  },
  testingBold: {
    fontFamily: Typography.fontFamily.bold,
  },


  // Developer options styles
  developerToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Prevent the button from being squeezed out on tablet
  },


  bottomPadding: {
    height: 100,
  },

  // Modal Styles (positioned relative to dropdown trigger)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80, // Reduced to give more space for taller modal
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40, // Add bottom padding for safety
  },
  developerModal: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    maxWidth: 320,
    width: '90%',
    maxHeight: '85%', // Increased from 70% to 85% to fit all content
    backgroundColor: Colors.neutral.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semibold,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
    color: Colors.neutral.gray600,
  },
  modalMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: Colors.neutral.gray50,
  },
  modalMenuIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: Colors.neutral.gray200,
  },
  modalMenuContent: {
    flex: 1,
  },
  modalMenuTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 2,
  },
  modalMenuDescription: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
  },
  modalPhaseNumber: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
  },
});

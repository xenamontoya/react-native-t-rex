import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image 
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors } from '../../components/src';

// Import stores
import { useRoleStore, roleConfig } from '../utils/roleStore';

// Mock theme store for mobile
const useThemeStore = () => ({
  isDark: false,
  toggleTheme: () => {}
});

export default function MoreScreen({ navigation }: any) {
  const { isDark } = useThemeStore();
  const { currentRole, setRole, initializeStore, isInitialized } = useRoleStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

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
      '/my-flights?import=true': 'Logbook'
    };

    const screen = routeMap[path];
    if (screen) {
      navigation?.navigate(screen);
    } else {
      Alert.alert('Coming Soon', 'This feature will be available in a future update.');
    }
  };

  const handleRoleSwitch = (role: 'student' | 'instructor' | 'prospective') => {
    setRole(role);
    // Navigate back to Home to show the new dashboard
    navigation.navigate('Home');
    Alert.alert('Role Changed', `Switched to ${roleConfig[role].title} experience`);
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

  // Role Selector Component  
  const RoleSelector = () => (
    <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
      <Text style={[styles.cardTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
        Experience Mode
      </Text>
      <Text style={[styles.cardDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
        Switch between different user experiences for testing and prototyping purposes.
      </Text>
      
      <View style={styles.roleOptions}>
        {/* Student Mode */}
        <TouchableOpacity 
          style={[
            styles.roleOption,
            { 
              borderColor: currentRole === 'student' ? '#3b82f6' : (isDark ? '#404040' : '#e5e7eb'),
              backgroundColor: currentRole === 'student' 
                ? (isDark ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff')
                : (isDark ? '#333333' : '#ffffff')
            }
          ]}
          onPress={() => handleRoleSwitch('student')}
        >
          <View style={styles.roleOptionContent}>
            <View style={styles.roleOptionLeft}>
              <View style={[
                styles.roleIcon,
                { 
                  backgroundColor: currentRole === 'student' 
                    ? (isDark ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe')
                    : (isDark ? '#555555' : '#f3f4f6')
                }
              ]}>
                <Icon 
                  name="graduationCap" 
                  size={20} 
                  color={currentRole === 'student' ? '#3b82f6' : Colors.neutral.gray500} 
                />
              </View>
              <View style={styles.roleTextContent}>
                <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  {roleConfig.student.title}
                </Text>
                <Text style={[styles.roleDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  {roleConfig.student.description}
                </Text>
              </View>
            </View>
            <Icon 
              name={currentRole === 'student' ? 'toggleOn' : 'toggleOff'} 
              size={24} 
              color={currentRole === 'student' ? '#3b82f6' : Colors.neutral.gray400} 
            />
          </View>
        </TouchableOpacity>

        {/* Instructor Mode */}
        <TouchableOpacity 
          style={[
            styles.roleOption,
            { 
              borderColor: currentRole === 'instructor' ? '#FE652A' : (isDark ? '#404040' : '#e5e7eb'),
              backgroundColor: currentRole === 'instructor' 
                ? (isDark ? 'rgba(254, 101, 42, 0.1)' : 'rgba(254, 101, 42, 0.1)')
                : (isDark ? '#333333' : '#ffffff')
            }
          ]}
          onPress={() => handleRoleSwitch('instructor')}
        >
          <View style={styles.roleOptionContent}>
            <View style={styles.roleOptionLeft}>
              <View style={[
                styles.roleIcon,
                { 
                  backgroundColor: currentRole === 'instructor' 
                    ? (isDark ? 'rgba(254, 101, 42, 0.2)' : 'rgba(254, 101, 42, 0.2)')
                    : (isDark ? '#555555' : '#f3f4f6')
                }
              ]}>
                <Icon 
                  name="userTie" 
                  size={20} 
                  color={currentRole === 'instructor' ? '#FE652A' : Colors.neutral.gray500} 
                />
              </View>
              <View style={styles.roleTextContent}>
                <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  {roleConfig.instructor.title}
                </Text>
                <Text style={[styles.roleDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  {roleConfig.instructor.description}
                </Text>
              </View>
            </View>
            <Icon 
              name={currentRole === 'instructor' ? 'toggleOn' : 'toggleOff'} 
              size={24} 
              color={currentRole === 'instructor' ? '#FE652A' : Colors.neutral.gray400} 
            />
          </View>
        </TouchableOpacity>

        {/* Prospective Mode */}
        <TouchableOpacity 
          style={[
            styles.roleOption,
            { 
              borderColor: currentRole === 'prospective' ? '#8b5cf6' : (isDark ? '#404040' : '#e5e7eb'),
              backgroundColor: currentRole === 'prospective' 
                ? (isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)')
                : (isDark ? '#333333' : '#ffffff')
            }
          ]}
          onPress={() => handleRoleSwitch('prospective')}
        >
          <View style={styles.roleOptionContent}>
            <View style={styles.roleOptionLeft}>
              <View style={[
                styles.roleIcon,
                { 
                  backgroundColor: currentRole === 'prospective' 
                    ? (isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)')
                    : (isDark ? '#555555' : '#f3f4f6')
                }
              ]}>
                <Icon 
                  name="search" 
                  size={20} 
                  color={currentRole === 'prospective' ? '#8b5cf6' : Colors.neutral.gray500} 
                />
              </View>
              <View style={styles.roleTextContent}>
                <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  {roleConfig.prospective.title}
                </Text>
                <Text style={[styles.roleDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  {roleConfig.prospective.description}
                </Text>
              </View>
            </View>
            <Icon 
              name={currentRole === 'prospective' ? 'toggleOn' : 'toggleOff'} 
              size={24} 
              color={currentRole === 'prospective' ? '#8b5cf6' : Colors.neutral.gray400} 
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Testing URLs */}
      <View style={[styles.testingSection, { backgroundColor: isDark ? '#404040' : '#f9fafb' }]}>
        <Text style={[styles.testingText, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
          <Text style={{ fontWeight: 'bold' }}>For Testing:</Text> Use these direct URLs for unmoderated testing:
        </Text>
        <View style={styles.testingUrls}>
          <Text style={[styles.testingUrl, { color: '#3b82f6' }]}>/student - Student pilot experience</Text>
          <Text style={[styles.testingUrl, { color: '#10b981' }]}>/instructor - Flight instructor experience</Text>
          <Text style={[styles.testingUrl, { color: '#8b5cf6' }]}>/prospective - Prospective student experience</Text>
        </View>
      </View>
    </View>
  );

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
          </View>
        </View>
        
        {/* Categorized Menu Items */}
        <View style={styles.menuSections}>
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
        
        {/* Role Selector - Moved to bottom */}
        <RoleSelector />

        {/* Bottom Padding for Tab Navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    fontWeight: '600',
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
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
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
    fontWeight: '500',
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
    fontWeight: '500',
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
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
  },
  
  // Role Selector
  roleOptions: {
    gap: 12,
  },
  roleOption: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
  },
  roleOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleTextContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: 14,
  },
  
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
    fontFamily: 'monospace',
  },

  bottomPadding: {
    height: 100,
  },
});

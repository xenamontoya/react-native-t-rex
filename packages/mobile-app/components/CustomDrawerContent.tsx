import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon, NavIcon, Colors } from '../../components/src';

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

export default function CustomDrawerContent({ navigation, state }: CustomDrawerContentProps) {
  const handleNavigation = (screenName: string) => {
    if (screenName === 'Profile') {
      Alert.alert('Navigation', 'Profile page - coming soon!');
    } else if (['Analytics', 'Reports', 'Endorsements', 'Careers', 'Settings'].includes(screenName)) {
      Alert.alert('Navigation', `${screenName} page - coming soon!`);
    } else {
      navigation.navigate(screenName);
    }
  };

  const isActive = (routeName: string) => {
    return state.routeNames[state.index] === routeName;
  };

  // Main navigation items
  const mainNavigation = [
    { name: 'Home', label: 'Dashboard', icon: 'home' },
    { name: 'Reservations', label: 'Reservations', icon: 'calendar' },
    { name: 'Training', label: 'Training', icon: 'graduation' },
    { name: 'Logbook', label: 'Logbook', icon: 'book' },
  ];

  // Organized navigation sections
  const navigationSections = [
    {
      title: 'LOGBOOK',
      items: [
        { name: 'Analytics', label: 'Analytics', icon: 'chartBar' },
        { name: 'Reports', label: 'Reports', icon: 'chartLine' },
        { name: 'Endorsements', label: 'Endorsements', icon: 'clipboard' },
        { name: 'ImportFlights', label: 'Import Flights', icon: 'upload' },
      ]
    },
    {
      title: 'CAREERS',
      items: [
        { name: 'Careers', label: 'Job Dashboard', icon: 'briefcase' },
        { name: 'CareerCoaching', label: 'Career Coaching', icon: 'userTie' },
        { name: 'ResumeServices', label: 'Resume & Cover Letter', icon: 'fileText' },
        { name: 'InterviewPrep', label: 'Interview Preparation', icon: 'comments' },
        { name: 'Community', label: 'Community', icon: 'users' },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { name: 'Billing', label: 'Billing', icon: 'creditCard' },
        { name: 'Settings', label: 'Settings', icon: 'cog' },
        { name: 'Help', label: 'Help & Support', icon: 'questionCircle' },
      ]
    },
    {
      title: 'SAFETY',
      items: [
        { name: 'IncidentReport', label: 'Submit an Incident Report', icon: 'exclamationTriangle' },
      ]
    }
  ];

  const NavItem = ({ item, isMainNav = false }: { item: any, isMainNav?: boolean }) => {
    const active = isActive(item.name);
    
    return (
      <TouchableOpacity
        style={[
          styles.navItem,
          active && styles.navItemActive,
          isMainNav && styles.mainNavItem
        ]}
        onPress={() => handleNavigation(item.name)}
      >
        {isMainNav ? (
          <NavIcon
            name={item.icon as any}
            isActive={active}
            size={16}
            color={active ? Colors.primary.black : Colors.neutral.gray500}
            style={styles.navIcon}
          />
        ) : (
          <Icon
            name={item.icon as any}
            size={16}
            color={active ? Colors.primary.black : Colors.neutral.gray500}
            style={styles.navIcon}
          />
        )}
        <Text style={[
          styles.navLabel,
          active && styles.navLabelActive,
          isMainNav && styles.mainNavLabel
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileContent}>
          {/* Profile Picture */}
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>AJ</Text>
          </View>
          
          {/* User Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileRole}>Student Pilot</Text>
            
            {/* View Profile Button */}
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => handleNavigation('Profile')}
            >
              <Text style={styles.profileButtonText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Navigation Content */}
      <ScrollView style={styles.navigationContent} showsVerticalScrollIndicator={false}>
        {/* Main Navigation */}
        <View style={styles.mainNavSection}>
          {mainNavigation.map((item) => (
            <NavItem key={item.name} item={item} isMainNav={true} />
          ))}
        </View>

        {/* Sectioned Navigation */}
        <View style={styles.sectionedNav}>
          {navigationSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.navSection}>
              {/* Section Header */}
              <Text style={styles.sectionHeader}>{section.title}</Text>
              
              {/* Section Items */}
              <View style={styles.sectionItems}>
                {section.items.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Brand Footer */}
      <View style={styles.brandFooter}>
        <View style={styles.brandContent}>
          <View style={styles.brandLogo}>
            <Icon
              name="plane"
              size={16}
              color={Colors.neutral.gray500}
              style={{ opacity: 0.6 }}
            />
          </View>
          <Text style={styles.brandText}>Pilotbase</Text>
          <Text style={styles.versionText}>© 2024 · v1.0.2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  
  // Profile Section
  profileSection: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginBottom: 8,
  },
  profileButton: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  profileButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },

  // Navigation Content
  navigationContent: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 24,
  },
  
  // Main Navigation
  mainNavSection: {
    marginBottom: 16,
  },
  mainNavItem: {
    marginBottom: 4,
  },
  mainNavLabel: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Navigation Items
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 2,
  },
  navItemActive: {
    backgroundColor: 'rgba(254, 101, 42, 0.2)',
  },
  navIcon: {
    marginRight: 12,
    width: 20,
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.neutral.gray600,
    flex: 1,
  },
  navLabelActive: {
    color: Colors.primary.black,
    fontWeight: '600',
  },

  // Sectioned Navigation
  sectionedNav: {
    paddingTop: 16,
  },
  navSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.neutral.gray500,
    marginBottom: 8,
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  sectionItems: {
    // No additional styling needed
  },

  // Brand Footer
  brandFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  brandContent: {
    alignItems: 'center',
  },
  brandLogo: {
    marginBottom: 8,
  },
  brandText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray500,
    opacity: 0.6,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: Colors.neutral.gray500,
    opacity: 0.5,
  },
});

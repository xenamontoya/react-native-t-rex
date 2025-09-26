import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon, Colors, Typography, PilotbaseWordmark } from '../../components/src';
import { useRoleStore, roleConfig } from '../utils/roleStore';
import { usePhaseStore, phaseConfig, type Phase } from '../utils/phaseStore';
// Using direct require() instead of broken asset imports

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

export default function CustomDrawerContent({ navigation, state }: CustomDrawerContentProps) {
  const { currentRole, setRole, initializeStore, isInitialized } = useRoleStore();
  const { currentPhase, setPhase, initializeStore: initializePhaseStore, isInitialized: isPhaseInitialized } = usePhaseStore();
  const [showDeveloperOptions, setShowDeveloperOptions] = useState(false);
  const [componentLibraryMode, setComponentLibraryMode] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
    if (!isPhaseInitialized) {
      initializePhaseStore();
    }
  }, [isInitialized, initializeStore, isPhaseInitialized, initializePhaseStore]);

  // Initialize component library mode from AsyncStorage
  useEffect(() => {
    const initializeComponentLibraryMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('componentLibraryMode');
        console.log('CustomDrawerContent: Read componentLibraryMode from storage:', storedMode);
        if (storedMode === 'true') {
          console.log('CustomDrawerContent: Setting componentLibraryMode to true');
          setComponentLibraryMode(true);
        } else {
          console.log('CustomDrawerContent: Setting componentLibraryMode to false');
          setComponentLibraryMode(false);
        }
      } catch (error) {
        console.log('Error reading componentLibraryMode from AsyncStorage:', error);
      }
    };

    initializeComponentLibraryMode();
  }, []);

  // Debug componentLibraryMode state changes
  useEffect(() => {
    console.log('CustomDrawerContent: componentLibraryMode state changed to:', componentLibraryMode);
  }, [componentLibraryMode]);

  // Force refresh component library mode when navigation state changes
  useEffect(() => {
    const checkAndUpdateMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('componentLibraryMode');
        console.log('CustomDrawerContent: Checking stored mode:', storedMode);
        const shouldBeLibraryMode = storedMode === 'true';
        if (componentLibraryMode !== shouldBeLibraryMode) {
          console.log('CustomDrawerContent: Mode mismatch detected, updating from', componentLibraryMode, 'to', shouldBeLibraryMode);
          setComponentLibraryMode(shouldBeLibraryMode);
        }
      } catch (error) {
        console.error('CustomDrawerContent: Error checking mode:', error);
      }
    };

    // Check mode whenever the state changes
    checkAndUpdateMode();
  }, [state, componentLibraryMode]);

  const handleNavigation = (screenName: string, params?: any) => {
    if (screenName === 'ImportFlights') {
      Alert.alert('Navigation', 'Import Flights feature - coming soon!');
    } else {
      navigation.navigate(screenName, params);
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
          <Icon
            name={item.icon as any}
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
          <Image 
            source={{ uri: 'https://i.pravatar.cc/64?seed=Alex Johnson' }}
            style={styles.profileAvatar}
          />
          
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

          {/* Developer Options Toggle */}
          <TouchableOpacity
            onPress={() => setShowDeveloperOptions(!showDeveloperOptions)}
            style={styles.developerToggle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon 
              name="chevronRight" 
              size={16} 
              color={Colors.neutral.gray600}
              style={{ 
                transform: showDeveloperOptions ? 'rotate(270deg)' : 'rotate(90deg)'
              }}
            />
          </TouchableOpacity>
        </View>

      </View>

      {/* Navigation Content - Different based on mode */}
      <ScrollView style={styles.navigationContent} showsVerticalScrollIndicator={false}>
        {componentLibraryMode ? (
          /* Component Library Navigation */
          <View style={styles.sectionedNav}>
            <View style={styles.navSection}>
              <Text style={styles.sectionHeader}>DESIGN SYSTEM</Text>
              <View style={styles.sectionItems}>
                {[
                  { name: 'brand-assets', label: 'Brand Assets', icon: 'award' },
                  { name: 'colors', label: 'Colors', icon: 'star' },
                  { name: 'typography', label: 'Typography', icon: 'fileText' },
                  { name: 'icons', label: 'Icons', icon: 'checkCircle' },
                  { name: 'buttons', label: 'Buttons', icon: 'list' },
                  { name: 'cards', label: 'Cards', icon: 'clipboard' },
                  { name: 'headers', label: 'Headers', icon: 'edit' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.navItem}
                    onPress={() => {
                      console.log('Navigating to ComponentLibrary with section:', item.name.toLowerCase());
                      handleNavigation('ComponentLibrary', { section: item.name.toLowerCase() });
                    }}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={item.icon as any}
                      size={16}
                      color={Colors.neutral.gray500}
                      style={styles.navIcon}
                    />
                    <Text style={styles.navLabel}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* Normal App Navigation */
          <>
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
          </>
        )}
      </ScrollView>

      {/* Brand Footer - Pilotbase Branding */}
      <View style={styles.brandFooter}>
        <View style={styles.brandContent}>
          <PilotbaseWordmark 
            width={100} 
            height={25} 
            color="#000000"
            style={styles.pilotbaseNameplate}
          />
          <Text style={styles.versionText}>© 2024 · v1.0.2</Text>
        </View>
      </View>

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
          <View style={styles.developerModal}>
            <Text style={styles.modalTitle}>Developer Options</Text>
            
            {/* Mode Switcher */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>SWITCH INTERFACE</Text>
              <TouchableOpacity
                style={styles.modalMenuItem}
                onPress={async () => {
                  setShowDeveloperOptions(false);
                  try {
                    if (componentLibraryMode) {
                      // Switch to Prototype
                      console.log('CustomDrawerContent: Switching to Prototype mode');
                      setComponentLibraryMode(false);
                      
                      // Set AsyncStorage to prototype mode
                      await AsyncStorage.removeItem('componentLibraryMode');
                      await AsyncStorage.setItem('componentLibraryMode', 'false');
                      console.log('CustomDrawerContent: AsyncStorage updated to false, navigating to home');
                      
                      handleNavigation('Home');
                    } else {
                      // Switch to Component Library
                      console.log('CustomDrawerContent: Switching to Component Library mode');
                      setComponentLibraryMode(true);
                      
                      // Set AsyncStorage to component library mode
                      await AsyncStorage.removeItem('componentLibraryMode');
                      await AsyncStorage.setItem('componentLibraryMode', 'true');
                      console.log('CustomDrawerContent: AsyncStorage updated to true, navigating to component library');
                      
                      handleNavigation('ComponentLibrary');
                    }
                  } catch (error) {
                    console.error('CustomDrawerContent: Error switching modes:', error);
                  }
                }}
              >
                <View style={styles.modalMenuIcon}>
                  <Icon
                    name={componentLibraryMode ? 'home' : 'bookOpen'}
                    size={14}
                    color={Colors.neutral.gray600}
                  />
                </View>
                <View style={styles.modalMenuContent}>
                  <Text style={styles.modalMenuTitle}>
                    {componentLibraryMode ? 'Switch to Prototype' : 'Switch to Component Library'}
                  </Text>
                  <Text style={styles.modalMenuDescription}>
                    {componentLibraryMode ? 'Return to app prototype' : 'View design system & components'}
                  </Text>
                </View>
                <Icon
                  name="arrowRight"
                  size={16}
                  color={Colors.neutral.gray400}
                />
              </TouchableOpacity>
            </View>

            {/* Prototype-only sections */}
            {!componentLibraryMode && (
              <>
                {/* Experience Mode */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>EXPERIENCE MODE</Text>
                  {Object.entries(roleConfig).map(([role, config]) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.modalMenuItem,
                        { 
                          backgroundColor: currentRole === role 
                            ? `${config.color}10` 
                            : Colors.neutral.white
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
                            : Colors.neutral.gray100
                        }
                      ]}>
                        <Icon
                          name={
                            role === 'student' ? 'graduation' : 
                            role === 'instructor' ? 'userTie' : 'search'
                          }
                          size={14}
                          color={currentRole === role ? config.color : Colors.neutral.gray600}
                        />
                      </View>
                      <View style={styles.modalMenuContent}>
                        <Text style={styles.modalMenuTitle}>
                          {config.title}
                        </Text>
                        <Text style={styles.modalMenuDescription}>
                          {config.description}
                        </Text>
                      </View>
                      <Icon
                        name={currentRole === role ? 'checkCircle' : 'check'}
                        size={16}
                        color={currentRole === role ? config.color : Colors.neutral.gray400}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Development Phase */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>DEVELOPMENT PHASE</Text>
                  {(Object.keys(phaseConfig) as Phase[]).map((phase) => (
                    <TouchableOpacity
                      key={phase}
                      style={[
                        styles.modalMenuItem,
                        { 
                          backgroundColor: currentPhase === phase 
                            ? `${phaseConfig[phase].color}10` 
                            : Colors.neutral.white
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
                            : Colors.neutral.gray100
                        }
                      ]}>
                        <Text style={[
                          styles.modalPhaseNumber,
                          { color: currentPhase === phase ? phaseConfig[phase].color : Colors.neutral.gray600 }
                        ]}>
                          {phase.replace('phase', '')}
                        </Text>
                      </View>
                      <View style={styles.modalMenuContent}>
                        <Text style={styles.modalMenuTitle}>
                          {phaseConfig[phase].title}
                        </Text>
                        <Text style={styles.modalMenuDescription}>
                          {phaseConfig[phase].description}
                        </Text>
                      </View>
                      <Icon
                        name={currentPhase === phase ? 'checkCircle' : 'check'}
                        size={16}
                        color={currentPhase === phase ? phaseConfig[phase].color : Colors.neutral.gray400}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
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
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    marginRight: 12, // Space for the dropdown toggle
  },
  profileName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
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
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },

  // Navigation Content
  navigationContent: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 16, // Ensure space for brand footer
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
    fontFamily: Typography.fontFamily.medium,
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
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  navLabelActive: {
    color: Colors.primary.black,
    fontFamily: Typography.fontFamily.semibold,
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
    fontFamily: Typography.fontFamily.semibold,
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
    paddingVertical: 20,
    backgroundColor: Colors.primary.white, // Ensure background visibility
    minHeight: 80, // Minimum height to ensure visibility
  },
  brandContent: {
    alignItems: 'center',
  },
  pilotbaseNameplate: {
    marginBottom: 8,
    // SVG component handles its own sizing via props
  },
  versionText: {
    fontSize: 10,
    color: Colors.neutral.gray500,
    opacity: 0.5,
  },

  // Developer options styles
  developerToggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray100,
    flexShrink: 0,
  },
  developerDropdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  dropdownSection: {
    marginBottom: 16,
  },
  dropdownSectionTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  roleOptions: {
    gap: 6,
  },
  roleOption: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  roleTextContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  phaseOptions: {
    gap: 6,
  },
  phaseOption: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  phaseOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phaseOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  phaseIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  phaseNumber: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
  },
  phaseTextContent: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  phaseDescription: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },

  // Component Library Styles
  componentLibraryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 6,
  },
  componentLibraryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  componentLibraryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  componentLibraryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  componentLibraryTextContent: {
    flex: 1,
  },
  componentLibraryTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  componentLibraryDescription: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },

  // Modal Styles (positioned relative to drawer)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 290, // Position to the right of the drawer
    paddingTop: 80, // Reduced to give more space for taller modal
    paddingRight: 20,
    paddingBottom: 40, // Add bottom padding for safety
  },
  developerModal: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minWidth: 260,
    maxWidth: 300,
    maxHeight: '85%', // Increased from 70% to 85% to fit all content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 14,
  },
  modalSectionTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  modalMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 4,
    backgroundColor: Colors.neutral.gray50,
  },
  modalMenuIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: Colors.neutral.gray200,
  },
  modalMenuContent: {
    flex: 1,
  },
  modalMenuTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 1,
  },
  modalMenuDescription: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  modalPhaseNumber: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
  },
});

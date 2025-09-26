import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface DrawerMenuItem {
  name: string;
  label: string;
  icon: string;
  badge?: number;
  comingSoon?: boolean;
  onPress?: () => void;
}

export interface DrawerSection {
  title: string;
  items: DrawerMenuItem[];
}

export interface DrawerMenuProps {
  sections: DrawerSection[];
  activeRoute?: string;
  onItemPress: (item: DrawerMenuItem) => void;
  userInfo?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onClose?: () => void;
  footerComponent?: React.ReactNode;
  // Developer options for role/phase switching
  developerOptions?: {
    currentRole: string;
    currentPhase: string;
    roleConfig: Record<string, { title: string; description: string; color: string }>;
    phaseConfig: Record<string, { title: string; description: string; color: string }>;
    onRoleSwitch: (role: string) => void;
    onPhaseSwitch: (phase: string) => void;
  };
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  sections,
  activeRoute,
  onItemPress,
  userInfo,
  onClose,
  footerComponent,
  developerOptions,
}) => {
  const [showDeveloperOptions, setShowDeveloperOptions] = useState(false);

  const isActive = (itemName: string) => {
    return activeRoute === itemName;
  };

  const handleRoleSwitch = (role: string) => {
    if (developerOptions?.onRoleSwitch) {
      developerOptions.onRoleSwitch(role);
      Alert.alert('Role Changed', `Switched to ${developerOptions.roleConfig[role]?.title || role} experience`);
    }
  };

  const handlePhaseSwitch = (phase: string) => {
    if (developerOptions?.onPhaseSwitch) {
      developerOptions.onPhaseSwitch(phase);
      Alert.alert('Phase Changed', `Switched to ${developerOptions.phaseConfig[phase]?.title || phase}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {userInfo && (
        <View>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <FontAwesome6 name="user" size={24} color={Colors.neutral.white} />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{userInfo.name}</Text>
                <Text style={styles.userRole}>{userInfo.role}</Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              {/* Developer Options Toggle */}
              {developerOptions && (
                <TouchableOpacity
                  onPress={() => setShowDeveloperOptions(!showDeveloperOptions)}
                  style={[
                    styles.developerToggle,
                    {
                      // Temporary: Make more visible for debugging
                      borderWidth: 2,
                      borderColor: '#3b82f6'
                    }
                  ]}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome6 
                    name={showDeveloperOptions ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color={Colors.neutral.gray600} 
                  />
                </TouchableOpacity>
              )}
              
              {onClose && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome6 name="xmark" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Developer Options Dropdown */}
          {showDeveloperOptions && developerOptions && (
            <View style={styles.developerDropdown}>
              {/* Experience Mode */}
              <View style={styles.dropdownSection}>
                <Text style={styles.dropdownSectionTitle}>EXPERIENCE MODE</Text>
                <View style={styles.roleOptions}>
                  {Object.entries(developerOptions.roleConfig).map(([role, config]) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleOption,
                        { 
                          borderColor: developerOptions.currentRole === role ? config.color : Colors.neutral.gray300,
                          backgroundColor: developerOptions.currentRole === role 
                            ? `${config.color}10` 
                            : Colors.neutral.white
                        }
                      ]}
                      onPress={() => handleRoleSwitch(role)}
                    >
                      <View style={styles.roleOptionContent}>
                        <View style={styles.roleOptionLeft}>
                          <View style={[
                            styles.roleIcon,
                            { 
                              backgroundColor: developerOptions.currentRole === role 
                                ? `${config.color}20` 
                                : Colors.neutral.gray100
                            }
                          ]}>
                            <FontAwesome6
                              name={
                                role === 'student' ? 'graduation-cap' : 
                                role === 'instructor' ? 'user-tie' : 'magnifying-glass'
                              } 
                              size={14} 
                              color={developerOptions.currentRole === role ? config.color : Colors.neutral.gray600} 
                            />
                          </View>
                          <View style={styles.roleTextContent}>
                            <Text style={styles.roleTitle}>
                              {config.title}
                            </Text>
                            <Text style={styles.roleDescription}>
                              {config.description}
                            </Text>
                          </View>
                        </View>
                        <FontAwesome6
                          name={developerOptions.currentRole === role ? 'toggle-on' : 'toggle-off'} 
                          size={18} 
                          color={developerOptions.currentRole === role ? config.color : Colors.neutral.gray400} 
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Development Phase */}
              <View style={styles.dropdownSection}>
                <Text style={styles.dropdownSectionTitle}>DEVELOPMENT PHASE</Text>
                <View style={styles.phaseOptions}>
                  {Object.entries(developerOptions.phaseConfig).map(([phase, config]) => (
                    <TouchableOpacity
                      key={phase}
                      style={[
                        styles.phaseOption,
                        { 
                          borderColor: developerOptions.currentPhase === phase ? config.color : Colors.neutral.gray300,
                          backgroundColor: developerOptions.currentPhase === phase 
                            ? `${config.color}10` 
                            : Colors.neutral.white
                        }
                      ]}
                      onPress={() => handlePhaseSwitch(phase)}
                    >
                      <View style={styles.phaseOptionContent}>
                        <View style={styles.phaseOptionLeft}>
                          <View style={[
                            styles.phaseIcon,
                            { 
                              backgroundColor: developerOptions.currentPhase === phase 
                                ? `${config.color}20` 
                                : Colors.neutral.gray100
                            }
                          ]}>
                            <Text style={[
                              styles.phaseNumber,
                              { color: developerOptions.currentPhase === phase ? config.color : Colors.neutral.gray600 }
                            ]}>
                              {phase.replace('phase', '')}
                            </Text>
                          </View>
                          <View style={styles.phaseTextContent}>
                            <Text style={styles.phaseTitle}>
                              {config.title}
                            </Text>
                            <Text style={styles.phaseDescription}>
                              {config.description}
                            </Text>
                          </View>
                        </View>
                        <FontAwesome6
                          name={developerOptions.currentPhase === phase ? 'toggle-on' : 'toggle-off'} 
                          size={18} 
                          color={developerOptions.currentPhase === phase ? config.color : Colors.neutral.gray400} 
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Navigation Sections */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.menuItem,
                  isActive(item.name) && styles.menuItemActive,
                ]}
                onPress={() => onItemPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[
                    styles.iconContainer,
                    isActive(item.name) && styles.iconContainerActive,
                  ]}>
                    <FontAwesome6
                      name={item.icon as any}
                      size={18}
                      color={isActive(item.name) ? Colors.secondary.electricBlue : Colors.neutral.gray600}
                    />
                  </View>
                  
                  <Text style={[
                    styles.menuItemLabel,
                    isActive(item.name) && styles.menuItemLabelActive,
                    item.comingSoon && styles.menuItemLabelDisabled,
                  ]}>
                    {item.label}
                  </Text>
                </View>

                <View style={styles.menuItemRight}>
                  {/* Badge */}
                  {item.badge && item.badge > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {item.badge > 99 ? '99+' : item.badge.toString()}
                      </Text>
                    </View>
                  )}
                  
                  {/* Coming Soon */}
                  {item.comingSoon && (
                    <Text style={styles.comingSoonText}>Soon</Text>
                  )}

                  {/* Chevron */}
                  {!item.comingSoon && (
                    <FontAwesome6
                      name="chevron-right"
                      size={12}
                      color={Colors.neutral.gray400}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      {footerComponent && (
        <View style={styles.footer}>
          {footerComponent}
        </View>
      )}
    </View>
  );
};

// Preset for flight training drawer sections
export const FlightTrainingDrawerSections: DrawerSection[] = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', label: 'Dashboard', icon: 'house' },
      { name: 'Reservations', label: 'Reservations', icon: 'calendar' },
      { name: 'Training', label: 'Training', icon: 'graduation-cap' },
      { name: 'Logbook', label: 'Logbook', icon: 'book' },
    ],
  },
  {
    title: 'LOGBOOK',
    items: [
      { name: 'Analytics', label: 'Analytics', icon: 'chart-bar', comingSoon: true },
      { name: 'Reports', label: 'Reports', icon: 'chart-line', comingSoon: true },
      { name: 'Endorsements', label: 'Endorsements', icon: 'clipboard-check', comingSoon: true },
      { name: 'ImportFlights', label: 'Import Flights', icon: 'upload' },
    ],
  },
  {
    title: 'CAREERS',
    items: [
      { name: 'JobDashboard', label: 'Job Dashboard', icon: 'briefcase', comingSoon: true },
      { name: 'CareerCoaching', label: 'Career Coaching', icon: 'user-tie', comingSoon: true },
      { name: 'ResumeServices', label: 'Resume & Cover Letter', icon: 'file-text', comingSoon: true },
      { name: 'InterviewPrep', label: 'Interview Prep', icon: 'comments', comingSoon: true },
      { name: 'Community', label: 'Community', icon: 'users', comingSoon: true },
    ],
  },
  {
    title: 'SAFETY',
    items: [
      { name: 'PreflightChecklist', label: 'Preflight Checklist', icon: 'list-check' },
      { name: 'WeatherReview', label: 'Weather Review', icon: 'cloud-sun' },
      { name: 'WeightBalance', label: 'Weight & Balance', icon: 'scale-balanced' },
      { name: 'FRAT', label: 'Flight Risk Assessment', icon: 'triangle-exclamation' },
      { name: 'IncidentReport', label: 'Incident Report', icon: 'file-exclamation' },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'Profile', label: 'Profile', icon: 'user' },
      { name: 'Documents', label: 'Documents', icon: 'folder' },
      { name: 'Billing', label: 'Billing', icon: 'credit-card', comingSoon: true },
      { name: 'Settings', label: 'Settings', icon: 'gear' },
      { name: 'Help', label: 'Help & Support', icon: 'circle-question' },
    ],
  },
];

// Student-specific drawer
export const StudentDrawerSections: DrawerSection[] = [
  {
    title: 'TRAINING',
    items: [
      { name: 'Dashboard', label: 'Dashboard', icon: 'house' },
      { name: 'Lessons', label: 'My Lessons', icon: 'graduation-cap' },
      { name: 'Progress', label: 'Progress Tracking', icon: 'chart-line' },
      { name: 'Reservations', label: 'Aircraft Booking', icon: 'calendar' },
    ],
  },
  {
    title: 'FLIGHT OPERATIONS',
    items: [
      { name: 'Logbook', label: 'Flight Logbook', icon: 'book' },
      { name: 'PreflightChecklist', label: 'Preflight Checklist', icon: 'list-check' },
      { name: 'WeatherReview', label: 'Weather Briefing', icon: 'cloud-sun' },
    ],
  },
];

// Instructor-specific drawer
export const InstructorDrawerSections: DrawerSection[] = [
  {
    title: 'INSTRUCTION',
    items: [
      { name: 'Dashboard', label: 'Dashboard', icon: 'house' },
      { name: 'Students', label: 'My Students', icon: 'users' },
      { name: 'Schedule', label: 'Teaching Schedule', icon: 'calendar' },
      { name: 'LessonPlanning', label: 'Lesson Planning', icon: 'clipboard-list', comingSoon: true },
    ],
  },
  {
    title: 'TRACKING',
    items: [
      { name: 'StudentProgress', label: 'Student Progress', icon: 'chart-line' },
      { name: 'Endorsements', label: 'Endorsements', icon: 'clipboard-check' },
      { name: 'Reports', label: 'Teaching Reports', icon: 'chart-bar', comingSoon: true },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.gray50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  userDetails: {
    flex: 1,
    marginRight: Spacing.sm, // Space for the dropdown toggle
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  userName: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  userRole: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.neutral.gray50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  menuItemActive: {
    backgroundColor: Colors.secondary.electricBlue + '10', // 10% opacity
    borderRightWidth: 3,
    borderRightColor: Colors.secondary.electricBlue,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: Colors.secondary.electricBlue + '20', // 20% opacity
  },
  menuItemLabel: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    flex: 1,
  },
  menuItemLabelActive: {
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.secondary.electricBlue,
  },
  menuItemLabelDisabled: {
    color: Colors.neutral.gray400,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.status.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.white,
  },
  comingSoonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray400,
    fontStyle: 'italic',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.gray50,
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.gray50,
  },
  dropdownSection: {
    marginBottom: Spacing.md,
  },
  dropdownSectionTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  roleOptions: {
    gap: Spacing.xs,
  },
  roleOption: {
    borderWidth: 1,
    borderRadius: 8,
    padding: Spacing.sm,
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
    marginRight: Spacing.xs,
  },
  roleTextContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  phaseOptions: {
    gap: Spacing.xs,
  },
  phaseOption: {
    borderWidth: 1,
    borderRadius: 8,
    padding: Spacing.sm,
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
    marginRight: Spacing.xs,
  },
  phaseNumber: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.bold,
  },
  phaseTextContent: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  phaseDescription: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
});

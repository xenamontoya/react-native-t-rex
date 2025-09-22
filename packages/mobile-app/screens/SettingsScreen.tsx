import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, SafeAreaView, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState({
    flightReminders: true,
    lessonUpdates: true,
    weatherAlerts: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: true,
    locationServices: true,
    analytics: false,
  });

  const handleGoBack = () => {
    navigation?.goBack();
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMenuPress = (item: string) => {
    Alert.alert('Settings', `You pressed: ${item}`);
  };

  const accountSettings = [
    { icon: 'user', title: 'Personal Information', description: 'Update your profile and contact details' },
    { icon: 'lock', title: 'Password & Security', description: 'Change password and security settings' },
    { icon: 'creditCard', title: 'Payment Methods', description: 'Manage your saved payment methods' },
    { icon: 'fileText', title: 'Documents & Certificates', description: 'Upload and manage your pilot documents' },
  ];

  const appSettings = [
    { icon: 'bell', title: 'Notification Preferences', description: 'Customize your notification settings' },
    { icon: 'mapMarkerAlt', title: 'Location Services', description: 'Manage location and weather preferences' },
    { icon: 'download', title: 'Data & Storage', description: 'Manage offline data and storage' },
    { icon: 'cog', title: 'Display & Accessibility', description: 'Customize app appearance and accessibility' },
  ];

  const supportOptions = [
    { icon: 'questionCircle', title: 'Help Center', description: 'Find answers to common questions' },
    { icon: 'comments', title: 'Contact Support', description: 'Get help from our support team' },
    { icon: 'exclamationTriangle', title: 'Report a Problem', description: 'Report bugs or issues with the app' },
    { icon: 'star', title: 'Rate the App', description: 'Leave a review on the app store' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={24} color={Colors.primary.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>AJ</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Johnson</Text>
              <Text style={styles.profileEmail}>alex.johnson@email.com</Text>
              <Text style={styles.profileRole}>Student Pilot</Text>
            </View>
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => handleMenuPress('Edit Profile')}
            >
              <Icon name="edit" size={16} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Notifications Toggle */}
        <View style={styles.quickSettingsCard}>
          <Text style={styles.h2}>Quick Settings</Text>
          <View style={styles.quickSettingsList}>
            <View style={styles.quickSettingItem}>
              <View style={styles.quickSettingContent}>
                <Icon name="bell" size={20} color={Colors.neutral.gray600} style={styles.quickSettingIcon} />
                <Text style={styles.quickSettingTitle}>Flight Reminders</Text>
              </View>
              <Switch
                value={notifications.flightReminders}
                onValueChange={() => handleNotificationChange('flightReminders')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
            <View style={styles.quickSettingItem}>
              <View style={styles.quickSettingContent}>
                <Icon name="graduationCap" size={20} color={Colors.neutral.gray600} style={styles.quickSettingIcon} />
                <Text style={styles.quickSettingTitle}>Lesson Updates</Text>
              </View>
              <Switch
                value={notifications.lessonUpdates}
                onValueChange={() => handleNotificationChange('lessonUpdates')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
            <View style={styles.quickSettingItem}>
              <View style={styles.quickSettingContent}>
                <Icon name="mapMarkerAlt" size={20} color={Colors.neutral.gray600} style={styles.quickSettingIcon} />
                <Text style={styles.quickSettingTitle}>Location Services</Text>
              </View>
              <Switch
                value={privacy.locationServices}
                onValueChange={() => handlePrivacyChange('locationServices')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.settingsList}>
            {accountSettings.map((setting, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={() => handleMenuPress(setting.title)}
              >
                <View style={styles.settingIcon}>
                  <Icon name={setting.icon as any} size={18} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
                <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>APP SETTINGS</Text>
          <View style={styles.settingsList}>
            {appSettings.map((setting, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={() => handleMenuPress(setting.title)}
              >
                <View style={styles.settingIcon}>
                  <Icon name={setting.icon as any} size={18} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
                <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Detailed Notification Settings */}
        <View style={styles.notificationsCard}>
          <Text style={styles.h2}>Notification Settings</Text>
          <View style={styles.notificationsList}>
            <View style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>Weather Alerts</Text>
                <Text style={styles.notificationDescription}>Get notified about weather changes</Text>
              </View>
              <Switch
                value={notifications.weatherAlerts}
                onValueChange={() => handleNotificationChange('weatherAlerts')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>Marketing Emails</Text>
                <Text style={styles.notificationDescription}>Receive updates about new features</Text>
              </View>
              <Switch
                value={notifications.marketingEmails}
                onValueChange={() => handleNotificationChange('marketingEmails')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.privacyCard}>
          <Text style={styles.h2}>Privacy & Data</Text>
          <View style={styles.privacyList}>
            <View style={styles.privacyItem}>
              <View style={styles.privacyContent}>
                <Text style={styles.privacyTitle}>Share Progress</Text>
                <Text style={styles.privacyDescription}>Allow instructors to see your progress</Text>
              </View>
              <Switch
                value={privacy.shareProgress}
                onValueChange={() => handlePrivacyChange('shareProgress')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
            <View style={styles.privacyItem}>
              <View style={styles.privacyContent}>
                <Text style={styles.privacyTitle}>Analytics & Crash Reports</Text>
                <Text style={styles.privacyDescription}>Help improve the app with usage data</Text>
              </View>
              <Switch
                value={privacy.analytics}
                onValueChange={() => handlePrivacyChange('analytics')}
                trackColor={{ false: Colors.neutral.gray300, true: Colors.secondary.electricBlue }}
                thumbColor={Colors.primary.white}
              />
            </View>
          </View>
        </View>

        {/* Support & Help */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>SUPPORT & HELP</Text>
          <View style={styles.settingsList}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={() => handleMenuPress(option.title)}
              >
                <View style={styles.settingIcon}>
                  <Icon name={option.icon as any} size={18} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingDescription}>{option.description}</Text>
                </View>
                <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Information */}
        <View style={styles.appInfoCard}>
          <Text style={styles.h2}>App Information</Text>
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Version</Text>
            <Text style={styles.appInfoValue}>1.0.0 (Build 123)</Text>
          </View>
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Last Updated</Text>
            <Text style={styles.appInfoValue}>December 15, 2025</Text>
          </View>
          <TouchableOpacity style={styles.checkUpdatesButton} onPress={() => handleMenuPress('Check for Updates')}>
            <Text style={styles.checkUpdatesText}>Check for Updates</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerCard}>
          <Text style={styles.h2}>Account Actions</Text>
          <TouchableOpacity style={styles.dangerButton} onPress={() => handleMenuPress('Sign Out')}>
            <Icon name="arrowRight" size={16} color={Colors.secondary.orange3} style={styles.dangerIcon} />
            <Text style={styles.dangerButtonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton} onPress={() => handleMenuPress('Delete Account')}>
            <Icon name="trash" size={16} color={Colors.secondary.orange3} style={styles.dangerIcon} />
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.white,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  headerRight: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.secondary.electricBlue,
  },
  editProfileButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.neutral.gray50,
  },
  quickSettingsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  h2: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  quickSettingsList: {
    gap: 12,
  },
  quickSettingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  quickSettingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickSettingIcon: {
    marginRight: 12,
  },
  quickSettingTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingsList: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  notificationsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  notificationsList: {
    gap: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  privacyCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  privacyList: {
    gap: 16,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  privacyDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  appInfoCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  appInfoLabel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  appInfoValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  checkUpdatesButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
  },
  checkUpdatesText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  dangerCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  dangerIcon: {
    marginRight: 12,
  },
  dangerButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.secondary.orange3,
  },
  bottomPadding: {
    height: 40,
  },
});


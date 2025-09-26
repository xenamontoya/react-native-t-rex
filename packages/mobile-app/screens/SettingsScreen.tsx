import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography, ScreenHeader } from '../../components/src';
import { useThemeStore } from '../utils/themeStore';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { isDark, toggleTheme, initializeStore, isInitialized } = useThemeStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getThemeColors = () => ({
    background: isDark ? '#1a1a1a' : '#ffffff',
    cardBackground: isDark ? '#2a2a2a' : '#ffffff',
    border: isDark ? '#404040' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    secondaryText: isDark ? '#a0a0a0' : '#6b7280',
    buttonBackground: isDark ? '#404040' : '#f3f4f6',
  });

  const themeColors = getThemeColors();

  const privacyItems = [
    {
      id: 'privacy-settings',
      title: 'Privacy Settings',
      subtitle: 'Control data sharing and visibility',
      icon: 'lock',
      isComingSoon: true,
      onPress: () => Alert.alert('Privacy Settings', 'Privacy settings coming soon')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage push notifications and alerts',
      icon: 'bell',
      isComingSoon: true,
      onPress: () => Alert.alert('Notifications', 'Notification settings coming soon')
    },
    {
      id: 'data-export',
      title: 'Data Export',
      subtitle: 'Download your training data',
      icon: 'download',
      isComingSoon: true,
      onPress: () => Alert.alert('Data Export', 'Data export feature coming soon')
    }
  ];

  const supportItems = [
    {
      id: 'help-center',
      title: 'Help Center',
      subtitle: 'FAQs and support articles',
      icon: 'helpCircle',
      isComingSoon: true,
      onPress: () => Alert.alert('Help Center', 'Help center coming soon')
    },
    {
      id: 'contact-support',
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      icon: 'message-circle',
      isComingSoon: true,
      onPress: () => Alert.alert('Contact Support', 'Contact support coming soon')
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      subtitle: 'Help us improve the app',
      icon: 'star',
      isComingSoon: true,
      onPress: () => Alert.alert('Send Feedback', 'Feedback feature coming soon')
    }
  ];

  const renderToggle = () => {
    return (
      <View style={[
        styles.toggleContainer,
        { backgroundColor: isDark ? '#00FFF2' : '#d1d5db' }
      ]}>
        <Animated.View 
          style={[
            styles.toggleButton,
            {
              transform: [{ translateX: isDark ? 24 : 2 }]
            }
          ]}
        />
      </View>
    );
  };

  const renderSettingItem = (item: any, isComingSoon: boolean = false) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.settingItem,
        { 
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.border,
          opacity: isComingSoon ? 0.6 : 1
        }
      ]}
      onPress={item.onPress}
      disabled={isComingSoon}
    >
      <View style={styles.settingContent}>
        <View style={[
          styles.settingIconContainer,
          { backgroundColor: themeColors.buttonBackground }
        ]}>
          <Icon 
            name={item.icon} 
            size={16} 
            color={themeColors.secondaryText} 
          />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, { color: themeColors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.settingSubtitle, { color: themeColors.secondaryText }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      {isComingSoon && (
        <View style={[
          styles.comingSoonBadge,
          { 
            backgroundColor: themeColors.buttonBackground,
            borderColor: themeColors.border
          }
        ]}>
          <Text style={[styles.comingSoonText, { color: themeColors.secondaryText }]}>
            Coming Soon
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Standardized Header */}
      <ScreenHeader 
        variant="detail"
        title="Settings"
        subtitle="App preferences and configuration"
        onBackPress={handleBackPress}
      />

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.secondaryText }]}>
            APPEARANCE
          </Text>
          
          {/* Dark Mode Toggle */}
          <View style={[
            styles.settingItem,
            { 
              backgroundColor: themeColors.cardBackground,
              borderColor: themeColors.border
            }
          ]}>
            <View style={styles.settingContent}>
              <View style={[
                styles.settingIconContainer,
                { backgroundColor: themeColors.buttonBackground }
              ]}>
                <Icon 
                  name={isDark ? 'moon' : 'sun'} 
                  size={16} 
                  color={isDark ? '#fbbf24' : '#f59e0b'} 
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.settingSubtitle, { color: themeColors.secondaryText }]}>
                  {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={toggleTheme}>
              {renderToggle()}
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.secondaryText }]}>
            PRIVACY & SECURITY
          </Text>
          
          <View style={styles.sectionItems}>
            {privacyItems.map(item => renderSettingItem(item, item.isComingSoon))}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.secondaryText }]}>
            SUPPORT & HELP
          </Text>
          
          <View style={styles.sectionItems}>
            {supportItems.map(item => renderSettingItem(item, item.isComingSoon))}
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.secondaryText }]}>
            ABOUT
          </Text>
          
          <View style={[
            styles.settingItem,
            { 
              backgroundColor: themeColors.cardBackground,
              borderColor: themeColors.border
            }
          ]}>
            <View style={styles.settingContent}>
              <View style={[
                styles.settingIconContainer,
                { backgroundColor: themeColors.buttonBackground }
              ]}>
                <Icon 
                  name="info" 
                  size={16} 
                  color={themeColors.secondaryText} 
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                  App Version
                </Text>
                <Text style={[styles.settingSubtitle, { color: themeColors.secondaryText }]}>
                  1.0.0 (Beta)
                </Text>
              </View>
            </View>
          </View>
        </View>

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
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionItems: {
    gap: 8,
  },
  settingItem: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleButton: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  comingSoonBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  comingSoonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});
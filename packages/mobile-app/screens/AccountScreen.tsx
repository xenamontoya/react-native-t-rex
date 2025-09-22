import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

export default function AccountScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Account</Text>
          <Text style={styles.headerSubtitle}>Profile and preferences</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Coming Soon Card */}
        <View style={styles.comingSoonCard}>
          <View style={styles.iconContainer}>
            <Icon name="userTie" size={32} color={Colors.accent.purple} />
          </View>
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonDescription}>
            We're creating a comprehensive account management system for your profile, preferences, and privacy settings.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Profile management coming soon</Text>
          </View>
        </View>

        {/* Feature Preview */}
        <View style={styles.featurePreview}>
          <View style={styles.previewItem}>
            <View style={styles.previewIcon} />
            <View style={styles.previewContent}>
              <View style={styles.previewTitle} />
              <View style={styles.previewSubtitle} />
            </View>
          </View>
          <View style={styles.previewItem}>
            <View style={styles.previewIcon} />
            <View style={styles.previewContent}>
              <View style={styles.previewTitle} />
              <View style={styles.previewSubtitle} />
            </View>
          </View>
          <View style={styles.previewItem}>
            <View style={styles.previewIcon} />
            <View style={styles.previewContent}>
              <View style={styles.previewTitle} />
              <View style={styles.previewSubtitle} />
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
    backgroundColor: Colors.primary.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 128,
  },
  comingSoonCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: Colors.accent.purple + '20',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  comingSoonDescription: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: Colors.accent.purple + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.accent.purple,
  },
  featurePreview: {
    marginTop: 24,
    gap: 16,
  },
  previewItem: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  previewIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 8,
    marginRight: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    height: 16,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    width: 128,
    marginBottom: 4,
  },
  previewSubtitle: {
    height: 12,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    width: 96,
  },
});


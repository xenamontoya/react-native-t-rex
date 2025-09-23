import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

export default function HelpScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>Get assistance and resources</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Coming Soon Card */}
        <View style={styles.comingSoonCard}>
          <View style={styles.iconContainer}>
            <Icon name="help-circle" size={32} color="#6366f1" />
          </View>
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonDescription}>
            We're building a comprehensive help center with FAQs, tutorials, and direct support channels.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Support center in development</Text>
          </View>
        </View>

        {/* Quick Support */}
        <View style={styles.quickSupportCard}>
          <View style={styles.quickSupportContent}>
            <View style={styles.questionMark}>
              <Text style={styles.questionMarkText}>?</Text>
            </View>
            <View style={styles.quickSupportTextContainer}>
              <Text style={styles.quickSupportTitle}>Need Immediate Help?</Text>
              <Text style={styles.quickSupportDescription}>
                For urgent support, contact your flight school administrator or check your school's emergency procedures.
              </Text>
            </View>
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
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
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
    paddingBottom: 100,
  },
  comingSoonCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#eef2ff', // indigo-50
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
    backgroundColor: '#eef2ff', // indigo-50
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#6366f1', // indigo-600
  },
  quickSupportCard: {
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  quickSupportContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  questionMark: {
    width: 20,
    height: 20,
    backgroundColor: '#6366f1', // indigo-500
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  questionMarkText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  quickSupportTextContainer: {
    flex: 1,
  },
  quickSupportTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  quickSupportDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  featurePreview: {
    gap: 16,
  },
  previewItem: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    opacity: 0.6,
  },
  previewIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 8,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    height: 16,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    width: '60%',
    marginBottom: 4,
  },
  previewSubtitle: {
    height: 12,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    width: '40%',
  },
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Linking, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

export default function HelpScreen({ navigation }: any) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleGoBack = () => {
    navigation?.goBack();
  };

  const handleContactPress = (method: string, value: string) => {
    switch (method) {
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'chat':
        Alert.alert('Live Chat', 'Starting live chat session...');
        break;
      default:
        Alert.alert('Contact', `Contact via ${method}: ${value}`);
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const quickActions = [
    {
      icon: 'comments',
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => handleContactPress('chat', 'live-chat'),
    },
    {
      icon: 'phone',
      title: 'Call Support',
      description: '1-800-PROJECT-T-REX',
      action: () => handleContactPress('phone', '1-800-776-5328'),
    },
    {
      icon: 'email',
      title: 'Email Support',
      description: 'support@project-t-rex.com',
      action: () => handleContactPress('email', 'support@project-t-rex.com'),
    },
  ];

  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I book my first flight lesson?',
          answer: 'To book your first lesson, go to the Reservations tab and tap the "+" button. Select your preferred aircraft, instructor, and time slot. Your first lesson will include a pre-flight briefing with your instructor.',
        },
        {
          question: 'What should I bring to my first lesson?',
          answer: 'Bring a valid photo ID, any required medical certificates, and comfortable clothing. We recommend avoiding loose clothing and jewelry. Your instructor will provide all necessary training materials.',
        },
        {
          question: 'How do I track my training progress?',
          answer: 'Your progress is automatically tracked in the Training tab. You can see completed lessons, upcoming requirements, and your progress toward your pilot license goals.',
        },
      ],
    },
    {
      title: 'Reservations & Scheduling',
      questions: [
        {
          question: 'How far in advance can I book lessons?',
          answer: 'You can book lessons up to 30 days in advance. We recommend booking at least 48 hours ahead to ensure availability with your preferred instructor.',
        },
        {
          question: 'What is the cancellation policy?',
          answer: 'Lessons can be cancelled up to 24 hours in advance without penalty. Cancellations within 24 hours may incur a fee. Weather-related cancellations are always free.',
        },
        {
          question: 'Can I reschedule a lesson?',
          answer: 'Yes! You can reschedule lessons up to 24 hours in advance through the app. Go to your reservation details and tap "Modify" to see available time slots.',
        },
      ],
    },
    {
      title: 'Logbook & Records',
      questions: [
        {
          question: 'How do I add flights to my logbook?',
          answer: 'Flights are automatically added after each lesson. For flights outside our program, use the "Add Flight" button in the Logbook tab to manually enter details.',
        },
        {
          question: 'Can I export my logbook data?',
          answer: 'Yes! Go to Analytics and tap "Download Analytics Report" to export your flight data. This includes all required information for FAA record-keeping.',
        },
        {
          question: 'How do I import flights from other apps?',
          answer: 'In the More tab, select "Import Flights" under the Logbook section. We support imports from most major electronic logbook applications.',
        },
      ],
    },
    {
      title: 'Account & Billing',
      questions: [
        {
          question: 'How do I update my payment method?',
          answer: 'Go to Settings > Payment Methods to add, remove, or update your payment information. All payment data is securely encrypted and PCI compliant.',
        },
        {
          question: 'When am I charged for lessons?',
          answer: 'Payment is processed after each completed lesson based on actual flight time. You\'ll receive a detailed receipt via email within 24 hours.',
        },
        {
          question: 'What if I need to dispute a charge?',
          answer: 'Contact our billing support team within 30 days of the charge. We\'ll review your flight records and work with you to resolve any discrepancies.',
        },
      ],
    },
  ];

  const helpTopics = [
    { icon: 'book', title: 'User Guide', description: 'Complete guide to using the app' },
    { icon: 'play', title: 'Video Tutorials', description: 'Step-by-step video walkthroughs' },
    { icon: 'fileText', title: 'Training Resources', description: 'Study materials and references' },
    { icon: 'users', title: 'Community Forum', description: 'Connect with other pilots' },
    { icon: 'exclamationTriangle', title: 'Report a Bug', description: 'Help us improve the app' },
    { icon: 'star', title: 'Feature Requests', description: 'Suggest new features' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={24} color={Colors.primary.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Contact Options */}
        <View style={styles.quickContactCard}>
          <Text style={styles.h2}>Need Help?</Text>
          <Text style={styles.contactDescription}>
            Our support team is available 24/7 to help with any questions or issues.
          </Text>
          <View style={styles.quickActionsList}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={action.action}
              >
                <View style={styles.quickActionIcon}>
                  <Icon name={action.icon as any} size={20} color={Colors.secondary.electricBlue} />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionDescription}>{action.description}</Text>
                </View>
                <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Icon name="exclamationTriangle" size={20} color={Colors.secondary.orange3} />
            <Text style={styles.emergencyTitle}>Emergency Support</Text>
          </View>
          <Text style={styles.emergencyDescription}>
            For flight safety emergencies or urgent issues, call our 24/7 emergency line:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => handleContactPress('phone', '1-800-911-TREX')}
          >
            <Icon name="phone" size={16} color={Colors.primary.white} style={styles.emergencyButtonIcon} />
            <Text style={styles.emergencyButtonText}>1-800-911-TREX</Text>
          </TouchableOpacity>
        </View>

        {/* Help Topics */}
        <View style={styles.helpTopicsCard}>
          <Text style={styles.h2}>Help Topics</Text>
          <View style={styles.helpTopicsList}>
            {helpTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.helpTopicItem}
                onPress={() => Alert.alert('Help Topic', `Opening: ${topic.title}`)}
              >
                <View style={styles.helpTopicIcon}>
                  <Icon name={topic.icon as any} size={18} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.helpTopicContent}>
                  <Text style={styles.helpTopicTitle}>{topic.title}</Text>
                  <Text style={styles.helpTopicDescription}>{topic.description}</Text>
                </View>
                <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqCard}>
          <Text style={styles.h2}>Frequently Asked Questions</Text>
          {faqCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.faqCategory}>
              <Text style={styles.faqCategoryTitle}>{category.title}</Text>
              {category.questions.map((faq, faqIndex) => {
                const globalIndex = categoryIndex * 100 + faqIndex;
                const isExpanded = expandedFAQ === globalIndex;
                
                return (
                  <View key={faqIndex} style={styles.faqItem}>
                    <TouchableOpacity
                      style={styles.faqQuestion}
                      onPress={() => toggleFAQ(globalIndex)}
                    >
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                      <Icon
                        name={isExpanded ? 'minus' : 'plus'}
                        size={16}
                        color={Colors.neutral.gray500}
                      />
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfoCard}>
          <Text style={styles.h2}>Contact Information</Text>
          <View style={styles.contactInfoList}>
            <View style={styles.contactInfoItem}>
              <Icon name="mapMarkerAlt" size={16} color={Colors.neutral.gray500} style={styles.contactInfoIcon} />
              <View style={styles.contactInfoContent}>
                <Text style={styles.contactInfoLabel}>Address</Text>
                <Text style={styles.contactInfoValue}>
                  123 Aviation Way{'\n'}
                  Flight Training Center{'\n'}
                  Phoenix, AZ 85001
                </Text>
              </View>
            </View>
            <View style={styles.contactInfoItem}>
              <Icon name="clock" size={16} color={Colors.neutral.gray500} style={styles.contactInfoIcon} />
              <View style={styles.contactInfoContent}>
                <Text style={styles.contactInfoLabel}>Support Hours</Text>
                <Text style={styles.contactInfoValue}>
                  24/7 Online Support{'\n'}
                  Phone: Mon-Fri 8AM-8PM PST{'\n'}
                  Chat: Always Available
                </Text>
              </View>
            </View>
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
            <Text style={styles.appInfoLabel}>Device ID</Text>
            <Text style={styles.appInfoValue}>PTX-ABC123-DEF456</Text>
          </View>
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Support ID</Text>
            <Text style={styles.appInfoValue}>USER-789012</Text>
          </View>
          <TouchableOpacity 
            style={styles.copyButton}
            onPress={() => Alert.alert('Copied', 'Support information copied to clipboard')}
          >
            <Icon name="copy" size={14} color={Colors.neutral.gray600} style={styles.copyIcon} />
            <Text style={styles.copyButtonText}>Copy Support Info</Text>
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
  quickContactCard: {
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
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 16,
  },
  quickActionsList: {
    gap: 8,
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  quickActionDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  emergencyCard: {
    backgroundColor: Colors.secondary.orange1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.secondary.orange2,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.secondary.orange3,
    marginLeft: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.secondary.orange3,
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary.orange3,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emergencyButtonIcon: {
    marginRight: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  helpTopicsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  helpTopicsList: {
    gap: 8,
  },
  helpTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  helpTopicIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpTopicContent: {
    flex: 1,
  },
  helpTopicTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  helpTopicDescription: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  faqCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  faqCategory: {
    marginBottom: 16,
  },
  faqCategoryTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.secondary.electricBlue,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  faqQuestionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingBottom: 12,
    paddingRight: 24,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  contactInfoCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  contactInfoList: {
    gap: 16,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactInfoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  contactInfoContent: {
    flex: 1,
  },
  contactInfoLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  contactInfoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
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
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  appInfoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.primary.black,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
  },
  copyIcon: {
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  bottomPadding: {
    height: 40,
  },
});


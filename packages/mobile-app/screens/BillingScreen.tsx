import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography, ScreenHeader } from '../../components/src';

// BillingOverviewCard Component
const BillingOverviewCard: React.FC = () => {
  const loanAmount = "+$350.00";
  const totalPackageCost = "$10,264.80";
  const packageName = "Zero to Hero";
  const loanProgress = 65;
  const minLoanAmount = "$3,281.00";
  const maxLoanAmount = "$50,000.00";
  const showWarning = true;
  const warningText = "Based on your previous flight frequency and projected hours, you may be needing more money in about one month.";
  
  const packageItems = [
    { name: "Flight Instruction", completed: 50, total: 200, unit: "hrs" },
    { name: "Ground Instruction", completed: 25, total: 100, unit: "hrs" },
    { name: "ASEL Rental", completed: 50, total: 200, unit: "hrs" },
    { name: "AMEL Rental", completed: 40, total: 40, unit: "hrs" },
    { name: "Flight Simulator", completed: 10, total: 15, unit: "hrs" }
  ];

  return (
    <View style={styles.billingOverviewCard}>
      {/* Loan Details Section */}
      <View style={styles.loanDetailsSection}>
        <View style={styles.loanDetailsHeader}>
          <Text style={styles.sectionLabel}>LOAN DETAILS</Text>
          <TouchableOpacity onPress={() => Alert.alert('View Application', 'View loan application details')}>
            <Text style={styles.viewApplicationText}>View Application</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.loanAmountContainer}>
          <Text style={styles.loanAmount}>{loanAmount}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${loanProgress}%` }
              ]}
            />
          </View>
        </View>
        
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>{minLoanAmount}</Text>
          <Text style={styles.progressLabel}>{maxLoanAmount}</Text>
        </View>
      </View>

      {/* Warning Section */}
      {showWarning && (
        <View style={styles.warningSection}>
          <View style={styles.warningContent}>
            <Icon name="alertCircle" size={18} color="#FF9500" style={styles.warningIcon} />
            <View style={styles.warningTextContainer}>
              <Text style={styles.warningText}>{warningText}</Text>
              <TouchableOpacity 
                style={styles.startApplicationButton}
                onPress={() => Alert.alert('Start Application', 'Start new loan application')}
              >
                <Text style={styles.startApplicationText}>Start Application</Text>
                <Icon name="chevronRight" size={12} color={Colors.tertiary.denimBlue} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Package Details Section */}
      <View style={styles.packageDetailsSection}>
        <View style={styles.packageDetailsHeader}>
          <Text style={styles.sectionLabel}>PACKAGE DETAILS</Text>
          <View style={styles.packageTitleContainer}>
            <Text style={styles.packageName}>{packageName}</Text>
            <Text style={styles.packageCost}>{totalPackageCost}</Text>
          </View>
        </View>

        {/* Package Items */}
        <View style={styles.packageItems}>
          {packageItems.map((item, index) => (
            <View key={index} style={styles.packageItem}>
              <Text style={styles.packageItemName}>{item.name}</Text>
              <View style={styles.packageItemProgress}>
                <Text style={styles.packageItemCompleted}>{item.completed} {item.unit}</Text>
                <Text style={styles.packageItemTotal}> / {item.total} {item.unit}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default function BillingScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const billingActions = [
    {
      id: 'payment-history',
      title: 'Payment History',
      subtitle: 'View past invoices and payments',
      icon: 'file-text',
      onPress: () => Alert.alert('Payment History', 'Payment history feature coming soon')
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      subtitle: 'Manage cards and payment options',
      icon: 'credit-card',
      onPress: () => Alert.alert('Payment Methods', 'Payment methods management coming soon')
    },
    {
      id: 'spending-analytics',
      title: 'Spending Analytics',
      subtitle: 'Track your training costs and progress',
      icon: 'trending-up',
      onPress: () => Alert.alert('Spending Analytics', 'Spending analytics coming soon')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Standardized Header */}
      <ScreenHeader 
        variant="detail"
        title="Billing Overview"
        subtitle="Manage your training package and financing"
        onBackPress={handleBackPress}
      />

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Billing Overview Card */}
        <BillingOverviewCard />

        {/* Additional Billing Actions */}
        <View style={styles.billingActions}>
          {billingActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionItem}
              onPress={action.onPress}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Icon name={action.icon} size={20} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 24,
  },
  billingOverviewCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  loanDetailsSection: {
    marginBottom: 24,
  },
  loanDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    letterSpacing: 0.5,
  },
  viewApplicationText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.tertiary.denimBlue,
  },
  loanAmountContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  loanAmount: {
    fontSize: Typography.fontSize.xl2,
    fontFamily: Typography.fontFamily.medium,
    color: '#008333',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: Colors.neutral.gray300,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F6A345', // Gradient approximation
    borderRadius: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  warningSection: {
    backgroundColor: '#FFECAB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  warningIcon: {
    marginTop: 2,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 12,
  },
  startApplicationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startApplicationText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.tertiary.denimBlue,
  },
  packageDetailsSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingTop: 16,
  },
  packageDetailsHeader: {
    marginBottom: 16,
  },
  packageTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  packageName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: '#212121',
  },
  packageCost: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
  },
  packageItems: {
    gap: 12,
  },
  packageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageItemName: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: '#212121',
  },
  packageItemProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageItemCompleted: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    color: '#008333',
  },
  packageItemTotal: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
  },
  billingActions: {
    gap: 12,
  },
  actionItem: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: '#212121',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
});
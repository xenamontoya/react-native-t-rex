import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface PackageItem {
  name: string;
  completed: number;
  total: number;
  unit: string;
}

interface BillingOverviewCardProps {
  loanAmount?: string;
  totalPackageCost?: string;
  packageName?: string;
  loanProgress?: number;
  minLoanAmount?: string;
  maxLoanAmount?: string;
  packageItems?: PackageItem[];
  showWarning?: boolean;
  warningText?: string;
  onViewApplication?: () => void;
  onStartApplication?: () => void;
}

const BillingOverviewCard: React.FC<BillingOverviewCardProps> = ({
  loanAmount = "+$350.00",
  totalPackageCost = "$10,264.80",
  packageName = "Zero to Hero",
  loanProgress = 65,
  minLoanAmount = "$3,281.00",
  maxLoanAmount = "$50,000.00",
  packageItems = [
    { name: "Flight Instruction", completed: 50, total: 200, unit: "hrs" },
    { name: "Ground Instruction", completed: 25, total: 100, unit: "hrs" },
    { name: "ASEL Rental", completed: 50, total: 200, unit: "hrs" },
    { name: "AMEL Rental", completed: 40, total: 40, unit: "hrs" },
    { name: "Flight Simulator", completed: 10, total: 15, unit: "hrs" }
  ],
  showWarning = true,
  warningText = "Based on your previous flight frequency and projected hours, you may be needing more money in about one month.",
  onViewApplication,
  onStartApplication
}) => {
  return (
    <View style={styles.container}>
      {/* Loan Details Section */}
      <View style={styles.loanSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LOAN DETAILS</Text>
          <TouchableOpacity onPress={onViewApplication}>
            <Text style={styles.viewApplicationButton}>View Application</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.loanAmountContainer}>
          <Text style={styles.loanAmount}>{loanAmount}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${loanProgress}%` }]}
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
            <Icon name="exclamationTriangle" size={18} color="#ff9500" style={styles.warningIcon} />
            <View style={styles.warningTextContainer}>
              <Text style={styles.warningText}>{warningText}</Text>
              <TouchableOpacity onPress={onStartApplication} style={styles.startApplicationButton}>
                <Text style={styles.startApplicationText}>Start Application</Text>
                <Icon name="chevronRight" size={12} color="#007aff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Package Details Section */}
      <View style={styles.packageSection}>
        <View style={styles.packageHeader}>
          <Text style={styles.sectionTitle}>PACKAGE DETAILS</Text>
          
          <View style={styles.packageTitleRow}>
            <Text style={styles.packageName}>{packageName}</Text>
            <Text style={styles.packageCost}>{totalPackageCost}</Text>
          </View>
        </View>

        {/* Package Items */}
        <View style={styles.packageItems}>
          {packageItems.map((item, index) => (
            <View key={index} style={styles.packageItem}>
              <Text style={styles.packageItemName}>{item.name}</Text>
              <View style={styles.packageItemHours}>
                <Text style={styles.hoursCompleted}>{item.completed} {item.unit}</Text>
                <Text style={styles.hoursTotal}> / {item.total} {item.unit}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  loanSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  viewApplicationButton: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#007aff',
  },
  loanAmountContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  loanAmount: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.medium,
    color: '#008333',
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: Colors.neutral.gray300,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f6a345',
    borderRadius: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  warningSection: {
    backgroundColor: '#ffecab',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: 14,
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
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#007aff',
  },
  packageSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingTop: 16,
  },
  packageHeader: {
    marginBottom: 16,
  },
  packageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  packageName: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: '#212121',
  },
  packageCost: {
    fontSize: 20,
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
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#212121',
  },
  packageItemHours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursCompleted: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#008333',
  },
  hoursTotal: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
  },
});

export default BillingOverviewCard;

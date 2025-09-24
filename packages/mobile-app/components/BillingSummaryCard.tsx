import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../components/src';

interface BillingSummaryCardProps {
  packageName?: string;
  totalCost?: string;
  loanProgress?: number;
  isDark?: boolean;
  onPress?: () => void;
  onViewAll?: () => void;
}

const BillingSummaryCard: React.FC<BillingSummaryCardProps> = ({
  packageName = "Zero to Hero",
  totalCost = "$10,264.80",
  loanProgress = 65,
  isDark = false,
  onPress,
  onViewAll
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#2a2a2a' : Colors.primary.white,
          borderColor: isDark ? '#404040' : Colors.neutral.gray200,
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Billing Overview</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAllButton}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Package Info */}
      <View style={styles.packageInfo}>
        <Text style={styles.packageName}>{packageName}</Text>
        <Text style={styles.packageCost}>{totalCost}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${loanProgress}%` }]}
          />
        </View>
      </View>

      {/* Progress Text */}
      <View style={styles.progressInfo}>
        <Text style={styles.progressLabel}>Loan Progress</Text>
        <Text style={styles.progressValue}>{loanProgress}% complete</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
  },
  viewAllButton: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#5177bb',
  },
  packageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  packageName: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: '#212121',
  },
  packageCost: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.neutral.gray300,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f6a345',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  progressValue: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#d4511e',
  },
});

export default BillingSummaryCard;

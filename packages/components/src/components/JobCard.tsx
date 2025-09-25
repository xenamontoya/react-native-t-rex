import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  category: string;
  location: string;
  status: string;
  statusColor: string;
  isNew?: boolean;
  logo: string;
  progress?: number;
}

interface JobCardProps {
  job: Job;
  showProgress?: boolean;
  onPress?: (job: Job) => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  companyStyle?: StyleProp<TextStyle>;
}

/**
 * 💼 JOB CARD COMPONENT
 * 
 * Unified card component for displaying job opportunities
 * Moved from CareersScreen to component library for reusability
 * 
 * Usage:
 * <JobCard job={job} onPress={handleJobPress} />
 * <JobCard job={job} showProgress={false} />
 * <JobCard job={job} containerStyle={customStyle} />
 */
export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  showProgress = true, 
  onPress,
  containerStyle,
  titleStyle,
  companyStyle,
}) => {
  const getStatusStyle = (statusColor: string) => {
    switch (statusColor) {
      case 'qualified':
        return { backgroundColor: '#dcfce7', color: '#166534' }; // Green
      case 'buildHours':
        return { backgroundColor: '#fed7aa', color: '#c2410c' }; // Orange
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' }; // Gray
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.jobCard, containerStyle]}
      onPress={() => onPress?.(job)}
      activeOpacity={0.7}
    >
      <View style={styles.jobCardContent}>
        <View style={styles.companyLogo}>
          <Text style={styles.logoText}>{job.logo}</Text>
        </View>
        <View style={styles.jobInfo}>
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, getStatusStyle(job.statusColor)]}>
              <Text style={[styles.statusText, { color: getStatusStyle(job.statusColor).color }]}>
                {job.status}
              </Text>
            </View>
            {job.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
          </View>
          <Text style={[styles.jobTitle, titleStyle]}>{job.title}</Text>
          <Text style={[styles.companyName, companyStyle]}>{job.company}</Text>
          <View style={styles.jobMeta}>
            <Text style={styles.jobMetaText}>{job.type}</Text>
            <Text style={styles.jobMetaDot}> • </Text>
            <Text style={styles.jobMetaText}>{job.category}</Text>
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{job.location}</Text>
          </View>
          {showProgress && job.progress && (
            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>{job.progress}% HOURS MET</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${job.progress}%` }]} />
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  jobCardContent: {
    flexDirection: 'row',
  },
  companyLogo: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoText: {
    fontSize: 18,
  },
  jobInfo: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  newBadge: {
    backgroundColor: '#212121',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5177BB',
    marginBottom: 4,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobMetaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  jobMetaDot: {
    fontSize: 14,
    color: '#6b7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressSection: {
    marginTop: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#D4511E',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F6A345',
    borderRadius: 4,
  },
});

export default JobCard;

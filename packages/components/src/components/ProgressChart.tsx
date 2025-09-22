import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../design-system';

export interface StatsGridProps {
  stats: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  columns?: 2 | 3 | 4;
}

export interface TrainingProgressBarProps {
  label: string;
  sublabel?: string;
  current: number;
  total: number;
  unit?: string;
  showPercentage?: boolean;
  showValues?: boolean;
  gradientColors?: string[];
  height?: number;
  status?: string;
  statusColor?: string;
}

export interface CareerMilestoneProps {
  title: string;
  current: number;
  total: number;
  unit: string;
  status: string;
  statusColor?: string;
  gradientColors?: string[];
}

// Stats grid exactly like your student dashboard
export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 3,
}) => {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <Text style={[
            styles.statValue,
            stat.color && { color: stat.color }
          ]}>
            {stat.value}
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

// Progress bar with gradient matching your web app exactly
export const TrainingProgressBar: React.FC<TrainingProgressBarProps> = ({
  label,
  sublabel,
  current,
  total,
  unit = '',
  showPercentage = true,
  showValues = true,
  gradientColors = ['#F6A345', '#FE652A'], // Your exact gradient
  height = 8,
  status,
  statusColor = '#D4511E',
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  const percentageText = `${Math.round(percentage)}%`;

  return (
    <View style={styles.progressContainer}>
      {/* Header */}
      <View style={styles.progressHeader}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>{label}</Text>
          {sublabel && (
            <Text style={styles.progressSublabel}>{sublabel}</Text>
          )}
        </View>
        {status && (
          <Text style={[styles.progressStatus, { color: statusColor }]}>
            {status}
          </Text>
        )}
        {showPercentage && !status && (
          <Text style={[styles.progressPercentage, { color: statusColor }]}>
            {percentageText}
          </Text>
        )}
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressTrack, { height }]}>
        <LinearGradient
          colors={gradientColors as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressFill,
            { 
              width: `${percentage}%`,
              height,
            }
          ]}
        />
      </View>

      {/* Values */}
      {showValues && (
        <View style={styles.progressValues}>
          <Text style={styles.progressValueText}>
            {current.toFixed(1)} / {total} {unit}
          </Text>
          <Text style={styles.progressValueText}>
            {percentageText} complete
          </Text>
        </View>
      )}
    </View>
  );
};

// Career milestone component matching your Private Pilot progress
export const CareerMilestone: React.FC<CareerMilestoneProps> = ({
  title,
  current,
  total,
  unit,
  status,
  statusColor = '#D4511E',
  gradientColors = ['#F6A345', '#FE652A'],
}) => {
  return (
    <View style={styles.milestoneContainer}>
      <TrainingProgressBar
        label={title}
        current={current}
        total={total}
        unit={unit}
        status={status}
        statusColor={statusColor}
        gradientColors={gradientColors}
        showPercentage={false}
        showValues={true}
      />
    </View>
  );
};

// Training progress component exactly like your student dashboard
export const TrainingProgress: React.FC<{
  course: string;
  progress: string;
  totalHours: number;
  lessonsCompleted: number;
  flightsLogged: number;
}> = ({ course, progress, totalHours, lessonsCompleted, flightsLogged }) => {
  // Extract percentage from progress string (e.g., "65%" -> 65)
  const progressValue = parseInt(progress.replace('%', '')) || 0;

  const stats = [
    { label: 'Total Hours', value: totalHours.toFixed(1) },
    { label: 'Lessons Completed', value: lessonsCompleted },
    { label: 'Flights Logged', value: flightsLogged },
  ];

  return (
    <View style={styles.trainingContainer}>
      <TrainingProgressBar
        label="Training Progress"
        sublabel={course}
        current={progressValue}
        total={100}
        unit="%"
        showPercentage={true}
        showValues={false}
        height={8}
      />
      
      <View style={styles.statsSpacing}>
        <StatsGrid stats={stats} columns={3} />
      </View>
    </View>
  );
};

// Hours breakdown component for detailed flight time display
export const HoursBreakdown: React.FC<{
  totalHours: number;
  soloHours: number;
  dualHours: number;
  picHours?: number;
  crossCountryHours?: number;
  nightHours?: number;
  instrumentHours?: number;
}> = ({ 
  totalHours, 
  soloHours, 
  dualHours, 
  picHours, 
  crossCountryHours, 
  nightHours, 
  instrumentHours 
}) => {
  const breakdownItems = [
    { label: 'Total Time', value: totalHours.toFixed(1), color: Colors.primary.black },
    { label: 'Solo', value: soloHours.toFixed(1), color: Colors.secondary.electricBlue },
    { label: 'Dual', value: dualHours.toFixed(1), color: Colors.secondary.orange3 },
    ...(picHours ? [{ label: 'PIC', value: picHours.toFixed(1), color: Colors.accent.green }] : []),
    ...(crossCountryHours ? [{ label: 'Cross Country', value: crossCountryHours.toFixed(1), color: Colors.tertiary.denimBlue }] : []),
    ...(nightHours ? [{ label: 'Night', value: nightHours.toFixed(1), color: Colors.neutral.gray700 }] : []),
    ...(instrumentHours ? [{ label: 'Instrument', value: instrumentHours.toFixed(1), color: Colors.accent.purple }] : []),
  ];

  return (
    <View style={styles.breakdownContainer}>
      <Text style={styles.breakdownTitle}>Flight Hours Breakdown</Text>
      <StatsGrid stats={breakdownItems} columns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '30%', // For 3 columns
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginVertical: Spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  progressLabels: {
    flex: 1,
  },
  progressLabel: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  progressSublabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  progressStatus: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  progressPercentage: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
  },
  progressTrack: {
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    borderRadius: 4,
  },
  progressValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressValueText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  milestoneContainer: {
    marginVertical: Spacing.md,
  },
  trainingContainer: {
    marginVertical: Spacing.md,
  },
  statsSpacing: {
    marginTop: Spacing.md,
  },
  breakdownContainer: {
    marginVertical: Spacing.md,
  },
  breakdownTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
});

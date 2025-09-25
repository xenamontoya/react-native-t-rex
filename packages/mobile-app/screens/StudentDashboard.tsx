/**
 * Student Dashboard - Converted from original project-t-rex student.tsx
 * Main dashboard screen for student experience
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { Icon } from '../components/Icons';
import { AdaptiveAIModal } from '../components';
import { 
  Colors, 
  Typography, 
  Spacing, 
  Card, 
  Button, 
  StatusBadge, 
  ProgressBar,
  AIInsightsHeader,
} from '../../components/src';

interface StudentData {
  id: string;
  name: string;
  progress: string;
  totalHours: string;
  stage: string;
  course: string;
  enrollmentDate: string;
  lessons: any[];
}

interface NextLesson {
  id: string;
  title: string;
  description: string;
  status: string;
  date: string;
  duration: string;
}

export default function StudentDashboard({ navigation }: any) {
  const [student] = useState<StudentData>({
    id: 'student-1',
    name: 'Alex Johnson',
    progress: '75%',
    totalHours: '24.5',
    stage: 'Pre-Solo',
    course: 'Private Pilot License (PPL)',
    enrollmentDate: '2023-09-15',
    lessons: []
  });
  const [showAIInsightsModal, setShowAIInsightsModal] = useState(false);

  // Mock data
  const unreadCount = 3;
  const totalFlightTime = 24.5;
  const completedLessons = 8;
  const totalFlights = 12;
  const dualTime = 22.1;
  const soloTime = 2.4;

  const nextLesson: NextLesson = {
    id: 'l3',
    title: 'Basic Maneuvers',
    description: 'Straight and level, climbs, descents, turns',
    status: 'scheduled',
    date: '2025-08-15',
    duration: '1.8 hours'
  };

  const recentCompletedLessons = [
    {
      id: 'l2',
      title: 'First Flight - Familiarization',
      description: 'Aircraft familiarization and basic controls',
      status: 'completed',
      date: '2023-10-01',
      duration: '1.5 hours',
      overallGrade: 'Complete'
    }
  ];

  const handleAIInsights = () => {
    setShowAIInsightsModal(true);
  };

  const handleNotifications = () => {
    navigation?.navigate('Notifications');
  };

  const handleViewTraining = () => {
    navigation?.navigate('Training');
  };

  const handleViewLogbook = () => {
    navigation?.navigate('Logbook');
  };

  const handleCareers = () => {
    navigation?.navigate('Careers');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              {/* Profile Avatar */}
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: `https://i.pravatar.cc/64?seed=${student.name}` }}
                  style={styles.avatar}
                />
              </View>
              
              {/* Welcome Text */}
              <View style={styles.welcomeText}>
                <Text style={styles.welcomeLabel}>Welcome back,</Text>
                <Text style={styles.studentName}>{student.name}</Text>
              </View>
            </View>

            {/* Notifications Bell */}
            <TouchableOpacity style={styles.notificationButton} onPress={handleNotifications}>
              <Icon name="bell" size={24} color={Colors.neutral.gray600} />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Training Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressTitle}>Training Progress</Text>
                <Text style={styles.courseText}>{student.course}</Text>
              </View>
              <Text style={styles.progressPercentage}>{student.progress}</Text>
            </View>
            
            <ProgressBar 
              progress={75} 
              style={styles.progressBar}
              showPercentage={false}
            />
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{student.totalHours}</Text>
              <Text style={styles.statLabel}>TOTAL HOURS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedLessons}</Text>
              <Text style={styles.statLabel}>LESSONS COMPLETED</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalFlights}</Text>
              <Text style={styles.statLabel}>FLIGHTS LOGGED</Text>
            </View>
          </View>
        </View>

        {/* What's Next Card */}
        <Card variant="electricBlue" style={styles.nextCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>What's Next</Text>
            <TouchableOpacity onPress={handleViewTraining}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* AI Preparation Card */}
          <TouchableOpacity style={styles.aiCard} onPress={handleAIInsights}>
            <View style={styles.aiCardContent}>
              <View style={styles.aiIcon}>
                <Icon name="robot" size={20} color={Colors.secondary.electricBlue} />
              </View>
              <View style={styles.aiTextContent}>
                <Text style={styles.aiTitle}>Prepare with Wingman AI</Text>
                <Text style={styles.aiSubtitle}>Get ready for your {nextLesson.title} lesson</Text>
              </View>
              <Icon name="arrowRight" size={16} color={Colors.secondary.electricBlue} />
            </View>
          </TouchableOpacity>

          {/* Next Lesson */}
          <Card variant="default" style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>{nextLesson.title}</Text>
            <Text style={styles.lessonDescription}>{nextLesson.description}</Text>
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                <Text style={styles.metaText}>AUG 15</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                <Text style={styles.metaText}>1.8 HOURS</Text>
              </View>
            </View>
            <Text style={styles.costText}>Est. Cost: $485.00</Text>
            <StatusBadge status="scheduled" style={styles.statusBadge} />
          </Card>
        </Card>

        {/* Career Progress */}
        <Card style={styles.careerCard}>
          <Text style={styles.cardTitle}>Career Progress</Text>
          
          {/* Current Goal */}
          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Private Pilot License</Text>
              <Text style={styles.goalStatus}>In Progress</Text>
            </View>
            <ProgressBar 
              progress={(totalFlightTime / 40) * 100}
              style={styles.goalProgressBar}
              showPercentage={false}
            />
            <View style={styles.goalStats}>
              <Text style={styles.goalStatsText}>{totalFlightTime} / 40 hours</Text>
              <Text style={styles.goalStatsText}>{Math.round((totalFlightTime / 40) * 100)}% complete</Text>
            </View>
          </View>

          {/* Career Milestones */}
          <View style={styles.milestonesContainer}>
            <View style={styles.milestoneActive}>
              <View style={styles.milestoneNumber}>
                <Text style={styles.milestoneNumberText}>1</Text>
              </View>
              <Text style={styles.milestoneTitle}>Private Pilot</Text>
              <StatusBadge status="in-progress" size="small" />
            </View>
            
            <View style={styles.milestoneInactive}>
              <View style={styles.milestoneNumberInactive}>
                <Text style={styles.milestoneNumberInactiveText}>2</Text>
              </View>
              <Text style={styles.milestoneTitleInactive}>Instrument Rating</Text>
              <View style={styles.milestoneRequirement}>
                <Text style={styles.milestoneRequirementText}>250+ hrs</Text>
              </View>
            </View>
          </View>

          {/* AI Career Insights */}
          <View style={styles.aiInsightsCard}>
            <AIInsightsHeader title="AI Career Insights" />
            <Text style={styles.aiInsightsText}>
              Based on your progress, you're eligible for airline cadet programs that can fast-track your career.
            </Text>
            <Button
              variant="primary"
              size="small"
              onPress={handleCareers}
              style={styles.careersButton}
            >
              Browse Cadet Programs
            </Button>
          </View>
        </Card>

        {/* Recent Activity Grid */}
        <View style={styles.activityGrid}>
          {/* Recent Lessons */}
          <Card style={[styles.activityCard, styles.activityCardHalf]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Lessons</Text>
              <TouchableOpacity onPress={handleViewTraining}>
                <Text style={styles.viewAllText}>View All →</Text>
              </TouchableOpacity>
            </View>
            
            {recentCompletedLessons.map((lesson) => (
              <View key={lesson.id} style={styles.recentLessonItem}>
                <Text style={styles.recentLessonTitle}>{lesson.title}</Text>
                <Text style={styles.recentLessonDescription}>{lesson.description}</Text>
                <View style={styles.lessonMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                    <Text style={styles.metaText}>OCT 01</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                    <Text style={styles.metaText}>1.5 HOURS</Text>
                  </View>
                </View>
                <StatusBadge status="complete" size="small" />
              </View>
            ))}
          </Card>

          {/* Flight Statistics */}
          <Card style={[styles.activityCard, styles.activityCardHalf]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Flight Statistics</Text>
              <TouchableOpacity onPress={handleViewLogbook}>
                <Text style={styles.viewAllText}>View Logbook →</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <View style={styles.statRowContent}>
                  <Icon name="clock" size={16} color={Colors.neutral.gray600} />
                  <Text style={styles.statRowLabel}>Total Flight Time</Text>
                </View>
                <Text style={styles.statRowValue}>{totalFlightTime} hrs</Text>
              </View>
              
              <View style={styles.statRow}>
                <View style={styles.statRowContent}>
                  <Icon name="userTie" size={16} color={Colors.neutral.gray600} />
                  <Text style={styles.statRowLabel}>Dual Instruction</Text>
                </View>
                <Text style={styles.statRowValue}>{dualTime} hrs</Text>
              </View>
              
              <View style={styles.statRow}>
                <View style={styles.statRowContent}>
                  <Icon name="plane" size={16} color={Colors.neutral.gray600} />
                  <Text style={styles.statRowLabel}>Solo Time</Text>
                </View>
                <Text style={styles.statRowValue}>{soloTime} hrs</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom Padding for Tab Navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* AI Insights Modal */}
      <AdaptiveAIModal
        isOpen={showAIInsightsModal}
        onClose={() => setShowAIInsightsModal(false)}
        lessonTitle={nextLesson.title}
        mode="preparation"
        tabletLayout="fullScreen"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.screen.marginBottom,
  },
  
  // Welcome Section
  welcomeSection: {
    backgroundColor: Colors.neutral.gray50,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.screen.padding,
    paddingBottom: Spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    lineHeight: 22,
  },
  studentName: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginTop: -2,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: Colors.status.error,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },

  // Progress Section
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  courseText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  progressPercentage: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.secondary.orange2,
  },
  progressBar: {
    marginBottom: Spacing.md,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },

  // Cards
  nextCard: {
    marginHorizontal: Spacing.screen.padding,
    marginBottom: Spacing.lg,
  },
  careerCard: {
    marginHorizontal: Spacing.screen.padding,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  viewAllText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.tertiary.denimBlue,
  },

  // AI Card
  aiCard: {
    backgroundColor: Colors.primary.black,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.black,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  aiTextContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
    marginBottom: Spacing.xs,
  },
  aiSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Lesson Card
  lessonCard: {
    position: 'relative',
  },
  lessonTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: Spacing.xs,
  },
  lessonDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.sm,
  },
  lessonMeta: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  metaText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
    marginLeft: Spacing.xs,
  },
  costText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: '#008333',
    marginBottom: Spacing.sm,
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },

  // Career Progress
  goalSection: {
    marginBottom: Spacing.lg,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  goalTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  goalStatus: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.secondary.orange2,
  },
  goalProgressBar: {
    marginBottom: Spacing.sm,
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalStatsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
  },

  // Milestones
  milestonesContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  milestoneActive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
  },
  milestoneNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  milestoneNumberText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  milestoneTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    flex: 1,
  },
  milestoneInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  milestoneNumberInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  milestoneNumberInactiveText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray600,
  },
  milestoneTitleInactive: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  milestoneRequirement: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  milestoneRequirementText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },

  // AI Insights Card
  aiInsightsCard: {
    padding: Spacing.md,
    backgroundColor: '#E8FDFC',
    borderRadius: 12,
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  aiInsightsTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: '#0891B2',
    marginLeft: Spacing.xs,
  },
  aiInsightsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.sm,
  },
  careersButton: {
    alignSelf: 'flex-start',
  },

  // Activity Grid
  activityGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screen.padding,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  activityCard: {
    flex: 1,
  },
  activityCardHalf: {
    flex: 0.5,
  },

  // Recent Lesson Item
  recentLessonItem: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    padding: Spacing.md,
    position: 'relative',
  },
  recentLessonTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: Spacing.xs,
  },
  recentLessonDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.sm,
  },

  // Flight Statistics
  statsContainer: {
    gap: Spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  statRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statRowLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.gray600,
    marginLeft: Spacing.sm,
  },
  statRowValue: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },

  // Bottom Padding
  bottomPadding: {
    height: Spacing.screen.marginBottom,
  },
});

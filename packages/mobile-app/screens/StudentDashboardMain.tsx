import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon, AdaptiveAIModal } from '../components';
import { useNavigation } from '@react-navigation/native';

// This is a React Native conversion of the original student.tsx dashboard
const StudentDashboardMain: React.FC = () => {
  const navigation = useNavigation();
  const [student, setStudent] = useState<any>(null);
  const isDark = false; // TODO: Connect to theme store
  const unreadCount = 0; // TODO: Connect to notification store
  const [showAIInsightsModal, setShowAIInsightsModal] = useState(false);

  useEffect(() => {
    // Load student data (copied from original)
    const alexJohnsonData = {
      id: 'student-1',
      name: 'Alex Johnson',
      progress: '75%',
      totalHours: '24.5',
      stage: 'Pre-Solo',
      course: 'Private Pilot License (PPL)',
      enrollmentDate: '2023-09-15',
      lessons: [
        // SCHEDULED LESSONS
        { 
          id: 'l3', 
          title: 'Basic Maneuvers', 
          description: 'Straight and level, climbs, descents, turns', 
          status: 'scheduled', 
          date: '2025-08-15', 
          duration: '1.8 hours',
          reservationId: '1703772000000'
        },
        // PENDING LESSONS
        { 
          id: 'l4', 
          title: 'Traffic Pattern Work', 
          description: 'Airport traffic pattern and landings', 
          status: 'pending', 
          duration: '2.0 hours'
        },
        { 
          id: 'l5', 
          title: 'Emergency Procedures', 
          description: 'Emergency handling and safety procedures', 
          status: 'pending', 
          duration: '1.5 hours'
        },
        // COMPLETED LESSONS
        { 
          id: 'l1', 
          title: 'Ground School - Regulations', 
          description: 'Introduction to FAR/AIM and basic regulations', 
          status: 'completed', 
          date: '2023-09-20', 
          duration: '2 hours',
          overallGrade: 'Complete',
          overallNotes: 'Alex demonstrated excellent understanding of basic FAR regulations and airspace requirements.',
        },
        { 
          id: 'l2', 
          title: 'First Flight - Familiarization', 
          description: 'Aircraft familiarization and basic controls', 
          status: 'completed', 
          date: '2023-10-01', 
          duration: '1.5 hours',
          overallGrade: 'Complete',
          overallNotes: 'Great first flight! Alex showed natural aptitude for aircraft control and was very attentive to instruction.',
        }
      ]
    };

    setStudent(alexJohnsonData);
  }, []);

  // Calculate student progress metrics
  const totalFlightTime = 24.5; // From logged flights
  const soloTime = 0; // No solo time yet
  const dualTime = 24.5; // All dual instruction time
  const savedFlights = []; // TODO: Connect to flight store

  // Get next scheduled lesson
  const nextLesson = student?.lessons?.find((lesson: any) => lesson.status === 'scheduled');

  // Get recent completed lessons
  const recentCompletedLessons = student?.lessons?.filter((lesson: any) => lesson.status === 'completed')
    .sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    .slice(0, 2);

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!student) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }]}>
        {/* Welcome Header with Training Summary */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            {/* Profile Avatar */}
            <Image 
              source={{ uri: `https://i.pravatar.cc/64?seed=${student.name}` }}
              style={styles.avatar}
            />
            
            {/* Welcome Text */}
            <View style={styles.welcomeText}>
              <Text style={[styles.welcomeLabel, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                Welcome back,
              </Text>
              <Text style={[styles.name, { color: isDark ? '#ffffff' : '#111827' }]}>
                {student.name}
              </Text>
            </View>
          </View>

          {/* Notifications Bell */}
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications' as never)}
          >
            <Icon name="bell" size={20} color={isDark ? '#a0a0a0' : '#6b7280'} />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={[styles.progressTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                Training Progress
              </Text>
              <Text style={[styles.progressSubtitle, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
                {student.course}
              </Text>
            </View>
            <Text style={[styles.progressPercentage, { color: '#D4511E' }]}>
              {student.progress}
            </Text>
          </View>
          <View style={[styles.progressBarContainer, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb' }]}>
            <View 
              style={[
                styles.progressBar,
                { 
                  width: student.progress,
                  backgroundColor: '#FE652A'
                }
              ]}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
              {student.totalHours}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              Total Hours
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
              {student.lessons?.filter((l: any) => l.status === 'completed').length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              Lessons Completed
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
              {savedFlights.length}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              Flights Logged
            </Text>
          </View>
        </View>
      </View>

      {/* What's Next */}
      {nextLesson && (
        <View style={[styles.card, { borderColor: '#00FFF2' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>What's Next</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('StudentTraining' as never)}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View All</Text>
              <Icon name="arrow-right" size={12} color="#5177bb" />
            </TouchableOpacity>
          </View>

          {/* AI Preparation Card */}
          <TouchableOpacity 
            style={styles.aiCard}
            onPress={() => setShowAIInsightsModal(true)}
          >
            <View style={styles.aiCardContent}>
              <View style={styles.aiCardIcon}>
                <Image 
                  source={{ uri: '/logos/SVG/pilotbase-icon.svg' }}
                  style={styles.pilotbaseIcon}
                />
              </View>
              <View>
                <Text style={styles.aiCardTitle}>Prepare with Wingman AI</Text>
                <Text style={styles.aiCardSubtitle}>Get ready for your {nextLesson.title} lesson</Text>
              </View>
            </View>
            <Icon name="arrow-right" size={16} color="#00FFF2" />
          </TouchableOpacity>

          {/* Next Lesson Details */}
          <View style={styles.lessonCard}>
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{nextLesson.title}</Text>
              <Text style={styles.lessonDescription}>{nextLesson.description}</Text>
              <View style={styles.lessonDetails}>
                <View style={styles.lessonDetailItem}>
                  <Icon name="calendar" size={12} color="#6b7280" />
                  <Text style={styles.lessonDetailText}>{formatShortDate(nextLesson.date)}</Text>
                </View>
                <View style={styles.lessonDetailItem}>
                  <Icon name="clock-o" size={12} color="#6b7280" />
                  <Text style={styles.lessonDetailText}>{nextLesson.duration}</Text>
                </View>
              </View>
              <Text style={[styles.cost, { color: '#008333' }]}>Est. Cost: $485.00</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Scheduled</Text>
            </View>
          </View>
        </View>
      )}

      {/* Career Progress */}
      <View style={styles.activityCard}>
        <Text style={styles.cardTitle}>Career Progress</Text>
        
        {/* Current Goal: Private Pilot */}
        <View style={styles.careerGoal}>
          <View style={styles.careerHeader}>
            <Text style={[styles.careerTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
              Private Pilot License
            </Text>
            <Text style={[styles.careerStatus, { color: '#D4511E' }]}>In Progress</Text>
          </View>
          <View style={[styles.careerProgressBar, { backgroundColor: isDark ? '#404040' : '#e5e7eb' }]}>
            <View 
              style={[
                styles.careerProgress,
                { 
                  width: `${Math.min((totalFlightTime / 40) * 100, 100)}%`,
                  backgroundColor: '#FE652A'
                }
              ]}
            />
          </View>
          <View style={styles.careerProgressText}>
            <Text style={[styles.careerProgressLeft, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              {totalFlightTime.toFixed(1)} / 40 hours
            </Text>
            <Text style={[styles.careerProgressRight, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              {Math.round((totalFlightTime / 40) * 100)}% complete
            </Text>
          </View>
        </View>

        {/* Career Path Milestones */}
        <View style={styles.milestones}>
          <View style={[styles.milestoneItem, { borderColor: '#00FFF2' }]}>
            <View style={styles.milestoneContent}>
              <View style={[styles.milestoneNumber, { backgroundColor: '#00FFF2' }]}>
                <Text style={styles.milestoneNumberText}>1</Text>
              </View>
              <Text style={[styles.milestoneText, { color: isDark ? '#ffffff' : '#111827' }]}>
                Private Pilot
              </Text>
            </View>
            <View style={styles.currentGoalBadge}>
              <Text style={styles.currentGoalText}>Current Goal</Text>
            </View>
          </View>
          
          <View style={[styles.milestoneItem, { backgroundColor: isDark ? '#333333' : '#f9fafb' }]}>
            <View style={styles.milestoneContent}>
              <View style={[styles.milestoneNumber, { backgroundColor: isDark ? '#555555' : '#d1d5db' }]}>
                <Text style={[styles.milestoneNumberText, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>2</Text>
              </View>
              <Text style={[styles.milestoneText, { color: isDark ? '#a0a0a0' : '#374151' }]}>
                Instrument Rating
              </Text>
            </View>
            <View style={[styles.futureBadge, { backgroundColor: isDark ? '#555555' : '#f3f4f6' }]}>
              <Text style={[styles.futureText, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>250+ hrs</Text>
            </View>
          </View>
        </View>

        {/* AI Career Insights */}
        <View style={styles.aiInsights}>
          <View style={styles.aiInsightsHeader}>
            <Image 
              source={{ uri: '/logos/SVG/pilotbase-icon.svg' }}
              style={styles.aiInsightsIcon}
            />
            <Text style={styles.aiInsightsTitle}>AI Career Insights</Text>
          </View>
          <Text style={styles.aiInsightsText}>
            Based on your progress, you're eligible for airline cadet programs that can fast-track your career.
          </Text>
          <TouchableOpacity 
            style={styles.aiInsightsButton}
            onPress={() => navigation.navigate('Careers' as never)}
          >
            <Text style={styles.aiInsightsButtonText}>Browse Cadet Programs</Text>
            <Icon name="chevron-right" size={12} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity Grid */}
      <View style={styles.activityGrid}>
        {/* Recent Lessons */}
        {recentCompletedLessons && recentCompletedLessons.length > 0 && (
          <View style={styles.activityCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Lessons</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('StudentTraining' as never)}
                style={styles.viewAllButton}
              >
                <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View All</Text>
                <Icon name="arrow-right" size={12} color="#5177bb" />
              </TouchableOpacity>
            </View>
            <View style={styles.lessonsList}>
              {recentCompletedLessons.map((lesson: any) => (
                <View key={lesson.id} style={styles.recentLessonItem}>
                  <View style={styles.recentLessonContent}>
                    <Text style={styles.recentLessonTitle}>{lesson.title}</Text>
                    <Text style={styles.recentLessonDescription}>{lesson.description}</Text>
                    <View style={styles.recentLessonDetails}>
                      <View style={styles.recentLessonDetailItem}>
                        <Icon name="calendar" size={12} color="#6b7280" />
                        <Text style={styles.recentLessonDetailText}>{formatShortDate(lesson.date)}</Text>
                      </View>
                      <View style={styles.recentLessonDetailItem}>
                        <Icon name="clock-o" size={12} color="#6b7280" />
                        <Text style={styles.recentLessonDetailText}>{lesson.duration}</Text>
                      </View>
                    </View>
                  </View>
                  {lesson.overallGrade && (
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeText}>{lesson.overallGrade}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Flight Statistics */}
        <View style={styles.activityCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Flight Statistics</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('StudentMyFlights' as never)}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View Logbook</Text>
              <Icon name="arrow-right" size={12} color="#5177bb" />
            </TouchableOpacity>
          </View>
          <View style={styles.flightStats}>
            <View style={styles.flightStatItem}>
              <View style={styles.flightStatContent}>
                <Icon name="clock-o" size={16} color="#6b7280" />
                <Text style={styles.flightStatLabel}>Total Flight Time</Text>
              </View>
              <Text style={styles.flightStatValue}>{totalFlightTime.toFixed(1)} hrs</Text>
            </View>
            <View style={styles.flightStatItem}>
              <View style={styles.flightStatContent}>
                <Icon name="user" size={16} color="#6b7280" />
                <Text style={styles.flightStatLabel}>Dual Instruction</Text>
              </View>
              <Text style={styles.flightStatValue}>{dualTime.toFixed(1)} hrs</Text>
            </View>
            <View style={styles.flightStatItem}>
              <View style={styles.flightStatContent}>
                <Icon name="plane" size={16} color="#6b7280" />
                <Text style={styles.flightStatLabel}>Solo Time</Text>
              </View>
              <Text style={[
                styles.flightStatValue, 
                { color: soloTime > 0 ? '#10b981' : (isDark ? '#ffffff' : '#111827') }
              ]}>
                {soloTime.toFixed(1)} hrs
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

      {/* AI Insights Modal */}
      <AdaptiveAIModal
        isOpen={showAIInsightsModal}
        onClose={() => setShowAIInsightsModal(false)}
        lessonTitle={nextLesson?.title || 'Next Lesson'}
        mode="preparation"
        tabletLayout="fullScreen"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 256,
  },
  loadingText: {
    color: '#6b7280',
    marginBottom: 16,
  },
  headerContainer: {
    padding: 24,
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 18,
    lineHeight: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: -4,
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
    borderRadius: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontWeight: '600',
  },
  progressSubtitle: {
    fontSize: 14,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 24,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  aiCard: {
    backgroundColor: '#212121',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00FFF2',
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pilotbaseIcon: {
    width: 20,
    height: 20,
  },
  aiCardTitle: {
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  aiCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lessonCard: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  lessonDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  lessonDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonDetailText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginLeft: 4,
  },
  cost: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#C44510',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
    marginBottom: 24,
  },
  careerGoal: {
    marginBottom: 24,
  },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  careerTitle: {
    fontWeight: '500',
  },
  careerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  careerProgressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  careerProgress: {
    height: 8,
    borderRadius: 4,
  },
  careerProgressText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  careerProgressLeft: {
    fontSize: 14,
  },
  careerProgressRight: {
    fontSize: 14,
  },
  milestones: {
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  milestoneNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  milestoneNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  milestoneText: {
    fontWeight: '500',
  },
  currentGoalBadge: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentGoalText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C44510',
  },
  futureBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  futureText: {
    fontSize: 12,
    fontWeight: '600',
  },
  aiInsights: {
    backgroundColor: '#E8FDFC',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiInsightsIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  aiInsightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891B2',
  },
  aiInsightsText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  aiInsightsButton: {
    backgroundColor: '#212121',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  aiInsightsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,
  },
  activityGrid: {
    marginBottom: 24,
  },
  lessonsList: {
    gap: 12,
  },
  recentLessonItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recentLessonContent: {
    flex: 1,
  },
  recentLessonTitle: {
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  recentLessonDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  recentLessonDetails: {
    flexDirection: 'row',
  },
  recentLessonDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  recentLessonDetailText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginLeft: 4,
  },
  gradeBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#004D47',
  },
  flightStats: {
    gap: 16,
  },
  flightStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  flightStatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightStatLabel: {
    color: '#374151',
    marginLeft: 8,
  },
  flightStatValue: {
    fontWeight: '600',
    color: '#111827',
  },
});

export default StudentDashboardMain;

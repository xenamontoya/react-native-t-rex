import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  Image,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography, FloatingAIButton, ScreenHeader } from '../../components/src';
// Removed broken asset imports - using direct require() instead

interface Lesson {
  id: string;
  title: string;
  description: string;
  status: 'scheduled' | 'pending' | 'completed' | 'cancelled';
  date?: string;
  duration: string;
  objectives?: string[];
  learningObjectives?: Task[];
  reservationId?: string;
  aircraft?: string;
  startTime?: string;
  endTime?: string;
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  instructor?: string;
}

interface Task {
  id: string;
  title: string;
  category: string;
  required: boolean;
}

interface StudentData {
  id: string;
  name: string;
  progress: string;
  totalHours: string;
  stage: string;
  course: string;
  enrollmentDate: string;
  lessons: Lesson[];
}

export default function StudentTraining({ navigation }: any) {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [showAIInsights, setShowAIInsights] = useState(false);

  useEffect(() => {
    // Load student data
    const studentData: StudentData = {
      id: 'student-1',
      name: 'Alex Johnson',
      progress: '75%',
      totalHours: '24.5',
      stage: 'Pre-Solo',
      course: 'Private Pilot License (PPL)',
      enrollmentDate: '2023-09-15',
      lessons: [
        // Scheduled Lessons
        {
          id: 'l3',
          title: 'Basic Maneuvers',
          description: 'Straight and level, climbs, descents, turns',
          status: 'scheduled',
          date: '2024-03-15',
          duration: '1.8 hours',
          reservationId: '1703772000000',
          aircraft: 'N12345',
          startTime: '09:00',
          endTime: '10:48',
          instructor: 'John Smith',
        },
        // Pending Lessons
        {
          id: 'l4',
          title: 'Traffic Pattern Work',
          description: 'Airport traffic pattern and landings',
          status: 'pending',
          duration: '2.0 hours',
          objectives: [
            'Master airport traffic pattern procedures',
            'Practice proper radio communications',
            'Perfect normal approach and landing techniques',
          ],
        },
        {
          id: 'l5',
          title: 'Emergency Procedures',
          description: 'Emergency handling and safety procedures',
          status: 'pending',
          duration: '1.5 hours',
          objectives: [
            'Master emergency descent procedures',
            'Practice emergency approach and landing techniques',
            'Handle systems and equipment malfunctions',
          ],
        },
        {
          id: 'l6',
          title: 'Steep Turns & Stalls',
          description: 'Advanced maneuvering and stall recovery',
          status: 'pending',
          duration: '1.8 hours',
          objectives: [
            'Execute precise 45-degree steep turns',
            'Practice maneuvering during slow flight',
            'Master power-off stall recognition and recovery',
          ],
        },
        // Completed Lessons
        {
          id: 'lesson-1',
          title: 'Basic Maneuvers',
          description: 'Practice of fundamental aircraft maneuvers',
          status: 'completed',
          date: '2023-09-20',
          duration: '1.2 hours',
          objectives: ['Straight and level flight', 'Turns', 'Climbs and descents'],
          overallGrade: 'Complete',
          overallNotes: 'Excellent progress on basic maneuvers. Good altitude control and smooth coordination.',
          instructor: 'John Smith',
        },
        {
          id: 'lesson-2',
          title: 'Traffic Pattern Work',
          description: 'Traffic pattern procedures and landing practice',
          status: 'completed',
          date: '2023-10-01',
          duration: '1.0 hours',
          objectives: ['Pattern entry', 'Landing approaches', 'Radio communications'],
          overallGrade: 'Complete',
          overallNotes: 'Strong traffic pattern work with consistent approach management.',
          instructor: 'Jane Davis',
        },
      ],
    };

    setStudent(studentData);
  }, []);

  const getStatusBadge = (status: string) => {
    let style = { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray600 };
    
    switch (status) {
      case 'scheduled':
        style = { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
        break;
      case 'pending':
        style = { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
        break;
      case 'completed':
        style = { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
        break;
      case 'cancelled':
        style = { backgroundColor: '#FEE2E2', color: '#DC2626' };
        break;
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: style.backgroundColor }]}>
        <Text style={[styles.statusText, { color: style.color }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLessonPress = (lesson: Lesson) => {
    navigation.navigate('LessonDetailsScreen', { 
      lessonData: JSON.stringify(lesson),
      role: 'student'
    });
  };

  const handleScheduleLesson = () => {
    navigation.navigate('ReservationsScreen');
  };

  const handleGroundSchool = () => {
    Linking.openURL('https://www.sportys.com/pilot-training/');
  };

  if (!student) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your training progress...</Text>
      </View>
    );
  }

  const scheduledLessons = student.lessons.filter(lesson => lesson.status === 'scheduled');
  const pendingLessons = student.lessons.filter(lesson => lesson.status === 'pending');
  const completedLessons = student.lessons.filter(lesson => lesson.status === 'completed')
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Training</Text>
        {/* SIMPLE TEST - BIG VISIBLE LOGO */}
        <Image 
          source={require('../assets/images/logos/SportysLogo.png')}
          style={{ width: 100, height: 40, backgroundColor: 'red' }}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => setShowAIInsights(true)} style={styles.aiButton}>
          <Image 
            source={require('../assets/images/logos/pilotbase-icon-6x.png')}
            style={{ width: 20, height: 20, tintColor: Colors.brand.cyan }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Training Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryTitle}>My Training</Text>
              <Text style={styles.summarySubtitle}>{student.course}</Text>
            </View>
            <View style={styles.stageBadge}>
              <Text style={styles.stageText}>{student.stage}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Training Progress</Text>
              <Text style={styles.progressPercent}>{student.progress}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: student.progress }
                ]} 
              />
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="clock" size={16} color={Colors.neutral.gray500} />
                <Text style={styles.statLabel}>Total Hours</Text>
              </View>
              <Text style={styles.statValue}>{student.totalHours}</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="calendar" size={16} color={Colors.neutral.gray500} />
                <Text style={styles.statLabel}>Started</Text>
              </View>
              <Text style={styles.statValue}>
                {new Date(student.enrollmentDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </Text>
            </View>
          </View>

          {/* AI Training Insights */}
          <View style={styles.aiInsightsCard}>
            <View style={styles.aiInsightsHeader}>
              <Image 
                source={require('../assets/images/logos/pilotbase-icon-6x.png')}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
              <Text style={styles.aiInsightsTitle}>AI Training Insights</Text>
            </View>
            <Text style={styles.aiInsightsText}>
              At your current pace, you'll complete training by March 2024. Add one more lesson per month to finish two months sooner.
            </Text>
            <TouchableOpacity 
              style={styles.scheduleButton}
              onPress={handleScheduleLesson}
            >
              <Text style={styles.scheduleButtonText}>Schedule More Lessons</Text>
              <Icon name="chevronRight" size={12} color={Colors.primary.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ground School Section */}
        <View style={styles.groundSchoolCard}>
          <View style={styles.groundSchoolHeader}>
            <View style={styles.sportysLogoRow}>
              <Image 
                source={require('../assets/images/logos/SportysLogo.png')}
                style={styles.sportysLogoImage}
                resizeMode="contain"
              />
              <Text style={styles.groundSchoolBrand}>Sporty's Academy</Text>
            </View>
          </View>
          <Text style={styles.groundSchoolTitle}>
            Sporty's Learn To Fly Ground Course
          </Text>
          <Text style={styles.groundSchoolDescription}>
            Master the fundamentals of aviation with comprehensive lessons covering regulations, weather, navigation, and aerodynamics.
          </Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleGroundSchool}
          >
            <Icon name="externalLink" size={12} color="#00FFF2" />
            <Text style={styles.continueButtonText}>Continue Course</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Lessons */}
        {(scheduledLessons.length > 0 || pendingLessons.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Lessons</Text>

            {/* Scheduled Lessons */}
            {scheduledLessons.length > 0 && (
              <View style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <View style={styles.statusDot} />
                  <Text style={styles.subsectionTitle}>Scheduled</Text>
                </View>
                {scheduledLessons.map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonCard}
                    onPress={() => handleLessonPress(lesson)}
                  >
                    <View style={styles.lessonHeader}>
                      <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                        <Text style={styles.lessonDescription}>{lesson.description}</Text>
                        <View style={styles.lessonMeta}>
                          {lesson.date && (
                            <View style={styles.metaItem}>
                              <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                              <Text style={styles.metaText}>{formatDate(lesson.date)}</Text>
                            </View>
                          )}
                          <View style={styles.metaItem}>
                            <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                            <Text style={styles.metaText}>{lesson.duration}</Text>
                          </View>
                        </View>
                      </View>
                      {getStatusBadge(lesson.status)}
                    </View>

                    {/* Reservation Details */}
                    {lesson.reservationId && (
                      <View style={styles.reservationDetails}>
                        <View style={styles.reservationInfo}>
                          <View style={styles.reservationRow}>
                            <Icon name="plane" size={12} color={Colors.neutral.gray500} />
                            <Text style={styles.reservationText}>
                              {lesson.aircraft} - Cessna 172
                            </Text>
                          </View>
                          <View style={styles.reservationRow}>
                            <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                            <Text style={styles.reservationText}>
                              {lesson.startTime} - {lesson.endTime}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity 
                          style={styles.viewReservationButton}
                          onPress={() => navigation.navigate('StudentReservationsScreen')}
                        >
                          <Icon name="externalLink" size={12} color={Colors.neutral.gray600} />
                          <Text style={styles.viewReservationText}>View Reservation</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Pending Lessons */}
            {pendingLessons.length > 0 && (
              <View style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <View style={[styles.statusDot, { backgroundColor: '#E1D3C1' }]} />
                  <Text style={styles.subsectionTitle}>Pending</Text>
                </View>
                {pendingLessons.map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonCard}
                    onPress={() => handleLessonPress(lesson)}
                  >
                    <View style={styles.lessonHeader}>
                      <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                        <Text style={styles.lessonDescription}>{lesson.description}</Text>
                        <View style={styles.lessonMeta}>
                          <View style={styles.metaItem}>
                            <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                            <Text style={styles.metaText}>{lesson.duration}</Text>
                          </View>
                        </View>
                      </View>
                      {getStatusBadge(lesson.status)}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Past Lessons */}
        {completedLessons.length > 0 && (
          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Past Lessons</Text>
            {completedLessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => handleLessonPress(lesson)}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                    <View style={styles.lessonMeta}>
                      {lesson.date && (
                        <View style={styles.metaItem}>
                          <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                          <Text style={styles.metaText}>{formatDate(lesson.date)}</Text>
                        </View>
                      )}
                      <View style={styles.metaItem}>
                        <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                        <Text style={styles.metaText}>{lesson.duration}</Text>
                      </View>
                      {lesson.overallGrade && (
                        <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 255, 242, 0.15)' }]}>
                          <Text style={[styles.statusText, { color: '#004D47' }]}>
                            {lesson.overallGrade}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating AI Button with Pilotbase Branding */}
      <FloatingAIButton 
        onPress={() => setShowAIInsights(true)}
        iconType="pilotbase"
      />

      {/* AI Insights Modal */}
      <Modal
        visible={showAIInsights}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAIInsights(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowAIInsights(false)}
              style={styles.modalCloseButton}
            >
              <Icon name="x" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>AI Training Insights</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.aiModalText}>
              Your AI training insights and recommendations would appear here.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray50,
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  header: {
    backgroundColor: Colors.primary.white,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  aiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: '#00FFF2',
  },
  content: {
    flex: 1,
  },
  summarySection: {
    backgroundColor: Colors.neutral.gray50,
    padding: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.xl2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stageBadge: {
    backgroundColor: '#FE652A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  stageText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  progressPercent: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: '#D4511E',
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F6A345',
    borderRadius: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs, // Reduced from 12 to prevent overflow
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.3, // Reduced from 0.5 to prevent overflow
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  aiInsightsCard: {
    backgroundColor: '#E8FDFC',
    borderRadius: 12,
    padding: 16,
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  pilotbaseIcon: {
    width: 16,
    height: 16,
  },
  aiInsightsTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semibold,
    color: '#0891B2',
  },
  aiInsightsText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 16,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 8,
  },
  scheduleButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  groundSchoolCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginTop: 0,
    borderWidth: 2,
    borderColor: '#00FFF2',
  },
  groundSchoolHeader: {
    marginBottom: 12,
  },
  groundSchoolBrand: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  groundSchoolTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  groundSchoolDescription: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
    gap: 8,
  },
  continueButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 20,
  },
  subsection: {
    marginBottom: 32,
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FE652A',
  },
  lessonCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonInfo: {
    flex: 1,
    marginRight: 16,
  },
  lessonTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  reservationDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reservationInfo: {
    flex: 1,
    gap: 8,
  },
  reservationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reservationText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  viewReservationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  viewReservationText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  divider: {
    height: 1,
    backgroundColor: '#00FFF2',
    marginBottom: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  modalHeaderSpacer: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiModalText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
  
  // Sporty's logo styles
  sportysLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportysLogoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

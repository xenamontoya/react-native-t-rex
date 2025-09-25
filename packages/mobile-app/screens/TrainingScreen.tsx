import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, AIInsightsHeader, StatCard, FloatingAIButton } from '../../components/src';
import { AdaptiveAIModal } from '../components';

// Mock stores for mobile (to match web app structure)
const useRoleStore = () => ({
  setRole: (role: string) => {}
});

const useLessonStore = () => ({
  getLessonUpdate: (id: string) => null,
  addDummyDebriefData: () => {}
});

const formatShortDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  }).toUpperCase();
};

// Student data matching web app structure
const studentData = {
  id: 'student-1',
  name: 'Alex Johnson',
  avatar: 'AJ',
  progress: '75%',
  totalHours: '24.5',
  stage: 'Pre-Solo',
  email: 'alex.johnson@email.com',
  phone: '(555) 123-4567',
  course: 'Private Pilot License (PPL)',
  enrollmentDate: '2023-09-15',
  lessons: [
    // SCHEDULED LESSONS (Top Priority)
    { 
      id: 'l3', 
      title: 'Basic Maneuvers', 
      description: 'Straight and level, climbs, descents, turns', 
      overview: 'Introduction to fundamental flight maneuvers including altitude and heading control, coordinated turns, and power management techniques.',
      status: 'scheduled', 
      date: '2025-08-15', 
      duration: '1.8 hours', 
      learningObjectives: [
        { id: 'l3-t1', title: 'Discuss lesson objective and completion standards', category: 'Preflight Discussion', required: true },
        { id: 'l3-t2', title: 'Preflight planning and preparation', category: 'Preflight Discussion', required: true },
        { id: 'l3-t3', title: 'Aircraft weight and balance considerations', category: 'Preflight Discussion', required: true },
        { id: 'l3-t4', title: 'Tracking a straight line', category: 'Flight', required: true },
        { id: 'l3-t5', title: 'Normal and crosswind landings', category: 'Flight', required: true },
        { id: 'l3-t6', title: 'Single-Pilot Resource Management (SRM)', category: 'Flight', required: true },
        { id: 'l3-t7', title: 'Single-Pilot Resource Management (SRM) - Personal Minimums', category: 'Flight', required: true },
        { id: 'l3-t8', title: 'Single-Pilot Resource Management (SRM) - Risk Management', category: 'Flight', required: true },
        { id: 'l3-t9', title: 'Cockpit Management', category: 'Review', required: true },
        { id: 'l3-t10', title: 'Use of a Checklist', category: 'Review', required: true }
      ],
      reservationId: '1703772000000'
    },
    
    // PENDING LESSONS (Next Priority)
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
        'Execute go-around and rejected landing procedures',
        'Understand traffic flow and spacing',
        'Practice crosswind landing techniques',
        'Develop spatial awareness in the pattern',
        'Coordinate with air traffic control effectively'
      ]
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
        'Use emergency equipment and survival gear',
        'Follow emergency procedures and checklists',
        'Communicate emergencies to ATC effectively',
        'Make critical decisions under pressure'
      ]
    },
    
    // COMPLETED LESSONS (Bottom - Chronological Order)
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
      taskGrades: {
        'preflight': 'E',
        'weather': 'E',
        'radio': 'Pr',
        'straight-level': 'Pr',
        'turns': 'M',
        'landing': 'Pr'
      },
      taskNotes: {
        'preflight': 'Thorough and systematic inspection with excellent attention to detail.',
        'weather': 'Good weather analysis and decision-making demonstrated.',
        'radio': 'Clear communication, continue working on phraseology consistency.',
        'straight-level': 'Good aircraft control with consistent altitude maintenance.',
        'turns': 'Coordination improving, focus on altitude during steep turns.',
        'landing': 'Nice approach and smooth touchdown, good directional control.'
      }
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
      taskGrades: {
        'preflight': 'Pr',
        'radio': 'E',
        'pattern-entry': 'E',
        'downwind': 'Pr',
        'base-turn': 'Pr',
        'final-approach': 'E',
        'landing': 'Pr'
      },
      taskNotes: {
        'preflight': 'Good inspection routine, continue developing efficiency.',
        'radio': 'Excellent communication with tower and traffic awareness.',
        'pattern-entry': 'Perfect pattern entry with good traffic scanning.',
        'downwind': 'Good spacing and altitude control on downwind leg.',
        'base-turn': 'Nice timing on base turn with appropriate wind correction.',
        'final-approach': 'Excellent approach stabilization and energy management.',
        'landing': 'Consistent landings with good flare technique.'
      }
    }
  ]
};

export default function TrainingScreen() {
  const navigation = useNavigation();
  const { setRole } = useRoleStore();
  const { getLessonUpdate, addDummyDebriefData } = useLessonStore();
  const [student, setStudent] = useState(studentData);
  const [showAIInsightsModal, setShowAIInsightsModal] = useState(false);

  // Tablet detection
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    setRole('student');
    addDummyDebriefData();
  }, [setRole, addDummyDebriefData]);

  const handleLessonClick = (lesson: any) => {
    // Navigate to lesson details with lesson data
    const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
    navigation.navigate('LessonDetails' as never, {
      id: lesson.id,
      lessonData: lessonDataParam
    } as never);
  };

  const getStatusBadge = (status: string) => {
    // Handle scheduled status with custom orange styling to match dashboard
    if (status === 'scheduled') {
      return (
        <View style={[styles.statusBadge, { backgroundColor: 'rgba(246, 163, 69, 0.15)' }]}>
          <Text style={[styles.statusText, { color: '#C44510' }]}>
            Scheduled
          </Text>
        </View>
      );
    }
    
    // Handle pending status with custom beige styling
    if (status === 'pending') {
      return (
        <View style={[styles.statusBadge, { backgroundColor: '#F8F3E8' }]}>
          <Text style={[styles.statusText, { color: '#6B5B4F' }]}>
            Pending
          </Text>
        </View>
      );
    }
    
    // Handle completed status with custom electric blue styling
    if (status === 'completed') {
      return (
        <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 255, 242, 0.15)' }]}>
          <Text style={[styles.statusText, { color: '#004D47' }]}>
            Completed
          </Text>
        </View>
      );
    }
    
    return (
      <View style={[styles.statusBadge, styles.statusBadgeDefault]}>
        <Text style={[styles.statusText, styles.statusTextDefault]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Training Summary Section */}
        <View style={styles.summarySection}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>My Training</Text>
              <Text style={styles.headerSubtitle}>{student.course}</Text>
            </View>
            <View style={styles.stageBadge}>
              <Text style={styles.stageBadgeText}>{student.stage}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Training Progress</Text>
              <Text style={styles.progressPercentage}>{student.progress}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { width: student.progress }
                ]}
              />
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard 
              label="Total Hours"
              value={student.totalHours}
              icon={<Icon name="clock" size={16} color={Colors.neutral.gray500} />}
            />
            <StatCard 
              label="Started"
              value={new Date(student.enrollmentDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              icon={<Icon name="calendar" size={16} color={Colors.neutral.gray500} />}
            />
          </View>

          {/* AI Training Insights - Compact */}
          <View style={styles.aiInsights}>
            <AIInsightsHeader title="AI Training Insights" />
            <Text style={styles.aiInsightsDescription}>
              At your current pace, you'll complete training by March 2024. Add one more lesson per month to finish two months sooner and start your career faster.
            </Text>
            <TouchableOpacity 
              style={styles.aiInsightsButton}
              onPress={() => navigation?.navigate('Reservations')}
            >
              <Text style={styles.aiInsightsButtonText}>Schedule More Lessons</Text>
              <Icon name="chevronRight" size={12} color={Colors.primary.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Online Ground School Section */}
        <View style={styles.groundSchoolSection}>
          {/* Logo */}
          <View style={styles.groundSchoolHeader}>
            <Image 
              source={require('../assets/images/logos/SportysLogo.png')}
              style={styles.sportysLogo}
              resizeMode="contain"
            />
            <Text style={styles.groundSchoolSubtitle}>
              Powered by Sporty's Academy
            </Text>
          </View>
          
          {/* Heading */}
          <Text style={styles.groundSchoolTitle}>
            Sporty's Learn To Fly Ground Course
          </Text>
          
          {/* Description */}
          <Text style={styles.groundSchoolDescription}>
            Master the fundamentals of aviation with comprehensive lessons covering regulations, weather, navigation, and aerodynamics - perfectly aligned with your flight training curriculum.
          </Text>
          
          {/* Button */}
          <View style={styles.groundSchoolButtonContainer}>
            <TouchableOpacity
              style={styles.groundSchoolButton}
              onPress={() => Alert.alert('External Link', 'Would open Sporty\'s course')}
            >
              <Icon name="externalLink" size={12} color="#00FFF2" />
              <Text style={styles.groundSchoolButtonText}>Continue Course</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lessons Section */}
        {student.lessons && student.lessons.length > 0 ? (
          <>
            {/* Upcoming Lessons Section */}
            {(student.lessons.filter(lesson => lesson.status === 'scheduled' || lesson.status === 'pending')).length > 0 && (
              <View style={styles.lessonsSection}>
                <Text style={styles.sectionTitle}>Upcoming Lessons</Text>

                {/* Scheduled Lessons */}
                {student.lessons.filter(lesson => lesson.status === 'scheduled').length > 0 && (
                  <View style={styles.lessonSubsection}>
                    <View style={styles.subsectionHeader}>
                      <View style={[styles.statusDot, { backgroundColor: '#FE652A' }]} />
                      <Text style={styles.subsectionTitle}>Scheduled</Text>
                    </View>
                    <View style={styles.lessonsList}>
                      {student.lessons.filter(lesson => lesson.status === 'scheduled').map((lesson) => (
                        <TouchableOpacity
                          key={lesson.id}
                          style={styles.lessonCard}
                          onPress={() => handleLessonClick(lesson)}
                        >
                          <View style={styles.lessonContent}>
                            <View style={styles.lessonHeader}>
                              <View style={styles.lessonInfo}>
                                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                                <View style={styles.lessonMeta}>
                                  {lesson.date && (
                                    <View style={styles.lessonMetaItem}>
                                      <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                                      <Text style={styles.lessonMetaText}>{formatShortDate(lesson.date)}</Text>
                                    </View>
                                  )}
                                  <View style={styles.lessonMetaItem}>
                                    <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                                    <Text style={styles.lessonMetaText}>{lesson.duration}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.lessonStatus}>
                                {getStatusBadge(lesson.status)}
                              </View>
                            </View>
                          </View>

                          {/* Reservation Details - Only show if lesson is scheduled */}
                          {lesson.status === 'scheduled' && lesson.reservationId && (
                            <View style={styles.reservationDetails}>
                              <View style={styles.reservationInfo}>
                                <View style={styles.reservationItem}>
                                  <Icon name="plane" size={12} color={Colors.neutral.gray600} />
                                  <Text style={styles.reservationText}>N12345 - Cessna 172</Text>
                                </View>
                                <View style={styles.reservationItem}>
                                  <Icon name="clock" size={12} color={Colors.neutral.gray600} />
                                  <Text style={styles.reservationText}>9:00 AM - 11:00 AM</Text>
                                </View>
                              </View>
                              <TouchableOpacity
                                style={styles.reservationButton}
                                onPress={() => navigation?.navigate('Reservations')}
                              >
                                <Icon name="externalLink" size={12} color={Colors.neutral.gray600} />
                                <Text style={styles.reservationButtonText}>View Reservation</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Pending Lessons */}
                {student.lessons.filter(lesson => lesson.status === 'pending').length > 0 && (
                  <View style={styles.lessonSubsection}>
                    <View style={styles.subsectionHeader}>
                      <View style={[styles.statusDot, { backgroundColor: '#E1D3C1' }]} />
                      <Text style={styles.subsectionTitle}>Pending</Text>
                    </View>
                    <View style={styles.lessonsList}>
                      {student.lessons.filter(lesson => lesson.status === 'pending').map((lesson) => (
                        <TouchableOpacity
                          key={lesson.id}
                          style={styles.lessonCard}
                          onPress={() => handleLessonClick(lesson)}
                        >
                          <View style={styles.lessonContent}>
                            <View style={styles.lessonHeader}>
                              <View style={styles.lessonInfo}>
                                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                                <View style={styles.lessonMeta}>
                                  <View style={styles.lessonMetaItem}>
                                    <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                                    <Text style={styles.lessonMetaText}>{lesson.duration}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.lessonStatus}>
                                {getStatusBadge(lesson.status)}
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Past Lessons Section */}
            {student.lessons.filter(lesson => lesson.status === 'completed').length > 0 && (
              <View style={styles.lessonsSection}>
                {/* Electric Blue Divider */}
                <View style={styles.divider} />
                
                <Text style={styles.sectionTitle}>Past Lessons</Text>
                
                <View style={styles.lessonsList}>
                  {student.lessons.filter(lesson => lesson.status === 'completed')
                    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
                    .map((lesson) => (
                    <TouchableOpacity
                      key={lesson.id}
                      style={styles.lessonCard}
                      onPress={() => handleLessonClick(lesson)}
                    >
                      <View style={styles.lessonContent}>
                        <View style={styles.lessonHeader}>
                          <View style={styles.lessonInfo}>
                            <Text style={styles.lessonTitle}>{lesson.title}</Text>
                            <Text style={styles.lessonDescription}>{lesson.description}</Text>
                            <View style={styles.lessonMeta}>
                              {lesson.date && (
                                <View style={styles.lessonMetaItem}>
                                  <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                                  <Text style={styles.lessonMetaText}>{formatShortDate(lesson.date)}</Text>
                                </View>
                              )}
                              <View style={styles.lessonMetaItem}>
                                <Icon name="clock" size={12} color={Colors.neutral.gray500} />
                                <Text style={styles.lessonMetaText}>{lesson.duration}</Text>
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
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyLessons}>
            <Icon name="calendar" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyLessonsText}>No lessons scheduled yet</Text>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Wingman AI Button */}
      <FloatingAIButton 
        onPress={() => setShowAIInsightsModal(true)}
        iconType="pilotbase"
      />

      {/* AI Insights Modal */}
      <AdaptiveAIModal
        isOpen={showAIInsightsModal}
        onClose={() => setShowAIInsightsModal(false)}
        lessonTitle="Training Session"
        mode="insights"
        tabletLayout="fullScreen"
      />
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
  
  // Training Summary Section
  summarySection: {
    backgroundColor: Colors.neutral.gray50,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray600,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  stageBadge: {
    backgroundColor: '#FE652A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stageBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.white,
  },
  
  // Progress Section
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4511E',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FE652A',
    borderRadius: 6,
    // Gradient would be applied via LinearGradient component in real implementation
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  
  // AI Insights
  aiInsights: {
    backgroundColor: '#E8FDFC',
    borderRadius: 12,
    padding: 16,
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiInsightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891B2',
    marginLeft: 8,
  },
  aiInsightsDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  aiInsightsButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  aiInsightsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
    marginRight: 8,
  },
  
  // Ground School Section
  groundSchoolSection: {
    backgroundColor: Colors.primary.white,
    borderWidth: 2,
    borderColor: '#00FFF2',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  groundSchoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sportysLogo: {
    height: 32,
    width: 100,
    marginRight: 12,
  },
  groundSchoolSubtitle: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    fontFamily: 'monospace',
  },
  groundSchoolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 8,
  },
  groundSchoolDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 16,
  },
  groundSchoolButtonContainer: {
    alignItems: 'flex-end',
  },
  groundSchoolButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groundSchoolButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.white,
    marginLeft: 8,
  },
  
  // Lessons Section
  lessonsSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 24,
  },
  
  // Lesson Subsections
  lessonSubsection: {
    marginBottom: 32,
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral.gray800,
  },
  
  // Lessons List
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 12,
    padding: 16,
  },
  lessonContent: {
    // Main lesson content
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
    marginRight: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  lessonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonMetaText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  lessonStatus: {
    // Status badge container
  },
  
  // Status Badge
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeDefault: {
    backgroundColor: Colors.neutral.gray100,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusTextDefault: {
    color: Colors.neutral.gray800,
  },
  
  // Reservation Details
  reservationDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  reservationInfo: {
    gap: 8,
  },
  reservationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reservationText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginLeft: 4,
  },
  reservationButton: {
    backgroundColor: Colors.neutral.gray50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reservationButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray700,
    marginLeft: 4,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#00FFF2',
    marginBottom: 24,
  },
  
  // Empty State
  emptyLessons: {
    padding: 24,
    alignItems: 'center',
  },
  emptyLessonsText: {
    fontSize: 16,
    color: Colors.neutral.gray500,
    marginTop: 16,
  },
  
  
  bottomPadding: {
    height: 100,
  },
});
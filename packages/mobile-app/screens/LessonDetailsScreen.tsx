import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

interface LessonTask {
  id: string;
  title: string;
  category: string;
  required: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  overview?: string;
  status: 'completed' | 'scheduled' | 'pending' | 'cancelled';
  date?: string;
  duration: string;
  learningObjectives?: LessonTask[];
  reservationId?: string;
  studentName?: string;
  aircraft?: string;
  grade?: string;
  instructorNotes?: string;
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  aiDebrief?: {
    transcription: string;
    processedAt: string;
    insights: {
      overallGrade: string;
      overallNotes: string;
      taskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
      taskNotes: Record<string, string>;
      summary: string;
    };
  };
}

// Function to get default learning objectives based on lesson title
const getDefaultLearningObjectives = (lessonTitle: string): LessonTask[] => {
  if (lessonTitle.toLowerCase().includes('traffic pattern')) {
    return [
      { id: 'tp-1', title: 'Pre-landing procedures', category: 'Preflight Discussion', required: true },
      { id: 'tp-2', title: 'Airport traffic pattern entry and departure procedures', category: 'Flight', required: true },
      { id: 'tp-3', title: 'Normal or crosswind landings', category: 'Flight', required: true },
      { id: 'tp-4', title: 'Collision avoidance procedures', category: 'Flight', required: true },
      { id: 'tp-5', title: 'Wake turbulence avoidance procedures', category: 'Flight', required: true },
      { id: 'tp-6', title: 'Wind shear avoidance procedures', category: 'Flight', required: true },
      { id: 'tp-7', title: 'After landing, engine shutdown, securing and postflight inspection', category: 'Postflight Discussion', required: true }
    ];
  }
  
  if (lessonTitle.toLowerCase().includes('navigation')) {
    return [
      { id: 'nav-1', title: 'Pilotage and dead reckoning', category: 'Flight', required: true },
      { id: 'nav-2', title: 'Navigation systems and radar services', category: 'Flight', required: true },
      { id: 'nav-3', title: 'Chart reading and interpretation', category: 'Ground School', required: true },
      { id: 'nav-4', title: 'Magnetic compass usage', category: 'Flight', required: true }
    ];
  }
  
  // Default objectives for any lesson
  return [
    { id: 'def-1', title: 'Preflight planning and preparation', category: 'Preflight Discussion', required: true },
    { id: 'def-2', title: 'Aircraft operation and safety', category: 'Preflight Discussion', required: true },
    { id: 'def-3', title: 'Flight maneuvers and procedures', category: 'Flight', required: true },
    { id: 'def-4', title: 'Postflight procedures and evaluation', category: 'Postflight Discussion', required: true }
  ];
};

export default function LessonDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPlayingDebrief, setIsPlayingDebrief] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioDuration = 185; // 3:05 minutes for demo

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    try {
      const params = route.params as any;
      const { id, lessonData } = params || {};
      
      if (lessonData && typeof lessonData === 'string') {
        const parsedLesson = JSON.parse(decodeURIComponent(lessonData));
        
        // If lesson doesn't have learningObjectives, add them based on title
        if (!parsedLesson.learningObjectives || parsedLesson.learningObjectives.length === 0) {
          parsedLesson.learningObjectives = getDefaultLearningObjectives(parsedLesson.title);
        }
        
        setLesson(parsedLesson);
      } else {
        // Fallback lesson data
        setLesson({
          id: id || '1',
          title: 'Basic Maneuvers',
          description: 'Practice fundamental flight maneuvers',
          status: 'scheduled',
          date: 'Dec 15, 2025',
          duration: '2.0 hours',
          studentName: 'Alex Johnson',
          aircraft: 'N12345',
          learningObjectives: getDefaultLearningObjectives('Basic Maneuvers')
        });
      }
    } catch (error) {
      console.error('Error parsing lesson data:', error);
      // Set fallback data even on error
      setLesson({
        id: '1',
        title: 'Basic Maneuvers',
        description: 'Practice fundamental flight maneuvers',
        status: 'scheduled',
        date: 'Dec 15, 2025',
        duration: '2.0 hours',
        studentName: 'Alex Johnson',
        aircraft: 'N12345',
        learningObjectives: getDefaultLearningObjectives('Basic Maneuvers')
      });
    } finally {
      setLoading(false);
    }
  }, [route.params]);

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
      case 'confirmed':
        return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
      case 'pending':
        return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
      case 'completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Complete':
      case 'Completed': 
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'Not Complete': 
        return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' };
      case 'Incomplete': 
        return { backgroundColor: Colors.status.error + '20', color: Colors.status.error };
      default: 
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
    }
  };

  const getTaskGradeColor = (grade: string) => {
    switch (grade) {
      case 'D': return { backgroundColor: Colors.status.error + '20', color: Colors.status.error }; // Demonstration
      case 'E': return { backgroundColor: Colors.status.warning + '20', color: Colors.status.warning }; // Explanation
      case 'Pr': return { backgroundColor: 'rgba(246, 163, 69, 0.15)', color: '#C44510' }; // Practice
      case 'Pe': return { backgroundColor: Colors.status.warning + '20', color: Colors.status.warning }; // Performance
      case 'M': return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' }; // Mastery
      case 'NG': return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 }; // No Grade
      default: return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray800 };
    }
  };

  const handlePlayDebrief = () => {
    setIsPlayingDebrief(!isPlayingDebrief);
    // Simulate audio playback - in real app would control actual audio
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewReservation = () => {
    if (lesson?.reservationId) {
      // Create a minimal reservation object for navigation
      const reservation = {
        id: lesson.reservationId,
        aircraft: lesson.aircraft || 'N123AB',
        student: lesson.studentName || 'Student',
        instructor: 'Current Instructor',
        type: lesson.title || 'Training Session',
        date: lesson.date || new Date().toLocaleDateString(),
        startTime: '14:00',
        endTime: '16:00',
        aircraftType: 'Cessna 172',
        status: 'Confirmed'
      };
      
      const reservationDataParam = encodeURIComponent(JSON.stringify(reservation));
      navigation.navigate('ReservationDetails' as never, {
        id: reservation.id,
        reservationData: reservationDataParam
      } as never);
    } else {
      Alert.alert('Info', 'No associated reservation found');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading lesson details...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Lesson not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Lesson Details</Text>
          <Text style={styles.headerSubtitle}>{lesson.title}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.menuButton}>
          <Icon name="ellipsis-v" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Share Lesson</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
              <Text style={styles.dropdownText}>Export Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Lesson Header */}
          <View style={styles.section}>
            <View style={styles.lessonHeader}>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                {lesson.studentName && (
                  <Text style={styles.studentName}>Student: {lesson.studentName}</Text>
                )}
              </View>
              <View style={[styles.statusBadge, getStatusStyle(lesson.status)]}>
                <Text style={[styles.statusText, { color: getStatusStyle(lesson.status).color }]}>
                  {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* AI Insights Section - For Students */}
          {lesson.status === 'completed' && lesson.aiDebrief && (
            <View style={styles.aiInsightsSection}>
              <View style={styles.aiInsightsContent}>
                <View style={styles.aiInsightsHeader}>
                  <View style={styles.aiIcon}>
                    <Icon name="robot" size={20} color={Colors.brand.cyan} />
                  </View>
                  <View style={styles.aiTextContent}>
                    <Text style={styles.aiTitle}>AI-Powered Lesson Insights</Text>
                    <Text style={styles.aiDescription}>
                      Great airspeed control improvement! Focus on radio communication and pattern entries for next flight.
                    </Text>
                  </View>
                  <Icon name="arrow-right" size={16} color={Colors.brand.cyan} />
                </View>
              </View>
            </View>
          )}

          {/* Lesson Debrief Section - For Completed Lessons */}
          {lesson.status === 'completed' && lesson.aiDebrief && (
            <View style={styles.section}>
              <View style={styles.debriefHeader}>
                <View style={styles.debriefIcon}>
                  <Icon name="microphone" size={16} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.debriefContent}>
                  <Text style={styles.debriefTitle}>Lesson Debrief</Text>
                  <Text style={styles.debriefSubtitle}>Listen to your instructor's debrief recording.</Text>
                  
                  {/* Audio Controls */}
                  <View style={styles.audioControls}>
                    <TouchableOpacity onPress={handlePlayDebrief} style={styles.playButton}>
                      <Icon name={isPlayingDebrief ? "pause" : "play"} size={12} color={Colors.primary.white} />
                      <Text style={styles.playButtonText}>{isPlayingDebrief ? 'Pause' : 'Play'}</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.timeDisplay}>
                      <Text style={styles.timeText}>{formatTime(audioCurrentTime)}</Text>
                      <Text style={styles.timeText}>/</Text>
                      <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
                    </View>
                  </View>
                  
                  {/* Progress Bar */}
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${audioProgress}%` }]} />
                    </View>
                  </View>
                  
                  <Text style={styles.debriefTimestamp}>
                    Debrief recorded: {new Date(lesson.aiDebrief.processedAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Learning Objectives */}
          {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Learning Objectives</Text>
              <View style={styles.objectivesList}>
                {lesson.learningObjectives.map((objective, idx) => (
                  <View key={idx} style={styles.objectiveItem}>
                    <View style={styles.objectiveContent}>
                      <Text style={styles.objectiveTitle}>{objective.title}</Text>
                      <Text style={styles.objectiveCategory}>{objective.category}</Text>
                    </View>
                    {objective.required && (
                      <View style={styles.requiredBadge}>
                        <Text style={styles.requiredBadgeText}>Required</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reservation Details - For Scheduled Lessons */}
          {lesson.status === 'scheduled' && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Reservation Details</Text>
                <TouchableOpacity onPress={handleViewReservation} style={styles.viewButton}>
                  <Icon name="external-link-alt" size={12} color={Colors.neutral.gray600} />
                  <Text style={styles.viewButtonText}>View Reservation</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.reservationDetails}>
                {lesson.date && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Scheduled Date</Text>
                    <Text style={styles.detailValue}>{lesson.date}</Text>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{lesson.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Aircraft</Text>
                  <Text style={styles.detailValue}>N12345</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>2:00 PM - 4:00 PM</Text>
                </View>
                <View style={styles.detailRowLast}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <View style={[styles.statusBadge, { backgroundColor: '#F8F3E8' }]}>
                    <Text style={[styles.statusText, { color: '#6B5B4F' }]}>Confirmed</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Performance Assessment - For Completed Lessons */}
          {lesson.status === 'completed' && (lesson.overallGrade || lesson.taskGrades || lesson.overallNotes) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Performance Assessment</Text>
              
              {/* Overall Grade */}
              {lesson.overallGrade && (
                <View style={styles.assessmentItem}>
                  <Text style={styles.assessmentLabel}>Overall Grade</Text>
                  <View style={[styles.gradeBadge, getGradeColor(lesson.overallGrade)]}>
                    <Text style={[styles.gradeText, { color: getGradeColor(lesson.overallGrade).color }]}>
                      {lesson.overallGrade}
                    </Text>
                  </View>
                </View>
              )}

              {/* Task Assessment */}
              {lesson.taskGrades && Object.keys(lesson.taskGrades).length > 0 && (
                <View style={styles.assessmentItem}>
                  <Text style={styles.assessmentLabel}>Task Assessment</Text>
                  <View style={styles.taskGradesList}>
                    {Object.entries(lesson.taskGrades).map(([taskId, grade]) => {
                      const objective = lesson.learningObjectives?.find(obj => obj.id === taskId);
                      const taskName = objective?.title || 'Flight Training Task';
                      
                      return (
                        <View key={taskId} style={styles.taskGradeItem}>
                          <View style={styles.taskGradeHeader}>
                            <Text style={styles.taskName}>{taskName}</Text>
                            <View style={[styles.taskGradeBadge, getTaskGradeColor(grade)]}>
                              <Text style={[styles.taskGradeText, { color: getTaskGradeColor(grade).color }]}>
                                {grade}
                              </Text>
                            </View>
                          </View>
                          {lesson.taskNotes?.[taskId] && (
                            <Text style={styles.taskNotes}>{lesson.taskNotes[taskId]}</Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Overall Notes */}
              {lesson.overallNotes && (
                <View style={styles.assessmentItem}>
                  <Text style={styles.assessmentLabel}>Instructor Notes</Text>
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{lesson.overallNotes}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Instructor Action Buttons */}
      {/* Note: In a real app, you'd check user role. For demo, showing instructor actions */}
      {lesson.status === 'scheduled' && (
        <View style={styles.instructorActions}>
          <TouchableOpacity 
            style={styles.primaryActionButton} 
            onPress={() => {
              // Navigate to Audio Debrief
              const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
              navigation.navigate('AudioDebrief' as never, {
                id: lesson.id,
                lessonData: lessonDataParam
              } as never);
            }}
          >
            <Icon name="play" size={16} color={Colors.brand.cyan} />
            <Text style={styles.primaryActionButtonText}>Start Audio Debrief</Text>
          </TouchableOpacity>
        </View>
      )}

      {(lesson.status === 'completed' || lesson.aiDebrief) && (
        <View style={styles.instructorActions}>
          <TouchableOpacity 
            style={styles.secondaryActionButton} 
            onPress={() => {
              // Navigate to Lesson Grading
              const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
              navigation.navigate('LessonGrading' as never, {
                id: lesson.id,
                lessonData: lessonDataParam,
                hasAiInsights: !!lesson.aiDebrief
              } as never);
            }}
          >
            <Icon name="save" size={16} color={Colors.neutral.gray700} />
            <Text style={styles.secondaryActionButtonText}>Grade Lesson</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fontFamily.regular,
  },
  errorText: {
    fontSize: 18,
    color: Colors.neutral.gray900,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 8,
  },
  goBackText: {
    fontSize: 14,
    color: Colors.brand.blueAzure,
    fontFamily: Typography.fontFamily.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 64,
    right: 16,
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    paddingVertical: 4,
    minWidth: 160,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
  },
  section: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginLeft: 4,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  studentName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
  },
  aiInsightsSection: {
    backgroundColor: '#212121',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  aiInsightsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#212121',
    borderWidth: 2,
    borderColor: Colors.brand.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiTextContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
    marginBottom: 4,
  },
  aiDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  debriefHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  debriefIcon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  debriefContent: {
    flex: 1,
  },
  debriefTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  debriefSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brand.blueAzure,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 12,
  },
  playButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
    marginLeft: 4,
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginHorizontal: 2,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.brand.orange,
    borderRadius: 4,
  },
  debriefTimestamp: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
  },
  objectiveContent: {
    flex: 1,
    marginRight: 12,
  },
  objectiveTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  objectiveCategory: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  requiredBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semibold,
    color: '#004D47',
  },
  reservationDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  detailRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  assessmentItem: {
    marginBottom: 16,
  },
  assessmentLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  gradeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
  },
  taskGradesList: {
    gap: 12,
  },
  taskGradeItem: {
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
  },
  taskGradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    flex: 1,
    marginRight: 8,
  },
  taskGradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  taskGradeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semibold,
  },
  taskNotes: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  notesContainer: {
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  instructorActions: {
    padding: 16,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  primaryActionButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    gap: 8,
  },
  secondaryActionButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
  },
});
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

interface LessonTask {
  id: string;
  title: string;
  category: string;
  grade?: 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG';
  notes?: string;
  required: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  overview?: string;
  status: 'completed' | 'scheduled' | 'pending' | 'not scheduled' | 'cancelled';
  date?: string;
  duration: string;
  learningObjectives?: LessonTask[];
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  instructorNotes?: string;
  reservationId?: string;
  studentName?: string;
  aircraft?: string;
  startTime?: string;
  endTime?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  aiDebrief?: {
    transcription: string;
    processedAt: string;
    insights: {
      overallGrade: 'Complete' | 'Not Complete' | 'Incomplete';
      overallNotes: string;
      taskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
      taskNotes: Record<string, string>;
      flightTimes: Record<string, string>;
      summary: string;
    };
  };
}

// Success Toast Component
const SuccessToast: React.FC<{
  message: string;
  isVisible: boolean;
  onClose: () => void;
}> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <View style={styles.successToastContainer}>
      <View style={styles.successToast}>
        <View style={styles.successToastContent}>
          <View style={styles.successIcon}>
            <Icon name="check" size={12} color={Colors.primary.white} />
          </View>
          <Text style={styles.successToastText}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.successToastClose}>
          <Icon name="times" size={16} color="#16a34a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function LessonGradingScreen({ navigation, route }: any) {
  const { id, lessonData: lessonDataParam, hasAiInsights } = route.params;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [taskGrades, setTaskGrades] = useState<Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>>({});
  const [taskNotes, setTaskNotes] = useState<Record<string, string>>({});
  const [overallGrade, setOverallGrade] = useState<'Complete' | 'Not Complete' | 'Incomplete'>('Not Complete');
  const [overallNotes, setOverallNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showFlightTimes, setShowFlightTimes] = useState(false);

  // Flight time tracking state
  const [flightTimes, setFlightTimes] = useState({
    total_time: '',
    dual_day_local: '',
    dual_day_landings: '',
    ground: ''
  });

  // Generate comprehensive tasks based on lesson title
  const getComprehensiveTasksForLesson = (lessonTitle: string): LessonTask[] => {
    const commonTasks = [
      {
        id: 'preflight',
        title: 'Preflight Inspection',
        category: 'Ground Operations',
        required: true
      },
      {
        id: 'weather',
        title: 'Weather Analysis',
        category: 'Ground Operations', 
        required: true
      },
      {
        id: 'radio',
        title: 'Radio Communications',
        category: 'Communications',
        required: true
      },
      {
        id: 'taxi',
        title: 'Taxi Operations',
        category: 'Ground Operations',
        required: true
      }
    ];

    // Add lesson-specific tasks based on title
    if (lessonTitle.toLowerCase().includes('basic maneuvers')) {
      return [
        ...commonTasks,
        {
          id: 'straight-level',
          title: 'Straight and Level Flight',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'climbs',
          title: 'Climbs',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'descents',
          title: 'Descents',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'turns',
          title: 'Level Turns',
          category: 'Basic Maneuvers',
          required: true
        }
      ];
    }

    if (lessonTitle.toLowerCase().includes('traffic pattern')) {
      return [
        ...commonTasks,
        {
          id: 'pattern-entry',
          title: 'Pattern Entry',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'downwind',
          title: 'Downwind Leg',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'base-turn',
          title: 'Base Turn',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'final-approach',
          title: 'Final Approach',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'landing',
          title: 'Landing',
          category: 'Traffic Pattern',
          required: true
        }
      ];
    }

    // Default comprehensive task set
    return [
      ...commonTasks,
      {
        id: 'airwork',
        title: 'General Airwork',
        category: 'Flight Maneuvers',
        required: true
      },
      {
        id: 'navigation',
        title: 'Navigation Skills',
        category: 'Navigation',
        required: false
      }
    ];
  };

  useEffect(() => {
    if (lessonDataParam) {
      try {
        const parsedLesson = JSON.parse(lessonDataParam);
        
        // If lesson doesn't have learningObjectives, add comprehensive task assessment
        if (!parsedLesson.learningObjectives || parsedLesson.learningObjectives.length === 0) {
          parsedLesson.learningObjectives = getComprehensiveTasksForLesson(parsedLesson.title);
        }
        
        setLesson(parsedLesson);
        
        // Check for AI insights and pre-fill form data
        if (hasAiInsights === 'true' && parsedLesson.aiDebrief) {
          // Pre-fill with AI insights
          setOverallGrade(parsedLesson.aiDebrief.insights.overallGrade);
          setOverallNotes(parsedLesson.aiDebrief.insights.overallNotes);
          setTaskGrades(parsedLesson.aiDebrief.insights.taskGrades || {});
          setTaskNotes(parsedLesson.aiDebrief.insights.taskNotes || {});
          setFlightTimes(prev => ({
            ...prev,
            ...parsedLesson.aiDebrief.insights.flightTimes
          }));
        }
      } catch (error) {
        console.error('Error parsing lesson data:', error);
        navigation.goBack();
      }
    }
  }, [lessonDataParam, hasAiInsights, navigation]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'scheduled':
        return { backgroundColor: '#f3f4f6', color: '#6b5b4f' };
      case 'pending':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  const handleSaveGrade = () => {
    if (!lesson) return;
    
    // Show success toast
    setToastMessage('Lesson grade saved successfully!');
    setShowSuccessToast(true);
    
    // Navigate back after a delay
    setTimeout(() => {
      navigation.navigate('InstructorTraining');
    }, 2000);
  };

  const handleMarkComplete = () => {
    if (!lesson) return;
    
    // Update lesson status to completed and save
    const updatedLesson = {
      ...lesson,
      status: 'completed' as const,
      overallGrade,
      overallNotes,
      taskGrades,
      taskNotes
    };
    
    setLesson(updatedLesson);
    
    // Show success toast
    setToastMessage('Lesson marked as complete!');
    setShowSuccessToast(true);
    
    // Navigate to lesson details after delay
    setTimeout(() => {
      const lessonDataParam = encodeURIComponent(JSON.stringify(updatedLesson));
      navigation.navigate('LessonDetails', {
        id: lesson.id,
        lessonData: lessonDataParam,
        role: 'instructor'
      });
    }, 2000);
  };

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Loading lesson...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Grade Lesson</Text>
          <Text style={styles.headerSubtitle}>{lesson.title}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Lesson Header */}
        <View style={[styles.lessonHeader, getStatusBadge(lesson.status)]}>
          <View style={styles.lessonHeaderContent}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
            {lesson.studentName && (
              <Text style={styles.studentName}>Student: {lesson.studentName}</Text>
            )}
          </View>
          <View style={[styles.statusBadge, getStatusBadge(lesson.status)]}>
            <Text style={[styles.statusText, { color: getStatusBadge(lesson.status).color }]}>
              {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Lesson Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Lesson Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Icon name="calendar" size={16} color={Colors.neutral.gray400} />
              <Text style={styles.infoText}>{lesson.date || 'Date TBD'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="clock" size={16} color={Colors.neutral.gray400} />
              <Text style={styles.infoText}>{lesson.duration}</Text>
            </View>
            {lesson.aircraft && (
              <View style={styles.infoItem}>
                <Icon name="plane" size={16} color={Colors.neutral.gray400} />
                <Text style={styles.infoText}>{lesson.aircraft}</Text>
              </View>
            )}
          </View>
        </View>

        {/* AI Debrief Information */}
        {lesson.aiDebrief && (
          <View style={styles.aiDebriefSection}>
            <View style={styles.aiDebriefHeader}>
              <Icon name="magic" size={20} color={Colors.brand.cyan} />
              <Text style={styles.aiDebriefTitle}>AI-Generated Insights</Text>
            </View>
            <Text style={styles.aiDebriefDescription}>
              This form has been pre-filled with insights from your audio debrief. Review and adjust as needed.
            </Text>
            {lesson.aiDebrief.insights?.summary && (
              <View style={styles.aiSummary}>
                <Text style={styles.aiSummaryTitle}>Debrief Summary</Text>
                <Text style={styles.aiSummaryText}>{lesson.aiDebrief.insights.summary}</Text>
              </View>
            )}
          </View>
        )}

        {/* Learning Objectives Assessment */}
        <View style={styles.objectivesSection}>
          <Text style={styles.sectionTitle}>Learning Objectives Assessment</Text>
          {(lesson.learningObjectives || []).map((objective) => (
            <View key={objective.id} style={styles.objectiveCard}>
              {/* Objective Title */}
              <View style={styles.objectiveHeader}>
                <Text style={styles.objectiveTitle}>{objective.title}</Text>
                <View style={styles.objectiveMeta}>
                  <Text style={styles.objectiveCategory}>{objective.category}</Text>
                  {objective.required && (
                    <View style={styles.requiredBadge}>
                      <Text style={styles.requiredText}>Required</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Grade Selection */}
              <View style={styles.gradeSection}>
                <Text style={styles.gradeLabel}>Grade</Text>
                <View style={styles.gradeButtons}>
                  {['D', 'E', 'Pr', 'Pe', 'M', 'NG'].map((grade) => (
                    <TouchableOpacity
                      key={grade}
                      style={[
                        styles.gradeButton,
                        taskGrades[objective.id] === grade && styles.gradeButtonActive
                      ]}
                      onPress={() => setTaskGrades(prev => ({ ...prev, [objective.id]: grade as any }))}
                    >
                      <Text
                        style={[
                          styles.gradeButtonText,
                          taskGrades[objective.id] === grade && styles.gradeButtonTextActive
                        ]}
                      >
                        {grade}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.gradeHint}>
                  D = Deficient, E = Excellent, Pr = Proficient, Pe = Performed, M = Marginal, NG = No Grade
                </Text>
              </View>

              {/* Notes */}
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  value={taskNotes[objective.id] || ''}
                  onChangeText={(text) => setTaskNotes(prev => ({ ...prev, [objective.id]: text }))}
                  placeholder="Add notes for this learning objective..."
                  multiline
                  numberOfLines={2}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Flight Times */}
        <View style={styles.flightTimesSection}>
          <TouchableOpacity
            style={styles.flightTimesHeader}
            onPress={() => setShowFlightTimes(!showFlightTimes)}
          >
            <Text style={styles.sectionTitle}>Flight Times</Text>
            <Icon 
              name={showFlightTimes ? 'chevronUp' : 'chevronDown'} 
              size={20} 
              color={Colors.neutral.gray600} 
            />
          </TouchableOpacity>
          
          {showFlightTimes && (
            <View style={styles.flightTimesGrid}>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>Total Time</Text>
                <TextInput
                  style={styles.timeValue}
                  value={flightTimes.total_time}
                  onChangeText={(text) => setFlightTimes(prev => ({ ...prev, total_time: text }))}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>Dual Day Local</Text>
                <TextInput
                  style={styles.timeValue}
                  value={flightTimes.dual_day_local}
                  onChangeText={(text) => setFlightTimes(prev => ({ ...prev, dual_day_local: text }))}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>Day Landings</Text>
                <TextInput
                  style={styles.timeValue}
                  value={flightTimes.dual_day_landings}
                  onChangeText={(text) => setFlightTimes(prev => ({ ...prev, dual_day_landings: text }))}
                  placeholder="0"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>Ground Time</Text>
                <TextInput
                  style={styles.timeValue}
                  value={flightTimes.ground}
                  onChangeText={(text) => setFlightTimes(prev => ({ ...prev, ground: text }))}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          )}
        </View>

        {/* Overall Assessment */}
        <View style={styles.overallSection}>
          <Text style={styles.sectionTitle}>Overall Assessment</Text>
          
          <View style={styles.overallGradeSection}>
            <Text style={styles.overallGradeLabel}>Lesson Grade and Status</Text>
            <View style={styles.overallGradeButtons}>
              {['Complete', 'Not Complete', 'Incomplete'].map((gradeOption) => (
                <TouchableOpacity
                  key={gradeOption}
                  style={[
                    styles.overallGradeButton,
                    overallGrade === gradeOption && styles.overallGradeButtonActive
                  ]}
                  onPress={() => setOverallGrade(gradeOption as any)}
                >
                  <Text
                    style={[
                      styles.overallGradeButtonText,
                      overallGrade === gradeOption && styles.overallGradeButtonTextActive
                    ]}
                  >
                    {gradeOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.overallNotesSection}>
            <Text style={styles.overallNotesLabel}>Overall Instructor Notes</Text>
            <TextInput
              style={styles.overallNotesInput}
              value={overallNotes}
              onChangeText={setOverallNotes}
              placeholder="Add overall notes about the student's performance, areas for improvement, etc."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveGrade}
        >
          <Icon name="save" size={16} color={Colors.primary.white} />
          <Text style={styles.saveButtonText}>Save Grade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleMarkComplete}
        >
          <Icon name="check" size={16} color={Colors.primary.white} />
          <Text style={styles.completeButtonText}>Mark Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Success Toast */}
      <SuccessToast
        message={toastMessage}
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
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
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  lessonHeader: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  lessonHeaderContent: {
    marginBottom: 12,
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
    fontFamily: Typography.fontFamily.medium,
    color: Colors.brand.cyan,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  infoSection: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  aiDebriefSection: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  aiDebriefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  aiDebriefTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0369a1',
  },
  aiDebriefDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#075985',
    marginBottom: 12,
  },
  aiSummary: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  aiSummaryTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0369a1',
    marginBottom: 4,
  },
  aiSummaryText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#075985',
  },
  objectivesSection: {
    marginBottom: 16,
  },
  objectiveCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  objectiveHeader: {
    marginBottom: 12,
  },
  objectiveTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  objectiveMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  objectiveCategory: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  requiredBadge: {
    backgroundColor: Colors.status.info + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  requiredText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
  },
  gradeSection: {
    marginBottom: 16,
  },
  gradeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  gradeButtons: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  gradeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  gradeButtonActive: {
    backgroundColor: '#212121',
    borderColor: '#212121',
  },
  gradeButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  gradeButtonTextActive: {
    color: Colors.primary.white,
  },
  gradeHint: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  notesSection: {
    marginBottom: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    textAlignVertical: 'top',
  },
  flightTimesSection: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  flightTimesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightTimesGrid: {
    marginTop: 16,
    gap: 12,
  },
  timeInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    flex: 1,
  },
  timeValue: {
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    minWidth: 80,
    textAlign: 'center',
  },
  overallSection: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  overallGradeSection: {
    marginBottom: 16,
  },
  overallGradeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  overallGradeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  overallGradeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  overallGradeButtonActive: {
    backgroundColor: '#212121',
    borderColor: '#212121',
  },
  overallGradeButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  overallGradeButtonTextActive: {
    color: Colors.primary.white,
  },
  overallNotesSection: {
    marginBottom: 8,
  },
  overallNotesLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  overallNotesInput: {
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  bottomSpacer: {
    height: 100,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    gap: 12,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray700,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  successToastContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  successToast: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successToastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#16a34a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successToastText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#166534',
  },
  successToastClose: {
    padding: 4,
  },
});
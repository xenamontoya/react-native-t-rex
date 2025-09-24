import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  Dimensions,
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
  status: 'scheduled' | 'completed' | 'pending' | 'cancelled';
  date?: string;
  startTime?: string;
  endTime?: string;
  duration: string;
  studentName: string;
  aircraft?: string;
  objectives: string[];
  learningObjectives: LessonTask[];
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  reservationId?: string;
  type: string;
}

export default function InstructorLessonsScreen({ navigation }: any) {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Basic Flight Maneuvers',
      description: 'Introduction to basic aircraft control and flight maneuvers',
      status: 'scheduled',
      date: 'Today',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2.0 hours',
      studentName: 'Alex Johnson',
      aircraft: 'N12345',
      type: 'Training Flight',
      objectives: [
        'Practice straight and level flight',
        'Learn basic turns',
        'Understand altitude control'
      ],
      learningObjectives: [
        { id: 'task-1', title: 'Preflight Inspection', category: 'Ground Operations', required: true },
        { id: 'task-2', title: 'Straight and Level Flight', category: 'Basic Maneuvers', required: true },
        { id: 'task-3', title: 'Level Turns', category: 'Basic Maneuvers', required: true },
        { id: 'task-4', title: 'Climb and Descent', category: 'Basic Maneuvers', required: true }
      ],
      reservationId: '1703772000000'
    },
    {
      id: '2',
      title: 'Traffic Pattern Practice',
      description: 'Standard traffic pattern procedures and communication',
      status: 'completed',
      date: 'Yesterday',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2.0 hours',
      studentName: 'Sarah Chen',
      aircraft: 'N67890',
      type: 'Pattern Work',
      overallGrade: 'Complete',
      overallNotes: 'Excellent pattern work with good radio communication',
      objectives: [
        'Master traffic pattern entry',
        'Practice radio communications',
        'Execute proper landing sequence'
      ],
      learningObjectives: [
        { id: 'task-1', title: 'Pattern Entry', category: 'Traffic Pattern', required: true, grade: 'E' },
        { id: 'task-2', title: 'Downwind Leg', category: 'Traffic Pattern', required: true, grade: 'Pr' },
        { id: 'task-3', title: 'Base Turn', category: 'Traffic Pattern', required: true, grade: 'E' },
        { id: 'task-4', title: 'Final Approach', category: 'Traffic Pattern', required: true, grade: 'Pr' },
        { id: 'task-5', title: 'Landing', category: 'Traffic Pattern', required: true, grade: 'E' }
      ],
      reservationId: '1703858400000'
    },
    {
      id: '3',
      title: 'Night Flying Introduction',
      description: 'Introduction to night flying operations and procedures',
      status: 'scheduled',
      date: 'Tomorrow',
      startTime: '19:00',
      endTime: '21:30',
      duration: '2.5 hours',
      studentName: 'Mike Rodriguez',
      aircraft: 'N54321',
      type: 'Night Flight',
      objectives: [
        'Learn night vision techniques',
        'Practice night takeoffs and landings',
        'Understand airport lighting systems'
      ],
      learningObjectives: [
        { id: 'task-1', title: 'Night Vision Adaptation', category: 'Night Operations', required: true },
        { id: 'task-2', title: 'Airport Lighting Systems', category: 'Night Operations', required: true },
        { id: 'task-3', title: 'Night Takeoff', category: 'Night Flight', required: true },
        { id: 'task-4', title: 'Night Landing', category: 'Night Flight', required: true }
      ],
      reservationId: '1704117600000'
    },
    {
      id: '4',
      title: 'Cross Country Planning',
      description: 'Flight planning for cross country navigation',
      status: 'pending',
      date: 'Dec 22',
      duration: '3.0 hours',
      studentName: 'Emily Davis',
      aircraft: 'N11111',
      type: 'Ground Training',
      objectives: [
        'Learn flight planning procedures',
        'Understand weather interpretation',
        'Practice navigation calculations'
      ],
      learningObjectives: [
        { id: 'task-1', title: 'Flight Plan Preparation', category: 'Navigation', required: true },
        { id: 'task-2', title: 'Weather Analysis', category: 'Navigation', required: true },
        { id: 'task-3', title: 'Weight & Balance', category: 'Navigation', required: true },
        { id: 'task-4', title: 'Navigation Calculations', category: 'Navigation', required: true }
      ]
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'scheduled' | 'completed' | 'pending' | 'cancelled'>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonDetail, setShowLessonDetail] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const filteredLessons = lessons.filter(lesson => {
    return selectedFilter === 'all' || lesson.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { backgroundColor: '#f3f4f6', color: '#6b5b4f' };
      case 'completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'pending':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'cancelled':
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'E':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'Pr':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'Pe':
        return { backgroundColor: '#dbeafe', color: '#1d4ed8' };
      case 'M':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'D':
      case 'NG':
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonDetail(true);
  };

  const handleBeginLesson = (lesson: Lesson) => {
    Alert.alert('Begin Lesson', `Start the lesson "${lesson.title}" with ${lesson.studentName}?`);
  };

  const handleGradeLesson = (lesson: Lesson) => {
    if (lesson.reservationId) {
      const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
      navigation.navigate('AudioDebrief', {
        id: lesson.id,
        lessonData: lessonDataParam
      });
    } else {
      Alert.alert('Error', 'No reservation found for this lesson');
    }
  };

  const handleViewLessonDetails = (lesson: Lesson) => {
    const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
    navigation.navigate('LessonDetails', {
      id: lesson.id,
      lessonData: lessonDataParam,
      role: 'instructor'
    });
  };

  const LessonCard = ({ lesson }: { lesson: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() => handleLessonPress(lesson)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.dateText}>{lesson.date}</Text>
          {lesson.startTime && lesson.endTime && (
            <Text style={styles.timeText}>{lesson.startTime} - {lesson.endTime}</Text>
          )}
        </View>
        <View style={[styles.statusBadge, getStatusColor(lesson.status)]}>
          <Text style={[styles.statusText, { color: getStatusColor(lesson.status).color }]}>
            {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonDescription}>{lesson.description}</Text>
        
        <View style={styles.lessonDetails}>
          <View style={styles.detailRow}>
            <Icon name="user" size={14} color={Colors.neutral.gray400} />
            <Text style={styles.detailText}>{lesson.studentName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="clock" size={14} color={Colors.neutral.gray400} />
            <Text style={styles.detailText}>{lesson.duration}</Text>
          </View>
          {lesson.aircraft && (
            <View style={styles.detailRow}>
              <Icon name="plane" size={14} color={Colors.neutral.gray400} />
              <Text style={styles.detailText}>{lesson.aircraft}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Icon name="tag" size={14} color={Colors.neutral.gray400} />
            <Text style={styles.detailText}>{lesson.type}</Text>
          </View>
        </View>

        {/* Objectives Preview */}
        <View style={styles.objectivesPreview}>
          <Text style={styles.objectivesTitle}>Learning Objectives ({lesson.learningObjectives.length})</Text>
          <View style={styles.objectivesList}>
            {lesson.learningObjectives.slice(0, 3).map((objective, index) => (
              <View key={objective.id} style={styles.objectiveItem}>
                <View style={styles.objectiveBullet} />
                <Text style={styles.objectiveText}>{objective.title}</Text>
                {objective.grade && (
                  <View style={[styles.gradeBadge, getGradeColor(objective.grade)]}>
                    <Text style={[styles.gradeText, { color: getGradeColor(objective.grade).color }]}>
                      {objective.grade}
                    </Text>
                  </View>
                )}
              </View>
            ))}
            {lesson.learningObjectives.length > 3 && (
              <Text style={styles.moreObjectives}>
                +{lesson.learningObjectives.length - 3} more objectives
              </Text>
            )}
          </View>
        </View>

        {/* Overall Grade for completed lessons */}
        {lesson.status === 'completed' && lesson.overallGrade && (
          <View style={styles.overallGrade}>
            <Text style={styles.overallGradeLabel}>Overall Grade:</Text>
            <View style={[styles.gradeBadge, getGradeColor(lesson.overallGrade)]}>
              <Text style={[styles.gradeText, { color: getGradeColor(lesson.overallGrade).color }]}>
                {lesson.overallGrade}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.cardActions}>
        {lesson.status === 'scheduled' && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleBeginLesson(lesson)}
          >
            <Icon name="play" size={14} color={Colors.primary.white} />
            <Text style={styles.primaryButtonText}>Begin Lesson</Text>
          </TouchableOpacity>
        )}
        {lesson.status === 'completed' && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleViewLessonDetails(lesson)}
          >
            <Icon name="eye" size={14} color={Colors.neutral.gray700} />
            <Text style={styles.secondaryButtonText}>View Details</Text>
          </TouchableOpacity>
        )}
        {(lesson.status === 'scheduled' || lesson.status === 'completed') && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleGradeLesson(lesson)}
          >
            <Icon name="clipboard" size={14} color={Colors.neutral.gray700} />
            <Text style={styles.secondaryButtonText}>
              {lesson.status === 'completed' ? 'Edit Grade' : 'Grade'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Lessons</Text>
          <Text style={styles.headerSubtitle}>{filteredLessons.length} lessons</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Add Lesson', 'Create new lesson functionality')}>
          <Icon name="plus" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterPills}
        contentContainerStyle={styles.filterPillsContent}
      >
        {[
          { key: 'all', label: 'All Lessons' },
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'completed', label: 'Completed' },
          { key: 'pending', label: 'Pending' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterPill,
              selectedFilter === filter.key && styles.filterPillActive
            ]}
            onPress={() => setSelectedFilter(filter.key as any)}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === filter.key && styles.filterPillTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lessons List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.lessonsContainer}>
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="graduation" size={48} color={Colors.neutral.gray300} />
              <Text style={styles.emptyStateTitle}>No Lessons Found</Text>
              <Text style={styles.emptyStateDescription}>
                No lessons match your current filter. Try selecting a different filter or create a new lesson.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Lesson Detail Modal */}
      <Modal
        visible={showLessonDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLessonDetail(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLessonDetail(false)}
            >
              <Icon name="times" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Lesson Details</Text>
            <View style={styles.modalSpacer} />
          </View>

          {selectedLesson && (
            <ScrollView style={styles.modalContent}>
              {/* Lesson Header */}
              <View style={styles.modalSection}>
                <Text style={styles.modalLessonTitle}>{selectedLesson.title}</Text>
                <View style={[styles.statusBadge, getStatusColor(selectedLesson.status)]}>
                  <Text style={[styles.statusText, { color: getStatusColor(selectedLesson.status).color }]}>
                    {selectedLesson.status.charAt(0).toUpperCase() + selectedLesson.status.slice(1)}
                  </Text>
                </View>
                <Text style={styles.modalLessonDescription}>{selectedLesson.description}</Text>
              </View>

              {/* Details */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Lesson Details</Text>
                <View style={styles.modalDetailRow}>
                  <Icon name="user" size={16} color={Colors.neutral.gray400} />
                  <Text style={styles.modalDetailText}>Student: {selectedLesson.studentName}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Icon name="clock" size={16} color={Colors.neutral.gray400} />
                  <Text style={styles.modalDetailText}>Duration: {selectedLesson.duration}</Text>
                </View>
                {selectedLesson.aircraft && (
                  <View style={styles.modalDetailRow}>
                    <Icon name="plane" size={16} color={Colors.neutral.gray400} />
                    <Text style={styles.modalDetailText}>Aircraft: {selectedLesson.aircraft}</Text>
                  </View>
                )}
                <View style={styles.modalDetailRow}>
                  <Icon name="tag" size={16} color={Colors.neutral.gray400} />
                  <Text style={styles.modalDetailText}>Type: {selectedLesson.type}</Text>
                </View>
                {selectedLesson.date && (
                  <View style={styles.modalDetailRow}>
                    <Icon name="calendar" size={16} color={Colors.neutral.gray400} />
                    <Text style={styles.modalDetailText}>
                      Date: {selectedLesson.date}
                      {selectedLesson.startTime && selectedLesson.endTime && 
                        ` at ${selectedLesson.startTime} - ${selectedLesson.endTime}`
                      }
                    </Text>
                  </View>
                )}
              </View>

              {/* Learning Objectives */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Learning Objectives</Text>
                <View style={styles.modalObjectivesList}>
                  {selectedLesson.learningObjectives.map((objective) => (
                    <View key={objective.id} style={styles.modalObjectiveItem}>
                      <View style={styles.objectiveHeader}>
                        <Text style={styles.modalObjectiveTitle}>{objective.title}</Text>
                        {objective.grade && (
                          <View style={[styles.gradeBadge, getGradeColor(objective.grade)]}>
                            <Text style={[styles.gradeText, { color: getGradeColor(objective.grade).color }]}>
                              {objective.grade}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.modalObjectiveCategory}>{objective.category}</Text>
                      {objective.required && (
                        <Text style={styles.requiredBadge}>Required</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* Overall Assessment */}
              {selectedLesson.status === 'completed' && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Overall Assessment</Text>
                  {selectedLesson.overallGrade && (
                    <View style={styles.overallGradeSection}>
                      <Text style={styles.overallGradeLabel}>Grade:</Text>
                      <View style={[styles.gradeBadge, getGradeColor(selectedLesson.overallGrade)]}>
                        <Text style={[styles.gradeText, { color: getGradeColor(selectedLesson.overallGrade).color }]}>
                          {selectedLesson.overallGrade}
                        </Text>
                      </View>
                    </View>
                  )}
                  {selectedLesson.overallNotes && (
                    <View style={styles.notesSection}>
                      <Text style={styles.notesLabel}>Notes:</Text>
                      <Text style={styles.notesText}>{selectedLesson.overallNotes}</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                {selectedLesson.status === 'scheduled' && (
                  <TouchableOpacity
                    style={styles.modalActionButton}
                    onPress={() => handleBeginLesson(selectedLesson)}
                  >
                    <Icon name="play" size={16} color={Colors.primary.white} />
                    <Text style={styles.modalActionText}>Begin Lesson</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.modalActionButton, styles.secondaryButton]}
                  onPress={() => handleGradeLesson(selectedLesson)}
                >
                  <Icon name="clipboard" size={16} color={Colors.neutral.gray700} />
                  <Text style={[styles.modalActionText, { color: Colors.neutral.gray700 }]}>
                    {selectedLesson.status === 'completed' ? 'Edit Grade' : 'Grade Lesson'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
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
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPills: {
    backgroundColor: Colors.primary.white,
    paddingVertical: 16,
  },
  filterPillsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: '#212121',
  },
  filterPillText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  filterPillTextActive: {
    color: Colors.primary.white,
  },
  content: {
    flex: 1,
  },
  lessonsContainer: {
    padding: 16,
    gap: 16,
  },
  lessonCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray900,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  cardContent: {
    marginBottom: 16,
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
    marginBottom: 12,
  },
  lessonDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  objectivesPreview: {
    marginBottom: 12,
  },
  objectivesTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  objectivesList: {
    gap: 6,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  objectiveBullet: {
    width: 4,
    height: 4,
    backgroundColor: Colors.neutral.gray400,
    borderRadius: 2,
  },
  objectiveText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  gradeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
  },
  moreObjectives: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    fontStyle: 'italic',
    marginLeft: 12,
  },
  overallGrade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  overallGradeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  modalCloseButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
    textAlign: 'center',
  },
  modalSpacer: {
    width: 44,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalLessonTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  modalLessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  modalDetailText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  modalObjectivesList: {
    gap: 12,
  },
  modalObjectiveItem: {
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
  },
  objectiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalObjectiveTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  modalObjectiveCategory: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  requiredBadge: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
  },
  overallGradeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  notesSection: {
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  modalActions: {
    gap: 12,
    marginTop: 24,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  modalActionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
});

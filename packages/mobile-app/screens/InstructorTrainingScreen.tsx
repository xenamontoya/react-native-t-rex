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
}

interface StudentData {
  id: string;
  name: string;
  progress: string;
  lessons: Lesson[];
  upcomingLessons: Lesson[];
  completedLessons: Lesson[];
  totalHours: string;
  stage: string;
}

export default function InstructorTrainingScreen({ navigation }: any) {
  const [students] = useState<StudentData[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      progress: '35% Complete',
      totalHours: '12.5',
      stage: 'Stage 1 - Pattern Work',
      lessons: [],
      upcomingLessons: [
        {
          id: 'upcoming-1',
          title: 'Cross Country Navigation',
          description: 'Learn navigation techniques for cross country flights',
          status: 'scheduled',
          date: 'Tomorrow',
          startTime: '09:00',
          endTime: '11:00',
          duration: '2.0 hours',
          studentName: 'Alex Johnson',
          aircraft: 'N12345',
          overview: 'Introduction to cross country navigation using pilotage and dead reckoning techniques.'
        }
      ],
      completedLessons: [
        {
          id: 'completed-1',
          title: 'Basic Flight Maneuvers',
          description: 'Introduction to basic aircraft control',
          status: 'completed',
          date: 'Dec 10',
          duration: '2.0 hours',
          studentName: 'Alex Johnson',
          aircraft: 'N12345',
          overallGrade: 'Complete',
          overallNotes: 'Good progress with basic maneuvers'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Chen',
      progress: '65% Complete',
      totalHours: '28.3',
      stage: 'Stage 2 - Solo Practice',
      lessons: [],
      upcomingLessons: [
        {
          id: 'upcoming-2',
          title: 'Night Flying',
          description: 'Introduction to night flying operations',
          status: 'scheduled',
          date: 'Dec 20',
          startTime: '19:00',
          endTime: '21:30',
          duration: '2.5 hours',
          studentName: 'Sarah Chen',
          aircraft: 'N67890'
        }
      ],
      completedLessons: [
        {
          id: 'completed-2',
          title: 'Traffic Pattern Practice',
          description: 'Standard traffic pattern procedures',
          status: 'completed',
          date: 'Dec 15',
          duration: '2.0 hours',
          studentName: 'Sarah Chen',
          aircraft: 'N67890',
          overallGrade: 'Complete',
          overallNotes: 'Excellent pattern work'
        },
        {
          id: 'completed-3',
          title: 'Solo Pattern Work',
          description: 'First solo pattern practice',
          status: 'completed',
          date: 'Dec 12',
          duration: '1.5 hours',
          studentName: 'Sarah Chen',
          aircraft: 'N67890',
          overallGrade: 'Complete',
          overallNotes: 'Successful first solo flight'
        }
      ]
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedStudent, setSelectedStudent] = useState<string>('all');

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const getAllUpcomingLessons = () => {
    if (selectedStudent === 'all') {
      return students.flatMap(student => student.upcomingLessons);
    }
    const student = students.find(s => s.id === selectedStudent);
    return student ? student.upcomingLessons : [];
  };

  const getAllCompletedLessons = () => {
    if (selectedStudent === 'all') {
      return students.flatMap(student => student.completedLessons);
    }
    const student = students.find(s => s.id === selectedStudent);
    return student ? student.completedLessons : [];
  };

  const currentLessons = selectedTab === 'upcoming' ? getAllUpcomingLessons() : getAllCompletedLessons();

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

  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.status === 'completed') {
      // Navigate to lesson details
      const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
      navigation.navigate('LessonDetails', {
        id: lesson.id,
        lessonData: lessonDataParam,
        role: 'instructor'
      });
    } else {
      // Navigate to lesson grading/debrief
      const lessonDataParam = encodeURIComponent(JSON.stringify(lesson));
      navigation.navigate('AudioDebrief', {
        id: lesson.id,
        lessonData: lessonDataParam
      });
    }
  };

  const handleBeginLesson = (lesson: Lesson) => {
    Alert.alert('Begin Lesson', `Start the lesson "${lesson.title}" with ${lesson.studentName}?`);
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
        </View>

        {/* Overall Grade for completed lessons */}
        {lesson.status === 'completed' && lesson.overallGrade && (
          <View style={styles.overallGrade}>
            <Text style={styles.overallGradeLabel}>Grade:</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{lesson.overallGrade}</Text>
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
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => handleLessonPress(lesson)}
        >
          <Icon name={lesson.status === 'completed' ? 'eye' : 'clipboard'} size={14} color={Colors.neutral.gray700} />
          <Text style={styles.secondaryButtonText}>
            {lesson.status === 'completed' ? 'View Details' : 'Grade Lesson'}
          </Text>
        </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Training</Text>
          <Text style={styles.headerSubtitle}>Manage student lessons</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Add Lesson', 'Create new lesson functionality')}>
          <Icon name="plus" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Student Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Student:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.studentFilters}
          contentContainerStyle={styles.studentFiltersContent}
        >
          <TouchableOpacity
            style={[
              styles.studentFilter,
              selectedStudent === 'all' && styles.studentFilterActive
            ]}
            onPress={() => setSelectedStudent('all')}
          >
            <Text
              style={[
                styles.studentFilterText,
                selectedStudent === 'all' && styles.studentFilterTextActive
              ]}
            >
              All Students
            </Text>
          </TouchableOpacity>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentFilter,
                selectedStudent === student.id && styles.studentFilterActive
              ]}
              onPress={() => setSelectedStudent(student.id)}
            >
              <Text
                style={[
                  styles.studentFilterText,
                  selectedStudent === student.id && styles.studentFilterTextActive
                ]}
              >
                {student.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.tabActive]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming ({getAllUpcomingLessons().length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.tabActive]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={[styles.tabText, selectedTab === 'completed' && styles.tabTextActive]}>
            Completed ({getAllCompletedLessons().length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lessons List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.lessonsContainer}>
          {currentLessons.length > 0 ? (
            currentLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="graduation" size={48} color={Colors.neutral.gray300} />
              <Text style={styles.emptyStateTitle}>
                No {selectedTab} Lessons
              </Text>
              <Text style={styles.emptyStateDescription}>
                {selectedTab === 'upcoming' 
                  ? 'No upcoming lessons scheduled. Create new lessons or check with students for scheduling.'
                  : 'No completed lessons found. Lessons you\'ve graded will appear here.'
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  filterSection: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  studentFilters: {
    marginHorizontal: -4,
  },
  studentFiltersContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  studentFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
  },
  studentFilterActive: {
    backgroundColor: '#212121',
  },
  studentFilterText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  studentFilterTextActive: {
    color: Colors.primary.white,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#212121',
  },
  tabText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  tabTextActive: {
    color: '#212121',
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
    marginBottom: 12,
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
  gradeBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#004D47',
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
});

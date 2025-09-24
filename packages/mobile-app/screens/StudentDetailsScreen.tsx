import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Modal,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

// Student and Lesson type definitions
interface Task {
  id: string;
  title: string;
  category: string;
  required: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'scheduled' | 'cancelled';
  date?: string;
  duration: string;
  objectives?: string[];
  learningObjectives?: Task[];
  tasks?: Task[];
  reservationId?: string;
  studentName?: string;
  aircraft?: string;
  startTime?: string;
  endTime?: string;
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  overview?: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  progress: string;
  totalHours: string;
  stage: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: string;
  lessons: Lesson[];
}

export default function StudentDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonDetail, setShowLessonDetail] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    // Parse student data from route parameters
    try {
      const params = route.params as any;
      const { id, studentData } = params || {};

      if (studentData) {
        const parsedStudent = JSON.parse(decodeURIComponent(studentData));
        setStudent(parsedStudent);
      } else if (id) {
        // Load mock data based on ID
        const mockStudents = getMockStudents();
        const foundStudent = mockStudents.find(s => s.id === id);
        
        if (foundStudent) {
          setStudent(foundStudent);
        } else {
          Alert.alert('Error', 'Student not found', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
        }
      }
    } catch (error) {
      console.error('Error parsing student data:', error);
      Alert.alert('Error', 'Failed to load student data', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  }, [route.params, navigation]);

  // Mock students data 
  const getMockStudents = (): Student[] => [
    {
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
        // SCHEDULED LESSONS
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
          ],
          reservationId: '1703772000000'
        },
        
        // PENDING LESSONS
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
          ]
        },
        
        // COMPLETED LESSONS
        { 
          id: 'l1', 
          title: 'Ground School - Regulations', 
          description: 'Introduction to FAR/AIM and basic regulations', 
          status: 'completed', 
          date: '2023-09-20', 
          duration: '2 hours', 
          objectives: ['Understand basic FAR regulations', 'Learn airport operations'],
          overallGrade: 'Complete',
          overallNotes: 'Alex demonstrated excellent understanding of basic FAR regulations and airspace requirements. Well-prepared for the lesson and asked thoughtful questions about airport operations. Ready to progress to flight training.',
        },
        { 
          id: 'l2', 
          title: 'First Flight - Familiarization', 
          description: 'Aircraft familiarization and basic controls', 
          status: 'completed', 
          date: '2023-10-01', 
          duration: '1.5 hours', 
          objectives: ['Aircraft preflight', 'Basic control inputs', 'Taxi procedures'],
          overallGrade: 'Complete',
          overallNotes: 'Great first flight! Alex showed natural aptitude for aircraft control and was very attentive to instruction. Preflight inspection was thorough after initial guidance. Demonstrated good coordination during basic control inputs and maintained situational awareness throughout the flight.',
        }
      ]
    },
    {
      id: 'student-2',
      name: 'Sarah Chen',
      avatar: 'SC',
      progress: '45%',
      totalHours: '18.2',
      stage: 'Training',
      email: 'sarah.chen@email.com',
      phone: '(555) 234-5678',
      course: 'Private Pilot License (PPL)',
      enrollmentDate: '2023-10-01',
      lessons: [
        // SCHEDULED LESSONS
        { 
          id: 'l8', 
          title: 'Navigation Basics', 
          description: 'Chart reading and basic navigation', 
          status: 'scheduled', 
          date: '2025-08-18', 
          duration: '2.0 hours', 
          objectives: ['Chart symbols', 'Course plotting', 'Dead reckoning'],
          reservationId: '1703858400000'
        },
        
        // PENDING LESSONS
        { 
          id: 'l9', 
          title: 'Radio Communications', 
          description: 'ATC communications and radio procedures', 
          status: 'pending', 
          duration: '1.5 hours', 
          objectives: ['Standard phraseology', 'ATC instructions', 'Emergency communications']
        },
        
        // COMPLETED LESSONS
        { 
          id: 'l1s', 
          title: 'Ground School - Aerodynamics', 
          description: 'Basic principles of flight', 
          status: 'completed', 
          date: '2023-10-05', 
          duration: '2 hours', 
          objectives: ['Four forces of flight', 'Airfoil theory', 'Performance factors'],
          overallGrade: 'Complete',
          overallNotes: 'Sarah demonstrated strong analytical skills and quickly grasped aerodynamic concepts. Excellent participation in discussions about lift, thrust, weight, and drag. Her questions showed deep thinking about performance factors.',
        }
      ]
    }
  ];

  const handleLessonClick = (lesson: Lesson) => {
    // Ensure lesson has proper learning objectives format
    let updatedLesson = { ...lesson };
    
    // If lesson doesn't have learningObjectives but has objectives, convert them
    if (!updatedLesson.learningObjectives && updatedLesson.objectives) {
      updatedLesson.learningObjectives = updatedLesson.objectives.map((objective, index) => ({
        id: `obj-${index + 1}`,
        title: objective,
        category: 'Training Objective',
        required: true
      }));
    }
    
    // If lesson still doesn't have learningObjectives, add default ones based on title
    if (!updatedLesson.learningObjectives || updatedLesson.learningObjectives.length === 0) {
      updatedLesson.learningObjectives = getDefaultLearningObjectives(updatedLesson.title);
    }
    
    
    const lessonDataParam = encodeURIComponent(JSON.stringify(updatedLesson));
    navigation.navigate('LessonDetails' as never, {
      id: lesson.id,
      lessonData: lessonDataParam,
      role: 'instructor'
    } as never);
  };

  const handleContactAction = (action: 'call' | 'email' | 'text') => {
    if (!student) return;

    switch (action) {
      case 'call':
        Linking.openURL(`tel:${student.phone}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${student.email}`);
        break;
      case 'text':
        Linking.openURL(`sms:${student.phone}`);
        break;
    }
  };

  const handleScheduleLesson = () => {
    console.log('Opening schedule modal for student:', student?.name);
    Alert.alert(
      'Schedule Lesson',
      `Schedule a new lesson for ${student?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Schedule', 
          onPress: () => {
            // Navigate to reservations or show schedule modal
            navigation.navigate('Reservations' as never);
          }
        }
      ]
    );
  };

  const handleAddEndorsement = () => {
    Alert.alert(
      'Add Endorsement',
      `Add an endorsement for ${student?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: () => {
            console.log('Add endorsement for:', student?.name);
            // Add endorsement functionality
          }
        }
      ]
    );
  };

  // Function to get default learning objectives based on lesson title
  const getDefaultLearningObjectives = (lessonTitle: string): Task[] => {
    if (lessonTitle.toLowerCase().includes('traffic pattern')) {
      return [
        { id: 'tp-1', title: 'Pre-landing procedures', category: 'Preflight Discussion', required: true },
        { id: 'tp-2', title: 'Airport traffic pattern entry and departure procedures', category: 'Flight', required: true },
        { id: 'tp-3', title: 'Normal or crosswind landings', category: 'Flight', required: true },
        { id: 'tp-4', title: 'Collision avoidance procedures', category: 'Flight', required: true },
      ];
    }
    
    if (lessonTitle.toLowerCase().includes('basic maneuvers')) {
      return [
        { id: 'bm-1', title: 'Straight and level flight', category: 'Flight', required: true },
        { id: 'bm-2', title: 'Climbs and descents', category: 'Flight', required: true },
        { id: 'bm-3', title: 'Level turns', category: 'Flight', required: true },
        { id: 'bm-4', title: 'Climbing and descending turns', category: 'Flight', required: true },
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 255, 242, 0.15)' }]}>
            <Text style={[styles.statusBadgeText, { color: '#004D47' }]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        );
      case 'scheduled':
        return (
          <View style={[styles.statusBadge, styles.scheduledStatus]}>
            <Text style={[styles.statusBadgeText, { color: Colors.status.warning }]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        );
      case 'pending':
        return (
          <View style={[styles.statusBadge, styles.pendingStatus]}>
            <Text style={[styles.statusBadgeText, { color: Colors.neutral.gray700 }]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        );
      default:
        return (
          <View style={[styles.statusBadge, styles.defaultStatus]}>
            <Text style={[styles.statusBadgeText, { color: Colors.neutral.gray700 }]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        );
    }
  };

  const renderLessonCard = (lesson: Lesson, isCompleted: boolean = false) => (
    <View key={lesson.id} style={[styles.lessonCard, isCompleted && styles.completedLessonCard]}>
      <TouchableOpacity
        onPress={() => handleLessonClick(lesson)}
        style={styles.lessonContent}
        activeOpacity={0.7}
      >
        <View style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
            {lesson.date && (
              <View style={styles.lessonMeta}>
                <Icon name="calendar" size={12} color={Colors.neutral.gray500} />
                <Text style={styles.lessonDate}>{lesson.date}</Text>
              </View>
            )}
          </View>
          <View style={styles.statusContainer}>
            {getStatusBadge(lesson.status)}
          </View>
        </View>
      </TouchableOpacity>

      {/* Reservation Details for Scheduled Lessons */}
      {lesson.status === 'scheduled' && lesson.reservationId && (
        <View style={styles.reservationDetails}>
          <View style={styles.reservationInfo}>
            <View style={styles.reservationMeta}>
              <Icon name="plane" size={12} color={Colors.neutral.gray600} />
              <Text style={styles.reservationText}>N12345 - Cessna 172</Text>
            </View>
            <View style={styles.reservationMeta}>
              <Icon name="clock" size={12} color={Colors.neutral.gray600} />
              <Text style={styles.reservationText}>9:00 AM - 11:00 AM</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewReservationButton}
            onPress={() => {
              if (lesson.reservationId) {
                const reservation = {
                  id: lesson.reservationId,
                  aircraft: lesson.aircraft || 'N123AB',
                  student: student?.name || 'Student',
                  instructor: 'Current Instructor',
                  type: lesson.title || 'Training Session',
                  date: lesson.date || new Date().toLocaleDateString(),
                  startTime: lesson.startTime || '09:00',
                  endTime: lesson.endTime || '11:00',
                  dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
                  aircraftType: 'Cessna 172',
                  status: 'Confirmed'
                };
                
                const reservationDataParam = encodeURIComponent(JSON.stringify(reservation));
                navigation.navigate('ReservationDetails' as never, {
                  id: reservation.id,
                  reservationData: reservationDataParam
                } as never);
              }
            }}
          >
            <Icon name="externalLink" size={12} color={Colors.neutral.gray600} />
            <Text style={styles.viewReservationText}>View Reservation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (!student) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Loading student details...</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowLeft" size={16} color={Colors.brand.cyan} />
            <Text style={styles.backButtonText}>Return to Training</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{student.name}</Text>
            <Text style={styles.headerSubtitle}>{student.course}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Icon name="ellipsisV" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setShowDropdown(false);
              Alert.alert('Share Student', 'Share student profile functionality');
            }}
          >
            <Icon name="share" size={16} color={Colors.neutral.gray600} />
            <Text style={styles.dropdownText}>Share Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setShowDropdown(false);
              Alert.alert('Export Progress', 'Export student progress functionality');
            }}
          >
            <Icon name="externalLink" size={16} color={Colors.neutral.gray600} />
            <Text style={styles.dropdownText}>Export Progress</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Student Info Section */}
        <View style={styles.studentInfo}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => setShowProfileModal(true)}
          >
            <Image
              source={{ uri: `https://i.pravatar.cc/320?seed=${student.name}` }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Progress</Text>
              <Text style={styles.infoValue}>{student.progress}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Hours</Text>
              <Text style={styles.infoValue}>{student.totalHours}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Stage</Text>
              <Text style={styles.infoValue}>{student.stage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Enrollment Date</Text>
              <Text style={styles.infoValue}>{student.enrollmentDate}</Text>
            </View>
          </View>

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => handleContactAction('call')}
            >
              <Icon name="phone" size={16} color={Colors.neutral.gray700} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => handleContactAction('email')}
            >
              <Icon name="envelope" size={16} color={Colors.neutral.gray700} />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => handleContactAction('text')}
            >
              <Icon name="message" size={16} color={Colors.neutral.gray700} />
              <Text style={styles.contactButtonText}>Text</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Training Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: student.progress }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Progress: {student.progress}</Text>
            <Text style={styles.progressLabel}>{student.totalHours} total hours</Text>
          </View>
        </View>

        {/* Lessons Section */}
        {student.lessons && student.lessons.length > 0 ? (
          <>
            {/* Upcoming Lessons */}
            {(student.lessons.filter(lesson => lesson.status === 'scheduled' || lesson.status === 'pending')).length > 0 && (
              <View style={styles.lessonsSection}>
                <Text style={styles.sectionTitle}>Upcoming Lessons</Text>
                
                {/* Scheduled Lessons */}
                {student.lessons.filter(lesson => lesson.status === 'scheduled').length > 0 && (
                  <View style={styles.lessonSubsection}>
                    <View style={styles.subsectionHeader}>
                      <View style={[styles.statusDot, { backgroundColor: Colors.status.warning }]} />
                      <Text style={styles.subsectionTitle}>Scheduled</Text>
                    </View>
                    <View style={styles.lessonsList}>
                      {student.lessons.filter(lesson => lesson.status === 'scheduled').map((lesson) => 
                        renderLessonCard(lesson)
                      )}
                    </View>
                  </View>
                )}

                {/* Pending Lessons */}
                {student.lessons.filter(lesson => lesson.status === 'pending').length > 0 && (
                  <View style={styles.lessonSubsection}>
                    <View style={styles.subsectionHeader}>
                      <View style={[styles.statusDot, { backgroundColor: Colors.neutral.gray500 }]} />
                      <Text style={styles.subsectionTitle}>Pending</Text>
                    </View>
                    <View style={styles.lessonsList}>
                      {student.lessons.filter(lesson => lesson.status === 'pending').map((lesson) => 
                        renderLessonCard(lesson)
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Past Lessons */}
            {student.lessons.filter(lesson => lesson.status === 'completed').length > 0 && (
              <View style={styles.lessonsSection}>
                <Text style={styles.sectionTitle}>Past Lessons</Text>
                <View style={styles.lessonsList}>
                  {student.lessons.filter(lesson => lesson.status === 'completed')
                    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
                    .map((lesson) => renderLessonCard(lesson, true))}
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="graduation" size={48} color={Colors.neutral.gray300} />
            <Text style={styles.emptyStateText}>No lessons scheduled yet</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Menu */}
      {showFloatingMenu && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowFloatingMenu(false)}
            activeOpacity={1}
          />
          
          <TouchableOpacity
            style={[styles.floatingMenuItem, { bottom: 180 }]}
            onPress={() => {
              setShowFloatingMenu(false);
              handleScheduleLesson();
            }}
          >
            <Icon name="calendar" size={16} color={Colors.neutral.gray600} />
            <Text style={styles.floatingMenuText}>Schedule Lesson</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.floatingMenuItem, { bottom: 130 }]}
            onPress={() => {
              setShowFloatingMenu(false);
              handleAddEndorsement();
            }}
          >
            <Icon name="award" size={16} color={Colors.neutral.gray600} />
            <Text style={styles.floatingMenuText}>Add Endorsement</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => setShowFloatingMenu(!showFloatingMenu)}
      >
        <Icon
          name={showFloatingMenu ? "times" : "plus"}
          size={20}
          color={Colors.brand.cyan}
        />
      </TouchableOpacity>

      {/* Profile Photo Modal */}
      <Modal
        visible={showProfileModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowProfileModal(false)}
          activeOpacity={1}
        >
          <View style={styles.profileModalContent}>
            <TouchableOpacity
              style={styles.profileModalClose}
              onPress={() => setShowProfileModal(false)}
            >
              <Icon name="times" size={16} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <View style={styles.profileModalImageContainer}>
              <Image
                source={{ uri: `https://i.pravatar.cc/320?seed=${student.name}` }}
                style={styles.profileModalImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.neutral.gray500,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    gap: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: Colors.brand.cyan,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerBackButton: {
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
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
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
    top: 80,
    right: 16,
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
    minWidth: 160,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  content: {
    flex: 1,
  },
  studentInfo: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  infoGrid: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  progressSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F6A345',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  lessonsSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
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
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray800,
  },
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    padding: 16,
  },
  completedLessonCard: {
    backgroundColor: Colors.neutral.gray50,
  },
  lessonContent: {
    // No additional styles needed for TouchableOpacity
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
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonDate: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  statusContainer: {
    // Container for status badge
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  scheduledStatus: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  pendingStatus: {
    backgroundColor: Colors.neutral.gray100,
  },
  defaultStatus: {
    backgroundColor: Colors.neutral.gray100,
  },
  reservationDetails: {
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reservationInfo: {
    flex: 1,
  },
  reservationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  reservationText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  viewReservationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
    gap: 4,
  },
  viewReservationText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
  },
  floatingMenuItem: {
    position: 'absolute',
    right: 24,
    width: 192,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
    zIndex: 1001,
  },
  floatingMenuText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: '#212121',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 3,
    borderColor: Colors.brand.cyan,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModalContent: {
    position: 'relative',
  },
  profileModalClose: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  profileModalImageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileModalImage: {
    width: 320,
    height: 320,
  },
});

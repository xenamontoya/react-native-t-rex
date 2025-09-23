import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from '../components';
import { useNavigation } from '@react-navigation/native';

// This is a React Native conversion of the original instructor.tsx dashboard
const InstructorDashboard: React.FC = () => {
  const navigation = useNavigation();
  const [instructor, setInstructor] = useState<any>(null);
  const isDark = false; // TODO: Connect to theme store
  const unreadCount = 0; // TODO: Connect to notification store

  useEffect(() => {
    // Load instructor data (copied from original)
    const instructorData = {
      id: 'instructor-1',
      name: 'Sarah Mitchell',
      certifications: 'CFI, CFII, MEI',
      experience: '8 years',
      totalInstructionHours: '2,450',
      students: [
        { 
          id: 'student-1',
          name: 'Alex Johnson', 
          progress: 75, 
          nextLesson: '2025-08-15', 
          status: 'active',
          stage: 'Pre-Solo',
          totalHours: '24.5',
          course: 'Private Pilot License (PPL)',
          completedLessons: 8,
          pendingLessons: 6
        },
        { 
          id: 'student-2',
          name: 'Sarah Chen', 
          progress: 45, 
          nextLesson: '2025-08-16', 
          status: 'active',
          stage: 'Basic Training',
          totalHours: '18.2',
          course: 'Private Pilot License (PPL)',
          completedLessons: 5,
          pendingLessons: 8
        },
        { 
          id: 'student-3',
          name: 'Mike Rodriguez', 
          progress: 90, 
          nextLesson: '2025-08-17', 
          status: 'checkride',
          stage: 'Checkride Prep',
          totalHours: '42.3',
          course: 'Private Pilot License (PPL)',
          completedLessons: 14,
          pendingLessons: 2
        },
        { 
          id: 'student-4',
          name: 'Emily Davis', 
          progress: 25, 
          nextLesson: '2025-08-18', 
          status: 'active',
          stage: 'Ground School',
          totalHours: '8.1',
          course: 'Private Pilot License (PPL)',
          completedLessons: 3,
          pendingLessons: 10
        }
      ],
      recentLessons: [
        {
          id: 'l2',
          studentName: 'Alex Johnson',
          title: 'First Flight - Familiarization',
          date: '2023-10-01',
          duration: '1.5 hours',
          status: 'completed',
          grade: 'Complete',
          overallGrade: 'Complete',
          overallNotes: 'Great first flight! Alex showed natural aptitude for aircraft control and was very attentive to instruction.',
        },
        {
          id: 'l1',
          studentName: 'Sarah Chen',
          title: 'Ground School - Weather',
          date: '2023-09-28',
          duration: '2.0 hours',
          status: 'completed',
          grade: 'Complete',
          overallGrade: 'Complete',
          overallNotes: 'Sarah demonstrated excellent weather analysis skills and decision-making capabilities.',
        }
      ]
    };

    setInstructor(instructorData);
  }, []);

  // Calculate instructor metrics
  const totalStudents = instructor?.students?.length || 0;
  const activeStudents = instructor?.students?.filter((s: any) => s.status === 'active').length || 0;
  const totalFlightTime = 768.4; // Baseline hours
  const savedFlights = []; // TODO: Connect to flight store

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!instructor) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }]}>
      {/* Welcome Header with Instructor Summary */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            {/* Profile Avatar */}
            <Image 
              source={{ uri: `https://i.pravatar.cc/64?seed=${instructor.name}` }}
              style={styles.avatar}
            />
            
            {/* Welcome Text */}
            <View style={styles.welcomeText}>
              <Text style={[styles.welcomeLabel, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                Welcome back,
              </Text>
              <Text style={[styles.name, { color: isDark ? '#ffffff' : '#111827' }]}>
                {instructor.name}
              </Text>
              <Text style={[styles.credentials, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                {instructor.certifications} • {instructor.experience} experience
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

        {/* Instructor Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
              {totalFlightTime.toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              Total Hours
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
              {totalStudents}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#a0a0a0' : '#4b5563' }]}>
              Students
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

      {/* Today's Schedule */}
      <View style={[styles.card, { borderColor: '#00FFF2' }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Today's Schedule</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('InstructorReservations' as never)}
            style={styles.viewAllButton}
          >
            <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View All</Text>
            <Icon name="arrowRight" size={12} color="#5177bb" />
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleTitle}>Next Lesson: Alex Johnson</Text>
          <Text style={styles.scheduleSubtitle}>Flight Training • Cessna 172</Text>
          <View style={styles.scheduleDetails}>
            <View style={styles.scheduleDetailItem}>
              <Icon name="calendar" size={12} color="#6b7280" />
              <Text style={styles.scheduleDetailText}>AUG 15</Text>
            </View>
            <View style={styles.scheduleDetailItem}>
              <Icon name="clock" size={12} color="#6b7280" />
              <Text style={styles.scheduleDetailText}>9:00 AM - 11:00 AM</Text>
            </View>
          </View>
          <Text style={[styles.cost, { color: '#008333' }]}>Est. Cost: $325.00</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityGrid}>
        {/* Recent Lessons */}
        {instructor.recentLessons && instructor.recentLessons.length > 0 && (
          <View style={styles.activityCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Lessons</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('InstructorTraining' as never)}
                style={styles.viewAllButton}
              >
                <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View All</Text>
                <Icon name="arrowRight" size={12} color="#5177bb" />
              </TouchableOpacity>
            </View>
            <View style={styles.lessonsList}>
              {instructor.recentLessons.map((lesson: any) => (
                <View key={lesson.id} style={styles.lessonItem}>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonStudent}>Student: {lesson.studentName}</Text>
                    <View style={styles.lessonDetails}>
                      <View style={styles.lessonDetailItem}>
                        <Icon name="calendar" size={12} color="#6b7280" />
                        <Text style={styles.lessonDetailText}>{formatShortDate(lesson.date)}</Text>
                      </View>
                      <View style={styles.lessonDetailItem}>
                        <Icon name="clock" size={12} color="#6b7280" />
                        <Text style={styles.lessonDetailText}>{lesson.duration}</Text>
                      </View>
                    </View>
                  </View>
                  {lesson.grade && (
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeText}>{lesson.grade}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Students Overview */}
        <View style={styles.activityCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>My Students</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('InstructorTraining' as never)}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View All</Text>
              <Icon name="arrowRight" size={12} color="#5177bb" />
            </TouchableOpacity>
          </View>
          <View style={styles.studentsList}>
            {instructor.students.slice(0, 3).map((student: any) => (
              <View key={student.id} style={styles.studentItem}>
                <View style={styles.studentInfo}>
                  <Image 
                    source={{ uri: `https://i.pravatar.cc/40?seed=${student.name}` }}
                    style={styles.studentAvatar}
                  />
                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentProgress}>{student.stage} • {student.progress}% complete</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: student.status === 'active' ? '#dbeafe' : 
                                   student.status === 'checkride' ? 'rgba(0, 255, 242, 0.15)' : '#f3f4f6'
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { 
                      color: student.status === 'active' ? '#1e40af' : 
                             student.status === 'checkride' ? '#004D47' : '#4b5563'
                    }
                  ]}>
                    {student.status === 'checkride' ? 'Checkride Ready' : 
                     student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Flight Statistics */}
      <View style={styles.activityCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Flight Statistics</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('InstructorMyFlights' as never)}
            style={styles.viewAllButton}
          >
            <Text style={[styles.viewAllText, { color: '#5177bb' }]}>View Logbook</Text>
            <Icon name="arrowRight" size={12} color="#5177bb" />
          </TouchableOpacity>
        </View>
        <View style={styles.flightStats}>
          <View style={styles.flightStatItem}>
            <View style={styles.flightStatContent}>
              <Icon name="clock" size={16} color="#6b7280" />
              <Text style={styles.flightStatLabel}>Total Flight Time</Text>
            </View>
            <Text style={styles.flightStatValue}>{totalFlightTime.toFixed(1)} hrs</Text>
          </View>
          <View style={styles.flightStatItem}>
            <View style={styles.flightStatContent}>
              <Icon name="graduation" size={16} color="#6b7280" />
              <Text style={styles.flightStatLabel}>Instruction Given</Text>
            </View>
            <Text style={styles.flightStatValue}>370.0 hrs</Text>
          </View>
          <View style={styles.flightStatItem}>
            <View style={styles.flightStatContent}>
              <Icon name="plane" size={16} color="#6b7280" />
              <Text style={styles.flightStatLabel}>Solo Time</Text>
            </View>
            <Text style={[styles.flightStatValue, { color: '#10b981' }]}>300.0 hrs</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  credentials: {
    fontSize: 14,
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  scheduleItem: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  scheduleTitle: {
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  scheduleDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scheduleDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleDetailText: {
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
  activityGrid: {
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
    marginBottom: 24,
  },
  lessonsList: {
    gap: 12,
  },
  lessonItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
  lessonStudent: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  lessonDetails: {
    flexDirection: 'row',
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
  studentsList: {
    gap: 16,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  studentName: {
    fontWeight: '500',
    color: '#111827',
  },
  studentProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
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

export default InstructorDashboard;

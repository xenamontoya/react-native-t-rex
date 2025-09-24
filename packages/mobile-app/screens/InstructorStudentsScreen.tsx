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

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  totalHours: string;
  recentActivity: string;
  nextLesson?: string;
  progress: number;
  avatar?: string;
  status: 'active' | 'completed' | 'inactive';
  endorsements: string[];
  upcomingCheckride?: string;
}

export default function InstructorStudentsScreen({ navigation }: any) {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      stage: 'Stage 1 - Pattern Work',
      totalHours: '12.5',
      recentActivity: '2 days ago',
      nextLesson: 'Cross Country Navigation',
      progress: 35,
      status: 'active',
      endorsements: ['Solo Pattern', 'Radio Communications'],
      upcomingCheckride: 'Stage Check - Jan 15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      stage: 'Stage 2 - Solo Practice',
      totalHours: '28.3',
      recentActivity: '5 days ago',
      nextLesson: 'Night Flying',
      progress: 65,
      status: 'active',
      endorsements: ['Solo Pattern', 'Solo XC', 'Night Flight'],
      upcomingCheckride: 'Checkride - Feb 1'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      stage: 'Stage 3 - Advanced Maneuvers',
      totalHours: '45.2',
      recentActivity: '1 week ago',
      nextLesson: 'Checkride Prep',
      progress: 85,
      status: 'active',
      endorsements: ['Solo Pattern', 'Solo XC', 'Night Flight', 'Complex Aircraft'],
      upcomingCheckride: 'PPL Checkride - Dec 20'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '(555) 789-0123',
      stage: 'Complete - PPL',
      totalHours: '52.1',
      recentActivity: '2 weeks ago',
      progress: 100,
      status: 'completed',
      endorsements: ['Solo Pattern', 'Solo XC', 'Night Flight', 'Complex Aircraft', 'PPL'],
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'inactive'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentDetail, setShowStudentDetail] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.stage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'inactive':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#6b7280';
  };

  const handleStudentPress = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentDetail(true);
  };

  const handleContactStudent = (student: Student, method: 'email' | 'phone') => {
    if (method === 'email') {
      Alert.alert('Email Student', `Send email to ${student.email}?`);
    } else {
      Alert.alert('Call Student', `Call ${student.phone}?`);
    }
  };

  const handleScheduleLesson = (student: Student) => {
    Alert.alert('Schedule Lesson', `Schedule a lesson with ${student.name}?`);
  };

  const handleViewProgress = (student: Student) => {
    Alert.alert('View Progress', `View detailed progress for ${student.name}?`);
  };

  const StudentCard = ({ student }: { student: Student }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => handleStudentPress(student)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <View style={[styles.statusBadge, getStatusColor(student.status)]}>
            <Text style={[styles.statusText, { color: getStatusColor(student.status).color }]}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.stageText}>{student.stage}</Text>
          <Text style={styles.progressText}>{student.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${student.progress}%`,
                backgroundColor: getProgressColor(student.progress)
              }
            ]} 
          />
        </View>
      </View>

      {/* Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Icon name="clock" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>{student.totalHours} total hours</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.detailText}>Last activity: {student.recentActivity}</Text>
        </View>
        {student.nextLesson && (
          <View style={styles.detailRow}>
            <Icon name="graduation" size={14} color={Colors.neutral.gray400} />
            <Text style={styles.detailText}>Next: {student.nextLesson}</Text>
          </View>
        )}
        {student.upcomingCheckride && (
          <View style={styles.detailRow}>
            <Icon name="award" size={14} color={Colors.brand.cyan} />
            <Text style={[styles.detailText, { color: Colors.brand.cyan }]}>
              {student.upcomingCheckride}
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleContactStudent(student, 'email')}
        >
          <Icon name="envelope" size={14} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleContactStudent(student, 'phone')}
        >
          <Icon name="phone" size={14} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleScheduleLesson(student)}
        >
          <Icon name="calendar" size={14} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewProgress(student)}
        >
          <Icon name="chartLine" size={14} color={Colors.neutral.gray600} />
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
          <Text style={styles.headerTitle}>My Students</Text>
          <Text style={styles.headerSubtitle}>{filteredStudents.length} students</Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="filter" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color={Colors.neutral.gray400} />
          <Text
            style={styles.searchInput}
            onPress={() => Alert.alert('Search', 'Search functionality would be implemented here')}
          >
            {searchQuery || 'Search students...'}
          </Text>
        </View>
      </View>

      {/* Filter Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterPills}
        contentContainerStyle={styles.filterPillsContent}
      >
        {[
          { key: 'all', label: 'All Students' },
          { key: 'active', label: 'Active' },
          { key: 'completed', label: 'Completed' },
          { key: 'inactive', label: 'Inactive' }
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

      {/* Students List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.studentsContainer}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="users" size={48} color={Colors.neutral.gray300} />
              <Text style={styles.emptyStateTitle}>No Students Found</Text>
              <Text style={styles.emptyStateDescription}>
                {searchQuery 
                  ? 'No students match your search criteria.' 
                  : 'You don\'t have any students assigned yet.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Student Detail Modal */}
      <Modal
        visible={showStudentDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowStudentDetail(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowStudentDetail(false)}
            >
              <Icon name="times" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Student Details</Text>
            <View style={styles.modalSpacer} />
          </View>

          {selectedStudent && (
            <ScrollView style={styles.modalContent}>
              {/* Student Info */}
              <View style={styles.modalSection}>
                <View style={styles.modalAvatar}>
                  <Text style={styles.modalAvatarText}>
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={styles.modalStudentName}>{selectedStudent.name}</Text>
                <View style={[styles.statusBadge, getStatusColor(selectedStudent.status)]}>
                  <Text style={[styles.statusText, { color: getStatusColor(selectedStudent.status).color }]}>
                    {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                  </Text>
                </View>
              </View>

              {/* Contact Info */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Contact Information</Text>
                <View style={styles.modalDetailRow}>
                  <Icon name="envelope" size={16} color={Colors.neutral.gray400} />
                  <Text style={styles.modalDetailText}>{selectedStudent.email}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Icon name="phone" size={16} color={Colors.neutral.gray400} />
                  <Text style={styles.modalDetailText}>{selectedStudent.phone}</Text>
                </View>
              </View>

              {/* Progress */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Training Progress</Text>
                <Text style={styles.modalStageText}>{selectedStudent.stage}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${selectedStudent.progress}%`,
                          backgroundColor: getProgressColor(selectedStudent.progress)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentage}>{selectedStudent.progress}%</Text>
                </View>
                <Text style={styles.modalDetailText}>
                  {selectedStudent.totalHours} total flight hours
                </Text>
              </View>

              {/* Endorsements */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Endorsements</Text>
                <View style={styles.endorsementsContainer}>
                  {selectedStudent.endorsements.map((endorsement, index) => (
                    <View key={index} style={styles.endorsementBadge}>
                      <Text style={styles.endorsementText}>{endorsement}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Upcoming Events */}
              {selectedStudent.upcomingCheckride && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Upcoming Events</Text>
                  <View style={styles.upcomingEvent}>
                    <Icon name="award" size={16} color={Colors.brand.cyan} />
                    <Text style={[styles.modalDetailText, { color: Colors.brand.cyan }]}>
                      {selectedStudent.upcomingCheckride}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => handleScheduleLesson(selectedStudent)}
                >
                  <Icon name="calendar" size={16} color={Colors.primary.white} />
                  <Text style={styles.modalActionText}>Schedule Lesson</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalActionButton, styles.secondaryButton]}
                  onPress={() => handleViewProgress(selectedStudent)}
                >
                  <Icon name="chartLine" size={16} color={Colors.neutral.gray700} />
                  <Text style={[styles.modalActionText, { color: Colors.neutral.gray700 }]}>
                    View Progress
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.primary.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  filterPills: {
    backgroundColor: Colors.primary.white,
    paddingBottom: 16,
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
  studentsContainer: {
    padding: 16,
    gap: 16,
  },
  studentCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.brand.cyan,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  headerInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
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
  stageText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  cardDetails: {
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalAvatar: {
    width: 80,
    height: 80,
    backgroundColor: Colors.brand.cyan,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalAvatarText: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  modalStudentName: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 8,
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
  modalStageText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    minWidth: 40,
  },
  endorsementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  endorsementBadge: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  endorsementText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  upcomingEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
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
  secondaryButton: {
    backgroundColor: Colors.neutral.gray100,
  },
  modalActionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
});

import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';
import ActionSheet from './ActionSheet';
import ConfirmationModal from './ConfirmationModal';

interface ReservationDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: any;
  onEdit?: (reservation: any) => void;
  onDuplicate?: (reservation: any) => void;
  onCancel?: (reservation: any) => void;
  onLogLesson?: (reservation: any) => void;
  hideActions?: boolean;
}

const ReservationDetailsDrawer: React.FC<ReservationDetailsDrawerProps> = ({
  isOpen,
  onClose,
  reservation,
  onEdit,
  onDuplicate,
  onCancel,
  onLogLesson,
  hideActions = false
}) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!reservation) return null;

  // Check if this is a draft reservation (future date and recent creation)
  const isDraftReservation = () => {
    const reservationDate = new Date(reservation.date);
    const today = new Date();
    return reservationDate > today;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reserved':
        return { backgroundColor: Colors.status.info, color: Colors.neutral.white };
      case 'Confirmed':
        return { backgroundColor: Colors.status.success, color: Colors.neutral.white };
      case 'Pending':
        return { backgroundColor: Colors.status.warning, color: Colors.neutral.black };
      case 'Cancelled':
        return { backgroundColor: Colors.status.error, color: Colors.neutral.white };
      default:
        return { backgroundColor: Colors.neutral.gray300, color: Colors.neutral.gray800 };
    }
  };

  const handleCancelConfirm = () => {
    if (onCancel) {
      onCancel(reservation);
    }
    setShowCancelModal(false);
    onClose();
  };

  const handleCall = () => {
    const phoneNumber = hideActions ? reservation.instructorPhone : reservation.studentPhone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const handleEmail = () => {
    const email = hideActions ? reservation.instructorEmail : reservation.studentEmail;
    if (email) {
      Linking.openURL(`mailto:${email}`);
    } else {
      Alert.alert('No email address available');
    }
  };

  const handleText = () => {
    const phoneNumber = hideActions ? reservation.instructorPhone : reservation.studentPhone;
    if (phoneNumber) {
      Linking.openURL(`sms:${phoneNumber}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const actionSheetOptions = [
    {
      title: 'Begin Debrief',
      icon: 'book',
      onPress: () => {
        setShowActionSheet(false);
        onLogLesson?.(reservation);
      },
      visible: !hideActions && onLogLesson
    },
    {
      title: 'Check Out',
      icon: 'check-circle',
      onPress: () => {
        setShowActionSheet(false);
        // Handle check out action
      },
      visible: !hideActions
    },
    {
      title: 'Add to Calendar',
      icon: 'calendar-plus',
      onPress: () => {
        setShowActionSheet(false);
        // Handle add to calendar action
      }
    },
    {
      title: 'Edit',
      icon: 'edit',
      onPress: () => {
        setShowActionSheet(false);
        onEdit?.(reservation);
      },
      visible: !!onEdit
    },
    {
      title: 'Duplicate',
      icon: 'copy',
      onPress: () => {
        setShowActionSheet(false);
        onDuplicate?.(reservation);
      },
      visible: !!onDuplicate
    },
    {
      title: 'Delete',
      icon: 'trash',
      onPress: () => {
        setShowActionSheet(false);
        setShowCancelModal(true);
      },
      visible: !!onCancel,
      destructive: true
    }
  ].filter(option => option.visible !== false);

  return (
    <>
      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={onClose}
                style={styles.backButton}
              >
                <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
              <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>Reservation Details</Text>
                <Text style={styles.headerSubtitle}>{reservation.aircraft}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={() => setShowActionSheet(true)}
              style={styles.menuButton}
            >
              <Icon name="ellipsis-v" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Status and Main Info */}
            <View style={styles.section}>
              <View style={styles.timeCard}>
                <Text style={styles.timeText}>
                  {reservation.startTime} - {reservation.endTime}
                </Text>
                <Text style={styles.timeLabel}>Time</Text>
              </View>

              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{reservation.date}</Text>
                <Text style={styles.dayText}>{reservation.dayOfWeek}</Text>
              </View>
            </View>

            {/* Aircraft Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="plane" size={20} color={Colors.neutral.gray400} />
                <Text style={styles.sectionTitle}>Aircraft</Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Registration</Text>
                  <Text style={styles.infoValue}>{reservation.aircraft}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type</Text>
                  <Text style={styles.infoValue}>{reservation.aircraftType}</Text>
                </View>
              </View>
            </View>

            {/* Booking Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="calendar" size={20} color={Colors.neutral.gray400} />
                <Text style={styles.sectionTitle}>Booking Details</Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Reservation ID</Text>
                  <Text style={styles.infoValue}>{reservation.id}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Created</Text>
                  <Text style={styles.infoValue}>Today</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Duration</Text>
                  <Text style={styles.infoValue}>2 hours</Text>
                </View>
              </View>
            </View>

            {/* Student/Instructor Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon 
                  name={hideActions ? "user" : "graduation-cap"} 
                  size={20} 
                  color={Colors.neutral.gray400} 
                />
                <Text style={styles.sectionTitle}>
                  {hideActions ? 'Instructor' : 'Student'}
                </Text>
              </View>
              
              {/* Profile Picture */}
              <View style={styles.profileContainer}>
                <Image 
                  source={{
                    uri: `https://i.pravatar.cc/96?seed=${hideActions ? reservation.instructor : reservation.student}`
                  }}
                  style={styles.profileImage}
                />
              </View>
              
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>
                    {hideActions ? reservation.instructor : reservation.student}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Training Type</Text>
                  <Text style={styles.infoValue}>{reservation.type}</Text>
                </View>
              </View>
              
              {/* Contact Buttons */}
              <View style={styles.contactButtons}>
                <TouchableOpacity 
                  style={[styles.contactButton, styles.callButton]}
                  onPress={handleCall}
                >
                  <Icon name="phone" size={20} color={Colors.status.info} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={handleEmail}
                >
                  <Icon name="envelope" size={20} color={Colors.neutral.gray700} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={handleText}
                >
                  <Icon name="message" size={20} color={Colors.neutral.gray700} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Lesson Details Section - Only show if reservation has lesson data */}
            {reservation.lesson && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Icon name="book" size={20} color={Colors.neutral.gray400} />
                  <Text style={styles.sectionTitle}>Lesson Details</Text>
                </View>
                
                <View style={styles.lessonContent}>
                  {/* Lesson Title and Description */}
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{reservation.lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{reservation.lesson.description}</Text>
                  </View>

                  {/* Lesson Info */}
                  <View style={styles.infoGrid}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Duration</Text>
                      <Text style={styles.infoValue}>{reservation.lesson.duration}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Status</Text>
                      <View style={[styles.statusBadge, { backgroundColor: Colors.status.success }]}>
                        <Text style={[styles.statusText, { color: Colors.neutral.white }]}>
                          {reservation.lesson.status.charAt(0).toUpperCase() + reservation.lesson.status.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Learning Objectives */}
                  {reservation.lesson.learningObjectives && reservation.lesson.learningObjectives.length > 0 && (
                    <View style={styles.objectivesContainer}>
                      <Text style={styles.objectivesTitle}>Learning Objectives</Text>
                      <View style={styles.objectives}>
                        {reservation.lesson.learningObjectives.slice(0, 3).map((objective: any, idx: number) => (
                          <Text key={idx} style={styles.objectiveText}>
                            {objective.title}
                          </Text>
                        ))}
                        {reservation.lesson.learningObjectives.length > 3 && (
                          <Text style={styles.moreObjectives}>
                            +{reservation.lesson.learningObjectives.length - 3} more objectives
                          </Text>
                        )}
                      </View>
                    </View>
                  )}

                  {/* View Lesson Button */}
                  <TouchableOpacity
                    onPress={() => {
                      // Navigate to lesson details page
                      if (reservation.lesson) {
                        // This would integrate with navigation
                        Alert.alert('Navigate to lesson details');
                      }
                    }}
                    style={styles.viewLessonButton}
                  >
                    <Icon name="external-link" size={16} color={Colors.status.info} />
                    <Text style={styles.viewLessonText}>View Lesson</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Bottom padding for action buttons */}
            <View style={styles.bottomPadding} />
          </ScrollView>

          {/* Sticky Footer CTAs - Instructor Only */}
          {!hideActions && (
            <View style={styles.footer}>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  onPress={() => onLogLesson?.(reservation)}
                  style={[styles.actionButton, styles.secondaryButton]}
                >
                  <Text style={styles.secondaryButtonText}>Begin Debrief</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                  <Text style={styles.primaryButtonText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Action Sheet */}
      <ActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        title="Reservation Actions"
        options={actionSheetOptions}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        title="Delete Reservation"
        message={`Are you sure you want to delete this reservation?\n\n${reservation.aircraft} - ${reservation.student}\n${reservation.date} at ${reservation.startTime}`}
        confirmText="Delete Reservation"
        type="destructive"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  timeCard: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  timeText: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginLeft: 8,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  contactButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  contactButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
  },
  callButton: {
    backgroundColor: Colors.status.infoLight,
  },
  lessonContent: {
    gap: 16,
  },
  lessonHeader: {
    marginBottom: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
  },
  objectivesContainer: {
    marginTop: 16,
  },
  objectivesTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  objectives: {
    gap: 4,
  },
  objectiveText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  moreObjectives: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginTop: 4,
  },
  viewLessonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.status.infoLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  viewLessonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 120, // Space for footer
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.gray200,
  },
  primaryButton: {
    backgroundColor: Colors.status.info,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray800,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.white,
  },
});

export default ReservationDetailsDrawer;

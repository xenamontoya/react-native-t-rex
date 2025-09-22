import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

interface LessonDetailsScreenProps {
  route?: {
    params?: {
      lesson?: any;
    };
  };
  navigation?: any;
}

export default function LessonDetailsScreen({ route, navigation }: LessonDetailsScreenProps) {
  const lesson = route?.params?.lesson || {
    id: '1',
    title: 'Basic Maneuvers',
    phase: 'Private Pilot License',
    date: 'DEC 15, 2025',
    time: '2:00 - 4:00 PM',
    duration: '2.0 HOURS',
    instructor: 'Sarah Mitchell',
    aircraft: 'N12345 - Cessna 172',
    status: 'Scheduled',
    objectives: [
      'Practice steep turns',
      'Master ground reference maneuvers',
      'Review emergency procedures',
      'Practice radio communications'
    ],
    progress: 75,
    notes: 'Focus on consistency in altitude and speed during maneuvers',
    reservationId: 'RES123'
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action: string) => {
    Alert.alert('Action', `${action} - ${lesson.title}`);
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    handleAction(action);
  };

  const handleViewReservation = () => {
    // Navigate to reservation details
    const reservation = {
      id: lesson.reservationId,
      aircraft: { tail_number: 'N12345', type: 'Cessna 172' },
      date: lesson.date,
      time: lesson.time,
      duration: lesson.duration,
      instructor: lesson.instructor,
      type: 'Dual Instruction',
      status: 'Confirmed'
    };
    navigation?.navigate('ReservationDetails', { reservation });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrowLeft" size={24} color={Colors.primary.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson Details</Text>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Icon name="ellipsisV" size={20} color={Colors.primary.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Lesson Card */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.h1}>{lesson.title}</Text>
              <Text style={styles.phaseText}>{lesson.phase}</Text>
            </View>
            <View style={[styles.statusBadge, lesson.status === 'Scheduled' && styles.scheduledBadge]}>
              <Text style={[styles.statusText, lesson.status === 'Scheduled' && styles.scheduledText]}>
                {lesson.status}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Lesson Progress</Text>
              <Text style={styles.progressValue}>{lesson.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${lesson.progress}%` }]} />
            </View>
          </View>

          {/* Date and Time */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Date & Time</Text>
            </View>
            <Text style={styles.detailValue}>{lesson.date}, {lesson.time}</Text>
          </View>

          {/* Duration */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="clock" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Duration</Text>
            </View>
            <Text style={styles.detailValue}>{lesson.duration}</Text>
          </View>

          {/* Aircraft */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="plane" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Aircraft</Text>
            </View>
            <Text style={styles.detailValue}>{lesson.aircraft}</Text>
          </View>

          {/* Instructor */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="user" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Instructor</Text>
            </View>
            <Text style={styles.detailValue}>{lesson.instructor}</Text>
          </View>

          {/* Notes */}
          {lesson.notes && (
            <View style={styles.detailSection}>
              <View style={styles.detailRow}>
                <Icon name="fileText" size={16} color={Colors.neutral.gray500} style={styles.detailIcon} />
                <Text style={styles.detailLabel}>Notes</Text>
              </View>
              <Text style={styles.detailValue}>{lesson.notes}</Text>
            </View>
          )}
        </View>

        {/* Learning Objectives Card */}
        <View style={styles.secondaryCard}>
          <Text style={styles.h2}>Learning Objectives</Text>
          <View style={styles.objectivesList}>
            {lesson.objectives.map((objective: string, index: number) => (
              <View key={index} style={styles.objectiveItem}>
                <View style={styles.objectiveBullet} />
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reservation Details Card */}
        {lesson.reservationId && (
          <View style={styles.secondaryCard}>
            <View style={styles.reservationHeader}>
              <Text style={styles.h2}>Reservation Details</Text>
              <TouchableOpacity onPress={handleViewReservation} style={styles.viewReservationButton}>
                <Text style={styles.viewReservationText}>View Details</Text>
                <Icon name="arrowRight" size={14} color={Colors.tertiary.denimBlue} />
              </TouchableOpacity>
            </View>
            <View style={styles.reservationInfo}>
              <View style={styles.reservationRow}>
                <Text style={styles.reservationLabel}>Aircraft:</Text>
                <Text style={styles.reservationValue}>{lesson.aircraft}</Text>
              </View>
              <View style={styles.reservationRow}>
                <Text style={styles.reservationLabel}>Date:</Text>
                <Text style={styles.reservationValue}>{lesson.date}</Text>
              </View>
              <View style={styles.reservationRow}>
                <Text style={styles.reservationLabel}>Time:</Text>
                <Text style={styles.reservationValue}>{lesson.time}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Bottom padding for CTAs */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Menu Dropdown */}
      {showMenu && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={styles.menuBackdrop} onPress={() => setShowMenu(false)} />
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Edit Lesson')}>
              <Icon name="edit" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.menuText}>Edit Lesson</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Duplicate')}>
              <Icon name="copy" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.menuText}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Export')}>
              <Icon name="externalLink" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.menuText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Sticky Footer CTAs */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => handleAction('Edit Lesson')}
        >
          <Text style={styles.secondaryButtonText}>Edit Lesson</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => handleAction('Begin Debrief')}
        >
          <Text style={styles.primaryButtonText}>Begin Debrief</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.primary.white,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  h1: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  h2: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  phaseText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  statusBadge: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  scheduledBadge: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
  },
  scheduledText: {
    color: '#C44510',
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  progressValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary.electricBlue,
    borderRadius: 4,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    marginLeft: 24,
  },
  secondaryCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  objectiveBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary.electricBlue,
    marginTop: 7,
    marginRight: 12,
  },
  objectiveText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    flex: 1,
    lineHeight: 20,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewReservationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewReservationText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.tertiary.denimBlue,
  },
  reservationInfo: {
    gap: 8,
  },
  reservationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reservationLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  reservationValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  bottomPadding: {
    height: 100,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContent: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginLeft: 12,
  },
  stickyFooter: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary.black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.primary.black,
    borderWidth: 2,
    borderColor: Colors.secondary.electricBlue,
    borderStyle: 'solid',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
});


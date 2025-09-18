import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Project T-Rex Brand Colors
const Colors = {
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F', 
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },
  neutral: {
    gray50: '#f9fafb',
    gray200: '#e5e7eb',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

export default function TrainingScreen() {
  const handleLessonPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Training Progress</Text>
          <Text style={styles.courseText}>Private Pilot License (PPL)</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressPercentage}>75%</Text>
          </View>
          
          <Text style={styles.progressDescription}>
            You're in the Pre-Solo stage. Great progress!
          </Text>
        </View>

        {/* Scheduled Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Lessons</Text>
          
          <View style={styles.lessonCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.lessonTitle}>Basic Maneuvers</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Scheduled</Text>
              </View>
            </View>
            
            <Text style={styles.lessonDescription}>
              Straight and level, climbs, descents, turns
            </Text>
            
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>📅 AUG 15</Text>
              <Text style={styles.metaText}>⏰ 1.8 HOURS</Text>
              <Text style={styles.metaText}>👨‍🏫 Sarah Mitchell</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => handleLessonPress('View Lesson Details')}
            >
              <Text style={styles.primaryButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pending Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Lessons</Text>
          
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Traffic Pattern Work</Text>
            <Text style={styles.lessonDescription}>
              Airport traffic pattern and landings
            </Text>
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>⏰ 2.0 HOURS</Text>
            </View>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => handleLessonPress('Schedule Lesson')}
            >
              <Text style={styles.secondaryButtonText}>Schedule</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Emergency Procedures</Text>
            <Text style={styles.lessonDescription}>
              Emergency handling and safety procedures
            </Text>
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>⏰ 1.5 HOURS</Text>
            </View>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => handleLessonPress('Schedule Lesson')}
            >
              <Text style={styles.secondaryButtonText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Completed Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Completed</Text>
          
          <View style={styles.lessonCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.lessonTitle}>First Flight - Familiarization</Text>
              <View style={[styles.statusBadge, styles.completeBadge]}>
                <Text style={[styles.statusText, styles.completeText]}>Complete</Text>
              </View>
            </View>
            
            <Text style={styles.lessonDescription}>
              Aircraft familiarization and basic controls
            </Text>
            
            <View style={styles.lessonMeta}>
              <Text style={styles.metaText}>📅 OCT 01</Text>
              <Text style={styles.metaText}>⏰ 1.5 HOURS</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.tertiaryButton}
              onPress={() => handleLessonPress('View Grade')}
            >
              <Text style={styles.tertiaryButtonText}>View Grade & Notes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
    backgroundColor: Colors.primary.white,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  courseText: {
    fontSize: 14,
    color: Colors.neutral.gray500,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: 8,
    backgroundColor: Colors.secondary.orange1,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary.orange2,
  },
  progressDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 12,
  },
  lessonCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
    flex: 1,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#C44510',
  },
  completeBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
  },
  completeText: {
    color: '#004D47',
  },
  lessonDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    marginRight: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: Colors.tertiary.denimBlue,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.neutral.gray500,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral.gray600,
  },
  tertiaryButton: {
    backgroundColor: Colors.neutral.gray50,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.tertiary.denimBlue,
  },
  bottomPadding: {
    height: 100,
  },
});

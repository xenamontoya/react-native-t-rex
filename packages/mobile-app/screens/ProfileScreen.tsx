import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Icon } from '../components/Icons';
// Using direct require() instead of broken asset imports

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

export default function ProfileScreen() {
  const handleActionPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header with Background */}
        <ImageBackground 
          source={require('../assets/images/thewayofcolor-JyOeDt0kRYc-unsplash.png')}
          style={styles.profileHeader}
          imageStyle={styles.profileHeaderImage}
        >
          <View style={styles.profileOverlay}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>AJ</Text>
            </View>
            
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileRole}>Student Pilot</Text>
            
            {/* Profile info - removed test SVG */}
            <View style={styles.locationContainer}>
              <Icon name="mapMarkerAlt" size={14} color={Colors.neutral.gray500} style={styles.locationIcon} />
              <Text style={styles.profileLocation}>Phoenix, AZ</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleActionPress('Edit Profile')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Training Progress Summary */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Training Progress</Text>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Current Course</Text>
            <Text style={styles.progressValue}>Private Pilot License (PPL)</Text>
          </View>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Stage</Text>
            <Text style={styles.progressValue}>Pre-Solo</Text>
          </View>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={[styles.progressValue, styles.progressHighlight]}>75% Complete</Text>
          </View>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Total Flight Hours</Text>
            <Text style={styles.progressValue}>24.5 hrs</Text>
          </View>
        </View>

        {/* Pilot Information */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Pilot Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Student Pilot Certificate</Text>
            <Text style={styles.infoValue}>SP-1234567</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Medical Certificate</Text>
            <Text style={styles.infoValue}>Class 3 - Valid until Dec 2025</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Instructor</Text>
            <Text style={styles.infoValue}>Sarah Mitchell (CFI)</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>School</Text>
            <Text style={styles.infoValue}>Phoenix Flight Academy</Text>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.cardTitle}>Recent Achievements</Text>
          
          <View style={styles.achievementItem}>
            <View style={styles.achievementIconContainer}>
              <Icon name="award" size={24} color={Colors.secondary.orange2} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>First Solo Flight</Text>
              <Text style={styles.achievementDate}>Completed Dec 10, 2024</Text>
            </View>
          </View>
          
          <View style={styles.achievementItem}>
            <View style={styles.achievementIconContainer}>
              <Icon name="checkCircle" size={24} color={Colors.secondary.electricBlue} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Ground School Complete</Text>
              <Text style={styles.achievementDate}>Completed Nov 15, 2024</Text>
            </View>
          </View>
          
          <View style={styles.achievementItem}>
            <View style={styles.achievementIconContainer}>
              <Icon name="book" size={24} color={Colors.tertiary.denimBlue} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>10+ Hours Logged</Text>
              <Text style={styles.achievementDate}>Achieved Oct 20, 2024</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('View Logbook')}
          >
            <View style={styles.actionIconContainer}>
              <Icon name="book" size={20} color={Colors.neutral.gray600} />
            </View>
            <Text style={styles.actionText}>View My Logbook</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Certificates & Documents')}
          >
            <View style={styles.actionIconContainer}>
              <Icon name="clipboardList" size={20} color={Colors.neutral.gray600} />
            </View>
            <Text style={styles.actionText}>Certificates & Documents</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Account Settings')}
          >
            <View style={styles.actionIconContainer}>
              <Icon name="cog" size={20} color={Colors.neutral.gray600} />
            </View>
            <Text style={styles.actionText}>Account Settings</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Privacy & Security')}
          >
            <View style={styles.actionIconContainer}>
              <Icon name="lock" size={20} color={Colors.neutral.gray600} />
            </View>
            <Text style={styles.actionText}>Privacy & Security</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Degular-Bold',
    color: Colors.primary.black,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Profile Header
  profileHeader: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    marginRight: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: Colors.neutral.gray500,
  },
  editButton: {
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
  },

  // Cards
  progressCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionsCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 16,
  },

  // Progress Rows
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  progressHighlight: {
    color: Colors.secondary.orange2,
    fontWeight: '600',
  },

  // Info Rows
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral.gray500,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.primary.black,
  },

  // Achievements
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: Colors.neutral.gray500,
  },

  // Action Buttons
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  actionIconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  actionArrow: {
    fontSize: 16,
    color: Colors.neutral.gray500,
  },

  bottomPadding: {
    height: 100,
  },
  
  // SVG test styles
  svgTestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 8,
  },
  svgTestLabel: {
    fontSize: 12,
    color: Colors.primary.white,
    opacity: 0.8,
  },
});

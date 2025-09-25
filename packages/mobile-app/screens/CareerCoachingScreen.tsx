import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

export default function CareerCoachingScreen({ navigation }: any) {
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null);

  const handleBackPress = () => {
    navigation?.goBack();
  };

  // Mock coach data
  const coaches = [
    {
      id: 1,
      name: "Captain Sarah Mitchell",
      title: "Senior Career Advisor",
      experience: "25+ years in aviation",
      specialties: ["Airline Transitions", "Leadership Development", "Career Planning"],
      rating: 4.9,
      sessions: 500,
      bio: "Former airline captain with extensive experience helping pilots navigate career transitions."
    },
    {
      id: 2,
      name: "Captain Mike Thompson", 
      title: "Aviation Career Specialist",
      experience: "20+ years in aviation",
      specialties: ["Flight Instruction", "Corporate Aviation", "Interview Prep"],
      rating: 4.8,
      sessions: 350,
      bio: "Corporate aviation veteran specializing in pilot career development and interview preparation."
    }
  ];

  // Mock session types
  const sessionTypes = [
    {
      id: 1,
      name: "Career Assessment",
      duration: "60 minutes",
      price: "$150",
      description: "Comprehensive evaluation of your aviation career goals and current position",
      features: ["Skills assessment", "Goal setting", "Personalized roadmap", "Industry insights"]
    },
    {
      id: 2,
      name: "Interview Preparation",
      duration: "45 minutes", 
      price: "$120",
      description: "Mock interviews and techniques for airline and corporate aviation positions",
      features: ["Mock interviews", "Question preparation", "Presentation skills", "Confidence building"]
    },
    {
      id: 3,
      name: "Career Strategy Session",
      duration: "30 minutes",
      price: "$90", 
      description: "Strategic planning for your next career move",
      features: ["Goal review", "Action planning", "Timeline development", "Resource identification"]
    }
  ];

  const handleBookSession = (sessionType: any, coach: any) => {
    Alert.alert(
      'Book Session',
      `Book ${sessionType.name} with ${coach.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Session booking feature coming soon!') }
      ]
    );
  };

  const renderCoach = (coach: any) => (
    <View key={coach.id} style={styles.coachCard}>
      <View style={styles.coachHeader}>
        <View style={styles.coachAvatar}>
          <Icon name="userTie" size={24} color={Colors.accent.electricBlue} />
        </View>
        <View style={styles.coachInfo}>
          <Text style={styles.coachName}>{coach.name}</Text>
          <Text style={styles.coachTitle}>{coach.title}</Text>
          <Text style={styles.coachExperience}>{coach.experience}</Text>
        </View>
        <View style={styles.coachStats}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color={Colors.accent.orange} />
            <Text style={styles.rating}>{coach.rating}</Text>
          </View>
          <Text style={styles.sessions}>{coach.sessions} sessions</Text>
        </View>
      </View>
      
      <Text style={styles.coachBio}>{coach.bio}</Text>
      
      <View style={styles.specialtiesContainer}>
        {coach.specialties.map((specialty: string, index: number) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.selectCoachButton,
          selectedCoach === coach.id && styles.selectedCoachButton
        ]}
        onPress={() => setSelectedCoach(coach.id)}
      >
        <Text style={[
          styles.selectCoachText,
          selectedCoach === coach.id && styles.selectedCoachText
        ]}>
          {selectedCoach === coach.id ? 'Selected' : 'Select Coach'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSessionType = (sessionType: any) => (
    <View key={sessionType.id} style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionName}>{sessionType.name}</Text>
        <View style={styles.sessionMeta}>
          <Text style={styles.sessionDuration}>{sessionType.duration}</Text>
          <Text style={styles.sessionPrice}>{sessionType.price}</Text>
        </View>
      </View>
      
      <Text style={styles.sessionDescription}>{sessionType.description}</Text>
      
      <View style={styles.featuresContainer}>
        {sessionType.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check" size={16} color={Colors.status.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.bookButton,
          !selectedCoach && styles.disabledButton
        ]}
        onPress={() => {
          if (selectedCoach) {
            const coach = coaches.find(c => c.id === selectedCoach);
            if (coach) {
              handleBookSession(sessionType, coach);
            }
          } else {
            Alert.alert('Select Coach', 'Please select a coach first');
          }
        }}
        disabled={!selectedCoach}
      >
        <Text style={[
          styles.bookButtonText,
          !selectedCoach && styles.disabledButtonText
        ]}>
          Book Session
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Career Coaching</Text>
          <Text style={styles.headerSubtitle}>One-on-one personalized guidance</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Coaches Section */}
        <Text style={styles.sectionTitle}>SELECT YOUR COACH</Text>
        {coaches.map(renderCoach)}

        {/* Session Types Section */}
        <Text style={styles.sectionTitle}>COACHING SESSIONS</Text>
        {sessionTypes.map(renderSessionType)}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 128,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  coachCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  coachHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    backgroundColor: Colors.accent.electricBlue + '20',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  coachTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  coachExperience: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  coachStats: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  sessions: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  coachBio: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 12,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: Colors.accent.electricBlue + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.accent.electricBlue,
  },
  selectCoachButton: {
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCoachButton: {
    backgroundColor: Colors.accent.electricBlue,
  },
  selectCoachText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  selectedCoachText: {
    color: Colors.primary.white,
  },
  sessionCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  sessionMeta: {
    alignItems: 'flex-end',
  },
  sessionDuration: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  sessionPrice: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.accent.electricBlue,
  },
  sessionDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 12,
  },
  featuresContainer: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  bookButton: {
    backgroundColor: Colors.primary.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.neutral.gray300,
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  disabledButtonText: {
    color: Colors.neutral.gray500,
  },
});






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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { PilotbaseIcon } from '../components/svgs';
import { Colors, Typography } from '../../components/src';

// Mock job data - in real app this would come from API based on ID
const mockJobData = {
  id: 1,
  title: "First Officer",
  company: "AeroHarbor",
  type: "Cadet",
  category: "Regional Airline",
  pathway: "Pathway Program",
  location: "Pennsylvania, North Carolina",
  aircraft: "E135, E140, E145",
  airports: "KCLT, KPHL, KMDT",
  daysAway: 55,
  targetDate: "December 2025",
  logo: "🛩️",
  description: `Looking to start your pilot career? Join Piedmont's Cadet Program, receive a $15,000 bonus and board the fastest route to American Airlines. Build hours how you want and where you want.

From 500 hours to American Airlines Piedmont Cadets receive guidance and financial assistance while working from cadet to first officer to American Airlines. No school affiliation is necessary to become a cadet, and cadets do not have to be flight instructors. Build hours how you want and where you want.`,
  about: `As a wholly-owned subsidiary of the American Airlines Group, Piedmont operates nearly 400 daily departures to 55+ cities throughout the eastern United States, from Charlotte, Philadelphia, and Chicago. Headquartered in Salisbury, Maryland, Piedmont employs nearly 10,000 aviation professionals.`,
  requirements: [
    {
      category: "Medical Class",
      items: [
        { name: "1st", met: true }
      ]
    },
    {
      category: "Total Time", 
      items: [
        { name: "500 hours", met: false }
      ]
    },
    {
      category: "Class Times",
      items: [
        { name: "Airplane Single-Engine Land Time", met: false },
        { name: "Airplane Multi-Engine Land Time", met: false },
        { name: "Airplane Single-Engine Sea Time", met: false },
        { name: "Airplane Multi-Engine Sea Time", met: false }
      ]
    },
    {
      category: "Certificate & Class Ratings",
      items: [
        { name: "Commercial Pilot Certificate", met: false },
        { name: "Instrument", met: false },
        { name: "Multi-Engine", met: false },
        { name: "Eligible for R-ATP at 1250 hours", met: false }
      ]
    },
    {
      category: "Instructor Certificate & Ratings",
      items: [
        { name: "Certified Flight Instructor", met: true },
        { name: "Airplane Multi-Engine", met: true },
        { name: "Airplane Multi-Engine Land", met: true }
      ]
    },
    {
      category: "Travel Documents",
      items: [
        { name: "Unrestricted passport", met: true },
        { name: "US driver's license", met: true }
      ]
    }
  ]
};

interface RequirementSectionProps {
  requirement: {
    category: string;
    items: Array<{ name: string; met: boolean }>;
  };
}

const RequirementSection: React.FC<RequirementSectionProps> = ({ requirement }) => (
  <View style={styles.requirementSection}>
    <Text style={styles.requirementCategory}>{requirement.category}</Text>
    <View style={styles.requirementItems}>
      {requirement.items.map((item, index) => (
        <View key={index} style={styles.requirementItem}>
          <View style={[
            styles.requirementIcon,
            { 
              backgroundColor: item.met ? Colors.status.success + '20' : Colors.status.error + '20',
              borderColor: item.met ? Colors.status.success : Colors.status.error
            }
          ]}>
            <Icon 
              name={item.met ? "check" : "times"} 
              size={16} 
              color={item.met ? Colors.status.success : Colors.status.error} 
            />
          </View>
          <Text style={styles.requirementText}>{item.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default function JobDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isFollowing, setIsFollowing] = useState(false);
  const [job, setJob] = useState(mockJobData);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  useEffect(() => {
    // Parse job data from route parameters
    try {
      const params = route.params as any;
      const { id, jobData } = params || {};

      if (jobData) {
        const parsedJob = JSON.parse(decodeURIComponent(jobData));
        setJob(parsedJob);
      } else if (id) {
        // Use mock data for now (in real app, fetch by ID)
        setJob(mockJobData);
      }
    } catch (error) {
      console.error('Error parsing job data:', error);
      // Use mock data as fallback
      setJob(mockJobData);
    }
  }, [route.params]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(
      isFollowing ? 'Unfollowed' : 'Following',
      `You are ${isFollowing ? 'no longer following' : 'now following'} ${job.company}`
    );
  };

  const handleApply = () => {
    Alert.alert(
      'Apply to Position',
      `Ready to apply for ${job.title} at ${job.company}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            console.log('Apply to job:', job.id);
            Alert.alert('Application Submitted', 'Your application has been submitted successfully!');
          }
        }
      ]
    );
  };

  const handleInterviewPrep = () => {
    navigation.navigate('InterviewPrep' as never);
  };

  const handleCareerCoaching = () => {
    navigation.navigate('CareerCoaching' as never);
  };

  const handleResumeServices = () => {
    navigation.navigate('ResumeServices' as never);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.companyLogo}>
              <Text style={styles.logoText}>{job.logo}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Wingman Progress Alert */}
        <View style={styles.section}>
          <View style={styles.aiInsightCard}>
            <View style={styles.aiInsightContent}>
              <View style={styles.aiInsightIcon}>
                <PilotbaseIcon width={20} height={20} />
              </View>
              <View style={styles.aiInsightText}>
                <Text style={styles.aiInsightTitle}>Wingman AI Career Insights</Text>
                <Text style={styles.aiInsightDescription}>
                  You're about <Text style={styles.boldText}>{job.daysAway} days away!</Text> Meet Program Requirements around {job.targetDate}.
                </Text>
              </View>
              <Icon name="arrowRight" size={16} color={Colors.brand.cyan} />
            </View>
          </View>
        </View>

        {/* Position Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position Details</Text>
          <View style={styles.card}>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>{job.pathway}</Text> - {job.category}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Position:</Text> {job.type}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Locations:</Text> {job.location}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Base Airports:</Text> {job.airports}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Aircraft Types:</Text> {job.aircraft}
              </Text>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.card}>
            {job.requirements.map((requirement, index) => (
              <RequirementSection 
                key={index} 
                requirement={requirement}
              />
            ))}
          </View>
        </View>

        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <View style={styles.card}>
            {job.description.split('\n\n').map((paragraph, index) => (
              <Text 
                key={index}
                style={styles.descriptionText}
              >
                {paragraph}
              </Text>
            ))}
          </View>
        </View>

        {/* About Company */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {job.company}</Text>
          <View style={styles.card}>
            <Text style={styles.descriptionText}>{job.about}</Text>
          </View>
        </View>

        {/* Career Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boost Your Application</Text>
          
          <View style={styles.careerSupportList}>
            {/* Interview Prep */}
            <TouchableOpacity 
              style={styles.supportCard}
              onPress={handleInterviewPrep}
            >
              <View style={styles.supportContent}>
                <View style={styles.supportIcon}>
                  <Icon name="clipboard" size={24} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>Interview Preparation</Text>
                  <Text style={styles.supportDescription}>
                    Practice questions and mock interviews specifically for {job.company} and airline positions
                  </Text>
                </View>
                <Icon name="arrowRight" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>

            {/* Career Coaching */}
            <TouchableOpacity 
              style={styles.supportCard}
              onPress={handleCareerCoaching}
            >
              <View style={styles.supportContent}>
                <View style={styles.supportIcon}>
                  <Icon name="graduation" size={24} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>Career Coaching</Text>
                  <Text style={styles.supportDescription}>
                    Get personalized guidance from experienced aviation professionals to enhance your career path
                  </Text>
                </View>
                <Icon name="arrowRight" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>

            {/* Resume Services */}
            <TouchableOpacity 
              style={styles.supportCard}
              onPress={handleResumeServices}
            >
              <View style={styles.supportContent}>
                <View style={styles.supportIcon}>
                  <Icon name="fileText" size={24} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>Generate Cover Letter</Text>
                  <Text style={styles.supportDescription}>
                    Create a personalized cover letter tailored to this {job.company} position using your Pilotbase profile
                  </Text>
                </View>
                <Icon name="arrowRight" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing for fixed buttons */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Sticky Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={handleFollow}
        >
          <Icon 
            name="heart" 
            size={16} 
            color={isFollowing ? Colors.brand.cyan : Colors.neutral.gray600} 
          />
          <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyLogo: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoText: {
    fontSize: 18,
  },
  headerText: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  aiInsightCard: {
    backgroundColor: '#212121',
    borderRadius: 12,
    padding: 16,
  },
  aiInsightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiInsightIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#212121',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.brand.cyan,
    marginRight: 12,
  },
  aiInsightText: {
    flex: 1,
    marginRight: 12,
  },
  aiInsightTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
    marginBottom: 4,
  },
  aiInsightDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  boldText: {
    fontFamily: Typography.fontFamily.bold,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    lineHeight: 20,
  },
  requirementSection: {
    marginBottom: 24,
  },
  requirementCategory: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  requirementItems: {
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 12,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    lineHeight: 20,
    marginBottom: 16,
  },
  careerSupportList: {
    gap: 16,
  },
  supportCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  supportText: {
    flex: 1,
    marginRight: 12,
  },
  supportTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    flexDirection: 'row',
    gap: 12,
  },
  followButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    backgroundColor: 'transparent',
    gap: 8,
  },
  followingButton: {
    backgroundColor: '#212121',
    borderColor: Colors.brand.cyan,
  },
  followButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  followingButtonText: {
    color: Colors.primary.white,
  },
  applyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#212121',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.brand.cyan,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
});

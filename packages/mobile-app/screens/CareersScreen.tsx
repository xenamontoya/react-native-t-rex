import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';
import { AdaptiveAIModal } from '../components';

// Mock job data
const jobMatches = [
  {
    id: 1,
    title: "Cadet Program",
    company: "SkyVista Airways",
    type: "Cadet",
    category: "Regional Airline",
    location: "AZ, CA, NM, NV",
    status: "Qualified",
    statusColor: "qualified",
    isNew: true,
    logo: "🛩️",
  },
  {
    id: 2,
    title: "Flight Instructor (CFII)",
    company: "SkyVista Airways", 
    type: "Instructor",
    category: "Flight School",
    location: "AZ, CA, NM, NV",
    status: "Build Hours",
    statusColor: "buildHours",
    progress: 52,
    logo: "✈️",
  },
  {
    id: 3,
    title: "Flight Instructor (CFI)",
    company: "StarGlide Air",
    type: "Instructor", 
    category: "Flight School",
    location: "AZ, CA, NM, NV",
    status: "Build Hours",
    statusColor: "buildHours", 
    progress: 52,
    logo: "✈️",
  },
  {
    id: 4,
    title: "Cadet Program",
    company: "SkyVista Airways",
    type: "Cadet",
    category: "Regional Airline", 
    location: "AZ, CA, NM, NV",
    status: "Qualified",
    statusColor: "qualified",
    logo: "🛩️",
  },
  {
    id: 5,
    title: "Cadet Program",
    company: "SkyVista Airways",
    type: "Cadet",
    category: "Regional Airline",
    location: "AZ, CA, NM, NV", 
    status: "Build Hours",
    statusColor: "buildHours",
    progress: 86,
    logo: "🛫",
  }
];

const otherJobs = [
  {
    id: 6,
    title: "Flight Instructor (CFII)",
    company: "SkyVista Airways",
    type: "Instructor",
    category: "Flight School", 
    location: "AZ, CA, NM, NV",
    status: "Build Hours",
    statusColor: "buildHours",
    progress: 52,
    logo: "✈️",
  },
  {
    id: 7,
    title: "Flight Instructor (CFI)",
    company: "StarGlide Air",
    type: "Instructor",
    category: "Flight School",
    location: "AZ, CA, NM, NV", 
    status: "Build Hours",
    statusColor: "buildHours",
    progress: 52,
    logo: "✈️",
  }
];

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    type: string;
    category: string;
    location: string;
    status: string;
    statusColor: string;
    isNew?: boolean;
    logo: string;
    progress?: number;
  };
  showProgress?: boolean;
  onPress?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, showProgress = true, onPress }) => {
  const getStatusStyle = (statusColor: string) => {
    switch (statusColor) {
      case 'qualified':
        return { backgroundColor: '#dcfce7', color: '#166534' }; // Green
      case 'buildHours':
        return { backgroundColor: '#fed7aa', color: '#c2410c' }; // Orange
      default:
        return { backgroundColor: Colors.neutral.gray100, color: Colors.neutral.gray700 };
    }
  };

  return (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.jobCardContent}>
        <View style={styles.companyLogo}>
          <Text style={styles.logoText}>{job.logo}</Text>
        </View>
        <View style={styles.jobInfo}>
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, getStatusStyle(job.statusColor)]}>
              <Text style={[styles.statusText, { color: getStatusStyle(job.statusColor).color }]}>
                {job.status}
              </Text>
            </View>
            {job.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
          </View>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
          <View style={styles.jobMeta}>
            <Text style={styles.jobMetaText}>{job.type}</Text>
            <Text style={styles.jobMetaDot}> • </Text>
            <Text style={styles.jobMetaText}>{job.category}</Text>
          </View>
          <View style={styles.locationRow}>
            <Icon name="mapMarker" size={12} color={Colors.neutral.gray600} />
            <Text style={styles.locationText}>{job.location}</Text>
          </View>
          {showProgress && job.progress && (
            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>{job.progress}% HOURS MET</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${job.progress}%` }]} />
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function CareersScreen() {
  const navigation = useNavigation();
  const [showAIInsights, setShowAIInsights] = useState(false);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleJobClick = (jobId: number) => {
    // Navigate to job details
    const jobData = jobMatches.find(job => job.id === jobId) || otherJobs.find(job => job.id === jobId);
    
    if (jobData) {
      const jobDataParam = encodeURIComponent(JSON.stringify(jobData));
      navigation.navigate('JobDetails' as never, {
        id: jobId,
        jobData: jobDataParam
      } as never);
    } else {
      // Fallback to navigate with just ID
      navigation.navigate('JobDetails' as never, { id: jobId } as never);
    }
  };

  const handleSearch = () => {
    Alert.alert('Search', 'Job search functionality coming soon!');
  };

  const handleBrowseCategory = (category: string) => {
    Alert.alert('Browse Jobs', `${category} functionality coming soon!`);
  };

  const handleAIInsights = () => {
    setShowAIInsights(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Careers</Text>
            <Text style={styles.headerSubtitle}>Explore career opportunities</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Icon name="search" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Career Plan Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Career Plan Matches</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>7 New</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>Jobs that match your goals and preferences</Text>
          
          <View style={styles.jobList}>
            {jobMatches.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onPress={() => handleJobClick(job.id)} 
              />
            ))}
          </View>
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View 27 More</Text>
            <Icon name="chevron-right" size={12} color={Colors.brand.blueAzure} />
          </TouchableOpacity>
        </View>

        {/* Other Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Other Jobs In Your Locations</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>7 New</Text>
            </View>
          </View>
          
          <View style={styles.jobList}>
            {otherJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onPress={() => handleJobClick(job.id)} 
              />
            ))}
          </View>
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View 34 More</Text>
            <Icon name="chevron-right" size={12} color={Colors.brand.blueAzure} />
          </TouchableOpacity>
        </View>

        {/* Browse Jobs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Jobs</Text>
          
          <View style={styles.browseCategories}>
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleBrowseCategory('Following')}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryIcon}>
                  <Icon name="briefcase" size={16} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.categoryText}>
                  <Text style={styles.categoryTitle}>Following</Text>
                  <Text style={styles.categoryDescription}>10 jobs you're tracking</Text>
                </View>
                <Icon name="chevron-right" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleBrowseCategory('Applied')}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryIcon}>
                  <Icon name="plane" size={16} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.categoryText}>
                  <Text style={styles.categoryTitle}>Applied</Text>
                  <Text style={styles.categoryDescription}>10 applications submitted</Text>
                </View>
                <Icon name="chevron-right" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleBrowseCategory('Explore All')}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryIcon}>
                  <Icon name="briefcase" size={16} color={Colors.neutral.gray600} />
                </View>
                <View style={styles.categoryText}>
                  <Text style={styles.categoryTitle}>Explore All</Text>
                  <Text style={styles.categoryDescription}>Browse all available positions</Text>
                </View>
                <Icon name="chevron-right" size={16} color={Colors.neutral.gray400} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating AI Wingman Button */}
      <TouchableOpacity
        style={styles.floatingAIButton}
        onPress={handleAIInsights}
      >
        <Icon name="robot" size={24} color={Colors.brand.cyan} />
      </TouchableOpacity>

      {/* AI Insights Modal */}
      <AdaptiveAIModal
        isOpen={showAIInsights}
        onClose={() => setShowAIInsights(false)}
        lessonTitle="Career Guidance"
        mode="career"
        tabletLayout="fullScreen"
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.primary.white,
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
    color: '#212121',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: '#212121',
    marginRight: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginBottom: 16,
  },
  newBadge: {
    backgroundColor: '#212121',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  jobList: {
    gap: 16,
  },
  jobCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
  },
  jobCardContent: {
    flexDirection: 'row',
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
  jobInfo: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#212121',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: '#5177BB',
    marginBottom: 4,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobMetaText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  jobMetaDot: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginLeft: 4,
  },
  progressSection: {
    marginTop: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.mono,
    color: '#D4511E',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F6A345',
    borderRadius: 4,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  viewMoreText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.brand.blueAzure,
  },
  browseCategories: {
    gap: 8,
  },
  categoryCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 12,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  bottomSpacing: {
    height: 100,
  },
  floatingAIButton: {
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
  },
});
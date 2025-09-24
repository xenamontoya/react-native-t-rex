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
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

// Career paths data
const careerPaths = [
  {
    id: 'airline',
    title: 'Airline Pilot',
    icon: 'plane',
    description: 'Fly commercial aircraft for major airlines',
    requirements: ['ATP Certificate', '1,500+ Flight Hours', 'First Class Medical'],
    salary: '$80,000 - $300,000+',
    growth: '6% projected growth',
    color: 'blue'
  },
  {
    id: 'corporate',
    title: 'Corporate Pilot',
    icon: 'briefcase',
    description: 'Fly private jets for corporations',
    requirements: ['Commercial Certificate', '500+ Flight Hours', 'Multi-Engine Rating'],
    salary: '$60,000 - $200,000+',
    growth: '4% projected growth',
    color: 'green'
  },
  {
    id: 'cargo',
    title: 'Cargo Pilot',
    icon: 'rocket',
    description: 'Transport freight and packages',
    requirements: ['Commercial Certificate', '1,200+ Flight Hours', 'Multi-Engine Rating'],
    salary: '$70,000 - $180,000+',
    growth: '5% projected growth',
    color: 'purple'
  },
  {
    id: 'military',
    title: 'Military Pilot',
    icon: 'shield',
    description: 'Serve as a pilot in the armed forces',
    requirements: ['Bachelor\'s Degree', 'Physical Fitness', 'Security Clearance'],
    salary: '$50,000 - $120,000+',
    growth: '3% projected growth',
    color: 'red'
  },
  {
    id: 'instructor',
    title: 'Flight Instructor',
    icon: 'graduation',
    description: 'Train the next generation of pilots',
    requirements: ['CFI Certificate', 'Commercial Certificate', 'Teaching Experience'],
    salary: '$40,000 - $80,000+',
    growth: '7% projected growth',
    color: 'yellow'
  },
  {
    id: 'charter',
    title: 'Charter Pilot',
    icon: 'globe',
    description: 'Fly on-demand flights for clients',
    requirements: ['Commercial Certificate', '800+ Flight Hours', 'Multi-Engine Rating'],
    salary: '$55,000 - $150,000+',
    growth: '4% projected growth',
    color: 'indigo'
  }
];

// Training resources data
const trainingResources = [
  {
    title: 'Private Pilot Study Guide',
    type: 'PDF Guide',
    icon: 'file-text',
    description: 'Complete study materials for PPL written exam',
    downloads: '2,847',
    rating: 4.8
  },
  {
    title: 'Instrument Rating Prep',
    type: 'Video Course',
    icon: 'video',
    description: '40+ hours of IFR training videos',
    downloads: '1,923',
    rating: 4.9
  },
  {
    title: 'Commercial Pilot Checklist',
    type: 'Checklist',
    icon: 'checkCircle',
    description: 'Step-by-step requirements checklist',
    downloads: '3,156',
    rating: 4.7
  },
  {
    title: 'FAA Regulations Guide',
    type: 'Reference',
    icon: 'bookOpen',
    description: 'Updated FAR/AIM reference manual',
    downloads: '4,231',
    rating: 4.6
  }
];

// Success stories data
const successStories = [
  {
    name: 'Sarah Chen',
    role: 'First Officer, Delta Air Lines',
    story: 'Started with zero flight experience. Completed training in 18 months and now flies Boeing 737s.',
    image: '👩‍✈️',
    timeline: '2 years'
  },
  {
    name: 'Marcus Johnson',
    role: 'Corporate Pilot, Fortune 500',
    story: 'Transitioned from military to corporate aviation. Now flies Gulfstream G650s worldwide.',
    image: '👨‍✈️',
    timeline: '5 years'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Captain, Southwest Airlines',
    story: 'Worked as CFI to build hours, then joined regional airline. Promoted to captain in 3 years.',
    image: '👩‍✈️',
    timeline: '6 years'
  }
];

// Quiz questions data
const quizQuestions = [
  {
    id: 'motivation',
    question: 'What motivates you most about flying?',
    options: [
      { value: 'travel', label: 'Traveling to new places' },
      { value: 'challenge', label: 'Technical challenges and precision' },
      { value: 'service', label: 'Serving passengers and customers' },
      { value: 'adventure', label: 'Adventure and excitement' }
    ]
  },
  {
    id: 'schedule',
    question: 'What type of schedule appeals to you?',
    options: [
      { value: 'regular', label: 'Regular 9-5 schedule' },
      { value: 'rotating', label: 'Rotating shifts and days off' },
      { value: 'flexible', label: 'Flexible, on-call work' },
      { value: 'seasonal', label: 'Seasonal or contract work' }
    ]
  },
  {
    id: 'environment',
    question: 'Where would you prefer to work?',
    options: [
      { value: 'airline', label: 'Major airline hub' },
      { value: 'corporate', label: 'Corporate headquarters' },
      { value: 'regional', label: 'Regional airport' },
      { value: 'military', label: 'Military base' }
    ]
  }
];

// Tab definitions
const tabs = [
  { id: 'careers', label: 'Career Paths', icon: 'briefcase' },
  { id: 'resources', label: 'Resources', icon: 'bookOpen' },
  { id: 'stories', label: 'Success Stories', icon: 'star' },
  { id: 'quiz', label: 'Career Quiz', icon: 'helpCircle' }
];

// Career Card Component
const CareerCard: React.FC<{ career: any; onLearnMore: () => void }> = ({ career, onLearnMore }) => {
  const getColorStyle = (color: string) => {
    const colorMap = {
      blue: { backgroundColor: '#eff6ff', borderColor: '#dbeafe' },
      green: { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' },
      purple: { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' },
      red: { backgroundColor: '#fef2f2', borderColor: '#fecaca' },
      yellow: { backgroundColor: '#fefce8', borderColor: '#fef3c7' },
      indigo: { backgroundColor: '#eef2ff', borderColor: '#e0e7ff' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <View style={styles.careerCard}>
      <View style={styles.careerHeader}>
        <View style={[styles.careerIcon, getColorStyle(career.color)]}>
          <Icon name={career.icon} size={24} color={Colors.neutral.gray700} />
        </View>
        <View style={styles.careerInfo}>
          <Text style={styles.careerTitle}>{career.title}</Text>
          <Text style={styles.careerDescription}>{career.description}</Text>
        </View>
      </View>

      <View style={styles.careerDetails}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        {career.requirements.map((req: string, index: number) => (
          <View key={index} style={styles.requirementItem}>
            <Icon name="checkCircle" size={12} color="#10b981" />
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>

      <View style={styles.careerFooter}>
        <View>
          <Text style={styles.salary}>{career.salary}</Text>
          <Text style={styles.growth}>{career.growth}</Text>
        </View>
        <TouchableOpacity onPress={onLearnMore} style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
          <Icon name="arrowRight" size={12} color={Colors.status.info} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Resource Card Component
const ResourceCard: React.FC<{ resource: any; onDownload: () => void }> = ({ resource, onDownload }) => (
  <View style={styles.resourceCard}>
    <View style={styles.resourceHeader}>
      <View style={styles.resourceIcon}>
        <Icon name={resource.icon} size={20} color={Colors.status.info} />
      </View>
      <View style={styles.resourceInfo}>
        <View style={styles.resourceTitleRow}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <View style={styles.resourceTypeBadge}>
            <Text style={styles.resourceTypeText}>{resource.type}</Text>
          </View>
        </View>
        <Text style={styles.resourceDescription}>{resource.description}</Text>
      </View>
    </View>

    <View style={styles.resourceFooter}>
      <View style={styles.resourceStats}>
        <View style={styles.statItem}>
          <Icon name="star" size={14} color="#fbbf24" />
          <Text style={styles.statText}>{resource.rating}</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="download" size={14} color={Colors.neutral.gray400} />
          <Text style={styles.statText}>{resource.downloads}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDownload} style={styles.downloadButton}>
        <Icon name="download" size={14} color={Colors.primary.white} />
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Success Story Card Component
const SuccessStoryCard: React.FC<{ story: any }> = ({ story }) => (
  <View style={styles.storyCard}>
    <View style={styles.storyHeader}>
      <Text style={styles.storyEmoji}>{story.image}</Text>
      <View style={styles.storyInfo}>
        <View style={styles.storyNameRow}>
          <Text style={styles.storyName}>{story.name}</Text>
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineText}>{story.timeline}</Text>
          </View>
        </View>
        <Text style={styles.storyRole}>{story.role}</Text>
        <Text style={styles.storyText}>{story.story}</Text>
      </View>
    </View>
  </View>
);

// Quiz Question Component
const QuizQuestion: React.FC<{
  question: any;
  index: number;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}> = ({ question, index, selectedAnswer, onAnswer }) => (
  <View style={styles.quizQuestion}>
    <Text style={styles.questionText}>
      {index + 1}. {question.question}
    </Text>
    <View style={styles.optionsContainer}>
      {question.options.map((option: any) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionItem,
            selectedAnswer === option.value && styles.optionSelected
          ]}
          onPress={() => onAnswer(option.value)}
        >
          <View style={[
            styles.radioButton,
            selectedAnswer === option.value && styles.radioSelected
          ]}>
            {selectedAnswer === option.value && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default function ProspectiveExploreScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('careers');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateQuizResult = () => {
    const answers = Object.values(quizAnswers);
    if (answers.length < 3) return null;
    
    // Simple scoring logic
    if (answers.includes('travel') && answers.includes('regular')) return 'airline';
    if (answers.includes('service') && answers.includes('corporate')) return 'corporate';
    if (answers.includes('challenge') && answers.includes('military')) return 'military';
    if (answers.includes('adventure') && answers.includes('flexible')) return 'charter';
    return 'instructor';
  };

  const getCareerRecommendation = (careerId: string) => {
    return careerPaths.find(c => c.id === careerId);
  };

  const handleLearnMore = (career: any) => {
    Alert.alert(career.title, `Learn more about becoming a ${career.title}. This would open detailed career information.`);
  };

  const handleDownload = (resource: any) => {
    Alert.alert('Download', `Download ${resource.title}? This would start the download process.`);
  };

  const handleCalculateTrainingCosts = () => {
    navigation.navigate('ProspectiveCalculator' as never);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'careers':
        return (
          <View style={styles.tabContent}>
            <View style={styles.introCard}>
              <View style={styles.introHeader}>
                <Icon name="compass" size={24} color={Colors.status.info} />
                <Text style={styles.introTitle}>Aviation Career Paths</Text>
              </View>
              <Text style={styles.introText}>
                Explore different career opportunities in aviation and find the path that matches your goals.
              </Text>
            </View>

            <View style={styles.careersGrid}>
              {careerPaths.map((career) => (
                <CareerCard
                  key={career.id}
                  career={career}
                  onLearnMore={() => handleLearnMore(career)}
                />
              ))}
            </View>
          </View>
        );

      case 'resources':
        return (
          <View style={styles.tabContent}>
            <View style={styles.introCard}>
              <View style={styles.introHeader}>
                <Icon name="bookOpen" size={24} color="#10b981" />
                <Text style={styles.introTitle}>Training Resources</Text>
              </View>
              <Text style={styles.introText}>
                Access study materials, guides, and tools to help you succeed in your aviation training.
              </Text>
            </View>

            <View style={styles.resourcesGrid}>
              {trainingResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  resource={resource}
                  onDownload={() => handleDownload(resource)}
                />
              ))}
            </View>

            <View style={styles.additionalResources}>
              <Text style={styles.additionalTitle}>More Resources</Text>
              <View style={styles.additionalGrid}>
                <View style={styles.additionalItem}>
                  <Icon name="video" size={20} color="#ef4444" />
                  <View>
                    <Text style={styles.additionalItemTitle}>Video Library</Text>
                    <Text style={styles.additionalItemText}>Training videos</Text>
                  </View>
                </View>
                <View style={styles.additionalItem}>
                  <Icon name="newspaper" size={20} color="#10b981" />
                  <View>
                    <Text style={styles.additionalItemTitle}>Aviation News</Text>
                    <Text style={styles.additionalItemText}>Industry updates</Text>
                  </View>
                </View>
                <View style={styles.additionalItem}>
                  <Icon name="users" size={20} color="#8b5cf6" />
                  <View>
                    <Text style={styles.additionalItemTitle}>Community</Text>
                    <Text style={styles.additionalItemText}>Connect with pilots</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      case 'stories':
        return (
          <View style={styles.tabContent}>
            <View style={styles.introCard}>
              <View style={styles.introHeader}>
                <Icon name="star" size={24} color="#fbbf24" />
                <Text style={styles.introTitle}>Success Stories</Text>
              </View>
              <Text style={styles.introText}>
                Read inspiring stories from pilots who started their journey just like you.
              </Text>
            </View>

            <View style={styles.storiesContainer}>
              {successStories.map((story, index) => (
                <SuccessStoryCard key={index} story={story} />
              ))}
            </View>
          </View>
        );

      case 'quiz':
        return (
          <View style={styles.tabContent}>
            <View style={styles.introCard}>
              <View style={styles.introHeader}>
                <Icon name="helpCircle" size={24} color="#8b5cf6" />
                <Text style={styles.introTitle}>Career Path Quiz</Text>
              </View>
              <Text style={styles.introText}>
                Answer a few questions to discover which aviation career path might be right for you.
              </Text>
            </View>

            {!quizResult ? (
              <View style={styles.quizContainer}>
                {quizQuestions.map((question, index) => (
                  <QuizQuestion
                    key={question.id}
                    question={question}
                    index={index}
                    selectedAnswer={quizAnswers[question.id]}
                    onAnswer={(answer) => handleQuizAnswer(question.id, answer)}
                  />
                ))}

                <View style={styles.quizSubmitContainer}>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      Object.keys(quizAnswers).length < 3 && styles.submitButtonDisabled
                    ]}
                    onPress={() => setQuizResult(calculateQuizResult())}
                    disabled={Object.keys(quizAnswers).length < 3}
                  >
                    <Text style={styles.submitButtonText}>Get My Career Recommendation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.quizResultContainer}>
                <View style={styles.resultHeader}>
                  <View style={styles.resultIcon}>
                    <Icon name="checkCircle" size={32} color="#10b981" />
                  </View>
                  <Text style={styles.resultTitle}>Your Career Recommendation</Text>
                  <Text style={styles.resultSubtitle}>
                    Based on your answers, here's the career path we recommend:
                  </Text>
                </View>

                {(() => {
                  const recommendedCareer = getCareerRecommendation(quizResult);
                  if (!recommendedCareer) return null;
                  
                  return (
                    <View style={styles.recommendationCard}>
                      <View style={styles.recommendationHeader}>
                        <Icon name={recommendedCareer.icon} size={24} color={Colors.neutral.gray700} />
                        <View style={styles.recommendationInfo}>
                          <Text style={styles.recommendationTitle}>{recommendedCareer.title}</Text>
                          <Text style={styles.recommendationDescription}>{recommendedCareer.description}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.recommendationDetails}>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>Salary Range</Text>
                          <Text style={styles.detailValue}>{recommendedCareer.salary}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>Job Growth</Text>
                          <Text style={styles.detailValue}>{recommendedCareer.growth}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })()}

                <View style={styles.resultActions}>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={() => {
                      setQuizResult(null);
                      setQuizAnswers({});
                    }}
                  >
                    <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.calculateButton}
                    onPress={handleCalculateTrainingCosts}
                  >
                    <Text style={styles.calculateButtonText}>Calculate Training Costs</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Aviation</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.tabActive
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? Colors.neutral.gray900 : Colors.neutral.gray600} 
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  headerSpacer: {
    width: 40,
  },
  tabBar: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  tabBarContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: Colors.neutral.gray100,
    gap: 8,
    marginRight: 4,
  },
  tabActive: {
    backgroundColor: Colors.primary.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  tabTextActive: {
    color: Colors.neutral.gray900,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  introCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
    marginBottom: 24,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  introText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  careersGrid: {
    gap: 16,
  },
  careerCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  careerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  careerIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  careerDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  careerDetails: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  careerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  salary: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#10b981',
    marginBottom: 2,
  },
  growth: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  learnMoreText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
  },
  resourcesGrid: {
    gap: 16,
    marginBottom: 24,
  },
  resourceCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  resourceTypeBadge: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  resourceTypeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  resourceDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
  resourceStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.status.info,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  additionalResources: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 24,
  },
  additionalTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  additionalGrid: {
    gap: 16,
  },
  additionalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  additionalItemTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
  },
  additionalItemText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  storiesContainer: {
    gap: 24,
  },
  storyCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  storyEmoji: {
    fontSize: 32,
  },
  storyInfo: {
    flex: 1,
  },
  storyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  storyName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  timelineBadge: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timelineText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#16a34a',
  },
  storyRole: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
    marginBottom: 8,
  },
  storyText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  quizContainer: {
    gap: 24,
  },
  quizQuestion: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  questionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
    gap: 12,
  },
  optionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: Colors.status.info,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.status.info,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.status.info,
  },
  optionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    flex: 1,
  },
  quizSubmitContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  quizResultContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 24,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#f0fdf4',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  recommendationCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 16,
  },
  recommendationDetails: {
    gap: 16,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#10b981',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 16,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 8,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  calculateButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.status.info,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculateButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
});

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

export default function InterviewPrepScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const handleBackPress = () => {
    navigation?.goBack();
  };

  // Mock interview types
  const interviewTypes = [
    {
      id: 1,
      title: "Airline Interviews",
      description: "Major and regional airline interview preparation",
      icon: "plane",
      features: [
        "Technical knowledge assessment",
        "Behavioral interview practice", 
        "Simulator evaluation prep",
        "Panel interview training"
      ],
      duration: "2-3 hours",
      price: "$299"
    },
    {
      id: 2,
      title: "Corporate Aviation",
      description: "Private and corporate flight department interviews", 
      icon: "briefcase",
      features: [
        "Client relations scenarios",
        "Flexibility demonstrations",
        "Safety culture alignment",
        "Professional presentation"
      ],
      duration: "1.5-2 hours",
      price: "$199"
    },
    {
      id: 3,
      title: "Flight Instructor",
      description: "CFI and advanced instructor position interviews",
      icon: "graduationCap",
      features: [
        "Teaching methodology",
        "Scenario-based instruction",
        "Student management",
        "Safety emphasis demonstration"
      ],
      duration: "1-1.5 hours", 
      price: "$149"
    }
  ];

  // Mock prep modules
  const prepModules = [
    {
      id: 1,
      title: "Technical Knowledge Review",
      description: "Brush up on aircraft systems and aviation regulations",
      completed: true
    },
    {
      id: 2,
      title: "Behavioral Questions Bank", 
      description: "Practice common STAR method responses",
      completed: false
    },
    {
      id: 3,
      title: "Mock Interview Simulation",
      description: "Full-length practice interview with feedback",
      completed: false
    },
    {
      id: 4,
      title: "Professional Presentation",
      description: "Body language, dress code, and communication tips",
      completed: false
    }
  ];

  const handleStartPrep = (type: any) => {
    Alert.alert(
      'Start Preparation',
      `Begin ${type.title} interview preparation?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => Alert.alert('Success', 'Interview prep program starting soon!') }
      ]
    );
  };

  const renderInterviewType = (type: any) => (
    <View key={type.id} style={styles.typeCard}>
      <View style={styles.typeHeader}>
        <View style={styles.typeIcon}>
          <Icon name={type.icon as any} size={24} color={Colors.accent.electricBlue} />
        </View>
        <View style={styles.typeInfo}>
          <Text style={styles.typeTitle}>{type.title}</Text>
          <Text style={styles.typeDescription}>{type.description}</Text>
        </View>
        <View style={styles.typePricing}>
          <Text style={styles.typeDuration}>{type.duration}</Text>
          <Text style={styles.typePrice}>{type.price}</Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        {type.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check" size={16} color={Colors.status.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => handleStartPrep(type)}
      >
        <Text style={styles.startButtonText}>Start Preparation</Text>
        <Icon name="play" size={16} color={Colors.primary.white} />
      </TouchableOpacity>
    </View>
  );

  const renderPrepModule = (module: any) => (
    <View key={module.id} style={styles.moduleCard}>
      <View style={styles.moduleHeader}>
        <View style={[
          styles.moduleIcon,
          module.completed && styles.completedIcon
        ]}>
          <Icon 
            name={module.completed ? "check" : "clock"} 
            size={20} 
            color={module.completed ? Colors.status.success : Colors.neutral.gray500} 
          />
        </View>
        <View style={styles.moduleInfo}>
          <Text style={[
            styles.moduleTitle,
            module.completed && styles.completedText
          ]}>
            {module.title}
          </Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
        </View>
        <TouchableOpacity style={styles.moduleAction}>
          <Icon name="chevronRight" size={16} color={Colors.neutral.gray500} />
        </TouchableOpacity>
      </View>
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
          <Text style={styles.headerTitle}>Interview Preparation</Text>
          <Text style={styles.headerSubtitle}>Customized prep for aviation interviews</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Interview Types Section */}
        <Text style={styles.sectionTitle}>INTERVIEW TYPES</Text>
        {interviewTypes.map(renderInterviewType)}

        {/* Preparation Modules Section */}
        <Text style={styles.sectionTitle}>PREPARATION MODULES</Text>
        {prepModules.map(renderPrepModule)}
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
  typeCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  typeHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.accent.electricBlue + '20',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  typeDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  typePricing: {
    alignItems: 'flex-end',
  },
  typeDuration: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  typePrice: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.accent.electricBlue,
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
  startButton: {
    backgroundColor: Colors.primary.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  moduleCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: Colors.status.success + '20',
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  completedText: {
    color: Colors.status.success,
  },
  moduleDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  moduleAction: {
    padding: 8,
  },
});






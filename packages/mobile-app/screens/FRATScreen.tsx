import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

interface FRATItem {
  id: string;
  category: string;
  question: string;
  options: { text: string; points: number }[];
  selectedIndex: number | null;
  points: number;
}

interface RiskLevel {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  color: string;
  backgroundColor: string;
  description: string;
  recommendation: string;
}

export default function FRATScreen({ navigation }: any) {
  const [fratItems, setFratItems] = useState<FRATItem[]>([
    {
      id: 'pilot_experience',
      category: 'Pilot Factors',
      question: 'Total flight time in this aircraft type',
      options: [
        { text: 'More than 100 hours', points: 0 },
        { text: '50-100 hours', points: 1 },
        { text: '15-49 hours', points: 2 },
        { text: 'Less than 15 hours', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'pilot_currency',
      category: 'Pilot Factors',
      question: 'Flight experience in last 90 days',
      options: [
        { text: 'More than 15 hours', points: 0 },
        { text: '5-15 hours', points: 1 },
        { text: '1-5 hours', points: 2 },
        { text: 'Less than 1 hour', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'pilot_recency',
      category: 'Pilot Factors',
      question: 'Days since last flight in this aircraft type',
      options: [
        { text: '1-7 days', points: 0 },
        { text: '8-30 days', points: 1 },
        { text: '31-90 days', points: 2 },
        { text: 'More than 90 days', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'weather_ceiling',
      category: 'Weather',
      question: 'Ceiling',
      options: [
        { text: 'Clear or greater than 3000 ft', points: 0 },
        { text: '1000-3000 ft', points: 1 },
        { text: '500-1000 ft', points: 2 },
        { text: 'Less than 500 ft', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'weather_visibility',
      category: 'Weather',
      question: 'Visibility',
      options: [
        { text: 'Greater than 6 miles', points: 0 },
        { text: '3-6 miles', points: 1 },
        { text: '1-3 miles', points: 2 },
        { text: 'Less than 1 mile', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'weather_surface_winds',
      category: 'Weather',
      question: 'Surface winds',
      options: [
        { text: 'Less than 15 knots', points: 0 },
        { text: '15-25 knots', points: 1 },
        { text: '25-35 knots', points: 2 },
        { text: 'Greater than 35 knots', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'weather_crosswind',
      category: 'Weather',
      question: 'Crosswind component',
      options: [
        { text: 'Less than 10 knots', points: 0 },
        { text: '10-15 knots', points: 1 },
        { text: '15-20 knots', points: 2 },
        { text: 'Greater than 20 knots', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'airport_familiarity',
      category: 'Airport/Terrain',
      question: 'Familiarity with departure and arrival airports',
      options: [
        { text: 'High familiarity with both', points: 0 },
        { text: 'High familiarity with one', points: 1 },
        { text: 'Low familiarity with both', points: 2 },
        { text: 'First time at both airports', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'airport_runway',
      category: 'Airport/Terrain',
      question: 'Runway length vs. aircraft requirements',
      options: [
        { text: 'More than adequate', points: 0 },
        { text: 'Adequate', points: 1 },
        { text: 'Marginal', points: 2 },
        { text: 'Inadequate', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'terrain',
      category: 'Airport/Terrain',
      question: 'Terrain and obstacles',
      options: [
        { text: 'No significant terrain or obstacles', points: 0 },
        { text: 'Moderate terrain or obstacles', points: 1 },
        { text: 'Significant terrain or obstacles', points: 2 },
        { text: 'Extreme terrain or obstacles', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'aircraft_condition',
      category: 'Aircraft',
      question: 'Aircraft condition and maintenance',
      options: [
        { text: 'Excellent condition, recent maintenance', points: 0 },
        { text: 'Good condition, routine maintenance', points: 1 },
        { text: 'Acceptable condition, some deferred items', points: 2 },
        { text: 'Poor condition, multiple deferred items', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'aircraft_performance',
      category: 'Aircraft',
      question: 'Aircraft performance vs. mission requirements',
      options: [
        { text: 'More than adequate performance', points: 0 },
        { text: 'Adequate performance', points: 1 },
        { text: 'Marginal performance', points: 2 },
        { text: 'Inadequate performance', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'pilot_fatigue',
      category: 'External Pressures',
      question: 'Pilot fatigue level',
      options: [
        { text: 'Well rested', points: 0 },
        { text: 'Slightly tired', points: 1 },
        { text: 'Moderately tired', points: 2 },
        { text: 'Very tired or fatigued', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
    {
      id: 'time_pressure',
      category: 'External Pressures',
      question: 'Time pressure to complete flight',
      options: [
        { text: 'No time pressure', points: 0 },
        { text: 'Mild time pressure', points: 1 },
        { text: 'Moderate time pressure', points: 2 },
        { text: 'Severe time pressure', points: 3 },
      ],
      selectedIndex: null,
      points: 0,
    },
  ]);

  const [totalScore, setTotalScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);

  useEffect(() => {
    calculateRisk();
  }, [fratItems]);

  const calculateRisk = () => {
    const total = fratItems.reduce((sum, item) => sum + item.points, 0);
    setTotalScore(total);

    let level: RiskLevel;
    if (total <= 10) {
      level = {
        level: 'LOW',
        color: Colors.secondary.forestGreen,
        backgroundColor: '#F0FDF4',
        description: 'Flight presents minimal risk',
        recommendation: 'Good to go! Monitor conditions and fly safely.',
      };
    } else if (total <= 20) {
      level = {
        level: 'MEDIUM',
        color: '#F59E0B',
        backgroundColor: '#FFFBEB',
        description: 'Flight presents moderate risk',
        recommendation: 'Consider additional precautions. Review risk factors carefully.',
      };
    } else if (total <= 30) {
      level = {
        level: 'HIGH',
        color: '#EF4444',
        backgroundColor: '#FEF2F2',
        description: 'Flight presents significant risk',
        recommendation: 'Serious consideration should be given to delaying or canceling the flight.',
      };
    } else {
      level = {
        level: 'EXTREME',
        color: '#7C2D12',
        backgroundColor: '#FEF2F2',
        description: 'Flight presents extreme risk',
        recommendation: 'DO NOT FLY. Cancel or postpone the flight.',
      };
    }

    setRiskLevel(level);
  };

  const selectOption = (itemId: string, optionIndex: number) => {
    setFratItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          selectedIndex: optionIndex,
          points: item.options[optionIndex].points,
        };
      }
      return item;
    }));
  };

  const resetAssessment = () => {
    Alert.alert(
      'Reset Assessment',
      'Are you sure you want to reset all answers?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => {
            setFratItems(prev => prev.map(item => ({
              ...item,
              selectedIndex: null,
              points: 0,
            })));
          }
        }
      ]
    );
  };

  const saveAssessment = () => {
    if (fratItems.some(item => item.selectedIndex === null)) {
      Alert.alert('Incomplete Assessment', 'Please answer all questions before saving.');
      return;
    }

    Alert.alert(
      'Assessment Saved',
      `Flight Risk Assessment completed with ${riskLevel?.level} risk level. Assessment has been saved to your flight records.`,
      [{ 
        text: 'OK',
        onPress: () => {
          // Navigate back to preflight checklist with completion flag
          navigation.navigate('PreflightChecklistScreen', { fratCompleted: true });
        }
      }]
    );
  };

  const getCompletionPercentage = () => {
    const completed = fratItems.filter(item => item.selectedIndex !== null).length;
    return Math.round((completed / fratItems.length) * 100);
  };

  // Group items by category
  const categorizedItems = fratItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FRATItem[]>);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Risk Assessment</Text>
        <TouchableOpacity onPress={saveAssessment} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Progress and Score */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Progress: {getCompletionPercentage()}% Complete
          </Text>
          <TouchableOpacity onPress={resetAssessment} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        
        {riskLevel && (
          <View style={[styles.riskIndicator, { backgroundColor: riskLevel.backgroundColor }]}>
            <Text style={[styles.riskLevel, { color: riskLevel.color }]}>
              RISK LEVEL: {riskLevel.level}
            </Text>
            <Text style={styles.riskScore}>Score: {totalScore}/42</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(categorizedItems).map(([category, items]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            
            {items.map((item) => (
              <View key={item.id} style={styles.questionCard}>
                <Text style={styles.question}>{item.question}</Text>
                
                <View style={styles.optionsContainer}>
                  {item.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        item.selectedIndex === index && styles.optionButtonSelected,
                      ]}
                      onPress={() => selectOption(item.id, index)}
                    >
                      <View style={styles.optionContent}>
                        <View style={[
                          styles.radioButton,
                          item.selectedIndex === index && styles.radioButtonSelected,
                        ]}>
                          {item.selectedIndex === index && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                        <Text style={[
                          styles.optionText,
                          item.selectedIndex === index && styles.optionTextSelected,
                        ]}>
                          {option.text}
                        </Text>
                        <View style={styles.pointsBadge}>
                          <Text style={styles.pointsText}>{option.points}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Risk Assessment Summary */}
        {riskLevel && getCompletionPercentage() === 100 && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Risk Assessment Summary</Text>
            
            <View style={[styles.riskCard, { backgroundColor: riskLevel.backgroundColor }]}>
              <View style={styles.riskHeader}>
                <Icon 
                  name={riskLevel.level === 'LOW' ? 'checkCircle' : 'exclamationTriangle'} 
                  size={24} 
                  color={riskLevel.color} 
                />
                <Text style={[styles.riskLevelLarge, { color: riskLevel.color }]}>
                  {riskLevel.level} RISK
                </Text>
              </View>
              
              <Text style={styles.riskDescription}>{riskLevel.description}</Text>
              <Text style={[styles.riskRecommendation, { color: riskLevel.color }]}>
                {riskLevel.recommendation}
              </Text>
              
              <View style={styles.scoreBreakdown}>
                <Text style={styles.scoreBreakdownTitle}>Score Breakdown:</Text>
                {Object.entries(categorizedItems).map(([category, items]) => {
                  const categoryScore = items.reduce((sum, item) => sum + item.points, 0);
                  const maxScore = items.length * 3;
                  return (
                    <View key={category} style={styles.categoryScore}>
                      <Text style={styles.categoryScoreText}>
                        {category}: {categoryScore}/{maxScore}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

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
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary.black,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  progressSection: {
    backgroundColor: Colors.primary.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  resetButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
  },
  riskIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  riskLevel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
  },
  riskScore: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    margin: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  questionCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    padding: 12,
  },
  optionButtonSelected: {
    borderColor: Colors.tertiary.denimBlue,
    backgroundColor: '#F0F4FF',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: Colors.tertiary.denimBlue,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.tertiary.denimBlue,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  optionTextSelected: {
    color: Colors.tertiary.denimBlue,
    fontFamily: Typography.fontFamily.medium,
  },
  pointsBadge: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 28,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  summarySection: {
    margin: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 12,
  },
  riskCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskLevelLarge: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 8,
  },
  riskDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  riskRecommendation: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 16,
  },
  scoreBreakdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  scoreBreakdownTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  categoryScore: {
    marginBottom: 4,
  },
  categoryScoreText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  bottomPadding: {
    height: 32,
  },
});





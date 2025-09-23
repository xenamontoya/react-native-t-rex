import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

export default function WeatherReviewScreen({ navigation }: any) {
  const [selectedConsideration, setSelectedConsideration] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectionChange = (value: string) => {
    setSelectedConsideration(value);
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    if (selectedConsideration) {
      console.log('Selected consideration:', selectedConsideration);
      // Navigate back to preflight checklist with completion flag
      navigation.navigate('PreflightChecklist', { weatherCompleted: 'true' });
    }
  };

  const getFeedback = () => {
    const correctAnswer = 'density-altitude';
    const isCorrect = selectedConsideration === correctAnswer;
    
    if (isCorrect) {
      return {
        type: 'correct',
        title: 'Correct!',
        message: 'High humidity significantly reduces air density, which increases density altitude. This means the aircraft will perform as if it\'s flying at a higher altitude, requiring longer takeoff distances and reduced climb performance.',
        correctOption: 'Density Altitude Effects'
      };
    } else {
      return {
        type: 'incorrect',
        title: 'Not quite right',
        message: 'While your selection is a valid consideration, the primary concern with high humidity is its effect on air density and density altitude.',
        correctOption: 'Density Altitude Effects',
        explanation: 'High humidity reduces air density, making the aircraft perform as if flying at a higher altitude. This is the most critical factor affecting flight safety in humid conditions.'
      };
    }
  };

  const feedback = showFeedback ? getFeedback() : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Weather</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('PreflightChecklist')}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Flight Duration Info */}
        <View style={styles.durationCard}>
          <View style={styles.durationContent}>
            <Icon name="cloud" size={20} color={Colors.neutral.gray500} />
            <View style={styles.durationText}>
              <Text style={styles.durationTitle}>2-Hour Flight Window</Text>
              <Text style={styles.durationSubtitle}>Weather conditions for your scheduled flight time</Text>
            </View>
          </View>
        </View>

        {/* Current Weather Conditions */}
        <View style={styles.weatherCard}>
          <Text style={styles.cardTitle}>Current Conditions</Text>
          
          <View style={styles.conditionsGrid}>
            {/* Temperature */}
            <View style={styles.conditionItem}>
              <Icon name="thermometer" size={20} color={Colors.neutral.gray500} />
              <View style={styles.conditionText}>
                <Text style={styles.conditionLabel}>Temperature</Text>
                <Text style={styles.conditionValue}>78°F (26°C)</Text>
              </View>
            </View>

            {/* Visibility */}
            <View style={styles.conditionItem}>
              <Icon name="eye" size={20} color={Colors.neutral.gray500} />
              <View style={styles.conditionText}>
                <Text style={styles.conditionLabel}>Visibility</Text>
                <Text style={styles.conditionValue}>10+ SM</Text>
              </View>
            </View>

            {/* Wind */}
            <View style={styles.conditionItem}>
              <Icon name="wind" size={20} color={Colors.neutral.gray500} />
              <View style={styles.conditionText}>
                <Text style={styles.conditionLabel}>Wind</Text>
                <Text style={styles.conditionValue}>8 kts, 240°</Text>
              </View>
            </View>

            {/* Humidity - Highlighted */}
            <View style={styles.conditionItem}>
              <Icon name="droplet" size={20} color={Colors.neutral.gray500} />
              <View style={styles.conditionText}>
                <Text style={styles.conditionLabel}>Humidity</Text>
                <Text style={styles.conditionValue}>85%</Text>
                <Text style={styles.conditionNote}>High</Text>
              </View>
            </View>
          </View>
        </View>

        {/* High Humidity Callout */}
        <View style={styles.humidityCard}>
          <View style={styles.humidityHeader}>
            <Icon name="exclamationTriangle" size={20} color={Colors.neutral.gray500} />
            <View style={styles.humidityHeaderText}>
              <Text style={styles.humidityTitle}>High Humidity Conditions</Text>
              <Text style={styles.humidityDescription}>
                The current humidity is 85%, which is considered high for aviation. What should you consider when flying in these conditions?
              </Text>
            </View>
          </View>

          {/* Radio Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option}
              onPress={() => handleSelectionChange('density-altitude')}
            >
              <View style={styles.radioButton}>
                <View style={[
                  styles.radioInner,
                  selectedConsideration === 'density-altitude' && styles.radioSelected
                ]} />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Density Altitude Effects</Text>
                <Text style={styles.optionDescription}>High humidity reduces air density, affecting aircraft performance and takeoff distance</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option}
              onPress={() => handleSelectionChange('engine-performance')}
            >
              <View style={styles.radioButton}>
                <View style={[
                  styles.radioInner,
                  selectedConsideration === 'engine-performance' && styles.radioSelected
                ]} />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Engine Performance</Text>
                <Text style={styles.optionDescription}>Humid air can reduce engine power output and increase fuel consumption</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option}
              onPress={() => handleSelectionChange('weather-changes')}
            >
              <View style={styles.radioButton}>
                <View style={[
                  styles.radioInner,
                  selectedConsideration === 'weather-changes' && styles.radioSelected
                ]} />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Potential Weather Changes</Text>
                <Text style={styles.optionDescription}>High humidity may indicate approaching weather systems or precipitation</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Feedback Section */}
          {showFeedback && feedback && (
            <View style={[
              styles.feedbackContainer,
              feedback.type === 'correct' ? styles.correctFeedback : styles.incorrectFeedback
            ]}>
              <View style={styles.feedbackHeader}>
                <View style={[
                  styles.feedbackIcon,
                  feedback.type === 'correct' ? styles.correctIcon : styles.incorrectIcon
                ]}>
                  <Text style={styles.feedbackIconText}>
                    {feedback.type === 'correct' ? '✓' : '✗'}
                  </Text>
                </View>
                <View style={styles.feedbackContent}>
                  <Text style={[
                    styles.feedbackTitle,
                    feedback.type === 'correct' ? styles.correctText : styles.incorrectText
                  ]}>
                    {feedback.title}
                  </Text>
                  <Text style={[
                    styles.feedbackMessage,
                    feedback.type === 'correct' ? styles.correctText : styles.incorrectText
                  ]}>
                    {feedback.message}
                  </Text>
                  {feedback.type === 'incorrect' && (
                    <View style={styles.correctAnswerBox}>
                      <Text style={styles.correctAnswerTitle}>
                        Correct Answer: {feedback.correctOption}
                      </Text>
                      <Text style={styles.correctAnswerExplanation}>
                        {feedback.explanation}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Additional Aviation Weather Info */}
        <View style={styles.weatherCard}>
          <Text style={styles.cardTitle}>Important Aviation Weather Factors</Text>
          
          <View style={styles.factorsContainer}>
            <View style={[styles.factorItem, { borderLeftColor: '#00FFF2' }]}>
              <Text style={styles.factorTitle}>Ceiling & Visibility</Text>
              <Text style={styles.factorDescription}>Current: Clear skies, 10+ SM visibility - Excellent for VFR flight</Text>
            </View>

            <View style={[styles.factorItem, { borderLeftColor: '#5177BB' }]}>
              <Text style={styles.factorTitle}>Wind Conditions</Text>
              <Text style={styles.factorDescription}>Light winds at 8 kts from 240° - Favorable for takeoff and landing</Text>
            </View>

            <View style={[styles.factorItem, { borderLeftColor: '#F6A345' }]}>
              <Text style={styles.factorTitle}>Density Altitude</Text>
              <Text style={styles.factorDescription}>Elevated due to high humidity - Expect reduced aircraft performance</Text>
            </View>

            <View style={[styles.factorItem, { borderLeftColor: '#00FFF2' }]}>
              <Text style={styles.factorTitle}>Weather Trends</Text>
              <Text style={styles.factorDescription}>Stable conditions expected for next 4 hours - Good for training flight</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Sticky Footer with Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedConsideration && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!selectedConsideration}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedConsideration && styles.disabledButtonText
          ]}>
            Continue
          </Text>
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  durationCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  durationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationText: {
    flex: 1,
  },
  durationTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  durationSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  weatherCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 12,
    gap: 12,
    width: '48%',
  },
  conditionText: {
    flex: 1,
  },
  conditionLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  conditionValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  conditionNote: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  humidityCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 20,
    marginBottom: 20,
  },
  humidityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  humidityHeaderText: {
    flex: 1,
  },
  humidityTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  humidityDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: '#3B82F6',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  feedbackContainer: {
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  correctFeedback: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  incorrectFeedback: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  feedbackIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctIcon: {
    backgroundColor: '#10B981',
  },
  incorrectIcon: {
    backgroundColor: '#EF4444',
  },
  feedbackIconText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    marginBottom: 8,
  },
  feedbackMessage: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 8,
  },
  correctText: {
    color: '#065F46',
  },
  incorrectText: {
    color: '#B91C1C',
  },
  correctAnswerBox: {
    backgroundColor: Colors.primary.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
  },
  correctAnswerTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#B91C1C',
    marginBottom: 4,
  },
  correctAnswerExplanation: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#B91C1C',
  },
  factorsContainer: {
    gap: 16,
  },
  factorItem: {
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  factorTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  factorDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  footer: {
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  continueButton: {
    backgroundColor: Colors.primary.black,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.neutral.gray300,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  disabledButtonText: {
    color: Colors.neutral.gray500,
  },
  bottomPadding: {
    height: 32,
  },
});




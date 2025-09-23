import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

interface DebriefData {
  audioBlob: any; // In React Native, would be audio file path or blob
  transcription: string;
  aiInsights: {
    overallGrade: 'Complete' | 'Not Complete' | 'Incomplete';
    overallNotes: string;
    taskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
    taskNotes: Record<string, string>;
    flightTimes: Record<string, string>;
    summary: string;
  };
}

interface PromptStep {
  id: string;
  question: string;
  category: string;
  duration: number; // suggested duration in seconds
}

const DEBRIEF_PROMPTS: PromptStep[] = [
  {
    id: 'overview',
    question: "Let's start with an overall summary. How did the lesson go today? What were the main objectives and how well were they accomplished?",
    category: 'Overview',
    duration: 60
  },
  {
    id: 'preflight',
    question: "Tell me about the pre-flight portion. How did the student perform during aircraft inspection, weather briefing, and flight planning?",
    category: 'Ground Operations',
    duration: 45
  },
  {
    id: 'flight_maneuvers',
    question: "Describe the flight maneuvers practiced today. Which maneuvers were performed well and which need more work?",
    category: 'Flight Skills',
    duration: 90
  },
  {
    id: 'communication',
    question: "How was the student's radio communication and interaction with ATC? Any areas for improvement?",
    category: 'Communication',
    duration: 30
  },
  {
    id: 'decision_making',
    question: "Discuss the student's decision-making and situational awareness during the flight. Any notable examples?",
    category: 'Aeronautical Decision Making',
    duration: 45
  },
  {
    id: 'areas_improvement',
    question: "What are the key areas the student should focus on for next lesson? What homework or additional study would you recommend?",
    category: 'Next Steps',
    duration: 45
  }
];

const LESSON_OBJECTIVES = [
  'Pre-flight inspection and aircraft systems',
  'Taxi operations and ground procedures', 
  'Normal takeoffs and landings',
  'Traffic pattern operations',
  'Basic flight maneuvers and aircraft control',
  'Radio communications and phraseology',
  'Emergency procedures and safety protocols',
  'Post-flight procedures and securing aircraft'
];

export default function AudioDebriefScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<any>(null);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const currentPrompt = DEBRIEF_PROMPTS[currentStep];
  const isLastStep = currentStep === DEBRIEF_PROMPTS.length - 1;

  useEffect(() => {
    try {
      const params = route.params as any;
      const { id, lessonData: lessonDataParam } = params || {};
      
      if (lessonDataParam && typeof lessonDataParam === 'string') {
        const parsedLessonData = JSON.parse(decodeURIComponent(lessonDataParam));
        setLessonData(parsedLessonData);
      } else {
        // Fallback lesson data
        setLessonData({
          id: id || '1',
          title: 'Basic Maneuvers',
          studentName: 'Alex Johnson',
          date: new Date().toLocaleDateString(),
          duration: '2.0 hours'
        });
      }
    } catch (error) {
      console.error('Error parsing lesson data:', error);
      setLessonData({
        id: '1',
        title: 'Basic Maneuvers',
        studentName: 'Alex Johnson',
        date: new Date().toLocaleDateString(),
        duration: '2.0 hours'
      });
    } finally {
      setLoading(false);
    }
  }, [route.params]);

  // Auto-start recording when component mounts
  useEffect(() => {
    if (!loading && lessonData) {
      const autoStartTimer = setTimeout(() => {
        startRecording();
      }, 1000);
      return () => clearTimeout(autoStartTimer);
    }
  }, [loading, lessonData]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    console.log('Starting audio recording...');
    
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // In a real implementation, you would start actual audio recording here
    // using a library like react-native-audio-recorder-player
  };

  const stopRecording = () => {
    console.log('Stopping audio recording...');
    
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Create mock audio blob - in real implementation would be actual recorded audio
    const mockAudioBlob = { type: 'audio/wav', duration: recordingTime };
    setAudioBlob(mockAudioBlob);
  };

  const playAudio = () => {
    // In real implementation, would play the recorded audio
    setIsPlaying(true);
    setIsPaused(false);
    
    // Mock playback - stop after a few seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const nextStep = () => {
    if (isLastStep) {
      processDebrief();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const processDebrief = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const debriefData: DebriefData = {
        audioBlob: audioBlob,
        transcription: "Overall, the lesson went excellent today with the student. They demonstrated really strong progress across all key areas. During pre-flight inspection, they were thorough and systematic, checking all required items methodically. Their taxi technique was smooth with excellent control inputs and good situational awareness. The radio communications were clear and professional throughout. For the flight maneuvers, we worked on steep turns and coordination exercises. They're really getting the hang of it, though we'll continue working on maintaining altitude precision. The landing was well-executed with good approach stability and smooth touchdown. They logged 1.3 hours of dual instruction with 6 successful landings.",
        aiInsights: {
          overallGrade: 'Complete',
          overallNotes: 'Student demonstrated excellent progress across all lesson objectives. Strong performance in pre-flight procedures, aircraft control, and communication. Continue focus on steep turn altitude maintenance and landing consistency.',
          taskGrades: {
            'preflight': 'Pr',
            'weather': 'E',
            'radio': 'E',
            'taxi': 'E',
            'airwork': 'Pr',
            'navigation': 'E',
            'straight-level': 'Pr',
            'climbs': 'Pr',
            'descents': 'Pr',
            'turns': 'M',
            'power-management': 'Pr',
            'pattern-entry': 'Pr',
            'downwind': 'E',
            'base-turn': 'Pr',
            'final-approach': 'E',
            'landing': 'Pr'
          },
          taskNotes: {
            'preflight': 'Thorough and systematic inspection, excellent attention to detail and safety procedures.',
            'weather': 'Comprehensive weather analysis and risk assessment demonstrated.',
            'radio': 'Clear, professional communication with excellent phraseology and situational awareness.',
            'taxi': 'Smooth control inputs and excellent ground handling skills demonstrated.',
            'airwork': 'Good overall airmanship and aircraft control during flight maneuvers.',
            'navigation': 'Effective use of navigation aids and situational awareness demonstrated.',
            'straight-level': 'Good aircraft control with consistent altitude and heading maintenance.',
            'climbs': 'Proper climb technique with good airspeed control and engine management.',
            'descents': 'Controlled descents with appropriate power management and airspeed control.',
            'turns': 'Good coordination but needs practice maintaining altitude during steep turns.',
            'power-management': 'Appropriate power settings and smooth throttle control throughout flight maneuvers.',
            'pattern-entry': 'Proper pattern entry procedures and good traffic awareness demonstrated.',
            'downwind': 'Excellent spacing and altitude control on downwind leg.',
            'base-turn': 'Good timing and coordination on base turn with proper wind correction.',
            'final-approach': 'Excellent approach stabilization and energy management.',
            'landing': 'Smooth touchdown with good directional control and appropriate flare timing.'
          },
          flightTimes: {
            'total_time': '1.3',
            'dual_day_local': '1.3',
            'dual_day_landings': '6'
          },
          summary: 'Excellent lesson with strong progress demonstrated across all training objectives.'
        }
      };
      
      // Navigate to lesson grading with AI insights
      const enhancedLessonData = {
        ...lessonData,
        aiDebrief: {
          transcription: debriefData.transcription,
          audioBlob: debriefData.audioBlob,
          processedAt: new Date().toISOString(),
          insights: debriefData.aiInsights
        }
      };

      // Navigate to lesson grading page with pre-filled AI insights
      const lessonDataParam = encodeURIComponent(JSON.stringify(enhancedLessonData));
      navigation.navigate('LessonGrading' as never, {
        id: lessonData.id,
        lessonData: lessonDataParam,
        hasAiInsights: true
      } as never);
      
    } catch (error) {
      console.error('Error processing debrief:', error);
      Alert.alert('Error', 'Error processing debrief. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (isRecording || audioBlob) {
      setShowCancelConfirmation(true);
    } else {
      navigation.goBack();
    }
  };

  const confirmCancel = () => {
    setShowCancelConfirmation(false);
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!lessonData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No lesson data found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <Icon name="spinner" size={48} color={Colors.brand.orange} />
        <Text style={styles.processingTitle}>Processing Your Debrief</Text>
        <Text style={styles.processingSubtitle}>AI is analyzing your audio to generate lesson insights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Lesson Debrief</Text>
          <Text style={styles.headerSubtitle}>{lessonData.studentName} • {lessonData.title}</Text>
        </View>
        <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
          <Icon name="times" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      {/* Recording Controls */}
      <View style={styles.recordingControls}>
        <View style={styles.recordingControlsInner}>
          {/* Left Side - Recording Indicator */}
          <View style={styles.recordingIndicator}>
            {isRecording && (
              <View style={styles.recordingActiveIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
            )}
          </View>

          {/* Right Side - Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
          </View>

          {/* Center - Action Buttons */}
          <View style={styles.actionButtons}>
            {!isRecording && !audioBlob && (
              <TouchableOpacity onPress={startRecording} style={styles.recordButton}>
                <Icon name="microphone" size={20} color={Colors.brand.cyan} />
              </TouchableOpacity>
            )}

            {isRecording && (
              <TouchableOpacity onPress={stopRecording} style={styles.stopButton}>
                <Icon name="stop" size={20} color={Colors.primary.white} />
              </TouchableOpacity>
            )}

            {audioBlob && !isRecording && (
              <View style={styles.playbackControls}>
                <TouchableOpacity 
                  onPress={isPlaying ? pauseAudio : playAudio} 
                  style={styles.playButton}
                >
                  <Icon name={isPlaying ? "pause" : "play"} size={16} color={Colors.primary.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={resetRecording} style={styles.resetButton}>
                  <Icon name="redo" size={16} color={Colors.primary.white} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Current Question */}
          <View style={styles.questionCard}>
            <View style={styles.questionNavigation}>
              <TouchableOpacity 
                onPress={previousStep}
                disabled={currentStep === 0}
                style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
              >
                <Icon 
                  name="chevron-left" 
                  size={16} 
                  color={currentStep === 0 ? Colors.neutral.gray400 : Colors.neutral.gray600} 
                />
              </TouchableOpacity>
              
              <View style={styles.stepIndicator}>
                <Text style={styles.stepText}>{currentStep + 1} of {DEBRIEF_PROMPTS.length}</Text>
              </View>
              
              <TouchableOpacity 
                onPress={nextStep}
                disabled={currentStep === DEBRIEF_PROMPTS.length - 1}
                style={[styles.navButton, currentStep === DEBRIEF_PROMPTS.length - 1 && styles.navButtonDisabled]}
              >
                <Icon 
                  name="chevronRight" 
                  size={16} 
                  color={currentStep === DEBRIEF_PROMPTS.length - 1 ? Colors.neutral.gray400 : Colors.neutral.gray600} 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.questionContent}>
              <Text style={styles.questionCategory}>{currentPrompt.category}</Text>
              <Text style={styles.questionText}>{currentPrompt.question}</Text>
            </View>
          </View>

          {/* Lesson Objectives */}
          <View style={styles.objectivesCard}>
            <Text style={styles.objectivesTitle}>Lesson Objectives</Text>
            <View style={styles.objectivesList}>
              {LESSON_OBJECTIVES.map((objective, index) => (
                <View key={index} style={styles.objectiveItem}>
                  <View style={styles.objectiveNumber}>
                    <Text style={styles.objectiveNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.objectiveText}>{objective}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Complete Debrief Button */}
      <View style={styles.completeButtonContainer}>
        <TouchableOpacity onPress={() => {
          if (isRecording) {
            stopRecording();
            setTimeout(processDebrief, 500);
          } else {
            processDebrief();
          }
        }} style={styles.completeButton}>
          <Icon name="check" size={16} color={Colors.brand.cyan} />
          <Text style={styles.completeButtonText}>Complete Debrief</Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Confirmation Modal */}
      <Modal visible={showCancelConfirmation} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cancel Debrief?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to cancel? Any recorded audio will be lost.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowCancelConfirmation(false)}
              >
                <Text style={styles.modalCancelText}>Nevermind</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={confirmCancel}
              >
                <Text style={styles.modalConfirmText}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fontFamily.regular,
  },
  errorText: {
    fontSize: 18,
    color: Colors.neutral.gray900,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 8,
  },
  goBackText: {
    fontSize: 14,
    color: Colors.brand.blueAzure,
    fontFamily: Typography.fontFamily.medium,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    paddingHorizontal: 16,
  },
  processingTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginTop: 16,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 24,
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
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  closeButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingControls: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  recordingControlsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordingIndicator: {
    flex: 1,
    alignItems: 'flex-start',
  },
  recordingActiveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.status.error,
    borderRadius: 4,
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.status.error,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray900,
  },
  actionButtons: {
    position: 'absolute',
    left: '50%',
    marginLeft: -24, // Half of button width
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordButton: {
    width: 48,
    height: 48,
    backgroundColor: '#212121',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.status.error,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playbackControls: {
    flexDirection: 'row',
    gap: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.status.success,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray600,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
    paddingBottom: 100, // Extra space for button
  },
  questionCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 16,
  },
  questionNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    width: 32,
    height: 32,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: Colors.neutral.gray100,
  },
  stepIndicator: {
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: '#D2691E',
  },
  questionContent: {
    width: '100%',
  },
  questionCategory: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 24,
  },
  objectivesCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
  },
  objectivesTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  objectiveNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(246, 163, 69, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  objectiveNumberText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: '#D2691E',
  },
  objectiveText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    flex: 1,
    lineHeight: 20,
  },
  completeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    padding: 16,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 24,
    margin: 16,
    maxWidth: 400,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 24,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.status.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
});

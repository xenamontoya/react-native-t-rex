import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

interface DebriefData {
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

export default function AudioDebriefScreen({ navigation, route }: any) {
  const { id, lessonData: lessonDataParam } = route.params;
  const [lessonData, setLessonData] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Parse lesson data from route parameters
    if (lessonDataParam) {
      try {
        const parsedLessonData = JSON.parse(lessonDataParam);
        setLessonData(parsedLessonData);
      } catch (error) {
        console.error('Error parsing lesson data:', error);
        navigation.goBack();
      }
    }
  }, [lessonDataParam, navigation]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      handleProcessingComplete();
    }, 3000);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    
    // Create mock debrief data
    const debriefData: DebriefData = {
      transcription: "Today's lesson went really well. The student demonstrated excellent control during pattern work and showed good improvement in radio communications. We practiced normal takeoffs and landings, and the student managed the aircraft with confidence. There were a few areas for improvement in altitude control during the base turn, but overall performance was very satisfactory.",
      aiInsights: {
        overallGrade: 'Complete',
        overallNotes: 'Excellent progress demonstrated across all lesson objectives. Strong performance in key areas with good attention to detail and safety procedures.',
        taskGrades: {
          'preflight': 'E',
          'pattern-entry': 'Pr',
          'radio': 'E',
          'takeoff': 'Pr',
          'landing': 'E'
        },
        taskNotes: {
          'preflight': 'Thorough and systematic inspection performed.',
          'pattern-entry': 'Good pattern entry with proper spacing.',
          'radio': 'Clear communications with proper phraseology.',
          'takeoff': 'Smooth takeoff with good directional control.',
          'landing': 'Excellent landing technique demonstrated.'
        },
        flightTimes: {
          'total_time': '1.3',
          'dual_day_local': '1.3',
          'dual_day_landings': '6'
        },
        summary: 'Overall excellent lesson with strong performance in all areas. Student is ready to progress to the next phase of training.'
      }
    };

    // Navigate to lesson grading with AI insights
    const enhancedLessonData = {
      ...lessonData,
      aiDebrief: {
        transcription: debriefData.transcription,
        processedAt: new Date().toISOString(),
        insights: debriefData.aiInsights
      }
    };

    const lessonDataParam = encodeURIComponent(JSON.stringify(enhancedLessonData));
    navigation.navigate('LessonGrading', {
      id: id,
      lessonData: lessonDataParam,
      hasAiInsights: 'true'
    });
  };

  const handleCancel = () => {
    if (isRecording) {
      Alert.alert(
        'Stop Recording?',
        'Are you sure you want to stop the recording? This will discard the current recording.',
        [
          { text: 'Continue Recording', style: 'cancel' },
          { 
            text: 'Stop & Discard', 
            style: 'destructive', 
            onPress: () => {
              setIsRecording(false);
              setRecordingDuration(0);
              navigation.goBack();
            }
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSkipToGrading = () => {
    Alert.alert(
      'Skip Audio Debrief?',
      'You can proceed directly to lesson grading without recording a debrief.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip', 
          onPress: () => {
            const lessonDataParam = encodeURIComponent(JSON.stringify(lessonData));
            navigation.navigate('LessonGrading', {
              id: id,
              lessonData: lessonDataParam
            });
          }
        }
      ]
    );
  };

  if (!lessonData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleCancel}
        >
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Audio Debrief</Text>
          <Text style={styles.headerSubtitle}>{lessonData.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => setShowInstructions(true)}
        >
          <Icon name="questionCircle" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Lesson Info */}
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{lessonData.title}</Text>
          <Text style={styles.studentName}>Student: {lessonData.studentName}</Text>
          <Text style={styles.lessonDetails}>
            {lessonData.duration} • {lessonData.aircraft || 'Aircraft TBD'}
          </Text>
        </View>

        {/* Recording Section */}
        <View style={styles.recordingSection}>
          <View style={styles.recordingIcon}>
            <Icon 
              name="microphone" 
              size={48} 
              color={isRecording ? '#ef4444' : Colors.neutral.gray400} 
            />
          </View>

          <Text style={styles.recordingTitle}>
            {isRecording ? 'Recording Debrief...' : 'Ready to Record'}
          </Text>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingDuration}>
                {formatDuration(recordingDuration)}
              </Text>
            </View>
          )}

          <Text style={styles.recordingDescription}>
            {isRecording 
              ? 'Speak naturally about the lesson performance, areas for improvement, and overall assessment.'
              : 'Tap the record button and provide a verbal debrief of the lesson. The AI will analyze your comments and pre-fill the grading form.'
            }
          </Text>

          {/* Recording Controls */}
          <View style={styles.recordingControls}>
            {!isRecording ? (
              <TouchableOpacity
                style={styles.recordButton}
                onPress={handleStartRecording}
              >
                <Icon name="microphone" size={20} color={Colors.primary.white} />
                <Text style={styles.recordButtonText}>Start Recording</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.stopButton}
                onPress={handleStopRecording}
              >
                <Icon name="stop" size={20} color={Colors.primary.white} />
                <Text style={styles.stopButtonText}>Stop & Process</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Skip Option */}
        <View style={styles.skipSection}>
          <Text style={styles.skipTitle}>Prefer Manual Entry?</Text>
          <Text style={styles.skipDescription}>
            You can skip the audio debrief and go directly to the lesson grading form.
          </Text>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkipToGrading}
          >
            <Text style={styles.skipButtonText}>Skip to Grading</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Processing Modal */}
      <Modal
        visible={isProcessing}
        transparent
        animationType="fade"
      >
        <View style={styles.processingOverlay}>
          <View style={styles.processingModal}>
            <View style={styles.processingIcon}>
              <Icon name="magic" size={32} color={Colors.brand.cyan} />
            </View>
            <Text style={styles.processingTitle}>Processing Audio</Text>
            <Text style={styles.processingDescription}>
              AI is analyzing your debrief and generating lesson insights...
            </Text>
            <View style={styles.processingIndicator}>
              <View style={styles.processingDot} />
              <View style={styles.processingDot} />
              <View style={styles.processingDot} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Instructions Modal */}
      <Modal
        visible={showInstructions}
        transparent
        animationType="slide"
      >
        <View style={styles.instructionsOverlay}>
          <View style={styles.instructionsModal}>
            <View style={styles.instructionsHeader}>
              <Text style={styles.instructionsTitle}>Audio Debrief Instructions</Text>
              <TouchableOpacity
                style={styles.instructionsClose}
                onPress={() => setShowInstructions(false)}
              >
                <Icon name="times" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.instructionsContent}>
              <Text style={styles.instructionsText}>
                The audio debrief helps you quickly grade lessons using AI assistance:
              </Text>
              <View style={styles.instructionsList}>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>1.</Text>
                  <Text style={styles.instructionText}>
                    Record your verbal assessment of the student's performance
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>2.</Text>
                  <Text style={styles.instructionText}>
                    Mention specific maneuvers, areas of strength, and improvement areas
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>3.</Text>
                  <Text style={styles.instructionText}>
                    AI will analyze your comments and pre-fill grades and notes
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>4.</Text>
                  <Text style={styles.instructionText}>
                    Review and adjust the AI-generated assessment as needed
                  </Text>
                </View>
              </View>
              <Text style={styles.instructionsTip}>
                <Text style={styles.tipLabel}>Tip:</Text> Speak clearly and mention flight times, 
                number of landings, and specific task performance for best AI analysis.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
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
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  helpButton: {
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
  contentContainer: {
    padding: 24,
  },
  lessonInfo: {
    backgroundColor: Colors.neutral.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  lessonTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  studentName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.brand.cyan,
    marginBottom: 4,
  },
  lessonDetails: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  recordingSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  recordingIcon: {
    width: 120,
    height: 120,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  recordingTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 16,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recordingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  recordingDuration: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.mono,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  recordingDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  recordingControls: {
    width: '100%',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  recordButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  stopButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  skipSection: {
    backgroundColor: Colors.neutral.gray50,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  skipTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  skipDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 8,
  },
  skipButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  processingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  processingModal: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 280,
  },
  processingIcon: {
    width: 64,
    height: 64,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  processingTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  processingDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  processingIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  processingDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.brand.cyan,
    borderRadius: 4,
  },
  instructionsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  instructionsModal: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    maxHeight: '80%',
    width: '100%',
    maxWidth: 400,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  instructionsClose: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContent: {
    padding: 20,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 16,
  },
  instructionsList: {
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  instructionBullet: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.brand.cyan,
    marginRight: 12,
    minWidth: 20,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  instructionsTip: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    backgroundColor: Colors.brand.cyan + '10',
    padding: 12,
    borderRadius: 8,
  },
  tipLabel: {
    fontFamily: Typography.fontFamily.bold,
    color: Colors.brand.cyan,
  },
});
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Colors, Typography } from '../../components/src';

interface LessonTask {
  id: string;
  title: string;
  category: string;
  grade?: 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG';
  notes?: string;
  required: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  overview?: string;
  status: 'completed' | 'scheduled' | 'pending' | 'not scheduled' | 'cancelled';
  date?: string;
  duration: string;
  learningObjectives?: LessonTask[];
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  instructorNotes?: string;
  reservationId?: string;
  studentName?: string;
  aircraft?: string;
  startTime?: string;
  endTime?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  aiDebrief?: {
    transcription: string;
    audioBlob: any;
    processedAt: string;
    insights: {
      overallGrade: 'Complete' | 'Not Complete' | 'Incomplete';
      overallNotes: string;
      taskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
      taskNotes: Record<string, string>;
      flightTimes: Record<string, string>;
      summary: string;
    };
  };
}

const GRADE_OPTIONS = ['D', 'E', 'Pr', 'Pe', 'M', 'NG'];
const OVERALL_GRADE_OPTIONS = ['Complete', 'Not Complete', 'Incomplete'];

export default function LessonGradingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [taskGrades, setTaskGrades] = useState<Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>>({});
  const [taskNotes, setTaskNotes] = useState<Record<string, string>>({});
  const [overallGrade, setOverallGrade] = useState<'Complete' | 'Not Complete' | 'Incomplete'>('Not Complete');
  const [overallNotes, setOverallNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAllTimeFields, setShowAllTimeFields] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Flight time tracking state
  const [flightTimes, setFlightTimes] = useState({
    total_time: '',
    dual_day_local: '',
    dual_night_local: '',
    solo_day_local: '',
    solo_night_local: '',
    dual_day_xc: '',
    dual_night_xc: '',
    solo_day_xc: '',
    solo_night_xc: '',
    instrument_actual: '',
    instrument_hood: '',
    instrument_xc: '',
    dual_day_landings: '',
    dual_night_landings: '',
    solo_day_landings: '',
    solo_night_landings: '',
    ground: ''
  });

  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  // Generate comprehensive tasks based on lesson title
  const getComprehensiveTasksForLesson = (lessonTitle: string): LessonTask[] => {
    const commonTasks = [
      {
        id: 'preflight',
        title: 'Preflight Inspection',
        category: 'Ground Operations',
        required: true
      },
      {
        id: 'weather',
        title: 'Weather Analysis',
        category: 'Ground Operations', 
        required: true
      },
      {
        id: 'radio',
        title: 'Radio Communications',
        category: 'Communications',
        required: true
      },
      {
        id: 'taxi',
        title: 'Taxi Operations',
        category: 'Ground Operations',
        required: true
      }
    ];

    // Add lesson-specific tasks based on title
    if (lessonTitle.toLowerCase().includes('basic maneuvers')) {
      return [
        ...commonTasks,
        {
          id: 'straight-level',
          title: 'Straight and Level Flight',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'climbs',
          title: 'Climbs',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'descents',
          title: 'Descents',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'turns',
          title: 'Level Turns',
          category: 'Basic Maneuvers',
          required: true
        },
        {
          id: 'power-management',
          title: 'Power Management',
          category: 'Basic Maneuvers',
          required: true
        }
      ];
    }

    if (lessonTitle.toLowerCase().includes('traffic pattern')) {
      return [
        ...commonTasks,
        {
          id: 'pattern-entry',
          title: 'Pattern Entry',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'downwind',
          title: 'Downwind Leg',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'base-turn',
          title: 'Base Turn',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'final-approach',
          title: 'Final Approach',
          category: 'Traffic Pattern',
          required: true
        },
        {
          id: 'landing',
          title: 'Landing',
          category: 'Traffic Pattern',
          required: true
        }
      ];
    }

    if (lessonTitle.toLowerCase().includes('emergency')) {
      return [
        ...commonTasks,
        {
          id: 'emergency-descent',
          title: 'Emergency Descent',
          category: 'Emergency Procedures',
          required: true
        },
        {
          id: 'engine-failure',
          title: 'Simulated Engine Failure',
          category: 'Emergency Procedures',
          required: true
        },
        {
          id: 'forced-landing',
          title: 'Forced Landing Procedures',
          category: 'Emergency Procedures',
          required: true
        },
        {
          id: 'emergency-checklist',
          title: 'Emergency Checklist Usage',
          category: 'Emergency Procedures',
          required: true
        }
      ];
    }

    // Default comprehensive task set
    return [
      ...commonTasks,
      {
        id: 'airwork',
        title: 'General Airwork',
        category: 'Flight Maneuvers',
        required: true
      },
      {
        id: 'navigation',
        title: 'Navigation Skills',
        category: 'Navigation',
        required: false
      }
    ];
  };

  useEffect(() => {
    try {
      const params = route.params as any;
      const { id, lessonData: lessonDataParam, hasAiInsights } = params || {};
      
      if (lessonDataParam && typeof lessonDataParam === 'string') {
        const parsedLesson = JSON.parse(decodeURIComponent(lessonDataParam));
        
        // If lesson doesn't have learningObjectives, add comprehensive task assessment
        if (!parsedLesson.learningObjectives || parsedLesson.learningObjectives.length === 0) {
          parsedLesson.learningObjectives = getComprehensiveTasksForLesson(parsedLesson.title);
        }
        
        setLesson(parsedLesson);
        
        // Check for AI insights and pre-fill form data
        if (hasAiInsights === true || hasAiInsights === 'true') {
          setOverallGrade('Complete');
          setOverallNotes('Excellent progress demonstrated across all lesson objectives. Strong performance in key areas with good attention to detail and safety procedures.');
          
          // Create demo task grades and notes
          const demoTaskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'> = {};
          const demoTaskNotes: Record<string, string> = {};
          
          if (parsedLesson.learningObjectives) {
            parsedLesson.learningObjectives.forEach((objective: any) => {
              const gradeOptions = ['E', 'Pr', 'Pr', 'E', 'M'];
              const randomGrade = gradeOptions[Math.floor(Math.random() * gradeOptions.length)] as 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG';
              demoTaskGrades[objective.id] = randomGrade;
              
              const title = objective.title.toLowerCase();
              if (title.includes('preflight') || title.includes('inspection')) {
                demoTaskNotes[objective.id] = 'Thorough and systematic inspection performed with excellent attention to safety protocols.';
              } else if (title.includes('weather')) {
                demoTaskNotes[objective.id] = 'Comprehensive weather analysis demonstrated with good risk assessment skills.';
              } else if (title.includes('radio') || title.includes('communication')) {
                demoTaskNotes[objective.id] = 'Clear, professional communication with proper phraseology and good situational awareness.';
              } else if (title.includes('taxi')) {
                demoTaskNotes[objective.id] = 'Smooth control inputs and excellent ground handling skills demonstrated throughout.';
              } else if (title.includes('climb')) {
                demoTaskNotes[objective.id] = 'Proper climb technique with good airspeed control and engine management.';
              } else if (title.includes('descent')) {
                demoTaskNotes[objective.id] = 'Controlled descents with appropriate power management and airspeed control.';
              } else if (title.includes('turn')) {
                demoTaskNotes[objective.id] = 'Good coordination demonstrated, continue working on altitude maintenance during turns.';
              } else if (title.includes('landing')) {
                demoTaskNotes[objective.id] = 'Smooth touchdown with good directional control and appropriate flare timing.';
              } else if (title.includes('pattern')) {
                demoTaskNotes[objective.id] = 'Excellent pattern work with proper spacing and altitude control demonstrated.';
              } else if (title.includes('emergency')) {
                demoTaskNotes[objective.id] = 'Quick recognition and proper execution of emergency procedures with good decision-making.';
              } else {
                demoTaskNotes[objective.id] = 'Good overall performance with consistent technique and attention to detail shown.';
              }
            });
          }
          
          setTaskGrades(demoTaskGrades);
          setTaskNotes(demoTaskNotes);
          
          // Set demo flight times
          setFlightTimes(prev => ({ 
            ...prev, 
            'total_time': '1.3',
            'dual_day_local': '1.3',
            'dual_day_landings': '6'
          }));
        }
        
      } else {
        // Fallback lesson data
        setLesson({
          id: id || '1',
          title: 'Basic Maneuvers',
          description: 'Fundamental flight maneuvers and aircraft control',
          status: 'scheduled',
          duration: '2.0 hours',
          studentName: 'Alex Johnson',
          learningObjectives: getComprehensiveTasksForLesson('Basic Maneuvers')
        });
      }
    } catch (error) {
      console.error('Error parsing lesson data:', error);
      setLesson({
        id: '1',
        title: 'Basic Maneuvers',
        description: 'Fundamental flight maneuvers and aircraft control',
        status: 'scheduled',
        duration: '2.0 hours',
        studentName: 'Alex Johnson',
        learningObjectives: getComprehensiveTasksForLesson('Basic Maneuvers')
      });
    } finally {
      setLoading(false);
    }
  }, [route.params]);

  // Auto-calculate total time when individual time fields change
  useEffect(() => {
    const totalDualTime = [
      parseFloat(flightTimes.dual_day_local || '0'),
      parseFloat(flightTimes.dual_night_local || '0'),
      parseFloat(flightTimes.dual_day_xc || '0'),
      parseFloat(flightTimes.dual_night_xc || '0')
    ].reduce((sum, time) => sum + time, 0);

    const totalSoloTime = [
      parseFloat(flightTimes.solo_day_local || '0'),
      parseFloat(flightTimes.solo_night_local || '0'),
      parseFloat(flightTimes.solo_day_xc || '0'),
      parseFloat(flightTimes.solo_night_xc || '0')
    ].reduce((sum, time) => sum + time, 0);

    const calculatedTotal = totalDualTime + totalSoloTime;
    
    if (calculatedTotal > 0 && (!flightTimes.total_time || flightTimes.total_time === '0' || flightTimes.total_time === '')) {
      setFlightTimes(prev => ({
        ...prev,
        total_time: calculatedTotal.toFixed(1)
      }));
    }
  }, [
    flightTimes.dual_day_local,
    flightTimes.dual_night_local,
    flightTimes.dual_day_xc,
    flightTimes.dual_night_xc,
    flightTimes.solo_day_local,
    flightTimes.solo_night_local,
    flightTimes.solo_day_xc,
    flightTimes.solo_night_xc
  ]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'scheduled':
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'pending':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'not scheduled':
        return { backgroundColor: '#f3f4f6', color: '#374151' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const handleSaveLesson = () => {
    if (!lesson) {
      return;
    }
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Auto close and navigate after 2 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      const updatedLesson = {
        ...lesson,
        status: 'completed' as const,
        overallGrade,
        overallNotes,
        taskGrades,
        taskNotes
      };
      
      // Navigate to lesson details with updated data
      const lessonDataParam = encodeURIComponent(JSON.stringify(updatedLesson));
      navigation.navigate('LessonDetails' as never, {
        id: lesson.id,
        lessonData: lessonDataParam,
        role: 'instructor'
      } as never);
    }, 2000);
  };

  const renderQuickTimeFields = () => {
    const titleText = (lesson?.title || '').toLowerCase();
    const descriptionText = (lesson?.description || '').toLowerCase();
    const isNight = titleText.includes('night') || descriptionText.includes('night');
    const isSolo = titleText.includes('solo') || descriptionText.includes('solo');
    const isXc = titleText.includes('xc') || titleText.includes('cross country') || descriptionText.includes('cross country');
    const isInstrument = titleText.includes('instrument') || descriptionText.includes('instrument') || descriptionText.includes('ifr');

    return (
      <View style={styles.timeFieldsGrid}>
        {/* Total Time */}
        <View style={styles.timeField}>
          <Text style={styles.timeFieldLabel}>Total Time</Text>
          <TextInput
            style={styles.timeFieldInput}
            value={flightTimes.total_time}
            onChangeText={(text) => setFlightTimes(prev => ({ ...prev, total_time: text }))}
            placeholder="0.0"
            keyboardType="numeric"
          />
        </View>

        {/* Ground / Discussion */}
        <View style={styles.timeField}>
          <Text style={styles.timeFieldLabel}>Ground / Discussion</Text>
          <TextInput
            style={styles.timeFieldInput}
            value={flightTimes.ground}
            onChangeText={(text) => setFlightTimes(prev => ({ ...prev, ground: text }))}
            placeholder="0.0"
            keyboardType="numeric"
          />
        </View>

        {/* Context-based time field */}
        <View style={styles.timeField}>
          <Text style={styles.timeFieldLabel}>
            {isSolo && isNight ? 'Solo Night Local' :
             isSolo && !isNight ? 'Solo Day Local' :
             !isSolo && isNight ? 'Dual Night Local' :
             'Dual Day Local'}
          </Text>
          <TextInput
            style={styles.timeFieldInput}
            value={
              isSolo && isNight ? flightTimes.solo_night_local :
              isSolo && !isNight ? flightTimes.solo_day_local :
              !isSolo && isNight ? flightTimes.dual_night_local :
              flightTimes.dual_day_local
            }
            onChangeText={(text) => {
              const field = isSolo && isNight ? 'solo_night_local' :
                          isSolo && !isNight ? 'solo_day_local' :
                          !isSolo && isNight ? 'dual_night_local' :
                          'dual_day_local';
              setFlightTimes(prev => ({ ...prev, [field]: text }));
            }}
            placeholder="0.0"
            keyboardType="numeric"
          />
        </View>

        {/* Context-based landings field */}
        <View style={styles.timeField}>
          <Text style={styles.timeFieldLabel}>
            {isSolo && isNight ? 'Solo Night Landings' :
             isSolo && !isNight ? 'Solo Day Landings' :
             !isSolo && isNight ? 'Dual Night Landings' :
             'Dual Day Landings'}
          </Text>
          <TextInput
            style={styles.timeFieldInput}
            value={
              isSolo && isNight ? flightTimes.solo_night_landings :
              isSolo && !isNight ? flightTimes.solo_day_landings :
              !isSolo && isNight ? flightTimes.dual_night_landings :
              flightTimes.dual_day_landings
            }
            onChangeText={(text) => {
              const field = isSolo && isNight ? 'solo_night_landings' :
                          isSolo && !isNight ? 'solo_day_landings' :
                          !isSolo && isNight ? 'dual_night_landings' :
                          'dual_day_landings';
              setFlightTimes(prev => ({ ...prev, [field]: text }));
            }}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        {/* Instrument field if relevant */}
        {isInstrument && (
          <View style={styles.timeField}>
            <Text style={styles.timeFieldLabel}>Instrument (Actual)</Text>
            <TextInput
              style={styles.timeFieldInput}
              value={flightTimes.instrument_actual}
              onChangeText={(text) => setFlightTimes(prev => ({ ...prev, instrument_actual: text }))}
              placeholder="0.0"
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Cross Country field if relevant */}
        {isXc && (
          <View style={styles.timeField}>
            <Text style={styles.timeFieldLabel}>
              {isSolo ? 'Solo Day XC' : 'Dual Day XC'}
            </Text>
            <TextInput
              style={styles.timeFieldInput}
              value={isSolo ? flightTimes.solo_day_xc : flightTimes.dual_day_xc}
              onChangeText={(text) => {
                const field = isSolo ? 'solo_day_xc' : 'dual_day_xc';
                setFlightTimes(prev => ({ ...prev, [field]: text }));
              }}
              placeholder="0.0"
              keyboardType="numeric"
            />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Lesson not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Return to Training</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Log Lesson</Text>
            <Text style={styles.headerSubtitle}>{lesson.title}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={() => setShowDropdown(!showDropdown)}
          style={styles.menuButton}
        >
          <Icon name="ellipsisV" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Lesson Header */}
          <View style={styles.lessonHeader}>
            <View style={styles.lessonHeaderContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              {lesson.studentName && (
                <Text style={styles.studentName}>Student: {lesson.studentName}</Text>
              )}
            </View>
            <View style={[styles.statusBadge, getStatusBadgeStyle(lesson.status)]}>
              <Text style={[styles.statusBadgeText, { color: getStatusBadgeStyle(lesson.status).color }]}>
                {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
              </Text>
            </View>
          </View>

          {/* Lesson Information */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Lesson Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Icon name="calendar" size={16} color={Colors.neutral.gray500} />
                <Text style={styles.infoText}>{lesson.date || 'Date TBD'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="clock" size={16} color={Colors.neutral.gray500} />
                <Text style={styles.infoText}>{lesson.duration}</Text>
              </View>
              {lesson.aircraft && (
                <View style={styles.infoItem}>
                  <Icon name="graduation" size={16} color={Colors.neutral.gray500} />
                  <Text style={styles.infoText}>{lesson.aircraft}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Overview Section */}
          {lesson.overview && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Overview</Text>
              <Text style={styles.overviewText}>{lesson.overview}</Text>
            </View>
          )}

          {/* Learning Objectives Assessment */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Learning Objectives Assessment</Text>
            <View style={styles.objectivesContainer}>
              {(lesson.learningObjectives || []).map((objective, index) => (
                <View key={objective.id} style={[styles.objectiveItem, index < (lesson.learningObjectives?.length || 0) - 1 && styles.objectiveItemBorder]}>
                  {/* Objective Title */}
                  <View style={styles.objectiveHeader}>
                    <Text style={styles.objectiveTitle}>{objective.title}</Text>
                    <View style={styles.objectiveMeta}>
                      <Text style={styles.objectiveCategory}>{objective.category}</Text>
                      {objective.required && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredBadgeText}>Required</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Grade Selection */}
                  <View style={styles.gradeSection}>
                    <Text style={styles.gradeLabel}>Grade</Text>
                    <View style={styles.gradeButtons}>
                      {GRADE_OPTIONS.map((grade) => (
                        <TouchableOpacity
                          key={grade}
                          onPress={() => setTaskGrades(prev => ({ ...prev, [objective.id]: grade as any }))}
                          style={[
                            styles.gradeButton,
                            taskGrades[objective.id] === grade && styles.gradeButtonSelected
                          ]}
                        >
                          <Text style={[
                            styles.gradeButtonText,
                            taskGrades[objective.id] === grade && styles.gradeButtonTextSelected
                          ]}>
                            {grade}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <Text style={styles.gradeHint}>
                      D = Deficient, E = Excellent, Pr = Proficient, Pe = Performed, M = Marginal, NG = No Grade
                    </Text>
                  </View>

                  {/* Notes */}
                  <View style={styles.notesSection}>
                    <Text style={styles.notesLabel}>Notes</Text>
                    <TextInput
                      style={styles.notesInput}
                      value={taskNotes[objective.id] || ''}
                      onChangeText={(text) => setTaskNotes(prev => ({ ...prev, [objective.id]: text }))}
                      placeholder="Add notes for this learning objective..."
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* AI Debrief Information */}
          {lesson.aiDebrief && (
            <View style={styles.aiDebriefCard}>
              <View style={styles.aiDebriefHeader}>
                <View style={styles.aiDebriefIcon}>
                  <Icon name="microphone" size={16} color={Colors.brand.blueAzure} />
                </View>
                <View style={styles.aiDebriefContent}>
                  <Text style={styles.aiDebriefTitle}>AI-Generated Insights</Text>
                  <Text style={styles.aiDebriefText}>
                    This form has been pre-filled with insights from your audio debrief. Review and adjust as needed.
                  </Text>
                  <Text style={styles.aiDebriefTimestamp}>
                    Processed: {new Date(lesson.aiDebrief.processedAt).toLocaleString()}
                  </Text>
                  {lesson.aiDebrief.insights?.summary && (
                    <View style={styles.aiSummaryCard}>
                      <Text style={styles.aiSummaryTitle}>Debrief Summary</Text>
                      <Text style={styles.aiSummaryText}>{lesson.aiDebrief.insights.summary}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Flight Time Tracking */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hours and Experience</Text>

            {/* Quick Entry */}
            {!showAllTimeFields && (
              <View style={styles.timeSection}>
                <Text style={styles.timeSectionTitle}>Quick Entry</Text>
                {renderQuickTimeFields()}
                <TouchableOpacity
                  onPress={() => setShowAllTimeFields(true)}
                  style={styles.addMoreButton}
                >
                  <Icon name="plus" size={16} color={Colors.brand.blueAzure} />
                  <Text style={styles.addMoreText}>Add More</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Full Entry */}
            {showAllTimeFields && (
              <View style={styles.timeSection}>
                {/* All time fields would be rendered here */}
                <Text style={styles.timeSectionTitle}>Detailed Entry</Text>
                {/* For brevity, showing condensed version - full implementation would include all fields */}
                {renderQuickTimeFields()}
                <TouchableOpacity
                  onPress={() => setShowAllTimeFields(false)}
                  style={styles.addMoreButton}
                >
                  <Icon name="minus" size={16} color={Colors.brand.blueAzure} />
                  <Text style={styles.addMoreText}>Show Less</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Overall Assessment */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Overall Assessment</Text>
            
            <View style={styles.overallGradeSection}>
              <Text style={styles.overallGradeLabel}>Lesson Grade and Status</Text>
              <View style={styles.overallGradeButtons}>
                {OVERALL_GRADE_OPTIONS.map((gradeOption) => (
                  <TouchableOpacity
                    key={gradeOption}
                    onPress={() => setOverallGrade(gradeOption as any)}
                    style={[
                      styles.overallGradeButton,
                      overallGrade === gradeOption && styles.overallGradeButtonSelected
                    ]}
                  >
                    <Text style={[
                      styles.overallGradeButtonText,
                      overallGrade === gradeOption && styles.overallGradeButtonTextSelected
                    ]}>
                      {gradeOption}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.overallNotesSection}>
              <Text style={styles.overallNotesLabel}>Overall Instructor Notes</Text>
              <TextInput
                style={styles.overallNotesInput}
                value={overallNotes}
                onChangeText={setOverallNotes}
                placeholder="Add overall notes about the student's performance, areas for improvement, etc."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity onPress={handleSaveLesson} style={styles.saveButton}>
          <Icon name="save" size={16} color={Colors.brand.cyan} />
          <Text style={styles.saveButtonText}>Save Lesson</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {showDropdown && (
        <Modal transparent animationType="fade">
          <TouchableOpacity 
            style={styles.dropdownOverlay}
            onPress={() => setShowDropdown(false)}
          >
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>Save Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>Reset Form</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.successModalIcon}>
              <Icon name="check" size={24} color={Colors.primary.white} />
            </View>
            <Text style={styles.successModalTitle}>Lesson Saved Successfully!</Text>
            <Text style={styles.successModalText}>The lesson has been marked as complete.</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
    paddingBottom: 100,
  },
  lessonHeader: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonHeaderContent: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  studentName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.brand.blueAzure,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
  },
  infoCard: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  overviewText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  objectivesContainer: {
    gap: 24,
  },
  objectiveItem: {
    paddingBottom: 24,
  },
  objectiveItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  objectiveHeader: {
    marginBottom: 12,
  },
  objectiveTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  objectiveMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  objectiveCategory: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  requiredBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  requiredBadgeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: '#1e40af',
  },
  gradeSection: {
    marginBottom: 12,
  },
  gradeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  gradeButtons: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  gradeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: Colors.neutral.gray100,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
  },
  gradeButtonSelected: {
    backgroundColor: '#212121',
    borderColor: '#212121',
  },
  gradeButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  gradeButtonTextSelected: {
    color: Colors.primary.white,
  },
  gradeHint: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 4,
  },
  notesSection: {},
  notesLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    textAlignVertical: 'top',
    minHeight: 60,
  },
  aiDebriefCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  aiDebriefHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  aiDebriefIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiDebriefContent: {
    flex: 1,
  },
  aiDebriefTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: '#1e3a8a',
    marginBottom: 8,
  },
  aiDebriefText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#1e40af',
    marginBottom: 8,
    lineHeight: 20,
  },
  aiDebriefTimestamp: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#2563eb',
  },
  aiSummaryCard: {
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 6,
    padding: 12,
    marginTop: 12,
  },
  aiSummaryTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: '#1e3a8a',
    marginBottom: 4,
  },
  aiSummaryText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#1e40af',
    lineHeight: 20,
  },
  timeSection: {
    marginBottom: 16,
  },
  timeSectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 16,
  },
  timeFieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  timeField: {
    width: '48%',
  },
  timeFieldLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 4,
  },
  timeFieldInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  addMoreText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.brand.blueAzure,
  },
  overallGradeSection: {
    marginBottom: 16,
  },
  overallGradeLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  overallGradeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  overallGradeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
  },
  overallGradeButtonSelected: {
    backgroundColor: '#212121',
    borderWidth: 2,
    borderColor: '#212121',
  },
  overallGradeButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray600,
  },
  overallGradeButtonTextSelected: {
    color: Colors.primary.white,
  },
  overallNotesSection: {},
  overallNotesLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  overallNotesInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    padding: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  dropdownMenu: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    minWidth: 200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 8,
    padding: 24,
    margin: 16,
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  },
  successModalIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.status.success,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successModalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
    textAlign: 'center',
  },
  successModalText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
});

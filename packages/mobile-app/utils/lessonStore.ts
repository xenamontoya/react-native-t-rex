import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LessonUpdate {
  id: string;
  status?: 'completed' | 'pending' | 'scheduled' | 'cancelled';
  overallGrade?: 'Complete' | 'Not Complete' | 'Incomplete';
  overallNotes?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  gradedAt?: string;
  aiDebrief?: {
    transcription: string;
    processedAt: string;
    insights: {
      overallGrade: string;
      overallNotes: string;
      taskGrades: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
      taskNotes: Record<string, string>;
      flightTimes: Record<string, string>;
      summary: string;
    };
  };
}

interface LessonStore {
  lessonUpdates: Record<string, LessonUpdate>;
  isInitialized: boolean;
  updateLesson: (lessonId: string, updates: Partial<LessonUpdate>) => void;
  getLessonUpdate: (lessonId: string) => LessonUpdate | null;
  clearLessonUpdate: (lessonId: string) => void;
  clearAllUpdates: () => void;
  addDummyDebriefData: () => void;
  initializeStore: () => void;
}

const LESSON_STORAGE_KEY = 'lesson-updates';

// Helper functions for AsyncStorage
const loadLessonsFromStorage = async (): Promise<Record<string, LessonUpdate>> => {
  try {
    const stored = await AsyncStorage.getItem(LESSON_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    }
  } catch (error) {
    console.error('Error loading lessons from AsyncStorage:', error);
  }
  return {};
};

const saveLessonsToStorage = async (lessons: Record<string, LessonUpdate>): Promise<void> => {
  try {
    await AsyncStorage.setItem(LESSON_STORAGE_KEY, JSON.stringify(lessons));
  } catch (error) {
    console.error('Error saving lessons to AsyncStorage:', error);
  }
};

export const useLessonStore = create<LessonStore>((set, get) => ({
  lessonUpdates: {},
  isInitialized: false,

  updateLesson: (lessonId: string, updates: Partial<LessonUpdate>) => {
    set((state) => {
      const updatedLessons = {
        ...state.lessonUpdates,
        [lessonId]: {
          ...state.lessonUpdates[lessonId],
          id: lessonId,
          ...updates,
          gradedAt: new Date().toISOString()
        }
      };
      saveLessonsToStorage(updatedLessons);
      return { lessonUpdates: updatedLessons };
    });
  },

  getLessonUpdate: (lessonId: string) => {
    const updates = get().lessonUpdates;
    return updates[lessonId] || null;
  },

  clearLessonUpdate: (lessonId: string) => {
    set((state) => {
      const newUpdates = { ...state.lessonUpdates };
      delete newUpdates[lessonId];
      saveLessonsToStorage(newUpdates);
      return { lessonUpdates: newUpdates };
    });
  },

  clearAllUpdates: () => {
    set({ lessonUpdates: {} });
    saveLessonsToStorage({});
  },

  addDummyDebriefData: () => {
    const dummyDebriefs = {
      // Sample completed lesson 1 - Basic Maneuvers
      'lesson-1': {
        id: 'lesson-1',
        status: 'completed' as const,
        overallGrade: 'Complete' as const,
        overallNotes: 'Excellent progress on basic maneuvers. Good altitude control and smooth coordination.',
        taskGrades: {
          'preflight': 'E' as const,
          'weather': 'E' as const,
          'radio': 'Pr' as const,
          'straight-level': 'Pr' as const,
          'turns': 'M' as const,
          'landing': 'Pr' as const
        },
        taskNotes: {
          'preflight': 'Thorough and systematic inspection with excellent attention to detail.',
          'weather': 'Good weather analysis and decision-making demonstrated.',
          'radio': 'Clear communication, continue working on phraseology consistency.',
          'straight-level': 'Good aircraft control with consistent altitude maintenance.',
          'turns': 'Coordination improving, focus on altitude during steep turns.',
          'landing': 'Nice approach and smooth touchdown, good directional control.'
        },
        gradedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        aiDebrief: {
          transcription: 'Great lesson today! You really showed excellent progress across all the basic maneuvers. Your preflight was thorough and systematic - I could tell you\'re developing good habits there. The weather briefing was comprehensive, and you made good decisions about the flight conditions. During the flight, your straight and level work was solid with good altitude control. The steep turns are coming along well, though we\'ll keep working on maintaining altitude precision. Your radio work was clear and professional. The landing was really nice - good approach stabilization and smooth touchdown with excellent directional control. Overall, you\'re making excellent progress and I\'m pleased with your development as a pilot.',
          processedAt: new Date(Date.now() - 86400000).toISOString(),
          insights: {
            overallGrade: 'Complete',
            overallNotes: 'Excellent progress on basic maneuvers with strong fundamental skills development.',
            summary: 'Outstanding lesson demonstrating solid progress in aircraft control, communication, and safety procedures. Continue focus on steep turn precision.',
            taskGrades: {
              'preflight': 'E' as const,
              'weather': 'E' as const,
              'radio': 'Pr' as const,
              'straight-level': 'Pr' as const,
              'turns': 'M' as const,
              'landing': 'Pr' as const
            },
            taskNotes: {
              'preflight': 'Thorough and systematic inspection with excellent attention to detail and safety procedures.',
              'weather': 'Good weather analysis and decision-making demonstrated throughout planning phase.',
              'radio': 'Clear communication skills, continue working on phraseology consistency and confidence.',
              'straight-level': 'Good aircraft control with consistent altitude maintenance and heading accuracy.',
              'turns': 'Coordination improving nicely, focus on altitude maintenance during steep turns.',
              'landing': 'Nice approach stabilization and smooth touchdown with excellent directional control.'
            },
            flightTimes: {
              'total_time': '1.2',
              'dual_day_local': '1.2',
              'dual_day_landings': '5'
            }
          }
        }
      },
      
      // Sample completed lesson 2 - Traffic Pattern
      'lesson-2': {
        id: 'lesson-2',
        status: 'completed' as const,
        overallGrade: 'Complete' as const,
        overallNotes: 'Strong traffic pattern work with consistent approach management.',
        taskGrades: {
          'preflight': 'Pr' as const,
          'radio': 'E' as const,
          'pattern-entry': 'E' as const,
          'downwind': 'Pr' as const,
          'base-turn': 'Pr' as const,
          'final-approach': 'E' as const,
          'landing': 'Pr' as const
        },
        taskNotes: {
          'preflight': 'Good inspection routine, continue developing efficiency.',
          'radio': 'Excellent communication with tower and traffic awareness.',
          'pattern-entry': 'Perfect pattern entry with good traffic scanning.',
          'downwind': 'Good spacing and altitude control on downwind leg.',
          'base-turn': 'Nice timing on base turn with appropriate wind correction.',
          'final-approach': 'Excellent approach stabilization and energy management.',
          'landing': 'Consistent landings with good flare technique.'
        },
        gradedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        aiDebrief: {
          transcription: 'Excellent traffic pattern work today! Your pattern entries were spot-on with great traffic awareness. Radio communications were professional and clear - really good situational awareness. On downwind, you maintained excellent spacing and altitude control. Your base turns were well-timed with good wind correction. The approaches were stabilized and your energy management was excellent. Multiple good landings with consistent technique and nice flare timing. You\'re really developing good traffic pattern discipline and your landings are becoming very consistent. Keep up the great work!',
          processedAt: new Date(Date.now() - 172800000).toISOString(),
          insights: {
            overallGrade: 'Complete',
            overallNotes: 'Strong traffic pattern work with excellent approach management and consistent landings.',
            summary: 'Excellent lesson showing mastery of traffic pattern procedures, communication, and landing consistency.',
            taskGrades: {
              'preflight': 'Pr' as const,
              'radio': 'E' as const,
              'pattern-entry': 'E' as const,
              'downwind': 'Pr' as const,
              'base-turn': 'Pr' as const,
              'final-approach': 'E' as const,
              'landing': 'Pr' as const
            },
            taskNotes: {
              'preflight': 'Good inspection routine, continue developing efficiency and consistency.',
              'radio': 'Excellent communication with tower and traffic awareness demonstrated.',
              'pattern-entry': 'Perfect pattern entry procedures with excellent traffic scanning.',
              'downwind': 'Good spacing and altitude control maintained throughout downwind leg.',
              'base-turn': 'Nice timing on base turn with appropriate wind correction applied.',
              'final-approach': 'Excellent approach stabilization and energy management skills.',
              'landing': 'Consistent landings with good flare technique and directional control.'
            },
            flightTimes: {
              'total_time': '1.0',
              'dual_day_local': '1.0',
              'dual_day_landings': '8'
            }
          }
        }
      },
      
      // Alex Johnson Completed Lessons (Instructor Training)
      'l1': {
        id: 'l1',
        status: 'completed' as const,
        overallGrade: 'Complete' as const,
        overallNotes: 'Alex demonstrated excellent understanding of basic FAR regulations and airspace requirements.',
        taskGrades: {
          'l1-t1': 'M' as const,
          'l1-t2': 'Pe' as const,
          'l1-t3': 'Pe' as const,
          'l1-t4': 'Pr' as const
        },
        taskNotes: {
          'l1-t1': 'Excellent grasp of fundamental regulations',
          'l1-t2': 'Solid knowledge of standard operating procedures',
          'l1-t3': 'Good understanding, minor review needed on Class B procedures',
          'l1-t4': 'Needs more practice with VFR minimums calculations'
        },
        gradedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        aiDebrief: {
          transcription: 'Excellent ground school session today, Alex! You really showed strong understanding of the Federal Aviation Regulations. Your knowledge of airspace requirements was impressive, and you asked thoughtful questions about airport operations. The discussion about weather minimums was good, though we\'ll continue working on VFR calculations. Overall, you\'re well-prepared to progress to flight training.',
          processedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          insights: {
            overallGrade: 'Complete',
            overallNotes: 'Strong regulatory knowledge foundation with excellent preparation for flight training.',
            summary: 'Outstanding ground school performance demonstrating solid understanding of aviation regulations.',
            taskGrades: {
              'far-basics': 'M' as const,
              'airport-operations': 'Pe' as const,
              'airspace-classification': 'Pe' as const,
              'weather-minimums': 'Pr' as const
            },
            taskNotes: {
              'far-basics': 'Mastery of fundamental regulations and their applications',
              'airport-operations': 'Good knowledge of standard airport operating procedures',
              'airspace-classification': 'Solid airspace understanding, review Class B requirements',
              'weather-minimums': 'Continue practicing weather minimums calculations'
            },
            flightTimes: {
              'ground': '2.0'
            }
          }
        }
      },
      
      'l2': {
        id: 'l2',
        status: 'completed' as const,
        overallGrade: 'Complete' as const,
        overallNotes: 'Great first flight! Alex showed natural aptitude for aircraft control.',
        taskGrades: {
          'l2-t1': 'Pe' as const,
          'l2-t2': 'Pe' as const,
          'l2-t3': 'Pr' as const,
          'l2-t4': 'Pe' as const,
          'l2-t5': 'Pr' as const,
          'l2-t6': 'Pe' as const
        },
        taskNotes: {
          'l2-t1': 'Methodical approach, caught all major items',
          'l2-t2': 'Good checklist discipline from the start',
          'l2-t3': 'Natural feel for control inputs, coordinated movements',
          'l2-t4': 'Followed procedures well with minimal guidance',
          'l2-t5': 'Good directional control, maintained centerline',
          'l2-t6': 'Clear communications, proper phraseology'
        },
        gradedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        aiDebrief: {
          transcription: 'Fantastic first flight, Alex! You demonstrated natural aptitude for aircraft control and were very attentive to instruction. Your preflight inspection was thorough after initial guidance. I was impressed with your coordination during basic control inputs and how you maintained situational awareness throughout the flight. Your radio work was clear and professional.',
          processedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
          insights: {
            overallGrade: 'Complete',
            overallNotes: 'Outstanding first flight with natural aircraft control and strong attention to detail.',
            summary: 'Excellent introduction flight demonstrating strong potential and natural coordination.',
            taskGrades: {
              'l2-t1': 'Pe' as const,
              'l2-t2': 'Pe' as const,
              'l2-t3': 'Pr' as const,
              'l2-t4': 'Pe' as const,
              'l2-t5': 'Pr' as const,
              'l2-t6': 'Pe' as const
            },
            taskNotes: {
              'l2-t1': 'Thorough preflight with good attention to detail',
              'l2-t2': 'Good checklist discipline from the beginning',
              'l2-t3': 'Natural feel for aircraft control coordination',
              'l2-t4': 'Followed engine procedures well with minimal guidance',
              'l2-t5': 'Good directional control on taxiways',
              'l2-t6': 'Clear and professional radio communications'
            },
            flightTimes: {
              'total_time': '1.5',
              'dual_day_local': '1.5'
            }
          }
        }
      }
    };

    set((state) => {
      const updatedLessons = {
        ...state.lessonUpdates,
        ...dummyDebriefs
      };
      saveLessonsToStorage(updatedLessons);
      return { lessonUpdates: updatedLessons };
    });
  },

  initializeStore: async () => {
    console.log('🔄 Lesson Store: INITIALIZATION STARTING');
    
    try {
      const storedLessons = await loadLessonsFromStorage();
      
      console.log('🔄 Lesson Store: Loading', Object.keys(storedLessons).length, 'lesson updates');
      
      set({ 
        lessonUpdates: storedLessons,
        isInitialized: true 
      });
      
      console.log('✅ Lesson Store: Initialized with', Object.keys(storedLessons).length, 'lesson updates');
    } catch (error) {
      console.error('Error initializing lesson store:', error);
      set({ 
        lessonUpdates: {},
        isInitialized: true 
      });
    }
  }
}));

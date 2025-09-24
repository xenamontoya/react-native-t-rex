import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Reservation {
  id: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  aircraft: string;
  aircraftType: string;
  instructor?: string;
  student?: string;
  customer1?: string; // For backward compatibility
  type: string;
  activityType?: string; // For backward compatibility  
  status: 'Reserved' | 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  lesson?: {
    id: string;
    title: string;
    description: string;
    objectives?: string[];
    overview?: string;
    learningObjectives?: { id: string; title: string; category: string; required: boolean }[];
    duration: string;
    status: string;
  };
  flightId?: string; // Link to associated flight/logbook entry
}

interface ReservationStore {
  reservations: Reservation[];
  isInitialized: boolean;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (reservationId: string, updatedReservation: Reservation) => void;
  removeReservation: (reservationId: string) => void;
  getReservations: () => Reservation[];
  clearAllReservations: () => void;
  forceResetReservations: () => void;
  initializeStore: () => void;
}

const RESERVATION_STORAGE_KEY = 'reservation-data';

// Sample reservation data for testing lesson-reservation linking
const sampleReservations: Reservation[] = [
  // New upcoming reservation from homepage - Basic Maneuvers
  {
    id: 'homepage-basic-maneuvers',
    date: 'TUE, DEC 15, 2025',
    dayOfWeek: 'TUE',
    startTime: '10:00',
    endTime: '11:48',
    aircraft: 'N8999',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Alex Johnson',
    type: 'Basic Maneuvers',
    status: 'Confirmed',
    lesson: {
      id: 'homepage-l3',
      title: 'Basic Maneuvers',
      description: 'Straight and level, climbs, descents, turns',
      overview: 'Introduction to fundamental flight maneuvers including altitude and heading control, coordinated turns, and power management techniques.',
      learningObjectives: [
        { id: 'l3-t1', title: 'Discuss lesson objective and completion standards', category: 'Preflight Discussion', required: true },
        { id: 'l3-t2', title: 'Preflight planning and preparation', category: 'Preflight Discussion', required: true },
        { id: 'l3-t3', title: 'Aircraft weight and balance considerations', category: 'Preflight Discussion', required: true },
        { id: 'l3-t4', title: 'Tracking a straight line', category: 'Flight', required: true },
        { id: 'l3-t5', title: 'Normal and crosswind landings', category: 'Flight', required: true },
        { id: 'l3-t6', title: 'Single-Pilot Resource Management (SRM)', category: 'Flight', required: true },
        { id: 'l3-t7', title: 'Single-Pilot Resource Management (SRM) - Personal Minimums', category: 'Flight', required: true },
        { id: 'l3-t8', title: 'Single-Pilot Resource Management (SRM) - Risk Management', category: 'Flight', required: true },
        { id: 'l3-t9', title: 'Cockpit Management', category: 'Review', required: true },
        { id: 'l3-t10', title: 'Use of a Checklist', category: 'Review', required: true }
      ],
      duration: '1.8 hours',
      status: 'scheduled'
    }
  },
  // Completed reservation with flight link - Alex Johnson's ground school
  {
    id: 'alex-l1-reservation',
    date: 'WED, SEP 20, 2023',
    dayOfWeek: 'WED',
    startTime: '13:00',
    endTime: '15:00',
    aircraft: 'N1234',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Alex Johnson',
    type: 'Ground School - Regulations',
    status: 'Completed',
    lesson: {
      id: 'alex-l1',
      title: 'Ground School - Regulations',
      description: 'Basic FAR regulations and airport operations',
      objectives: [
        'Understand basic FAR regulations',
        'Learn airport operations',
        'Review airspace classification',
        'Study weather minimums'
      ],
      duration: '2.0 hours',
      status: 'completed'
    },
    flightId: 'alex-l1-completed-instructor' // Link to flight entry
  },
  // Completed reservation with flight link - Alex Johnson's first flight
  {
    id: 'alex-l2-reservation',
    date: 'SUN, OCT 01, 2023',
    dayOfWeek: 'SUN',
    startTime: '13:00',
    endTime: '14:30',
    aircraft: 'N1234',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Alex Johnson',
    type: 'First Flight - Familiarization',
    status: 'Completed',
    lesson: {
      id: 'alex-l2',
      title: 'First Flight - Familiarization',
      description: 'Aircraft familiarization and basic controls',
      objectives: [
        'Aircraft preflight',
        'Basic control inputs',
        'Taxi procedures',
        'Flight fundamentals'
      ],
      duration: '1.5 hours',
      status: 'completed'
    },
    flightId: 'alex-l2-completed-instructor' // Link to flight entry
  },
  {
    id: '1703772000000',
    date: 'MON, DEC 15, 2025',
    dayOfWeek: 'MON',
    startTime: '10:00',
    endTime: '11:48',
    aircraft: 'N8999',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Alex Johnson',
    type: 'Basic Maneuvers',
    status: 'Confirmed',
    lesson: {
      id: 'l3',
      title: 'Basic Maneuvers',
      description: 'Straight and level, climbs, descents, turns',
      overview: 'Introduction to fundamental flight maneuvers including altitude and heading control, coordinated turns, and power management techniques.',
      learningObjectives: [
        { id: 'l3-t1', title: 'Discuss lesson objective and completion standards', category: 'Preflight Discussion', required: true },
        { id: 'l3-t2', title: 'Preflight planning and preparation', category: 'Preflight Discussion', required: true },
        { id: 'l3-t3', title: 'Aircraft weight and balance considerations', category: 'Preflight Discussion', required: true },
        { id: 'l3-t4', title: 'Tracking a straight line', category: 'Flight', required: true },
        { id: 'l3-t5', title: 'Normal and crosswind landings', category: 'Flight', required: true },
        { id: 'l3-t6', title: 'Single-Pilot Resource Management (SRM)', category: 'Flight', required: true },
        { id: 'l3-t7', title: 'Single-Pilot Resource Management (SRM) - Personal Minimums', category: 'Flight', required: true },
        { id: 'l3-t8', title: 'Single-Pilot Resource Management (SRM) - Risk Management', category: 'Flight', required: true },
        { id: 'l3-t9', title: 'Cockpit Management', category: 'Review', required: true },
        { id: 'l3-t10', title: 'Use of a Checklist', category: 'Review', required: true }
      ],
      duration: '1.8 hours',
      status: 'scheduled'
    }
  },
  {
    id: '1703858400000',
    date: 'TUE, DEC 16, 2025',
    dayOfWeek: 'TUE',
    startTime: '14:00',
    endTime: '16:00',
    aircraft: 'N1234',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Sarah Chen',
    type: 'Navigation Basics',
    status: 'Confirmed',
    lesson: {
      id: 'l2',
      title: 'Navigation Basics',
      description: 'Chart reading, pilotage, dead reckoning, and GPS navigation',
      objectives: [
        'Read and interpret sectional charts',
        'Plan cross-country flight routes',
        'Use pilotage and dead reckoning techniques',
        'Operate GPS navigation systems',
        'Calculate time, distance, and fuel requirements',
        'Identify airspace and airport information'
      ],
      duration: '2.0 hours',
      status: 'scheduled'
    }
  },
  {
    id: '1704031200000',
    date: 'WED, DEC 17, 2025',
    dayOfWeek: 'WED',
    startTime: '09:00',
    endTime: '13:00',
    aircraft: 'N5678',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Mike Chen',
    type: 'Mock Checkride',
    status: 'Confirmed',
    lesson: {
      id: 'l4',
      title: 'Mock Checkride',
      description: 'Comprehensive checkride preparation covering all required tasks',
      objectives: [
        'Demonstrate all private pilot practical test standards',
        'Execute emergency procedures and scenarios',
        'Perform cross-country flight planning',
        'Complete oral examination topics',
        'Practice checkride maneuvers to standards',
        'Review aircraft systems and regulations'
      ],
      duration: '4.0 hours',
      status: 'scheduled'
    }
  },
  {
    id: '1704117600000',
    date: 'THU, DEC 18, 2025',
    dayOfWeek: 'THU',
    startTime: '11:00',
    endTime: '13:00',
    aircraft: 'N9876',
    aircraftType: 'Cessna 172',
    instructor: 'John Smith - CFI',
    student: 'Emily Rodriguez',
    type: 'Weather Fundamentals',
    status: 'Confirmed',
    lesson: {
      id: 'l5',
      title: 'Weather Fundamentals',
      description: 'Weather theory, interpretation, and decision making for flight safety',
      objectives: [
        'Interpret weather reports and forecasts',
        'Understand atmospheric conditions and hazards',
        'Make go/no-go weather decisions',
        'Use weather resources and tools',
        'Recognize dangerous weather patterns',
        'Apply weather knowledge to flight planning'
      ],
      duration: '2.0 hours',
      status: 'scheduled'
    }
  }
];

// Helper functions for AsyncStorage
const loadReservationsFromStorage = async (): Promise<Reservation[]> => {
  try {
    const stored = await AsyncStorage.getItem(RESERVATION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error loading reservations from AsyncStorage:', error);
  }
  return [];
};

const saveReservationsToStorage = async (reservations: Reservation[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservations));
  } catch (error) {
    console.error('Error saving reservations to AsyncStorage:', error);
  }
};

export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [], // Start with empty array to avoid hydration mismatch
  isInitialized: false,

  addReservation: (reservation) => {
    const newReservation = {
      ...reservation,
      id: reservation.id || `reservation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    set((state) => {
      const updatedReservations = [...state.reservations, newReservation];
      saveReservationsToStorage(updatedReservations);
      return { reservations: updatedReservations };
    });
  },

  updateReservation: (reservationId, updatedReservation) => {
    set((state) => {
      const updatedReservations = state.reservations.map(reservation =>
        reservation.id === reservationId ? updatedReservation : reservation
      );
      saveReservationsToStorage(updatedReservations);
      return { reservations: updatedReservations };
    });
  },

  removeReservation: (reservationId) => {
    set((state) => {
      const updatedReservations = state.reservations.filter(reservation => reservation.id !== reservationId);
      saveReservationsToStorage(updatedReservations);
      return { reservations: updatedReservations };
    });
  },

  getReservations: () => get().reservations,

  clearAllReservations: () => {
    set(() => {
      saveReservationsToStorage([]);
      return { reservations: [] };
    });
  },

  forceResetReservations: async () => {
    try {
      await AsyncStorage.removeItem(RESERVATION_STORAGE_KEY);
      console.log('AsyncStorage cleared! Refresh the app to see clean slate.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
    set({ reservations: [], isInitialized: true });
  },

  initializeStore: async () => {
    console.log('🔄 Reservation Store: INITIALIZATION STARTING');
    
    try {
      const storedReservations = await loadReservationsFromStorage();
      
      // If no stored data, use sample data
      const reservationsToUse = storedReservations.length > 0 ? storedReservations : sampleReservations;
      
      console.log('🔄 Reservation Store: Loading', reservationsToUse.length, 'reservations');
      
      set({ 
        reservations: [...reservationsToUse],
        isInitialized: true 
      });
      
      // Save sample data to storage if we used it
      if (storedReservations.length === 0) {
        await saveReservationsToStorage(sampleReservations);
      }
      
      console.log('✅ Reservation Store: Initialized with', reservationsToUse.length, 'reservations');
    } catch (error) {
      console.error('Error initializing reservation store:', error);
      // Fallback to sample data
      set({ 
        reservations: [...sampleReservations],
        isInitialized: true 
      });
    }
  }
}));

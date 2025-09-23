import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FlightData {
  id?: string; // Unique identifier for saved flights
  ident: string;
  flight_number: string;
  registration?: string;
  aircraft_type?: string;
  origin?: { code: string; city?: string };
  destination?: { code: string; city?: string };
  scheduled_out?: string;
  scheduled_in?: string;
  duration?: number; // Flight duration in minutes
  // Additional fields that might be available from FlightAware
  operator?: string;
  operator_iata?: string;
  aircraft_manufacturer?: string;
  aircraft_model?: string;
  // Logbook specific fields
  remarks?: string;
  photos?: string[]; // Array of base64 encoded photo strings
  signature?: string | null; // Digital signature (base64 or image path)
  // Time fields - Basic
  total_time?: string;
  dual_received?: string;
  pic?: string;
  xc?: string;
  night?: string;
  sim_inst?: string;
  solo?: string;
  actual_inst?: string;
  ground?: string;
  // Time fields - Granular (for detailed lesson tracking)
  dual_day_local?: string;
  dual_night_local?: string;
  solo_day_local?: string;
  solo_night_local?: string;
  dual_day_xc?: string;
  dual_night_xc?: string;
  solo_day_xc?: string;
  solo_night_xc?: string;
  instrument_actual?: string;
  instrument_hood?: string;
  instrument_xc?: string;
  // Landing fields - Granular
  day_ldg?: string;
  night_ldg?: string;
  dual_day_landings?: string;
  dual_night_landings?: string;
  solo_day_landings?: string;
  solo_night_landings?: string;
  // Engine/Transponder fields (ADS-B data)
  hobbs_out?: string;
  hobbs_in?: string;
  tach_out?: string;
  tach_in?: string;
  // Crew fields
  instructor?: string;
  student?: string;
  // Additional metadata
  loggedDate?: string;
  status?: string;
  addedByRole?: 'instructor' | 'student' | 'prospective'; // Track which role added this flight
  reservationId?: string; // Link to the reservation that created this entry
  // Lesson-specific fields (added when lesson is logged)
  lessonType?: string;
  lessonId?: string;
  lessonGrade?: string;
  lessonNotes?: string;
  lessonObjectives?: string[];
  lessonOverview?: string;
  overallGrade?: string;
  overallNotes?: string;
  taskGrades?: Record<string, 'D' | 'E' | 'Pr' | 'Pe' | 'M' | 'NG'>;
  taskNotes?: Record<string, string>;
  learningObjectives?: { id: string; title: string; category: string; required: boolean }[];
  // Add more fields as needed
}

interface FlightStore {
  selectedFlight: FlightData | null;
  savedFlights: FlightData[];
  isInitialized: boolean;
  setSelectedFlight: (flight: FlightData | null) => void;
  addSavedFlight: (flight: FlightData, role?: 'instructor' | 'student' | 'prospective') => void;
  updateSavedFlight: (flightId: string, updatedFlight: FlightData) => void;
  removeSavedFlight: (flightId: string) => void;
  clearAllFlights: () => void;
  getSavedFlights: () => FlightData[];
  getFlightsByRole: (role: 'instructor' | 'student' | 'prospective') => FlightData[];
  getFlightsByReservationId: (reservationId: string) => FlightData[];
  initializeStore: () => void;
  forceReset: () => void;
}

// Sample flight data for testing - includes both instructor and student perspective flights
const sampleFlights: FlightData[] = [
  // Student view flight - training with instructor
  {
    id: 'student-sample-1',
    ident: 'N1234P',
    flight_number: 'Training-1',
    registration: 'N1234P',
    aircraft_type: 'Cessna 172',
    origin: { code: 'KPAO', city: 'Palo Alto' },
    destination: { code: 'KPAO', city: 'Palo Alto' },
    scheduled_out: '2025-12-15T18:00:00Z',
    scheduled_in: '2025-12-15T19:30:00Z',
    duration: 90, // 1.5 hours in minutes
    aircraft_manufacturer: 'Cessna',
    aircraft_model: '172',
    total_time: '1.5',
    dual_received: '1.5',
    pic: '',
    solo: '',
    instructor: 'John Smith - CFI',
    student: 'Demo Student',
    remarks: 'Pattern work and landings with instructor',
    status: 'Scheduled',
    addedByRole: 'student'
  },
  // Student view flight - solo flight
  {
    id: 'student-sample-2',
    ident: 'N5678T',
    flight_number: 'Solo-1',
    registration: 'N5678T',
    aircraft_type: 'Cessna 152',
    origin: { code: 'KRHV', city: 'San Jose' },
    destination: { code: 'KRHV', city: 'San Jose' },
    scheduled_out: '2025-12-16T22:00:00Z',
    scheduled_in: '2025-12-16T23:00:00Z',
    duration: 60, // 1.0 hour in minutes
    aircraft_manufacturer: 'Cessna',
    aircraft_model: '152',
    total_time: '1.0',
    dual_received: '',
    pic: '1.0',
    solo: '1.0',
    instructor: 'John Smith - CFI',
    student: 'Demo Student',
    remarks: 'First solo flight! Pattern practice',
    status: 'Scheduled'
  },
  // Instructor view flight - teaching student
  {
    id: 'instructor-sample-1',
    ident: 'N1234P',
    flight_number: 'Training-1-Instructor',
    registration: 'N1234P',
    aircraft_type: 'Cessna 172',
    origin: { code: 'KPAO', city: 'Palo Alto' },
    destination: { code: 'KPAO', city: 'Palo Alto' },
    scheduled_out: '2025-12-17T18:00:00Z',
    scheduled_in: '2025-12-17T19:30:00Z',
    duration: 90, // 1.5 hours in minutes
    aircraft_manufacturer: 'Cessna',
    aircraft_model: '172',
    total_time: '1.5',
    dual_received: '',
    pic: '1.5',
    solo: '',
    instructor: 'Self',
    student: 'Demo Student',
    remarks: 'Pattern work and landings - instructor entry',
    status: 'Scheduled'
  },
  // Completed flight with comprehensive data
  {
    id: 'completed-lesson-1',
    ident: 'N8999',
    flight_number: 'Training-Completed-1',
    registration: 'N8999',
    aircraft_type: 'Cessna 172',
    origin: { code: 'KRHV', city: 'San Jose' },
    destination: { code: 'KRHV', city: 'San Jose' },
    scheduled_out: '2025-12-10T18:00:00Z',
    scheduled_in: '2025-12-10T19:48:00Z',
    duration: 108, // 1.8 hours in minutes
    aircraft_manufacturer: 'Cessna',
    aircraft_model: '172',
    total_time: '1.8',
    dual_received: '1.8',
    pic: '',
    xc: '',
    night: '',
    sim_inst: '',
    solo: '',
    actual_inst: '',
    ground: '0.3',
    day_ldg: '3',
    night_ldg: '0',
    instructor: 'John Smith - CFI',
    student: 'Alex Johnson',
    remarks: 'Basic Maneuvers. Excellent progress with natural aptitude for aircraft control.',
    status: 'Completed',
    addedByRole: 'student',
    lessonType: 'Basic Maneuvers',
    lessonGrade: 'Complete',
    overallGrade: 'Complete',
    overallNotes: 'Great progress! Alex showed natural aptitude for aircraft control and maintained good situational awareness throughout the flight.',
    lessonNotes: 'Student demonstrated good coordination during basic control inputs and maintained excellent altitude control.',
    lessonObjectives: ['Aircraft control', 'Basic maneuvers', 'Situational awareness'],
    learningObjectives: [
      { id: 'basic-controls', title: 'Basic Controls', category: 'Flight Controls', required: true },
      { id: 'straight-level', title: 'Straight and Level', category: 'Flight Maneuvers', required: true },
      { id: 'turns', title: 'Level Turns', category: 'Flight Maneuvers', required: true },
      { id: 'climbs-descents', title: 'Climbs and Descents', category: 'Flight Maneuvers', required: true }
    ],
    taskGrades: {
      'basic-controls': 'Pe',
      'straight-level': 'Pe',
      'turns': 'Pr',
      'climbs-descents': 'Pe'
    },
    taskNotes: {
      'basic-controls': 'Good feel for elevator and aileron inputs',
      'straight-level': 'Excellent altitude maintenance',
      'turns': 'Needs practice with coordination',
      'climbs-descents': 'Good power management'
    },
    loggedDate: '2025-12-10',
    signature: '/logos/xena-signature.png'
  }
];

// AsyncStorage functions for React Native
const loadFlightsFromStorage = async (): Promise<FlightData[]> => {
  try {
    const stored = await AsyncStorage.getItem('savedFlights');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error: any) {
    console.error('Error loading flights from AsyncStorage:', error);
  }
  
  return [];
};

const saveFlightsToStorage = async (flights: FlightData[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('savedFlights', JSON.stringify(flights));
  } catch (error: any) {
    console.error('Error saving flights to AsyncStorage:', error);
  }
};

export const useFlightStore = create<FlightStore>((set, get) => ({
  selectedFlight: null,
  savedFlights: [], // Start with empty array to avoid hydration mismatch
  isInitialized: false,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  addSavedFlight: (flight, role) => {
    const newFlight = {
      ...flight,
      id: flight.id || `flight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedByRole: role || flight.addedByRole
    };
    set((state) => {
      const updatedFlights = [...state.savedFlights, newFlight];
      saveFlightsToStorage(updatedFlights);
      return { savedFlights: updatedFlights };
    });
  },
  updateSavedFlight: (flightId, updatedFlight) => {
    set((state) => {
      const updatedFlights = state.savedFlights.map(flight =>
        flight.id === flightId ? updatedFlight : flight
      );
      saveFlightsToStorage(updatedFlights);
      return { savedFlights: updatedFlights };
    });
  },
  removeSavedFlight: (flightId) => {
    set((state) => {
      const updatedFlights = state.savedFlights.filter(flight => flight.id !== flightId);
      saveFlightsToStorage(updatedFlights);
      return { savedFlights: updatedFlights };
    });
  },
  clearAllFlights: () => {
    set(() => {
      saveFlightsToStorage([]);
      return { savedFlights: [] };
    });
  },
  getSavedFlights: () => get().savedFlights,
  getFlightsByRole: (role) => {
    return get().savedFlights.filter(flight => flight.addedByRole === role);
  },
  getFlightsByReservationId: (reservationId) => {
    return get().savedFlights.filter(flight => flight.reservationId === reservationId);
  },
  initializeStore: async () => {
    console.log('🔄 Flight Store: INITIALIZATION STARTING');
    
    // For React Native, we'll start with sample data and then load from storage
    try {
      const storedFlights = await loadFlightsFromStorage();
      
      // If no stored data, use sample data
      const flightsToUse = storedFlights.length > 0 ? storedFlights : sampleFlights;
      
      console.log('🔄 Flight Store: Loading', flightsToUse.length, 'flights');
      
      // Set the store data
      set({ 
        savedFlights: [...flightsToUse], // Create a new array to ensure reactivity
        isInitialized: true 
      });
      
      // Save sample data to storage if we used it
      if (storedFlights.length === 0) {
        await saveFlightsToStorage(sampleFlights);
      }
      
      console.log('✅ Flight Store: Initialized with', flightsToUse.length, 'flights');
    } catch (error) {
      console.error('Error initializing flight store:', error);
      // Fallback to sample data
      set({ 
        savedFlights: [...sampleFlights],
        isInitialized: true 
      });
    }
  },
  
  // Add a force reset function for debugging
  forceReset: async () => {
    console.log('🔴 FORCE RESET TRIGGERED');
    try {
      await AsyncStorage.clear();
      set({ 
        savedFlights: [...sampleFlights],
        isInitialized: true 
      });
      await saveFlightsToStorage(sampleFlights);
      console.log('🔴 FORCE RESET COMPLETE');
    } catch (error) {
      console.error('Error during force reset:', error);
    }
  },
}));

import { create } from 'zustand';

export type Role = 'student' | 'instructor' | 'prospective';

export interface RoleState {
  currentRole: Role;
  isInitialized: boolean;
  setRole: (role: Role) => void;
  initializeStore: () => void;
}

export const roleConfig = {
  student: {
    title: 'Student Pilot',
    description: 'Learning to fly and building hours',
    color: '#FE652A',
    dashboardRoute: 'StudentDashboard'
  },
  instructor: {
    title: 'Flight Instructor', 
    description: 'Teaching students and building hours',
    color: '#5177bb',
    dashboardRoute: 'InstructorDashboard'
  },
  prospective: {
    title: 'Prospective Student',
    description: 'Exploring flight training options',
    color: '#ED703D',
    dashboardRoute: 'ProspectiveDashboard'
  }
};

export const useRoleStore = create<RoleState>((set, get) => ({
  currentRole: 'student',
  isInitialized: true, // Start as initialized for now

  setRole: (role: Role) => {
    set({ currentRole: role });
  },

  initializeStore: () => {
    set({ isInitialized: true });
  },
}));

import { create } from 'zustand';

export type Phase = 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5';

export interface PhaseState {
  currentPhase: Phase;
  isInitialized: boolean;
  setPhase: (phase: Phase) => void;
  initializeStore: () => void;
  isFeatureAvailable: (feature: string) => boolean;
}

export const phaseConfig = {
  phase1: {
    title: 'Phase 1',
    description: 'Basic training and logbook features',
    color: '#3b82f6',
    features: [
      'view-schedule-lessons',
      'training-progress',
      'integrated-logbook',
      'basic-job-search',
      'account-management',
      'cfi-reports'
    ]
  },
  phase2: {
    title: 'Phase 2',
    description: 'Single login and identity platform',
    color: '#10b981',
    features: [
      'single-login',
      'unified-accounts',
      'cross-platform-auth'
    ]
  },
  phase3: {
    title: 'Phase 3',
    description: 'Premium career features',
    color: '#f59e0b',
    features: [
      'automated-job-matching',
      'automated-job-notifications',
      'airline-specific-reports',
      'premium-career-tools'
    ]
  },
  phase4: {
    title: 'Phase 4',
    description: 'Advanced training tools and AI features',
    color: '#8b5cf6',
    features: [
      'training-library',
      'ai-study-prep',
      'ai-cfi',
      'flight-visualization',
      'advanced-training-tools'
    ]
  },
  phase5: {
    title: 'Phase 5',
    description: 'Professional logbook capabilities',
    color: '#ef4444',
    features: [
      'airline-schedule-import',
      'duty-limits',
      'smart-groups',
      'advanced-reports',
      'audit-tool',
      'professional-logbook'
    ]
  }
};

export const usePhaseStore = create<PhaseState>((set, get) => ({
  currentPhase: 'phase1', // Start with Phase 1
  isInitialized: true,

  setPhase: (phase: Phase) => {
    set({ currentPhase: phase });
  },

  initializeStore: () => {
    set({ isInitialized: true });
  },

  isFeatureAvailable: (feature: string) => {
    const { currentPhase } = get();
    const config = phaseConfig[currentPhase];
    
    // Check if feature is available in current phase or earlier phases
    for (const phase of Object.keys(phaseConfig) as Phase[]) {
      if (phaseConfig[phase].features.includes(feature)) {
        // Feature is available if we're at this phase or later
        return getPhaseNumber(currentPhase) >= getPhaseNumber(phase);
      }
    }
    
    return false; // Feature not found or not yet available
  },
}));

// Helper function to get numeric phase for comparison
function getPhaseNumber(phase: Phase): number {
  const phaseMap: Record<Phase, number> = {
    phase1: 1,
    phase2: 2,
    phase3: 3,
    phase4: 4,
    phase5: 5,
  };
  return phaseMap[phase];
}

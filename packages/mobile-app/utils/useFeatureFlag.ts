import React from 'react';
import { usePhaseStore } from './phaseStore';

/**
 * 🚩 FEATURE FLAG HOOK
 * 
 * Simple hook to check if a feature is available in the current development phase
 * 
 * Usage:
 * const isJobMatchingAvailable = useFeatureFlag('automated-job-matching');
 * const isAIStudyPrepAvailable = useFeatureFlag('ai-study-prep');
 * 
 * if (isJobMatchingAvailable) {
 *   // Show job matching UI
 * }
 */
export const useFeatureFlag = (feature: string): boolean => {
  const isFeatureAvailable = usePhaseStore((state) => state.isFeatureAvailable);
  return isFeatureAvailable(feature);
};

/**
 * 🎯 PHASE-AWARE COMPONENT HOC
 * 
 * Higher-order component that only renders children if feature is available
 * 
 * Usage:
 * <FeatureGate feature="automated-job-matching">
 *   <JobMatchingComponent />
 * </FeatureGate>
 */
interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback = null 
}) => {
  const isAvailable = useFeatureFlag(feature);
  return isAvailable ? <>{children}</> : <>{fallback}</>;
};

/**
 * 📋 AVAILABLE FEATURES BY PHASE
 * 
 * Quick reference for developers:
 * 
 * Phase 1 (Pathfinder Tier):
 * - view-schedule-lessons
 * - training-progress
 * - integrated-logbook
 * - basic-job-search
 * - account-management
 * - cfi-reports
 * 
 * Phase 2 (Identity Platform):
 * - single-login
 * - unified-accounts
 * - cross-platform-auth
 * 
 * Phase 3 (Aviator Tier):
 * - automated-job-matching
 * - automated-job-notifications
 * - airline-specific-reports
 * - premium-career-tools
 * 
 * Phase 4 (Navigator Tier):
 * - training-library
 * - ai-study-prep
 * - ai-cfi
 * - flight-visualization
 * - advanced-training-tools
 * 
 * Phase 5 (LogTen Parity):
 * - airline-schedule-import
 * - duty-limits
 * - smart-groups
 * - advanced-reports
 * - audit-tool
 * - professional-logbook
 */

// Date utility functions for React Native
// Provides cross-platform date formatting and manipulation

/**
 * Format a date string for display
 */
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format a date string for display in short format
 */
export const formatDateShort = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date short:', error);
    return 'Invalid Date';
  }
};

/**
 * Format time string for display
 */
export const formatTime = (time: string): string => {
  try {
    // Handle various time formats
    if (time.includes(':')) {
      return time; // Already formatted
    }
    
    // Convert from 24-hour to 12-hour format if needed
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes || 0);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return time;
  }
};

/**
 * Format duration in hours to display format
 */
export const formatDuration = (hours: number): string => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (wholeHours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${wholeHours}h`;
  } else {
    return `${wholeHours}h ${minutes}m`;
  }
};

/**
 * Check if a date is today
 */
export const isToday = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return dateObj.toDateString() === today.toDateString();
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Check if a date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    
    return dateObj < now;
  } catch (error) {
    console.error('Error checking if date is past:', error);
    return false;
  }
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 */
export const getRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (Math.abs(diffMinutes) < 60) {
      if (diffMinutes === 0) return 'now';
      return diffMinutes > 0 ? `in ${diffMinutes}m` : `${Math.abs(diffMinutes)}m ago`;
    } else if (Math.abs(diffHours) < 24) {
      return diffHours > 0 ? `in ${diffHours}h` : `${Math.abs(diffHours)}h ago`;
    } else {
      return diffDays > 0 ? `in ${diffDays}d` : `${Math.abs(diffDays)}d ago`;
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'Unknown';
  }
};

/**
 * Parse various date string formats to Date object
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    // Handle common formats
    if (dateString.includes('T')) {
      // ISO format
      return new Date(dateString);
    } else if (dateString.includes('/')) {
      // MM/DD/YYYY or DD/MM/YYYY format
      return new Date(dateString);
    } else if (dateString.includes('-')) {
      // YYYY-MM-DD format
      return new Date(dateString);
    } else {
      // Try parsing as-is
      return new Date(dateString);
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

/**
 * Get flight time in decimal hours from time string
 */
export const parseFlightTime = (timeString: string): number => {
  try {
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours + (minutes / 60);
    } else {
      return parseFloat(timeString);
    }
  } catch (error) {
    console.error('Error parsing flight time:', error);
    return 0;
  }
};

/**
 * Format flight time from decimal hours to HH:MM format
 */
export const formatFlightTime = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: string | Date, date2: string | Date): boolean => {
  try {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    return d1.toDateString() === d2.toDateString();
  } catch (error) {
    console.error('Error comparing dates:', error);
    return false;
  }
};

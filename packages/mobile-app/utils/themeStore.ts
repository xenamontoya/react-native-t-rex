import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeStore {
  isDark: boolean;
  isInitialized: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  initializeStore: () => void;
}

const THEME_STORAGE_KEY = 'app-theme';

// Helper functions for AsyncStorage
const loadThemeFromStorage = async (): Promise<boolean> => {
  try {
    const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading theme from storage:', error);
  }
  return false; // Default to light mode
};

const saveThemeToStorage = async (isDark: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Error saving theme to storage:', error);
  }
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDark: false,
  isInitialized: false,
  
  toggleTheme: () => {
    const newIsDark = !get().isDark;
    set({ isDark: newIsDark });
    saveThemeToStorage(newIsDark);
  },
  
  setTheme: (isDark: boolean) => {
    set({ isDark });
    saveThemeToStorage(isDark);
  },
  
  initializeStore: async () => {
    if (get().isInitialized) return;
    
    try {
      const savedTheme = await loadThemeFromStorage();
      set({ 
        isDark: savedTheme,
        isInitialized: true 
      });
    } catch (error) {
      console.error('Error initializing theme store:', error);
      set({ isInitialized: true }); // Set as initialized even on error
    }
  },
}));

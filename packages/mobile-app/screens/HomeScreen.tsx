import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

// Import stores
import { useRoleStore } from '../utils/roleStore';
import { useFlightStore } from '../utils/flightStore';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { currentRole, isInitialized: roleInitialized, initializeStore: initializeRoleStore } = useRoleStore();
  const { savedFlights, isInitialized: flightInitialized, initializeStore: initializeFlightStore } = useFlightStore();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize stores if not already done
    if (!roleInitialized) {
      initializeRoleStore();
    }
    if (!flightInitialized) {
      initializeFlightStore();
    }
  }, [roleInitialized, flightInitialized, initializeRoleStore, initializeFlightStore]);

  useEffect(() => {
    // Once both stores are initialized, navigate to appropriate dashboard
    if (roleInitialized && flightInitialized) {
      // Small delay to show loading animation
      setTimeout(() => {
        setIsLoading(false);
        navigateToRoleDashboard();
      }, 1000);
    }
  }, [roleInitialized, flightInitialized, currentRole]);

  const navigateToRoleDashboard = () => {
    // Navigate to appropriate dashboard based on role
    if (currentRole === 'instructor') {
      navigation.navigate('Home' as never); // This will render InstructorDashboard via HomeScreen logic
    } else if (currentRole === 'prospective') {
      navigation.navigate('Home' as never); // This will render ProspectiveDashboard via HomeScreen logic  
    } else {
      navigation.navigate('Home' as never); // This will render StudentDashboardMain via HomeScreen logic
    }
  };

  // Show loading while stores initialize
  if (!roleInitialized || !flightInitialized || isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContent}>
          <View style={styles.iconContainer}>
            <Icon name="plane" size={48} color={Colors.brand.blueAzure} style={styles.loadingIcon} />
          </View>
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
          <ActivityIndicator 
            size="large" 
            color={Colors.brand.blueAzure} 
            style={styles.activityIndicator}
          />
        </View>
      </View>
    );
  }

  // This component handles the loading and redirection logic
  // The actual role-based dashboard rendering is handled by the HomeScreen component in App.tsx
  return (
    <View style={styles.container}>
      <View style={styles.loadingContent}>
        <View style={styles.iconContainer}>
          <Icon name="plane" size={48} color={Colors.brand.blueAzure} style={styles.loadingIcon} />
        </View>
        <Text style={styles.loadingText}>Redirecting to your dashboard...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  loadingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loadingIcon: {
    // Add a subtle animation effect
    opacity: 0.8,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  activityIndicator: {
    marginTop: 8,
  },
});

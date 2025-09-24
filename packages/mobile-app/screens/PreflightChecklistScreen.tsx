import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

interface PreflightItem {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  description: string;
}

export default function PreflightChecklistScreen({ navigation, route }: any) {
  const [preflightItems, setPreflightItems] = useState<PreflightItem[]>([
    { 
      id: 'weather', 
      name: 'Review Weather', 
      status: 'Not Started', 
      description: 'Check conditions at least 1 hour before flying' 
    },
    { 
      id: 'frat', 
      name: 'Risk Assessment', 
      status: 'Not Started', 
      description: 'Complete this assessment at least 1 hour before check out' 
    },
    { 
      id: 'weight-balance', 
      name: 'Weight & Balance', 
      status: 'Not Started', 
      description: 'Submit before checking out' 
    }
  ]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadPreflightStatus();
  }, []);

  useEffect(() => {
    // Check for completion parameters from sub-screens
    const { weatherCompleted, fratCompleted, weightBalanceCompleted } = route?.params || {};
    
    if (weatherCompleted) {
      updateItemStatus('weather', 'Completed');
    }
    if (fratCompleted) {
      updateItemStatus('frat', 'Completed');
    }
    if (weightBalanceCompleted) {
      updateItemStatus('weight-balance', 'Completed');
    }
  }, [route?.params]);

  const loadPreflightStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem('preflightItemsStatus');
      if (saved) {
        const parsedItems = JSON.parse(saved);
        setPreflightItems(parsedItems);
      }
    } catch (error) {
      console.error('Error loading preflight status:', error);
    }
  };

  const savePreflightStatus = async (items: PreflightItem[]) => {
    try {
      await AsyncStorage.setItem('preflightItemsStatus', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving preflight status:', error);
    }
  };

  const updateItemStatus = (itemId: string, status: PreflightItem['status']) => {
    const updatedItems = preflightItems.map(item => 
      item.id === itemId ? { ...item, status } : item
    );
    setPreflightItems(updatedItems);
    savePreflightStatus(updatedItems);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleComplete = () => {
    const allCompleted = preflightItems.every(item => item.status === 'Completed');
    
    if (allCompleted) {
      Alert.alert(
        'Preflight Complete!',
        'All preflight items have been completed. You\'re ready for your flight.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      Alert.alert(
        'Incomplete Items',
        'Please complete all preflight items before continuing.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleItemClick = (itemId: string) => {
    updateItemStatus(itemId, 'In Progress');
    
    switch (itemId) {
      case 'weather':
        navigation.navigate('WeatherReview');
        break;
      case 'frat':
        navigation.navigate('FRAT');
        break;
      case 'weight-balance':
        navigation.navigate('WeightBalance');
        break;
      default:
        console.log('Navigate to preflight item:', itemId);
    }
  };

  const getStatusStyle = (status: PreflightItem['status']) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: 'rgba(0, 255, 242, 0.15)', color: '#004D47' };
      case 'In Progress':
        return { backgroundColor: '#FEF3CD', color: '#92400E' };
      default:
        return { backgroundColor: '#F8F3E8', color: '#6B5B4F' };
    }
  };

  const completedCount = preflightItems.filter(item => item.status === 'Completed').length;
  const totalCount = preflightItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Preflight Checklist</Text>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={handleComplete}>
          <Text style={styles.doneButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {isClient ? `${completedCount} of ${totalCount} completed` : '0 of 3 completed'}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: isClient ? `${progressPercentage}%` : '0%' }
              ]} 
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Flight Info Card */}
        <View style={styles.flightInfoCard}>
          <Text style={styles.flightTitle}>Basic Maneuvers</Text>
          <Text style={styles.flightSubtitle}>Cessna 172 - N8999</Text>
          
          <View style={styles.flightDetails}>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={16} color={Colors.neutral.gray500} />
              <View style={styles.detailInfo}>
                <Text style={styles.detailValue}>Tuesday, Sep 2, 2025</Text>
                <Text style={styles.detailLabel}>Flight Date</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Icon name="clock" size={16} color={Colors.neutral.gray500} />
              <View style={styles.detailInfo}>
                <Text style={styles.detailValue}>10:00 AM - 11:48 AM</Text>
                <Text style={styles.detailLabel}>Flight Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Preflight Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Preflight Items</Text>
          
          {preflightItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.preflightItem}
              onPress={() => handleItemClick(item.id)}
            >
              <View style={styles.itemContent}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  {item.status === 'In Progress' && (
                    <Text style={styles.inProgressText}>Currently in progress</Text>
                  )}
                </View>
                <View style={styles.itemRight}>
                  <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                    <Text style={[styles.statusText, { color: getStatusStyle(item.status).color }]}>
                      {item.status}
                    </Text>
                  </View>
                  <Icon name="chevronRight" size={16} color={Colors.neutral.gray400} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Complete Preflight Button */}
        <View style={styles.completeSection}>
          <TouchableOpacity 
            style={[
              styles.completeButton,
              preflightItems.every(item => item.status === 'Completed') 
                ? styles.completeButtonActive 
                : styles.completeButtonInactive
            ]}
            onPress={handleComplete}
          >
            <Text style={[
              styles.completeButtonText,
              preflightItems.every(item => item.status === 'Completed') 
                ? styles.completeButtonTextActive 
                : styles.completeButtonTextInactive
            ]}>
              Complete Preflight Checklist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.primary.white,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    textAlign: 'center',
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: '#5177BB',
  },
  progressSection: {
    backgroundColor: Colors.primary.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  progressInfo: {
    gap: 12,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F6A345',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  flightInfoCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 20,
    margin: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  flightTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  flightSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 16,
  },
  flightDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailInfo: {
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  itemsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 16,
  },
  preflightItem: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 4,
  },
  inProgressText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  completeSection: {
    padding: 20,
    backgroundColor: Colors.primary.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  completeButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonActive: {
    backgroundColor: '#10b981',
  },
  completeButtonInactive: {
    backgroundColor: Colors.neutral.gray300,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
  },
  completeButtonTextActive: {
    color: Colors.primary.white,
  },
  completeButtonTextInactive: {
    color: Colors.neutral.gray500,
  },
  bottomPadding: {
    height: 100,
  },
});

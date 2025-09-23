import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

interface WeightItem {
  id: string;
  name: string;
  weight: number;
  arm: number;
  moment: number;
  isRequired: boolean;
  maxWeight?: number;
}

interface AircraftLimits {
  maxWeight: number;
  cg: {
    forward: number;
    aft: number;
  };
  emptyWeight: number;
  emptyArm: number;
  emptyMoment: number;
}

export default function WeightBalanceScreen({ navigation, route }: any) {
  const aircraftData = route?.params?.aircraft || {
    tailNumber: 'N9567L',
    type: 'Cessna 172',
    limits: {
      maxWeight: 2450,
      cg: { forward: 35.0, aft: 47.3 },
      emptyWeight: 1680,
      emptyArm: 39.5,
      emptyMoment: 66360,
    }
  };

  const [aircraft] = useState(aircraftData);
  const [weights, setWeights] = useState<WeightItem[]>([
    { id: 'pilot', name: 'Pilot', weight: 0, arm: 37.0, moment: 0, isRequired: true },
    { id: 'copilot', name: 'Co-Pilot/Passenger', weight: 0, arm: 37.0, moment: 0, isRequired: false },
    { id: 'rearLeft', name: 'Rear Left Passenger', weight: 0, arm: 73.0, moment: 0, isRequired: false, maxWeight: 120 },
    { id: 'rearRight', name: 'Rear Right Passenger', weight: 0, arm: 73.0, moment: 0, isRequired: false, maxWeight: 120 },
    { id: 'baggage1', name: 'Baggage Area 1', weight: 0, arm: 95.0, moment: 0, isRequired: false, maxWeight: 120 },
    { id: 'baggage2', name: 'Baggage Area 2', weight: 0, arm: 123.0, moment: 0, isRequired: false, maxWeight: 50 },
    { id: 'fuel', name: 'Fuel (gal)', weight: 0, arm: 48.0, moment: 0, isRequired: true },
  ]);

  const [calculations, setCalculations] = useState({
    totalWeight: 0,
    totalMoment: 0,
    cg: 0,
    isWithinLimits: false,
    cgStatus: 'unknown' as 'forward' | 'aft' | 'within' | 'unknown',
    weightStatus: 'unknown' as 'under' | 'over' | 'within' | 'unknown',
  });

  useEffect(() => {
    calculateWeightBalance();
  }, [weights]);

  const calculateWeightBalance = () => {
    // Include empty weight
    let totalWeight = aircraft.limits.emptyWeight;
    let totalMoment = aircraft.limits.emptyMoment;

    // Add all loaded weights
    weights.forEach(item => {
      const weight = item.id === 'fuel' ? item.weight * 6 : item.weight; // Convert fuel gallons to pounds
      totalWeight += weight;
      totalMoment += weight * item.arm;
    });

    const cg = totalWeight > 0 ? totalMoment / totalWeight : 0;

    // Check limits
    const cgStatus = 
      cg < aircraft.limits.cg.forward ? 'forward' :
      cg > aircraft.limits.cg.aft ? 'aft' : 'within';
    
    const weightStatus = 
      totalWeight > aircraft.limits.maxWeight ? 'over' :
      totalWeight < aircraft.limits.emptyWeight ? 'under' : 'within';

    const isWithinLimits = cgStatus === 'within' && weightStatus === 'within';

    setCalculations({
      totalWeight,
      totalMoment,
      cg,
      isWithinLimits,
      cgStatus,
      weightStatus,
    });
  };

  const updateWeight = (id: string, weight: string) => {
    const numWeight = parseFloat(weight) || 0;
    setWeights(prev => prev.map(item => {
      if (item.id === id) {
        const actualWeight = item.id === 'fuel' ? numWeight * 6 : numWeight;
        return {
          ...item,
          weight: numWeight,
          moment: actualWeight * item.arm,
        };
      }
      return item;
    }));
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Weights',
      'Are you sure you want to clear all weight entries?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            setWeights(prev => prev.map(item => ({
              ...item,
              weight: 0,
              moment: 0,
            })));
          }
        }
      ]
    );
  };

  const saveCalculation = () => {
    Alert.alert(
      'Save Weight & Balance',
      'Weight and Balance calculation has been saved to your flight records.',
      [{ text: 'OK' }]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'within': return Colors.secondary.forestGreen;
      case 'over':
      case 'forward':
      case 'aft': return '#EF4444';
      case 'under': return '#F59E0B';
      default: return Colors.neutral.gray500;
    }
  };

  const getStatusText = (type: 'weight' | 'cg') => {
    if (type === 'weight') {
      switch (calculations.weightStatus) {
        case 'within': return 'Within Limits';
        case 'over': return 'OVERWEIGHT';
        case 'under': return 'Below Minimum';
        default: return 'Unknown';
      }
    } else {
      switch (calculations.cgStatus) {
        case 'within': return 'Within Limits';
        case 'forward': return 'TOO FORWARD';
        case 'aft': return 'TOO AFT';
        default: return 'Unknown';
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weight & Balance</Text>
        <TouchableOpacity onPress={saveCalculation} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Aircraft Info */}
      <View style={styles.aircraftInfo}>
        <Text style={styles.aircraftTitle}>{aircraft.tailNumber} - {aircraft.type}</Text>
        <View style={styles.aircraftLimits}>
          <Text style={styles.limitText}>Max Weight: {aircraft.limits.maxWeight} lbs</Text>
          <Text style={styles.limitText}>CG Limits: {aircraft.limits.cg.forward}" - {aircraft.limits.cg.aft}"</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weight Entry Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weight Entry</Text>
            <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.itemColumn]}>Item</Text>
            <Text style={[styles.tableHeaderText, styles.weightColumn]}>Weight</Text>
            <Text style={[styles.tableHeaderText, styles.armColumn]}>Arm</Text>
            <Text style={[styles.tableHeaderText, styles.momentColumn]}>Moment</Text>
          </View>

          {/* Empty Weight Row */}
          <View style={styles.tableRow}>
            <Text style={[styles.itemText, styles.itemColumn]}>Empty Weight</Text>
            <Text style={[styles.valueText, styles.weightColumn]}>{aircraft.limits.emptyWeight}</Text>
            <Text style={[styles.valueText, styles.armColumn]}>{aircraft.limits.emptyArm}</Text>
            <Text style={[styles.valueText, styles.momentColumn]}>{aircraft.limits.emptyMoment.toLocaleString()}</Text>
          </View>

          {/* Weight Entry Rows */}
          {weights.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.itemText, styles.itemColumn]}>
                {item.name}
                {item.isRequired && <Text style={styles.requiredMark}> *</Text>}
                {item.maxWeight && (
                  <Text style={styles.maxWeightText}> (max {item.maxWeight}{item.id === 'fuel' ? ' gal' : ' lbs'})</Text>
                )}
              </Text>
              <View style={[styles.inputContainer, styles.weightColumn]}>
                <TextInput
                  style={[
                    styles.input,
                    item.maxWeight && item.weight > item.maxWeight && styles.inputError
                  ]}
                  value={item.weight > 0 ? item.weight.toString() : ''}
                  onChangeText={(value) => updateWeight(item.id, value)}
                  placeholder="0"
                  keyboardType="decimal-pad"
                />
              </View>
              <Text style={[styles.valueText, styles.armColumn]}>{item.arm}</Text>
              <Text style={[styles.valueText, styles.momentColumn]}>
                {item.moment > 0 ? Math.round(item.moment).toLocaleString() : '0'}
              </Text>
            </View>
          ))}

          {/* Totals Row */}
          <View style={[styles.tableRow, styles.totalsRow]}>
            <Text style={[styles.totalsText, styles.itemColumn]}>TOTALS</Text>
            <Text style={[styles.totalsText, styles.weightColumn]}>
              {Math.round(calculations.totalWeight)}
            </Text>
            <Text style={[styles.totalsText, styles.armColumn]}>
              {calculations.cg > 0 ? calculations.cg.toFixed(1) : '0.0'}
            </Text>
            <Text style={[styles.totalsText, styles.momentColumn]}>
              {Math.round(calculations.totalMoment).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Results Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>
          
          <View style={styles.resultsGrid}>
            {/* Weight Status */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Icon name="weight" size={20} color={getStatusColor(calculations.weightStatus)} />
                <Text style={styles.resultTitle}>Weight</Text>
              </View>
              <Text style={styles.resultValue}>{Math.round(calculations.totalWeight)} lbs</Text>
              <Text style={[styles.resultStatus, { color: getStatusColor(calculations.weightStatus) }]}>
                {getStatusText('weight')}
              </Text>
              <Text style={styles.resultLimit}>
                Limit: {aircraft.limits.maxWeight} lbs
              </Text>
            </View>

            {/* CG Status */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Icon name="target" size={20} color={getStatusColor(calculations.cgStatus)} />
                <Text style={styles.resultTitle}>Center of Gravity</Text>
              </View>
              <Text style={styles.resultValue}>{calculations.cg.toFixed(1)}"</Text>
              <Text style={[styles.resultStatus, { color: getStatusColor(calculations.cgStatus) }]}>
                {getStatusText('cg')}
              </Text>
              <Text style={styles.resultLimit}>
                Limits: {aircraft.limits.cg.forward}" - {aircraft.limits.cg.aft}"
              </Text>
            </View>
          </View>

          {/* Overall Status */}
          <View style={[
            styles.overallStatus,
            { backgroundColor: calculations.isWithinLimits ? Colors.secondary.forestGreen : '#EF4444' }
          ]}>
            <Icon 
              name={calculations.isWithinLimits ? 'checkCircle' : 'exclamationTriangle'} 
              size={24} 
              color={Colors.primary.white} 
            />
            <Text style={styles.overallStatusText}>
              {calculations.isWithinLimits ? 'SAFE TO FLY' : 'UNSAFE - DO NOT FLY'}
            </Text>
          </View>

          {!calculations.isWithinLimits && (
            <View style={styles.warningBox}>
              <Icon name="exclamationTriangle" size={20} color="#EF4444" />
              <Text style={styles.warningText}>
                Aircraft is outside weight and balance limits. Adjust loading before flight.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary.black,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  aircraftInfo: {
    backgroundColor: Colors.primary.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  aircraftTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  aircraftLimits: {
    flexDirection: 'row',
    gap: 20,
  },
  limitText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.primary.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  clearButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.neutral.gray300,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    minHeight: 40,
  },
  totalsRow: {
    borderTopWidth: 2,
    borderTopColor: Colors.neutral.gray300,
    marginTop: 8,
    paddingTop: 12,
  },
  itemColumn: {
    flex: 3,
    textAlign: 'left',
  },
  weightColumn: {
    flex: 1.5,
    textAlign: 'center',
  },
  armColumn: {
    flex: 1.5,
    textAlign: 'center',
  },
  momentColumn: {
    flex: 2,
    textAlign: 'right',
  },
  itemText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  requiredMark: {
    color: '#EF4444',
    fontFamily: Typography.fontFamily.bold,
  },
  maxWeightText: {
    fontSize: 10,
    color: Colors.neutral.gray500,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    width: '80%',
    backgroundColor: Colors.primary.white,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  valueText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  totalsText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  resultsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  resultCard: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
    padding: 16,
    borderRadius: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginLeft: 8,
  },
  resultValue: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  resultStatus: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  resultLimit: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  overallStatusText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
    marginLeft: 8,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  warningText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#EF4444',
    marginLeft: 8,
    flex: 1,
  },
  bottomPadding: {
    height: 32,
  },
});




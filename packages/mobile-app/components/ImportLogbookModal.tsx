import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';
import { AdaptiveBottomSheet } from './index';
import { FlightData } from '../utils/flightStore';
import ActionSheet from './ActionSheet';

interface ImportLogbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (flights: FlightData[]) => void;
}

interface ParsedFlight {
  id: string;
  date: string;
  aircraft: string;
  aircraftType: string;
  from: string;
  to: string;
  departure?: string;
  arrival?: string;
  totalTime: string;
  pic: string;
  sic: string;
  solo: string;
  crossCountry: string;
  night: string;
  actualInstrument: string;
  simulatedInstrument: string;
  groundTraining: string;
  dualReceived: string;
  remarks: string;
  status: 'pending' | 'approved' | 'rejected';
  confidence: number;
  originalData: any;
}

type CurrentStep = 'source' | 'upload' | 'processing' | 'mapping' | 'review' | 'complete';

const ImportLogbookModal: React.FC<ImportLogbookModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('source');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  const [parsedFlights, setParsedFlights] = useState<ParsedFlight[]>([]);
  const [selectedFlights, setSelectedFlights] = useState<Set<string>>(new Set());
  const [showSourcePicker, setShowSourcePicker] = useState(false);

  const logbookSources = [
    { id: 'foreflight', name: 'ForeFlight Logbook', category: 'professional' },
    { id: 'garmin', name: 'Garmin Pilot Logbook', category: 'professional' },
    { id: 'myflightbook', name: 'MyFlightbook', category: 'professional' },
    { id: 'logshare', name: 'LogShare', category: 'professional' },
    { id: 'aircraftlog', name: 'Aircraft Log', category: 'professional' },
    { id: 'flightlogg', name: 'FlightLogg', category: 'professional' },
    { id: 'flynas', name: 'Flynas Pilot LogBook', category: 'airline' },
    { id: 'saudia', name: 'Saudia Airlines', category: 'airline' },
    { id: 'emirates', name: 'Emirates Airlines', category: 'airline' },
    { id: 'qatar', name: 'Qatar Airways', category: 'airline' },
    { id: 'etihad', name: 'Etihad Airways', category: 'airline' },
    { id: 'manual', name: 'Paper Logbook', category: 'other' },
    { id: 'custom', name: 'Custom/Other Format', category: 'other' },
  ];

  const coreLogbookFields = [
    { value: 'date', label: 'Date' },
    { value: 'aircraft', label: 'Aircraft' },
    { value: 'aircraftType', label: 'Aircraft Type' },
    { value: 'from', label: 'From' },
    { value: 'to', label: 'To' },
    { value: 'totalTime', label: 'Total Time' },
    { value: 'pic', label: 'PIC' },
    { value: 'sic', label: 'SIC' },
    { value: 'solo', label: 'Solo' },
    { value: 'crossCountry', label: 'Cross Country' },
    { value: 'night', label: 'Night' },
    { value: 'actualInstrument', label: 'Actual Instrument' },
    { value: 'simulatedInstrument', label: 'Simulated Instrument' },
    { value: 'groundTraining', label: 'Ground Training' },
    { value: 'dualReceived', label: 'Dual Received' },
    { value: 'remarks', label: 'Remarks' },
    { value: 'ignore', label: 'Ignore' },
  ];

  // Auto-select all flights when reaching review step
  useEffect(() => {
    if (currentStep === 'review' && parsedFlights.length > 0) {
      setSelectedFlights(new Set(parsedFlights.map(f => f.id)));
    }
  }, [currentStep, parsedFlights]);

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
    setShowSourcePicker(false);
  };

  const handleFileUpload = () => {
    // In React Native, we would use DocumentPicker or ImagePicker
    // For demo purposes, simulate file processing
    setCurrentStep('processing');
    simulateFileProcessing();
  };

  const simulateFileProcessing = async () => {
    setProcessingProgress(0);
    setProcessingMessage('Starting file processing...');

    // Simulate processing steps
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProcessingProgress(i);
      
      if (i === 30) setProcessingMessage('Extracting text from files...');
      else if (i === 60) setProcessingMessage('Parsing flight data...');
      else if (i === 90) setProcessingMessage('Analyzing data quality...');
    }

    // Generate mock parsed flights
    const mockFlights: ParsedFlight[] = Array.from({ length: 23 }, (_, index) => {
      const baseDate = new Date('2024-01-15');
      baseDate.setDate(baseDate.getDate() + index);
      
      const aircraftList = ['N1234P', 'N5678T', 'N9012S', 'N3456F', 'N7890L'];
      const aircraftTypes = ['Cessna 152', 'Cessna 172', 'Piper PA-28', 'Diamond DA20'];
      const airports = ['KPAO', 'KRHV', 'KLVK', 'KHWD', 'KSQL'];
      
      const aircraft = aircraftList[index % aircraftList.length];
      const aircraftType = aircraftTypes[index % aircraftTypes.length];
      const airport = airports[index % airports.length];
      const flightTime = (0.5 + Math.random() * 1.5).toFixed(1);
      
      // Vary confidence levels realistically
      let confidence: number;
      if (index % 4 === 0) confidence = 0.9 + (Math.random() * 0.1);
      else if (index % 4 === 1) confidence = 0.3 + (Math.random() * 0.3);
      else if (index % 4 === 2) confidence = 0.6 + (Math.random() * 0.2);
      else confidence = 0.8 + (Math.random() * 0.2);
      
      const isSolo = index % 6 === 0;
      const isDual = !isSolo;
      const isFirstSolo = index === 8;
      
      return {
        id: `import-demo-${index + 1}-${Date.now()}`,
        date: baseDate.toISOString().split('T')[0],
        from: airport,
        to: airport,
        departure: airport,
        arrival: airport,
        aircraft: aircraft,
        aircraftType: aircraftType,
        totalTime: flightTime,
        pic: isFirstSolo ? 'Student Pilot' : (isSolo ? 'Student Pilot' : ''),
        sic: '',
        solo: isSolo ? flightTime : '',
        crossCountry: '',
        night: index % 12 === 0 ? (parseFloat(flightTime) * 0.5).toFixed(1) : '',
        actualInstrument: '',
        simulatedInstrument: index % 10 === 0 ? (parseFloat(flightTime) * 0.3).toFixed(1) : '',
        groundTraining: index % 8 === 0 ? '0.5' : '',
        dualReceived: isDual ? flightTime : '',
        remarks: isFirstSolo ? 'First solo flight! Pattern work' : `Training flight ${index + 1}`,
        status: 'pending',
        confidence: Math.round(confidence * 100) / 100,
        originalData: { source: 'mock' }
      };
    });

    setParsedFlights(mockFlights);
    setProcessingMessage(`Processing complete! Found ${mockFlights.length} flight entries.`);
    
    setTimeout(() => {
      setCurrentStep('review');
    }, 1000);
  };

  const handleSelectAll = () => {
    if (selectedFlights.size === parsedFlights.length) {
      setSelectedFlights(new Set());
    } else {
      setSelectedFlights(new Set(parsedFlights.map(f => f.id)));
    }
  };

  const handleSelectFlight = (flightId: string) => {
    const newSelected = new Set(selectedFlights);
    if (newSelected.has(flightId)) {
      newSelected.delete(flightId);
    } else {
      newSelected.add(flightId);
    }
    setSelectedFlights(newSelected);
  };

  const handleApproveSelected = () => {
    const approvedFlights = parsedFlights.filter(f => selectedFlights.has(f.id));
    const convertedFlights: FlightData[] = approvedFlights.map(flight => ({
      id: flight.id,
      ident: flight.aircraft,
      flight_number: flight.aircraft,
      registration: flight.aircraft,
      aircraft_type: flight.aircraftType,
      origin: { code: flight.from, city: '' },
      destination: { code: flight.to, city: '' },
      scheduled_out: flight.date,
      scheduled_in: flight.date,
      duration: parseFloat(flight.totalTime) * 60,
      remarks: flight.remarks,
      total_time: flight.totalTime,
      dual_received: flight.dualReceived,
      pic: flight.pic,
      xc: flight.crossCountry,
      night: flight.night,
      sim_inst: flight.simulatedInstrument,
      solo: flight.solo,
      actual_inst: flight.actualInstrument,
      ground: flight.groundTraining,
      photos: []
    }));
    
    onImportComplete(convertedFlights);
    setCurrentStep('complete');
  };

  const handleReset = () => {
    setCurrentStep('source');
    setParsedFlights([]);
    setSelectedFlights(new Set());
    setProcessingProgress(0);
    setProcessingMessage('');
    setSelectedSource('');
  };

  const getSourcePickerOptions = () => {
    const categories = [
      { id: 'professional', title: 'Professional Software' },
      { id: 'airline', title: 'Airline Systems' },
      { id: 'other', title: 'Other' }
    ];

    return categories.map(category => ({
      title: category.title,
      options: logbookSources
        .filter(source => source.category === category.id)
        .map(source => ({
          title: source.name,
          onPress: () => handleSourceSelect(source.id)
        }))
    }));
  };

  const renderFlightItem = ({ item }: { item: ParsedFlight }) => (
    <TouchableOpacity
      style={[
        styles.flightItem,
        selectedFlights.has(item.id) && styles.flightItemSelected
      ]}
      onPress={() => handleSelectFlight(item.id)}
    >
      <View style={styles.flightHeader}>
        <View style={styles.flightCheckbox}>
          <View style={[
            styles.checkbox,
            selectedFlights.has(item.id) && styles.checkboxSelected
          ]}>
            {selectedFlights.has(item.id) && (
              <Icon name="check" size={12} color={Colors.neutral.white} />
            )}
          </View>
        </View>
        <View style={styles.flightInfo}>
          <Text style={styles.flightDate}>{item.date || 'N/A'}</Text>
          <Text style={styles.flightAircraft}>{item.aircraft || 'N/A'}</Text>
        </View>
        <View style={styles.confidenceIndicator}>
          <View style={[
            styles.confidenceDot,
            {
              backgroundColor: item.confidence > 0.8 ? Colors.status.success :
                              item.confidence > 0.6 ? Colors.status.warning :
                              Colors.status.error
            }
          ]} />
          <Text style={styles.confidenceText}>
            {Math.round(item.confidence * 100)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.flightDetails}>
        <Text style={styles.flightRoute}>
          {item.from && item.to ? `${item.from} → ${item.to}` : 'N/A'}
        </Text>
        <Text style={styles.flightTime}>
          {item.totalTime ? `${item.totalTime}h` : 'N/A'}
        </Text>
        <Text style={styles.flightPic}>{item.pic || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSourceStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Logbook Source</Text>
      <Text style={styles.stepDescription}>
        Choose your current logbook system to help us understand the format and provide better parsing
      </Text>
      
      <TouchableOpacity
        style={styles.sourceSelector}
        onPress={() => setShowSourcePicker(true)}
      >
        <Text style={[
          styles.sourceSelectorText,
          !selectedSource && styles.sourceSelectorPlaceholder
        ]}>
          {selectedSource 
            ? logbookSources.find(s => s.id === selectedSource)?.name 
            : 'Select a logbook system...'
          }
        </Text>
        <Icon name="chevron-down" size={16} color={Colors.neutral.gray400} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedSource && styles.continueButtonDisabled
        ]}
        onPress={() => setCurrentStep('upload')}
        disabled={!selectedSource}
      >
        <Text style={[
          styles.continueButtonText,
          !selectedSource && styles.continueButtonTextDisabled
        ]}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderUploadStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Upload Your Logbook Files</Text>
      <Text style={styles.stepDescription}>
        Upload CSV, Excel (.xlsx), or PDF files from your logbook system
      </Text>
      
      <TouchableOpacity
        style={styles.uploadArea}
        onPress={handleFileUpload}
      >
        <Icon name="cloud-upload" size={48} color={Colors.neutral.gray400} />
        <Text style={styles.uploadTitle}>Upload Your Logbook Files</Text>
        <Text style={styles.uploadDescription}>
          Tap to select files or drag and drop here
        </Text>
        <Text style={styles.uploadFormats}>
          Supports CSV, Excel (.xlsx), and PDF files
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProcessingStep = () => (
    <View style={styles.stepContainer}>
      <ActivityIndicator size="large" color={Colors.brand.orangeVivid} />
      <Text style={styles.stepTitle}>Processing Files...</Text>
      <Text style={styles.processingMessage}>{processingMessage}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { width: `${processingProgress}%` }
          ]} />
        </View>
        <Text style={styles.progressText}>{processingProgress}%</Text>
      </View>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContainer}>
      {/* Summary Statistics */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Import Summary ({parsedFlights.length} flights found)
        </Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{parsedFlights.length}</Text>
            <Text style={styles.statLabel}>Total Flights</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {new Set(parsedFlights.map(f => f.aircraft).filter(a => a && a.trim())).size}
            </Text>
            <Text style={styles.statLabel}>Aircraft</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {parsedFlights.filter(f => f.confidence <= 0.5).length}
            </Text>
            <Text style={styles.statLabel}>Low Confidence</Text>
          </View>
        </View>
      </View>

      {/* Bulk Actions */}
      <View style={styles.bulkActions}>
        <Text style={styles.selectionCount}>
          {selectedFlights.size} of {parsedFlights.length} selected
        </Text>
        <View style={styles.bulkButtons}>
          <TouchableOpacity
            onPress={() => {
              const lowConfidenceFlights = parsedFlights.filter(f => f.confidence <= 0.5);
              const newSelected = new Set(selectedFlights);
              lowConfidenceFlights.forEach(flight => {
                newSelected.delete(flight.id);
              });
              setSelectedFlights(newSelected);
            }}
            style={styles.bulkButton}
          >
            <Text style={styles.bulkButtonText}>Deselect Low Confidence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedFlights(new Set())}
            style={styles.bulkButton}
          >
            <Text style={styles.bulkButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Flights List */}
      <View style={styles.flightsList}>
        <View style={styles.flightsHeader}>
          <TouchableOpacity
            onPress={handleSelectAll}
            style={styles.selectAllButton}
          >
            <View style={[
              styles.checkbox,
              selectedFlights.size === parsedFlights.length && styles.checkboxSelected
            ]}>
              {selectedFlights.size === parsedFlights.length && (
                <Icon name="check" size={12} color={Colors.neutral.white} />
              )}
            </View>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={parsedFlights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
          style={styles.flightsList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Import Actions */}
      <View style={styles.importActions}>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.actionButton, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Start Over</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleApproveSelected}
          disabled={selectedFlights.size === 0}
          style={[
            styles.actionButton,
            styles.primaryButton,
            selectedFlights.size === 0 && styles.primaryButtonDisabled
          ]}
        >
          <Text style={[
            styles.primaryButtonText,
            selectedFlights.size === 0 && styles.primaryButtonTextDisabled
          ]}>
            Import Selected ({selectedFlights.size})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCompleteStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.successIcon}>
        <Icon name="check" size={32} color={Colors.status.success} />
      </View>
      <Text style={styles.stepTitle}>Import Complete!</Text>
      <Text style={styles.stepDescription}>
        Your logbook entries have been successfully imported.
      </Text>
      
      <View style={styles.completeActions}>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.actionButton, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Import More Files</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.actionButton, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'source':
        return renderSourceStep();
      case 'upload':
        return renderUploadStep();
      case 'processing':
        return renderProcessingStep();
      case 'review':
        return renderReviewStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderSourceStep();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'source':
        return 'Select Your Logbook Source';
      case 'upload':
        return 'Upload your logbook files';
      case 'processing':
        return 'Processing your files...';
      case 'review':
        return 'Review and approve entries';
      case 'complete':
        return 'Import complete!';
      default:
        return 'Import Logbook';
    }
  };

  return (
    <>
      <AdaptiveBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title="Import Logbook"
        snapPoints={[0.95]}
        initialSnapPoint={0}
        enablePanGesture={false}
        showHandle={true}
        tabletLayout="centeredModal"
      >
        <View style={styles.adaptiveContent}>
          {/* Step Header */}
          <View style={styles.stepHeader}>
            <View style={styles.headerLeft}>
              {currentStep !== 'source' && (
                <TouchableOpacity
                  onPress={() => setCurrentStep('source')}
                  style={styles.backButton}
                >
                  <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              )}
              <View style={styles.headerInfo}>
                <Text style={styles.headerSubtitle}>{getStepTitle()}</Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <ScrollView 
            style={styles.content} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {renderCurrentStep()}
          </ScrollView>
        </View>
      </AdaptiveBottomSheet>

      {/* Source Picker Action Sheet */}
      <ActionSheet
        isOpen={showSourcePicker}
        onClose={() => setShowSourcePicker(false)}
        title="Select Logbook System"
        options={getSourcePickerOptions().flatMap(category => [
          { title: category.title, disabled: true },
          ...category.options
        ])}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  adaptiveContent: {
    flex: 1,
  },
  stepHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  stepContainer: {
    alignItems: 'center',
    gap: 24,
    paddingBottom: 32, // Extra bottom padding to ensure content is visible
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.neutral.gray900,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 24,
  },
  sourceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 8,
  },
  sourceSelectorText: {
    fontSize: 16,
    color: Colors.neutral.gray900,
  },
  sourceSelectorPlaceholder: {
    color: Colors.neutral.gray500,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.status.info,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.white,
  },
  continueButtonTextDisabled: {
    color: Colors.neutral.gray500,
  },
  uploadArea: {
    width: '100%',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  uploadDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  uploadFormats: {
    fontSize: 12,
    color: Colors.neutral.gray500,
  },
  processingMessage: {
    fontSize: 16,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.brand.orangeVivid,
  },
  progressText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.status.info,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginTop: 4,
  },
  bulkActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionCount: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  bulkButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  bulkButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 6,
  },
  bulkButtonText: {
    fontSize: 14,
    color: Colors.status.info,
  },
  flightsList: {
    width: '100%',
    maxHeight: 300,
  },
  flightsHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray700,
  },
  flightItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  flightItemSelected: {
    backgroundColor: Colors.status.infoLight,
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flightCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.status.info,
    borderColor: Colors.status.info,
  },
  flightInfo: {
    flex: 1,
  },
  flightDate: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  flightAircraft: {
    fontSize: 12,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  confidenceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 32,
  },
  flightRoute: {
    fontSize: 14,
    color: Colors.neutral.gray700,
  },
  flightTime: {
    fontSize: 14,
    color: Colors.neutral.gray700,
  },
  flightPic: {
    fontSize: 14,
    color: Colors.neutral.gray700,
  },
  importActions: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.gray200,
  },
  primaryButton: {
    backgroundColor: Colors.status.info,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral.gray700,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral.white,
  },
  primaryButtonTextDisabled: {
    color: Colors.neutral.gray500,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.status.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeActions: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
});

export default ImportLogbookModal;

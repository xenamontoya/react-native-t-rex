import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

// Mock endorsement data matching original T-Rex
const endorsementsData = [
  {
    id: 1,
    title: "Solo Flight Endorsement",
    description: "Student Pilot Solo Flight Authorization (61.87)",
    status: "completed",
    dateGiven: "2024-03-15",
    instructor: "Sarah Mitchell, CFI",
    reference: "14 CFR 61.87(n)",
    category: "Student Pilot"
  },
  {
    id: 2,
    title: "Cross-Country Solo Endorsement", 
    description: "Student Pilot Cross-Country Flight Authorization (61.93)",
    status: "completed",
    dateGiven: "2024-05-22",
    instructor: "Sarah Mitchell, CFI",
    reference: "14 CFR 61.93(c)(1)",
    category: "Student Pilot"
  },
  {
    id: 3,
    title: "Complex Aircraft Endorsement",
    description: "Authorization for retractable gear, controllable pitch propeller, and flaps",
    status: "completed",
    dateGiven: "2024-07-18",
    instructor: "Mike Thompson, CFI",
    reference: "14 CFR 61.31(e)",
    category: "Aircraft Type"
  },
  {
    id: 4,
    title: "High Performance Aircraft Endorsement",
    description: "Authorization for aircraft with engine over 200 horsepower",
    status: "pending",
    dateGiven: null,
    instructor: null,
    reference: "14 CFR 61.31(f)",
    category: "Aircraft Type"
  },
  {
    id: 5,
    title: "Tailwheel Aircraft Endorsement",
    description: "Authorization to act as PIC of tailwheel aircraft",
    status: "not_started",
    dateGiven: null,
    instructor: null,
    reference: "14 CFR 61.31(i)",
    category: "Aircraft Type"
  },
  {
    id: 6,
    title: "Night Flying Currency",
    description: "Three takeoffs and landings at night within 90 days",
    status: "completed",
    dateGiven: "2024-11-20",
    instructor: "Self-certified",
    reference: "14 CFR 61.57(b)",
    category: "Currency"
  },
  {
    id: 7,
    title: "Instrument Proficiency Check (IPC)",
    description: "Biennial instrument proficiency check",
    status: "pending",
    dateGiven: null,
    instructor: null,
    reference: "14 CFR 61.57(d)",
    category: "Instrument"
  },
  {
    id: 8,
    title: "Flight Review (BFR)",
    description: "Biennial Flight Review - 24 calendar months",
    status: "completed",
    dateGiven: "2024-09-10",
    instructor: "David Chen, CFI",
    reference: "14 CFR 61.56",
    category: "Recurrent"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return { bg: Colors.secondary.forestGreen, text: Colors.primary.white };
    case 'pending':
      return { bg: '#F59E0B', text: Colors.primary.white };
    case 'not_started':
      return { bg: Colors.neutral.gray400, text: Colors.primary.white };
    default:
      return { bg: Colors.neutral.gray400, text: Colors.primary.white };
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'checkCircle';
    case 'pending':
      return 'clock';
    case 'not_started':
      return 'plane';
    default:
      return 'plane';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'pending':
      return 'In Progress';
    case 'not_started':
      return 'Not Started';
    default:
      return 'Unknown';
  }
};

interface EndorsementCardProps {
  endorsement: any;
}

const EndorsementCard: React.FC<EndorsementCardProps> = ({ endorsement }) => {
  const statusStyle = getStatusColor(endorsement.status);
  const statusIcon = getStatusIcon(endorsement.status);
  
  return (
    <View style={styles.endorsementCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardContent}>
          <Text style={styles.endorsementTitle}>{endorsement.title}</Text>
          <Text style={styles.endorsementDescription}>{endorsement.description}</Text>
          <Text style={styles.endorsementReference}>{endorsement.reference}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Icon name={statusIcon as any} size={12} color={statusStyle.text} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {getStatusText(endorsement.status)}
            </Text>
          </View>
        </View>
      </View>
      
      {endorsement.status === 'completed' && (
        <View style={styles.completedDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date Given:</Text>
            <Text style={styles.detailValue}>
              {new Date(endorsement.dateGiven).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Instructor:</Text>
            <Text style={styles.detailValue}>{endorsement.instructor}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default function EndorsementsScreen({ navigation }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleGoBack = () => {
    navigation?.goBack();
  };

  const handleAddEndorsement = () => {
    Alert.alert('Add Endorsement', 'Add new endorsement functionality coming soon!');
  };

  const filteredEndorsements = endorsementsData.filter(endorsement => {
    const matchesSearch = endorsement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || endorsement.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Endorsements</Text>
          <Text style={styles.headerSubtitle}>Pilot certifications and authorizations</Text>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={16} color={Colors.neutral.gray500} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search endorsements..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor={Colors.neutral.gray500}
          />
        </View>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus !== 'all' && styles.filterButtonActive
          ]}
          onPress={() => setShowFilterMenu(!showFilterMenu)}
        >
          <Icon 
            name="filter" 
            size={16} 
            color={filterStatus !== 'all' ? '#00FFF2' : Colors.neutral.gray500} 
          />
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {showFilterMenu && (
        <View style={styles.filterDropdown}>
          {[
            { key: 'all', label: 'All Endorsements' },
            { key: 'completed', label: 'Completed' },
            { key: 'pending', label: 'In Progress' },
            { key: 'not_started', label: 'Not Started' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.filterOption}
              onPress={() => {
                setFilterStatus(option.key);
                setShowFilterMenu(false);
              }}
            >
              <Text style={[
                styles.filterOptionText,
                filterStatus === option.key && styles.filterOptionTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.endorsementsList}>
          {filteredEndorsements.map((endorsement) => (
            <EndorsementCard key={endorsement.id} endorsement={endorsement} />
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEndorsement}>
        <Icon name="plus" size={20} color={Colors.primary.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.primary.white,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary.black,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    borderColor: '#00FFF2',
  },
  filterDropdown: {
    position: 'absolute',
    top: 140,
    right: 16,
    width: 192,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 8,
    zIndex: 100,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  filterOptionTextActive: {
    color: '#00FFF2',
    fontFamily: Typography.fontFamily.semibold,
  },
  content: {
    flex: 1,
  },
  endorsementsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  endorsementCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  endorsementTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  endorsementDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
    lineHeight: 20,
  },
  endorsementReference: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
  },
  completedDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.black,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';

export default function ReportsScreen({ navigation }: any) {
  const handleGoBack = () => {
    navigation?.goBack();
  };

  const handleReportGeneration = (reportName: string) => {
    Alert.alert('Generate Report', `Generating report: ${reportName}`);
  };

  const reportSections = [
    {
      title: 'EXPERIENCE',
      reports: [
        { name: 'FAA 8710-1 Summary', icon: 'fileText' },
        { name: 'FAA IACRA Summary', icon: 'fileText' },
        { name: 'ATPL Qualification Report', icon: 'certificate' },
        { name: 'AirlineApps.com', icon: 'globe' },
        { name: 'Flight Experience (Resume)', icon: 'user' },
        { name: 'PilotCredentials.com', icon: 'globe' }
      ]
    },
    {
      title: 'REPORT TYPES',
      reports: [
        { name: 'Summaries', icon: 'fileText' },
        { name: 'Duties & Limits', icon: 'fileText' },
        { name: 'Graphs', icon: 'chartLine' }
      ]
    },
    {
      title: 'LOGBOOK REPORTS',
      reports: [
        { name: 'General', icon: 'fileText' },
        { name: 'USA', icon: 'fileText' },
        { name: 'Change Region', icon: 'globe' }
      ]
    },
    {
      title: 'MORE',
      reports: [
        { name: 'Certificates', icon: 'certificate' },
        { name: 'Exporters', icon: 'download' }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Custom Reports</Text>
          <Text style={styles.headerSubtitle}>Generate detailed flight reports and summaries</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionsContainer}>
          {reportSections.map((section, sectionIndex) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.reportsContainer}>
                {section.reports.map((report, reportIndex) => (
                  <TouchableOpacity
                    key={report.name}
                    style={styles.reportItem}
                    onPress={() => handleReportGeneration(report.name)}
                  >
                    <View style={styles.reportContent}>
                      <Icon 
                        name={report.icon as any} 
                        size={20} 
                        color={Colors.neutral.gray500} 
                      />
                      <Text style={styles.reportName}>{report.name}</Text>
                    </View>
                    <Icon 
                      name="chevronRight" 
                      size={16} 
                      color={Colors.neutral.gray400} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  sectionsContainer: {
    padding: 24,
    gap: 32,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    letterSpacing: 1,
    marginBottom: 16,
  },
  reportsContainer: {
    gap: 12,
  },
  reportItem: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.black,
    marginLeft: 12,
  },
  bottomPadding: {
    height: 32,
  },
});
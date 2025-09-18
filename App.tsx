import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Project T-Rex Brand Colors
const Colors = {
  primary: {
    black: '#212121',
    white: '#FFFFFF',
  },
  secondary: {
    orange1: '#F6A345',
    orange2: '#F3781F', 
    orange3: '#FE652A',
    electricBlue: '#00FFF2',
  },
  tertiary: {
    beige: '#E1D3C1',
    denimBlue: '#5177BB',
  },
  neutral: {
    gray50: '#f9fafb',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

export default function App() {
  const handleButtonPress = (action: string) => {
    Alert.alert('Action', `You pressed: ${action}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleButtonPress('Menu')}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Project T-Rex</Text>
          <Text style={styles.subtitle}>Flight Management App</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => handleButtonPress('Profile')}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Dashboard Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✈️ Dashboard</Text>
          <Text style={styles.cardDescription}>
            Your flight training overview
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleButtonPress('View Flights')}>
              <Text style={styles.buttonText}>View Flights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleButtonPress('Schedule')}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reservations Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Reservations</Text>
          <Text style={styles.cardDescription}>
            Manage your upcoming flights
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>CONFIRMED</Text>
            </View>
            <Text style={styles.dateText}>DEC 15, 2:00 PM</Text>
          </View>
          <TouchableOpacity style={[styles.button, styles.checkInButton]} onPress={() => handleButtonPress('Check In')}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </View>

        {/* Training Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎓 Training</Text>
          <Text style={styles.cardDescription}>
            Track your progress and lessons
          </Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Current Stage</Text>
            <Text style={styles.progressText}>Private Pilot License - Cross Country</Text>
          </View>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleButtonPress('Continue Training')}>
            <Text style={styles.buttonText}>Continue Training</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickButtonRow}>
            <TouchableOpacity style={styles.quickButton} onPress={() => handleButtonPress('Log Flight')}>
              <Text style={styles.quickButtonIcon}>📝</Text>
              <Text style={styles.quickButtonText}>Log Flight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickButton} onPress={() => handleButtonPress('Weather')}>
              <Text style={styles.quickButtonIcon}>🌤️</Text>
              <Text style={styles.quickButtonText}>Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickButton} onPress={() => handleButtonPress('Documents')}>
              <Text style={styles.quickButtonIcon}>📄</Text>
              <Text style={styles.quickButtonText}>Documents</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: Colors.primary.black,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: Colors.primary.white,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.white,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.secondary.electricBlue,
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    fontSize: 24,
    color: Colors.primary.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: Colors.tertiary.beige,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.primary.black,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.tertiary.denimBlue,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.neutral.gray500,
  },
  checkInButton: {
    backgroundColor: Colors.tertiary.denimBlue,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  secondaryButtonText: {
    color: Colors.neutral.gray600,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: Colors.neutral.gray500,
    fontWeight: '500',
  },
  progressContainer: {
    backgroundColor: Colors.neutral.gray50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  quickActions: {
    marginTop: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 16,
  },
  quickButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary.black,
    textAlign: 'center',
  },
});

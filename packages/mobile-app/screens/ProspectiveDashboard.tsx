import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from '../components';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// This is a React Native conversion of the original prospective.tsx dashboard
const ProspectiveDashboard: React.FC = () => {
  const navigation = useNavigation();
  const [showReservationCard, setShowReservationCard] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const isDark = false; // TODO: Connect to theme store

  useEffect(() => {
    // Check for recent booking from localStorage equivalent (AsyncStorage in real app)
    // For now, using static data
    const mockBooking = {
      completed: true,
      schoolName: 'Metro Aviation Academy',
      schoolAddress: '1234 Airport Blvd, City, ST 12345',
      dateTime: 'Aug 15, 2025 • 10:00 AM',
    };
    
    // Simulate having a recent booking
    if (Math.random() > 0.5) {
      setBookingData(mockBooking);
      setShowReservationCard(true);
    }
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }]}>
      {/* Full-width black header */}
      <View style={styles.blackHeader}>
        <Image 
          source={{ uri: '/logos/SVG/pilotbase.svg' }}
          style={styles.pilotbaseLogo}
          resizeMode="contain"
        />
      </View>
      
      {/* Edge-to-edge stripes */}
      <View style={styles.stripesContainer}>
        {/* Top stripe */}
        <View style={[styles.stripe, { backgroundColor: '#E9A757' }]} />
        
        {/* 3px black gap */}
        <View style={[styles.blackGap, { height: 3 }]} />
        
        {/* Middle stripe */}
        <View style={[styles.stripe, { backgroundColor: '#E37F39' }]} />
        
        {/* 3px black gap */}
        <View style={[styles.blackGap, { height: 3 }]} />
        
        {/* Bottom stripe */}
        <View style={[styles.stripe, { backgroundColor: '#ED703D' }]} />
        
        {/* 5px black padding under bottom stripe */}
        <View style={[styles.blackGap, { height: 5 }]} />
      </View>
      
      {/* Reservation Card - Show if there's a recent booking */}
      {showReservationCard && bookingData && (
        <View style={styles.reservationCardContainer}>
          <View style={[styles.reservationCard, { borderColor: '#00FFF2' }]}>
            <View style={styles.reservationHeader}>
              <Text style={[styles.reservationTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                What's Next
              </Text>
            </View>

            <View style={styles.reservationContent}>
              <View style={styles.reservationDetails}>
                <Text style={[styles.reservationFlightTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  Discovery Flight
                </Text>
                
                {/* Location Information */}
                <View style={styles.locationInfo}>
                  <View style={styles.locationRow}>
                    <Icon name="map-marker" size={12} color={isDark ? '#a0a0a0' : '#6b7280'} />
                    <Text style={[styles.locationText, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                      {bookingData.schoolName}
                    </Text>
                  </View>
                  <Text style={[styles.locationAddress, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                    {bookingData.schoolAddress}
                  </Text>
                </View>

                {/* Date/Time and Duration */}
                <View style={styles.dateTimeInfo}>
                  <View style={styles.dateTimeRow}>
                    <Icon name="calendar" size={12} color={isDark ? '#a0a0a0' : '#6b7280'} />
                    <Text style={[styles.dateTimeText, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                      {bookingData.dateTime}
                    </Text>
                  </View>
                  <View style={styles.dateTimeRow}>
                    <Icon name="clock-o" size={12} color={isDark ? '#a0a0a0' : '#6b7280'} />
                    <Text style={[styles.dateTimeText, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                      60 min
                    </Text>
                  </View>
                </View>

                <Text style={[styles.cost, { color: '#008333' }]}>
                  Paid: $199.00
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>

            {/* Careers in Aviation Card */}
            <TouchableOpacity style={styles.careersCard}>
              <View style={styles.careersContent}>
                <View style={[styles.careersIcon, { borderColor: '#00FFF2' }]}>
                  <Icon name="compass" size={20} color="#00FFF2" />
                </View>
                <View>
                  <Text style={styles.careersTitle}>Careers in Aviation</Text>
                  <Text style={styles.careersSubtitle}>Explore career opportunities in aviation</Text>
                </View>
              </View>
              <Icon name="arrow-right" size={16} color="#00FFF2" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <View style={styles.contentContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
            Your Journey to the Sky Starts Here
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
            Discover the thrill of flight and begin your aviation adventure
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          {/* Find a School */}
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff', borderColor: '#00FFF2' }]}
            onPress={() => navigation.navigate('ProspectiveFindSchool' as never)}
          >
            <View style={styles.actionContent}>
              <Icon 
                name="map-marker" 
                size={24} 
                color="#ED703D"
                style={styles.actionIcon}
              />
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  Find a School
                </Text>
                <Text style={[styles.actionDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  Discover flight schools near you with our interactive map
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Explore */}
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff', borderColor: '#00FFF2' }]}
            onPress={() => navigation.navigate('ProspectiveExplore' as never)}
          >
            <View style={styles.actionContent}>
              <Icon 
                name="compass" 
                size={24} 
                color="#ED703D"
                style={styles.actionIcon}
              />
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  Explore
                </Text>
                <Text style={[styles.actionDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  Learn about aviation careers and pilot training paths
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Calculator */}
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff', borderColor: '#00FFF2' }]}
            onPress={() => navigation.navigate('ProspectiveCalculator' as never)}
          >
            <View style={styles.actionContent}>
              <Icon 
                name="calculator" 
                size={24} 
                color="#ED703D"
                style={styles.actionIcon}
              />
              <View style={styles.actionText}>
                <Text style={[styles.actionTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                  Calculator
                </Text>
                <Text style={[styles.actionDescription, { color: isDark ? '#a0a0a0' : '#6b7280' }]}>
                  Compare training costs and expected aviation salaries
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Call to Action Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={['#000000', '#000000', '#ED703D']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>Ready to Take Flight?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of aspiring pilots who have started their journey with Pilotbase
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => navigation.navigate('ProspectiveFindSchool' as never)}
            >
              <Text style={styles.ctaButtonText}>Find Your Flight School</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackHeader: {
    backgroundColor: '#000000',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  pilotbaseLogo: {
    height: 32,
    width: 'auto',
  },
  stripesContainer: {
    width: '100%',
  },
  stripe: {
    height: 5,
    width: '100%',
  },
  blackGap: {
    backgroundColor: '#000000',
    width: '100%',
  },
  reservationCardContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  reservationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 24,
  },
  reservationHeader: {
    marginBottom: 16,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  reservationContent: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reservationDetails: {
    flex: 1,
  },
  reservationFlightTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  locationInfo: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  dateTimeInfo: {
    marginBottom: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateTimeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  cost: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: 'rgba(0, 255, 242, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#004D47',
  },
  careersCard: {
    backgroundColor: '#212121',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  careersContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  careersIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  careersTitle: {
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  careersSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contentContainer: {
    paddingBottom: 128,
  },
  heroSection: {
    padding: 24,
    paddingTop: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'monospace',
  },
  actionsGrid: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 16,
  },
  actionCard: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 24,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  actionIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  ctaGradient: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#75FBFD',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontWeight: '600',
    color: 'black',
  },
});

export default ProspectiveDashboard;

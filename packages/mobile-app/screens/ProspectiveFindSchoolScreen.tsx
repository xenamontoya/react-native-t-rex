import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Linking,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

// Sample flight school data
const flightSchools = [
  {
    id: 1,
    name: "Sky High Aviation Academy",
    address: "1234 Airport Blvd, San Francisco, CA 94128",
    phone: "(555) 123-4567",
    website: "https://skyhighaviation.com",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center",
    coordinates: [-122.3790, 37.6213],
    rating: 4.8,
    regulation: "141",
    specialties: ["Private Pilot", "Commercial Pilot", "Instrument Rating"],
    certificates: ["private", "commercial", "instrument"]
  },
  {
    id: 2,
    name: "Golden Gate Flight School",
    address: "5678 Aviation Way, Oakland, CA 94621",
    phone: "(555) 987-6543",
    website: "https://goldengateflight.com",
    logo: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=100&h=100&fit=crop&crop=center",
    coordinates: [-122.2712, 37.8044],
    rating: 4.6,
    regulation: "61",
    specialties: ["Private Pilot", "Helicopter Training", "CFI Program"],
    certificates: ["private", "helicopter", "cfi"]
  },
  {
    id: 3,
    name: "Bay Area Flight Training",
    address: "9012 Runway Rd, San Jose, CA 95110",
    phone: "(555) 456-7890",
    website: "https://bayareaflight.com",
    logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop&crop=center",
    coordinates: [-121.8863, 37.3382],
    rating: 4.7,
    regulation: "141",
    specialties: ["Private Pilot", "Commercial Pilot", "Multi-Engine"],
    certificates: ["private", "commercial", "multi-engine"]
  },
  {
    id: 4,
    name: "Pacific Coast Aviation",
    address: "3456 Pilot Lane, Palo Alto, CA 94303",
    phone: "(555) 321-0987",
    website: "https://pacificcoastaviation.com",
    logo: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=100&h=100&fit=crop&crop=center",
    coordinates: [-122.1430, 37.4419],
    rating: 4.9,
    regulation: "141",
    specialties: ["Private Pilot", "Instrument Rating", "ATP Program"],
    certificates: ["private", "instrument", "atp"]
  }
];

// Sample time slots for discovery flights
const timeSlots = [
  { id: 1, date: '2024-01-15', day: 'Monday', time: '9:00 AM', available: true },
  { id: 2, date: '2024-01-15', day: 'Monday', time: '2:00 PM', available: true },
  { id: 3, date: '2024-01-15', day: 'Monday', time: '4:00 PM', available: false },
  { id: 4, date: '2024-01-16', day: 'Tuesday', time: '10:00 AM', available: true },
  { id: 5, date: '2024-01-16', day: 'Tuesday', time: '1:00 PM', available: true },
  { id: 6, date: '2024-01-16', day: 'Tuesday', time: '3:30 PM', available: true },
  { id: 7, date: '2024-01-17', day: 'Wednesday', time: '8:30 AM', available: true },
  { id: 8, date: '2024-01-17', day: 'Wednesday', time: '11:00 AM', available: false },
  { id: 9, date: '2024-01-17', day: 'Wednesday', time: '5:00 PM', available: true },
  { id: 10, date: '2024-01-18', day: 'Thursday', time: '9:30 AM', available: true },
];

// Flight School Card Component
const FlightSchoolCard: React.FC<{
  school: any;
  onBookDiscoveryFlight: () => void;
}> = ({ school, onBookDiscoveryFlight }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${school.phone}`);
  };

  const handleWebsite = () => {
    Linking.openURL(school.website);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={14} color="#fbbf24" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color="#fbbf24" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star" size={14} color={Colors.neutral.gray300} />
      );
    }

    return stars;
  };

  return (
    <View style={styles.schoolCard}>
      <View style={styles.schoolHeader}>
        <Image 
          source={{ uri: school.logo }} 
          style={styles.schoolLogo}
          defaultSource={require('../assets/adaptive-icon.png')}
        />
        <View style={styles.schoolInfo}>
          <Text style={styles.schoolName}>{school.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(school.rating)}
            </View>
            <Text style={styles.ratingText}>{school.rating}</Text>
          </View>
        </View>
        <View style={styles.regulationBadge}>
          <Text style={styles.regulationText}>Part {school.regulation}</Text>
        </View>
      </View>

      <View style={styles.schoolAddress}>
        <Icon name="mapMarker" size={14} color={Colors.neutral.gray500} />
        <Text style={styles.addressText}>{school.address}</Text>
      </View>

      <View style={styles.specialtiesContainer}>
        <Text style={styles.specialtiesTitle}>Specialties:</Text>
        <View style={styles.specialtiesList}>
          {school.specialties.map((specialty: string, index: number) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.schoolActions}>
        <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
          <Icon name="phone" size={16} color={Colors.neutral.gray700} />
          <Text style={styles.contactButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton} onPress={handleWebsite}>
          <Icon name="globe" size={16} color={Colors.neutral.gray700} />
          <Text style={styles.contactButtonText}>Website</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bookButton} onPress={onBookDiscoveryFlight}>
          <Icon name="plane" size={16} color={Colors.primary.white} />
          <Text style={styles.bookButtonText}>Book Discovery Flight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Search/Filter Modal Component
const SearchFilterModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegulation: string;
  setSelectedRegulation: (reg: string) => void;
  selectedCertificate: string;
  setSelectedCertificate: (cert: string) => void;
}> = ({
  visible,
  onClose,
  searchTerm,
  setSearchTerm,
  selectedRegulation,
  setSelectedRegulation,
  selectedCertificate,
  setSelectedCertificate
}) => (
  <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Search & Filter</Text>
        <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
          <Icon name="times" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalContent}>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Search Schools</Text>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={16} color={Colors.neutral.gray400} />
            <TextInput
              style={styles.searchInput}
              placeholder="School name or location..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Training Regulation</Text>
          <View style={styles.filterOptions}>
            {['', '61', '141'].map((regulation) => (
              <TouchableOpacity
                key={regulation}
                style={[
                  styles.filterOption,
                  selectedRegulation === regulation && styles.filterOptionSelected
                ]}
                onPress={() => setSelectedRegulation(regulation)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedRegulation === regulation && styles.filterOptionTextSelected
                ]}>
                  {regulation === '' ? 'All' : `Part ${regulation}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Certificate Type</Text>
          <View style={styles.filterOptions}>
            {['', 'private', 'commercial', 'instrument', 'cfi', 'atp'].map((cert) => (
              <TouchableOpacity
                key={cert}
                style={[
                  styles.filterOption,
                  selectedCertificate === cert && styles.filterOptionSelected
                ]}
                onPress={() => setSelectedCertificate(cert)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedCertificate === cert && styles.filterOptionTextSelected
                ]}>
                  {cert === '' ? 'All Types' : cert.charAt(0).toUpperCase() + cert.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  </Modal>
);

// Booking Modal Component
const BookingModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  school: any;
  onComplete: () => void;
}> = ({ visible, onClose, school, onComplete }) => {
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    goals: ''
  });

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const renderBookingStep = () => {
    switch (bookingStep) {
      case 0: // Info screen
        return (
          <View>
            <Text style={styles.bookingTitle}>Discovery Flight</Text>
            <Text style={styles.bookingSubtitle}>
              Experience flying with a certified instructor. Perfect for beginners!
            </Text>
            
            <View style={styles.discoveryDetails}>
              <View style={styles.discoveryDetail}>
                <Icon name="clock" size={16} color={Colors.neutral.gray600} />
                <Text style={styles.discoveryDetailText}>60 minutes flight time</Text>
              </View>
              <View style={styles.discoveryDetail}>
                <Icon name="user" size={16} color={Colors.neutral.gray600} />
                <Text style={styles.discoveryDetailText}>Certified instructor included</Text>
              </View>
              <View style={styles.discoveryDetail}>
                <Icon name="plane" size={16} color={Colors.neutral.gray600} />
                <Text style={styles.discoveryDetailText}>Modern training aircraft</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price:</Text>
              <Text style={styles.priceAmount}>$199</Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setBookingStep(1)}
            >
              <Text style={styles.primaryButtonText}>Find Available Times</Text>
            </TouchableOpacity>
          </View>
        );

      case 1: // Time selection
        return (
          <View>
            <Text style={styles.bookingTitle}>Select Time</Text>
            <Text style={styles.bookingSubtitle}>
              Choose an available time slot for your discovery flight
            </Text>

            <ScrollView style={styles.timeSlotsContainer}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    !slot.available && styles.timeSlotUnavailable,
                    selectedTimeSlot?.id === slot.id && styles.timeSlotSelected
                  ]}
                  onPress={() => slot.available && setSelectedTimeSlot(slot)}
                  disabled={!slot.available}
                >
                  <View style={styles.timeSlotInfo}>
                    <Text style={[
                      styles.timeSlotDay,
                      !slot.available && styles.timeSlotUnavailableText,
                      selectedTimeSlot?.id === slot.id && styles.timeSlotSelectedText
                    ]}>
                      {slot.day}
                    </Text>
                    <Text style={[
                      styles.timeSlotTime,
                      !slot.available && styles.timeSlotUnavailableText,
                      selectedTimeSlot?.id === slot.id && styles.timeSlotSelectedText
                    ]}>
                      {slot.time}
                    </Text>
                  </View>
                  {!slot.available && (
                    <Text style={styles.unavailableLabel}>Unavailable</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.bookingActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setBookingStep(0)}
              >
                <Text style={styles.secondaryButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryButton, !selectedTimeSlot && styles.primaryButtonDisabled]}
                onPress={() => selectedTimeSlot && setBookingStep(2)}
                disabled={!selectedTimeSlot}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 2: // Contact info
        return (
          <View>
            <Text style={styles.bookingTitle}>Contact Information</Text>
            <Text style={styles.bookingSubtitle}>
              Tell us about yourself and your aviation goals
            </Text>

            <View style={styles.formContainer}>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>First Name</Text>
                  <TextInput
                    style={styles.formInput}
                    value={form.firstName}
                    onChangeText={(value) => handleFormChange('firstName', value)}
                    placeholder="First name"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Last Name</Text>
                  <TextInput
                    style={styles.formInput}
                    value={form.lastName}
                    onChangeText={(value) => handleFormChange('lastName', value)}
                    placeholder="Last name"
                  />
                </View>
              </View>

              <View style={styles.formFieldFull}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.formInput}
                  value={form.email}
                  onChangeText={(value) => handleFormChange('email', value)}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.formFieldFull}>
                <Text style={styles.formLabel}>Phone</Text>
                <TextInput
                  style={styles.formInput}
                  value={form.phone}
                  onChangeText={(value) => handleFormChange('phone', value)}
                  placeholder="(555) 123-4567"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formFieldFull}>
                <Text style={styles.formLabel}>Flying Experience</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  value={form.experience}
                  onChangeText={(value) => handleFormChange('experience', value)}
                  placeholder="Describe your flying experience (if any)"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            <View style={styles.bookingActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setBookingStep(1)}
              >
                <Text style={styles.secondaryButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  (!form.firstName || !form.lastName || !form.email) && styles.primaryButtonDisabled
                ]}
                onPress={() => setBookingStep(3)}
                disabled={!form.firstName || !form.lastName || !form.email}
              >
                <Text style={styles.primaryButtonText}>Review Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 3: // Review
        return (
          <View>
            <Text style={styles.bookingTitle}>Review Booking</Text>
            <Text style={styles.bookingSubtitle}>
              Please review your discovery flight details
            </Text>

            <View style={styles.reviewContainer}>
              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Flight School</Text>
                <Text style={styles.reviewText}>{school?.name}</Text>
                <Text style={styles.reviewSubtext}>{school?.address}</Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Date & Time</Text>
                <Text style={styles.reviewText}>
                  {selectedTimeSlot?.day}, {new Date(selectedTimeSlot?.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </Text>
                <Text style={styles.reviewSubtext}>{selectedTimeSlot?.time}</Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Contact</Text>
                <Text style={styles.reviewText}>{form.firstName} {form.lastName}</Text>
                <Text style={styles.reviewSubtext}>{form.email}</Text>
                <Text style={styles.reviewSubtext}>{form.phone}</Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Total Cost</Text>
                <Text style={styles.reviewPrice}>$199</Text>
              </View>
            </View>

            <View style={styles.bookingActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setBookingStep(2)}
              >
                <Text style={styles.secondaryButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  Alert.alert(
                    'Booking Confirmed!',
                    'Your discovery flight has been booked successfully. The flight school will contact you soon to confirm details.',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          onComplete();
                          onClose();
                        }
                      }
                    ]
                  );
                }}
              >
                <Text style={styles.primaryButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Book Discovery Flight</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Icon name="times" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {renderBookingStep()}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default function ProspectiveFindSchoolScreen() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegulation, setSelectedRegulation] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSchoolForBooking, setSelectedSchoolForBooking] = useState<any>(null);

  const filteredSchools = flightSchools.filter(school => {
    const matchesSearch = !searchTerm || 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegulation = !selectedRegulation || 
      school.regulation === selectedRegulation;
    
    const matchesCertificate = !selectedCertificate || 
      school.certificates.includes(selectedCertificate);

    return matchesSearch && matchesRegulation && matchesCertificate;
  });

  const handleBookDiscoveryFlight = (school: any) => {
    setSelectedSchoolForBooking(school);
    setShowBookingModal(true);
  };

  const handleBookingComplete = () => {
    Alert.alert(
      'Success!',
      'Your discovery flight booking has been submitted. The flight school will contact you to confirm details.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find Your Flight School</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setShowSearchModal(true)}
          >
            <Icon name="search" size={20} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={48} color={Colors.neutral.gray400} />
          <Text style={styles.mapPlaceholderText}>
            Interactive Map View
          </Text>
          <Text style={styles.mapSubtext}>
            {filteredSchools.length} flight schools in your area
          </Text>
        </View>
      </View>

      {/* Schools List */}
      <ScrollView style={styles.schoolsList} showsVerticalScrollIndicator={false}>
        <View style={styles.schoolsContainer}>
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <FlightSchoolCard
                key={school.id}
                school={school}
                onBookDiscoveryFlight={() => handleBookDiscoveryFlight(school)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color={Colors.neutral.gray300} />
              <Text style={styles.emptyStateTitle}>No Schools Found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search criteria or browse all available schools.
              </Text>
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={() => {
                  setSearchTerm('');
                  setSelectedRegulation('');
                  setSelectedCertificate('');
                }}
              >
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Search/Filter Modal */}
      <SearchFilterModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegulation={selectedRegulation}
        setSelectedRegulation={setSelectedRegulation}
        selectedCertificate={selectedCertificate}
        setSelectedCertificate={setSelectedCertificate}
      />

      {/* Booking Modal */}
      <BookingModal
        visible={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSchoolForBooking(null);
        }}
        school={selectedSchoolForBooking}
        onComplete={handleBookingComplete}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingTop: 44, // For status bar
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    height: 200,
    backgroundColor: Colors.neutral.gray100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  schoolsList: {
    flex: 1,
  },
  schoolsContainer: {
    padding: 16,
    gap: 16,
  },
  schoolCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: 20,
  },
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  schoolLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: Colors.neutral.gray100,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  regulationBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  regulationText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.status.info,
  },
  schoolAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  addressText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  specialtiesContainer: {
    marginBottom: 20,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  schoolActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.status.info,
    paddingVertical: 12,
    borderRadius: 6,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  clearFiltersButton: {
    backgroundColor: Colors.status.info,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  clearFiltersText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingTop: 44,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 32,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.primary.white,
  },
  filterOptionSelected: {
    backgroundColor: Colors.status.info,
    borderColor: Colors.status.info,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  filterOptionTextSelected: {
    color: Colors.primary.white,
  },
  // Booking modal styles
  bookingTitle: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    marginBottom: 8,
  },
  bookingSubtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 24,
    lineHeight: 24,
  },
  discoveryDetails: {
    marginBottom: 24,
    gap: 12,
  },
  discoveryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  discoveryDetailText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.gray50,
    padding: 20,
    borderRadius: 8,
    marginBottom: 32,
  },
  priceLabel: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  priceAmount: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#10b981',
  },
  primaryButton: {
    backgroundColor: Colors.status.info,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.white,
  },
  timeSlotsContainer: {
    maxHeight: 300,
    marginBottom: 24,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.primary.white,
  },
  timeSlotSelected: {
    backgroundColor: '#eff6ff',
    borderColor: Colors.status.info,
  },
  timeSlotUnavailable: {
    backgroundColor: Colors.neutral.gray50,
    opacity: 0.6,
  },
  timeSlotInfo: {
    flex: 1,
  },
  timeSlotDay: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  timeSlotTime: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  timeSlotSelectedText: {
    color: Colors.status.info,
  },
  timeSlotUnavailableText: {
    color: Colors.neutral.gray400,
  },
  unavailableLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray400,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },
  formContainer: {
    marginBottom: 24,
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formField: {
    flex: 1,
  },
  formFieldFull: {
    width: '100%',
  },
  formLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  reviewContainer: {
    marginBottom: 32,
    gap: 24,
  },
  reviewSection: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  reviewSectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  reviewSubtext: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
  },
  reviewPrice: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#10b981',
  },
});

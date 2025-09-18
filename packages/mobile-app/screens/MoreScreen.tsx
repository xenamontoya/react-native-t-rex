import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image 
} from 'react-native';
import { Icon } from '../components/Icons';

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
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

export default function MoreScreen() {
  const handleMenuPress = (item: string) => {
    Alert.alert('Navigation', `You pressed: ${item}`);
  };

  const menuCategories = [
    {
      title: 'LOGBOOK',
      items: [
        { 
          icon: 'chartBar', 
          title: 'Analytics', 
          description: 'View comprehensive flight statistics and trends' 
        },
        { 
          icon: 'chartLine', 
          title: 'Reports', 
          description: 'Generate custom flight reports and summaries' 
        },
        { 
          icon: 'clipboard', 
          title: 'Endorsements', 
          description: 'View your pilot endorsements and qualifications' 
        },
        { 
          icon: 'book', 
          title: 'My Logbook', 
          description: 'View and manage your flight logbook entries' 
        },
        { 
          icon: 'upload', 
          title: 'Import Flights', 
          description: 'Import flights from external logbooks and apps' 
        }
      ]
    },
    {
      title: 'CAREERS',
      items: [
        { 
          icon: 'briefcase', 
          title: 'Job Dashboard', 
          description: 'Explore career opportunities and track progress' 
        },
        { 
          icon: 'userTie', 
          title: 'Career Coaching', 
          description: 'One-on-one personalized career guidance' 
        },
        { 
          icon: 'fileText', 
          title: 'Resume & Cover Letter', 
          description: 'Professional writing services for aviation careers' 
        },
        { 
          icon: 'comments', 
          title: 'Interview Preparation', 
          description: 'Customized prep for airline and corporate interviews' 
        },
        { 
          icon: 'users', 
          title: 'Community', 
          description: 'Connect with pilots and stay updated with industry news' 
        }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { 
          icon: 'creditCard', 
          title: 'Billing', 
          description: 'Manage your training package and financing' 
        },
        { 
          icon: 'cog', 
          title: 'Settings', 
          description: 'Manage your account and app preferences' 
        },
        { 
          icon: 'questionCircle', 
          title: 'Help & Support', 
          description: 'Get help and contact support' 
        }
      ]
    },
    {
      title: 'SAFETY',
      items: [
        { 
          icon: 'exclamationTriangle', 
          title: 'Submit an Incident Report', 
          description: 'Anonymously report an incident or safety issue' 
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            {/* Profile Avatar */}
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>AJ</Text>
            </View>
            
            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Johnson</Text>
              <Text style={styles.profileRole}>Student Pilot • Phoenix, AZ</Text>
              
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => handleMenuPress('View Profile')}
              >
                <Text style={styles.profileButtonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Menu Categories */}
        {menuCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            {/* Category Header */}
            <Text style={styles.categoryTitle}>{category.title}</Text>
            
            {/* Category Items */}
            <View style={styles.categoryItems}>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.title)}
                >
                  <View style={styles.menuItemContent}>
                  <View style={styles.menuItemIcon}>
                    <Icon
                      name={item.icon as any}
                      size={16}
                      color={Colors.neutral.gray500}
                    />
                  </View>
                    <View style={styles.menuItemText}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Experience Mode Selector */}
        <View style={styles.experienceCard}>
          <Text style={styles.experienceTitle}>Experience Mode</Text>
          <Text style={styles.experienceDescription}>
            Switch between different user experiences for testing and prototyping purposes.
          </Text>
          
          <View style={styles.experienceOptions}>
            {/* Student Mode */}
            <TouchableOpacity 
              style={[styles.experienceOption, styles.experienceOptionActive]}
              onPress={() => handleMenuPress('Switch to Student')}
            >
              <View style={styles.experienceOptionContent}>
                <View style={styles.experienceIcon}>
                  <Icon
                    name="graduation"
                    size={20}
                    color="#3b82f6"
                  />
                </View>
                <View style={styles.experienceTextContent}>
                  <Text style={styles.experienceOptionTitle}>Student Pilot</Text>
                  <Text style={styles.experienceOptionSubtitle}>Learning to fly and building hours</Text>
                </View>
                <View style={styles.toggleActive}>
                  <Text style={styles.toggleText}>●</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Instructor Mode */}
            <TouchableOpacity 
              style={styles.experienceOption}
              onPress={() => handleMenuPress('Switch to Instructor')}
            >
              <View style={styles.experienceOptionContent}>
                <View style={[styles.experienceIcon, styles.experienceIconInactive]}>
                  <Icon
                    name="userTie"
                    size={20}
                    color={Colors.neutral.gray500}
                  />
                </View>
                <View style={styles.experienceTextContent}>
                  <Text style={styles.experienceOptionTitle}>Flight Instructor</Text>
                  <Text style={styles.experienceOptionSubtitle}>Teaching students and building hours</Text>
                </View>
                <View style={styles.toggleInactive}>
                  <Text style={styles.toggleText}>○</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Prospective Mode */}
            <TouchableOpacity 
              style={styles.experienceOption}
              onPress={() => handleMenuPress('Switch to Prospective')}
            >
              <View style={styles.experienceOptionContent}>
                <View style={[styles.experienceIcon, styles.experienceIconInactive]}>
                  <Icon
                    name="search"
                    size={20}
                    color={Colors.neutral.gray500}
                  />
                </View>
                <View style={styles.experienceTextContent}>
                  <Text style={styles.experienceOptionTitle}>Prospective Student</Text>
                  <Text style={styles.experienceOptionSubtitle}>Exploring flight training options</Text>
                </View>
                <View style={styles.toggleInactive}>
                  <Text style={styles.toggleText}>○</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding for Tab Navigation */}
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Profile Section
  profileCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.tertiary.denimBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.neutral.gray500,
    marginBottom: 12,
  },
  profileButton: {
    backgroundColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },

  // Category Sections
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral.gray500,
    marginBottom: 12,
    letterSpacing: 1,
  },
  categoryItems: {
    gap: 8,
  },
  menuItem: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
    color: Colors.neutral.gray500,
  },

  // Experience Mode
  experienceCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 14,
    color: Colors.neutral.gray500,
    marginBottom: 16,
  },
  experienceOptions: {
    gap: 12,
  },
  experienceOption: {
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: Colors.primary.white,
  },
  experienceOptionActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  experienceOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  experienceIconInactive: {
    backgroundColor: Colors.neutral.gray200,
  },
  experienceTextContent: {
    flex: 1,
  },
  experienceOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 2,
  },
  experienceOptionSubtitle: {
    fontSize: 14,
    color: Colors.neutral.gray500,
  },
  toggleActive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleInactive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 20,
    color: '#3b82f6',
  },

  bottomPadding: {
    height: 100, // Space for bottom tab navigation
  },
});

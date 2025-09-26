import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { Icon } from '../components';
import {
  Colors,
  Typography,
  Spacing,
  Button,
  Card,
  StatCard,
  FlightCard,
  ReservationCard,
  JobCard,
  LessonCard,
  AchievementItem,
  ScreenHeader,
  CardHeader,
  AIInsightsHeader,
  PoweredByPilotbasePro,
  PilotbaseIcon,
  PilotbaseWordmark,
  FloatingActionButton,
} from '../../components/src';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function ComponentLibraryScreen({ navigation, route }: any) {
  // Get section from route params if provided
  const initialSection = route?.params?.section || 'brand-assets';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  
  console.log('ComponentLibraryScreen loaded with route params:', route?.params);
  console.log('Initial section:', initialSection);

  // Update active section when route params change
  React.useEffect(() => {
    if (route?.params?.section) {
      console.log('Updating active section to:', route.params.section);
      setActiveSection(route.params.section);
    }
  }, [route?.params?.section]);

  const sections = [
    { id: 'brand-assets', title: 'Brand Assets', icon: 'award' },
    { id: 'colors', title: 'Colors', icon: 'star' },
    { id: 'typography', title: 'Typography', icon: 'fileText' },
    { id: 'icons', title: 'Icons', icon: 'checkCircle' },
    { id: 'buttons', title: 'Buttons', icon: 'list' },
    { id: 'cards', title: 'Cards', icon: 'clipboard' },
    { id: 'headers', title: 'Headers', icon: 'edit' },
  ];

  const renderColorPalette = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Color Palette</Text>
      
      {/* Primary Colors */}
      <Text style={styles.subsectionTitle}>Primary</Text>
      <View style={styles.colorGrid}>
        {Object.entries(Colors.primary).map(([name, color]) => (
          <View key={name} style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: color }]} />
            <Text style={styles.colorName}>{name}</Text>
            <Text style={styles.colorValue}>{color}</Text>
          </View>
        ))}
      </View>

      {/* Secondary Colors */}
      <Text style={styles.subsectionTitle}>Secondary</Text>
      <View style={styles.colorGrid}>
        {Object.entries(Colors.secondary).map(([name, color]) => (
          <View key={name} style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: color }]} />
            <Text style={styles.colorName}>{name}</Text>
            <Text style={styles.colorValue}>{color}</Text>
          </View>
        ))}
      </View>

      {/* Tertiary Colors */}
      <Text style={styles.subsectionTitle}>Tertiary</Text>
      <View style={styles.colorGrid}>
        {Object.entries(Colors.tertiary).map(([name, color]) => (
          <View key={name} style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: color }]} />
            <Text style={styles.colorName}>{name}</Text>
            <Text style={styles.colorValue}>{color}</Text>
          </View>
        ))}
      </View>

      {/* Neutral Colors */}
      <Text style={styles.subsectionTitle}>Neutral</Text>
      <View style={styles.colorGrid}>
        {Object.entries(Colors.neutral).map(([name, color]) => (
          <View key={name} style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: color }]} />
            <Text style={styles.colorName}>{name}</Text>
            <Text style={styles.colorValue}>{color}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTypography = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Typography System</Text>
      
      {/* Font Families */}
      <Text style={styles.subsectionTitle}>Font Families</Text>
      <View style={styles.typographyGrid}>
        {Object.entries(Typography.fontFamily).map(([name, fontFamily]) => (
          <View key={name} style={styles.typographyItem}>
            <Text style={[styles.typographySample, { fontFamily }]}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text style={styles.typographyLabel}>{name}: {fontFamily}</Text>
          </View>
        ))}
      </View>

      {/* Font Sizes */}
      <Text style={styles.subsectionTitle}>Font Sizes</Text>
      <View style={styles.typographyGrid}>
        {Object.entries(Typography.fontSize).map(([name, size]) => (
          <View key={name} style={styles.typographyItem}>
            <Text style={[styles.typographySample, { fontSize: size }]}>
              Sample Text
            </Text>
            <Text style={styles.typographyLabel}>{name}: {size}px</Text>
          </View>
        ))}
      </View>

      {/* Line Heights */}
      <Text style={styles.subsectionTitle}>Line Heights</Text>
      <View style={styles.typographyGrid}>
        {Object.entries(Typography.lineHeight).map(([name, lineHeight]) => (
          <View key={name} style={styles.typographyItem}>
            <Text style={[styles.typographySample, { lineHeight: Typography.fontSize.base * lineHeight }]}>
              This is a sample text to demonstrate line height. It spans multiple lines to show the spacing between lines.
            </Text>
            <Text style={styles.typographyLabel}>{name}: {lineHeight}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderIcons = () => {
    const iconNames = [
      'home', 'calendar', 'graduation', 'user', 'bell', 'plane', 'book',
      'briefcase', 'cog', 'chartBar', 'chartLine', 'clipboard',
      'userTie', 'fileText', 'comments', 'users', 'creditCard',
      'questionCircle', 'exclamationTriangle', 'star', 'heart',
      'checkCircle', 'times', 'edit', 'search', 'filter', 'download',
      'share', 'robot', 'mapMarker', 'clock', 'award'
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Library</Text>
        <View style={styles.iconGrid}>
          {iconNames.map((iconName) => (
            <View key={iconName} style={styles.iconItem}>
              <Icon name={iconName as any} size={24} color={Colors.neutral.gray700} />
              <Text style={styles.iconLabel}>{iconName}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderButtons = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Button Components</Text>
      
      <Text style={styles.subsectionTitle}>Primary Buttons</Text>
      <View style={styles.buttonGrid}>
        <Button title="Primary" variant="primary" onPress={() => Alert.alert('Primary Button')} />
        <Button title="Primary Disabled" variant="primary" disabled onPress={() => {}} />
      </View>

      <Text style={styles.subsectionTitle}>Secondary Buttons</Text>
      <View style={styles.buttonGrid}>
        <Button title="Secondary" variant="secondary" onPress={() => Alert.alert('Secondary Button')} />
        <Button title="Secondary Disabled" variant="secondary" disabled onPress={() => {}} />
      </View>

      <Text style={styles.subsectionTitle}>Tertiary Buttons</Text>
      <View style={styles.buttonGrid}>
        <Button title="Tertiary" variant="tertiary" onPress={() => Alert.alert('Tertiary Button')} />
        <Button title="Tertiary Disabled" variant="tertiary" disabled onPress={() => {}} />
      </View>

      <Text style={styles.subsectionTitle}>Floating Action Buttons</Text>
      <View style={styles.floatingButtonContainer}>
        <FloatingActionButton
          icon="plus"
          onPress={() => Alert.alert('FAB Pressed')}
          position={{ bottom: 20, right: 20 }}
        />
        <FloatingActionButton
          icon="robot"
          onPress={() => Alert.alert('AI FAB Pressed')}
          position={{ bottom: 20, right: 80 }}
          backgroundColor={Colors.primary.black}
          iconColor={Colors.secondary.electricBlue}
        />
      </View>
    </View>
  );

  const renderCards = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Card Components</Text>
      
      <Text style={styles.subsectionTitle}>Stat Cards</Text>
      <View style={styles.cardGrid}>
        <StatCard
          icon="plane"
          label="Total Hours"
          value="120.5"
          theme="primary"
        />
        <StatCard
          icon="graduation"
          label="Completed Lessons"
          value="45"
          theme="secondary"
        />
      </View>

      <Text style={styles.subsectionTitle}>Flight Cards</Text>
      <FlightCard
        flight={{
          id: "demo-flight-1",
          date: "2024-01-15",
          route: "KPHX → KSDL",
          aircraft: "N123AB",
          duration: "2.1",
          status: "completed",
          instructor: "John Smith"
        }}
      />

      <Text style={styles.subsectionTitle}>Lesson Cards</Text>
      <LessonCard
        lesson={{
          id: "demo-lesson-1",
          title: "Cross Country Navigation",
          instructor: "Sarah Johnson",
          date: "Jan 20, 2024",
          duration: "3.0 hrs",
          status: "scheduled"
        }}
      />

      <Text style={styles.subsectionTitle}>Job Cards</Text>
      <JobCard
        job={{
          id: 1,
          title: "First Officer",
          company: "Southwest Airlines",
          type: "Full Time",
          category: "Airline",
          location: "Phoenix, AZ",
          status: "Open",
          statusColor: "#10b981",
          logo: "https://via.placeholder.com/40x40"
        }}
      />
    </View>
  );

  const renderHeaders = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Header Components</Text>
      
      <Text style={styles.subsectionTitle}>Main Headers (no back button)</Text>
      <View style={styles.headerExample}>
        <ScreenHeader
          variant="main"
          title="My Logbook"
          rightElement={
            <TouchableOpacity>
              <Icon name="filter" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          }
        />
      </View>

      <Text style={styles.subsectionTitle}>Detail Headers (with back button)</Text>
      <View style={styles.headerExample}>
        <ScreenHeader
          variant="detail"
          title="Flight Details"
          subtitle="N123AB • KPHX → KSDL"
          onBackPress={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity>
              <Icon name="share" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>
          }
        />
      </View>

      <Text style={styles.subsectionTitle}>Card Headers</Text>
      <View style={styles.headerExample}>
        <CardHeader title="Recent Flights" onViewAllPress={() => Alert.alert('View All')} />
      </View>

      <Text style={styles.subsectionTitle}>AI Insights Headers</Text>
      <View style={styles.headerExample}>
        <AIInsightsHeader title="Training Insights" />
      </View>
    </View>
  );

  const renderBrandAssets = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Brand Assets</Text>
      <Text style={styles.description}>
        Core brand elements for consistent visual identity across the platform.
      </Text>
      
      <View style={styles.brandAssets}>
        <View style={styles.brandAsset}>
          <PilotbaseIcon width={48} height={48} />
          <Text style={styles.brandAssetLabel}>Pilotbase Icon</Text>
        </View>
        
        <View style={styles.brandAsset}>
          <PilotbaseWordmark width={120} height={30} color={Colors.primary.black} />
          <Text style={styles.brandAssetLabel}>Pilotbase Wordmark</Text>
        </View>
        
        <View style={styles.brandAsset}>
          <PoweredByPilotbasePro />
          <Text style={styles.brandAssetLabel}>Powered by Pilotbase Pro</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'brand-assets': return renderBrandAssets();
      case 'colors': return renderColorPalette();
      case 'typography': return renderTypography();
      case 'icons': return renderIcons();
      case 'buttons': return renderButtons();
      case 'cards': return renderCards();
      case 'headers': return renderHeaders();
      default: return renderBrandAssets();
    }
  };

  // Check if we're on tablet (where side navigation is used)
  const showHeader = !isTablet;

  return (
    <SafeAreaView style={styles.container}>
      {showHeader && (
        <ScreenHeader
          variant="detail"
          title={sections.find(s => s.id === activeSection)?.title || "Component Library"}
          subtitle="Design System & Components"
          onBackPress={() => setShowHamburgerMenu(true)}
          backIcon="ellipsisH"
        />
      )}
      
      <View style={styles.content}>
        {/* Hamburger Menu Modal */}
        <Modal
          visible={showHamburgerMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowHamburgerMenu(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowHamburgerMenu(false)}
          >
            <View style={styles.hamburgerMenu}>
              <Text style={styles.menuTitle}>Design System</Text>
              
              {sections.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  style={[
                    styles.menuItem,
                    activeSection === section.id && styles.menuItemActive
                  ]}
                  onPress={() => {
                    setActiveSection(section.id);
                    setShowHamburgerMenu(false);
                  }}
                >
                  <Icon
                    name={section.icon as any}
                    size={20}
                    color={activeSection === section.id ? Colors.secondary.electricBlue : Colors.neutral.gray700}
                  />
                  <Text style={[
                    styles.menuItemText,
                    activeSection === section.id && styles.menuItemTextActive
                  ]}>
                    {section.title}
                  </Text>
                  {activeSection === section.id && (
                    <Icon
                      name="checkCircle"
                      size={16}
                      color={Colors.secondary.electricBlue}
                    />
                  )}
                </TouchableOpacity>
              ))}
              
              <View style={styles.menuDivider} />
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowHamburgerMenu(false);
                  navigation.navigate('Home'); // Navigate to dashboard/prototype
                }}
              >
                <Icon
                  name="home"
                  size={20}
                  color={Colors.neutral.gray700}
                />
                <Text style={styles.menuItemText}>
                  Switch to Prototype
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderContent()}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  content: {
    flex: 1,
  },
  sectionNav: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  sectionNavContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray100,
  },
  sectionTabActive: {
    backgroundColor: Colors.secondary.electricBlue + '20',
  },
  sectionTabText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray600,
    marginLeft: 6,
  },
  sectionTabTextActive: {
    color: Colors.secondary.electricBlue,
    fontFamily: Typography.fontFamily.semibold,
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    lineHeight: 24,
    marginBottom: 24,
  },
  
  // Color Palette Styles
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  colorItem: {
    width: isTablet ? '20%' : '33.333%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  colorSwatch: {
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  colorName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    textTransform: 'capitalize',
  },
  colorValue: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray600,
  },
  
  // Typography Styles
  typographyGrid: {
    marginBottom: 16,
  },
  typographyItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
  },
  typographySample: {
    color: Colors.primary.black,
    marginBottom: 8,
  },
  typographyLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray600,
  },
  
  // Icon Styles
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconItem: {
    width: isTablet ? '12.5%' : '25%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 4,
    textAlign: 'center',
  },
  
  // Button Styles
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  floatingButtonContainer: {
    height: 100,
    position: 'relative',
  },
  
  // Card Styles
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  
  // Header Styles
  headerExample: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  
  // Overview Styles
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  overviewCard: {
    width: isTablet ? '23%' : '48%',
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  overviewCardTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray800,
    marginTop: 8,
    textAlign: 'center',
  },
  brandAssets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  brandAsset: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandAssetLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 8,
  },
  
  bottomPadding: {
    height: 100,
  },
  
  // Hamburger Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  hamburgerMenu: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    margin: 16,
    marginTop: 80, // Below header
    minWidth: 280,
    maxWidth: 320,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  menuTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.white,
  },
  menuItemActive: {
    backgroundColor: Colors.secondary.electricBlue + '10',
  },
  menuItemText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray700,
    marginLeft: 12,
    flex: 1,
  },
  menuItemTextActive: {
    color: Colors.secondary.electricBlue,
    fontFamily: Typography.fontFamily.semibold,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.neutral.gray200,
    marginVertical: 8,
    marginHorizontal: 20,
  },
});

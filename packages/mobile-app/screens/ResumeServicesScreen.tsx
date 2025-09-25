import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

export default function ResumeServicesScreen({ navigation }: any) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleBackPress = () => {
    navigation?.goBack();
  };

  // Mock service packages
  const servicePackages = [
    {
      id: 1,
      title: "Professional Resume Writing",
      description: "Expert crafted aviation-focused resume",
      price: "$199",
      turnaround: "3-5 business days",
      features: [
        "Professional aviation resume writing",
        "ATS optimization for airline applications", 
        "Industry-specific keyword integration",
        "2 rounds of revisions included",
        "Final PDF and Word formats"
      ],
      popular: true
    },
    {
      id: 2,
      title: "Cover Letter Package",
      description: "Compelling cover letters for aviation roles",
      price: "$99", 
      turnaround: "2-3 business days",
      features: [
        "Customized cover letter writing",
        "Company and role-specific targeting",
        "Professional tone and structure",
        "1 round of revisions included",
        "Multiple format options"
      ],
      popular: false
    },
    {
      id: 3,
      title: "Complete Career Package",
      description: "Resume + Cover Letter + LinkedIn optimization",
      price: "$299",
      turnaround: "5-7 business days", 
      features: [
        "Professional resume writing",
        "Custom cover letter template",
        "LinkedIn profile optimization",
        "Interview preparation guide",
        "3 rounds of revisions included",
        "90-day support guarantee"
      ],
      popular: false
    }
  ];

  // Mock process steps
  const processSteps = [
    {
      id: 1,
      title: "Upload Current Resume",
      description: "Share your existing resume or career information",
      icon: "upload",
      completed: false
    },
    {
      id: 2,
      title: "Expert Review",
      description: "Our aviation career specialists review your background", 
      icon: "userTie",
      completed: false
    },
    {
      id: 3,
      title: "Professional Writing",
      description: "Crafted by writers with aviation industry experience",
      icon: "fileText",
      completed: false
    },
    {
      id: 4,
      title: "Review & Revisions",
      description: "Collaborate on revisions until you're 100% satisfied",
      icon: "check",
      completed: false
    }
  ];

  const handleSelectPackage = (packageId: number) => {
    setSelectedService(packageId);
  };

  const handleOrderService = () => {
    if (selectedService) {
      const service = servicePackages.find(p => p.id === selectedService);
      Alert.alert(
        'Order Service',
        `Order ${service?.title} for ${service?.price}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Order Now', onPress: () => Alert.alert('Success', 'Service ordering coming soon!') }
        ]
      );
    } else {
      Alert.alert('Select Package', 'Please select a service package first');
    }
  };

  const renderServicePackage = (pkg: any) => (
    <TouchableOpacity 
      key={pkg.id}
      style={[
        styles.packageCard,
        selectedService === pkg.id && styles.selectedPackage,
        pkg.popular && styles.popularPackage
      ]}
      onPress={() => handleSelectPackage(pkg.id)}
    >
      {pkg.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
        </View>
      )}
      
      <View style={styles.packageHeader}>
        <Text style={styles.packageTitle}>{pkg.title}</Text>
        <Text style={styles.packageDescription}>{pkg.description}</Text>
        <View style={styles.packageMeta}>
          <Text style={styles.packagePrice}>{pkg.price}</Text>
          <Text style={styles.packageTurnaround}>{pkg.turnaround}</Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        {pkg.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check" size={16} color={Colors.status.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {selectedService === pkg.id && (
        <View style={styles.selectedIndicator}>
          <Icon name="check" size={16} color={Colors.primary.white} />
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderProcessStep = (step: any, index: number) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{index + 1}</Text>
      </View>
      <View style={styles.stepContent}>
        <View style={styles.stepIcon}>
          <Icon name={step.icon as any} size={20} color={Colors.accent.electricBlue} />
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Resume & Cover Letter</Text>
          <Text style={styles.headerSubtitle}>Professional writing services</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Service Packages Section */}
        <Text style={styles.sectionTitle}>SERVICE PACKAGES</Text>
        {servicePackages.map(renderServicePackage)}

        {/* Process Section */}
        <Text style={styles.sectionTitle}>OUR PROCESS</Text>
        {processSteps.map(renderProcessStep)}

        {/* Order Button */}
        <TouchableOpacity 
          style={[
            styles.orderButton,
            !selectedService && styles.disabledButton
          ]}
          onPress={handleOrderService}
          disabled={!selectedService}
        >
          <Text style={[
            styles.orderButtonText,
            !selectedService && styles.disabledButtonText
          ]}>
            Order Selected Service
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 128,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray500,
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  packageCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
    position: 'relative',
  },
  selectedPackage: {
    borderColor: Colors.accent.electricBlue,
  },
  popularPackage: {
    borderColor: Colors.accent.orange,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: Colors.accent.orange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
    letterSpacing: 0.5,
  },
  packageHeader: {
    marginBottom: 16,
  },
  packageTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  packageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packagePrice: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.accent.electricBlue,
  },
  packageTurnaround: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  featuresContainer: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    flex: 1,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent.electricBlue,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 16,
    gap: 6,
  },
  selectedText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: Colors.accent.electricBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  stepContent: {
    flex: 1,
    flexDirection: 'row',
  },
  stepIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.accent.electricBlue + '20',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  orderButton: {
    backgroundColor: Colors.primary.black,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: Colors.neutral.gray300,
  },
  orderButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  disabledButtonText: {
    color: Colors.neutral.gray500,
  },
});






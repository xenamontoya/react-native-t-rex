import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src/tokens';

// Mock notifications data (from original prototype)
const mockNotifications = [
  {
    id: '1',
    type: 'success',
    title: 'Flight Complete',
    message: 'Your flight on Dec 10 has been logged. Great job on those pattern work landings!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: '2', 
    type: 'info',
    title: 'Lesson Scheduled',
    message: 'Your Basic Maneuvers lesson with Sarah Mitchell is confirmed for Dec 15 at 2:00 PM.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'pilotbase',
    title: 'Digital Pilot Certificate',
    message: 'Upgrade to Pilotbase Pro to access your digital certificates and advanced logbook features.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Weather Advisory',
    message: 'High winds forecasted for Dec 12. Consider rescheduling morning flights.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return 'exclamationTriangle';
    case 'info':
      return 'infoCircle';
    case 'success':
      return 'checkCircle';
    case 'warning':
      return 'exclamationTriangle';
    case 'pilotbase':
      return 'graduationCap';
    default:
      return 'bell';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'alert':
      return Colors.secondary.orange3;
    case 'success':
      return '#22C55E';
    case 'pilotbase':
      return Colors.secondary.orange2;
    default:
      return Colors.neutral.gray600;
  }
};

const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
};

export default function NotificationsScreen() {
  const handleNotificationPress = (notification: any) => {
    if (notification.type === 'pilotbase') {
      Alert.alert('Pilotbase Pro', 'Upgrade to access digital certificates and advanced features');
    } else {
      Alert.alert('Notification', notification.title);
    }
  };

  const handleMarkAllRead = () => {
    Alert.alert('Mark All Read', 'All notifications marked as read');
  };

  const renderPilotbaseCard = (notification: any) => (
    <TouchableOpacity 
      key={notification.id}
      style={[styles.notificationCard, styles.pilotbaseCard]}
      onPress={() => handleNotificationPress(notification)}
    >
      {/* Pilotbase branding banner */}
      <View style={styles.pilotbaseBanner}>
        <Text style={styles.pilotbaseBannerText}>Pilotbase Pro</Text>
      </View>
      
      {/* Main content */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon 
            name={getNotificationIcon(notification.type)} 
            size={16} 
            color={getNotificationColor(notification.type)} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <View style={styles.timestampRow}>
            <View style={styles.timestampContainer}>
              <Icon name="clock" size={12} color={Colors.neutral.gray500} style={styles.timestampIcon} />
              <Text style={styles.timestampText}>{formatTimestamp(notification.timestamp)}</Text>
            </View>
            {!notification.read && <View style={styles.unreadIndicator} />}
          </View>
        </View>
      </View>
       
      {/* Upgrade button */}
      <TouchableOpacity style={styles.upgradeButton}>
        <Icon name="externalLink" size={12} color={Colors.secondary.electricBlue} style={styles.upgradeIcon} />
        <Text style={styles.upgradeButtonText}>Upgrade to Pilotbase Pro</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRegularNotification = (notification: any) => (
    <TouchableOpacity 
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadCard
      ]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon 
            name={getNotificationIcon(notification.type)} 
            size={16} 
            color={getNotificationColor(notification.type)} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <View style={styles.timestampRow}>
            <View style={styles.timestampContainer}>
              <Icon name="clock" size={12} color={Colors.neutral.gray500} style={styles.timestampIcon} />
              <Text style={styles.timestampText}>{formatTimestamp(notification.timestamp)}</Text>
            </View>
            {!notification.read && <View style={styles.unreadIndicator} />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={styles.markAllReadText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notification) => 
          notification.type === 'pilotbase' 
            ? renderPilotbaseCard(notification)
            : renderRegularNotification(notification)
        )}

        {/* Bottom Padding */}
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary.black,
  },
  markAllReadText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.tertiary.denimBlue,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  notificationCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary.electricBlue,
  },
  pilotbaseCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary.orange2,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  pilotbaseBanner: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
  },
  pilotbaseBannerText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.white,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 16, // Space for banner
  },
  notificationTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.primary.black,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampIcon: {
    marginRight: 4,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.mono,
    color: Colors.neutral.gray500,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary.electricBlue,
  },
  upgradeButton: {
    backgroundColor: Colors.primary.black,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeIcon: {
    marginRight: 8,
  },
  upgradeButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary.white,
  },
  bottomPadding: {
    height: 24,
  },
});


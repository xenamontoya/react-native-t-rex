import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Icon } from '../Icons';
import { Colors, Typography, Spacing } from '../design-system';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: string;
  rightText?: string;
  rightElement?: React.ReactNode;
  showBackButton?: boolean;
  backIcon?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  variant?: 'main' | 'detail';
}

/**
 * 📱 SCREEN HEADER COMPONENT
 * 
 * Unified header component with two variants:
 * 
 * DETAIL VARIANT (child pages - reservation details, flight details, profile):
 * - Back button (48x48, gray100) + left-aligned title/subtitle + right menu (48x48, gray50)
 * - Matches ReservationDetailsScreen, FlightDetailsScreen, LessonDetailsScreen
 * 
 * MAIN VARIANT (main pages - logbook, reservations):
 * - Just title (larger, bold) + right toggle/action element
 * - Matches LogbookScreen, ReservationsScreen
 * 
 * Usage Examples:
 * <ScreenHeader variant="detail" title="Flight Details" subtitle="UA123" onBackPress={goBack} onRightPress={menu} rightIcon="ellipsisV" />
 * <ScreenHeader variant="detail" title="Alex Johnson" subtitle="Pilot Profile" onBackPress={goBack} onRightPress={share} rightIcon="shareAlt" />
 * <ScreenHeader variant="main" title="My Logbook" rightElement={<ViewToggle />} />
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  onRightPress,
  rightIcon,
  rightText,
  rightElement,
  showBackButton = true,
  backIcon = 'arrowLeft',
  containerStyle,
  titleStyle,
  subtitleStyle,
  variant = 'detail',
}) => {
  const isMainPage = variant === 'main';
  const isDetailPage = variant === 'detail';

  if (isMainPage) {
    // Main page variant - just title + right element
    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <Text style={[styles.mainTitle, titleStyle]}>{title}</Text>
        {rightElement && rightElement}
      </View>
    );
  }

  // Detail page variant - back + title/subtitle + right action
  return (
    <View style={[styles.detailContainer, containerStyle]}>
      {/* Back Button */}
      {(showBackButton || onBackPress) && (
        <TouchableOpacity
          style={styles.detailBackButton}
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name={backIcon as any} size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
      )}

      {/* Title Container */}
      <View style={styles.detailTitleContainer}>
        <Text style={[styles.detailTitle, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.detailSubtitle, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>

      {/* Right Action */}
      {rightElement ? (
        rightElement
      ) : (onRightPress && (rightIcon || rightText)) ? (
        <TouchableOpacity
          style={styles.detailRightButton}
          onPress={onRightPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon && (
            <Icon name={rightIcon as any} size={20} color={Colors.neutral.gray600} />
          )}
          {rightText && (
            <Text style={styles.detailRightButtonText}>{rightText}</Text>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.detailSpacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Main page variant (LogbookScreen pattern)
  mainContainer: {
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
    fontFamily: Typography.fontFamily.bold,
  },

  // Detail page variant (ReservationDetailsScreen pattern)
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  detailBackButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  detailSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  detailRightButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailRightButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray700,
    fontFamily: Typography.fontFamily.medium,
  },
  detailSpacer: {
    width: 48, // Match button width for balanced layout
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Icon } from '../Icons';
import { Colors, applyTextStyle, Spacing } from '../design-system';

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
    // Main page variant - title + optional subtitle + right element
    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <View style={styles.mainTitleContainer}>
          <Text style={[styles.mainTitle, titleStyle]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.mainSubtitle, subtitleStyle]}>{subtitle}</Text>
          )}
        </View>
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
        <Text 
          style={[styles.detailTitle, titleStyle]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text 
            style={[styles.detailSubtitle, subtitleStyle]}
          >
            {subtitle}
          </Text>
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
  mainTitleContainer: {
    flex: 1,
  },
  mainTitle: {
    ...applyTextStyle('h2'),
    color: Colors.primary.black,
    lineHeight: 24, // Explicit lineHeight to prevent overlap with new typography
  },
  mainSubtitle: {
    ...applyTextStyle('bodySmall'),
    color: Colors.neutral.gray500,
    marginTop: 4,
    lineHeight: 18, // Explicit lineHeight to ensure proper spacing
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
    minWidth: 0, // Allow shrinking below natural width
    overflow: 'hidden', // Prevent content from overflowing
  },
  detailTitle: {
    ...applyTextStyle('cardTitle'),
    color: Colors.neutral.gray900,
    lineHeight: 22, // Explicit lineHeight to prevent overlap with new typography
  },
  detailSubtitle: {
    ...applyTextStyle('bodySmall'),
    color: Colors.neutral.gray500,
    marginTop: 4,
    lineHeight: 18, // Explicit lineHeight to ensure proper spacing
  },
  detailRightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    // backgroundColor: Colors.neutral.gray100, // Optional: if button needs background
    borderRadius: 24,
    marginLeft: 12,
  },
  detailRightButtonText: {
    ...applyTextStyle('cardSubtitle'),
    color: Colors.neutral.gray700,
  },
  detailSpacer: {
    width: 48, // Match button width for balanced layout
  },
});

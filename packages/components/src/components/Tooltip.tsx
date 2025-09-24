import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  LayoutChangeEvent 
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../design-system';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'press' | 'longPress' | 'both';
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: number;
  disabled?: boolean;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'auto',
  trigger = 'longPress',
  backgroundColor = Colors.primary.black,
  textColor = Colors.neutral.white,
  maxWidth = 250,
  disabled = false,
  delay = 500,
}) => {
  const [visible, setVisible] = useState(false);
  const [tooltipLayout, setTooltipLayout] = useState({ width: 0, height: 0 });
  const [childLayout, setChildLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [calculatedPosition, setCalculatedPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  
  const opacity = useRef(new Animated.Value(0)).current;
  const childRef = useRef<View>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const calculatePosition = () => {
    if (position !== 'auto') {
      setCalculatedPosition(position);
      return;
    }

    const { x, y, width, height } = childLayout;
    const padding = 10;

    // Check if tooltip fits above
    if (y - tooltipLayout.height - padding > 0) {
      setCalculatedPosition('top');
    }
    // Check if tooltip fits below
    else if (y + height + tooltipLayout.height + padding < screenHeight) {
      setCalculatedPosition('bottom');
    }
    // Check if tooltip fits to the right
    else if (x + width + tooltipLayout.width + padding < screenWidth) {
      setCalculatedPosition('right');
    }
    // Default to left
    else {
      setCalculatedPosition('left');
    }
  };

  const getTooltipStyle = () => {
    const { x, y, width, height } = childLayout;
    const arrowSize = 6;
    const padding = 8;

    let top = 0;
    let left = 0;

    switch (calculatedPosition) {
      case 'top':
        top = y - tooltipLayout.height - arrowSize - padding;
        left = x + (width / 2) - (tooltipLayout.width / 2);
        break;
      case 'bottom':
        top = y + height + arrowSize + padding;
        left = x + (width / 2) - (tooltipLayout.width / 2);
        break;
      case 'left':
        top = y + (height / 2) - (tooltipLayout.height / 2);
        left = x - tooltipLayout.width - arrowSize - padding;
        break;
      case 'right':
        top = y + (height / 2) - (tooltipLayout.height / 2);
        left = x + width + arrowSize + padding;
        break;
    }

    // Keep tooltip within screen bounds
    left = Math.max(10, Math.min(left, screenWidth - tooltipLayout.width - 10));
    top = Math.max(10, Math.min(top, screenHeight - tooltipLayout.height - 10));

    return {
      position: 'absolute' as const,
      top,
      left,
      opacity,
    };
  };

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const measureChild = () => {
    if (childRef.current) {
      childRef.current.measure((x, y, width, height, pageX, pageY) => {
        setChildLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  const handleTooltipLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  };

  const getTriggerProps = () => {
    const props: any = {};

    if (trigger === 'press' || trigger === 'both') {
      props.onPress = () => {
        measureChild();
        showTooltip();
      };
    }

    if (trigger === 'longPress' || trigger === 'both') {
      props.onLongPress = () => {
        measureChild();
        showTooltip();
      };
    }

    props.onPressOut = hideTooltip;

    return props;
  };

  return (
    <>
      <View ref={childRef}>
        <TouchableOpacity
          activeOpacity={0.8}
          {...getTriggerProps()}
        >
          {children}
        </TouchableOpacity>
      </View>

      {visible && (
        <Animated.View
          style={[
            styles.tooltip,
            {
              backgroundColor,
              maxWidth,
            },
            getTooltipStyle() as any,
          ]}
          onLayout={handleTooltipLayout}
          style={{ pointerEvents: 'none' }}
        >
          <Text style={[styles.tooltipText, { color: textColor }]}>
            {content}
          </Text>
          
          {/* Arrow */}
          <View style={[
            styles.arrow,
            calculatedPosition === 'top' && styles.arrowTop,
            calculatedPosition === 'bottom' && styles.arrowBottom,
            calculatedPosition === 'left' && styles.arrowLeft,
            calculatedPosition === 'right' && styles.arrowRight,
            { borderTopColor: calculatedPosition === 'bottom' ? backgroundColor : 'transparent' },
            { borderBottomColor: calculatedPosition === 'top' ? backgroundColor : 'transparent' },
            { borderLeftColor: calculatedPosition === 'right' ? backgroundColor : 'transparent' },
            { borderRightColor: calculatedPosition === 'left' ? backgroundColor : 'transparent' },
          ]} />
        </Animated.View>
      )}
    </>
  );
};

// Specialized tooltip for flight hours display
export const HoursTooltip: React.FC<{
  children: React.ReactNode;
  totalHours: number;
  soloHours?: number;
  dualHours?: number;
  picHours?: number;
}> = ({ children, totalHours, soloHours, dualHours, picHours }) => {
  const content = [
    `Total: ${totalHours.toFixed(1)} hours`,
    soloHours ? `Solo: ${soloHours.toFixed(1)} hours` : null,
    dualHours ? `Dual: ${dualHours.toFixed(1)} hours` : null,
    picHours ? `PIC: ${picHours.toFixed(1)} hours` : null,
  ].filter(Boolean).join('\n');

  return (
    <Tooltip content={content} position="top">
      {children}
    </Tooltip>
  );
};

// Quick help tooltip for UI elements
export const HelpTooltip: React.FC<{
  content: string;
  iconSize?: number;
  iconColor?: string;
}> = ({ content, iconSize = 16, iconColor = Colors.neutral.gray400 }) => {
  return (
    <Tooltip content={content} trigger="press" position="auto">
      <FontAwesome6 
        name="circle-question" 
        size={iconSize} 
        color={iconColor} 
      />
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  tooltipText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: 6,
    borderColor: 'transparent',
  },
  arrowTop: {
    bottom: -12,
    left: '50%',
    marginLeft: -6,
  },
  arrowBottom: {
    top: -12,
    left: '50%',
    marginLeft: -6,
  },
  arrowLeft: {
    right: -12,
    top: '50%',
    marginTop: -6,
  },
  arrowRight: {
    left: -12,
    top: '50%',
    marginTop: -6,
  },
});

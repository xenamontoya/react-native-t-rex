import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Colors, Typography, Spacing } from '../src/design-system';

const DesignSystemShowcase = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      {/* Colors */}
      <Text style={{ 
        fontSize: Typography.fontSize.xl, 
        fontFamily: Typography.fontFamily.bold,
        marginBottom: 20 
      }}>
        🎨 Design System
      </Text>

      <Text style={{ 
        fontSize: Typography.fontSize.lg, 
        fontFamily: Typography.fontFamily.semibold,
        marginBottom: 16 
      }}>
        Colors
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ 
            width: 60, 
            height: 60, 
            backgroundColor: Colors.primary.black,
            borderRadius: 8,
            marginBottom: 8 
          }} />
          <Text style={{ fontSize: 12 }}>Black</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <View style={{ 
            width: 60, 
            height: 60, 
            backgroundColor: Colors.secondary.electricBlue,
            borderRadius: 8,
            marginBottom: 8 
          }} />
          <Text style={{ fontSize: 12 }}>Electric Blue</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ 
            width: 60, 
            height: 60, 
            backgroundColor: Colors.secondary.orange3,
            borderRadius: 8,
            marginBottom: 8 
          }} />
          <Text style={{ fontSize: 12 }}>Orange</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ 
            width: 60, 
            height: 60, 
            backgroundColor: Colors.tertiary.denimBlue,
            borderRadius: 8,
            marginBottom: 8 
          }} />
          <Text style={{ fontSize: 12 }}>Denim Blue</Text>
        </View>
      </View>

      {/* Typography */}
      <Text style={{ 
        fontSize: Typography.fontSize.lg, 
        fontFamily: Typography.fontFamily.semibold,
        marginBottom: 16 
      }}>
        Typography
      </Text>

      <View style={{ marginBottom: 24 }}>
        <Text style={{ 
          fontSize: Typography.fontSize['2xl'], 
          fontFamily: Typography.fontFamily.bold,
          marginBottom: 8 
        }}>
          Heading 1 - Bold
        </Text>
        <Text style={{ 
          fontSize: Typography.fontSize.xl, 
          fontFamily: Typography.fontFamily.semibold,
          marginBottom: 8 
        }}>
          Heading 2 - Semibold
        </Text>
        <Text style={{ 
          fontSize: Typography.fontSize.base, 
          fontFamily: Typography.fontFamily.regular,
          marginBottom: 8 
        }}>
          Body text - Regular
        </Text>
        <Text style={{ 
          fontSize: Typography.fontSize.sm, 
          fontFamily: Typography.fontFamily.medium,
          color: Colors.neutral.gray500
        }}>
          Caption text - Medium
        </Text>
      </View>

      {/* Spacing */}
      <Text style={{ 
        fontSize: Typography.fontSize.lg, 
        fontFamily: Typography.fontFamily.semibold,
        marginBottom: 16 
      }}>
        Spacing Scale
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 24 }}>
        {[
          { size: Spacing.xs, label: 'XS' },
          { size: Spacing.sm, label: 'SM' },
          { size: Spacing.md, label: 'MD' },
          { size: Spacing.lg, label: 'LG' },
          { size: Spacing.xl, label: 'XL' },
        ].map(({ size, label }) => (
          <View key={label} style={{ alignItems: 'center' }}>
            <View style={{ 
              width: 40, 
              height: size, 
              backgroundColor: Colors.secondary.electricBlue,
              marginBottom: 8 
            }} />
            <Text style={{ fontSize: 10 }}>{label}</Text>
            <Text style={{ fontSize: 8, color: Colors.neutral.gray500 }}>{size}px</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const meta: Meta<typeof DesignSystemShowcase> = {
  title: '🎨 Design System/Overview',
  component: DesignSystemShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <DesignSystemShowcase />,
};
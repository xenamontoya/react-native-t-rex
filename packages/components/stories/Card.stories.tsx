import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Card } from '../src/components/Card';
import { Icon } from '../src/Icons';
import { Colors } from '../src/design-system';

const meta: Meta<typeof Card> = {
  title: '🧩 Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component that serves as the foundation for various content containers in the app.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 300, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    children: {
      description: 'Content to display inside the card',
    },
    style: {
      description: 'Additional styles to apply to the card',
    },
    onPress: {
      description: 'Callback when card is pressed (makes it touchable)',
      action: 'onPress',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary.black, marginBottom: 8 }}>
        Default Card
      </Text>
      <Text style={{ fontSize: 14, color: Colors.neutral.gray600 }}>
        This is a basic card component with default styling. Perfect for grouping related content.
      </Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic card with default styling and content.',
      },
    },
  },
};

export const FlightCard: Story = {
  render: () => (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Icon name="plane" size={20} color={Colors.secondary.orange2} />
        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary.black, marginLeft: 8 }}>
          Flight Lesson
        </Text>
      </View>
      <Text style={{ fontSize: 14, color: Colors.neutral.gray600, marginBottom: 8 }}>
        Pattern work and landing practice
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 12, color: Colors.neutral.gray500 }}>Feb 15, 2024</Text>
        <Text style={{ fontSize: 12, color: Colors.accent.green, fontWeight: '500' }}>1.5 hours</Text>
      </View>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card styled for flight-related content with icon and metadata.',
      },
    },
  },
};

export const InteractiveCard: Story = {
  render: () => (
    <Card onPress={() => alert('Card pressed!')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Icon name="graduationCap" size={18} color={Colors.tertiary.denimBlue} />
        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary.black, marginLeft: 8 }}>
          Interactive Card
        </Text>
      </View>
      <Text style={{ fontSize: 14, color: Colors.neutral.gray600 }}>
        Tap this card to see the interaction. Perfect for navigation or actions.
      </Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pressable card that responds to touch interactions.',
      },
    },
  },
};

export const StatCard: Story = {
  render: () => (
    <Card>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors.secondary.orange2, textAlign: 'center' }}>
        24.5
      </Text>
      <Text style={{ fontSize: 14, color: Colors.neutral.gray600, textAlign: 'center', marginTop: 4 }}>
        Total Hours
      </Text>
      <Text style={{ fontSize: 12, color: Colors.neutral.gray500, textAlign: 'center', marginTop: 2 }}>
        Flight Training
      </Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card displaying statistical information in a centered layout.',
      },
    },
  },
};

export const AlertCard: Story = {
  render: () => (
    <Card style={{ borderLeftWidth: 4, borderLeftColor: Colors.secondary.electricBlue }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Icon name="bell" size={16} color={Colors.secondary.electricBlue} style={{ marginTop: 2 }} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.primary.black, marginBottom: 4 }}>
            Weather Alert
          </Text>
          <Text style={{ fontSize: 13, color: Colors.neutral.gray600 }}>
            Winds expected to increase to 15-20 knots this afternoon. Consider rescheduling solo flights.
          </Text>
        </View>
      </View>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with accent border and icon for important notifications.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Card 
      style={{ 
        backgroundColor: Colors.tertiary.beige,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.secondary.orange1,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary.black, marginBottom: 8 }}>
        Custom Styled Card
      </Text>
      <Text style={{ fontSize: 14, color: Colors.neutral.gray600 }}>
        This card demonstrates custom styling with different colors, border radius, and border.
      </Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with custom styling overrides for special use cases.',
      },
    },
  },
};

export const ContentVariations: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {/* Simple Text Card */}
      <Card>
        <Text style={{ fontSize: 14, color: Colors.neutral.gray700 }}>
          Simple text content card
        </Text>
      </Card>
      
      {/* Card with Badge */}
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14, color: Colors.primary.black, fontWeight: '500' }}>
            Flight Status
          </Text>
          <View style={{ 
            backgroundColor: Colors.accent.green + '20', 
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            borderRadius: 12 
          }}>
            <Text style={{ fontSize: 12, color: Colors.accent.green, fontWeight: '500' }}>
              Completed
            </Text>
          </View>
        </View>
      </Card>
      
      {/* Card with Multiple Sections */}
      <Card>
        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary.black, marginBottom: 8 }}>
          Complex Content
        </Text>
        <View style={{ height: 1, backgroundColor: Colors.neutral.gray200, marginVertical: 12 }} />
        <Text style={{ fontSize: 14, color: Colors.neutral.gray600 }}>
          Cards can contain multiple sections with dividers and complex layouts.
        </Text>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various content patterns that work well within cards.',
      },
    },
  },
};

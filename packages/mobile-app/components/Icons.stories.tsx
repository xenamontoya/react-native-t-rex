import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Icon, NavIcon, IconNames } from './Icons';

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
    gray500: '#6b7280',
    gray600: '#4b5563',
  },
};

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(IconNames),
    },
    size: {
      control: { type: 'range', min: 12, max: 48, step: 2 },
    },
    color: {
      control: { type: 'color' },
    },
  },
  args: {
    name: 'home',
    size: 24,
    color: Colors.neutral.gray500,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
    color: Colors.neutral.gray500,
  },
};

export const Large: Story = {
  args: {
    name: 'plane',
    size: 48,
    color: Colors.secondary.electricBlue,
  },
};

export const Small: Story = {
  args: {
    name: 'check',
    size: 16,
    color: Colors.tertiary.denimBlue,
  },
};

// Navigation Icon Stories
const navMeta: Meta<typeof NavIcon> = {
  title: 'Components/NavIcon',
  component: NavIcon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['home', 'calendar', 'graduation', 'user', 'bell', 'plane', 'star', 'heart'],
    },
    isActive: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'range', min: 12, max: 48, step: 2 },
    },
    color: {
      control: { type: 'color' },
    },
    activeColor: {
      control: { type: 'color' },
    },
  },
  args: {
    name: 'home',
    isActive: false,
    size: 24,
    color: Colors.neutral.gray500,
    activeColor: Colors.primary.black,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
};

export const NavIconDefault: Story = {
  render: (args) => <NavIcon {...args} />,
  args: {
    name: 'home',
    isActive: false,
    size: 24,
    color: Colors.neutral.gray500,
    activeColor: Colors.primary.black,
  },
};

export const NavIconActive: Story = {
  render: (args) => <NavIcon {...args} />,
  args: {
    name: 'home',
    isActive: true,
    size: 24,
    color: Colors.neutral.gray500,
    activeColor: Colors.primary.black,
  },
};

// Icon Gallery
export const IconGallery: Story = {
  render: () => (
    <View style={styles.gallery}>
      <Text style={styles.galleryTitle}>Font Awesome Pro Icons Gallery</Text>
      <View style={styles.iconGrid}>
        {Object.entries(IconNames).slice(0, 20).map(([name, icon]) => (
          <View key={name} style={styles.iconItem}>
            <Icon
              name={name as keyof typeof IconNames}
              size={24}
              color={Colors.neutral.gray600}
            />
            <Text style={styles.iconLabel}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.neutral.gray50,
  },
  gallery: {
    padding: 20,
    backgroundColor: Colors.primary.white,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
  },
  iconItem: {
    alignItems: 'center',
    minWidth: 80,
    marginBottom: 16,
  },
  iconLabel: {
    fontSize: 12,
    color: Colors.neutral.gray600,
    marginTop: 8,
    textAlign: 'center',
  },
});

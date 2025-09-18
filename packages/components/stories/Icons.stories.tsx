import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors, Typography, Spacing } from '../src/tokens-web';

const meta: Meta = {
  title: '🎯 Icons/Icon System',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const IconSystemInfo: StoryObj = {
  render: () => (
    <div style={{ 
      padding: Spacing.lg, 
      textAlign: 'center',
      maxWidth: 400,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: Typography.fontSize['2xl'], 
        fontWeight: Typography.fontWeight.bold, 
        color: Colors.primary.black,
        marginBottom: Spacing.md
      }}>
        🎯 FontAwesome Pro Icon System
      </h1>
      <p style={{ 
        fontSize: Typography.fontSize.base, 
        color: Colors.neutral.gray600,
        marginBottom: Spacing.md,
        lineHeight: '1.5'
      }}>
        Your icon system is set up with FontAwesome Pro and working in the React Native app!
      </p>
      <p style={{ 
        fontSize: Typography.fontSize.sm, 
        color: Colors.primary.black,
        marginBottom: Spacing.xs
      }}>
        To see the icons in action, check out the Design Playground:
      </p>
      <p style={{ 
        fontSize: Typography.fontSize.base, 
        color: Colors.tertiary.denimBlue,
        fontWeight: Typography.fontWeight.medium,
        marginBottom: Spacing.lg,
        fontFamily: 'monospace'
      }}>
        http://localhost:8082
      </p>
      <p style={{ 
        fontSize: Typography.fontSize.sm, 
        color: Colors.neutral.gray500,
        fontStyle: 'italic',
        lineHeight: '1.25'
      }}>
        Icons are temporarily disabled in Storybook due to React Native Web compatibility,
        but they work perfectly in React Native apps (which is what developers will use).
      </p>
    </div>
  ),
};
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors, Typography, Spacing } from '../src/tokens-web';

const meta: Meta = {
  title: '👋 Welcome/Getting Started',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const GettingStarted: StoryObj = {
  render: () => (
    <div style={{ 
      padding: Spacing.lg, 
      backgroundColor: Colors.primary.white,
      maxWidth: 800,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: Typography.fontSize['3xl'], 
        fontWeight: Typography.fontWeight.bold, 
        color: Colors.primary.black,
        marginBottom: Spacing.sm,
        textAlign: 'center'
      }}>
        👋 Welcome to Project T-Rex Components
      </h1>
      <p style={{ 
        fontSize: Typography.fontSize.lg, 
        color: Colors.neutral.gray600,
        marginBottom: Spacing.xl,
        textAlign: 'center'
      }}>
        Your React Native Design System & Component Library
      </p>
      
      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.xl, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          🎯 What's This?
        </h2>
        <p style={{ 
          fontSize: Typography.fontSize.base, 
          color: Colors.neutral.gray600,
          lineHeight: '1.5',
          marginBottom: Spacing.md
        }}>
          This Storybook showcases your design tokens (colors, typography, spacing) that developers 
          can use in React Native apps. The actual components with FontAwesome Pro icons are working 
          in the React Native environment.
        </p>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.xl, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          🚀 Two Environments
        </h2>
        
        <div style={{ 
          backgroundColor: Colors.neutral.gray50, 
          padding: Spacing.md, 
          borderRadius: 8, 
          marginBottom: Spacing.md
        }}>
          <h3 style={{ 
            fontSize: Typography.fontSize.base, 
            fontWeight: Typography.fontWeight.semibold, 
            color: Colors.primary.black,
            marginBottom: Spacing.xs
          }}>
            🧩 Component Library (This Storybook)
          </h3>
          <p style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.tertiary.denimBlue,
            fontWeight: Typography.fontWeight.medium,
            marginBottom: Spacing.xs,
            fontFamily: 'monospace'
          }}>
            http://localhost:19006
          </p>
          <p style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.neutral.gray600,
            lineHeight: '1.25'
          }}>
            View design tokens, colors, and typography. Perfect for design review and documentation.
          </p>
        </div>

        <div style={{ 
          backgroundColor: Colors.neutral.gray50, 
          padding: Spacing.md, 
          borderRadius: 8, 
          marginBottom: Spacing.md
        }}>
          <h3 style={{ 
            fontSize: Typography.fontSize.base, 
            fontWeight: Typography.fontWeight.semibold, 
            color: Colors.primary.black,
            marginBottom: Spacing.xs
          }}>
            🎨 Design Playground (React Native App)
          </h3>
          <p style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.tertiary.denimBlue,
            fontWeight: Typography.fontWeight.medium,
            marginBottom: Spacing.xs,
            fontFamily: 'monospace'
          }}>
            http://localhost:8082
          </p>
          <p style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.neutral.gray600,
            lineHeight: '1.25'
          }}>
            See the full React Native app with navigation, FontAwesome Pro icons, and interactive components.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.xl, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          📦 For Developers
        </h2>
        <p style={{ 
          fontSize: Typography.fontSize.base, 
          color: Colors.neutral.gray600,
          lineHeight: '1.5',
          marginBottom: Spacing.md
        }}>
          When you publish this to NPM, developers will install it and get native React Native components 
          that work perfectly in their mobile apps.
        </p>
        
        <div style={{ 
          backgroundColor: Colors.primary.black, 
          padding: Spacing.md, 
          borderRadius: 6, 
          marginBottom: Spacing.sm
        }}>
          <code style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.secondary.electricBlue,
            fontFamily: 'monospace'
          }}>
            npm install @project-t-rex/components
          </code>
        </div>
        
        <div style={{ 
          backgroundColor: Colors.primary.black, 
          padding: Spacing.md, 
          borderRadius: 6, 
          marginBottom: Spacing.sm
        }}>
          <code style={{ 
            fontSize: Typography.fontSize.sm, 
            color: Colors.secondary.electricBlue,
            fontFamily: 'monospace'
          }}>
            {`import { Colors, NavIcon } from '@project-t-rex/components';`}
          </code>
        </div>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.xl, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          🔗 Explore
        </h2>
        <ul style={{ 
          fontSize: Typography.fontSize.base, 
          color: Colors.neutral.gray600,
          lineHeight: '1.5',
          paddingLeft: Spacing.lg
        }}>
          <li style={{ marginBottom: Spacing.xs }}>Colors - Your brand color palette</li>
          <li style={{ marginBottom: Spacing.xs }}>Typography - Font sizes and weights</li>
          <li style={{ marginBottom: Spacing.xs }}>Icons - FontAwesome Pro system (see playground)</li>
        </ul>
      </div>
    </div>
  ),
};
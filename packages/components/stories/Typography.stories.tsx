import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors, Typography, Spacing } from '../src/tokens-web';

const meta: Meta = {
  title: '✍️ Design Tokens/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const FontSizes: StoryObj = {
  render: () => (
    <div style={{ 
      padding: Spacing.lg, 
      backgroundColor: Colors.primary.white,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: Typography.fontSize['2xl'], 
        fontWeight: Typography.fontWeight.bold, 
        color: Colors.primary.black,
        marginBottom: Spacing.xl,
        textAlign: 'center'
      }}>
        Typography Scale
      </h1>
      
      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Font Sizes
        </h2>
        {Object.entries(Typography.fontSize).map(([name, size]) => (
          <div key={name} style={{ 
            marginBottom: Spacing.lg,
            paddingBottom: Spacing.md,
            borderBottom: `1px solid ${Colors.neutral.gray200}`
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: Spacing.sm
            }}>
              <span style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black
              }}>
                {name}
              </span>
              <span style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace'
              }}>
                {size}px
              </span>
            </div>
            <div style={{ 
              fontSize: size,
              color: Colors.primary.black,
              lineHeight: 1.4
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Font Weights
        </h2>
        {Object.entries(Typography.fontWeight).map(([name, weight]) => (
          <div key={name} style={{ 
            marginBottom: Spacing.lg,
            paddingBottom: Spacing.md,
            borderBottom: `1px solid ${Colors.neutral.gray200}`
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: Spacing.sm
            }}>
              <span style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black
              }}>
                {name}
              </span>
              <span style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace'
              }}>
                {weight}
              </span>
            </div>
            <div style={{ 
              fontSize: Typography.fontSize.base,
              fontWeight: weight,
              color: Colors.primary.black,
              lineHeight: 1.4
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SpacingScale: StoryObj = {
  render: () => (
    <div style={{ 
      padding: Spacing.lg, 
      backgroundColor: Colors.primary.white,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: Typography.fontSize['2xl'], 
        fontWeight: Typography.fontWeight.bold, 
        color: Colors.primary.black,
        marginBottom: Spacing.xl,
        textAlign: 'center'
      }}>
        Spacing Scale
      </h1>
      
      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Spacing Values
        </h2>
        {Object.entries(Spacing).map(([name, value]) => (
          <div key={name} style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: Spacing.md
          }}>
            <div style={{ minWidth: 120, marginRight: Spacing.md }}>
              <div style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace'
              }}>
                {value}px
              </div>
            </div>
            <div style={{
              width: value,
              height: 20,
              backgroundColor: Colors.secondary.electricBlue,
              borderRadius: 2
            }} />
          </div>
        ))}
      </div>
    </div>
  ),
};
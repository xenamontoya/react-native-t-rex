import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors, Typography, Spacing } from '../src/tokens-web';

const meta: Meta = {
  title: '🎨 Design Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const BrandColors: StoryObj = {
  render: () => (
    <div style={{ padding: Spacing.lg, backgroundColor: Colors.primary.white }}>
      <h1 style={{ 
        fontSize: Typography.fontSize['2xl'], 
        fontWeight: Typography.fontWeight.bold, 
        color: Colors.primary.black,
        marginBottom: Spacing.xl,
        textAlign: 'center'
      }}>
        Project T-Rex Brand Colors
      </h1>
      
      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Primary
        </h2>
        <div style={{ display: 'flex', gap: Spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(Colors.primary).map(([name, value]) => (
            <div key={name} style={{ alignItems: 'center', minWidth: 120, marginBottom: Spacing.md }}>
              <div style={{
                width: 80,
                height: 80,
                backgroundColor: value,
                borderRadius: 8,
                marginBottom: Spacing.sm,
                border: value === Colors.primary.white ? '1px solid #ddd' : 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
              <div style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black,
                marginBottom: Spacing.xs,
                textAlign: 'center'
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Secondary (Oranges)
        </h2>
        <div style={{ display: 'flex', gap: Spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(Colors.secondary).map(([name, value]) => (
            <div key={name} style={{ alignItems: 'center', minWidth: 120, marginBottom: Spacing.md }}>
              <div style={{
                width: 80,
                height: 80,
                backgroundColor: value,
                borderRadius: 8,
                marginBottom: Spacing.sm,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
              <div style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black,
                marginBottom: Spacing.xs,
                textAlign: 'center'
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Tertiary
        </h2>
        <div style={{ display: 'flex', gap: Spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(Colors.tertiary).map(([name, value]) => (
            <div key={name} style={{ alignItems: 'center', minWidth: 120, marginBottom: Spacing.md }}>
              <div style={{
                width: 80,
                height: 80,
                backgroundColor: value,
                borderRadius: 8,
                marginBottom: Spacing.sm,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
              <div style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black,
                marginBottom: Spacing.xs,
                textAlign: 'center'
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: Spacing.xl }}>
        <h2 style={{ 
          fontSize: Typography.fontSize.lg, 
          fontWeight: Typography.fontWeight.semibold, 
          color: Colors.primary.black,
          marginBottom: Spacing.md
        }}>
          Neutral Grays
        </h2>
        <div style={{ display: 'flex', gap: Spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(Colors.neutral).map(([name, value]) => (
            <div key={name} style={{ alignItems: 'center', minWidth: 120, marginBottom: Spacing.md }}>
              <div style={{
                width: 80,
                height: 80,
                backgroundColor: value,
                borderRadius: 8,
                marginBottom: Spacing.sm,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
              <div style={{ 
                fontSize: Typography.fontSize.sm, 
                fontWeight: Typography.fontWeight.medium, 
                color: Colors.primary.black,
                marginBottom: Spacing.xs,
                textAlign: 'center'
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: Typography.fontSize.xs, 
                color: Colors.neutral.gray500,
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
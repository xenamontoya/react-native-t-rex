/**
 * Welcome to Project T-Rex Component Library
 * Simple documentation story that works in web browsers
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const Welcome = () => {
  return (
    <div style={{
      padding: 40,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: 800,
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        🛩️ Project T-Rex Components
      </h1>
      
      <div style={{
        backgroundColor: '#e8f4f8',
        border: '1px solid #bee5eb',
        borderRadius: 8,
        padding: 20,
        marginBottom: 30,
      }}>
        <h2 style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#000',
          marginBottom: 12,
        }}>
          📱 React Native Component Library
        </h2>
        <p style={{
          fontSize: 14,
          color: '#666',
          lineHeight: 1.6,
          margin: 0,
        }}>
          This library contains <strong>8 production-ready React Native components</strong> converted 
          from the original Project T-Rex web app. Components use authentic styling including 
          electric blue (#00FFF2) and orange (#FE652A) accent colors.
        </p>
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: 8,
        padding: 20,
        marginBottom: 30,
      }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
          marginBottom: 12,
        }}>
          ✅ Available Components
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          fontSize: 14,
          color: '#666',
        }}>
          <div><strong>Button</strong> - Primary, secondary, tertiary</div>
          <div><strong>TextInput</strong> - Forms with validation</div>
          <div><strong>Checkbox</strong> - Orange accent styling</div>
          <div><strong>Toggle</strong> - Electric blue switches</div>
          <div><strong>Dropdown</strong> - Modal-based selections</div>
          <div><strong>StatusBadge</strong> - Flight status indicators</div>
          <div><strong>ProgressBar</strong> - Training progress</div>
          <div><strong>Toast</strong> - Success/error notifications</div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: 8,
        padding: 20,
        marginBottom: 30,
      }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#856404',
          marginBottom: 12,
        }}>
          💡 How to Use
        </h3>
        <div style={{
          fontSize: 14,
          color: '#856404',
          lineHeight: 1.6,
        }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>In your React Native app:</strong>
          </p>
          <pre style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: 4,
            padding: 12,
            fontSize: 12,
            color: '#495057',
            overflow: 'auto',
            margin: 0,
          }}>
{`import { 
  Button, 
  TextInput, 
  Checkbox,
  Colors,
  Typography 
} from '@project-t-rex/components';

<Button 
  title="+ Add Flight" 
  variant="primary" 
  onPress={handlePress} 
/>`}
          </pre>
        </div>
      </div>

      <div style={{
        backgroundColor: '#d1ecf1',
        border: '1px solid #bee5eb',
        borderRadius: 8,
        padding: 20,
      }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#0c5460',
          marginBottom: 12,
        }}>
          🚀 Development Status
        </h3>
        <ul style={{
          fontSize: 14,
          color: '#0c5460',
          lineHeight: 1.8,
          paddingLeft: 20,
          margin: 0,
        }}>
          <li>✅ <strong>8 core components</strong> converted and ready</li>
          <li>✅ <strong>Design system</strong> with authentic colors & typography</li>
          <li>✅ <strong>TypeScript support</strong> with full type safety</li>
          <li>✅ <strong>React Native app</strong> running on port 8081</li>
          <li>🔄 <strong>128 more components</strong> available for conversion</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof Welcome> = {
  title: '🏠 Introduction/Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Welcome />,
};
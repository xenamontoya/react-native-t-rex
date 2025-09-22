import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { Toast } from '../src/components/Toast';

const meta: Meta<typeof Toast> = {
  title: '🧩 Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
        <Toast
          type="success"
          title="Flight Logged Successfully"
          message="Your training flight has been added to your logbook."
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={0} // Don't auto-dismiss for demo
        />
      </View>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
        <Toast
          type="error"
          title="Import Failed"
          message="Unable to import logbook data. Please check your file format."
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={0}
        />
      </View>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
        <Toast
          type="success"
          title="Logbook Synced"
          message="Your flight hours have been updated."
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'View',
            onPress: () => alert('Navigate to logbook'),
          }}
          duration={0}
        />
      </View>
    );
  },
};
import type { Preview } from '@storybook/react';
import { AppRegistry } from 'react-native-web';

// Register the app for React Native Web
AppRegistry.registerComponent('StorybookApp', () => () => null);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
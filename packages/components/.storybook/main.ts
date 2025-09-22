import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // React Native Web aliases for Vite
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'react-native/Libraries/ReactNative/ReactNative': 'react-native-web',
    };

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ];

    // Exclude React Native modules completely from Vite processing
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        ...(config.optimizeDeps?.exclude || []),
        'react-native',
        'react-native-web',
        'react-native-svg',
        '@react-native-community/datetimepicker',
        'expo-document-picker',
        'expo-linear-gradient',
      ],
    };

    // Configure Vite to ignore React Native imports in node_modules
    config.define = {
      ...config.define,
      global: 'globalThis',
    };

    return config;
  },
};

export default config;
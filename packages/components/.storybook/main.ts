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

    // Configure esbuild to handle Flow syntax
    config.esbuild = {
      loader: 'tsx',
      include: /\.(tsx?|jsx?)$/,
      exclude: [],
    };

    // Exclude react-native modules from pre-bundling
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        ...(config.optimizeDeps?.exclude || []),
        'react-native',
        'react-native-web',
      ],
    };

    return config;
  },
};

export default config;
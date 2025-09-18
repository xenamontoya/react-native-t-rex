module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)', '../screens/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

import React from 'react';

// Toggle this to switch between your main app and Storybook
const SHOW_STORYBOOK = false;

const App = () => {
  if (SHOW_STORYBOOK) {
    const StorybookUIRoot = require('./storybook').default;
    return <StorybookUIRoot />;
  } else {
    const MainApp = require('./App').default;
    return <MainApp />;
  }
};

export default App;

import { getStorybookUI } from '@storybook/react-native';

import '../.storybook/main';

// Import all your stories
import '../components/Icons.stories';

const StorybookUIRoot = getStorybookUI({
  // Configure Storybook options
  shouldPersistSelection: true,
  onDeviceUI: true,
});

export default StorybookUIRoot;

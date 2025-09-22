import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from '../src/components/FloatingActionButton';
import type { FloatingActionItem } from '../src/components/FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Navigation/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An expandable floating action button with multiple menu items, matching the web app design.',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of menu items to show when expanded',
    },
    mainIcon: {
      description: 'Icon for the main FAB button',
      control: 'text',
    },
    bottom: {
      description: 'Distance from bottom of screen',
      control: 'number',
    },
    right: {
      description: 'Distance from right of screen', 
      control: 'number',
    },
    isTablet: {
      description: 'Whether to use tablet positioning (lower position for side menu)',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock action functions for stories
const mockActions = {
  addFlight: () => console.log('Add Flight clicked'),
  importFlights: () => console.log('Import Flights clicked'),
  addEndorsement: () => console.log('Add Endorsement clicked'),
  addLesson: () => console.log('Add Lesson clicked'),
  addReservation: () => console.log('Add Reservation clicked'),
};

// Logbook FAB (matching the web app)
const logbookItems: FloatingActionItem[] = [
  {
    id: 'add-flight',
    icon: 'search',
    label: 'Add Flight',
    onPress: mockActions.addFlight,
  },
  {
    id: 'import-flights',
    icon: 'upload',
    label: 'Import Flights',
    onPress: mockActions.importFlights,
  },
  {
    id: 'add-endorsement',
    icon: 'award',
    label: 'Add Endorsement',
    onPress: mockActions.addEndorsement,
  },
];

// Training FAB
const trainingItems: FloatingActionItem[] = [
  {
    id: 'add-lesson',
    icon: 'graduationCap',
    label: 'Add Lesson',
    onPress: mockActions.addLesson,
  },
  {
    id: 'add-reservation',
    icon: 'calendar',
    label: 'Add Reservation',
    onPress: mockActions.addReservation,
  },
];

// Simple FAB with one item
const simpleItems: FloatingActionItem[] = [
  {
    id: 'add-item',
    icon: 'plus',
    label: 'Add Item',
    onPress: () => console.log('Add Item clicked'),
  },
];

export const LogbookFAB: Story = {
  args: {
    items: logbookItems,
    mainIcon: 'plus',
    right: 24,
    isTablet: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'FAB used in the logbook screen with Add Flight, Import Flights, and Add Endorsement options.',
      },
    },
  },
};

export const TrainingFAB: Story = {
  args: {
    items: trainingItems,
    mainIcon: 'graduation',
    right: 24,
    isTablet: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'FAB for training screens with lesson and reservation options.',
      },
    },
  },
};

export const SimpleFAB: Story = {
  args: {
    items: simpleItems,
    mainIcon: 'plus',
    right: 24,
    isTablet: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple FAB with just one menu item.',
      },
    },
  },
};

export const TabletFAB: Story = {
  args: {
    items: logbookItems,
    mainIcon: 'plus',
    right: 24,
    isTablet: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'FAB positioned for tablet/desktop view with side menu (lower position).',
      },
    },
  },
};

export const CustomPosition: Story = {
  args: {
    items: logbookItems,
    mainIcon: 'cog',
    bottom: 200, // Custom override
    right: 50,
    isTablet: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'FAB with custom positioning and icon.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    items: [
      {
        id: 'interactive-1',
        icon: 'heart',
        label: 'Like',
        onPress: () => alert('Liked!'),
      },
      {
        id: 'interactive-2',
        icon: 'share',
        label: 'Share',
        onPress: () => alert('Shared!'),
      },
      {
        id: 'interactive-3',
        icon: 'star',
        label: 'Save',
        onPress: () => alert('Saved!'),
      },
    ],
    mainIcon: 'heart',
    right: 24,
    isTablet: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive FAB that shows alerts when menu items are clicked.',
      },
    },
  },
};

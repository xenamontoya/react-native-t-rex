import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { TabBar, FlightTrainingTabs, StudentTabs, InstructorTabs } from '../src/components/TabBar';
import { 
  DrawerMenu, 
  FlightTrainingDrawerSections, 
  StudentDrawerSections, 
  InstructorDrawerSections 
} from '../src/components/DrawerMenu';
import { Button } from '../src/components/Button';

const meta: Meta<typeof TabBar> = {
  title: '🧩 Components/Navigation',
  component: TabBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350, backgroundColor: 'white' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FlightTrainingTabBar: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <TabBar
        tabs={FlightTrainingTabs}
        activeIndex={activeTab}
        onTabPress={(index, tab) => {
          setActiveTab(index);
          console.log('Tab pressed:', tab.name);
        }}
      />
    );
  },
};

export const StudentTabBar: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <TabBar
        tabs={StudentTabs}
        activeIndex={activeTab}
        onTabPress={(index, tab) => {
          setActiveTab(index);
          console.log('Tab pressed:', tab.name);
        }}
      />
    );
  },
};

export const InstructorTabBar: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <TabBar
        tabs={InstructorTabs}
        activeIndex={activeTab}
        onTabPress={(index, tab) => {
          setActiveTab(index);
          console.log('Tab pressed:', tab.name);
        }}
      />
    );
  },
};

export const TabBarWithBadges: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    
    const tabsWithBadges = [
      { name: 'Home', icon: 'house', label: 'Home' },
      { name: 'Reservations', icon: 'calendar', label: 'Schedule', badge: 3 },
      { name: 'Training', icon: 'graduation-cap', label: 'Training' },
      { name: 'Logbook', icon: 'book', label: 'Logbook' },
      { name: 'More', icon: 'ellipsis', label: 'More', badge: 12 },
    ];
    
    return (
      <TabBar
        tabs={tabsWithBadges}
        activeIndex={activeTab}
        onTabPress={(index, tab) => {
          setActiveTab(index);
          console.log('Tab pressed:', tab.name);
        }}
      />
    );
  },
};

export const CompactTabBar: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(2);
    
    return (
      <TabBar
        tabs={FlightTrainingTabs}
        activeIndex={activeTab}
        onTabPress={(index, tab) => {
          setActiveTab(index);
          console.log('Tab pressed:', tab.name);
        }}
        height={50}
        showLabels={false}
      />
    );
  },
};

export const FlightTrainingDrawer: Story = {
  render: () => {
    const [activeRoute, setActiveRoute] = useState('Dashboard');
    
    return (
      <View style={{ height: 600, backgroundColor: '#f5f5f5' }}>
        <DrawerMenu
          sections={FlightTrainingDrawerSections}
          activeRoute={activeRoute}
          onItemPress={(item) => {
            if (item.comingSoon) {
              Alert.alert('Coming Soon', `${item.label} feature is coming soon!`);
            } else {
              setActiveRoute(item.name);
              console.log('Drawer item pressed:', item.name);
            }
          }}
          userInfo={{
            name: 'Alex Johnson',
            role: 'Student Pilot',
          }}
          onClose={() => console.log('Drawer closed')}
        />
      </View>
    );
  },
};

export const StudentDrawer: Story = {
  render: () => {
    const [activeRoute, setActiveRoute] = useState('Dashboard');
    
    return (
      <View style={{ height: 500, backgroundColor: '#f5f5f5' }}>
        <DrawerMenu
          sections={StudentDrawerSections}
          activeRoute={activeRoute}
          onItemPress={(item) => {
            setActiveRoute(item.name);
            console.log('Student drawer item:', item.name);
          }}
          userInfo={{
            name: 'Emma Rodriguez',
            role: 'Student Pilot',
          }}
        />
      </View>
    );
  },
};

export const InstructorDrawer: Story = {
  render: () => {
    const [activeRoute, setActiveRoute] = useState('Students');
    
    return (
      <View style={{ height: 500, backgroundColor: '#f5f5f5' }}>
        <DrawerMenu
          sections={InstructorDrawerSections}
          activeRoute={activeRoute}
          onItemPress={(item) => {
            if (item.comingSoon) {
              Alert.alert('Feature Preview', `${item.label} is in development`);
            } else {
              setActiveRoute(item.name);
              console.log('Instructor drawer item:', item.name);
            }
          }}
          userInfo={{
            name: 'Sarah Chen',
            role: 'Certified Flight Instructor',
          }}
          footerComponent={
            <View style={{ padding: 16, gap: 12 }}>
              <Button
                title="Sign Out"
                variant="secondary"
                size="small"
                onPress={() => Alert.alert('Sign Out', 'Logged out successfully')}
              />
            </View>
          }
        />
      </View>
    );
  },
};

export const DrawerWithBadges: Story = {
  render: () => {
    const sectionsWithBadges = [
      {
        title: 'MAIN',
        items: [
          { name: 'Dashboard', label: 'Dashboard', icon: 'house' },
          { name: 'Reservations', label: 'Reservations', icon: 'calendar', badge: 2 },
          { name: 'Training', label: 'Training', icon: 'graduation-cap', badge: 5 },
          { name: 'Logbook', label: 'Logbook', icon: 'book' },
        ],
      },
      {
        title: 'NOTIFICATIONS',
        items: [
          { name: 'Messages', label: 'Messages', icon: 'envelope', badge: 12 },
          { name: 'Alerts', label: 'Flight Alerts', icon: 'bell', badge: 3 },
        ],
      },
    ];
    
    return (
      <View style={{ height: 400, backgroundColor: '#f5f5f5' }}>
        <DrawerMenu
          sections={sectionsWithBadges}
          activeRoute="Training"
          onItemPress={(item) => console.log('Item with badge:', item.name)}
          userInfo={{
            name: 'Pilot Student',
            role: 'Private Pilot',
          }}
        />
      </View>
    );
  },
};

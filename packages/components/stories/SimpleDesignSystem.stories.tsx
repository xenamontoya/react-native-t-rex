import type { Meta, StoryObj } from '@storybook/react';

// Simple web-only design system showcase
const DesignSystemShowcase = () => {
  const colors = {
    primary: {
      black: '#212121',
      white: '#FFFFFF',
    },
    secondary: {
      orange1: '#F6A345',
      orange2: '#F3781F',
      orange3: '#FE652A',
      electricBlue: '#00FFF2',
    },
    tertiary: {
      beige: '#E1D3C1',
      denimBlue: '#5177BB',
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: colors.primary.black, marginBottom: '24px' }}>
        🎨 Project T-Rex Design System
      </h1>
      
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: colors.tertiary.denimBlue, marginBottom: '16px' }}>
          Color Palette
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {Object.entries(colors).map(([categoryName, categoryColors]) => (
            <div key={categoryName} style={{ minWidth: '200px' }}>
              <h3 style={{ 
                textTransform: 'capitalize', 
                marginBottom: '8px',
                color: colors.primary.black 
              }}>
                {categoryName}
              </h3>
              {Object.entries(categoryColors).map(([colorName, colorValue]) => (
                <div 
                  key={colorName}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: colorValue,
                      borderRadius: '4px',
                      marginRight: '12px',
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>
                      {colorName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {colorValue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ color: colors.tertiary.denimBlue, marginBottom: '16px' }}>
          Typography
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: colors.primary.black }}>
            Heading 1 - Degular Bold
          </div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: colors.primary.black }}>
            Heading 2 - Degular Semibold
          </div>
          <div style={{ fontSize: '18px', fontWeight: '500', color: colors.primary.black }}>
            Heading 3 - Degular Medium
          </div>
          <div style={{ fontSize: '16px', color: colors.primary.black }}>
            Body Text - Degular Regular
          </div>
          <div style={{ fontSize: '14px', color: colors.tertiary.denimBlue }}>
            Caption Text - Degular Regular
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof DesignSystemShowcase> = {
  title: 'Design System/Overview',
  component: DesignSystemShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

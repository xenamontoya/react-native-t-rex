# 🛩️ Project T-Rex Component Library

## 📱 React Native Components

All components are designed for React Native and use authentic styling from the original Project T-Rex web app.

## 🎨 Design System

### Colors
- **Primary**: Black (#000000), White (#ffffff)
- **Secondary**: Electric Blue (#00FFF2), Orange (#FE652A)
- **Tertiary**: Denim Blue (#5A8FCF)
- **Status**: Error (#ef4444), Success (#10b981)

### Typography
- **Font Family**: "Degular" with fallbacks
- **Weights**: Regular, Medium, Semibold, Bold
- **Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px)

## 🧩 Available Components

### Button
```typescript
import { Button } from '@project-t-rex/components';

<Button 
  title="+ Add Flight"
  variant="primary" // 'primary' | 'secondary' | 'tertiary'
  size="medium"     // 'small' | 'medium' | 'large'
  onPress={() => {}}
  disabled={false}
/>
```

**Variants:**
- **Primary**: Black background, white text
- **Secondary**: Black background, white text, electric blue border
- **Tertiary**: Transparent background, denim blue text

### TextInput
```typescript
import { TextInput } from '@project-t-rex/components';

<TextInput
  label="Email Address"
  placeholder="pilot@example.com"
  value={email}
  onChangeText={setEmail}
  required
  error="Please enter a valid email"
  hint="This will be used for notifications"
/>
```

### Checkbox
```typescript
import { Checkbox } from '@project-t-rex/components';

<Checkbox
  label="Enable notifications"
  checked={isChecked}
  onChange={setIsChecked}
  size="medium"     // 'small' | 'medium' | 'large'
  variant="default" // 'default' | 'error'
/>
```

### Toggle
```typescript
import { Toggle } from '@project-t-rex/components';

<Toggle
  label="Dark Mode"
  description="Switch to dark theme"
  value={isDarkMode}
  onValueChange={setIsDarkMode}
  size="medium"
/>
```

### Dropdown
```typescript
import { Dropdown } from '@project-t-rex/components';

const options = [
  { label: 'Cessna 152', value: 'c152' },
  { label: 'Cessna 172', value: 'c172' },
];

<Dropdown
  label="Aircraft Type"
  placeholder="Select Aircraft"
  options={options}
  value={selectedAircraft}
  onSelect={(option) => setSelectedAircraft(option.value)}
/>
```

### StatusBadge
```typescript
import { StatusBadge } from '@project-t-rex/components';

<StatusBadge 
  status="scheduled"    // 'scheduled' | 'confirmed' | 'complete' | etc.
  size="medium"
/>
```

### ProgressBar
```typescript
import { ProgressBar } from '@project-t-rex/components';

<ProgressBar
  progress={75}         // 0-100
  height={8}
  showPercentage
/>
```

### Toast
```typescript
import { Toast, useToast } from '@project-t-rex/components';

const { showSuccess, showError } = useToast();

// Show success message
showSuccess("Flight logged successfully!");

// Show error message  
showError("Failed to save flight data", "Network Error");
```

## 🚀 Usage in React Native App

```typescript
// In your React Native screens/components:
import { 
  Button, 
  TextInput, 
  Checkbox, 
  StatusBadge,
  Colors,
  Typography,
  Spacing 
} from '@project-t-rex/components';

export const MyScreen = () => {
  return (
    <View style={{ padding: Spacing.lg }}>
      <Text style={{ 
        fontSize: Typography.fontSize.xl,
        color: Colors.primary.black 
      }}>
        Flight Training
      </Text>
      
      <Button
        title="+ New Flight"
        variant="primary"
        onPress={handleAddFlight}
      />
    </View>
  );
};
```

## 📦 Installation

```bash
npm install @project-t-rex/components
```

## 🎯 Design Principles

1. **Authentic**: Matches original Project T-Rex web app exactly
2. **Accessible**: Proper labels, focus states, screen reader support
3. **Performant**: Optimized for React Native
4. **Consistent**: Uses centralized design tokens
5. **Aviation-focused**: Built specifically for flight training workflows

## 🛠️ Development

- **React Native**: All components use React Native primitives
- **TypeScript**: Full type safety
- **Design System**: Centralized colors, typography, spacing
- **Tested**: Each component has comprehensive examples

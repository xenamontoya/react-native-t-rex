# 🛩️ Project T-Rex Assets

## 📂 Asset Structure

```
assets/
├── fonts/                          # Degular font family (28 files)
├── images/                         # All logos, icons, and graphics
│   ├── flight-schedule-pro-logo.svg # Main brand logo
│   ├── flights.svg                 # Flight icon
│   ├── thewayofcolor-*.png         # Background image
│   └── logos/                      # Company & partner logos
│       ├── flight-aware.png        # FlightAware integration
│       ├── fsp-icon.png           # FSP icon
│       ├── logo-collapsed.svg      # Collapsed brand logo
│       ├── logo-expanded.svg       # Full brand logo
│       ├── logten-dark.png        # LogTen Pro integration
│       ├── SportysLogo.png        # Sporty's partnership
│       ├── xena-signature.png     # Personal signature
│       └── SVG/                   # Pilotbase assets
│           ├── pilotbase-icon.svg
│           ├── pilotbase-pro.svg
│           ├── pilotbase.svg
│           └── SVG/
│               └── nameplate.svg
├── adaptive-icon.png              # Android adaptive icon
├── favicon.png                    # Web favicon
├── icon.png                       # App icon
└── splash-icon.png               # Splash screen icon
```

## 🎯 How to Use Assets

### Import from Index
```typescript
import { 
  brandLogos, 
  partnerLogos, 
  pilotbaseAssets,
  backgrounds,
  icons 
} from '../assets/images';

// Use in components
<Image source={brandLogos.expanded} />
<Image source={partnerLogos.flightAware} />
<Image source={backgrounds.main} />
```

### Direct Import
```typescript
import { logoExpanded } from '../assets/images';

<Image source={logoExpanded} style={{ width: 200, height: 50 }} />
```

### SVG Assets
For SVG files in React Native, you might need to use `react-native-svg`:
```typescript
import { SvgXml } from 'react-native-svg';
// SVG content would need to be loaded as text
```

## 📱 Asset Guidelines

### Logos
- **Main Brand**: Use `logoExpanded` for headers, `logoCollapsed` for compact spaces
- **Partners**: Display partner logos in appropriate contexts (integrations, about pages)
- **Pilotbase**: Use for aviation-specific features

### Images
- **Background**: Use for splash screens, landing pages
- **Icons**: Use for navigation, feature highlights

### Sizing
- **Mobile**: Scale appropriately for touch targets (44px minimum)
- **Web**: Maintain aspect ratios, use responsive sizing
- **Retina**: Provide 2x/3x variants where needed

## 🔄 Migration Source
Assets copied from: `xenamontoya/project-t-rex/public/`
All original branding and partnership assets preserved.

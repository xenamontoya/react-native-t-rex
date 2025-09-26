# 🎯 Font Weight Standardization Plan

## ✅ **DEGULAR MONO FIXES COMPLETED**
**All 25 instances** of generic `'monospace'` → `Typography.fontFamily.mono` (Degular Mono)

## 🚨 **MIXED FONT WEIGHT USAGE IDENTIFIED**

### **Found Issues**:
- **8 instances** of `fontWeight: 'bold'`
- **16 instances** of `fontWeight: '600'|'500'` 

### **Problem**: 
When using **Degular font families**, we should specify the font family (e.g., `Degular-Bold`) rather than using `fontWeight` property. The fontWeight property is for system fonts.

## 🔧 **STANDARDIZATION APPROACH**

### **Current Bad Pattern**:
```tsx
title: {
  fontSize: 18,
  fontWeight: 'bold',    // ❌ Wrong for custom fonts
  color: '#111827',      // ❌ Hardcoded color
}
```

### **Better Pattern**:
```tsx
title: {
  fontSize: 18,
  fontFamily: Typography.fontFamily.bold,  // ✅ Degular-Bold
  color: Colors.neutral.gray900,           // ✅ Design system
}
```

### **Best Pattern (Semantic)**:
```tsx
title: {
  ...applyTextStyle('cardTitle'),  // ✅ Includes proper Degular-Semibold
  color: Colors.neutral.gray900,   // ✅ Design system
}
```

## 📋 **REPLACEMENT MAPPING**

### **Font Weight → Degular Family**:
- `fontWeight: 'bold'` → `fontFamily: Typography.fontFamily.bold` (Degular-Bold)
- `fontWeight: '600'` → `fontFamily: Typography.fontFamily.semibold` (Degular-Semibold)  
- `fontWeight: '500'` → `fontFamily: Typography.fontFamily.medium` (Degular-Medium)
- `fontWeight: '400'` → `fontFamily: Typography.fontFamily.regular` (Degular-Regular)

### **Better: Use Semantic Styles**:
- Page titles → `applyTextStyle('h1')` or `applyTextStyle('h2')`
- Card titles → `applyTextStyle('cardTitle')`
- Stat values → `applyTextStyle('statValue')`
- Labels → `applyTextStyle('label')`

## 🎯 **FILES TO FIX**

### **High Priority (Most Impact)**:
1. **InstructorMyFlights.tsx**: 7 instances
2. **InstructorDashboard.tsx**: 9 instances  
3. **ReservationsScreen.tsx**: 2 instances
4. **MoreScreen.tsx**: 1 inline style

## 🚀 **EXECUTION PLAN**

### **Phase 1**: Fix fontWeight → fontFamily (preserves exact appearance)
### **Phase 2**: Replace with semantic styles where appropriate (better maintenance)

This ensures **zero visual changes** while improving typography consistency and maintainability.

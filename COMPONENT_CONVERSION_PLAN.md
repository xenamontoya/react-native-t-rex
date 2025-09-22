# 🛩️ Project T-Rex Component Conversion Plan

## 📊 Overview
Converting 136 React web components to React Native components from `/Users/xenamontoya/project-t-rex`

## 🎯 Priority Categories

### **Phase 1: Core UI Foundation (Priority 1)** 🚀 IN PROGRESS
*Essential components needed for basic app functionality*

#### Buttons & Actions (8 components)
- [x] ~~Button~~ ✅ CONVERTED  
- [ ] Buttondropdown
- [ ] Buttonicon  
- [ ] Buttoniconmenu
- [ ] Buttonprimaryblue 
- [ ] Buttonprimarygrey
- [ ] Buttonprimaryred
- [ ] Buttonsecondary
- [ ] Buttontertiary

#### Form Controls (6 components) - ✅ CORE COMPLETE
- [x] ~~Textfield~~ ✅ CONVERTED (as TextInput)
- [x] ~~Checkbox~~ ✅ CONVERTED
- [ ] Radiobutton
- [x] ~~Toggle~~ ✅ CONVERTED
- [x] ~~Dropdown~~ ✅ CONVERTED
- [ ] ~~Dropdownitem~~ (consolidated into Dropdown)

#### Layout & Structure (6 components)
- [ ] DashboardLayout ⚠️ PARTIALLY CONVERTED (basic structure exists)
- [ ] Header
- [ ] Footer  
- [ ] Sidebar
- [ ] MainContent
- [ ] TabDivider

#### Feedback & Status (5 components)
- [x] ~~StatusBadge~~ ✅ CONVERTED
- [x] ~~ProgressBar~~ ✅ CONVERTED
- [ ] Toasterror
- [ ] Toastsuccess
- [ ] EmptyState
- [ ] Tooltip

---

### **Phase 2: Navigation & Interaction (Priority 2)**
*Components for navigation and user interaction*

#### Navigation (8 components)
- [ ] Nav
- [ ] SideNav ⚠️ EXISTS IN MOBILE APP
- [ ] MobileBottomNav ⚠️ EXISTS IN MOBILE APP
- [ ] Pilotnav
- [ ] Pilotnavmobile
- [ ] Adminnav
- [ ] Adminnavmobile
- [ ] Navitem

#### Modals & Overlays (8 components)
- [ ] AIInsightsModal
- [ ] AddFlightModal
- [ ] ImportLogbookModal
- [ ] NewReservationModal
- [ ] ReservationDetailsDrawer
- [ ] FlightDetailsDrawer
- [ ] BottomSheet
- [ ] Searchdropdown

---

### **Phase 3: Aviation Business Logic (Priority 3)**
*Aviation-specific components and business features*

#### Flight Operations (8 components)
- [ ] Aircraft
- [ ] FlightMap
- [ ] FlightResults
- [ ] FlightWeather
- [ ] MultiRouteFlightMap
- [ ] AddFlightContent
- [ ] ImportLogbookContent
- [ ] NewReservationContent

#### Business Components (10 components)
- [ ] Account ⚠️ PLACEHOLDER EXISTS
- [ ] BillingOverviewCard
- [ ] BillingSummaryCard
- [ ] AudioDebrief
- [ ] Applicationsitem
- [ ] Jobstatus
- [ ] Navapplications
- [ ] Requirementicon
- [ ] HoursTooltip
- [ ] FlightsIcon

---

### **Phase 4: Data & Content (Priority 4)**
*Data display and content management components*

#### Data Display (6 components)
- [ ] Pagination
- [ ] Breadcrumbs
- [ ] Carousel
- [ ] RangeSlider
- [ ] RangeFields
- [ ] Richtext

#### Lists & Chips (6 components)
- [ ] Longlistchip
- [ ] Matchchip
- [ ] Preferencechip
- [ ] Bullet
- [ ] SaveforLater
- [ ] JointheList

#### File & Upload (2 components)
- [ ] Uploadfile
- [ ] FlightStoreDebug

---

### **Phase 5: Generated/Figma Components (Priority 5 - Review First)**
*Auto-generated components from Figma - may need consolidation*

#### Icon States (8 components)
- [ ] IconIconLeftRightStateDefault
- [ ] IconIconLeftRightStateHover
- [ ] IconIconLeftStateDefault
- [ ] IconIconLeftStateHover
- [ ] IconIconRightStateDefault
- [ ] IconIconRightStateHover
- [ ] IconNoIconStateDefault
- [ ] IconNoIconStateHover

#### Component States (20+ components)
- [ ] StateActive, StateApplications, StateChecked, StateDefault
- [ ] StateDisabled, StateDropdown, StateErrorValidation, StateFilled
- [ ] StateHover, StateIconsmall, StateOpen, StatePlaceholder
- [ ] StateSelected, StateState4, StateTyping, StateUnchecked
- [ ] StateValid, StateValidation, Statedefaulttypedefault
- [ ] Statediabledtypedefault, Statehovertypedefault, Statemenu
- [ ] Stateoff, Stateon, Stateuploaded, Stateuploading

#### Property Variants (11 components)
- [ ] Property11, Property1Default, Property1ItemHover
- [ ] Property1Open, Property1Variant2, Property1Variant3
- [ ] Property1Variant4, Property1Variant5, Property1Variant6
- [ ] Property1Variant7, Property1closed, Property1enabled
- [ ] Property1filled, Property1posted, Property1pressed, Property1unsave

#### Size Variants (4 components)
- [ ] SizeIconsmall, Sizelarge, Sizemedium, Sizesmall

#### Type Categories (4 components)
- [ ] TypeAlmostQualified, TypeGreatMatch
- [ ] TypeHighlyQualified, TypeTopMatch

#### Utility (4 components)
- [ ] Companylogo, TopHeader, Navtitle
- [ ] Multiselectdropdown

---

## 📋 **Current Status**
- **Total Components**: 136
- **Converted**: 7 (Button, StatusBadge, ProgressBar, TextInput, Checkbox, Toggle, Dropdown) ✅
- **Partially Converted**: 3 (DashboardLayout, SideNav, MobileBottomNav exist in mobile app)
- **Remaining**: 126
- **Phase 1 Progress**: 7/25 Core UI components (28% complete)

---

## 🚀 **Next Steps**

### Immediate (Phase 1 - Core UI)
1. **Toast components** (Toasterror, Toastsuccess) - User feedback
2. **Radiobutton** - Form control completion  
3. **Header/Footer** - Layout components
4. **EmptyState** - Content states
5. **Tooltip** - Interactive help

### Recently Completed ✅
- **TextInput** (was Textfield) - Critical forms component
- **Checkbox** - Essential form control with orange accent
- **Toggle** - Switch with electric blue styling  
- **Dropdown** - Modal-based selection with proper animations

### After Phase 1
1. Review Figma-generated components for consolidation opportunities
2. Convert navigation components 
3. Add aviation-specific business logic
4. Polish and optimize

---

## 📝 **Notes**

- **Figma Components**: Many State/Property/Size components appear to be auto-generated variants. Consider consolidating into prop-based components.
- **Existing Mobile Components**: Some navigation components already exist in the mobile app but may need updating to match original design.
- **Business Logic**: Aviation-specific components will need the most adaptation for mobile UX patterns.

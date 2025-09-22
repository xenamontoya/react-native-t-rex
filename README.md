# 🎨 Project T-Rex Monorepo

**Your Design System & Mobile App in Perfect Harmony!**

This is your **design playground** where you can experiment with UI ideas and build a professional component library at the same time. Think of it like having your Figma files and final product working together automatically! 

## 🏗️ How It's Organized

```
project-t-rex-monorepo/
├── 📦 packages/components/     # Your Component Library (Storybook)
└── 📱 packages/mobile-app/     # Your Design Playground (App)
```

## 🎯 Designer-Friendly Commands

### **🎨 Design Playground Mode**
```bash
npm run 🎨\ design-playground
```
- Opens your mobile app prototype 
- Experiment with layouts, colors, interactions
- See changes instantly in the browser
- Perfect for testing new ideas!

### **🧩 Component Library Mode**  
```bash
npm run 🧩\ component-library
```
- Opens Storybook with all your components
- Test icons, colors, and design tokens
- Perfect isolated component environment
- Great for accessibility testing!

### **📦 Install Everything**
```bash
npm run 📦\ install-all
```
- Installs all dependencies for both projects
- Run this first when you clone the repo
- Run this after adding new packages

## ✨ Your Magic Workflow

### **1. 🎨 Experiment** (in Design Playground)
- Try new layouts in your mobile app
- Test different color combinations  
- Experiment with user flows
- Use existing components from your library

### **2. 🧩 Extract** (to Component Library)
- Move successful patterns to the component library
- Make them reusable and documented
- Test them in isolation in Storybook

### **3. 🔄 Auto-Sync**
- Changes in your component library automatically appear in your app!
- No publishing or installing needed
- Live updates as you code

### **4. 🚀 Share**
- Component library can be published to NPM
- Others can install your design system
- Storybook can be deployed as a public style guide

## 🎨 What's Already Built

### **Icons System**
- ✅ Font Awesome Pro icons (regular & solid)
- ✅ Navigation icons with active states
- ✅ Centralized icon system
- ✅ Easy to add new icons

### **Design Tokens**
- ✅ Project T-Rex brand colors
- ✅ Typography system (Degular fonts)
- ✅ Spacing scale
- ✅ Border radius values
- ✅ Shadow system

### **Mobile App**
- ✅ Responsive navigation (mobile tabs, tablet sidebar)
- ✅ Professional FontAwesome icons throughout
- ✅ Complete dashboard UI
- ✅ Profile, Training, Reservations screens

## 🚀 Getting Started

1. **Install everything:**
   ```bash
   npm run 📦\ install-all
   ```

2. **Start your design playground:**
   ```bash
   npm run 🎨\ design-playground
   ```
   Open http://localhost:8081 in your browser

3. **Open component library in another terminal:**
   ```bash
   npm run 🧩\ component-library  
   ```
   Open http://localhost:19006 in your browser

4. **Start designing!** 🎨

## 💡 Pro Tips for Designers

### **🎨 When Working in Design Playground:**
- Make UI changes directly in the app
- Test on mobile (responsive mode) and tablet breakpoints
- Try different color combinations
- Experiment with layouts and spacing

### **🧩 When Working in Component Library:**
- Focus on individual components
- Test accessibility features
- Document usage patterns
- Perfect micro-interactions

### **🔄 Moving Between Both:**
- Copy successful patterns from app to library
- Import refined components from library to app
- Everything stays in sync automatically!

## 🛠️ File Structure

```
packages/
├── components/                 # 🧩 Component Library
│   ├── src/
│   │   ├── tokens.ts          # 🎨 Colors, spacing, typography
│   │   ├── Icons.tsx          # 🎯 FontAwesome Pro icons
│   │   └── index.ts           # 📦 Main exports
│   ├── stories/               # 📚 Storybook stories
│   └── App.tsx                # 🧩 Storybook app
│
└── mobile-app/                # 📱 Design Playground  
    ├── App.tsx                # 📱 Main app
    ├── screens/               # 📄 App screens
    └── components/            # 🧩 App-specific components
```

## 🎯 Next Steps

1. **Build More Components** - Create Button, Card, Input components
2. **Add Stories** - Document each component in Storybook
3. **Test Accessibility** - Use Storybook's accessibility addon
4. **Deploy Style Guide** - Share Storybook publicly
5. **Publish to NPM** - Let others use your design system

---

**Happy Designing! 🎨✨**

*This monorepo gives you the best of both worlds - rapid prototyping AND professional component development!*

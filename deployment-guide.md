# 🚀 Project T-Rex Deployment Guide

## 📦 Two Separate Vercel Projects

### 🎨 Design Playground (React Native App)
- **Local**: `http://localhost:8082`
- **Deployed**: `https://project-t-rex-playground.vercel.app`
- **Purpose**: Interactive React Native app with FontAwesome Pro icons

### 🧩 Component Library (Storybook)
- **Local**: `http://localhost:19006` 
- **Deployed**: `https://project-t-rex-storybook.vercel.app`
- **Purpose**: Design system documentation and design tokens

---

## 🔧 Setup Instructions

### 1. Deploy Design Playground
```bash
cd packages/mobile-app
npx vercel --prod
# Follow prompts, choose "mobile-app" as project name
```

### 2. Deploy Storybook
```bash
cd packages/components  
npx vercel --prod
# Follow prompts, choose "components" as project name
```

### 3. GitHub Integration
- Connect both Vercel projects to your GitHub repo
- **Playground**: Set root directory to `packages/mobile-app`
- **Storybook**: Set root directory to `packages/components`

---

## 📋 Sharing with Teams

### For Product Team (Non-Technical)
**"Check out our design system:"**
- 🎨 **Interactive App**: https://project-t-rex-playground.vercel.app
- 📖 **Design Docs**: https://project-t-rex-storybook.vercel.app

### For Development Team  
**"Install our component library:"**
```bash
npm install @project-t-rex/components
```
- 📖 **Documentation**: https://project-t-rex-storybook.vercel.app
- 🎯 **Example Usage**: https://project-t-rex-playground.vercel.app

---

## 🏢 Industry Examples

**This is exactly how the pros do it:**
- **Material UI**: https://mui.com (storybook) + https://material-ui.com (playground)
- **Chakra UI**: https://chakra-ui.com (docs) + https://chakra-templates.dev (examples)
- **Mantine**: https://mantine.dev (storybook) + https://ui.mantine.dev (playground)

---

## ⚙️ Auto-Deployment

Once connected to GitHub:
1. **Push to main** → Both sites auto-deploy
2. **Pull requests** → Get preview URLs for both
3. **Different branches** → Can deploy to staging URLs

Perfect for design reviews and developer handoffs!

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon, NavIcon, IconNames, Colors, Typography, Spacing } from './src';

/**
 * 🎨 PROJECT T-REX COMPONENT BROWSER
 * 
 * This is your simple, designer-friendly component library browser!
 * Much simpler than Storybook - perfect for exploring icons and design tokens.
 */

export default function ComponentBrowser() {
  const [activeTab, setActiveTab] = useState('icons');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIconSize, setSelectedIconSize] = useState(24);
  const [selectedIconColor, setSelectedIconColor] = useState(Colors.neutral.gray600);

  // Filter icons based on search
  const filteredIcons = Object.entries(IconNames).filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconGallery = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎯 FontAwesome Pro Icons</Text>
      
      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search icons..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.controlLabel}>Size:</Text>
        <View style={styles.sizeButtons}>
          {[16, 20, 24, 32, 48].map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedIconSize === size && styles.sizeButtonActive
              ]}
              onPress={() => setSelectedIconSize(size)}
            >
              <Text style={[
                styles.sizeButtonText,
                selectedIconSize === size && styles.sizeButtonTextActive
              ]}>
                {size}px
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Icon Grid */}
      <ScrollView style={styles.iconScrollView}>
        <View style={styles.iconGrid}>
          {filteredIcons.map(([name, icon]) => (
            <View key={name} style={styles.iconItem}>
              <View style={styles.iconContainer}>
                <Icon
                  name={name as keyof typeof IconNames}
                  size={selectedIconSize}
                  color={selectedIconColor}
                />
              </View>
              <Text style={styles.iconLabel}>{name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const ColorPalette = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎨 Brand Colors</Text>
      
      {/* Primary Colors */}
      <Text style={styles.colorGroupTitle}>Primary</Text>
      <View style={styles.colorRow}>
        {Object.entries(Colors.primary).map(([name, color]) => (
          <TouchableOpacity
            key={name}
            style={[styles.colorSwatch, { backgroundColor: color }]}
            onPress={() => setSelectedIconColor(color)}
          >
            <Text style={[
              styles.colorLabel,
              color === '#FFFFFF' ? { color: Colors.primary.black } : { color: Colors.primary.white }
            ]}>
              {name}
            </Text>
            <Text style={[
              styles.colorHex,
              color === '#FFFFFF' ? { color: Colors.primary.black } : { color: Colors.primary.white }
            ]}>
              {color}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Secondary Colors */}
      <Text style={styles.colorGroupTitle}>Secondary</Text>
      <View style={styles.colorRow}>
        {Object.entries(Colors.secondary).map(([name, color]) => (
          <TouchableOpacity
            key={name}
            style={[styles.colorSwatch, { backgroundColor: color }]}
            onPress={() => setSelectedIconColor(color)}
          >
            <Text style={styles.colorLabel}>{name}</Text>
            <Text style={styles.colorHex}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tertiary Colors */}
      <Text style={styles.colorGroupTitle}>Tertiary</Text>
      <View style={styles.colorRow}>
        {Object.entries(Colors.tertiary).map(([name, color]) => (
          <TouchableOpacity
            key={name}
            style={[styles.colorSwatch, { backgroundColor: color }]}
            onPress={() => setSelectedIconColor(color)}
          >
            <Text style={styles.colorLabel}>{name}</Text>
            <Text style={styles.colorHex}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Neutral Colors */}
      <Text style={styles.colorGroupTitle}>Neutral</Text>
      <View style={styles.colorRow}>
        {Object.entries(Colors.neutral).map(([name, color]) => (
          <TouchableOpacity
            key={name}
            style={[styles.colorSwatch, { backgroundColor: color }]}
            onPress={() => setSelectedIconColor(color)}
          >
            <Text style={styles.colorLabel}>{name}</Text>
            <Text style={styles.colorHex}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const DesignTokens = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📐 Design Tokens</Text>
      
      {/* Typography */}
      <Text style={styles.tokenGroupTitle}>Typography</Text>
      <View style={styles.tokenGroup}>
        <Text style={styles.tokenLabel}>Font Family: Degular</Text>
        <Text style={styles.tokenLabel}>Mono Font: Degular Mono (ALL CAPS)</Text>
        {Object.entries(Typography.sizes).map(([name, size]) => (
          <Text key={name} style={[styles.tokenLabel, { fontSize: size }]}>
            {name}: {size}px - Sample Text
          </Text>
        ))}
      </View>

      {/* Spacing */}
      <Text style={styles.tokenGroupTitle}>Spacing</Text>
      <View style={styles.tokenGroup}>
        {Object.entries(Spacing).map(([name, value]) => (
          <View key={name} style={styles.spacingDemo}>
            <Text style={styles.tokenLabel}>{name}: {value}px</Text>
            <View style={[styles.spacingBox, { width: value, height: 20 }]} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧩 Project T-Rex Component Library</Text>
        <Text style={styles.subtitle}>Your design system playground</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'icons', label: '🎯 Icons', count: Object.keys(IconNames).length },
          { id: 'colors', label: '🎨 Colors', count: Object.keys(Colors).flat().length },
          { id: 'tokens', label: '📐 Tokens', count: 'Design' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.tabTextActive
            ]}>
              {tab.label}
            </Text>
            <Text style={[
              styles.tabCount,
              activeTab === tab.id && styles.tabCountActive
            ]}>
              {tab.count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'icons' && <IconGallery />}
        {activeTab === 'colors' && <ColorPalette />}
        {activeTab === 'tokens' && <DesignTokens />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.primary.black,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary.electricBlue,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  tabActive: {
    backgroundColor: Colors.primary.black,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral.gray600,
  },
  tabTextActive: {
    color: Colors.primary.white,
  },
  tabCount: {
    fontSize: 10,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  tabCountActive: {
    color: Colors.secondary.electricBlue,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.black,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: Colors.neutral.gray50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  controls: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.black,
    marginBottom: 8,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: Colors.neutral.gray50,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  sizeButtonActive: {
    backgroundColor: Colors.primary.black,
    borderColor: Colors.primary.black,
  },
  sizeButtonText: {
    fontSize: 12,
    color: Colors.neutral.gray600,
  },
  sizeButtonTextActive: {
    color: Colors.primary.white,
  },
  iconScrollView: {
    maxHeight: 400,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  iconItem: {
    alignItems: 'center',
    width: 80,
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 10,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  colorGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  colorSwatch: {
    width: 120,
    height: 80,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary.white,
  },
  colorHex: {
    fontSize: 10,
    color: Colors.primary.white,
    opacity: 0.8,
  },
  tokenGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.black,
    marginTop: 16,
    marginBottom: 12,
  },
  tokenGroup: {
    marginBottom: 20,
  },
  tokenLabel: {
    fontSize: 14,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  spacingDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spacingBox: {
    backgroundColor: Colors.secondary.electricBlue,
    marginLeft: 12,
    borderRadius: 2,
  },
});

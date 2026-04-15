# Design Tokens Quick Reference Card

## 🎨 Utility Functions Summary

### Padding
```typescript
getPadding('md')      // p-[var(--padding-md)]
getPaddingX('lg')     // px-[var(--padding-lg)]
getPaddingY('sm')     // py-[var(--padding-sm)]
```

### Margin
```typescript
getMargin('md')       // m-[var(--margin-md)]
getMarginX('lg')      // mx-[var(--margin-lg)]
getMarginY('sm')      // my-[var(--margin-sm)]
getMarginTop('xl')    // mt-[var(--margin-xl)]
getMarginBottom('xs') // mb-[var(--margin-xs)]
```

### Gap (Flex/Grid)
```typescript
getGap('md')          // gap-[var(--gap-md)]
```

### Border Radius
```typescript
getRadius('lg')       // rounded-[var(--radius-lg)]
```

### Font Size
```typescript
getFontSize('xl')     // text-[var(--font-size-xl)]
```

---

## 📏 Size Options

All spacing functions accept one of:
- `'xs'` - Extra small (0.5rem base)
- `'sm'` - Small (0.75rem base)
- `'md'` - Medium (1rem base)
- `'lg'` - Large (1.5rem base)
- `'xl'` - Extra large (2rem base)

Radius sizes also include:
- `'none'` - 0px
- `'full'` - 9999px

---

## 🪝 React Hook

```typescript
import { useDesignSettings } from '@/context/DesignSettingsContext';

const { 
  settings,              // Current settings object
  updateSetting,         // Update single setting
  updateMultiple,        // Update multiple settings
  resetToDefaults        // Reset all to defaults
} = useDesignSettings();
```

---

## 💎 Component Examples

### Basic Card with Design Tokens
```tsx
import { getPadding, getRadius, getMarginBottom } from '@/utils/designTokens';

<div className={`${getPadding('lg')} ${getRadius('md')} bg-white shadow`}>
  <h3 className={getMarginBottom('md')}>Title</h3>
  <p>Content</p>
</div>
```

### Flex Container
```tsx
import { getGap, getPadding } from '@/utils/designTokens';

<div className={`flex ${getGap('md')} ${getPadding('lg')}`}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Button with Spacing
```tsx
import { getPadding, getRadius } from '@/utils/designTokens';

<button className={`${getPadding('md')} ${getRadius('sm')} bg-blue-500 text-white`}>
  Click Me
</button>
```

---

## 🎛️ Settings Hook Usage

### Update Single Setting
```typescript
const { updateSetting } = useDesignSettings();

updateSetting('spacingScale', 1.5);
updateSetting('compactMode', true);
updateSetting('roundness', 'smooth');
```

### Update Multiple Settings
```typescript
const { updateMultiple } = useDesignSettings();

updateMultiple({
  spacingScale: 1.25,
  compactMode: false,
  roundness: 'moderate'
});
```

### Reset to Defaults
```typescript
const { resetToDefaults } = useDesignSettings();

resetToDefaults(); // Undo all changes
```

---

## 🎯 Spacing Scale Presets

```typescript
// In code
import { SPACING_SCALE_PRESETS } from '@/context/DesignSettingsContext';

updateSetting('spacingScale', SPACING_SCALE_PRESETS.comfortable);
```

**Available presets:**
- `0.75` - compact
- `1` - normal (default)
- `1.25` - comfortable
- `1.5` - spacious

---

## 🔴 Roundness Presets

```typescript
// In code
import { ROUNDNESS_PRESETS } from '@/context/DesignSettingsContext';

updateMultiple(ROUNDNESS_PRESETS.smooth);
```

**Available presets:**
- `sharp` - Minimal rounding
- `moderate` - Default (0.25-1rem)
- `smooth` - More rounding (0.5-1.5rem)
- `ultra` - Maximum rounding (1-2.5rem)

---

## 📦 CSS Variables Reference

### Padding
```css
--padding-xs: 0.5rem;
--padding-sm: 0.75rem;
--padding-md: 1rem;
--padding-lg: 1.5rem;
--padding-xl: 2rem;
```

### Margin
```css
--margin-xs: 0.5rem;
--margin-sm: 0.75rem;
--margin-md: 1rem;
--margin-lg: 1.5rem;
--margin-xl: 2rem;
```

### Gap
```css
--gap-xs: 0.5rem;
--gap-sm: 0.75rem;
--gap-md: 1rem;
--gap-lg: 1.5rem;
--gap-xl: 2rem;
```

### Radius
```css
--radius-none: 0px;
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;
```

### Font Sizes
```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.5rem;
--font-size-2xl: 2rem;
```

---

## ⚡ Direct CSS Variable Usage

```tsx
// In inline styles
<div style={{ padding: 'var(--padding-lg)', borderRadius: 'var(--radius-md)' }}>
  Content
</div>

// In CSS
.my-custom-element {
  padding: var(--padding-md);
  margin: var(--margin-sm);
  border-radius: var(--radius-lg);
  gap: var(--gap-md);
  font-size: var(--font-size-lg);
}
```

---

## 🔍 Import Guide

```typescript
// Design tokens
import {
  getPadding,
  getPaddingX,
  getPaddingY,
  getMargin,
  getMarginX,
  getMarginY,
  getMarginTop,
  getMarginBottom,
  getGap,
  getRadius,
  getFontSize,
  getContainerClasses,
  getCSSVar
} from '@/utils/designTokens';

// Settings context
import {
  useDesignSettings,
  DesignSettingsProvider,
  DEFAULT_DESIGN_SETTINGS,
  SPACING_SCALE_PRESETS,
  ROUNDNESS_PRESETS
} from '@/context/DesignSettingsContext';

// Settings panel
import { DesignSettingsPanel } from '@/components/DesignSettingsPanel';
```

---

## 📱 Responsive Patterns

```tsx
// Responsive padding
<div className={`${getPaddingX('sm')} md:${getPaddingX('md')} lg:${getPaddingX('lg')}`}>
  Content
</div>

// Responsive gap
<div className={`flex gap-(--gap-sm) md:gap-(--gap-md) lg:gap-(--gap-lg)`}>
  Items
</div>

// Grid with design gap
<div className={`grid grid-cols-2 md:grid-cols-3 ${getGap('lg')}`}>
  Grid items
</div>
```

---

## 🎓 Anti-Patterns (DON'T DO THIS ❌)

```typescript
// ❌ Hardcoded spacing
<div className="p-4 m-2 rounded-lg gap-4">

// ❌ MixedTokens
<div className={`${getPadding('md')} m-2 rounded-lg`}>

// ❌ Hardcoded in CSS
.my-component { padding: 1rem; } // Instead: padding: var(--padding-md);

// ❌ Ignoring spacing scale
<div style={{ padding: '1rem' }}> // Should use CSS variable
```

---

## ✅ Best Practices (DO THIS ✓)

```typescript
// ✅ Consistent use of design tokens
<div className={`${getPadding('md')} ${getMargin('sm')} ${getRadius('lg')} ${getGap('md')}`}>

// ✅ CSS variables for inline styles
<div style={{ padding: 'var(--padding-lg)' }}>

// ✅ Using presets
updateSetting('spacingScale', SPACING_SCALE_PRESETS.comfortable);

// ✅ Type-safe hooks
const { settings, updateSetting } = useDesignSettings();

// ✅ Container components
<Container size="lg" padding="lg">
  Content
</Container>
```

---

## 🐛 Debugging

**Check Settings:**
```javascript
// In browser console
const settings = JSON.parse(localStorage.getItem('design-settings'));
console.log(settings);
```

**Check CSS Variables:**
```javascript
// In browser console
const root = document.documentElement;
console.log(root.style.getPropertyValue('--padding-md'));
```

**Clear Settings:**
```javascript
localStorage.removeItem('design-settings');
location.reload();
```

---

## 🚀 Common Tasks

### Set Comfortable Spacing
```typescript
import { SPACING_SCALE_PRESETS } from '@/context/DesignSettingsContext';
const { updateSetting } = useDesignSettings();

updateSetting('spacingScale', SPACING_SCALE_PRESETS.comfortable); // 1.25x
```

### Make Design Sharp
```typescript
import { ROUNDNESS_PRESETS } from '@/context/DesignSettingsContext';
const { updateMultiple } = useDesignSettings();

updateMultiple(ROUNDNESS_PRESETS.sharp);
```

### Toggle Compact Mode
```typescript
const { settings, updateSetting } = useDesignSettings();

updateSetting('compactMode', !settings.compactMode);
```

### Save Custom Preset
```typescript
// In your settings page
const { updateMultiple } = useDesignSettings();

const myPreset = {
  spacingScale: 1.1,
  roundness: 'smooth',
  compactMode: false
};

updateMultiple(myPreset);
// Automatically saves to localStorage!
```

---

**Keep this card handy while developing! 🎯**

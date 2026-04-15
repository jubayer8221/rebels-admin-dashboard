# Design Settings System - Implementation Guide

## Overview

This document explains the **centralized Design Settings System** that controls all UI spacing, padding, margins, border radius, and font sizes dynamically.

---

## Key Features

✅ **Centralized Control** - All design tokens in one place
✅ **Runtime Updates** - Change spacing, radius, and more instantly
✅ **CSS Variables** - Uses modern CSS custom properties (`--padding-md`, `--radius-lg`, etc.)
✅ **Tailwind Integration** - Works seamlessly with Tailwind CSS
✅ **LocalStorage Persistence** - Settings saved across sessions
✅ **Smooth Transitions** - Beautiful animations when values change
✅ **Dark/Light Theme Support** - Works with theme switching
✅ **Type-Safe Utilities** - TypeScript support for all token functions

---

## Architecture

### 1. **DesignSettingsContext** (`src/context/DesignSettingsContext.tsx`)

The heart of the system. Manages all design settings state.

**Key Exports:**
- `DesignSettings` - Interface defining all available settings
- `DEFAULT_DESIGN_SETTINGS` - Default values for all tokens
- `DesignSettingsProvider` - React Context Provider
- `useDesignSettings()` - Hook to access and modify settings
- `applyDesignSettingsToDOM()` - Applies settings as CSS variables

**Available Settings:**
```typescript
interface DesignSettings {
  // Spacing scale multiplier (1 = default, 0.8 = compact, 1.5 = spacious)
  spacingScale: number;

  // Individual padding values
  paddingXs, paddingSm, paddingMd, paddingLg, paddingXl

  // Individual margin values
  marginXs, marginSm, marginMd, marginLg, marginXl

  // Gap for flex/grid
  gapXs, gapSm, gapMd, gapLg, gapXl

  // Border radius values
  radiusNone, radiusSm, radiusMd, radiusLg, radiusXl, radiusFull

  // Font sizes
  fontSizeXs, fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl, fontSize2xl

  // Global roundness level
  roundness: 'sharp' | 'moderate' | 'smooth' | 'ultra'

  // Compact mode toggle
  compactMode: boolean
}
```

### 2. **Design Tokens Utilities** (`src/utils/designTokens.ts`)

Helper functions that map design settings to Tailwind classes.

**Main Functions:**
```typescript
// Padding
getPadding('md')        // Returns 'p-[var(--padding-md)]'
getPaddingX('lg')       // Returns 'px-[var(--padding-lg)]'
getPaddingY('sm')       // Returns 'py-[var(--padding-sm)]'

// Margin
getMargin('md')         // Returns 'm-[var(--margin-md)]'
getMarginX('lg')        // Returns 'mx-[var(--margin-lg)]'
getMarginY('sm')        // Returns 'my-[var(--margin-sm)]'
getMarginTop('xl')      // Returns 'mt-[var(--margin-xl)]'
getMarginBottom('xs')   // Returns 'mb-[var(--margin-xs)]'

// Gap
getGap('md')            // Returns 'gap-[var(--gap-md)]'

// Border Radius
getRadius('lg')         // Returns 'rounded-[var(--radius-lg)]'

// Font Size
getFontSize('xl')       // Returns 'text-[var(--font-size-xl)]'

// Combined utilities
getSpacedContainer('md', 'lg')  // padding + gap
getContainerClasses('md', 'lg', 'sm', 'row')  // Complete container
```

### 3. **Design Settings Panel** (`src/components/DesignSettingsPanel.tsx`)

User-facing settings UI. Floats in the bottom-right corner of the app.

**Features:**
- Spacing scale slider (0.5x to 2x)
- Roundness presets (sharp, moderate, smooth, ultra)
- Compact mode toggle
- Individual padding value editor
- Individual radius value editor
- Reset to defaults button
- localStorage persistence

### 4. **Tailwind Config** (`tailwind.config.ts`)

Extended with CSS variable references for design tokens.

**New Classes:**
```css
/* Design token padding */
p-[var(--padding-xs)]
p-[var(--padding-sm)]
p-[var(--padding-md)]
p-[var(--padding-lg)]
p-[var(--padding-xl)]

/* Design token margin */
m-[var(--margin-xs)]
/* ... */

/* Design token gap */
gap-[var(--gap-xs)]
/* ... */

/* Design token radius */
rounded-[var(--radius-md)]
/* ... */
```

### 5. **CSS Variables** (`src/index.css`)

Default CSS variables that get updated by `applyDesignSettingsToDOM()`.

**Defaults:**
```css
--padding-xs: 0.5rem;
--padding-sm: 0.75rem;
--padding-md: 1rem;
--padding-lg: 1.5rem;
--padding-xl: 2rem;

--margin-xs: 0.5rem;
--margin-sm: 0.75rem;
/* ... */

--gap-xs: 0.5rem;
/* ... */

--radius-none: 0px;
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;

--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.5rem;
--font-size-2xl: 2rem;
```

---

## How It Works

### Data Flow

```
App.tsx
  ├── <DesignSettingsProvider>
  │   ├── Initializes DesignSettings from localStorage
  │   ├── Applies CSS variables to document root
  │   └── Provides context to all children
  │
  ├── Routes (all components inside)
  │   └── Can call useDesignSettings() hook
  │
  └── <DesignSettingsPanel>
      └── Allows users to modify settings
          ├── updateSetting() updates context
          ├── Context triggers DOM variable update
          └── CSS transitions smoothly to new values
```

### Component Integration

When a component needs spacing:

1. **Instead of hardcoding:**
   ```tsx
   // ❌ BAD
   <div className="p-4 m-2 rounded-lg gap-4">
   ```

2. **Use design tokens:**
   ```tsx
   // ✅ GOOD
   import { getPadding, getMargin, getRadius, getGap } from '@/utils/designTokens';
   
   <div className={`${getPadding('md')} ${getMargin('sm')} ${getRadius('lg')} ${getGap('md')}`}>
   ```

3. **In a refactored component:**
   ```tsx
   const Card = ({ title, children }) => {
     return (
       <div className={`${getPadding('lg')} ${getRadius('md')} shadow-lg`}>
         <h3>{title}</h3>
         {children}
       </div>
     );
   };
   ```

---

## Usage Examples

### Example 1: Basic Button

```tsx
import { Button } from '@/components/Button';

export function MyComponent() {
  return <Button variant="primary" size="md">Click Me</Button>;
}
```

**What happens:**
- Button automatically uses `var(--padding-md)` for padding
- Border radius uses `var(--radius-md)`
- Change settings → padding/radius updates immediately

### Example 2: Custom Container

```tsx
import { getMargin, getPadding, getGap, getRadius } from '@/utils/designTokens';

export function CardGrid() {
  return (
    <div className={`flex flex-wrap ${getGap('lg')} ${getPadding('lg')}`}>
      <Card title="Users" value="1,234" icon={<Users />} />
      <Card title="Revenue" value="$45K" icon={<DollarSign />} />
    </div>
  );
}
```

### Example 3: Using Spacing Scale

```tsx
import { useDesignSettings } from '@/context/DesignSettingsContext';

export function SettingsUI() {
  const { settings, updateSetting } = useDesignSettings();

  return (
    <div>
      <p>Current spacing scale: {(settings.spacingScale * 100).toFixed(0)}%</p>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={settings.spacingScale}
        onChange={(e) => updateSetting('spacingScale', parseFloat(e.target.value))}
      />
    </div>
  );
}
```

### Example 4: Roundness Presets

```tsx
import { useDesignSettings, ROUNDNESS_PRESETS } from '@/context/DesignSettingsContext';

export function RoundnessControl() {
  const { settings, updateMultiple } = useDesignSettings();

  return (
    <div>
      {Object.keys(ROUNDNESS_PRESETS).map((preset) => (
        <button
          key={preset}
          onClick={() => {
            updateMultiple(ROUNDNESS_PRESETS[preset]);
          }}
          className={settings.roundness === preset ? 'bg-blue-500 text-white' : 'bg-gray-200'}
        >
          {preset}
        </button>
      ))}
    </div>
  );
}
```

### Example 5: Compact Mode

```tsx
import { useDesignSettings } from '@/context/DesignSettingsContext';

export function CompactToggle() {
  const { settings, updateSetting } = useDesignSettings();

  return (
    <button
      onClick={() => updateSetting('compactMode', !settings.compactMode)}
      className={settings.compactMode ? 'bg-orange-500' : 'bg-gray-300'}
    >
      {settings.compactMode ? 'Compact Mode ON' : 'Compact Mode OFF'}
    </button>
  );
}
```

---

## CSS Variables Reference

### Padding Variables
- `--padding-xs` (0.5rem)
- `--padding-sm` (0.75rem)
- `--padding-md` (1rem)
- `--padding-lg` (1.5rem)
- `--padding-xl` (2rem)

### Margin Variables
- `--margin-xs` to `--margin-xl` (same values as padding)

### Gap Variables
- `--gap-xs` to `--gap-xl` (same values as padding)

### Radius Variables
- `--radius-none` (0px)
- `--radius-sm` (0.25rem)
- `--radius-md` (0.5rem)
- `--radius-lg` (0.75rem)
- `--radius-xl` (1rem)
- `--radius-full` (9999px)

### Font Size Variables
- `--font-size-xs` (0.75rem)
- `--font-size-sm` (0.875rem)
- `--font-size-md` (1rem)
- `--font-size-lg` (1.125rem)
- `--font-size-xl` (1.5rem)
- `--font-size-2xl` (2rem)

---

## Refactoring Existing Components

### Before (Hardcoded)
```tsx
<div className="p-4 m-2 rounded-lg gap-4 flex">
  <div className="p-3 rounded-md">Content</div>
</div>
```

### After (Design Tokens)
```tsx
import { getPadding, getMargin, getRadius, getGap } from '@/utils/designTokens';

<div className={`flex ${getPadding('md')} ${getMargin('sm')} ${getRadius('lg')} ${getGap('md')}`}>
  <div className={`${getPadding('sm')} ${getRadius('md')}`}>Content</div>
</div>
```

**Benefits:**
- ✅ Consistency across UI
- ✅ Easy to maintain
- ✅ Runtime customization
- ✅ Smooth transitions
- ✅ LocalStorage persistence

---

## Best Practices

1. **Always use design tokens** - Never hardcode spacing/radius
2. **Use `useDesignSettings` hook** - When you need to read current settings
3. **Leverage CSS variables** - For inline styles or CSS-in-JS
4. **Test with all roundness presets** - Ensure UI looks good in all modes
5. **Test with spacing extremes** - 0.5x and 2x spacing scales

---

## Presets

### Spacing Scale Presets
```typescript
SPACING_SCALE_PRESETS = {
  compact: 0.75,      // 25% less spacing
  normal: 1,          // default
  comfortable: 1.25,  // 25% more spacing
  spacious: 1.5,      // 50% more spacing
};
```

### Roundness Presets
```typescript
ROUNDNESS_PRESETS = {
  sharp: {       // Minimal rounding
    radiusSm: '0px',
    radiusMd: '0.125rem',
    // ...
  },
  moderate: {    // Default
    radiusSmM: '0.25rem',
    radiusMd: '0.5rem',
    // ...
  },
  smooth: {      // More rounding
    radiusSm: '0.5rem',
    radiusMd: '0.75rem',
    // ...
  },
  ultra: {       // Maximum rounding
    radiusSm: '1rem',
    radiusMd: '1.5rem',
    // ...
  }
};
```

---

## localStorage Persistence

Settings are automatically saved to localStorage under the key `design-settings`.

```typescript
// Customizing the persistence key
<DesignSettingsProvider persistKey="my-custom-key">
  <App />
</DesignSettingsProvider>
```

**What's persisted:**
- All spacing values
- All margin values
- All gap values
- All border radius values
- Font sizes
- Spacing scale multiplier
- Compact mode toggle
- Roundness level

---

## Performance

**CSS Variable Transitions:**
- Padding, margin, gap, and radius smoothly transition over 0.3s
- Uses GPU-accelerated transitions
- No JavaScript animation overhead

**LocalStorage:**
- Settings saved on every change (debounced in context)
- Loading is instant from localStorage
- No network requests

---

## Troubleshooting

### Variables Not Applying?
1. Ensure `<DesignSettingsProvider>` wraps your app
2. Check browser DevTools → Application → localStorage
3. Verify `applyDesignSettingsToDOM()` is called

### Smooth Transitions Not Working?
1. Check that CSS transitions are not disabled globally
2. Verify `src/index.css` includes transition styles
3. Check for `transition-none` classes overriding default

### Settings Lost on Refresh?
1. Check localStorage is enabled in browser
2. Verify localStorage quota not exceeded
3. Check browser privacy settings

---

## Next Steps

1. ✅ Apply design tokens to all new components
2. ✅ Refactor existing components (see "Refactoring Existing Components" section)
3. ✅ Test with all roundness/spacing presets
4. ✅ Customize default values as needed
5. ✅ Add dark mode specific tokens if needed

---

**Happy designing! 🎨**

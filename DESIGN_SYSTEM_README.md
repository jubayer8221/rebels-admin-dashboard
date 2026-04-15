# DESIGN SYSTEM DOCUMENTATION

## Overview

This is a comprehensive, scalable design system for the Rebels Admin application. All visual styles are controlled centrally through a unified configuration, ensuring consistency across the entire project.

**STRICT RULE:** NO hardcoded values for colors, spacing, or typography. Everything must come from the design system.

---

## Architecture Overview

The design system has three main layers:

### 1. **Design Tokens Layer** (`src/theme/theme.ts`)
Defines all design values:
- Color palette (light/dark variants)
- Spacing scale (4px base system)
- Typography scales
- Border radius
- Shadows
- Transitions
- Z-index system

### 2. **Application Layer** (`src/index.css` + CSS variables)
CSS custom properties that are dynamically set by the theme context:
- All colors as `--color-*` variables
- All spacing as `--spacing-*` variables
- All typography as `--font-size-*`, `--font-weight-*`, etc.

### 3. **Component Layer**
React components that use CSS variables and Tailwind classes:
- Buttons, Cards, Forms, Containers
- All components reference theme variables, never hardcode values

---

## Getting Started

### Setup

**1. Wrap your app with ThemeProvider**

```tsx
// src/main.tsx
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

**2. Use ThemeSwitcher in your navbar or settings**

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Navbar() {
  return (
    <nav>
      <div>Logo</div>
      <ThemeSwitcher />
    </nav>
  );
}
```

**3. Access theme values in components with `useTheme()` hook**

```tsx
import { useTheme } from '@/hooks/useTheme';

export function MyComponent() {
  const { isDark, setMode, accent, setAccent } = useTheme();
  
  return (
    <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

---

## Using the Design System

### 1. **Colors**

#### CSS Variable Usage (Recommended)
```tsx
// Use CSS variables directly in Tailwind classes
<div className="bg-[var(--color-primary)] text-white">
  Primary colored div
</div>

<button className="text-[var(--color-text-primary)]">
  Text button
</button>
```

#### Predefined Tailwind Classes
```tsx
// Use Tailwind classes that reference the theme
<div className="bg-primary text-white">
  Primary colored div
</div>

<div className="text-text-primary">
  Primary text color
</div>
```

#### Color Palette Reference (`src/theme/theme.ts`)
```tsx
import { colorPalette } from '@/theme/theme';

// Programmatic access
const primaryColor = colorPalette.primary.light;
const darkBackground = colorPalette.background.dark.primary;
const successColor = colorPalette.success.light;
```

**Available Color Groups:**
- `primary` / `secondary` - Brand colors
- `success` / `warning` / `error` - Status colors
- `background.light` / `background.dark` - Surface colors
- `text.light` / `text.dark` - Text colors
- `border` - Border colors
- `gray` - Neutral grays (50-950)

### 2. **Spacing**

#### CSS Variable Usage (Recommended)
```tsx
// Use spacing variables for all margin/padding
<div className="p-[var(--spacing-4)] mb-[var(--spacing-6)]">
  Padded content
</div>
```

#### Tailwind Spacing Classes
```tsx
// Tailwind classes use design system spacing scale
<div className="p-4 mb-6 gap-3">
  Content with consistent spacing
</div>
```

#### Spacing Scale (4px base)
```
--spacing-1  = 4px
--spacing-2  = 8px
--spacing-3  = 12px
--spacing-4  = 16px
--spacing-5  = 20px
--spacing-6  = 24px
--spacing-8  = 32px
--spacing-10 = 40px
--spacing-12 = 48px
etc.
```

#### Common Shortcuts
```
--spacing-xs  = 4px   (extra small)
--spacing-sm  = 8px   (small)
--spacing-md  = 12px  (medium)
--spacing-base = 16px (normal)
--spacing-lg  = 20px  (large)
--spacing-xl  = 24px  (extra large)
--spacing-2xl = 32px  (double extra large)
```

### 3. **Typography**

#### Font Sizes (via CSS variables)
```tsx
<h1 className="text-[var(--font-size-4xl)] font-bold">Heading</h1>
<p className="text-[var(--font-size-base)]">Body text</p>
<small className="text-[var(--font-size-sm)]">Small text</small>
```

#### Using Tailwind Typography Classes
```tsx
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base font-normal">Body text</p>
<small className="text-sm">Small text</small>
```

#### Font Weights (via CSS variables)
```tsx
<span className="font-[var(--font-weight-semibold)]">Semibold text</span>
<span className="font-[var(--font-weight-bold)]">Bold text</span>
```

#### Typography Presets
```tsx
import { typography } from '@/theme/theme';

// Access preset font configurations
const h1Style = typography.variants.h1;
// { fontSize: '3rem', fontWeight: 700, lineHeight: '1.2' }

const bodyStyle = typography.variants.body1;
// { fontSize: '1rem', fontWeight: 400, lineHeight: '1.5' }
```

### 4. **Shadows**

#### Using Shadow Variables
```tsx
<div className="shadow-[var(--shadow-lg)]">
  Card with large shadow
</div>
```

#### Using Tailwind Shadow Classes
```tsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
```

**Shadow Levels:**
- `xs` - Subtle (1px)
- `sm` - Light (3px)
- `base` / `default` - Standard (6px)
- `md` - Medium (15px)
- `lg` - Large (25px)
- `xl` - Extra large (50px)

### 5. **Border Radius**

```tsx
<div className="rounded-md">Box with border radius</div>
<div className="rounded-lg">Slightly more rounded</div>
<div className="rounded-full">Fully circular</div>
```

**Available Radii:**
- `xs` (2px)
- `sm` (4px)
- `base` (6px)
- `md` (8px)
- `lg` (12px)
- `xl` (16px)
- `2xl` (24px)
- `3xl` (32px)
- `full` (9999px)

---

## Building Components

### Component Template

**IMPORTANT:** Every component must use theme values. NO hardcoded colors/spacing.

```tsx
// src/components/MyComponent.tsx

import React from 'react';

export interface MyComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  variant = 'primary',
}) => {
  // Map variants to CSS variables (not hardcoded colors!)
  const variantClass = variant === 'primary'
    ? 'bg-[var(--color-primary)] text-white'
    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]';

  return (
    <div
      className={`
        rounded-lg
        p-[var(--spacing-4)]
        shadow-md
        transition-all
        duration-normal
        ${variantClass}
      `}
    >
      <h3 className="text-[var(--font-size-lg)] font-semibold mb-[var(--spacing-2)]">
        {title}
      </h3>
      <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
        Content with theme styles
      </p>
    </div>
  );
};

export default MyComponent;
```

### Example: Feature Card
```tsx
// src/components/FeatureCard.tsx

import React from 'react';
import { Card } from './StyledCard';

export const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card shadow="md" className="p-[var(--spacing-6)]">
      <div className="flex items-start gap-[var(--spacing-4)]">
        <div className="text-[var(--color-primary)] shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-2)]">
            {title}
          </h4>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
```

---

## Dynamic Theme Switching

The theme automatically updates across your entire app because all styles use CSS variables.

### Switching Modes Programmatically
```tsx
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { isDark, setMode } = useTheme();

  return (
    <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### Changing Accent Color
```tsx
const { accent, setAccent } = useTheme();

setAccent('#6366F1'); // Changes to indigo
// All components automatically update!
```

### Using System Preference
```tsx
const { setMode } = useTheme();

setMode('auto'); // Respects system preference
```

---

## CSS Variable Reference

### Color Variables
```css
/* Primary colors */
--color-primary
--color-primary-rgb
--color-primary-hover
--color-primary-light

/* Status colors */
--color-success
--color-warning
--color-error

/* Surfaces */
--color-bg-primary
--color-bg-secondary
--color-bg-tertiary

/* Text */
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-disabled

/* Borders */
--color-border
```

### Spacing Variables
```css
--spacing-1   through --spacing-24
--spacing-xs  = 4px
--spacing-sm  = 8px
--spacing-md  = 12px
--spacing-base = 16px
--spacing-lg  = 20px
--spacing-xl  = 24px
--spacing-2xl = 32px
```

### Typography Variables
```css
--font-family-sans    /* Main font */
--font-family-mono    /* Code font */

--font-size-xs        /* 0.75rem */
--font-size-sm        /* 0.875rem */
--font-size-base      /* 1rem */
--font-size-lg        /* 1.125rem */
--font-size-xl        /* 1.25rem */
--font-size-2xl       /* 1.5rem */
--font-size-3xl       /* 1.875rem */
--font-size-4xl       /* 2.25rem */
--font-size-5xl       /* 3rem */

--font-weight-thin         /* 100 */
--font-weight-light        /* 300 */
--font-weight-normal       /* 400 */
--font-weight-medium       /* 500 */
--font-weight-semibold     /* 600 */
--font-weight-bold         /* 700 */

--line-height-tight        /* 1.25 */
--line-height-normal       /* 1.5 */
--line-height-relaxed      /* 1.625 */
```

### Shadow Variables
```css
--shadow-xs
--shadow-sm
--shadow-base
--shadow-md
--shadow-lg
--shadow-xl
```

### Transition Variables
```css
--transition-duration-fastest    /* 75ms */
--transition-duration-faster     /* 100ms */
--transition-duration-fast       /* 150ms */
--transition-duration-normal     /* 200ms */
--transition-duration-slow       /* 300ms */
--transition-duration-slower     /* 500ms */

--transition-timing-linear
--transition-timing-easeIn
--transition-timing-easeOut
--transition-timing-easeInOut
```

---

## Adding New Design Tokens

### Adding a New Color

```tsx
// 1. Add to src/theme/theme.ts
export const colorPalette = {
  // ... existing colors
  teal: {
    light: '#14B8A6',
    dark: '#2DD4BF',
    50: '#F0FDFA',
    // ... color scale
  },
};

// 2. Update CSS variables in src/index.css (will happen automatically)

// 3. Update tailwind.config.ts if needed
colors: {
  teal: 'var(--color-teal)',
}
```

### Adding Spacing Variants

```tsx
// 1. Update src/theme/theme.ts
export const spacing = {
  // ... existing spacing
  18: `72px`,  // Add new size
  26: `104px`,
};

// 2. Use in components
<div className="p-[var(--spacing-18)]">Content</div>
```

---

## Best Practices

### ✅ DO

```tsx
// Use CSS variables
<div className="bg-[var(--color-primary)]">

// Use theme hooks
const { isDark } = useTheme();

// Use design system spacing
<div className="p-[var(--spacing-4)] gap-[var(--spacing-2)]">

// Reference tokens
import { spacing, typography } from '@/theme/theme';

// Create variants using CSS variables
const styles = isDark
  ? 'bg-[var(--color-bg-secondary)]'
  : 'bg-[var(--color-bg-primary)]';
```

### ❌ DON'T

```tsx
// DON'T hardcode colors
<div className="bg-#2563eb">  // ❌ WRONG

// DON'T hardcode spacing
<div className="p-4">  // ❌ WRONG (breaks theme system)

// DON'T hardcode font sizes
<h1 style={{ fontSize: '32px' }}>  // ❌ WRONG

// DON'T use inline styles with hardcoded values
<div style={{ color: '#111' }}>  // ❌ WRONG

// DON'T ignore dark mode
<div className="bg-white">  // ❌ Works only in light mode
```

---

## Persistence

Theme preferences are automatically saved to localStorage:
- Theme mode (light/dark/auto)
- Accent color
- Compact mode setting
- Sidebar state

They're restored on page reload. No manual config needed!

---

## Troubleshooting

### Theme not applying?
1. Ensure wrapped in `<ThemeProvider>`
2. Check browser DevTools → Inspect element → Styles
3. Verify CSS variables are set on `:root`

### Colors wrong in dark mode?
1. Check `isDark` value from `useTheme()`
2. Ensure component uses CSS variables, not hardcoded colors
3. Verify `html.dark` class is applied

### Tailwind colors not working?
1. Verify `tailwind.config.ts` has CSS variable references
2. Clear Tailwind cache: `rm -rf .next` (if using Next.js)
3. Restart dev server

### Component colors don't respond to theme change?
1. Use CSS variables: `bg-[var(--color-primary)]`
2. Avoid hardcoded colors: ❌ `bg-blue-500`
3. Check that component is wrapped in ThemeProvider

---

## File Structure

```
src/
├── theme/
│   ├── theme.ts           # Design tokens (colors, spacing, typography)
│   └── themeUtils.ts      # Helper functions (CSS variable application)
├── context/
│   └── ThemeContext.tsx   # Theme provider & context
├── hooks/
│   └── useTheme.ts        # Custom hooks (useTheme, useIsDark, etc.)
├── components/
│   ├── ThemeSwitcher.tsx  # Theme mode switcher UI
│   ├── Button.tsx         # Themed button example
│   ├── StyledCard.tsx     # Themed card example
│   ├── FormInput.tsx      # Themed form input example
│   └── Container.tsx      # Layout containers (Section, Grid)
└── index.css              # Global styles & CSS variable definitions
```

---

## Key Features

✅ **Centralized theme control** - Single source of truth  
✅ **Light & dark mode** - Automatic switching  
✅ **Dynamic accent colors** - Change brand color instantly  
✅ **CSS variables** - Used by all components automatically  
✅ **Tailwind integration** - Full design system in Tailwind  
✅ **Type-safe** - TypeScript support throughout  
✅ **Performance** - CSS variables = no runtime overhead  
✅ **Accessibility** - Respects system preferences  
✅ **Persistence** - Theme saved to localStorage  
✅ **Scalable** - Easy to add new tokens and themes  

---

## Next Steps

1. Review example components (Button, Card, etc.)
2. Update existing components to use theme values
3. Remove any hardcoded colors/spacing
4. Test theme switching in your app
5. Customize colors/spacing to match your brand
6. Add new design tokens as needed

Happy theming! 🎨

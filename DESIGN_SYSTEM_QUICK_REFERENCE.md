# DESIGN SYSTEM QUICK REFERENCE

## Installation/Setup

```tsx
// 1. Wrap app with ThemeProvider
<ThemeProvider>
  <App />
</ThemeProvider>

// 2. Use theme hook
const { isDark, setMode, accent, setAccent } = useTheme();

// 3. Add ThemeSwitcher to navbar
<ThemeSwitcher />
```

---

## Color Usage

| Use Case | Code |
|----------|------|
| Primary text | `text-[var(--color-text-primary)]` |
| Secondary text | `text-[var(--color-text-secondary)]` |
| Disabled text | `text-[var(--color-text-disabled)]` |
| Primary color | `bg-[var(--color-primary)]` |
| Success | `bg-[var(--color-success)]` |
| Warning | `bg-[var(--color-warning)]` |
| Error | `text-[var(--color-error)]` |
| Background | `bg-[var(--color-bg-primary)]` |
| Secondary bg | `bg-[var(--color-bg-secondary)]` |
| Border | `border-[var(--color-border)]` |

---

## Spacing Scale (4px base)

| Size | Value | Usage |
|------|-------|-------|
| `--spacing-xs` | 4px | Micro spacing |
| `--spacing-sm` | 8px | Tight spacing |
| `--spacing-md` | 12px | Normal spacing |
| `--spacing-4` | 16px | **Base** - most common |
| `--spacing-6` | 24px | Large spacing |
| `--spacing-8` | 32px | Extra large |

**Usage:** `p-[var(--spacing-4)]` `m-[var(--spacing-2)]` `gap-[var(--spacing-3)]`

---

## Typography

| Level | Code |
|-------|------|
| Heading 1 | `text-[var(--font-size-4xl)] font-bold` |
| Heading 2 | `text-[var(--font-size-3xl)] font-semibold` |
| Heading 3 | `text-[var(--font-size-2xl)] font-semibold` |
| Body text | `text-[var(--font-size-base)]` (default) |
| Small text | `text-[var(--font-size-sm)]` |
| Extra small | `text-[var(--font-size-xs)]` |

---

## Common Patterns

### Card
```tsx
<div className="bg-[var(--color-bg-primary)] rounded-lg shadow-md p-[var(--spacing-6)]">
  Content
</div>
```

### Button
```tsx
<button className="bg-[var(--color-primary)] text-white px-[var(--spacing-4)] py-[var(--spacing-2)] rounded-md hover:bg-[var(--color-primary-hover)] transition duration-fast">
  Click me
</button>
```

### Input
```tsx
<input className="border border-[var(--color-border)] rounded-md px-[var(--spacing-3)] py-[var(--spacing-2)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-light)]" />
```

### Section
```tsx
<section className="bg-[var(--color-bg-secondary)] py-[var(--spacing-12)] px-[var(--spacing-6)]">
  <div className="max-w-5xl mx-auto">Content</div>
</section>
```

### Grid
```tsx
<div className="grid grid-cols-3 gap-[var(--spacing-6)]">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</div>
```

---

## Shadows

| Level | Code |
|-------|------|
| Subtle | `shadow-sm` |
| Normal | `shadow-base` or `shadow-md` |
| Large | `shadow-lg` |
| Extra large | `shadow-xl` |

---

## Border Radius

| Size | Value |
|------|-------|
| `rounded-xs` | 2px |
| `rounded-sm` | 4px |
| `rounded-md` | 8px |
| `rounded-lg` | 12px |
| `rounded-full` | 9999px |

---

## Transitions

```tsx
// Duration options
duration-fastest  /* 75ms */
duration-fast     /* 150ms */
duration-normal   /* 200ms */
duration-slow     /* 300ms */

// Timing options
ease-in
ease-out
ease-in-out

// Example
transition-all duration-normal ease-in-out
```

---

## Dark Mode

The app automatically handles dark mode. Just use CSS variables:

```tsx
// ✅ Works in both light and dark
<div className="text-[var(--color-text-primary)]">
  Works everywhere!
</div>

// ❌ Doesn't work—avoid!
<div className="text-black">Only works in light</div>
```

---

## Responsive Design

Use Tailwind breakpoints with theme variables:

```tsx
<div className="p-[var(--spacing-4)] md:p-[var(--spacing-6)] lg:p-[var(--spacing-8)]">
  Responsive spacing
</div>
```

---

## Hooks

### useTheme()
```tsx
const { 
  isDark,           // boolean
  mode,             // 'light' | 'dark' | 'auto'
  setMode,          // (mode: ThemeMode) => void
  accent,           // current accent color
  setAccent,        // (color: string) => void
  compactMode,      // boolean
  setCompactMode,   // (v: boolean) => void
} = useTheme();
```

### useIsDark()
```tsx
const isDark = useIsDark();  // boolean only
```

### useThemedValue()
```tsx
const primaryColor = useThemedValue('--color-primary');
const spacing = useThemedValue('--spacing-4');
```

### useDesignSystem()
```tsx
const { colors, spacing, typography } = useDesignSystem();
```

---

## CSS Variable Reference

### Colors
```
--color-primary              // Brand color
--color-primary-hover        // Hover state
--color-primary-light        // Light variant
--color-secondary            // Secondary color
--color-success              // Success state
--color-warning              // Warning state
--color-error                // Error state
--color-bg-primary           // Main background
--color-bg-secondary         // Secondary background
--color-bg-tertiary          // Tertiary background
--color-text-primary         // Main text
--color-text-secondary       // Secondary text
--color-text-tertiary        // Tertiary text
--color-text-disabled        // Disabled text
--color-border               // Border color
```

### Spacing
```
--spacing-1 to --spacing-24  // Individual values
--spacing-xs / sm / md / lg / xl / 2xl  // Shortcuts
```

### Typography
```
--font-size-xs to 5xl        // Font sizes
--font-weight-thin to black  // Font weights
--line-height-*              // Line heights
--font-family-sans/mono      // Font families
```

### Visual
```
--shadow-xs to xl            // Shadows
--border-radius-*            // Radius values
--transition-duration-*      // Durations
--transition-timing-*        // Timing functions
```

---

## Files Location

```
src/
├── theme/theme.ts              # All design tokens
├── theme/themeUtils.ts         # CSS variable helpers
├── context/ThemeContext.tsx    # Theme provider
├── hooks/useTheme.ts           # Theme hooks
├── components/ThemeSwitcher.tsx # Theme switcher UI
└── index.css                    # Global CSS
```

---

## Do's and Don'ts

| ✅ DO | ❌ DON'T |
|------|---------|
| `bg-[var(--color-primary)]` | `bg-blue-500` |
| `p-[var(--spacing-4)]` | `p-4` |
| `text-[var(--font-size-lg)]` | `text-lg` |
| `shadow-md` | `shadow-custom-xyz` |
| `useTheme()` hook | Manual color switching |
| `rounded-md` | `rounded-[10px]` |
| CSS variables first | Tailwind classes second |
| Check dark mode | Ignore dark mode |

---

## Examples

### Complete Card Component
```tsx
export const Card = ({ title, children }) => (
  <div className="bg-[var(--color-bg-primary)] rounded-lg shadow-md p-[var(--spacing-6)]">
    <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-3)]">
      {title}
    </h3>
    <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
      {children}
    </p>
  </div>
);
```

### Complete Button Component
```tsx
export const Button = ({ variant = 'primary', size = 'md', children }) => {
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
    secondary: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
  };
  
  const sizes = {
    sm: 'px-[var(--spacing-3)] py-[var(--spacing-1.5)]',
    md: 'px-[var(--spacing-4)] py-[var(--spacing-2)]'
  };
  
  return (
    <button className={`rounded-md transition duration-fast ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
};
```

### Dark Mode Support
```tsx
// ✅ Automatically works in dark mode
export const MyComponent = () => (
  <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
    Works in light and dark!
  </div>
);
```

---

## Troubleshooting

**Theme not applying?**
- Make sure app is wrapped in `<ThemeProvider>`
- Check browser DevTools → `:root` styles

**Colors look wrong in dark mode?**
- Use CSS variables, not hardcoded colors
- Check `isDark` from `useTheme()`

**Tailwind colors not working?**
- Verify `tailwind.config.ts` extends with CSS variables
- Restart dev server

**Component doesn't respond to theme change?**
- No inline styles with hardcoded values
- Use CSS variables: `bg-[var(--color-primary)]`

---

## Need Help?

- Read: `DESIGN_SYSTEM_README.md` (comprehensive guide)
- See: `IMPLEMENTATION_GUIDE.md` (before/after examples)
- Check: `src/components/*.tsx` (example components)
- Run: `useTheme()` hook to debug theme state

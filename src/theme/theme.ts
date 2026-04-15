/**
 * COMPREHENSIVE DESIGN SYSTEM - REBELS ADMIN
 * 
 * All visual styles are defined here and applied globally.
 * NO hardcoded colors, spacing, or typography values in components.
 * 
 * Theme structure:
 * - Colors (with light/dark variants)
 * - Spacing scale (4px based system)
 * - Typography scale
 * - Border radius
 * - Shadows
 * - Transitions/animations
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colorPalette = {
  // Primary colors
  primary: {
    light: '#2563EB',      // Vibrant blue
    dark: '#60A5FA',       // Lighter blue for dark mode
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Secondary colors
  secondary: {
    light: '#6366F1',      // Indigo
    dark: '#818CF8',       // Lighter indigo for dark mode
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Success
  success: {
    light: '#10B981',
    dark: '#34D399',
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBFBDC',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
  },

  // Warning
  warning: {
    light: '#F59E0B',
    dark: '#FBBF24',
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Error / Danger
  error: {
    light: '#EF4444',
    dark: '#F87171',
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Surfaces & Text
  background: {
    light: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
    dark: {
      primary: '#0D0D0D',
      secondary: '#1A1A1A',
      tertiary: '#262626',
    },
  },

  text: {
    light: {
      primary: '#111827',     // Near black
      secondary: '#4B5563',
      tertiary: '#9CA3AF',
      disabled: '#D1D5DB',
      inverse: '#FFFFFF',
    },
    dark: {
      primary: '#F0F0F0',     // Near white
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
      disabled: '#4B5563',
      inverse: '#0D0D0D',
    },
  },

  // Borders
  border: {
    light: '#E5E7EB',
    dark: '#404040',
  },

  // Neutral grays
  gray: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1A6',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },
};

// ============================================================================
// SPACING SYSTEM (4px base scale)
// ============================================================================

const baseSpacing = 4; // 4px base

export const spacing = {
  // 4px base scale
  0: '0',
  px: '1px',
  0.5: `${baseSpacing * 0.5}px`,    // 2px
  1: `${baseSpacing * 1}px`,        // 4px
  1.5: `${baseSpacing * 1.5}px`,    // 6px
  2: `${baseSpacing * 2}px`,        // 8px
  2.5: `${baseSpacing * 2.5}px`,    // 10px
  3: `${baseSpacing * 3}px`,        // 12px
  3.5: `${baseSpacing * 3.5}px`,    // 14px
  4: `${baseSpacing * 4}px`,        // 16px
  5: `${baseSpacing * 5}px`,        // 20px
  6: `${baseSpacing * 6}px`,        // 24px
  7: `${baseSpacing * 7}px`,        // 28px
  8: `${baseSpacing * 8}px`,        // 32px
  9: `${baseSpacing * 9}px`,        // 36px
  10: `${baseSpacing * 10}px`,      // 40px
  12: `${baseSpacing * 12}px`,      // 48px
  14: `${baseSpacing * 14}px`,      // 56px
  16: `${baseSpacing * 16}px`,      // 64px
  20: `${baseSpacing * 20}px`,      // 80px
  24: `${baseSpacing * 24}px`,      // 96px
  28: `${baseSpacing * 28}px`,      // 112px
  32: `${baseSpacing * 32}px`,      // 128px
};

// Common spacing shortcuts
export const spacingScale = {
  // xs: xsmall (4-8px range)
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[3],        // 12px
  
  // base/normal
  base: spacing[4],      // 16px
  
  // lg/large (20-32px range)
  lg: spacing[5],        // 20px
  xl: spacing[6],        // 24px
  xxl: spacing[8],       // 32px
  
  // huge (40px+)
  huge: spacing[10],     // 40px
};

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: 'system-ui, -apple-system, sans-serif',
    mono: '"Courier New", monospace',
  },

  // Font sizes (in rem for better accessibility)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',      // Default
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Typography variants (complete preset combinations)
  variants: {
    // Headings
    h1: {
      fontSize: '3rem',      // 48px
      fontWeight: 700,       // bold
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.25rem',   // 36px
      fontWeight: 700,       // bold
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',  // 30px
      fontWeight: 600,       // semibold
      lineHeight: '1.4',
      letterSpacing: '-0.005em',
    },
    h4: {
      fontSize: '1.5rem',    // 24px
      fontWeight: 600,       // semibold
      lineHeight: '1.4',
    },
    h5: {
      fontSize: '1.25rem',   // 20px
      fontWeight: 600,       // semibold
      lineHeight: '1.5',
    },
    h6: {
      fontSize: '1rem',      // 16px
      fontWeight: 600,       // semibold
      lineHeight: '1.5',
    },

    // Body text
    body1: {
      fontSize: '1rem',      // 16px
      fontWeight: 400,       // normal
      lineHeight: '1.5',
      letterSpacing: '0em',
    },
    body2: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 400,       // normal
      lineHeight: '1.5',
      letterSpacing: '0em',
    },

    // Other
    button: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 600,       // semibold
      lineHeight: '1.5',
      letterSpacing: '0.025em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',   // 12px
      fontWeight: 400,       // normal
      lineHeight: '1.5',
      letterSpacing: '0.005em',
    },
    label: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 500,       // medium
      lineHeight: '1.25',
      letterSpacing: '0em',
    },
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  // Light mode shadows
  light: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // Dark mode shadows
  dark: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
  },
};

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  duration: {
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ============================================================================
// BREAKPOINTS (mobile-first)
// ============================================================================

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const container = {
  xs: '20rem',    // 320px
  sm: '24rem',    // 384px
  md: '28rem',    // 448px
  lg: '32rem',    // 512px
  xl: '36rem',    // 576px
  '2xl': '42rem',  // 672px
  '3xl': '48rem',  // 768px
  '4xl': '56rem',  // 896px
  '5xl': '64rem',  // 1024px
  '6xl': '72rem',  // 1152px
  '7xl': '80rem',  // 1280px
};

// ============================================================================
// Z-INDEX SYSTEM
// ============================================================================

export const zIndex = {
  auto: 'auto',
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  backdrop: '1300',
  offcanvas: '1400',
  modal: '1500',
  popover: '1600',
  tooltip: '1700',
};

// ============================================================================
// THEME PRESETS (Complete themes)
// ============================================================================

export interface ThemePreset {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
    };
    border: string;
  };
}

export const themePresets = {
  light: {
    name: 'Light',
    colors: {
      primary: colorPalette.primary.light,
      secondary: colorPalette.secondary.light,
      success: colorPalette.success.light,
      warning: colorPalette.warning.light,
      error: colorPalette.error.light,
      background: colorPalette.background.light,
      text: colorPalette.text.light,
      border: colorPalette.border.light,
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: colorPalette.primary.dark,
      secondary: colorPalette.secondary.dark,
      success: colorPalette.success.dark,
      warning: colorPalette.warning.dark,
      error: colorPalette.error.dark,
      background: colorPalette.background.dark,
      text: colorPalette.text.dark,
      border: colorPalette.border.dark,
    },
  },
};

// ============================================================================
// COMPLETE THEME EXPORT
// ============================================================================

export const designSystem = {
  colors: colorPalette,
  spacing,
  spacingScale,
  typography,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  container,
  zIndex,
  themePresets,
};

export default designSystem;

/**
 * THEME UTILITY FUNCTIONS
 * 
 * Helpers to apply theme values to CSS custom properties (variables)
 */

import { colorPalette, spacing, typography, shadows, transitions } from './theme';

/**
 * Convert hex color to RGB format (for use with rgba)
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r} ${g} ${b}`;
}

/**
 * Adjust hex color brightness
 */
export function hexAdjust(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/**
 * Apply all theme CSS variables to document root
 */
export function applyThemeCSSVariables(
  isDark: boolean,
  accentColor: string = colorPalette.primary.light
): void {
  const root = document.documentElement;
  const preset = isDark ? 'dark' : 'light';
  const theme = isDark ? colorPalette.background.dark : colorPalette.background.light;
  const textTheme = isDark ? colorPalette.text.dark : colorPalette.text.light;
  const shadowTheme = isDark ? shadows.dark : shadows.light;
  const borderColor = isDark ? colorPalette.border.dark : colorPalette.border.light;

  // ────────────────────────────────────────────────────────────────────────
  // COLOR VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  // Primary brand color
  root.style.setProperty('--color-primary', accentColor);
  root.style.setProperty('--color-primary-rgb', hexToRgb(accentColor));
  root.style.setProperty('--color-primary-hover', hexAdjust(accentColor, isDark ? 30 : -25));
  root.style.setProperty('--color-primary-active', hexAdjust(accentColor, isDark ? 50 : -40));
  root.style.setProperty('--color-primary-light', accentColor + '18');
  root.style.setProperty('--color-primary-lighter', accentColor + '0f');

  // Secondary colors
  root.style.setProperty('--color-secondary', colorPalette.secondary.light);
  root.style.setProperty('--color-success', colorPalette.success.light);
  root.style.setProperty('--color-warning', colorPalette.warning.light);
  root.style.setProperty('--color-error', colorPalette.error.light);

  // Background colors
  root.style.setProperty('--color-bg-primary', theme.primary);
  root.style.setProperty('--color-bg-secondary', theme.secondary);
  root.style.setProperty('--color-bg-tertiary', theme.tertiary);

  // Text colors
  root.style.setProperty('--color-text-primary', textTheme.primary);
  root.style.setProperty('--color-text-secondary', textTheme.secondary);
  root.style.setProperty('--color-text-tertiary', textTheme.tertiary);
  root.style.setProperty('--color-text-disabled', textTheme.disabled);
  root.style.setProperty('--color-text-inverse', textTheme.inverse);

  // Border color
  root.style.setProperty('--color-border', borderColor);

  // ────────────────────────────────────────────────────────────────────────
  // SPACING VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  Object.entries(spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value as string);
  });

  // Common spacing shortcuts
  root.style.setProperty('--spacing-xs', spacing[1]);
  root.style.setProperty('--spacing-sm', spacing[2]);
  root.style.setProperty('--spacing-md', spacing[3]);
  root.style.setProperty('--spacing-base', spacing[4]);
  root.style.setProperty('--spacing-lg', spacing[5]);
  root.style.setProperty('--spacing-xl', spacing[6]);
  root.style.setProperty('--spacing-2xl', spacing[8]);

  // ────────────────────────────────────────────────────────────────────────
  // TYPOGRAPHY VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  Object.entries(typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });

  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-weight-${key}`, String(value));
  });

  Object.entries(typography.lineHeight).forEach(([key, value]) => {
    root.style.setProperty(`--line-height-${key}`, String(value));
  });

  root.style.setProperty('--font-family-sans', typography.fontFamily.sans);
  root.style.setProperty('--font-family-mono', typography.fontFamily.mono);

  // ────────────────────────────────────────────────────────────────────────
  // SHADOW VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  Object.entries(shadowTheme).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // ────────────────────────────────────────────────────────────────────────
  // TRANSITION VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  Object.entries(transitions.duration).forEach(([key, value]) => {
    root.style.setProperty(`--transition-duration-${key}`, value);
  });

  Object.entries(transitions.timing).forEach(([key, value]) => {
    root.style.setProperty(`--transition-timing-${key}`, value);
  });

  // ────────────────────────────────────────────────────────────────────────
  // THEME CLASS
  // ────────────────────────────────────────────────────────────────────────

  root.classList.toggle('dark', isDark);
  root.setAttribute('data-theme', preset);
}

export default {
  hexToRgb,
  hexAdjust,
  applyThemeCSSVariables,
};

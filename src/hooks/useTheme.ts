/**
 * CUSTOM THEME HOOKS
 * 
 * useTheme - Access theme context and state
 * useThemedValue - Get CSS variable values programmatically
 * useIsDark - Simple dark mode check
 */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { designSystem } from '../theme/theme';

/**
 * Main hook to access theme context and methods
 * 
 * USAGE:
 * ```tsx
 * const { isDark, setMode, accent, setAccent } = useTheme();
 * 
 * return (
 *   <div>
 *     <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
 *       Toggle theme
 *     </button>
 *   </div>
 * );
 * ```
 */
export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
};

/**
 * Get CSS variable value as a string
 * Useful when you need to use theme values in JavaScript
 * 
 * USAGE:
 * ```tsx
 * const primaryColor = useThemedValue('--color-primary');
 * const baseSpacing = useThemedValue('--spacing-4');
 * ```
 */
export const useThemedValue = (varName: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

/**
 * Check if dark mode is active
 * 
 * USAGE:
 * ```tsx
 * const isDark = useIsDark();
 * return <div>{isDark ? 'Dark Mode' : 'Light Mode'}</div>;
 * ```
 */
export const useIsDark = (): boolean => {
    const { isDark } = useTheme();
    return isDark;
};

/**
 * Get design system tokens directly
 * 
 * USAGE:
 * ```tsx
 * const { colors, spacing, typography } = useDesignSystem();
 * return <div style={{ padding: spacing[4] }}>...</div>;
 * ```
 */
export const useDesignSystem = () => {
    return designSystem;
};

export default {
    useTheme,
    useThemedValue,
    useIsDark,
    useDesignSystem,
};

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { applyThemeCSSVariables } from '../theme/themeUtils';
import { colorPalette } from '../theme/theme';

export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Complete theme state with all design system values
 */
export interface ThemeState {
    // Theme mode
    mode: ThemeMode;

    // Brand/accent color
    accent: string;

    // UI variants
    compactMode: boolean;
    sidebarCollapsed: boolean;
}

/**
 * Theme context value with all methods
 */
interface ThemeContextValue extends ThemeState {
    // Mode control
    setMode: (m: ThemeMode) => void;

    // Accent/brand color control
    setAccent: (c: string) => void;

    // UI state
    setCompactMode: (v: boolean) => void;
    setSidebarCollapsed: (v: boolean) => void;

    // Batch updates
    applyAppearance: (patch: Partial<ThemeState>) => void;

    // Computed values
    isDark: boolean;
}

const STORAGE_KEY = 'rebels_theme';

const defaults: ThemeState = {
    mode: 'light',
    accent: colorPalette.primary.light,
    compactMode: false,
    sidebarCollapsed: false,
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Determine if dark mode is currently active
 */
function resolveIsDark(mode: ThemeMode): boolean {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Apply all theme values to DOM
 */
function applyToDOM(state: ThemeState) {
    const root = document.documentElement;
    const isDark = resolveIsDark(state.mode);

    // Apply all CSS variables using the unified theme system
    applyThemeCSSVariables(isDark, state.accent);

    // Legacy accent vars (kept for backwards compatibility)
    root.style.setProperty('--accent', state.accent);

    // Spacing multiplier for compact mode
    root.style.setProperty('--sp', state.compactMode ? '0.7' : '1');

    // UI class toggles
    root.classList.toggle('dark', isDark);
    root.classList.toggle('compact', state.compactMode);
}

/**
 * Theme Provider Component
 * 
 * Wraps your app and provides theme context to all components.
 * 
 * Example:
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ThemeState>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
        } catch {
            return defaults;
        }
    });

    const isDark = resolveIsDark(state.mode);

    // Apply theme to DOM whenever state changes
    useEffect(() => {
        applyToDOM(state);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    // Listen for system theme changes when in 'auto' mode
    useEffect(() => {
        if (state.mode !== 'auto') return;

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => applyToDOM(state);

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [state]);

    // Update function
    const update = (patch: Partial<ThemeState>) =>
        setState(prev => ({ ...prev, ...patch }));

    return (
        <ThemeContext.Provider value={{
            ...state,
            isDark,
            setMode: m => update({ mode: m }),
            setAccent: c => update({ accent: c }),
            setCompactMode: v => update({ compactMode: v }),
            setSidebarCollapsed: v => update({ sidebarCollapsed: v }),
            applyAppearance: patch => update(patch),
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
};
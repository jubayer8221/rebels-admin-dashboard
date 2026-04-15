/**
 * DESIGN SETTINGS CONTEXT
 * 
 * Centralized configuration for all UI spacing, padding, margins, border radius, and font sizes.
 * Allows runtime updates that reflect instantly across the entire app.
 * Persists settings to localStorage.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SpacingScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BorderRadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type FontSizeScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Design Settings structure - controls all visual spacing and sizing
 */
export interface DesignSettings {
    // Spacing scale multiplier (1 = default, 1.5 = 50% more, 0.8 = 20% less)
    spacingScale: number;

    // Padding presets
    paddingXs: string;
    paddingSm: string;
    paddingMd: string;
    paddingLg: string;
    paddingXl: string;

    // Margin presets
    marginXs: string;
    marginSm: string;
    marginMd: string;
    marginLg: string;
    marginXl: string;

    // Gap (for flex/grid layouts)
    gapXs: string;
    gapSm: string;
    gapMd: string;
    gapLg: string;
    gapXl: string;

    // Border radius presets
    radiusNone: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radiusFull: string;

    // Font sizes
    fontSizeXs: string;
    fontSizeSm: string;
    fontSizeMd: string;
    fontSizeLg: string;
    fontSizeXl: string;
    fontSize2xl: string;

    // Global roundedness level (affects all border-radius)
    roundness: 'sharp' | 'moderate' | 'smooth' | 'ultra';

    // Compact mode (reduces padding/margins globally)
    compactMode: boolean;
}

/**
 * Context value interface
 */
interface DesignSettingsContextType {
    settings: DesignSettings;
    updateSetting: <K extends keyof DesignSettings>(
        key: K,
        value: DesignSettings[K]
    ) => void;
    updateMultiple: (partial: Partial<DesignSettings>) => void;
    resetToDefaults: () => void;
}

// ============================================================================
// DEFAULT SETTINGS
// ============================================================================

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
    spacingScale: 1,

    paddingXs: '0.5rem',
    paddingSm: '0.75rem',
    paddingMd: '1rem',
    paddingLg: '1.5rem',
    paddingXl: '2rem',

    marginXs: '0.5rem',
    marginSm: '0.75rem',
    marginMd: '1rem',
    marginLg: '1.5rem',
    marginXl: '2rem',

    gapXs: '0.5rem',
    gapSm: '0.75rem',
    gapMd: '1rem',
    gapLg: '1.5rem',
    gapXl: '2rem',

    radiusNone: '0px',
    radiusSm: '0.25rem',
    radiusMd: '0.5rem',
    radiusLg: '0.75rem',
    radiusXl: '1rem',
    radiusFull: '9999px',

    fontSizeXs: '0.75rem',
    fontSizeSm: '0.875rem',
    fontSizeMd: '1rem',
    fontSizeLg: '1.125rem',
    fontSizeXl: '1.5rem',
    fontSize2xl: '2rem',

    roundness: 'moderate',
    compactMode: false,
};

// ============================================================================
// PRESETS FOR QUICK CHANGES
// ============================================================================

// eslint-disable-next-line react-refresh/only-export-components
export const ROUNDNESS_PRESETS: Record<'sharp' | 'moderate' | 'smooth' | 'ultra', Partial<DesignSettings>> = {
    sharp: {
        radiusNone: '0px',
        radiusSm: '0px',
        radiusMd: '0.125rem',
        radiusLg: '0.25rem',
        radiusXl: '0.5rem',
        radiusFull: '9999px',
    },
    moderate: {
        radiusNone: '0px',
        radiusSm: '0.25rem',
        radiusMd: '0.5rem',
        radiusLg: '0.75rem',
        radiusXl: '1rem',
        radiusFull: '9999px',
    },
    smooth: {
        radiusNone: '0px',
        radiusSm: '0.5rem',
        radiusMd: '0.75rem',
        radiusLg: '1rem',
        radiusXl: '1.5rem',
        radiusFull: '9999px',
    },
    ultra: {
        radiusNone: '0px',
        radiusSm: '1rem',
        radiusMd: '1.5rem',
        radiusLg: '2rem',
        radiusXl: '2.5rem',
        radiusFull: '9999px',
    },
};

// eslint-disable-next-line react-refresh/only-export-components
export const SPACING_SCALE_PRESETS = {
    compact: 0.75,
    normal: 1,
    comfortable: 1.25,
    spacious: 1.5,
};

// ============================================================================
// CONTEXT & PROVIDER
// ============================================================================

const DesignSettingsContext = createContext<DesignSettingsContextType | undefined>(undefined);

interface DesignSettingsProviderProps {
    children: ReactNode;
    persistKey?: string;
}

export const DesignSettingsProvider: React.FC<DesignSettingsProviderProps> = ({
    children,
    persistKey = 'design-settings',
}) => {
    const [settings, setSettings] = useState<DesignSettings>(() => {
        // Load from localStorage if available
        try {
            const stored = localStorage.getItem(persistKey);
            if (stored) {
                return { ...DEFAULT_DESIGN_SETTINGS, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load design settings from localStorage:', error);
        }
        return DEFAULT_DESIGN_SETTINGS;
    });

    // Apply settings to DOM as CSS variables
    useEffect(() => {
        applyDesignSettingsToDOM(settings);
    }, [settings]);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(persistKey, JSON.stringify(settings));
        } catch (error) {
            console.warn('Failed to persist design settings to localStorage:', error);
        }
    }, [settings, persistKey]);

    const updateSetting = <K extends keyof DesignSettings>(
        key: K,
        value: DesignSettings[K]
    ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const updateMultiple = (partial: Partial<DesignSettings>) => {
        setSettings((prev) => ({ ...prev, ...partial }));
    };

    const resetToDefaults = () => {
        setSettings(DEFAULT_DESIGN_SETTINGS);
    };

    return (
        <DesignSettingsContext.Provider
            value={{ settings, updateSetting, updateMultiple, resetToDefaults }}
        >
            {children}
        </DesignSettingsContext.Provider>
    );
};

// ============================================================================
// HOOKS
// ============================================================================

// eslint-disable-next-line react-refresh/only-export-components
export const useDesignSettings = (): DesignSettingsContextType => {
    const context = useContext(DesignSettingsContext);
    if (!context) {
        throw new Error('useDesignSettings must be used within DesignSettingsProvider');
    }
    return context;
};

// ============================================================================
// UTILITY: APPLY SETTINGS TO DOM
// ============================================================================

/**
 * Apply all design settings as CSS variables to the document root
 */
// eslint-disable-next-line react-refresh/only-export-components
export function applyDesignSettingsToDOM(settings: DesignSettings): void {
    const root = document.documentElement;
    const scale = settings.spacingScale;

    // Helper to scale a value
    const scaleValue = (value: string): string => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return value;
        const unit = value.replace(/[\d.]/g, '');
        return `${numValue * scale}${unit}`;
    };

    // Apply padding
    root.style.setProperty('--padding-xs', scaleValue(settings.paddingXs));
    root.style.setProperty('--padding-sm', scaleValue(settings.paddingSm));
    root.style.setProperty('--padding-md', scaleValue(settings.paddingMd));
    root.style.setProperty('--padding-lg', scaleValue(settings.paddingLg));
    root.style.setProperty('--padding-xl', scaleValue(settings.paddingXl));

    // Apply margin
    root.style.setProperty('--margin-xs', scaleValue(settings.marginXs));
    root.style.setProperty('--margin-sm', scaleValue(settings.marginSm));
    root.style.setProperty('--margin-md', scaleValue(settings.marginMd));
    root.style.setProperty('--margin-lg', scaleValue(settings.marginLg));
    root.style.setProperty('--margin-xl', scaleValue(settings.marginXl));

    // Apply gap
    root.style.setProperty('--gap-xs', scaleValue(settings.gapXs));
    root.style.setProperty('--gap-sm', scaleValue(settings.gapSm));
    root.style.setProperty('--gap-md', scaleValue(settings.gapMd));
    root.style.setProperty('--gap-lg', scaleValue(settings.gapLg));
    root.style.setProperty('--gap-xl', scaleValue(settings.gapXl));

    // Apply border radius
    root.style.setProperty('--radius-none', settings.radiusNone);
    root.style.setProperty('--radius-sm', settings.radiusSm);
    root.style.setProperty('--radius-md', settings.radiusMd);
    root.style.setProperty('--radius-lg', settings.radiusLg);
    root.style.setProperty('--radius-xl', settings.radiusXl);
    root.style.setProperty('--radius-full', settings.radiusFull);

    // Apply font sizes
    root.style.setProperty('--font-size-xs', settings.fontSizeXs);
    root.style.setProperty('--font-size-sm', settings.fontSizeSm);
    root.style.setProperty('--font-size-md', settings.fontSizeMd);
    root.style.setProperty('--font-size-lg', settings.fontSizeLg);
    root.style.setProperty('--font-size-xl', settings.fontSizeXl);
    root.style.setProperty('--font-size-2xl', settings.fontSize2xl);
}

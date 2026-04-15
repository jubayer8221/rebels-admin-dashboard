/**
 * THEME SWITCHER COMPONENT
 * 
 * Provides UI controls to change theme, accent color, and other theme settings.
 * Uses all theme system CSS variables.
 */

import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { colorPalette } from '../theme/theme';
import { Moon, Sun, Settings } from 'lucide-react';

/**
 * Main theme switcher component
 * 
 * USAGE:
 * ```tsx
 * import { ThemeSwitcher } from '@/components/ThemeSwitcher';
 * 
 * export function Navbar() {
 *   return (
 *     <nav>
 *       <div>Logo</div>
 *       <ThemeSwitcher />
 *     </nav>
 *   );
 * }
 * ```
 */
export const ThemeSwitcher: React.FC = () => {
    const { mode, setMode, accent, setAccent, compactMode, setCompactMode } = useTheme();
    const [showSettings, setShowSettings] = React.useState(false);

    const accentOptions = [
        { name: 'Blue', color: colorPalette.primary.light },
        { name: 'Indigo', color: colorPalette.secondary.light },
        { name: 'Green', color: colorPalette.success.light },
        { name: 'Amber', color: colorPalette.warning.light },
        { name: 'Red', color: colorPalette.error.light },
    ];

    return (
        <div className="relative">
            {/* Theme Mode Toggle */}
            <div className="flex items-center gap-2 p-2 bg-(--color-bg-secondary) rounded-lg">
                {/* Light mode button */}
                <button
                    onClick={() => setMode('light')}
                    className={`p-2 rounded transition-colors ${mode === 'light'
                        ? 'bg-(--color-primary) text-white'
                        : 'text-(--color-text-secondary) hover:bg-(--color-bg-tertiary)'
                        }`}
                    title="Light mode"
                    aria-label="Light mode"
                >
                    <Sun size={18} />
                </button>

                {/* Dark mode button */}
                <button
                    onClick={() => setMode('dark')}
                    className={`p-2 rounded transition-colors ${mode === 'dark'
                        ? 'bg-(--color-primary) text-white'
                        : 'text-(--color-text-secondary) hover:bg-(--color-bg-tertiary)'
                        }`}
                    title="Dark mode"
                    aria-label="Dark mode"
                >
                    <Moon size={18} />
                </button>

                {/* Settings button */}
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded text-(--color-text-secondary) hover:bg-(--color-bg-tertiary) transition-colors ml-2"
                    title="Theme settings"
                    aria-label="Theme settings"
                >
                    <Settings size={18} />
                </button>
            </div>

            {/* Settings Dropdown */}
            {showSettings && (
                <div className="absolute right-0 mt-2 w-72 bg-(--color-bg-primary) border border-(--color-border) rounded-lg shadow-lg p-4 z-(--z-index-dropdown)">
                    {/* Accent Color Selection */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-(--color-text-primary) mb-3">
                            Brand Color
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                            {accentOptions.map(option => (
                                <button
                                    key={option.color}
                                    onClick={() => setAccent(option.color)}
                                    className={`w-full aspect-square rounded-lg transition-all ${accent === option.color
                                        ? 'ring-2 ring-offset-2 ring-(--color-primary)'
                                        : 'hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: option.color }}
                                    title={option.name}
                                    aria-label={`${option.name} accent color`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Compact Mode Toggle */}
                    <div className="border-t border-(--color-border) pt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={compactMode}
                                onChange={e => setCompactMode(e.target.checked)}
                                className="w-4 h-4 rounded"
                            />
                            <span className="text-sm font-medium text-(--color-text-primary)">
                                Compact layout
                            </span>
                        </label>
                    </div>

                    {/* Current theme info */}
                    <div className="border-t border-(--color-border) mt-4 pt-4">
                        <p className="text-xs text-olor-text-tertiary)">
                            Mode: <span className="font-semibold text-(--color-text-secondary)">{mode}</span>
                        </p>
                        <p className="text-xs text-(--color-text-tertiary)">
                            Current: <span className="font-semibold" style={{ color: accent }}>■</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;

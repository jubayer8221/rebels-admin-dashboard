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
            <div className="flex items-center gap-2 p-2 bg-[var(--color-bg-secondary)] rounded-lg">
                {/* Light mode button */}
                <button
                    onClick={() => setMode('light')}
                    className={`p-2 rounded transition-all duration-200 ${mode === 'light'
                        ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]'
                        }`}
                    title="Light mode"
                    aria-label="Light mode"
                >
                    <Sun size={18} />
                </button>

                {/* Dark mode button */}
                <button
                    onClick={() => setMode('dark')}
                    className={`p-2 rounded transition-all duration-200 ${mode === 'dark'
                        ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]'
                        }`}
                    title="Dark mode"
                    aria-label="Dark mode"
                >
                    <Moon size={18} />
                </button>

                {/* Settings button */}
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)] transition-all duration-200 ml-2"
                    title="Theme settings"
                    aria-label="Theme settings"
                >
                    <Settings size={18} />
                </button>
            </div>

            {/* Settings Dropdown */}
            {showSettings && (
                <div className="glass glass-interactive absolute right-0 mt-2 w-72 p-4 z-[var(--z-index-dropdown)]">
                    {/* Accent Color Selection */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                            Brand Color
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                            {accentOptions.map(option => (
                                <button
                                    key={option.color}
                                    onClick={() => setAccent(option.color)}
                                    className={`w-full aspect-square rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg ${accent === option.color
                                        ? 'ring-2 ring-offset-2 ring-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/30'
                                        : 'hover:shadow-[var(--color-secondary)]/20'
                                        }`}
                                    style={{ backgroundColor: option.color }}
                                    title={option.name}
                                    aria-label={`${option.name} accent color`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Compact Mode Toggle */}
                    <div className="border-t border-[var(--color-border)]/30 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={compactMode}
                                onChange={e => setCompactMode(e.target.checked)}
                                className="w-4 h-4 rounded accent-[var(--color-secondary)] cursor-pointer"
                            />
                            <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                                Compact layout
                            </span>
                        </label>
                    </div>

                    {/* Current theme info */}
                    <div className="border-t border-[var(--color-border)]/30 mt-4 pt-4">
                        <p className="text-xs text-[var(--color-text-tertiary)]">
                            Mode: <span className="font-semibold text-[var(--color-secondary)]">{mode}</span>
                        </p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">
                            Current: <span className="font-semibold" style={{ color: accent }}>■</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;

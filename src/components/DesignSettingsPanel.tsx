/**
 * DESIGN SETTINGS PANEL
 * 
 * User-facing UI for controlling global design settings.
 * Allows adjustment of spacing, padding, borders, and more.
 */

import React, { useState } from 'react';
import { useDesignSettings, ROUNDNESS_PRESETS, SPACING_SCALE_PRESETS } from '../context/DesignSettingsContext';
import { ChevronDown, RotateCcw, Settings2, Copy, Download } from 'lucide-react';

export const DesignSettingsPanel: React.FC = () => {
    const { settings, updateSetting, updateMultiple, resetToDefaults } = useDesignSettings();
    const [isExpanded, setIsExpanded] = useState(false);
    const [fontScale, setFontScale] = useState(1);
    const [shadowIntensity, setShadowIntensity] = useState(1);
    const [transitionSpeed, setTransitionSpeed] = useState('normal');
    const [glassBlur, setGlassBlur] = useState(10);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 hover:shadow-xl ${settings.compactMode
                    ? 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:shadow-[var(--color-secondary)]/30'
                    : 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:shadow-[var(--color-secondary)]/30'
                    } text-white`}
                title="Design Settings"
            >
                <Settings2 size={24} />
            </button>

            {/* Settings Panel */}
            {isExpanded && (
                <div
                    className={`glass glass-lg absolute bottom-20 right-0 w-80 max-h-[80vh] overflow-y-auto rounded-2xl animate-in fade-in slide-in-from-right-4 duration-300`}
                >
                    {/* Header */}
                    <div className={`sticky top-0 p-6 border-b border-[var(--color-border)]/30 bg-[var(--color-secondary)]/10`}>
                        <h2 className={`text-lg font-bold flex items-center gap-2 text-[var(--color-secondary)]`}>
                            <Settings2 size={20} />
                            Design Settings
                        </h2>
                        <p className={`text-sm mt-1 text-[var(--color-text-tertiary)]`}>
                            Customize your UI in real-time
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 1. SPACING SCALE */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Spacing Scale
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Adjust overall padding & margins (current: {(settings.spacingScale * 100).toFixed(0)}%)
                            </p>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={settings.spacingScale}
                                onChange={(e) => updateSetting('spacingScale', parseFloat(e.target.value))}
                                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg accent-[var(--color-secondary)]"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {Object.entries(SPACING_SCALE_PRESETS).map(([name, value]) => (
                                    <button
                                        key={name}
                                        onClick={() => updateSetting('spacingScale', value)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition duration-200 ${Math.abs(settings.spacingScale - value) < 0.01
                                            ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]'
                                            }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. ROUNDNESS PRESETS */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Roundness
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Adjust corner radius (current: {settings.roundness})
                            </p>
                            <div className="space-y-2">
                                {Object.keys(ROUNDNESS_PRESETS).map((roundnessType) => (
                                    <button
                                        key={roundnessType}
                                        onClick={() => {
                                            updateSetting('roundness', roundnessType as 'sharp' | 'moderate' | 'smooth' | 'ultra');
                                            updateMultiple(ROUNDNESS_PRESETS[roundnessType as keyof typeof ROUNDNESS_PRESETS]);
                                        }}
                                        className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition duration-200 border-2 ${settings.roundness === roundnessType
                                            ? 'bg-[var(--color-secondary)] text-white border-[var(--color-secondary-hover)] shadow-md shadow-[var(--color-secondary)]/20'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border-transparent hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]'
                                            }`}
                                    >
                                        {roundnessType.charAt(0).toUpperCase() + roundnessType.slice(1)} ({roundnessType === 'sharp' ? '0-0.5px' : roundnessType === 'moderate' ? '0-1rem' : roundnessType === 'smooth' ? '0.5-1.5rem' : '1-2.5rem'})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. COMPACT MODE */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Compact Mode
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Reduce spacing & padding globally
                            </p>
                            <button
                                onClick={() => updateSetting('compactMode', !settings.compactMode)}
                                className={`w-full px-4 py-3 rounded-lg font-medium transition duration-200 transform ${settings.compactMode
                                    ? 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] hover:shadow-md shadow-[var(--color-secondary)]/20'
                                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10'
                                    }`}
                            >
                                {settings.compactMode ? '✓ Compact ON' : 'Compact OFF'}
                            </button>
                        </div>

                        {/* 4. PADDING CUSTOMIZATION */}
                        <details className="space-y-3 open:bg-[var(--color-secondary)]/5 p-3 rounded-lg group">
                            <summary className="cursor-pointer font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                                <ChevronDown size={16} />
                                Padding Values
                            </summary>
                            <div className="space-y-2 mt-3">
                                {(['Xs', 'Sm', 'Md', 'Lg', 'Xl'] as const).map((size) => (
                                    <div key={size} className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-[var(--color-text-tertiary)] w-10">{size}</label>
                                        <input
                                            type="text"
                                            value={settings[`padding${size}` as keyof typeof settings] as string}
                                            onChange={(e) => updateSetting(`padding${size}` as keyof typeof settings, e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all"
                                            placeholder="e.g., 1rem"
                                        />
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 5. BORDER RADIUS CUSTOMIZATION */}
                        <details className="space-y-3 open:bg-[var(--color-secondary)]/5 p-3 rounded-lg group">
                            <summary className="cursor-pointer font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                                <ChevronDown size={16} />
                                Border Radius Values
                            </summary>
                            <div className="space-y-2 mt-3">
                                {(['None', 'Sm', 'Md', 'Lg', 'Xl', 'Full'] as const).map((size) => (
                                    <div key={size} className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-[var(--color-text-tertiary)] w-10">{size}</label>
                                        <input
                                            type="text"
                                            value={settings[`radius${size}` as keyof typeof settings] as string}
                                            onChange={(e) => updateSetting(`radius${size}` as keyof typeof settings, e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all"
                                            placeholder="e.g., 0.5rem"
                                        />
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 6. FONT SIZE SCALE */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Font Scale
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Adjust all font sizes (current: {(fontScale * 100).toFixed(0)}%)
                            </p>
                            <input
                                type="range"
                                min="0.75"
                                max="1.5"
                                step="0.05"
                                value={fontScale}
                                onChange={(e) => setFontScale(parseFloat(e.target.value))}
                                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg accent-[var(--color-secondary)]"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {[0.85, 1, 1.15].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setFontScale(val)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition duration-200 ${Math.abs(fontScale - val) < 0.01
                                            ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10'
                                            }`}
                                    >
                                        {(val * 100).toFixed(0)}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 7. TRANSITION SPEED */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Animation Speed
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Control transition durations
                            </p>
                            <div className="space-y-2">
                                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                                    <button
                                        key={speed}
                                        onClick={() => setTransitionSpeed(speed)}
                                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${transitionSpeed === speed
                                            ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10'
                                            }`}
                                    >
                                        {speed === 'slow' ? '🐢 Slow (400ms)' : speed === 'normal' ? '⚡ Normal (200ms)' : '🚀 Fast (100ms)'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 8. SHADOW INTENSITY */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Shadow Intensity
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Adjust shadow depth (current: {(shadowIntensity * 100).toFixed(0)}%)
                            </p>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={shadowIntensity}
                                onChange={(e) => setShadowIntensity(parseFloat(e.target.value))}
                                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg accent-[var(--color-secondary)]"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {[0.5, 1, 1.5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setShadowIntensity(val)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition duration-200 ${Math.abs(shadowIntensity - val) < 0.01
                                            ? 'bg-[var(--color-secondary)] text-white shadow-md'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10'
                                            }`}
                                    >
                                        {val === 0.5 ? 'Subtle' : val === 1 ? 'Normal' : 'Bold'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 9. GLASSMORPHISM BLUR */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Glassmorphism Blur
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Adjust blur intensity (current: {glassBlur}px)
                            </p>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="1"
                                value={glassBlur}
                                onChange={(e) => setGlassBlur(parseInt(e.target.value))}
                                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg accent-[var(--color-secondary)]"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {[4, 10, 16].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setGlassBlur(val)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition duration-200 ${glassBlur === val
                                            ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/20'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)]/10'
                                            }`}
                                    >
                                        {val === 4 ? 'Light' : val === 10 ? 'Medium' : 'Heavy'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 10. MARGIN CUSTOMIZATION */}
                        <details className="space-y-3 open:bg-[var(--color-secondary)]/5 p-3 rounded-lg group">
                            <summary className="cursor-pointer font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                                <ChevronDown size={16} />
                                Margin Values
                            </summary>
                            <div className="space-y-2 mt-3">
                                {(['Xs', 'Sm', 'Md', 'Lg', 'Xl'] as const).map((size) => (
                                    <div key={size} className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-[var(--color-text-tertiary)] w-10">{size}</label>
                                        <input
                                            type="text"
                                            value={settings[`margin${size}` as keyof typeof settings] as string}
                                            onChange={(e) => updateSetting(`margin${size}` as keyof typeof settings, e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all"
                                            placeholder="e.g., 1rem"
                                        />
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 11. EXPORT/IMPORT SETTINGS */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Settings Management
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                Save or load design configurations
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        const config = {
                                            settings,
                                            fontScale,
                                            shadowIntensity,
                                            transitionSpeed,
                                            glassBlur,
                                            timestamp: new Date().toISOString(),
                                        };
                                        const json = JSON.stringify(config, null, 2);
                                        const blob = new Blob([json], { type: 'application/json' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `design-settings-${Date.now()}.json`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="w-full px-4 py-2 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] rounded-lg text-sm font-medium hover:bg-[var(--color-secondary)]/30 transition duration-200 flex items-center justify-center gap-2"
                                >
                                    <Download size={14} />
                                    Export Settings
                                </button>
                                <button
                                    onClick={() => {
                                        const json = JSON.stringify({
                                            settings,
                                            fontScale,
                                            shadowIntensity,
                                            transitionSpeed,
                                            glassBlur,
                                        }, null, 2);
                                        navigator.clipboard.writeText(json);
                                        alert('Settings copied to clipboard!');
                                    }}
                                    className="w-full px-4 py-2 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] rounded-lg text-sm font-medium hover:bg-[var(--color-secondary)]/30 transition duration-200 flex items-center justify-center gap-2"
                                >
                                    <Copy size={14} />
                                    Copy to Clipboard
                                </button>
                            </div>
                        </div>

                        {/* 12. PREVIEW SECTION */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-[var(--color-text-primary)]">
                                Component Preview
                            </label>
                            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                                See how your settings look
                            </p>
                            <div className="space-y-2">
                                <div
                                    className="glass glass-interactive p-3 rounded-lg text-[var(--color-text-primary)]"
                                    style={{
                                        fontSize: `${16 * fontScale}px`,
                                        boxShadow: `0 4px 6px rgba(0,0,0,${0.1 * shadowIntensity})`
                                    }}
                                >
                                    <p className="font-semibold">Sample Text</p>
                                    <p className="text-xs text-[var(--color-text-tertiary)]">Preview with current settings</p>
                                </div>
                                <button
                                    className="w-full px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-secondary-hover)] transition duration-200"
                                    style={{ fontSize: `${14 * fontScale}px` }}
                                >
                                    Sample Button
                                </button>
                            </div>
                        </div>

                        {/* 13. RESET BUTTON */}
                        <button
                            onClick={() => {
                                resetToDefaults();
                                setFontScale(1);
                                setShadowIntensity(1);
                                setTransitionSpeed('normal');
                                setGlassBlur(10);
                            }}
                            className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)] transition duration-200 flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={16} />
                            Reset to Defaults
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

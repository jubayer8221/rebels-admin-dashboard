/**
 * DESIGN SETTINGS PANEL
 * 
 * User-facing UI for controlling global design settings.
 * Allows adjustment of spacing, padding, borders, and more.
 */

import React, { useState } from 'react';
import { useDesignSettings, ROUNDNESS_PRESETS, SPACING_SCALE_PRESETS } from '../context/DesignSettingsContext';
import { ChevronDown, RotateCcw, Settings2 } from 'lucide-react';

export const DesignSettingsPanel: React.FC = () => {
    const { settings, updateSetting, updateMultiple, resetToDefaults } = useDesignSettings();
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${settings.compactMode
                    ? 'bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    : 'bg-linear-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                    } text-white`}
                title="Design Settings"
            >
                <Settings2 size={24} />
            </button>

            {/* Settings Panel */}
            {isExpanded && (
                <div
                    className={`absolute bottom-20 right-0 w-80 max-h-[80vh] overflow-y-auto shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 ${settings.compactMode ? 'bg-linear-to-b from-orange-50 to-white dark:from-orange-900 dark:to-gray-800'
                        : 'bg-linear-to-b from-blue-50 to-white dark:from-indigo-900 dark:to-gray-800'
                        } animate-in fade-in slide-in-from-right-4 duration-300`}
                >
                    {/* Header */}
                    <div className={`sticky top-0 p-6 border-b ${settings.compactMode ? 'bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800' : 'bg-blue-100 dark:bg-indigo-900 border-blue-200 dark:border-indigo-800'}`}>
                        <h2 className={`text-lg font-bold flex items-center gap-2 ${settings.compactMode ? 'text-orange-900 dark:text-orange-100' : 'text-indigo-900 dark:text-indigo-100'}`}>
                            <Settings2 size={20} />
                            Design Settings
                        </h2>
                        <p className={`text-sm mt-1 ${settings.compactMode ? 'text-orange-700 dark:text-orange-300' : 'text-indigo-700 dark:text-indigo-300'}`}>
                            Customize your UI in real-time
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 1. SPACING SCALE */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-gray-700 dark:text-gray-300">
                                Spacing Scale
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Adjust overall padding & margins (current: {(settings.spacingScale * 100).toFixed(0)}%)
                            </p>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={settings.spacingScale}
                                onChange={(e) => updateSetting('spacingScale', parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg accent-blue-500"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {Object.entries(SPACING_SCALE_PRESETS).map(([name, value]) => (
                                    <button
                                        key={name}
                                        onClick={() => updateSetting('spacingScale', value)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition ${Math.abs(settings.spacingScale - value) < 0.01
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                            }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. ROUNDNESS PRESETS */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-gray-700 dark:text-gray-300">
                                Roundness
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
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
                                        className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition border-2 ${settings.roundness === roundnessType
                                            ? 'bg-blue-500 text-white border-blue-600'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-200'
                                            }`}
                                    >
                                        {roundnessType.charAt(0).toUpperCase() + roundnessType.slice(1)} ({roundnessType === 'sharp' ? '0-0.5px' : roundnessType === 'moderate' ? '0-1rem' : roundnessType === 'smooth' ? '0.5-1.5rem' : '1-2.5rem'})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. COMPACT MODE */}
                        <div className="space-y-3">
                            <label className="block font-semibold text-sm text-gray-700 dark:text-gray-300">
                                Compact Mode
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Reduce spacing & padding globally
                            </p>
                            <button
                                onClick={() => updateSetting('compactMode', !settings.compactMode)}
                                className={`w-full px-4 py-3 rounded-lg font-medium transition transform ${settings.compactMode
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 scale-105'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                    }`}
                            >
                                {settings.compactMode ? '✓ Compact ON' : 'Compact OFF'}
                            </button>
                        </div>

                        {/* 4. PADDING CUSTOMIZATION */}
                        <details className="space-y-3 open:bg-gray-100 dark:open:bg-gray-800 p-3 rounded-lg">
                            <summary className="cursor-pointer font-semibold text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <ChevronDown size={16} />
                                Padding Values
                            </summary>
                            <div className="space-y-2 mt-3">
                                {(['Xs', 'Sm', 'Md', 'Lg', 'Xl'] as const).map((size) => (
                                    <div key={size} className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10">{size}</label>
                                        <input
                                            type="text"
                                            value={settings[`padding${size}` as keyof typeof settings] as string}
                                            onChange={(e) => updateSetting(`padding${size}` as keyof typeof settings, e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                                            placeholder="e.g., 1rem"
                                        />
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 5. BORDER RADIUS CUSTOMIZATION */}
                        <details className="space-y-3 open:bg-gray-100 dark:open:bg-gray-800 p-3 rounded-lg">
                            <summary className="cursor-pointer font-semibold text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <ChevronDown size={16} />
                                Border Radius Values
                            </summary>
                            <div className="space-y-2 mt-3">
                                {(['None', 'Sm', 'Md', 'Lg', 'Xl', 'Full'] as const).map((size) => (
                                    <div key={size} className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10">{size}</label>
                                        <input
                                            type="text"
                                            value={settings[`radius${size}` as keyof typeof settings] as string}
                                            onChange={(e) => updateSetting(`radius${size}` as keyof typeof settings, e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                                            placeholder="e.g., 0.5rem"
                                        />
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 6. RESET BUTTON */}
                        <button
                            onClick={resetToDefaults}
                            className="w-full px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
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

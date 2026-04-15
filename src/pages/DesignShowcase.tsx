/**
 * DESIGN SYSTEM SHOWCASE PAGE
 * 
 * Demonstrates all components using the design settings system.
 * Shows how spacing, padding, margins, and radius all respond to settings changes.
 */

import React from 'react';
import { useDesignSettings, ROUNDNESS_PRESETS, SPACING_SCALE_PRESETS } from '../context/DesignSettingsContext';
import { Button } from '../components/Button';
import { getGap, getPadding, getMarginBottom, getMarginTop } from '../utils/designTokens';
import { Container } from '../components/Container';
import Card from '../components/Card';
import { BarChart3, Users, TrendingUp, Zap } from 'lucide-react';

export const DesignShowcase: React.FC = () => {
    const { settings, updateSetting, updateMultiple } = useDesignSettings();

    const getRadius = (size: string): string => {
        const radiusMap: Record<string, string> = {
            'sm': 'rounded-sm',
            'md': 'rounded-md',
            'lg': 'rounded-lg',
            'xl': 'rounded-xl',
            'full': 'rounded-full',
        };
        return radiusMap[size] || 'rounded-md';
    };

    return (
        <Container size="xl" padding="lg" className="space-y-8">
            {/* =====================================================
          HEADER
          ===================================================== */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Design System Showcase
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    All components respond dynamically to design settings. Try adjusting the controls below!
                </p>
            </div>

            {/* =====================================================
          QUICK CONTROLS
          ===================================================== */}
            <div className={`bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 ${getPadding('lg')} ${getRadius('lg')} border border-blue-200 dark:border-blue-800`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Quick Controls
                </h2>

                {/* Spacing Scale */}
                <div className={getMarginBottom('lg')}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Spacing Scale: {(settings.spacingScale * 100).toFixed(0)}%
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={settings.spacingScale}
                        onChange={(e) => updateSetting('spacingScale', parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-300 dark:bg-blue-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className={`flex flex-wrap gap-2 ${getMarginTop('sm')}`}>
                        {Object.entries(SPACING_SCALE_PRESETS).map(([name, value]) => (
                            <button
                                key={name}
                                onClick={() => updateSetting('spacingScale', value)}
                                className={`px-3 py-2 rounded text-sm font-medium transition ${Math.abs(settings.spacingScale - value) < 0.01
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Roundness Presets */}
                <div className={getMarginBottom('lg')}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Border Roundness: <span className="text-blue-600 font-bold">{settings.roundness}</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.keys(ROUNDNESS_PRESETS).map((preset) => (
                            <button
                                key={preset}
                                onClick={() => {
                                    updateSetting('roundness', preset as 'sharp' | 'moderate' | 'smooth' | 'ultra');
                                    updateMultiple(ROUNDNESS_PRESETS[preset as keyof typeof ROUNDNESS_PRESETS]);
                                }}
                                className={`px-4 py-3 rounded font-medium transition text-sm capitalize ${settings.roundness === preset
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compact Mode */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Compact Mode
                    </label>
                    <button
                        onClick={() => updateSetting('compactMode', !settings.compactMode)}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${settings.compactMode
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        {settings.compactMode ? '✓ Compact Mode ON' : 'Compact Mode OFF'}
                    </button>
                </div>
            </div>

            {/* =====================================================
          CARDS SHOWCASE
          ===================================================== */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Card Components
                </h2>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${getGap('lg')}`}>
                    <Card title="Users" value="12,345" change="↑ 2.5% increase" icon={<Users size={24} />} />
                    <Card title="Revenue" value="$54.2K" change="↑ 8.2% increase" icon={<BarChart3 size={24} />} />
                    <Card title="Growth" value="34%" change="Active" icon={<TrendingUp size={24} />} />
                    <Card title="Performance" value="98%" change="Active" icon={<Zap size={24} />} />
                </div>
            </div>

            {/* =====================================================
          BUTTONS SHOWCASE
          ===================================================== */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Button Variants
                </h2>

                {/* Primary Buttons */}
                <div className={getMarginBottom('lg')}>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Primary</h3>
                    <div className={`flex flex-wrap ${getGap('sm')}`}>
                        <Button variant="primary" size="sm">Small</Button>
                        <Button variant="primary" size="md">Medium</Button>
                        <Button variant="primary" size="lg">Large</Button>
                    </div>
                </div>

                {/* Secondary Buttons */}
                <div className={getMarginBottom('lg')}>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Secondary</h3>
                    <div className={`flex flex-wrap ${getGap('sm')}`}>
                        <Button variant="secondary" size="sm">Small</Button>
                        <Button variant="secondary" size="md">Medium</Button>
                        <Button variant="secondary" size="lg">Large</Button>
                    </div>
                </div>

                {/* Success Buttons */}
                <div className={getMarginBottom('lg')}>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Success</h3>
                    <div className={`flex flex-wrap ${getGap('sm')}`}>
                        <Button variant="success" size="sm">Small</Button>
                        <Button variant="success" size="md">Medium</Button>
                        <Button variant="success" size="lg">Large</Button>
                    </div>
                </div>

                {/* Error Buttons */}
                <div className={getMarginBottom('lg')}>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Error</h3>
                    <div className={`flex flex-wrap ${getGap('sm')}`}>
                        <Button variant="error" size="sm">Small</Button>
                        <Button variant="error" size="md">Medium</Button>
                        <Button variant="error" size="lg">Large</Button>
                    </div>
                </div>
            </div>

            {/* =====================================================
          SPACING DEMO
          ===================================================== */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Spacing Scale Demo
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    All spacing below responds to the spacing scale multiplier. Try adjusting it above!
                </p>

                <div className="space-y-4">
                    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                        <div key={size} className="flex items-center gap-4">
                            <label className="w-12 font-semibold text-gray-700 dark:text-gray-300 uppercase">{size}</label>
                            <div
                                className={`bg-blue-500 h-8 rounded transition-all duration-300 flex items-center px-3 text-white font-semibold ${getPadding(size)}`}
                            >
                                {`var(--padding-${size})`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
          BORDER RADIUS DEMO
          ===================================================== */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Border Radius Scale
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    All border radius below responds to the roundness setting. Try changing it above!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
                        <div key={size} className="flex flex-col items-center gap-3">
                            <div
                                className={`w-24 h-24 bg-linear-to-br from-purple-500 to-pink-500 transition-all duration-300 ${getRadius(size)}`}
                            />
                            <label className="font-semibold text-gray-700 dark:text-gray-300 uppercase">{size}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
          CURRENT SETTINGS DISPLAY
          ===================================================== */}
            <div className={`bg-gray-100 dark:bg-gray-800 ${getPadding('lg')} ${getRadius('lg')} overflow-auto`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Current Settings
                </h2>
                <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {JSON.stringify(settings, null, 2)}
                </pre>
            </div>

            {/* =====================================================
          INSTRUCTIONS
          ===================================================== */}
            <div className={`bg-green-50 dark:bg-green-900 ${getPadding('lg')} ${getRadius('lg')} border-l-4 border-green-500`}>
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-3">
                    💡 Tips
                </h3>
                <ul className="text-green-800 dark:text-green-200 space-y-2 text-sm">
                    <li>✓ All values are stored in <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">localStorage</code></li>
                    <li>✓ Try different spacing scales to see the entire UI scale</li>
                    <li>✓ Roundness changes affect all rounded corners globally</li>
                    <li>✓ Compact mode reduces padding and spacing</li>
                    <li>✓ All transitions are smooth (0.3s duration)</li>
                    <li>✓ Check the browser Console for any warnings</li>
                </ul>
            </div>

            {/* =====================================================
          FOOTER SPACING
          ===================================================== */}
            <div className={getMarginBottom('xl')} />
        </Container>
    );
};

export default DesignShowcase;

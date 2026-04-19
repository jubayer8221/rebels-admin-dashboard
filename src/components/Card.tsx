/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
    title: string;
    value: string;
    change: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'info' | 'orange';
}

const Card: React.FC<CardProps> = ({
    title,
    value,
    change,
    icon,
    color = 'primary'
}) => {
    const { isDark } = useTheme();

    const isNeutral = change.toLowerCase().includes("live") ||
        change.toLowerCase().includes("active") ||
        change.toLowerCase().includes("volume");

    // Color mapping
    const colorMap: Record<string, string> = {
        primary: isDark ? '#6366f1' : '#4f46e5',
        success: '#22c55e',
        warning: '#eab308',
        info: '#06b6d4',
        orange: '#f97316',
    };

    const mainColor = colorMap[color] || colorMap.primary;

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`glass glass-interactive relative overflow-hidden rounded-2xl p-5 sm:p-6 group transition-all duration-300 border
                ${isDark
                    ? 'border-white/10 bg-white/5'
                    : 'border-gray-100/80 bg-white/70'
                }`}
        >
            {/* Subtle right-side gradient overlay */}
            <div
                className="absolute top-0 right-0 w-1/3 h-full opacity-40 transition-all duration-300 group-hover:opacity-60"
                style={{
                    background: `linear-gradient(to left, ${mainColor}15, transparent)`
                }}
            />

            {/* Background glow on hover */}
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-linear-to-br from-(--color-primary)/10 to-transparent rounded-full blur-3xl group-hover:from-(--color-secondary)/20 transition-all duration-300" />

            <div className="relative z-10">
                {/* Icon + Title + Value */}
                <div className="flex items-start justify-between gap-4">
                    {icon && (
                        <div
                            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                            style={{
                                backgroundColor: `${mainColor}20`,
                                color: mainColor,
                                boxShadow: `0 4px 12px -4px ${mainColor}40`
                            }}
                        >
                            {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' } as any)}
                        </div>
                    )}

                    <div className="flex-1 min-w-0 pt-0.5">
                        <p className={`uppercase tracking-[0.08em] text-[10px] sm:text-xs font-bold mb-1
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            {title}
                        </p>

                        {/* Responsive Value - adjusts with device size */}
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter leading-none
                            ${isDark ? 'text-white' : 'text-gray-900'}"
                        >
                            {value}
                        </p>
                    </div>
                </div>

                {/* Change Indicator */}
                <div className="mt-5 sm:mt-6 flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 text-sm
                        ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}
                        group-hover:border-opacity-30`}
                        style={{
                            borderColor: isNeutral ? 'transparent' : `${mainColor}30`
                        }}
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                            style={{ backgroundColor: isNeutral ? mainColor : '#22c55e' }}
                        />
                        <span className={`font-semibold tracking-tight
                            ${isNeutral
                                ? (isDark ? 'text-gray-300' : 'text-gray-600')
                                : 'text-emerald-500'
                            }`}
                        >
                            {change}
                        </span>
                    </div>

                    <span className={`hidden sm:inline text-xs font-medium opacity-0 group-hover:opacity-70 transition-opacity duration-200
                        ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                    >
                        Updated just now
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;
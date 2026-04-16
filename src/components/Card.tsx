import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    title: string;
    value: string;
    change: string;
    icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, change, icon }) => {
    const isNeutral = change.toLowerCase().includes("live") || change.toLowerCase().includes("active");

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden bg-[var(--color-bg-primary)] p-[var(--spacing-6)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-sm group hover:shadow-[var(--shadow-lg)] hover:shadow-[var(--color-primary)]/10 transition-all duration-fast"
        >
            {/* Animated Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--color-primary)]/10 transition-colors duration-fast" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-[var(--font-size-xs)] font-bold uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)] group-hover:text-[var(--color-primary)] transition-colors duration-fast">
                        {title}
                    </p>
                    <motion.h3
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-[var(--font-size-2xl)] font-bold text-[var(--color-text-primary)] tracking-tight"
                    >
                        {value}
                    </motion.h3>
                </div>
                <div className="p-[var(--spacing-3)] bg-[var(--color-bg-secondary)] rounded-[var(--radius-xl)] text-[var(--color-text-secondary)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:rotate-12 transition-all duration-fast">
                    {icon}
                </div>
            </div>

            <div className="relative z-10 mt-[var(--spacing-6)] flex items-center gap-[var(--spacing-1.5)]">
                <div className="flex items-center gap-[var(--spacing-1.5)] px-[var(--spacing-2)] py-[var(--spacing-1)] rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] group-hover:bg-[var(--color-bg-primary)] transition-colors border border-transparent group-hover:border-[var(--color-border)]">
                    <span className={`w-[var(--spacing-1.5)] h-[var(--spacing-1.5)] rounded-full animate-pulse ${isNeutral ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-success)]'}`} />
                    <span className={`text-[var(--font-size-xs)] font-bold ${isNeutral ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-success)]'}`}>
                        {change}
                    </span>
                </div>
                <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                    Updated just now
                </p>
            </div>
        </motion.div>
    );
};

export default Card;
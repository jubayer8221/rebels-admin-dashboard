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
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
        >
            {/* Animated Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors duration-500" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-1 group-hover:text-blue-500 transition-colors">
                        {title}
                    </p>
                    <motion.h3
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold text-gray-800 tracking-tight"
                    >
                        {value}
                    </motion.h3>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300">
                    {icon}
                </div>
            </div>

            <div className="relative z-10 mt-6 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isNeutral ? 'bg-blue-400' : 'bg-green-500'}`} />
                    <span className={`text-[10px] font-bold ${isNeutral ? 'text-gray-500' : 'text-green-600'}`}>
                        {change}
                    </span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Updated just now
                </p>
            </div>
        </motion.div>
    );
};

export default Card;
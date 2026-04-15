import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getPadding } from '../utils/designTokens';

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Sidebar: Fixed position usually handled inside its own component */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Navbar: Sticky or Static at the top */}
                <Navbar />

                {/* Main Content Area */}
                <main className={getPadding('md')}>
                    <div className="max-w-full mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
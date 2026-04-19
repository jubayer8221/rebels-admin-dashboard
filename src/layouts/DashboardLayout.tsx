import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getPadding } from '../utils/designTokens';

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col lg:flex-row bg-(--color-bg-secondary)">
            <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onSidebarToggle={() => setSidebarOpen(o => !o)} mobileOpen={sidebarOpen} />

                <main className={`flex-1 overflow-y-auto ${getPadding('md')}`}>
                    <div className="max-w-full mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
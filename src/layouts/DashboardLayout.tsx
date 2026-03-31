import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar remains fixed on the left */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Navbar sits at the top of the content area */}
                <Navbar />

                {/* Main Content Area */}
                <main className="p-8">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
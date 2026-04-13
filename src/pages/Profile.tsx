/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    User,
    Mail,
    ShieldCheck,
    Settings,
    Bell,
    LogOut,
    Camera,
    CheckCircle2,
    Clock
} from 'lucide-react';

export const Profile = () => {
    // This would typically come from your Auth context or Redux store
    const user = {
        name: "Jubayer Al Mahmud",
        role: "Junior Software Engineer",
        email: "jubayer.dev@example.com",
        joined: "March 2026",
        status: "Active",
        company: "Turtle Solutions Limited"
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="min-w-full mx-auto space-y-6">

                {/* Profile Header Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-blue-50 dark:ring-blue-900/30">
                                <img
                                    src="/image/jubayer.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {user.status}
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{user.role}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{user.company}</p>
                        </div>

                        <div className="flex gap-3">
                            <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Personal Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 dark:text-white">Account Information</h3>
                                <button className="text-sm text-blue-600 font-semibold hover:underline">Edit</button>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoItem icon={<User />} label="Full Name" value={user.name} />
                                <InfoItem icon={<Mail />} label="Email Address" value={user.email} />
                                <InfoItem icon={<ShieldCheck />} label="Role" value={user.role} />
                                <InfoItem icon={<Clock />} label="Member Since" value={user.joined} />
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                            <div className="space-y-6">
                                <ActivityItem
                                    title="Updated MFI Logic"
                                    time="2 hours ago"
                                    desc="Pushed changes to loan collection algorithm."
                                    icon={<CheckCircle2 className="text-blue-500" />}
                                />
                                <ActivityItem
                                    title="Eco Bazar Deployment"
                                    time="Yesterday"
                                    desc="Successfully deployed v2.0 to Vercel."
                                    icon={<CheckCircle2 className="text-green-500" />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Stats */}
                    <div className="space-y-6">
                        <div className="bg-linear-to-br from-blue-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
                            <h4 className="font-semibold mb-2 opacity-90">Current Project</h4>
                            <p className="text-xl font-bold mb-4 italic">Rebels Admin Dashboard</p>
                            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                <div className="bg-white h-2 rounded-full w-3/4"></div>
                            </div>
                            <p className="text-xs opacity-80 text-right">75% Complete</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-2">
                            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-all text-gray-700 dark:text-gray-300">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Security Settings</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all text-red-600">
                                <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Reusable Components
const InfoItem = ({ icon, label, value }: { icon: React.ReactElement; label: string; value: string }) => (
    <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl">
            {React.cloneElement(icon, { className: "w-5 h-5" } as any)}
        </div>
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{label}</p>
            <p className="text-gray-900 dark:text-white font-medium">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, desc, icon }: { title: string; time: string; desc: string; icon: React.ReactElement }) => (
    <div className="flex gap-4">
        <div className="mt-1">{icon}</div>
        <div>
            <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
                <span className="text-[10px] text-gray-400">{time}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
        </div>
    </div>
);
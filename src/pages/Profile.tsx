/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { getPaddingY, getGap } from '../utils/designTokens';

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

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const handleEditProfile = () => navigate('/settings');
    const handleSecuritySettings = () => navigate('/settings#security');
    const handleNotifications = () => navigate('/settings#notifications');
    const handleSignOut = () => {
        dispatch(logout());
        setStatusMessage('You have been signed out securely. Redirecting to login...');
        setTimeout(() => navigate('/login', { replace: true }), 700);
    };

    return (
        <div className="min-h-screen bg-(--color-bg-secondary) text-(--color-text-primary)">
            <div className={`min-w-full mx-auto ${getGap('lg')} ${getPaddingY('lg')}`}>
                {statusMessage && (
                    <div className="mb-(--spacing-6) rounded-xl border border-(--color-border) bg-(--color-bg-primary)var(--spacing-4)] py-(--spacing-3)-text-(--color-text-secondary)ow-[var(--shadow-xs)]">
                        {statusMessage}
                    </div>
                )}

                {/* Profile Header Card */}
                <div className="bg-(--color-bg-primary)ded-[var(--radius-2xl)] p-(--spacing-6)oshadow-(--shadow-sm)er border-(--color-border)">
                    <div className="flex flex-col md:flex-row items-center gap-(--spacing-6)">
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden ring-4 ring-(--color-primary)/10">
                                <img
                                    src="/image/jubayer.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-(--spacing-3) bg-(--color-primary) text-white rounded-lg shadow-lg hover:bg-[var(--color-primary-hover)] transition-all opacity-0 group-hover:opacity-100">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-(--spacing-1)">
                                <h1 className="text-(--font-size-2xl) font-bold text-[var(--color-text-primary)]">{user.name}</h1>
                                <span className="inline-flex items-center px-[var(--spacing-3)] py-[var(--spacing-1)] rounded-full text-xs font-medium bg-[var(--color-success)]/10 text-[var(--color-success)]">
                                    {user.status}
                                </span>
                            </div>
                            <p className="text-[var(--color-text-secondary)] font-medium">{user.role}</p>
                            <p className="text-sm text-[var(--color-text-tertiary)] mt-[var(--spacing-1)]">{user.company}</p>
                        </div>

                        <div className="flex gap-[var(--spacing-3)]">
                            <button type="button" onClick={handleEditProfile} className="p-[var(--spacing-3)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-xl)] transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button type="button" onClick={handleNotifications} className="p-[var(--spacing-3)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-xl)] transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-(--spacing-6) mt-6">

                    {/* Left Column: Personal Info */}
                    <div className="lg:col-span-2 space-y-(--spacing-6)">
                        <div className="bg-[var(--color-bg-primary)] rounded-2xl shadow-[var(--shadow-sm)] border border-[var(--color-border)] overflow-hidden">
                            <div className={`px-[var(--spacing-6)] py-[var(--spacing-4)] border-b border-[var(--color-border)] flex justify-between items-center`}>
                                <h3 className="font-bold text-[var(--color-text-primary)]">Account Information</h3>
                                <button type="button" onClick={handleEditProfile} className="text-sm text-[var(--color-primary)] font-semibold hover:underline">Edit</button>
                            </div>

                            <div className="p-[var(--spacing-6)] grid grid-cols-1 md:grid-cols-2 gap-(--spacing-6)">
                                <InfoItem icon={<User />} label="Full Name" value={user.name} />
                                <InfoItem icon={<Mail />} label="Email Address" value={user.email} />
                                <InfoItem icon={<ShieldCheck />} label="Role" value={user.role} />
                                <InfoItem icon={<Clock />} label="Member Since" value={user.joined} />
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-[var(--spacing-6)]">
                            <h3 className="font-bold text-[var(--color-text-primary)] mb-[var(--spacing-6)]">Recent Activity</h3>
                            <div className="space-y-[var(--spacing-6)]">
                                <ActivityItem
                                    title="Updated MFI Logic"
                                    time="2 hours ago"
                                    desc="Pushed changes to loan collection algorithm."
                                    icon={<CheckCircle2 className="text-[var(--color-primary)]" />}
                                />
                                <ActivityItem
                                    title="Eco Bazar Deployment"
                                    time="Yesterday"
                                    desc="Successfully deployed v2.0 to Vercel."
                                    icon={<CheckCircle2 className="text-[var(--color-success)]" />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Stats */}
                    <div className="space-y-[var(--spacing-6)]">
                        <div className="bg-linear-to-br from-[var(--color-primary)] to-(--color-secondary) rounded-2xl p-(--spacing-6) text-white shadow-(--shadow-xl) shadow-(--color-primary)/20">
                            <h4 className="font-semibold mb-(--spacing-2) opacity-90">Current Project</h4>
                            <p className="text-(--font-size-xl) font-bold mb-(--spacing-4) italic">Rebels Admin Dashboard</p>
                            <div className="w-full bg-(--color-bg-tertiary) rounded-full h-2 mb-(--spacing-4)">
                                <div className="bg-(--color-bg-primary) h-2 rounded-full w-3/4"></div>
                            </div>
                            <p className="text-(--font-size-xs) opacity-80 text-right">75% Complete</p>
                        </div>

                        <div className="bg-(--color-bg-primary) rounded-2xlhadow-sm)] border border-(--color-border) p-(--spacing-2)">
                            <button type="button" onClick={handleSecuritySettings} className="w-full flex items-center gap-(--spacing-3) p-(--spacing-4)r:bg-[var(--color-bg-secondary)] rounded-xltext-[var(--color-text-primary)]">
                                <div className="p-(--spacing-3) bg-(--color-bg-secondary) text-(--color-primary) rounded-lg">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Security Settings</span>
                            </button>
                            <button type="button" onClick={handleSignOut} className="w-full flex items-center gap-(--spacing-3) p-(--spacing-4) hover:bg-(--color-error)/10 rounded-xl transition-all text-(--color-error)">
                                <div className="p-(--spacing-3) bg-(--color-error)/10 text-(--color-error) rounded-lg">
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
    <div className="flex items-start gap-(--spacing-4)">
        <div className="p-(--spacing-3)var(--color-bg-secondary)] text-(--color-text-secondary) rounded-xl">
            {React.cloneElement(icon, { className: "w-5 h-5" } as any)}
        </div>
        <div>
            <p className="text-(--font-size-xs) uppercase tracking-wider font-bold mb-(--spacing-1)">{label}</p>
            <p className="text-(--color-text-primary) font-medium">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, desc, icon }: { title: string; time: string; desc: string; icon: React.ReactElement }) => (
    <div className="flex gap-(--spacing-4)">
        <div className="mt-[var(--spacing-1)]">{icon}</div>
        <div>
            <div className="flex items-center gap-[var(--spacing-2)]">
                <h4 className="font-bold text-[var(--color-text-primary)] text-[var(--font-size-sm)]">{title}</h4>
                <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">{time}</span>
            </div>
            <p className="text-[var(--font-size-base)] text-[var(--color-text-secondary)] mt-[var(--spacing-1)]">{desc}</p>
        </div>
    </div>
);
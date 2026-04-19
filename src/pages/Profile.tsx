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
import { getGap } from '../utils/designTokens';

export const Profile = () => {
    const user = {
        name: 'Jubayer Al Mahmud',
        role: 'Junior Software Engineer',
        email: 'jubayer.dev@example.com',
        joined: 'March 2026',
        status: 'Active',
        company: 'Turtle Solutions Limited',
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
            <div className={`mx-auto max-w-screen ${getGap('lg')}`}>
                {statusMessage && (
                    <div className="mb-4 sm:mb-6 rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-4 text-(--color-text-secondary) shadow-sm text-sm">
                        {statusMessage}
                    </div>
                )}

                <section className="group rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-5 sm:p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">

                        {/* Profile Image Section */}
                        <div className="relative shrink-0">
                            <div className="h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-3xl ring-4 ring-(--color-primary)/10 transition-transform group-hover:scale-[1.02]">
                                <img
                                    src="/image/jubayer.png"
                                    alt={`${user.name}'s profile`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <button
                                aria-label="Change profile photo"
                                className="absolute -bottom-2 -right-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-(--color-primary) text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                            >
                                <Camera className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Info Content Section */}
                        <div className="flex-1 text-center lg:pl-8 lg:text-left">
                            <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-(--color-text-primary) sm:text-3xl">
                                        {user.name}
                                    </h1>
                                    <div className="mt-1 flex flex-wrap justify-center gap-2 lg:justify-start">
                                        <span className="text-sm font-medium text-(--color-text-secondary)">
                                            {user.role}
                                        </span>
                                        <span className="hidden text-(--color-text-tertiary) lg:inline">•</span>
                                        <span className="text-sm text-(--color-text-tertiary)">
                                            {user.company}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Pill */}
                                <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 backdrop-blur-sm">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        {/* Actions Section */}
                        <div className="flex items-center justify-center gap-3 border-t border-(--color-border) pt-6 lg:border-none lg:pt-0">
                            <button
                                type="button"
                                onClick={handleEditProfile}
                                aria-label="Settings"
                                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-bg-secondary) text-(--color-text-secondary) transition-all hover:bg-(--color-primary) hover:text-white"
                            >
                                <Settings className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNotifications}
                                aria-label="Notifications"
                                className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-bg-secondary) text-(--color-text-secondary) transition-all hover:bg-(--color-primary) hover:text-white"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 ring-2 ring-(--color-bg-primary)" />
                            </button>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        <section className="rounded-2xl sm:rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-4 sm:p-6 lg:p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold text-(--color-text-primary)">Account Information</h2>
                                    <p className="mt-1 text-xs sm:text-sm text-(--color-text-secondary)">Review and update your personal details.</p>
                                </div>
                                <button type="button" onClick={handleEditProfile} className="text-xs sm:text-sm font-semibold text-(--color-primary) hover:underline w-fit">Edit</button>
                            </div>
                            <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 md:grid-cols-2">
                                <InfoItem icon={<User />} label="Full Name" value={user.name} />
                                <InfoItem icon={<Mail />} label="Email Address" value={user.email} />
                                <InfoItem icon={<ShieldCheck />} label="Role" value={user.role} />
                                <InfoItem icon={<Clock />} label="Member Since" value={user.joined} />
                            </div>
                        </section>

                        <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-(--color-text-primary)">Recent Activity</h2>
                            <div className="mt-6 space-y-4">
                                <ActivityItem
                                    title="Updated MFI Logic"
                                    time="2 hours ago"
                                    desc="Pushed changes to loan collection algorithm."
                                    icon={<CheckCircle2 className="h-5 w-5 text-(--color-primary)" />}
                                />
                                <ActivityItem
                                    title="Eco Bazar Deployment"
                                    time="Yesterday"
                                    desc="Successfully deployed v2.0 to Vercel."
                                    icon={<CheckCircle2 className="h-5 w-5 text-(--color-success)" />}
                                />
                            </div>
                        </section>
                    </div>

                    <section className="space-y-6">
                        <div className="rounded-3xl bg-linear-to-br from-(--color-primary) to-(--color-secondary) p-6 text-white shadow-xl shadow-(--color-primary)/20">
                            <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-white/80">Current Project</h3>
                            <p className="mt-4 text-2xl font-bold italic">Rebels Admin Dashboard</p>
                            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
                                <div className="h-2 w-3/4 rounded-full bg-white" />
                            </div>
                            <p className="mt-3 text-right text-sm text-white/80">75% Complete</p>
                        </div>

                        <div className="rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-4 shadow-sm">
                            <button type="button" onClick={handleSecuritySettings} className="flex w-full items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) px-4 py-4 text-left transition hover:border-(--color-primary)">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-primary) text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-(--color-text-primary)">Security Settings</p>
                                    <p className="mt-1 text-sm text-(--color-text-secondary)">Manage your secure access settings.</p>
                                </div>
                            </button>
                            <button type="button" onClick={handleSignOut} className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-4 text-left text-(--color-error) transition hover:bg-(--color-error)/10">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-error)/10 text-(--color-error)">
                                    <LogOut className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Sign Out</p>
                                    <p className="mt-1 text-sm text-(--color-text-secondary)">Securely log out of your account.</p>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactElement; label: string; value: string }) => (
    <div className="flex items-start gap-4 rounded-3xl bg-(--color-bg-secondary) p-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-bg-primary) text-(--color-text-secondary)">
            {React.cloneElement(icon, { className: 'h-5 w-5' } as any)}
        </div>
        <div>
            <p className="text-xs uppercase tracking-[0.24em] text-(--color-text-secondary)">{label}</p>
            <p className="mt-2 font-medium text-(--color-text-primary)">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, desc, icon }: { title: string; time: string; desc: string; icon: React.ReactElement }) => (
    <div className="rounded-3xl border border-(--color-border) bg-(--color-bg-secondary) p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="mt-1">{icon}</div>
            <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-bold text-(--color-text-primary)">{title}</h4>
                    <span className="text-xs text-(--color-text-secondary)">{time}</span>
                </div>
                <p className="mt-3 text-sm text-(--color-text-secondary)">{desc}</p>
            </div>
        </div>
    </div>
);

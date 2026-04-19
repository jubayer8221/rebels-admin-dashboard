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
                    <div className="mb-6 rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-4 text-(--color-text-secondary) shadow-sm">
                        {statusMessage}
                    </div>
                )}

                <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                        <div className="relative mx-auto lg:mx-0">
                            <div className="h-28 w-28 overflow-hidden rounded-3xl ring-4 ring-(--color-primary)/10 sm:h-32 sm:w-32">
                                <img src="/image/jubayer.png" alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-(--color-primary) text-white shadow-lg transition hover:bg-(--color-primary-dark)">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-(--color-text-primary)">{user.name}</h1>
                                    <p className="mt-2 text-sm font-medium text-(--color-text-secondary)">{user.role}</p>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                    {user.status}
                                </span>
                            </div>
                            <p className="mt-4 text-sm text-(--color-text-tertiary)">{user.company}</p>
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:justify-end">
                            <button type="button" onClick={handleEditProfile} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-bg-secondary) text-(--color-text-secondary) transition hover:bg-(--color-bg-tertiary)">
                                <Settings className="h-5 w-5" />
                            </button>
                            <button type="button" onClick={handleNotifications} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-bg-secondary) text-(--color-text-secondary) transition hover:bg-(--color-bg-tertiary)">
                                <Bell className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-primary) p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-(--color-text-primary)">Account Information</h2>
                                    <p className="mt-1 text-sm text-(--color-text-secondary)">Review and update your personal details.</p>
                                </div>
                                <button type="button" onClick={handleEditProfile} className="text-sm font-semibold text-(--color-primary) hover:underline">Edit</button>
                            </div>
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import {
    Search, MoreVertical, Mail, Phone,
    ShoppingBag, TrendingUp, Users, UserCheck,
    ArrowUpRight, ArrowDownRight,
    Star, MapPin, Calendar, X, Eye, Ban, RefreshCw
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Customer {
    id: number; name: string; email: string; phone: string;
    location: string; avatar: string; totalOrders: number;
    totalSpent: number; lastOrder: string; joinDate: string;
    status: 'Active' | 'Inactive' | 'Blocked';
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    rating: number;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_CUSTOMERS: Customer[] = [
    { id: 1, name: 'Ayesha Rahman', email: 'ayesha.r@gmail.com', phone: '+880 1712 345678', location: 'Dhaka', avatar: 'AR', totalOrders: 24, totalSpent: 48200, lastOrder: '2025-03-28', joinDate: '2023-06-12', status: 'Active', tier: 'Gold', rating: 4.8 },
    { id: 2, name: 'Tanvir Hossain', email: 'tanvir.h@yahoo.com', phone: '+880 1834 567890', location: 'Chittagong', avatar: 'TH', totalOrders: 8, totalSpent: 12500, lastOrder: '2025-03-15', joinDate: '2024-01-05', status: 'Active', tier: 'Silver', rating: 4.2 },
    { id: 3, name: 'Nusrat Jahan', email: 'nusrat.j@gmail.com', phone: '+880 1955 789012', location: 'Sylhet', avatar: 'NJ', totalOrders: 52, totalSpent: 115400, lastOrder: '2025-04-01', joinDate: '2022-11-20', status: 'Active', tier: 'Platinum', rating: 5.0 },
    { id: 4, name: 'Rafiul Islam', email: 'rafiul.i@outlook.com', phone: '+880 1611 234567', location: 'Rajshahi', avatar: 'RI', totalOrders: 3, totalSpent: 4800, lastOrder: '2025-01-10', joinDate: '2024-08-30', status: 'Inactive', tier: 'Bronze', rating: 3.5 },
    { id: 5, name: 'Sadia Sultana', email: 'sadia.s@gmail.com', phone: '+880 1732 890123', location: 'Dhaka', avatar: 'SS', totalOrders: 17, totalSpent: 29700, lastOrder: '2025-03-22', joinDate: '2023-03-14', status: 'Active', tier: 'Silver', rating: 4.5 },
    { id: 6, name: 'Minhaj Uddin', email: 'minhaj.u@gmail.com', phone: '+880 1897 456789', location: 'Khulna', avatar: 'MU', totalOrders: 1, totalSpent: 1200, lastOrder: '2024-12-05', joinDate: '2024-11-22', status: 'Blocked', tier: 'Bronze', rating: 2.0 },
    { id: 7, name: 'Fariha Chowdhury', email: 'fariha.c@gmail.com', phone: '+880 1556 012345', location: 'Dhaka', avatar: 'FC', totalOrders: 38, totalSpent: 88600, lastOrder: '2025-03-30', joinDate: '2022-05-08', status: 'Active', tier: 'Platinum', rating: 4.9 },
    { id: 8, name: 'Arif Billah', email: 'arif.b@yahoo.com', phone: '+880 1678 678901', location: 'Mymensingh', avatar: 'AB', totalOrders: 6, totalSpent: 9300, lastOrder: '2025-02-18', joinDate: '2023-09-01', status: 'Inactive', tier: 'Bronze', rating: 3.8 },
    { id: 9, name: 'Tahmina Akter', email: 'tahmina.a@gmail.com', phone: '+880 1790 234567', location: 'Dhaka', avatar: 'TA', totalOrders: 29, totalSpent: 61000, lastOrder: '2025-04-02', joinDate: '2022-12-25', status: 'Active', tier: 'Gold', rating: 4.7 },
    { id: 10, name: 'Zahirul Haque', email: 'zahir.h@gmail.com', phone: '+880 1512 901234', location: 'Barisal', avatar: 'ZH', totalOrders: 11, totalSpent: 18900, lastOrder: '2025-03-05', joinDate: '2023-07-19', status: 'Active', tier: 'Silver', rating: 4.1 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tierConfig = {
    Bronze: { bg: 'bg-orange-50/50', text: 'text-orange-700', border: 'border-orange-200/50', dot: 'bg-orange-400' },
    Silver: { bg: 'bg-slate-50/50', text: 'text-slate-600', border: 'border-slate-200/50', dot: 'bg-slate-400' },
    Gold: { bg: 'bg-amber-50/50', text: 'text-amber-700', border: 'border-amber-200/50', dot: 'bg-amber-400' },
    Platinum: { bg: 'bg-indigo-50/50', text: 'text-indigo-700', border: 'border-indigo-200/50', dot: 'bg-indigo-400' },
};
const statusConfig = {
    Active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Inactive: { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' },
    Blocked: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
};
const avatarColors: Record<string, string> = {
    A: 'bg-violet-100 text-violet-700', T: 'bg-blue-100 text-blue-700',
    N: 'bg-pink-100 text-pink-700', R: 'bg-emerald-100 text-emerald-700',
    S: 'bg-amber-100 text-amber-700', M: 'bg-indigo-100 text-indigo-700',
    F: 'bg-rose-100 text-rose-700', Z: 'bg-teal-100 text-teal-700',
};
const getAvatarColor = (initials: string) => avatarColors[initials[0]] ?? 'bg-gray-100 text-gray-600';
const fmt = (n: number) => `৳${n.toLocaleString()}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, icon: Icon, up }: any) => {
    const { isDark } = useTheme();
    return (
        <div className={`group rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
            ${isDark ? 'bg-[#151515] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start">
                <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
                    <h3 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        <span className={`p-0.5 rounded-full ${up ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                            {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        </span>
                        {sub}
                    </div>
                </div>
                <div className="p-3 rounded-xl bg-[--accent] text-white shadow-inner opacity-90 group-hover:opacity-100 transition-opacity">
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
};

// ─── Customer Modal ───────────────────────────────────────────────────────────

const CustomerModal = ({ customer, onClose }: { customer: Customer; onClose: () => void }) => {
    const { isDark } = useTheme();
    const tier = tierConfig[customer.tier];
    const status = statusConfig[customer.status];

    const surface = isDark ? 'bg-[#1a1a1a]' : 'bg-white';
    const borderColor = isDark ? 'border-white/10' : 'border-gray-100';
    const bodyText = isDark ? 'text-gray-100' : 'text-gray-900';
    const subText = isDark ? 'text-gray-500' : 'text-gray-400';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <div className={`relative w-full max-w-2xl ${surface} border ${borderColor} rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200`}>
                <div className={`p-6 border-b ${borderColor} flex items-center justify-between`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Member Dossier</p>
                    <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <X size={14} className={bodyText} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-xl ${getAvatarColor(customer.avatar)}`}>
                            {customer.avatar}
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold ${bodyText}`}>{customer.name}</h2>
                            <div className="flex items-center justify-center gap-1.5 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className={i < Math.floor(customer.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                                ))}
                                <span className={`text-xs ml-1 font-bold ${subText}`}>{customer.rating}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${tier.bg} ${tier.text} ${tier.border}`}>
                                {customer.tier}
                            </span>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${status.bg} ${status.text}`}>
                                {customer.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { icon: Mail, label: 'Email Address', val: customer.email },
                            { icon: Phone, label: 'Phone Number', val: customer.phone },
                            { icon: MapPin, label: 'Primary Location', val: customer.location },
                            { icon: Calendar, label: 'Membership Date', val: fmtDate(customer.joinDate) },
                        ].map(({ icon: Icon, label, val }) => (
                            <div key={label} className={`p-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter mb-1">{label}</p>
                                <div className="flex items-center gap-2">
                                    <Icon size={14} className="text-[--accent]" />
                                    <span className={`text-sm font-semibold truncate ${bodyText}`}>{val}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl p-6 text-white text-center bg-[--accent]">
                            <p className="text-3xl font-bold">{customer.totalOrders}</p>
                            <p className="text-[10px] font-bold opacity-70 mt-1 uppercase">Total Activities</p>
                        </div>
                        <div className={`rounded-2xl p-6 text-center border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                            <p className={`text-2xl font-bold ${bodyText}`}>{fmt(customer.totalSpent)}</p>
                            <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Net Investment</p>
                        </div>
                    </div>
                </div>

                <div className={`p-6 border-t ${borderColor} flex gap-3`}>
                    <button className={`flex-1 py-3 rounded-xl border text-sm font-bold transition flex items-center justify-center gap-2 ${borderColor} ${bodyText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                        <Mail size={14} /> Send Message
                    </button>
                    <button className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition flex items-center justify-center gap-2 bg-[--accent] hover:opacity-90">
                        <ShoppingBag size={14} /> View History
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Row Action Menu ───────────────────────────────────────────────────────────

const ActionMenu = ({ onView, onBlock, onReset }: any) => {
    const { isDark } = useTheme();
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setOpen(o => !o)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className={`absolute right-0 top-10 z-20 border rounded-xl shadow-xl py-2 w-44 text-sm animate-in fade-in slide-in-from-top-2 duration-200 ${isDark ? 'bg-[#1a1a1a] border-white/10 shadow-black' : 'bg-white border-gray-100'}`}>
                        <button onClick={() => { onView(); setOpen(false); }}
                            className={`w-full px-4 py-2.5 text-left flex items-center gap-3 font-semibold ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <Eye size={14} className="text-blue-500" /> Member Profile
                        </button>
                        <button onClick={() => { onReset(); setOpen(false); }}
                            className={`w-full px-4 py-2.5 text-left flex items-center gap-3 font-semibold ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <RefreshCw size={14} className="text-emerald-500" /> Restore Status
                        </button>
                        <div className={`my-1 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`} />
                        <button onClick={() => { onBlock(); setOpen(false); }}
                            className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 text-red-500 font-semibold">
                            <Ban size={14} /> Blacklist
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Customers: React.FC = () => {
    const { isDark } = useTheme();
    const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tierFilter, setTierFilter] = useState('All');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [sortKey, setSortKey] = useState<'totalSpent' | 'totalOrders' | 'lastOrder'>('totalSpent');

    const filtered = useMemo(() => {
        return customers
            .filter(c => {
                const q = search.toLowerCase();
                return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
            })
            .filter(c => statusFilter === 'All' || c.status === statusFilter)
            .filter(c => tierFilter === 'All' || c.tier === tierFilter)
            .sort((a: any, b: any) => sortKey === 'lastOrder' ? b.lastOrder.localeCompare(a.lastOrder) : b[sortKey] - a[sortKey]);
    }, [customers, search, statusFilter, tierFilter, sortKey]);

    const stats = useMemo(() => ({
        total: customers.length,
        active: customers.filter(c => c.status === 'Active').length,
        revenue: customers.reduce((s, c) => s + c.totalSpent, 0),
        avgOrder: Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.reduce((s, c) => s + c.totalOrders, 0)),
    }), [customers]);

    const handleBlock = (id: number) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Blocked' } : c));
    const handleReset = (id: number) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Active' } : c));

    const surfaceCls = isDark ? 'bg-[#151515] border-white/5' : 'bg-white border-gray-100 shadow-sm';
    const textMain = isDark ? 'text-gray-100' : 'text-gray-900';
    const textSub = isDark ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className={`space-y-8`}>

            {/* Stats */}
            <header className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Members" value={stats.total.toString()} sub="+12% this month" icon={Users} up={true} />
                <StatCard label="Active Clients" value={stats.active.toString()} sub="+5% this month" icon={UserCheck} up={true} />
                <StatCard label="Net Portfolio" value={fmt(stats.revenue)} sub="+18% this month" icon={TrendingUp} up={true} />
                <StatCard label="Avg. Investment" value={fmt(stats.avgOrder)} sub="-2% this month" icon={ShoppingBag} up={false} />
            </header>

            {/* Controls */}
            <div className={`flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 p-3 sm:p-4 rounded-2xl border ${surfaceCls}`}>
                <div className="flex-1 min-w-full sm:min-w-56 relative group">
                    <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${textSub} group-focus-within:text-[--accent]`} />
                    <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
                        className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm
                            ${isDark ? 'bg-[#0d0d0d] border-white/10 focus:border-[--accent]/50 text-white' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-[--accent]/5 text-gray-800'}`} />
                </div>
                <div className="flex flex-wrap gap-2">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none cursor-pointer ${isDark ? 'bg-[#0d0d0d] border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none cursor-pointer ${isDark ? 'bg-[#0d0d0d] border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                        <option value="All">All Tiers</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                    <select value={sortKey} onChange={e => setSortKey(e.target.value as any)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none cursor-pointer ${isDark ? 'bg-[#0d0d0d] border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                        <option value="totalSpent">Sort: Value</option>
                        <option value="totalOrders">Sort: Activity</option>
                        <option value="lastOrder">Sort: Recency</option>
                    </select>
                </div>
            </div>

            {/* Table - Desktop View */}
            <div className={`hidden md:block rounded-2xl border overflow-hidden ${surfaceCls}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`border-b ${isDark ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50/50'}`}>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Member</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Contact</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Location</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Tier</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Investment</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-50'}`}>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Users size={40} className="text-gray-300 opacity-50" />
                                            <p className={`text-sm font-semibold ${textSub}`}>No members found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.map(c => (
                                <tr key={c.id} className={`group transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-blue-50/30'}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-sm ${getAvatarColor(c.avatar)}`}>
                                                {c.avatar}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${textMain}`}>{c.name}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} className={i < Math.floor(c.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={`text-xs font-semibold ${textMain}`}>{c.email}</p>
                                        <p className={`text-[10px] mt-0.5 ${textSub}`}>{c.phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={12} className="text-[--accent]" />
                                            <span className={`text-xs font-semibold ${textMain}`}>{c.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${statusConfig[c.status].bg} ${statusConfig[c.status].text}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[c.status].dot}`} />
                                            {c.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg border text-[10px] font-bold ${tierConfig[c.tier].bg} ${tierConfig[c.tier].text} ${tierConfig[c.tier].border}`}>
                                            {c.tier.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right tabular-nums">
                                        <span className={`text-sm font-bold ${textMain}`}>{fmt(c.totalSpent)}</span>
                                        <p className={`text-[10px] ${textSub}`}>{c.totalOrders} activities</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <ActionMenu
                                            onView={() => setSelectedCustomer(c)}
                                            onBlock={() => handleBlock(c.id)}
                                            onReset={() => handleReset(c.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className={`px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <p className={`text-xs font-semibold ${textSub}`}>
                        Showing <span className={textMain}>{filtered.length}</span> members
                    </p>
                    <div className="flex gap-2">
                        {['Gold', 'Platinum'].map(t => {
                            const count = filtered.filter(c => c.tier === t).length;
                            if (!count) return null;
                            return (
                                <span key={t} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${tierConfig[t as keyof typeof tierConfig].bg} ${tierConfig[t as keyof typeof tierConfig].text} ${tierConfig[t as keyof typeof tierConfig].border}`}>
                                    {count} {t}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className={`md:hidden space-y-3`}>
                {filtered.length === 0 ? (
                    <div className={`rounded-2xl border p-8 text-center ${surfaceCls}`}>
                        <Users size={40} className="text-gray-300 opacity-50 mx-auto mb-3" />
                        <p className={`text-sm font-semibold ${textSub}`}>No members found matching your criteria</p>
                    </div>
                ) : filtered.map(c => (
                    <div key={c.id} className={`rounded-xl border p-4 ${surfaceCls}`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-start gap-2 flex-1">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarColor(c.avatar)}`}>
                                    {c.avatar}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-sm font-bold ${textMain} truncate`}>{c.name}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < Math.floor(c.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <ActionMenu
                                onView={() => setSelectedCustomer(c)}
                                onBlock={() => handleBlock(c.id)}
                                onReset={() => handleReset(c.id)}
                            />
                        </div>
                        <div className={`text-xs space-y-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                            <div className="flex justify-between">
                                <span className={textSub}>Email:</span>
                                <span className={`${textMain} truncate`}>{c.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={textSub}>Phone:</span>
                                <span className={textMain}>{c.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={textSub}>Location:</span>
                                <span className={textMain}>{c.location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={textSub}>Spent:</span>
                                <span className={`${textMain} font-semibold`}>{fmt(c.totalSpent)}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold flex-1 justify-center ${statusConfig[c.status].bg} ${statusConfig[c.status].text}`}>
                                <span className={`w-1 h-1 rounded-full ${statusConfig[c.status].dot}`} />
                                {c.status}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-lg border text-[10px] font-bold ${tierConfig[c.tier].bg} ${tierConfig[c.tier].text} ${tierConfig[c.tier].border}`}>
                                {c.tier}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedCustomer && (
                <CustomerModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
            )}
        </div>
    );
};

export default Customers;
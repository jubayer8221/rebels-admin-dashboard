/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import {
    Search, Filter, MoreVertical, Mail, Phone,
    ShoppingBag, TrendingUp, Users, UserCheck,
    ChevronDown, ArrowUpRight, ArrowDownRight,
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
    Bronze: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
    Silver: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' },
    Gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-400' },
    Platinum: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-400' },
};
const statusConfig = {
    Active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
    Inactive: { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' },
    Blocked: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-400' },
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

const StatCard = ({ label, value, sub, icon: Icon, up }: {
    label: string; value: string; sub: string; icon: React.ElementType; up: boolean;
}) => {
    const { isDark, compactMode } = useTheme();
    return (
        <div className={`rounded-2xl border p-${compactMode ? '4' : '5'} flex items-start justify-between shadow-sm hover:shadow-md transition-shadow
            ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100'}`}>
            <div className="space-y-1">
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
                <p className={`text-2xl font-black tracking-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{value}</p>
                <div className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    <span>{sub}</span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent)' }}>
                <Icon size={18} />
            </div>
        </div>
    );
};

// ─── Customer Drawer ──────────────────────────────────────────────────────────

const CustomerDrawer = ({ customer, onClose }: { customer: Customer; onClose: () => void }) => {
    const { isDark } = useTheme();
    const tier = tierConfig[customer.tier];
    const status = statusConfig[customer.status];
    const surface = isDark ? 'bg-[#1a1a1a]' : 'bg-white';
    const borderColor = isDark ? 'border-[#2a2a2a]' : 'border-gray-100';
    const bodyText = isDark ? 'text-gray-100' : 'text-gray-900';
    const subText = isDark ? 'text-gray-500' : 'text-gray-500';

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-black/20'} backdrop-blur-sm`} onClick={onClose} />
            <div className={`relative w-full max-w-sm ${surface} h-full shadow-2xl flex flex-col`}
                style={{ animation: 'slideIn 0.25s ease-out' }}>
                <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

                <div className={`p-6 border-b flex items-center justify-between ${borderColor}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${subText}`}>Customer Profile</p>
                    <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${isDark ? 'bg-[#222] hover:bg-[#333]' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <X size={14} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-black ${getAvatarColor(customer.avatar)}`}>
                            {customer.avatar}
                        </div>
                        <div>
                            <h2 className={`text-xl font-black ${bodyText}`}>{customer.name}</h2>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={11} className={i < Math.floor(customer.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                                ))}
                                <span className={`text-xs ml-1 font-bold ${subText}`}>{customer.rating}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${tier.bg} ${tier.text} ${tier.border}`}>
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${tier.dot}`} />
                                {customer.tier}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black ${status.bg} ${status.text}`}>
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${status.dot}`} />
                                {customer.status}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${subText}`}>Contact Info</p>
                        <div className="space-y-2">
                            {[
                                { icon: Mail, val: customer.email },
                                { icon: Phone, val: customer.phone },
                                { icon: MapPin, val: customer.location },
                                { icon: Calendar, val: `Joined ${fmtDate(customer.joinDate)}` },
                            ].map(({ icon: Icon, val }) => (
                                <div key={val} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
                                    <Icon size={14} className={subText} />
                                    <span className={`text-sm font-medium truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${subText}`}>Purchase Stats</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl p-4 text-white text-center" style={{ backgroundColor: 'var(--accent)' }}>
                                <p className="text-2xl font-black">{customer.totalOrders}</p>
                                <p className="text-[10px] font-bold text-white/70 mt-1">TOTAL ORDERS</p>
                            </div>
                            <div className="rounded-2xl p-4 text-white text-center" style={{ backgroundColor: 'var(--accent)', opacity: 0.85 }}>
                                <p className="text-lg font-black">{fmt(customer.totalSpent)}</p>
                                <p className="text-[10px] font-bold text-white/70 mt-1">TOTAL SPENT</p>
                            </div>
                        </div>
                        <div className={`p-3 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
                            <span className={`text-xs font-medium ${subText}`}>Last order</span>
                            <span className={`text-xs font-black ${bodyText}`}>{fmtDate(customer.lastOrder)}</span>
                        </div>
                    </div>
                </div>

                <div className={`p-6 border-t grid grid-cols-2 gap-3 ${borderColor}`}>
                    <button className={`py-3 rounded-2xl border text-sm font-bold transition flex items-center justify-center gap-2
                        ${isDark ? 'border-[#333] text-gray-400 hover:bg-[#222]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                        <Mail size={14} /> Email
                    </button>
                    <button className="py-3 rounded-2xl text-white text-sm font-bold transition flex items-center justify-center gap-2 hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent)' }}>
                        <ShoppingBag size={14} /> Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Row Action Menu ───────────────────────────────────────────────────────────

const ActionMenu = ({ onView, onBlock, onReset }: { onView: () => void; onBlock: () => void; onReset: () => void; }) => {
    const { isDark } = useTheme();
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setOpen(o => !o)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${isDark ? 'hover:bg-[#333]' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={15} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className={`absolute right-0 top-9 z-20 border rounded-2xl shadow-xl py-2 w-40 text-sm ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-100'}`}>
                        <button onClick={() => { onView(); setOpen(false); }}
                            className={`w-full px-4 py-2 text-left flex items-center gap-2 font-medium ${isDark ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <Eye size={13} /> View Profile
                        </button>
                        <button onClick={() => { onReset(); setOpen(false); }}
                            className={`w-full px-4 py-2 text-left flex items-center gap-2 font-medium ${isDark ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <RefreshCw size={13} /> Reset Status
                        </button>
                        <div className={`my-1 border-t ${isDark ? 'border-[#333]' : 'border-gray-100'}`} />
                        <button onClick={() => { onBlock(); setOpen(false); }}
                            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-red-50 text-red-500 font-medium">
                            <Ban size={13} /> Block
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Customers: React.FC = () => {
    const { isDark, compactMode } = useTheme();
    const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tierFilter, setTierFilter] = useState('All');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [sortKey, setSortKey] = useState<'totalSpent' | 'totalOrders' | 'lastOrder'>('totalSpent');

    // Theme tokens
    const surface = isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100';
    const inputCls = `w-full border rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[--accent]
        ${isDark ? 'bg-[#111] border-[#333] text-gray-100 placeholder:text-gray-600 focus:bg-[#1a1a1a]' : 'bg-gray-50 border-gray-200 text-gray-800 focus:bg-white'}`;
    const selectCls = `border rounded-xl text-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[--accent]
        ${isDark ? 'bg-[#111] border-[#333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`;
    const bodyText = isDark ? 'text-gray-100' : 'text-gray-900';
    const subText = isDark ? 'text-gray-500' : 'text-gray-400';
    const headText = isDark ? 'text-gray-500' : 'text-gray-400';
    const rowHover = isDark ? 'hover:bg-[#222]' : 'hover:bg-gray-50/60';
    const divideColor = isDark ? 'divide-[#2a2a2a]' : 'divide-gray-50';
    const borderColor = isDark ? 'border-[#2a2a2a]' : 'border-gray-100';
    const px = compactMode ? 'px-4' : 'px-5';
    const cellPy = compactMode ? 'py-3' : 'py-4';

    const filtered = useMemo(() => {
        return customers
            .filter(c => {
                const q = search.toLowerCase();
                return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
            })
            .filter(c => statusFilter === 'All' || c.status === statusFilter)
            .filter(c => tierFilter === 'All' || c.tier === tierFilter)
            .sort((a, b) => sortKey === 'lastOrder' ? b.lastOrder.localeCompare(a.lastOrder) : b[sortKey] - a[sortKey]);
    }, [customers, search, statusFilter, tierFilter, sortKey]);

    const stats = useMemo(() => ({
        total: customers.length,
        active: customers.filter(c => c.status === 'Active').length,
        revenue: customers.reduce((s, c) => s + c.totalSpent, 0),
        avgOrder: Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.reduce((s, c) => s + c.totalOrders, 0)),
    }), [customers]);

    const handleBlock = (id: number) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Blocked' } : c));
    const handleReset = (id: number) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Active' } : c));

    return (
        <div className={`min-h-screen space-y-6 ${isDark ? 'bg-[#0d0d0d] text-gray-100' : 'bg-gray-50/50'}`}>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Customers" value={stats.total.toString()} sub="+12% this month" icon={Users} up={true} />
                <StatCard label="Active Customers" value={stats.active.toString()} sub="+5% this month" icon={UserCheck} up={true} />
                <StatCard label="Total Revenue" value={fmt(stats.revenue)} sub="+18% this month" icon={TrendingUp} up={true} />
                <StatCard label="Avg. Order Value" value={fmt(stats.avgOrder)} sub="-2% this month" icon={ShoppingBag} up={false} />
            </div>

            {/* Filters */}
            <div className={`rounded-2xl border p-4 shadow-sm flex flex-wrap gap-3 items-center ${surface}`}>
                <div className="flex-1 min-w-48 relative">
                    <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${subText}`} />
                    <input type="text" placeholder="Search name, email, city..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className={`${inputCls} pl-9 pr-4 py-2.5`} />
                </div>
                <div className="relative">
                    <Filter size={12} className={`absolute left-3 top-1/2 -translate-y-1/2 ${subText}`} />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        className={`${selectCls} pl-8 pr-8 py-2.5`}>
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <ChevronDown size={12} className={`absolute right-3 top-1/2 -translate-y-1/2 ${subText} pointer-events-none`} />
                </div>
                <div className="relative">
                    <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
                        className={`${selectCls} pl-4 pr-8 py-2.5`}>
                        <option value="All">All Tiers</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                    <ChevronDown size={12} className={`absolute right-3 top-1/2 -translate-y-1/2 ${subText} pointer-events-none`} />
                </div>
                <div className="relative">
                    <select value={sortKey} onChange={e => setSortKey(e.target.value as any)}
                        className={`${selectCls} pl-4 pr-8 py-2.5`}>
                        <option value="totalSpent">Sort: Spent</option>
                        <option value="totalOrders">Sort: Orders</option>
                        <option value="lastOrder">Sort: Recent</option>
                    </select>
                    <ChevronDown size={12} className={`absolute right-3 top-1/2 -translate-y-1/2 ${subText} pointer-events-none`} />
                </div>
            </div>

            {/* Table */}
            <div className={`rounded-2xl border shadow-sm overflow-hidden ${surface}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`border-b ${borderColor} ${isDark ? 'bg-[#111]' : ''}`}>
                                {['Customer', 'Contact', 'Location', 'Status', 'Tier', 'Orders', 'Spent', 'Last Order', ''].map(h => (
                                    <th key={h} className={`${px} py-4 text-left text-[10px] font-black uppercase tracking-widest ${headText}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`${divideColor} divide-y`}>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={9} className="px-5 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Users size={32} className={isDark ? 'text-gray-700' : 'text-gray-200'} />
                                        <p className={`text-sm font-bold ${subText}`}>No customers found</p>
                                    </div>
                                </td></tr>
                            ) : filtered.map(c => {
                                const tier = tierConfig[c.tier];
                                const status = statusConfig[c.status];
                                return (
                                    <tr key={c.id} className={`${rowHover} transition-colors group`}>
                                        {/* Customer */}
                                        <td className={`${px} ${cellPy}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`${compactMode ? 'w-8 h-8' : 'w-9 h-9'} rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${getAvatarColor(c.avatar)}`}>
                                                    {c.avatar}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold ${bodyText}`}>{c.name}</p>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={9} className={i < Math.floor(c.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Contact */}
                                        <td className={`${px} ${cellPy}`}>
                                            <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{c.email}</p>
                                            <p className={`text-xs mt-0.5 ${subText}`}>{c.phone}</p>
                                        </td>
                                        {/* Location */}
                                        <td className={`${px} ${cellPy}`}>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={11} className={subText} />
                                                <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{c.location}</span>
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className={`${px} ${cellPy}`}>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black ${status.bg} ${status.text}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                {c.status}
                                            </span>
                                        </td>
                                        {/* Tier */}
                                        <td className={`${px} ${cellPy}`}>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${tier.bg} ${tier.text} ${tier.border}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
                                                {c.tier}
                                            </span>
                                        </td>
                                        {/* Orders */}
                                        <td className={`${px} ${cellPy}`}>
                                            <span className={`text-sm font-black ${bodyText}`}>{c.totalOrders}</span>
                                        </td>
                                        {/* Spent */}
                                        <td className={`${px} ${cellPy}`}>
                                            <span className={`text-sm font-black ${bodyText}`}>{fmt(c.totalSpent)}</span>
                                        </td>
                                        {/* Last Order */}
                                        <td className={`${px} ${cellPy}`}>
                                            <span className={`text-xs font-medium ${subText}`}>{fmtDate(c.lastOrder)}</span>
                                        </td>
                                        {/* Actions */}
                                        <td className={`${px} ${cellPy}`}>
                                            <ActionMenu
                                                onView={() => setSelectedCustomer(c)}
                                                onBlock={() => handleBlock(c.id)}
                                                onReset={() => handleReset(c.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className={`px-5 py-4 border-t flex items-center justify-between ${borderColor}`}>
                    <p className={`text-xs font-medium ${subText}`}>
                        Showing <span className={`font-black ${bodyText}`}>{filtered.length}</span> of <span className={`font-black ${bodyText}`}>{customers.length}</span> customers
                    </p>
                    <div className="flex gap-1">
                        {['Bronze', 'Silver', 'Gold', 'Platinum'].map(t => {
                            const count = filtered.filter(c => c.tier === t).length;
                            if (!count) return null;
                            const cfg = tierConfig[t as keyof typeof tierConfig];
                            return (
                                <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                    {count} {t}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Drawer */}
            {selectedCustomer && (
                <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
            )}
        </div>
    );
};

export default Customers;
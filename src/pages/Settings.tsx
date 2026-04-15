import React, { useState, useRef } from 'react';
import type { ThemeMode } from '../context/ThemeContext';
import {
    User, Store, Bell, Shield, CreditCard, Truck,
    Palette, ChevronRight, Camera, Save,
    Eye, EyeOff, Check,
    AlertTriangle, Smartphone, Mail, Lock, Package,
    Percent, MapPin, Phone, Upload, X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import { getGap, getPadding, getPaddingX, getPaddingY } from '../utils/designTokens';

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey =
    | 'profile'
    | 'store'
    | 'notifications'
    | 'security'
    | 'payments'
    | 'shipping'
    | 'appearance';

// ─── Theme-aware style helpers ────────────────────────────────────────────────

const useStyles = () => {
    const { isDark, compactMode } = useTheme();
    const py = compactMode ? getPaddingY('sm') : getPaddingY('md');
    const px = compactMode ? getPaddingX('md') : getPaddingX('xl');
    const gap = compactMode ? getGap('sm') : getGap('lg');

    return {
        card: `rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100'} shadow-sm`,
        input: `w-full border rounded-xl ${px} ${py} text-sm focus:ring-2 focus:ring-[--accent] outline-none transition-all font-medium placeholder:font-normal
            ${isDark
                ? 'bg-[#111] border-[#333] text-gray-100 placeholder:text-gray-600 focus:bg-[#1a1a1a]'
                : 'bg-gray-50/50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:bg-white'}`,
        label: `block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`,
        sectionBg: `rounded-2xl ${px} ${py} ${isDark ? 'bg-[#111] border border-[#2a2a2a]' : 'bg-gray-50'}`,
        text: isDark ? 'text-gray-100' : 'text-gray-800',
        subText: isDark ? 'text-gray-500' : 'text-gray-400',
        divider: isDark ? 'divide-[#2a2a2a]' : 'divide-gray-100',
        border: isDark ? 'border-[#2a2a2a]' : 'border-gray-100',
        rowGap: gap,
        primaryBtn: `flex items-center gap-2 ${getPaddingX('xl')} ${py} rounded-2xl text-sm font-black transition-all bg-[--accent] hover:bg-[--accent-hover] text-white`,
        savedBtn: `flex items-center gap-2 ${getPaddingX('xl')} ${py} rounded-2xl text-sm font-black transition-all bg-emerald-500 text-white`,
    };
};

// ─── Toggle Component ─────────────────────────────────────────────────────────

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none`}
        style={{ backgroundColor: enabled ? 'var(--accent)' : '#d1d5db' }}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

// ─── Section Row ──────────────────────────────────────────────────────────────

const SettingRow = ({ label, description, children }: {
    label: string; description?: string; children: React.ReactNode;
}) => {
    const { isDark, compactMode } = useTheme();
    return (
        <div className={`flex items-center justify-between ${compactMode ? 'py-3' : 'py-4'} border-b last:border-0 gap-6 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-50'}`}>
            <div className="min-w-0">
                <p className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{label}</p>
                {description && <p className={`text-xs font-medium mt-0.5 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{description}</p>}
            </div>
            <div className="shrink-0">{children}</div>
        </div>
    );
};

// ─── Nav Item ─────────────────────────────────────────────────────────────────

const NavItem = ({ label, icon: Icon, active, onClick, badge }: {
    id: SectionKey; label: string; icon: React.ElementType;
    active: boolean; onClick: () => void; badge?: string;
}) => {
    const { isDark } = useTheme();
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all group`}
            style={active ? {
                backgroundColor: 'var(--accent)',
                color: 'white',
                boxShadow: '0 4px 14px var(--accent-muted)',
            } : {}}
            data-inactive={!active}
        >
            <Icon
                size={16}
                className={active ? 'text-white' : isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'}
            />
            <span className={`text-sm font-bold flex-1 ${active ? 'text-white' : isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-800'}`}>
                {label}
            </span>
            {badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-red-100 text-red-500'}`}>
                    {badge}
                </span>
            )}
            {!active && <ChevronRight size={13} className={isDark ? 'text-gray-600' : 'text-gray-300'} />}
        </button>
    );
};

// ─── Profile Section ──────────────────────────────────────────────────────────

const ProfileSection = () => {
    const s = useStyles();
    const { isDark } = useTheme();
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        firstName: 'Rebels', lastName: 'Admin',
        email: 'admin@rebels.com.bd', phone: '+880 1700 000000',
        bio: 'Managing the Rebels fashion store dashboard.',
    });
    const [saved, setSaved] = useState(false);
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div className="space-y-6">
            <div className={`flex items-center gap-5 p-5 rounded-2xl ${isDark ? 'bg-[#111] border border-[#2a2a2a]' : 'bg-gray-50'}`}>
                <div className="relative">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--accent)' }}>
                        {avatar
                            ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            : <span className="text-2xl font-black text-white">RA</span>}
                    </div>
                    <button onClick={() => fileRef.current?.click()}
                        className={`absolute -bottom-1 -right-1 w-7 h-7 border-2 rounded-full flex items-center justify-center shadow-sm transition ${isDark ? 'bg-[#1a1a1a] border-[#333] hover:bg-[#222]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
                        <Camera size={12} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    </button>
                    <input ref={fileRef} type="file" className="hidden" accept="image/*"
                        onChange={e => e.target.files?.[0] && setAvatar(URL.createObjectURL(e.target.files[0]))} />
                </div>
                <div>
                    <p className={`text-sm font-black ${s.text}`}>Profile Photo</p>
                    <p className={`text-xs mt-0.5 ${s.subText}`}>JPG or PNG, max 2MB</p>
                    <button onClick={() => fileRef.current?.click()} className="mt-2 flex items-center gap-1.5 text-xs font-bold transition" style={{ color: 'var(--accent)' }}>
                        <Upload size={11} /> Upload new photo
                    </button>
                </div>
                {avatar && (
                    <button onClick={() => setAvatar(null)} className={`ml-auto transition ${isDark ? 'text-gray-600 hover:text-red-400' : 'text-gray-300 hover:text-red-400'}`}>
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={s.label}>First Name</label><input className={s.input} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
                <div><label className={s.label}>Last Name</label><input className={s.input} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
                <div>
                    <label className={s.label}>Email Address</label>
                    <div className="relative">
                        <Mail size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input className={`${s.input} pl-9`} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={s.label}>Phone Number</label>
                    <div className="relative">
                        <Phone size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input className={`${s.input} pl-9`} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className={s.label}>Bio</label>
                    <textarea rows={3} className={`${s.input} resize-none`} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                </div>
            </div>
            <button onClick={handleSave} className={saved ? s.savedBtn : s.primaryBtn}>
                {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Profile</>}
            </button>
        </div>
    );
};

// ─── Store Section ────────────────────────────────────────────────────────────

const StoreSection = () => {
    const s = useStyles();
    const [form, setForm] = useState({
        storeName: 'Rebels Fashion', tagline: 'Wear the rebellion.',
        email: 'support@rebels.com.bd', phone: '+880 1700 000000',
        address: '45 Gulshan Avenue, Dhaka 1212',
        currency: 'BDT', taxRate: '15', minOrder: '500',
    });
    const [saved, setSaved] = useState(false);
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className={s.label}>Store Name</label>
                    <div className="relative">
                        <Store size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input className={`${s.input} pl-9`} value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className={s.label}>Store Tagline</label>
                    <input className={s.input} value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
                </div>
                <div><label className={s.label}>Support Email</label><input className={s.input} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className={s.label}>Support Phone</label><input className={s.input} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                <div className="md:col-span-2">
                    <label className={s.label}>Store Address</label>
                    <div className="relative">
                        <MapPin size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input className={`${s.input} pl-9`} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={s.label}>Currency</label>
                    <select className={s.input} value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
                        <option value="BDT">BDT — Bangladeshi Taka (৳)</option>
                        <option value="USD">USD — US Dollar ($)</option>
                        <option value="EUR">EUR — Euro (€)</option>
                    </select>
                </div>
                <div>
                    <label className={s.label}>Tax Rate (%)</label>
                    <div className="relative">
                        <Percent size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input type="number" className={`${s.input} pl-9`} value={form.taxRate} onChange={e => setForm({ ...form, taxRate: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={s.label}>Minimum Order (৳)</label>
                    <div className="relative">
                        <Package size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                        <input type="number" className={`${s.input} pl-9`} value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} />
                    </div>
                </div>
            </div>
            <button onClick={handleSave} className={saved ? s.savedBtn : s.primaryBtn}>
                {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Store Info</>}
            </button>
        </div>
    );
};

// ─── Notifications Section ────────────────────────────────────────────────────

const NotificationsSection = () => {
    const s = useStyles();
    const [notifs, setNotifs] = useState({
        newOrder: true, orderShipped: true, orderCancelled: true,
        lowStock: true, newCustomer: false, reviews: false,
        emailDigest: true, smsAlerts: false, pushBrowser: true, promotions: false,
    });
    const toggle = (k: keyof typeof notifs) => setNotifs(p => ({ ...p, [k]: !p[k] }));

    const groups = [
        {
            title: 'Order Events',
            rows: [
                { key: 'newOrder', label: 'New Order Placed', desc: 'Get notified when a customer places a new order' },
                { key: 'orderShipped', label: 'Order Shipped', desc: 'When an order status changes to shipped' },
                { key: 'orderCancelled', label: 'Order Cancelled', desc: 'When a customer cancels their order' },
            ]
        },
        {
            title: 'Inventory & Customers',
            rows: [
                { key: 'lowStock', label: 'Low Stock Alert', desc: 'When a product stock falls below 5 units' },
                { key: 'newCustomer', label: 'New Customer Signup', desc: 'When a new customer creates an account' },
                { key: 'reviews', label: 'New Product Reviews', desc: 'When customers leave product reviews' },
            ]
        },
        {
            title: 'Delivery Channels',
            rows: [
                { key: 'emailDigest', label: 'Daily Email Digest', desc: 'A summary email sent every morning at 9 AM' },
                { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical alerts via SMS (charges may apply)' },
                { key: 'pushBrowser', label: 'Browser Push', desc: 'Real-time notifications in your browser' },
                { key: 'promotions', label: 'Promotions & Tips', desc: 'Occasional tips about new features' },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            {groups.map(g => (
                <div key={g.title}>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>{g.title}</p>
                    <div className={s.sectionBg}>
                        {g.rows.map(r => (
                            <SettingRow key={r.key} label={r.label} description={r.desc}>
                                <Toggle enabled={notifs[r.key as keyof typeof notifs]} onChange={() => toggle(r.key as keyof typeof notifs)} />
                            </SettingRow>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Security Section ─────────────────────────────────────────────────────────

const SecuritySection = () => {
    const s = useStyles();
    const { isDark } = useTheme();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [twoFA, setTwoFA] = useState(false);
    const [sessions] = useState([
        { device: 'Chrome on Windows', location: 'Dhaka, BD', time: 'Now — Current session', active: true },
        { device: 'Safari on iPhone 14', location: 'Dhaka, BD', time: '2 days ago', active: false },
        { device: 'Firefox on MacOS', location: 'Chittagong, BD', time: '5 days ago', active: false },
    ]);

    return (
        <div className="space-y-6">
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Change Password</p>
                <div className="space-y-3">
                    <div>
                        <label className={s.label}>Current Password</label>
                        <div className="relative">
                            <Lock size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                            <input type={showOld ? 'text' : 'password'} className={`${s.input} pl-9 pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowOld(v => !v)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${s.subText} hover:text-gray-600`}>
                                {showOld ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className={s.label}>New Password</label>
                        <div className="relative">
                            <Lock size={13} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${s.subText}`} />
                            <input type={showNew ? 'text' : 'password'} className={`${s.input} pl-9 pr-10`} placeholder="Min. 8 characters" />
                            <button type="button" onClick={() => setShowNew(v => !v)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${s.subText}`}>
                                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>
                    <button className={s.primaryBtn}><Lock size={14} /> Update Password</button>
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Two-Factor Authentication</p>
                <div className={s.sectionBg}>
                    <SettingRow label="Enable 2FA" description="Add an extra layer of security via SMS or Authenticator app">
                        <Toggle enabled={twoFA} onChange={setTwoFA} />
                    </SettingRow>
                </div>
                {twoFA && (
                    <div className="mt-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
                        <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-emerald-700 font-medium">2FA is enabled. You'll be asked for a verification code on each login.</p>
                    </div>
                )}
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Active Sessions</p>
                <div className="space-y-2">
                    {sessions.map((session, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${session.active
                            ? isDark ? 'border-[--accent] bg-[--accent-subtle]' : 'border-black bg-black/2'
                            : isDark ? 'border-[#2a2a2a] bg-[#111]' : 'border-gray-100 bg-gray-50'
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${session.active ? 'text-white' : isDark ? 'bg-[#222]' : 'bg-gray-200'}`}
                                    style={session.active ? { backgroundColor: 'var(--accent)' } : {}}>
                                    <Smartphone size={14} className={session.active ? 'text-white' : isDark ? 'text-gray-500' : 'text-gray-500'} />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${s.text}`}>{session.device}</p>
                                    <p className={`text-xs font-medium ${s.subText}`}>{session.location} · {session.time}</p>
                                </div>
                            </div>
                            {session.active
                                ? <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full">ACTIVE</span>
                                : <button className="text-xs font-bold text-red-400 hover:text-red-600 transition">Revoke</button>}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Danger Zone</p>
                <div className={`p-4 border border-red-200 rounded-2xl flex items-start justify-between gap-4 ${isDark ? 'bg-red-950/30' : 'bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-black text-red-700">Delete Account</p>
                            <p className="text-xs text-red-400 font-medium mt-0.5">This action is permanent and cannot be undone.</p>
                        </div>
                    </div>
                    <button className="shrink-0 px-4 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-black hover:bg-red-100 transition">Delete</button>
                </div>
            </div>
        </div>
    );
};

// ─── Payments Section ─────────────────────────────────────────────────────────

const PaymentsSection = () => {
    const s = useStyles();
    const { isDark } = useTheme();
    const [methods, setMethods] = useState({ bkash: true, nagad: true, rocket: false, card: true, cod: true });
    const toggle = (k: keyof typeof methods) => setMethods(p => ({ ...p, [k]: !p[k] }));
    const [saved, setSaved] = useState(false);

    const gateways = [
        { key: 'bkash', label: 'bKash', desc: 'Mobile banking — most popular in BD', color: 'bg-pink-500' },
        { key: 'nagad', label: 'Nagad', desc: 'Bangladesh Post Office mobile financial service', color: 'bg-orange-500' },
        { key: 'rocket', label: 'Rocket (DBBL)', desc: 'Dutch Bangla Bank mobile banking', color: 'bg-violet-500' },
        { key: 'card', label: 'Debit / Credit Card', desc: 'Visa, Mastercard via SSL Commerz', color: 'bg-blue-500' },
        { key: 'cod', label: 'Cash on Delivery', desc: 'Customer pays on delivery', color: 'bg-emerald-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Payment Methods</p>
                <div className="space-y-2">
                    {gateways.map(g => (
                        <div key={g.key} className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-[#111] border-[#2a2a2a]' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl ${g.color} flex items-center justify-center`}>
                                    <CreditCard size={13} className="text-white" />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${s.text}`}>{g.label}</p>
                                    <p className={`text-xs font-medium ${s.subText}`}>{g.desc}</p>
                                </div>
                            </div>
                            <Toggle enabled={methods[g.key as keyof typeof methods]} onChange={() => toggle(g.key as keyof typeof methods)} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>SSL Commerz API Keys</p>
                <div className="space-y-3">
                    <div><label className={s.label}>Store ID</label><input className={s.input} placeholder="rebels_store_id" /></div>
                    <div><label className={s.label}>Store Password / API Key</label><input type="password" className={s.input} placeholder="••••••••••••••••" /></div>
                    <div className="flex items-center gap-3">
                        <label className={s.label + ' mb-0'}>Sandbox Mode</label>
                        <Toggle enabled={true} onChange={() => { }} />
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">TESTING</span>
                    </div>
                    <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className={saved ? s.savedBtn : s.primaryBtn}>
                        {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save API Keys</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Shipping Section ─────────────────────────────────────────────────────────

const ShippingSection = () => {
    const s = useStyles();
    const { isDark } = useTheme();
    const [zones] = useState([
        { name: 'Dhaka City', rate: 60, time: '1–2 days', active: true },
        { name: 'Dhaka Division', rate: 100, time: '2–3 days', active: true },
        { name: 'Chittagong', rate: 120, time: '2–4 days', active: true },
        { name: 'Rest of Bangladesh', rate: 150, time: '3–5 days', active: false },
    ]);
    const [freeThreshold, setFreeThreshold] = useState('2000');

    return (
        <div className="space-y-6">
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Shipping Zones & Rates</p>
                <div className="space-y-2">
                    {zones.map((z, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-[#111] border-[#2a2a2a]' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${z.active ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                                <div>
                                    <p className={`text-sm font-bold ${s.text}`}>{z.name}</p>
                                    <p className={`text-xs font-medium ${s.subText}`}>{z.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-black ${s.text}`}>৳{z.rate}</span>
                                <button className={`text-xs font-bold transition ${s.subText} hover:text-[--accent]`}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Free Shipping</p>
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#111] border-[#2a2a2a]' : 'bg-gray-50 border-gray-100'}`}>
                    <p className={`text-sm font-bold ${s.text}`}>Enable free shipping above a cart threshold</p>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold ${s.subText}`}>৳</span>
                            <input type="number" className={`${s.input} pl-8`} value={freeThreshold} onChange={e => setFreeThreshold(e.target.value)} />
                        </div>
                        <button className={`px-5 py-3 rounded-xl text-sm font-black transition whitespace-nowrap text-white`} style={{ backgroundColor: 'var(--accent)' }}>Save</button>
                    </div>
                    <p className={`text-xs font-medium ${s.subText}`}>Customers spending over ৳{parseInt(freeThreshold).toLocaleString()} get free shipping automatically.</p>
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Courier Partners</p>
                <div className={s.sectionBg}>
                    {[
                        { label: 'Pathao Courier', desc: 'Integrated via Pathao API' },
                        { label: 'Steadfast', desc: 'Budget-friendly nationwide delivery' },
                        { label: 'Redex', desc: 'Express delivery across BD' },
                    ].map((c, i) => (
                        <SettingRow key={i} label={c.label} description={c.desc}>
                            <button className={`text-xs font-black px-3 py-1.5 border rounded-xl transition ${isDark ? 'border-[#333] text-gray-400 hover:bg-[#222]' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Configure</button>
                        </SettingRow>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Appearance Section ───────────────────────────────────────────────────────

const AppearanceSection = () => {
    const s = useStyles();
    const { isDark } = useTheme();
    const {
        mode, accent, compactMode, sidebarCollapsed,
        setMode, setCompactMode, setSidebarCollapsed, applyAppearance,
    } = useTheme();

    // Local state for accent so user can preview before applying
    const [localAccent, setLocalAccent] = useState(accent);
    const [saved, setSaved] = useState(false);

    const presetAccents = ['#000000', '#2563EB', '#7C3AED', '#DC2626', '#059669', '#D97706', '#DB2777', '#0891B2'];

    const handleApply = () => {
        applyAppearance({ mode, accent: localAccent, compactMode, sidebarCollapsed });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Theme Mode */}
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Theme Mode</p>
                <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'auto'] as ThemeMode[]).map(t => (
                        <button key={t} onClick={() => setMode(t)}
                            className={`py-4 rounded-2xl border-2 text-sm font-black capitalize transition-all`}
                            style={mode === t
                                ? { borderColor: 'var(--accent)', backgroundColor: 'var(--accent)', color: 'white' }
                                : { borderColor: isDark ? '#333' : '#e5e7eb', backgroundColor: isDark ? '#111' : '#f9fafb', color: isDark ? '#999' : '#4b5563' }
                            }>
                            {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '⚙️'} {t}
                        </button>
                    ))}
                </div>
                <p className={`text-xs mt-2 font-medium ${s.subText}`}>
                    {mode === 'light' && 'Light mode is always on.'}
                    {mode === 'dark' && 'Dark mode is always on.'}
                    {mode === 'auto' && 'Follows your system preference automatically.'}
                </p>
            </div>

            {/* Accent Color */}
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Accent Color</p>
                <div className="flex items-center gap-3 flex-wrap">
                    {presetAccents.map(c => (
                        <button key={c} onClick={() => setLocalAccent(c)}
                            className={`w-9 h-9 rounded-xl transition-all ${localAccent === c ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    <input type="color" value={localAccent} onChange={e => setLocalAccent(e.target.value)}
                        className="w-9 h-9 rounded-xl cursor-pointer border-2 border-dashed border-gray-300 bg-transparent p-0.5" />
                </div>
                {/* Live preview */}
                <div className={`mt-4 p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-[#111] border-[#2a2a2a]' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: localAccent }} />
                        <div>
                            <p className={`text-sm font-bold ${s.text}`}>{localAccent.toUpperCase()}</p>
                            <p className={`text-xs ${s.subText}`}>Selected accent color</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black text-white" style={{ backgroundColor: localAccent }}>Button</span>
                        <span className="px-3 py-1 rounded-full text-xs font-black border" style={{ borderColor: localAccent, color: localAccent }}>Outline</span>
                    </div>
                </div>
                <p className={`text-xs mt-2 font-medium ${s.subText}`}>
                    Click <strong>Apply Appearance</strong> below to save the accent color across the entire dashboard.
                </p>
            </div>

            {/* Layout Options */}
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${s.subText}`}>Layout Options</p>
                <div className={s.sectionBg}>
                    <SettingRow label="Compact Mode" description="Reduce padding and spacing for a denser layout">
                        <Toggle enabled={compactMode} onChange={setCompactMode} />
                    </SettingRow>
                    <SettingRow label="Collapsed Sidebar" description="Start with the sidebar minimized by default">
                        <Toggle enabled={sidebarCollapsed} onChange={setSidebarCollapsed} />
                    </SettingRow>
                </div>
            </div>

            {/* Apply button */}
            <Button onClick={handleApply} className={saved ? s.savedBtn : s.primaryBtn}>
                {saved ? <><Check size={15} /> Applied to entire dashboard!</> : <><Palette size={14} /> Apply Appearance</>}
            </Button>
        </div>
    );
};

// ─── Main Settings Page ───────────────────────────────────────────────────────

const Settings: React.FC = () => {
    const { isDark } = useTheme();
    const [activeSection, setActiveSection] = useState<SectionKey>('profile');

    const nav: { id: SectionKey; label: string; icon: React.ElementType; badge?: string }[] = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'store', label: 'Store Info', icon: Store },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const sectionTitles: Record<SectionKey, { title: string; desc: string }> = {
        profile: { title: 'Profile Settings', desc: 'Manage your personal account details' },
        store: { title: 'Store Information', desc: 'Configure your store details and preferences' },
        notifications: { title: 'Notification Settings', desc: 'Control how and when you receive alerts' },
        security: { title: 'Security & Access', desc: 'Password, 2FA and active sessions' },
        payments: { title: 'Payment Methods', desc: 'Configure payment gateways and API keys' },
        shipping: { title: 'Shipping & Delivery', desc: 'Set zones, rates and courier integrations' },
        appearance: { title: 'Appearance', desc: 'Theme, accent colors and layout preferences' },
    };

    const sections: Record<SectionKey, React.ReactNode> = {
        profile: <ProfileSection />,
        store: <StoreSection />,
        notifications: <NotificationsSection />,
        security: <SecuritySection />,
        payments: <PaymentsSection />,
        shipping: <ShippingSection />,
        appearance: <AppearanceSection />,
    };

    const { title, desc } = sectionTitles[activeSection];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50/50'}`}>
            <div className={`flex ${getGap('lg')} items-start`}>
                {/* Sidebar Nav */}
                <aside className={`w-56 shrink-0 rounded-2xl border shadow-sm ${getPadding('md')} ${getGap('sm')} sticky top-6 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100'}`}>
                    {nav.map(n => (
                        <NavItem key={n.id} {...n} active={activeSection === n.id} onClick={() => setActiveSection(n.id)} />
                    ))}
                </aside>

                {/* Content Panel */}
                <main className={`flex-1 rounded-2xl border shadow-sm ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100'}`}>
                    <div className={`${getPaddingX('xl')} ${getPaddingY('lg')} border-b ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
                        <h2 className={`text-lg font-black ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h2>
                        <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
                    </div>
                    <div className={`${getPaddingX('xl')} ${getPaddingY('lg')} ${getGap('lg')}`}>
                        {sections[activeSection]}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
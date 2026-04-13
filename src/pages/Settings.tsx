import React, { useState, useRef } from 'react';
import {
    User, Store, Bell, Shield, CreditCard, Truck,
    Palette, ChevronRight, Camera, Save,
    Eye, EyeOff, Check,
    AlertTriangle, Smartphone, Mail, Lock, Package,
    Percent, MapPin, Phone, Upload, X
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey =
    | 'profile'
    | 'store'
    | 'notifications'
    | 'security'
    | 'payments'
    | 'shipping'
    | 'appearance';

// ─── Toggle Component ─────────────────────────────────────────────────────────

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-black' : 'bg-gray-200'}`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

// ─── Input ────────────────────────────────────────────────────────────────────

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 focus:bg-white text-gray-800 font-medium placeholder:text-gray-400 placeholder:font-normal";
const labelCls = "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5";

// ─── Section Row ──────────────────────────────────────────────────────────────

const SettingRow = ({ label, description, children }: {
    label: string; description?: string; children: React.ReactNode;
}) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 gap-6">
        <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800">{label}</p>
            {description && <p className="text-xs text-gray-400 font-medium mt-0.5 leading-relaxed">{description}</p>}
        </div>
        <div className="shrink-0">{children}</div>
    </div>
);

// ─── Nav Item ─────────────────────────────────────────────────────────────────

const NavItem = ({ label, icon: Icon, active, onClick, badge }: {
    id: SectionKey; label: string; icon: React.ElementType;
    active: boolean; onClick: () => void; badge?: string;
}) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all group ${active
            ? 'bg-black text-white shadow-lg shadow-black/10'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
    >
        <Icon size={16} className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
        <span className="text-sm font-bold flex-1">{label}</span>
        {badge && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-red-100 text-red-500'}`}>
                {badge}
            </span>
        )}
        {!active && <ChevronRight size={13} className="text-gray-300 group-hover:text-gray-400" />}
    </button>
);

// ─── Sections ─────────────────────────────────────────────────────────────────

const ProfileSection = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        firstName: 'Rebels', lastName: 'Admin',
        email: 'admin@rebels.com.bd', phone: '+880 1700 000000',
        bio: 'Managing the Rebels fashion store dashboard.',
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl">
                <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center overflow-hidden">
                        {avatar
                            ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            : <span className="text-2xl font-black text-white">RA</span>}
                    </div>
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
                    >
                        <Camera size={12} className="text-gray-600" />
                    </button>
                    <input ref={fileRef} type="file" className="hidden" accept="image/*"
                        onChange={e => e.target.files?.[0] && setAvatar(URL.createObjectURL(e.target.files[0]))} />
                </div>
                <div>
                    <p className="text-sm font-black text-gray-900">Profile Photo</p>
                    <p className="text-xs text-gray-400 mt-0.5">JPG or PNG, max 2MB</p>
                    <button onClick={() => fileRef.current?.click()}
                        className="mt-2 flex items-center gap-1.5 text-xs font-bold text-black hover:text-blue-600 transition">
                        <Upload size={11} /> Upload new photo
                    </button>
                </div>
                {avatar && (
                    <button onClick={() => setAvatar(null)} className="ml-auto text-gray-300 hover:text-red-400 transition">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>First Name</label>
                    <input className={inputCls} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                    <label className={labelCls}>Last Name</label>
                    <input className={inputCls} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                </div>
                <div>
                    <label className={labelCls}>Email Address</label>
                    <div className="relative">
                        <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input className={`${inputCls} pl-9`} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Phone Number</label>
                    <div className="relative">
                        <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input className={`${inputCls} pl-9`} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className={labelCls}>Bio</label>
                    <textarea rows={3} className={`${inputCls} resize-none`} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                </div>
            </div>

            <button onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}>
                {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Profile</>}
            </button>
        </div>
    );
};

const StoreSection = () => {
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
                    <label className={labelCls}>Store Name</label>
                    <div className="relative">
                        <Store size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input className={`${inputCls} pl-9`} value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className={labelCls}>Store Tagline</label>
                    <input className={inputCls} value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Your store's motto" />
                </div>
                <div>
                    <label className={labelCls}>Support Email</label>
                    <input className={inputCls} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                    <label className={labelCls}>Support Phone</label>
                    <input className={inputCls} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                    <label className={labelCls}>Store Address</label>
                    <div className="relative">
                        <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input className={`${inputCls} pl-9`} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Currency</label>
                    <div className="relative">
                        <select className={`${inputCls} appearance-none`} value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
                            <option value="BDT">BDT — Bangladeshi Taka (৳)</option>
                            <option value="USD">USD — US Dollar ($)</option>
                            <option value="EUR">EUR — Euro (€)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Tax Rate (%)</label>
                    <div className="relative">
                        <Percent size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="number" className={`${inputCls} pl-9`} value={form.taxRate} onChange={e => setForm({ ...form, taxRate: e.target.value })} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Minimum Order (৳)</label>
                    <div className="relative">
                        <Package size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="number" className={`${inputCls} pl-9`} value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} />
                    </div>
                </div>
            </div>
            <button onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}>
                {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Store Info</>}
            </button>
        </div>
    );
};

const NotificationsSection = () => {
    const [notifs, setNotifs] = useState({
        newOrder: true, orderShipped: true, orderCancelled: true,
        lowStock: true, newCustomer: false, reviews: false,
        emailDigest: true, smsAlerts: false, pushBrowser: true,
        promotions: false,
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{g.title}</p>
                    <div className="bg-gray-50 rounded-2xl px-4 divide-y divide-gray-100">
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

const SecuritySection = () => {
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
            {/* Password */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Change Password</p>
                <div className="space-y-3">
                    <div>
                        <label className={labelCls}>Current Password</label>
                        <div className="relative">
                            <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type={showOld ? 'text' : 'password'} className={`${inputCls} pl-9 pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowOld(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showOld ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>New Password</label>
                        <div className="relative">
                            <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type={showNew ? 'text' : 'password'} className={`${inputCls} pl-9 pr-10`} placeholder="Min. 8 characters" />
                            <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl text-sm font-black hover:bg-blue-600 transition">
                        <Lock size={14} /> Update Password
                    </button>
                </div>
            </div>

            {/* 2FA */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Two-Factor Authentication</p>
                <div className="bg-gray-50 rounded-2xl px-4">
                    <SettingRow
                        label="Enable 2FA"
                        description="Add an extra layer of security to your account via SMS or Authenticator app"
                    >
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

            {/* Sessions */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Active Sessions</p>
                <div className="space-y-2">
                    {sessions.map((s, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${s.active ? 'border-black bg-black/2' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.active ? 'bg-black' : 'bg-gray-200'}`}>
                                    <Smartphone size={14} className={s.active ? 'text-white' : 'text-gray-500'} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{s.device}</p>
                                    <p className="text-xs text-gray-400 font-medium">{s.location} · {s.time}</p>
                                </div>
                            </div>
                            {s.active
                                ? <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full">ACTIVE</span>
                                : <button className="text-xs font-bold text-red-400 hover:text-red-600 transition">Revoke</button>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger Zone */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Danger Zone</p>
                <div className="p-4 border border-red-100 bg-red-50 rounded-2xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-black text-red-700">Delete Account</p>
                            <p className="text-xs text-red-400 font-medium mt-0.5">This action is permanent and cannot be undone.</p>
                        </div>
                    </div>
                    <button className="shrink-0 px-4 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-black hover:bg-red-100 transition">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const PaymentsSection = () => {
    const [methods, setMethods] = useState({
        bkash: true, nagad: true, rocket: false,
        card: true, cod: true,
    });
    const toggle = (k: keyof typeof methods) => setMethods(p => ({ ...p, [k]: !p[k] }));

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
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Payment Methods</p>
                <div className="space-y-2">
                    {gateways.map(g => (
                        <div key={g.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl ${g.color} flex items-center justify-center`}>
                                    <CreditCard size={13} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{g.label}</p>
                                    <p className="text-xs text-gray-400 font-medium">{g.desc}</p>
                                </div>
                            </div>
                            <Toggle enabled={methods[g.key as keyof typeof methods]} onChange={() => toggle(g.key as keyof typeof methods)} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">SSL Commerz API Keys</p>
                <div className="space-y-3">
                    <div>
                        <label className={labelCls}>Store ID</label>
                        <input className={inputCls} placeholder="rebels_store_id" />
                    </div>
                    <div>
                        <label className={labelCls}>Store Password / API Key</label>
                        <input type="password" className={inputCls} placeholder="••••••••••••••••" />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className={labelCls + ' mb-0'}>Sandbox Mode</label>
                        <Toggle enabled={true} onChange={() => { }} />
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">TESTING</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl text-sm font-black hover:bg-blue-600 transition">
                        <Save size={14} /> Save API Keys
                    </button>
                </div>
            </div>
        </div>
    );
};

const ShippingSection = () => {
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
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Shipping Zones & Rates</p>
                <div className="space-y-2">
                    {zones.map((z, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${z.active ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{z.name}</p>
                                    <p className="text-xs text-gray-400 font-medium">{z.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-black text-gray-900">৳{z.rate}</span>
                                <button className="text-xs font-bold text-gray-400 hover:text-black transition">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Free Shipping</p>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <p className="text-sm font-bold text-gray-800">Enable free shipping above a cart threshold</p>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">৳</span>
                            <input type="number" className={`${inputCls} pl-8`} value={freeThreshold} onChange={e => setFreeThreshold(e.target.value)} />
                        </div>
                        <button className="px-5 py-3 bg-black text-white rounded-xl text-sm font-black hover:bg-blue-600 transition whitespace-nowrap">
                            Save
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Customers spending over ৳{parseInt(freeThreshold).toLocaleString()} get free shipping automatically.</p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Courier Partners</p>
                <div className="bg-gray-50 rounded-2xl px-4 divide-y divide-gray-100">
                    {[
                        { label: 'Pathao Courier', desc: 'Integrated via Pathao API' },
                        { label: 'Steadfast', desc: 'Budget-friendly nationwide delivery' },
                        { label: 'Redex', desc: 'Express delivery across BD' },
                    ].map((c, i) => (
                        <SettingRow key={i} label={c.label} description={c.desc}>
                            <button className="text-xs font-black px-3 py-1.5 border border-gray-200 rounded-xl hover:bg-gray-100 transition text-gray-600">
                                Configure
                            </button>
                        </SettingRow>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AppearanceSection = () => {
    const [accent, setAccent] = useState('#000000');
    const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
    const [compactMode, setCompactMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const accents = ['#000000', '#2563EB', '#7C3AED', '#DC2626', '#059669', '#D97706', '#DB2777'];

    return (
        <div className="space-y-6">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Theme Mode</p>
                <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'auto'] as const).map(t => (
                        <button key={t} onClick={() => setTheme(t)}
                            className={`py-4 rounded-2xl border-2 text-sm font-black capitalize transition-all ${theme === t ? 'border-black bg-black text-white' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'}`}>
                            {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '⚙️'} {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Accent Color</p>
                <div className="flex items-center gap-3 flex-wrap">
                    {accents.map(c => (
                        <button key={c} onClick={() => setAccent(c)}
                            className={`w-9 h-9 rounded-xl transition-all ${accent === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`}
                            style={{ backgroundColor: c }} />
                    ))}
                    <div className="relative">
                        <input type="color" value={accent} onChange={e => setAccent(e.target.value)}
                            className="w-9 h-9 rounded-xl cursor-pointer border-2 border-dashed border-gray-300 bg-transparent p-0.5" />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Layout Options</p>
                <div className="bg-gray-50 rounded-2xl px-4 divide-y divide-gray-100">
                    <SettingRow label="Compact Mode" description="Reduce padding and spacing for a denser layout">
                        <Toggle enabled={compactMode} onChange={setCompactMode} />
                    </SettingRow>
                    <SettingRow label="Collapsed Sidebar" description="Start with the sidebar minimized by default">
                        <Toggle enabled={sidebarCollapsed} onChange={setSidebarCollapsed} />
                    </SettingRow>
                </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl text-sm font-black hover:bg-blue-600 transition">
                <Palette size={14} /> Apply Appearance
            </button>
        </div>
    );
};

// ─── Main Settings Page ───────────────────────────────────────────────────────

const Settings: React.FC = () => {
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
        <div className="min-h-screen bg-gray-50/50 ">
            {/* Header */}
            {/* <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
                <p className="text-sm text-gray-400 font-medium mt-0.5">Manage your store, account and preferences</p>
            </div> */}

            <div className="flex gap-6 items-start">
                {/* Sidebar Nav */}
                <aside className="w-56 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 space-y-1 sticky top-6">
                    {nav.map(n => (
                        <NavItem key={n.id} {...n} active={activeSection === n.id} onClick={() => setActiveSection(n.id)} />
                    ))}
                </aside>

                {/* Content Panel */}
                <main className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    {/* Panel Header */}
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h2 className="text-lg font-black text-gray-900">{title}</h2>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{desc}</p>
                    </div>

                    {/* Panel Body */}
                    <div className="px-8 py-6">
                        {sections[activeSection]}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
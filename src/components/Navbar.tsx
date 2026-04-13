/* eslint-disable react-hooks/static-components */
import { useEffect, useRef, useState } from 'react';
import {
    Bell, Search, User, Settings, LogOut, ChevronDown, Shield,
    ShoppingBag, Package, AlertTriangle, UserPlus,
    CheckCheck, Trash2, X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


// ─── Types ────────────────────────────────────────────────────────────────────

type NotifType = 'order' | 'stock' | 'customer' | 'warning';

interface Notification {
    id: number;
    type: NotifType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

// ─── Mock notifications — replace with Redux/API data ─────────────────────────

const INITIAL_NOTIFS: Notification[] = [
    { id: 1, type: 'order', title: 'New Order #1042', message: 'Ayesha Rahman placed an order for ৳3,200', time: '2m ago', read: false },
    { id: 2, type: 'stock', title: 'Low Stock Alert', message: 'Slim T-shirt (Size M) has only 3 units left', time: '18m ago', read: false },
    { id: 3, type: 'customer', title: 'New Customer Signup', message: 'Tanvir Hossain just created an account', time: '1h ago', read: false },
    { id: 4, type: 'order', title: 'Order #1039 Cancelled', message: 'Rafiul Islam cancelled their order', time: '3h ago', read: true },
    { id: 5, type: 'warning', title: 'Payment Gateway Issue', message: 'bKash integration returned error on #1038', time: '5h ago', read: true },
];

const notifIconMap: Record<NotifType, { icon: React.ElementType; bg: string; color: string }> = {
    order: { icon: ShoppingBag, bg: 'bg-blue-50', color: 'text-blue-500' },
    stock: { icon: Package, bg: 'bg-amber-50', color: 'text-amber-500' },
    customer: { icon: UserPlus, bg: 'bg-emerald-50', color: 'text-emerald-500' },
    warning: { icon: AlertTriangle, bg: 'bg-red-50', color: 'text-red-500' },
};

// ─── Outside-click hook ───────────────────────────────────────────────────────

const useOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, cb: () => void) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) cb();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, cb]);
};

// ─── MenuItem ─────────────────────────────────────────────────────────────────

const MenuItem = ({ icon: Icon, label, onClick, danger = false }: {
    icon: React.ElementType; label: string; onClick: () => void; danger?: boolean;
}) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors
        ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
    >
        <Icon size={15} className={danger ? 'text-red-400' : 'text-gray-400'} />
        {label}
    </button>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // Notification state
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFS);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    useOutsideClick(notifRef, () => setNotifOpen(false));

    const unreadCount = notifications.filter(n => !n.read).length;
    const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })));
    const markRead = (id: number) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
    const dismiss = (id: number) => setNotifications(p => p.filter(n => n.id !== id));
    const clearAll = () => setNotifications([]);

    // Profile state
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    useOutsideClick(profileRef, () => setProfileOpen(false));

    // User data with fallbacks
    const displayName = user?.name ?? 'Admin User';
    const displayRole = user?.role ?? 'Super Admin';
    const displayEmail = user?.email ?? 'admin@rebels.com.bd';
    const avatarUrl = user?.avatarUrl ?? null;

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    // Shared avatar element
    const Avatar = ({ sm = false }: { sm?: boolean }) => (
        <div className={`${sm ? 'w-9 h-9 rounded-xl' : 'w-10 h-10 rounded-2xl'} overflow-hidden border border-blue-200 shrink-0`}>
            {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            ) : (
                <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {getInitials(displayName)}
                </div>
            )}
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes dropIn {
                    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0)    scale(1);    }
                }
                .drop-in { animation: dropIn 0.16s cubic-bezier(0.16,1,0.3,1); }
            `}</style>

            <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">

                {/* Search */}
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search rebels data..."
                        className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-5">

                    {/* ── Bell / Notification Panel ── */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
                            className={`relative p-2 rounded-xl transition-all
                                ${notifOpen
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white px-0.5">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="drop-in absolute right-0 top-[calc(100%+10px)] w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">

                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-black text-gray-900">Notifications</p>
                                        {unreadCount > 0 && (
                                            <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-full">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead}
                                                className="flex items-center gap-1 text-[11px] font-bold text-blue-500 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition">
                                                <CheckCheck size={12} /> Mark all read
                                            </button>
                                        )}
                                        {notifications.length > 0 && (
                                            <button onClick={clearAll}
                                                className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition">
                                                <Trash2 size={13} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Notification list */}
                                <div className="max-h-90 overflow-y-auto divide-y divide-gray-50">
                                    {notifications.length === 0 ? (
                                        <div className="py-12 flex flex-col items-center gap-2">
                                            <Bell size={28} className="text-gray-200" />
                                            <p className="text-sm font-bold text-gray-400">All caught up!</p>
                                        </div>
                                    ) : notifications.map(n => {
                                        const { icon: NIcon, bg, color } = notifIconMap[n.type];
                                        return (
                                            <div
                                                key={n.id}
                                                onClick={() => markRead(n.id)}
                                                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors group
                                                    ${n.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/40 hover:bg-blue-50/70'}`}
                                            >
                                                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                                    <NIcon size={15} className={color} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-sm leading-tight ${n.read ? 'font-medium text-gray-700' : 'font-black text-gray-900'}`}>
                                                            {n.title}
                                                        </p>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                                                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-gray-500 transition shrink-0 mt-0.5"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-medium mt-0.5 leading-relaxed">{n.message}</p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                                                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                {notifications.length > 0 && (
                                    <div className="px-4 py-3 border-t border-gray-100 text-center">
                                        <button className="text-xs font-black text-gray-400 hover:text-black transition">
                                            View all notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-px bg-gray-200" />

                    {/* ── Profile Trigger + Dropdown ── */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
                            className="flex items-center gap-3 group"
                        >
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 leading-tight">{displayName}</p>
                                <p className="text-xs text-gray-400">{displayRole}</p>
                            </div>
                            <Avatar />
                            <ChevronDown
                                size={14}
                                className={`text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="drop-in absolute right-0 top-[calc(100%+10px)] w-60 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">

                                {/* User info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Avatar />
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-gray-900 truncate">{displayName}</p>
                                            <p className="text-xs text-gray-400 truncate">{displayEmail}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-black rounded-full w-fit">
                                        <Shield size={10} className="text-white" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{displayRole}</span>
                                    </div>
                                </div>

                                <div className="py-1.5 px-2">
                                    <MenuItem icon={User} label="View Profile" onClick={() => {
                                        setProfileOpen(false);
                                        navigate('/profile');

                                    }} />
                                    <MenuItem icon={Settings} label="Settings" onClick={() => {
                                        setProfileOpen(false);
                                        navigate('/settings');
                                    }} />
                                </div>

                                <div className="border-t border-gray-100 py-1.5 px-2">
                                    <MenuItem icon={LogOut} label="Sign Out" danger onClick={() => dispatch(logout())} />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </header>
        </>
    );
};

export default Navbar;

// import { useEffect, useRef, useState } from 'react';
// import { Bell, Search, User, Settings, LogOut, ChevronDown, Shield } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { logout } from '../features/auth/authSlice'; // adjust path as needed

// const Navbar = () => {
//     const dispatch = useAppDispatch();

//     // ── Pull user from Redux ──────────────────────────────────────────────────
//     // Expects your auth slice to have: state.auth.user = { name, email, role, avatarUrl }
//     const user = useAppSelector((state) => state.auth.user);

//     // ── Dropdown state ────────────────────────────────────────────────────────
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     // Close on outside click
//     useEffect(() => {
//         const handler = (e: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handler);
//         return () => document.removeEventListener('mousedown', handler);
//     }, []);

//     // ── Avatar initials fallback ──────────────────────────────────────────────
//     const getInitials = (name: string) =>
//         name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'AD';

//     const displayName = user?.name ?? 'Admin User';
//     const displayRole = user?.role ?? 'Super Admin';
//     const avatarUrl = user?.avatarUrl ?? null;

//     return (
//         <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">

//             {/* ── Search ── */}
//             <div className="relative w-96">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                     type="text"
//                     placeholder="Search rebels data..."
//                     className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
//                 />
//             </div>

//             {/* ── Right Side ── */}
//             <div className="flex items-center space-x-6">

//                 {/* Bell */}
//                 <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
//                     <Bell size={22} />
//                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
//                         3
//                     </span>
//                 </button>

//                 <div className="h-8 w-px bg-gray-200" />

//                 {/* ── Profile Trigger + Dropdown ── */}
//                 <div className="relative" ref={dropdownRef}>

//                     {/* Trigger */}
//                     <button
//                         onClick={() => setDropdownOpen((o) => !o)}
//                         className="flex items-center gap-3 cursor-pointer group"
//                     >
//                         <div className="text-right">
//                             <p className="text-sm font-bold text-gray-800 leading-tight">{displayName}</p>
//                             <p className="text-xs text-gray-400">{displayRole}</p>
//                         </div>

//                         {/* Avatar: image if available, else initials */}
//                         <div className="w-10 h-10 rounded-2xl overflow-hidden border border-blue-200 group-hover:ring-2 group-hover:ring-blue-400 transition-all shrink-0">
//                             {avatarUrl ? (
//                                 <img
//                                     src={avatarUrl}
//                                     alt={displayName}
//                                     className="w-full h-full object-cover"
//                                     onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
//                                 />
//                             ) : (
//                                 <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
//                                     {getInitials(displayName)}
//                                 </div>
//                             )}
//                         </div>

//                         <ChevronDown
//                             size={14}
//                             className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
//                         />
//                     </button>

//                     {/* ── Dropdown Menu ── */}
//                     {dropdownOpen && (
//                         <div className="absolute right-0 top-[calc(100%+12px)] w-60 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/5 py-2 z-50 animate-[fadeIn_0.15s_ease-out]">
//                             <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>

//                             {/* User info header */}
//                             <div className="px-4 py-3 border-b border-gray-100">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-9 h-9 rounded-xl overflow-hidden border border-blue-200 shrink-0">
//                                         {avatarUrl ? (
//                                             <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
//                                         ) : (
//                                             <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">
//                                                 {getInitials(displayName)}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="min-w-0">
//                                         <p className="text-sm font-black text-gray-900 truncate">{displayName}</p>
//                                         <p className="text-xs text-gray-400 truncate">{user?.email ?? 'admin@rebels.com.bd'}</p>
//                                     </div>
//                                 </div>

//                                 {/* Role badge */}
//                                 <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-black rounded-full w-fit">
//                                     <Shield size={10} className="text-white" />
//                                     <span className="text-[10px] font-black text-white uppercase tracking-wider">{displayRole}</span>
//                                 </div>
//                             </div>

//                             {/* Menu items */}
//                             <div className="py-1.5 px-2">
//                                 <MenuItem icon={User} label="View Profile" onClick={() => { setDropdownOpen(false); /* navigate('/profile') */ }} />
//                                 <MenuItem icon={Settings} label="Settings" onClick={() => { setDropdownOpen(false); /* navigate('/settings') */ }} />
//                             </div>

//                             <div className="border-t border-gray-100 py-1.5 px-2">
//                                 <button
//                                     onClick={() => dispatch(logout())}
//                                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
//                                 >
//                                     <LogOut size={15} />
//                                     Sign Out
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// // ── Small helper ──────────────────────────────────────────────────────────────
// const MenuItem = ({ icon: Icon, label, onClick }: {
//     icon: React.ElementType; label: string; onClick: () => void;
// }) => (
//     <button
//         onClick={onClick}
//         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
//     >
//         <Icon size={15} className="text-gray-400" />
//         {label}
//     </button>
// );

// export default Navbar;

// // import { Bell, Search, User } from 'lucide-react';

// // const Navbar = () => {
// //     return (
// //         <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
// //             {/* Search Bar */}
// //             <div className="relative w-96">
// //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //                 <input
// //                     type="text"
// //                     placeholder="Search rebels data..."
// //                     className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
// //                 />
// //             </div>

// //             {/* Right Side Icons */}
// //             <div className="flex items-center space-x-6">
// //                 <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
// //                     <Bell size={22} />
// //                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
// //                 </button>

// //                 <div className="h-8 w-px bg-gray-200 mx-2"></div>

// //                 <div className="flex items-center gap-3 cursor-pointer group">
// //                     <div className="text-right">
// //                         <p className="text-sm font-bold text-gray-800 leading-tight">Admin User</p>
// //                         <p className="text-xs text-gray-400">Super Admin</p>
// //                     </div>
// //                     <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
// //                         <User size={20} />
// //                     </div>
// //                 </div>
// //             </div>
// //         </header>
// //     );
// // };

// // export default Navbar;
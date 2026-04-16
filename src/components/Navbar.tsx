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
import { getPaddingX, getPaddingY, getGap } from '../utils/designTokens';


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
    order: { icon: ShoppingBag, bg: 'bg-[var(--color-primary)]/10', color: 'text-[var(--color-primary)]' },
    stock: { icon: Package, bg: 'bg-[var(--color-warning)]/10', color: 'text-[var(--color-warning)]' },
    customer: { icon: UserPlus, bg: 'bg-[var(--color-success)]/10', color: 'text-[var(--color-success)]' },
    warning: { icon: AlertTriangle, bg: 'bg-[var(--color-error)]/10', color: 'text-[var(--color-error)]' },
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
        ${danger ? 'text-[var(--color-error)] hover:bg-[var(--color-error)]/10' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'}`}
    >
        <Icon size={15} className={danger ? 'text-[var(--color-error)]' : 'text-[var(--color-text-tertiary)]'} />
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
        <div className={`${sm ? 'w-9 h-9 rounded-xl' : 'w-10 h-10 rounded-2xl'} overflow-hidden border border-[var(--color-border)] shrink-0`}>
            {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            ) : (
                <div className="w-full h-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-xs font-black group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
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

            <header className={`h-20 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)] flex items-center justify-between ${getPaddingX('xl')} sticky top-0 z-40`}>

                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
                    <input
                        type="text"
                        placeholder="Search rebels data..."
                        className={`w-full bg-[var(--color-bg-secondary)] border-none rounded-2xl ${getPaddingY('sm')} pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all outline-none`}
                    />
                </div>

                <div className={`flex items-center ${getGap('lg')}`}>

                    {/* ── Bell / Notification Panel ── */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
                            className={`relative p-2 rounded-xl transition-all
                                ${notifOpen
                                    ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
                                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'}`}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-[var(--color-error)] text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[var(--color-bg-primary)] px-0.5">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="drop-in absolute right-0 top-[calc(100%+10px)] w-80 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-lg)] z-50 overflow-hidden">

                                {/* Header */}
                                <div className={`flex items-center justify-between ${getPaddingX('md')} ${getPaddingY('sm')} border-b border-[var(--color-border)]`}>
                                    <div className={`flex items-center ${getGap('sm')}`}>
                                        <p className="text-sm font-black text-[var(--color-text-primary)]">Notifications</p>
                                        {unreadCount > 0 && (
                                            <span className="text-[10px] font-black bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead}
                                                className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 px-2 py-1 rounded-lg hover:bg-[var(--color-primary)]/10 transition">
                                                <CheckCheck size={12} /> Mark all read
                                            </button>
                                        )}
                                        {notifications.length > 0 && (
                                            <button onClick={clearAll}
                                                className="p-1.5 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition">
                                                <Trash2 size={13} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Notification list */}
                                <div className="max-h-90 overflow-y-auto divide-y divide-[var(--color-border)]">
                                    {notifications.length === 0 ? (
                                        <div className="py-12 flex flex-col items-center gap-2">
                                            <Bell size={28} className="text-[var(--color-text-disabled)]" />
                                            <p className="text-sm font-bold text-[var(--color-text-tertiary)]">All caught up!</p>
                                        </div>
                                    ) : notifications.map(n => {
                                        const { icon: NIcon, bg, color } = notifIconMap[n.type];
                                        return (
                                            <div
                                                key={n.id}
                                                onClick={() => markRead(n.id)}
                                                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors group
                                                    ${n.read ? 'bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10'}`}
                                            >
                                                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                                    <NIcon size={15} className={color} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-sm leading-tight ${n.read ? 'font-medium text-[var(--color-text-secondary)]' : 'font-black text-[var(--color-text-primary)]'}`}>
                                                            {n.title}
                                                        </p>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                                                            className="opacity-0 group-hover:opacity-100 text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] transition shrink-0 mt-0.5"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-(--color-text-tertiary) font-medium mt-0.5 leading-relaxed">{n.message}</p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-[10px] text-[var(--color-text-tertiary)] font-medium">{n.time}</span>
                                                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                {notifications.length > 0 && (
                                    <div className="px-4 py-3 border-t border-[var(--color-border)] text-center">
                                        <button className="text-xs font-black text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition">
                                            View all notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-px bg-[var(--color-border)]" />

                    {/* ── Profile Trigger + Dropdown ── */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
                            className="flex items-center gap-3 group"
                        >
                            <div className="text-right">
                                <p className="text-sm font-bold text-[var(--color-text-primary)] leading-tight">{displayName}</p>
                                <p className="text-xs text-[var(--color-text-tertiary)]">{displayRole}</p>
                            </div>
                            <Avatar />
                            <ChevronDown
                                size={14}
                                className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="drop-in absolute right-0 top-[calc(100%+10px)] w-60 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-lg)] py-2 z-50">

                                {/* User info */}
                                <div className="px-4 py-3 border-b border-[var(--color-border)]">
                                    <div className="flex items-center gap-3">
                                        <Avatar />
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-[var(--color-text-primary)] truncate">{displayName}</p>
                                            <p className="text-xs text-[var(--color-text-tertiary)] truncate">{displayEmail}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-primary)] rounded-full w-fit">
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
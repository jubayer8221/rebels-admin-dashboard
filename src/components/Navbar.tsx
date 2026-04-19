/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
import { useEffect, useRef, useState } from 'react';
import {
    Bell,
    Search,
    User,
    Settings,
    LogOut,
    ChevronDown,
    ShoppingBag,
    Package,
    AlertTriangle,
    UserPlus,
    Trash2,
    X,
    Menu,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getPaddingX, getPaddingY } from '../utils/designTokens';

interface NavbarProps {
    onSidebarToggle?: () => void;
    mobileOpen?: boolean;
}

type NotifType = 'order' | 'stock' | 'customer' | 'warning';

interface Notification {
    id: number;
    type: NotifType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

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

const useOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, callback]);
};

const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    danger = false,
}: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    danger?: boolean;
}) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-(--color-bg-secondary)
        ${danger ? 'text-(--color-error) hover:bg-(--color-error)/10' : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'}`}
    >
        <Icon size={16} className={danger ? 'text-(--color-error)' : ''} />
        {label}
    </button>
);

const Navbar = ({ onSidebarToggle, mobileOpen: _mobileOpen }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // States
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFS);
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useOutsideClick(notifRef, () => setNotifOpen(false));
    useOutsideClick(profileRef, () => setProfileOpen(false));

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const markRead = (id: number) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const dismiss = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));
    const clearAll = () => setNotifications([]);

    const displayName = user?.name ?? 'Admin User';
    const displayRole = user?.role ?? 'Super Admin';
    const displayEmail = user?.email ?? 'admin@rebels.com.bd';
    const avatarUrl = user?.avatarUrl ?? null;

    const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

    const Avatar = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
        const dim = size === 'sm' ? 'w-9 h-9 rounded-xl' : 'w-10 h-10 rounded-2xl';
        return (
            <div className={`${dim} overflow-hidden border border-(--color-border) shrink-0`}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center text-sm font-black">
                        {getInitials(displayName)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <style>{`
                @keyframes dropIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .drop-in { animation: dropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>

            <header className={`bg-(--color-bg-primary)/90 backdrop-blur-md border-b border-(--color-border) sticky top-0 z-50 ${getPaddingX('xl')} ${getPaddingY('md')}`}>
                <div className="flex items-center justify-between w-full gap-4">
                    {/* Left Side - Menu + Search */}
                    <div className="flex items-center gap-3 flex-1">
                        <button
                            onClick={onSidebarToggle}
                            className="lg:hidden p-2.5 rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) hover:bg-(--color-bg-tertiary) transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-tertiary)" size={18} />
                            <input
                                type="text"
                                placeholder="Search rebels data..."
                                className="w-full bg-(--color-bg-secondary) border border-transparent focus:border-(--color-primary) rounded-2xl py-3 pl-11 pr-4 text-sm placeholder:text-(--color-text-tertiary) focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Side - Notifications + Profile */}
                    <div className="flex items-center gap-2">
                        {/* Notifications */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => {
                                    setNotifOpen((prev) => !prev);
                                    setProfileOpen(false);
                                }}
                                className={`p-3 rounded-2xl transition-all relative ${notifOpen ? 'bg-(--color-bg-secondary)' : 'hover:bg-(--color-bg-secondary)'
                                    }`}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-(--color-error) text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-(--color-bg-primary)">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div className="drop-in absolute right-0 top-[calc(100%+12px)] w-80 bg-(--color-bg-primary) border border-(--color-border) rounded-3xl shadow-xl overflow-hidden z-50">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border)">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-lg">Notifications</p>
                                            {unreadCount > 0 && (
                                                <span className="text-xs font-bold bg-(--color-primary) text-white px-2.5 py-0.5 rounded-full">
                                                    {unreadCount} new
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {unreadCount > 0 && (
                                                <button onClick={markAllRead} className="text-xs font-semibold text-(--color-primary) hover:underline">
                                                    Mark all read
                                                </button>
                                            )}
                                            <button onClick={clearAll} className="text-(--color-text-tertiary) hover:text-(--color-error)">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-105 overflow-y-auto divide-y divide-(--color-border)">
                                        {notifications.length === 0 ? (
                                            <div className="py-16 text-center">
                                                <Bell size={36} className="mx-auto text-(--color-text-disabled) mb-3" />
                                                <p className="text-(--color-text-tertiary)">All caught up!</p>
                                            </div>
                                        ) : (
                                            notifications.map((n) => {
                                                const { icon: NIcon, bg, color } = notifIconMap[n.type];
                                                return (
                                                    <div
                                                        key={n.id}
                                                        onClick={() => markRead(n.id)}
                                                        className={`px-5 py-4 cursor-pointer transition-colors hover:bg-(--color-bg-secondary) ${n.read ? '' : 'bg-(--color-primary)/5'}`}
                                                    >
                                                        <div className="flex gap-3.5">
                                                            <div className={`w-9 h-9 rounded-2xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                                                <NIcon size={16} className={color} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between">
                                                                    <p className={`text-sm ${n.read ? 'text-(--color-text-secondary)' : 'font-semibold text-(--color-text-primary)'}`}>
                                                                        {n.title}
                                                                    </p>
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                                                                        className="text-(--color-text-tertiary) hover:text-(--color-error) opacity-0 group-hover:opacity-100"
                                                                    >
                                                                        <X size={14} />
                                                                    </button>
                                                                </div>
                                                                <p className="text-xs text-(--color-text-tertiary) mt-1 leading-relaxed">{n.message}</p>
                                                                <p className="text-[10px] text-(--color-text-tertiary) mt-2">{n.time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => {
                                    setProfileOpen((prev) => !prev);
                                    setNotifOpen(false);
                                }}
                                className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-2xl hover:bg-(--color-bg-secondary) transition-all"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-(--color-text-primary) leading-none">{displayName}</p>
                                    <p className="text-xs text-(--color-text-tertiary)">{displayRole}</p>
                                </div>
                                <Avatar size="md" />
                                <ChevronDown size={16} className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {profileOpen && (
                                <div className="drop-in absolute right-0 top-[calc(100%+12px)] w-64 bg-(--color-bg-primary) border border-(--color-border) rounded-3xl shadow-xl py-2 z-50">
                                    <div className="px-5 py-4 border-b border-(--color-border)">
                                        <div className="flex items-center gap-3">
                                            <Avatar size="md" />
                                            <div>
                                                <p className="font-semibold">{displayName}</p>
                                                <p className="text-xs text-(--color-text-tertiary)">{displayEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2 px-2">
                                        <MenuItem icon={User} label="View Profile" onClick={() => navigate('/profile')} />
                                        <MenuItem icon={Settings} label="Settings" onClick={() => navigate('/settings')} />
                                    </div>

                                    <div className="border-t border-(--color-border) py-2 px-2">
                                        <MenuItem icon={LogOut} label="Sign Out" danger onClick={() => dispatch(logout())} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
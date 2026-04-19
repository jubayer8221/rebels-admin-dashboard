import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    PanelLeftClose,
    PanelRightClose,
} from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useTheme } from '../context/ThemeContext';
import { getPadding, getGap, getPaddingX, getPaddingY } from '../utils/designTokens';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Products', icon: ShoppingBag, path: '/products' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
    const { sidebarCollapsed, setSidebarCollapsed, accent } = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
        onClose();
    };

    const widthClass = sidebarCollapsed ? 'lg:w-20 w-20' : 'lg:w-64 w-72';

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar - No Scrolling */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col bg-(--color-bg-primary) border-r border-(--color-border) transition-all duration-300 ease-in-out ${widthClass} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:static lg:translate-x-0 overflow-hidden`}
            >
                {/* Logo Section */}
                <div className={`${getPaddingX('lg')} ${getPaddingY('md')} flex items-center justify-between  shrink-0`}>
                    {!sidebarCollapsed && (
                        <div>
                            <h1
                                className="text-2xl font-black tracking-tighter"
                                style={{ color: accent }}
                            >
                                REBELS.
                            </h1>
                            <p className="text-[10px] text-(--color-text-tertiary) font-bold uppercase tracking-widest mt-1">
                                Admin Panel
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className={`${getPadding('sm')} rounded-lg bg-[var(--color-bg-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)] hover:shadow-md hover:shadow-[var(--color-secondary)]/20 text-[var(--color-text-secondary)] transition-all duration-200`}
                        title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        {sidebarCollapsed ? <PanelRightClose size={18} /> : <PanelLeftClose size={18} />}
                    </button>
                </div>

                {/* Navigation + Logout - No Scroll */}
                <div className="flex flex-col flex-1 min-h-0">

                    {/* Menu Items - Takes available space but no scroll */}
                    <nav className={`flex-1 ${getPaddingX('sm')} ${getGap('sm')} py-6 flex flex-col`}>
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                title={sidebarCollapsed ? item.name : ''}
                                className={({ isActive }) =>
                                    `flex items-center ${getPadding('sm')} rounded-xl transition-all duration-200 group shrink-0 ${isActive
                                        ? 'text-white shadow-lg shadow-[var(--color-secondary)]/30'
                                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]'
                                    }`
                                }
                                style={({ isActive }) =>
                                    isActive
                                        ? { backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }
                                        : {}
                                }
                            >
                                {() => (
                                    <>
                                        <item.icon
                                            size={20}
                                            className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} transition-all`}
                                        />
                                        {!sidebarCollapsed && (
                                            <span className="font-medium text-sm whitespace-nowrap">
                                                {item.name}
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Section - Pinned at bottom */}
                    <div className={`${getPadding('sm')} border-t border-[var(--color-border)] py-5 mt-auto`}>
                        <button
                            onClick={handleLogout}
                            title={sidebarCollapsed ? 'Logout' : ''}
                            className={`flex items-center w-full ${getPadding('sm')} ${getGap('sm')} text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 hover:shadow-md hover:shadow-[var(--color-secondary)]/20 rounded-xl transition-all duration-200 shrink-0`}
                        >
                            <LogOut
                                size={20}
                                className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} transition-all`}
                            />
                            {!sidebarCollapsed && (
                                <span className="font-medium text-sm">Logout</span>
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    PanelLeftClose,
    PanelRightClose
} from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useTheme } from '../context/ThemeContext';
import { getPadding, getGap, getPaddingX } from '../utils/designTokens';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Products', icon: ShoppingBag, path: '/products' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
    const { sidebarCollapsed, setSidebarCollapsed, accent } = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <aside
            className={`bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col sticky top-0 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Logo Section */}
            <div className={`${getPadding('lg')} flex items-center justify-between ${sidebarCollapsed ? `flex-col ${getGap('md')}` : ''}`}>
                {!sidebarCollapsed && (
                    <div>
                        <h1
                            className="text-2xl font-black tracking-tighter text-slate-950 dark:text-white"
                            style={{ color: accent }}
                        >
                            REBELS.
                        </h1>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">
                            Admin Panel
                        </p>
                    </div>
                )}
                {/* <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-500 dark:text-gray-300"
                    title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                    {sidebarCollapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
                </button> */}

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`${getPadding('sm')} rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors`}
                    style={{ ['--hover-color' as string]: accent }}
                >
                    {sidebarCollapsed ? <PanelRightClose size={18} /> : <PanelLeftClose size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className={`flex-1 flex flex-col ${getPaddingX('sm')} ${sidebarCollapsed ? '' : getGap('sm')}`}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        title={sidebarCollapsed ? item.name : ''}
                        className={({ isActive }) =>
                            `flex items-center ${getPadding('sm')} rounded-xl transition-all duration-200 group ${isActive
                                ? 'text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`
                        }
                        style={({ isActive }) =>
                            isActive
                                ? { backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }
                                : {}
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    size={20}
                                    className={`${sidebarCollapsed ? 'mr-0' : 'mr-3'} transition-all`}
                                    style={!isActive ? { color: undefined } : {}}
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

            {/* Logout Section */}
            <div className={`${getPadding('sm')} border-t border-gray-100 dark:border-gray-800`}>
                <button
                    onClick={handleLogout}
                    title={sidebarCollapsed ? 'Logout' : ''}
                    className={`flex items-center w-full ${getPadding('sm')} ${getGap('sm')} text-gray-500 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-xl transition-colors`}
                >
                    <LogOut
                        size={20}
                        className={`${sidebarCollapsed ? 'mr-0' : 'mr-3'} transition-all`}
                    />
                    {!sidebarCollapsed && (
                        <span className="font-medium text-sm">Logout</span>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
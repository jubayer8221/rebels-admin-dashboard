import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Products', icon: ShoppingBag, path: '/products' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0">
            {/* Logo Section */}
            <div className="p-8">
                <h1 className="text-2xl font-black tracking-tighter text-blue-600">REBELS.</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                            }`
                        }
                    >
                        <item.icon size={20} className="mr-3" />
                        <span className="font-medium text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center w-full p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut size={20} className="mr-3" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
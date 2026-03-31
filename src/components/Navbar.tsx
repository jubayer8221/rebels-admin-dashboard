import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Search Bar */}
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search rebels data..."
                    className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
                <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-800 leading-tight">Admin User</p>
                        <p className="text-xs text-gray-400">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Card from '../components/Card';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { fetchProducts } from '../features/products/productSlice';
// import { TrendingUp, Package, Calendar, Clock } from 'lucide-react';
// import ViewProductDialog from '../components/ViewProductDialog';
// import { getGap, getMarginBottom, getPadding } from '../utils/designTokens';
// import { useTheme } from '../context/ThemeContext';

// const Dashboard = () => {
//     const dispatch = useAppDispatch();
//     const { items, loading } = useAppSelector((state) => state.products);
//     const { isDark } = useTheme();
//     const [selectedItem, setSelectedItem] = useState<any | null>(null);

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     // --- DATE CALCULATIONS ---
//     const now = new Date();
//     const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     // Filter items based on createdAt (ensure your backend sends a valid date string)
//     const addedThisWeek = items.filter((item: any) => new Date(item.createdAt) >= oneWeekAgo).length;
//     const addedThisMonth = items.filter((item: any) => new Date(item.createdAt) >= oneMonthAgo).length;

//     return (
//         <div className={`space-y-6 sm:space-y-8 ${getMarginBottom('xl')}`}>
//             {/* ... Existing Header ... */}

//             {/* Main Metrics */}
//             <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${getGap('lg')}`}>
//                 <Card title="Revenue" value="৳45,231" change="+12%" icon={<TrendingUp size={18} />} />
//                 <Card title="Products" value={items.length.toString()} change="Live" icon={<Package size={18} />} />

//                 {/* NEW WEEKLY CARD */}
//                 <Card
//                     title="New This Week"
//                     value={loading ? "..." : addedThisWeek.toString()}
//                     change="Growth"
//                     icon={<Clock className="text-orange-500" size={18} />}
//                 />

//                 {/* NEW MONTHLY CARD */}
//                 <Card
//                     title="New This Month"
//                     value={loading ? "..." : addedThisMonth.toString()}
//                     change="Volume"
//                     icon={<Calendar size={18} />}
//                 />
//             </div>

//             {/* Recent Activity List */}
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white dark:bg-[#1a1a1a] rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-[#333] shadow-sm overflow-hidden"
//             >
//                 <div className={`${getPadding('lg')} border-b border-gray-50 dark:border-[#333] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
//                     <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Recent Inventory Changes</h2>
//                     <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-widest w-fit">Last 10 Entries</span>
//                 </div>

//                 <div className="divide-y divide-gray-50 dark:divide-[#333]">
//                     {items.slice(0, 5).map((item: any) => (
//                         <div
//                             key={item.id}
//                             onClick={() => setSelectedItem(item)} // Trigger Dialog
//                             className={`${getPadding('lg')} flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50/50 dark:hover:bg-[#111]/50 cursor-pointer transition-colors gap-3 sm:gap-0`}
//                         >
//                             <div className={`flex items-center ${getGap('md')}`}>
//                                 <div className="w-10 h-10 bg-gray-100 dark:bg-[#333] rounded-xl overflow-hidden shrink-0">
//                                     <img src={item.imageUrl} alt="" className="w-full h-full object-cover opacity-80" />
//                                 </div>
//                                 <div className="min-w-0 flex-1">
//                                     <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
//                                     <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-tight truncate">Added to {item.brand}</p>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-xs font-bold text-gray-900 dark:text-white">৳{item.price}</p>
//                                 <p className="text-[9px] text-green-500 dark:text-green-400 font-black uppercase tracking-tighter">Success</p>
//                             </div>
//                         </div>
//                     ))}

//                     {items.length === 0 && (
//                         <div className="py-20 text-center text-gray-300 dark:text-gray-600 italic text-sm">
//                             No recent additions found.
//                         </div>
//                     )}
//                 </div>
//             </motion.div>

//             {selectedItem && (
//                 <ViewProductDialog
//                     item={selectedItem}
//                     onClose={() => setSelectedItem(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default Dashboard;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../features/products/productSlice';
import { TrendingUp, Package, Calendar, Clock } from 'lucide-react';
import ViewProductDialog from '../components/ViewProductDialog';
import { getGap, getMarginBottom, getPadding } from '../utils/designTokens';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.products);
    const { isDark } = useTheme();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // --- DATE CALCULATIONS ---
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const addedThisWeek = items.filter((item: any) =>
        new Date(item.createdAt) >= oneWeekAgo
    ).length;

    const addedThisMonth = items.filter((item: any) =>
        new Date(item.createdAt) >= oneMonthAgo
    ).length;

    return (
        <div className={`space-y-6 sm:space-y-8 ${getMarginBottom('xl')}`}>
            {/* Main Metrics */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${getGap('lg')}`}>
                <Card
                    title="Revenue"
                    value="৳45,231"
                    change="+12%"
                    icon={<TrendingUp size={18} />}
                />

                <Card
                    title="Products"
                    value={items.length.toString()}
                    change="Live"
                    icon={<Package size={18} />}
                />

                {/* New This Week */}
                <Card
                    title="New This Week"
                    value={loading ? "..." : addedThisWeek.toString()}
                    change="Growth"
                    icon={<Clock className="text-orange-500" size={18} />}
                />

                {/* New This Month */}
                <Card
                    title="New This Month"
                    value={loading ? "..." : addedThisMonth.toString()}
                    change="Volume"
                    icon={<Calendar size={18} />}
                />
            </div>

            {/* Recent Activity List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl sm:rounded-3xl border shadow-sm overflow-hidden
                    ${isDark
                        ? 'bg-[#1a1a1a] border-[#333]'
                        : 'bg-white border-gray-100'
                    }`}
            >
                <div className={`${getPadding('lg')} border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
                    ${isDark ? 'border-[#333]' : 'border-gray-50'}`}
                >
                    <h2 className={`text-base sm:text-lg font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Recent Inventory Changes
                    </h2>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit
                        ${isDark
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                    >
                        Last 10 Entries
                    </span>
                </div>

                <div className={`divide-y ${isDark ? 'divide-[#333]' : 'divide-gray-50'}`}>
                    {items.slice(0, 5).map((item: any) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`${getPadding('lg')} flex flex-col sm:flex-row sm:items-center sm:justify-between 
                                hover:bg-gray-50/50 dark:hover:bg-[#111]/50 cursor-pointer transition-colors 
                                gap-3 sm:gap-0`}
                        >
                            <div className={`flex items-center ${getGap('md')}`}>
                                <div className={`w-10 h-10 rounded-xl overflow-hidden shrink-0
                                    ${isDark ? 'bg-[#333]' : 'bg-gray-100'}`}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-sm font-bold truncate
                                        ${isDark ? 'text-gray-100' : 'text-gray-800'}`}
                                    >
                                        {item.name}
                                    </p>
                                    <p className={`text-[10px] font-medium uppercase tracking-tight truncate
                                        ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                                    >
                                        Added to {item.brand}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className={`text-xs font-bold
                                    ${isDark ? 'text-white' : 'text-gray-900'}`}
                                >
                                    ৳{item.price}
                                </p>
                                <p className="text-[9px] text-green-500 dark:text-green-400 font-black uppercase tracking-tighter">
                                    Success
                                </p>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className={`py-20 text-center italic text-sm
                            ${isDark ? 'text-gray-600' : 'text-gray-300'}`}
                        >
                            No recent additions found.
                        </div>
                    )}
                </div>
            </motion.div>

            {selectedItem && (
                <ViewProductDialog
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;
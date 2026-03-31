/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../features/products/productSlice';
import { TrendingUp, Package, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // --- DATE CALCULATIONS ---
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Filter items based on createdAt (ensure your backend sends a valid date string)
    const addedThisWeek = items.filter((item: any) => new Date(item.createdAt) >= oneWeekAgo).length;
    const addedThisMonth = items.filter((item: any) => new Date(item.createdAt) >= oneMonthAgo).length;

    return (
        <div className="space-y-8 p-2">
            {/* ... Existing Header ... */}

            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Revenue" value="৳45,231" change="+12%" icon={<TrendingUp size={18} />} />
                <Card title="Products" value={items.length.toString()} change="Live" icon={<Package size={18} />} />

                {/* NEW WEEKLY CARD */}
                <Card
                    title="New This Week"
                    value={loading ? "..." : addedThisWeek.toString()}
                    change="Growth"
                    icon={<Clock className="text-orange-500" size={18} />}
                />

                {/* NEW MONTHLY CARD */}
                <Card
                    title="New This Month"
                    value={loading ? "..." : addedThisMonth.toString()}
                    change="Volume"
                    icon={<Calendar className="text-blue-500" size={18} />}
                />
            </div>

            {/* Recent Activity List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Inventory Changes</h2>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">Last 10 Entries</span>
                </div>

                <div className="divide-y divide-gray-50">
                    {items.slice(0, 5).map((item: any) => (
                        <div key={item.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Added to {item.brand}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900">৳{item.price}</p>
                                <p className="text-[9px] text-green-500 font-black uppercase tracking-tighter">Success</p>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="py-20 text-center text-gray-300 italic text-sm">
                            No recent additions found.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
    onClose: () => void;
}

const ViewProductDialog = ({ item, onClose }: Props) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                />

                {/* Dialog Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X size={18} className="text-gray-600" />
                    </button>

                    <div className="h-48 bg-gray-100">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                                <p className="text-blue-600 font-semibold">{item.brand}</p>
                            </div>
                            <p className="text-xl font-black text-gray-900">৳{item.price}</p>
                        </div>

                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar size={18} />
                                <span className="text-sm">Added on {new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Tag size={18} />
                                <span className="text-sm">Category: {item.category || 'General'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-green-600">
                                <ShieldCheck size={18} />
                                <span className="text-sm font-medium">Verified Inventory</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                        >
                            Close Details
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ViewProductDialog;
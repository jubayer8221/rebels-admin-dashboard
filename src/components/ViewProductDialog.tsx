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
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Dialog Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="glass glass-lg relative w-full max-w-full sm:max-w-xl max-h-[calc(100vh-3rem)] overflow-hidden rounded-3xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-[var(--color-secondary)]/20 rounded-full hover:bg-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)] text-[var(--color-text-secondary)] transition-all duration-200"
                    >
                        <X size={18} />
                    </button>

                    <div className="h-48 bg-[var(--color-bg-secondary)]">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{item.name}</h3>
                                <p className="text-[var(--color-secondary)] font-semibold">{item.brand}</p>
                            </div>
                            <p className="text-xl font-black text-[var(--color-text-primary)]">৳{item.price}</p>
                        </div>

                        <div className="space-y-4 border-t border-[var(--color-border)] pt-6">
                            <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                                <Calendar size={18} />
                                <span className="text-sm">Added on {new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                                <Tag size={18} />
                                <span className="text-sm">Category: {item.category || 'General'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[var(--color-success)]">
                                <ShieldCheck size={18} />
                                <span className="text-sm font-medium">Verified Inventory</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-8 py-4 bg-[var(--color-secondary)] text-white rounded-2xl font-bold hover:bg-[var(--color-secondary-hover)] hover:shadow-lg hover:shadow-[var(--color-secondary)]/20 transition-all duration-200 active:scale-95"
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
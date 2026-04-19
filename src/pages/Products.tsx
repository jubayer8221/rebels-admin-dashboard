/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import ProductForm from './ProductForm';
import { Plus, Edit3, Trash2, Loader2, X, Eye, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getPaddingX, getPaddingY, getMarginBottom, getGap, getMarginTop } from '../utils/designTokens';

const Products = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.products);
    const { isDark, compactMode } = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const openView = (product: any) => { setSelectedProduct(product); setIsViewModalOpen(true); };
    const handleEdit = (product: any) => { setSelectedProduct(product); setIsModalOpen(true); };
    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to remove ${name}?`)) {
            await dispatch(deleteProduct(id));
        }
    };

    // Theme-aware style tokens - using CSS variables instead of manual checks
    const surface = 'bg-[var(--color-bg-primary)] border-[var(--color-border)]';
    const surfaceAlt = 'bg-[var(--color-bg-primary)] border-[var(--color-border)]';
    const rowHover = 'hover:bg-[var(--color-bg-secondary)]';
    const headText = 'text-[var(--color-text-tertiary)]';
    const bodyText = 'text-[var(--color-text-primary)]';
    const subText = 'text-[var(--color-text-secondary)]';
    const divideColor = 'divide-[var(--color-border)]';
    const borderColor = 'border-[var(--color-border)]';
    const overlayBg = 'bg-[var(--color-bg-primary)]/80';
    const px = compactMode ? getPaddingX('md') : getPaddingX('xl');
    const cellPy = compactMode ? getPaddingY('sm') : getPaddingY('lg');

    return (
        <div className={`max-w-full mx-auto ${getMarginBottom('xl')} text-(--color-text-primary)`}>

            {/* Header */}
            <div className={`flex flex-col md:flex-row justify-between items-end border-b ${getPaddingY('xl')} ${borderColor}`}>
                <div>
                    <h1 className={`text-5xl font-serif italic leading-tight ${bodyText}`}>Catalog</h1>
                    <p className={`font-medium tracking-[.2em] uppercase text-[10px] mt-2 flex items-center gap-2 ${subText}`}>
                        <ShieldCheck size={14} /> Authorized Inventory Access
                    </p>
                </div>
                <button
                    onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
                    className={`${getMarginTop('lg')} text-white ${getPaddingX('xl')} ${getPaddingY('sm')} rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center ${getGap('sm')} active:scale-95 hover:opacity-90`}
                    style={{ backgroundColor: 'var(--accent)' }}
                >
                    <Plus size={16} /> Add New Entry
                </button>
            </div>

            {/* Product Table */}
            <div className={`rounded-2xl border shadow-sm overflow-hidden ${surface}`}>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full text-left border-collapse">
                        <thead className={isDark ? 'bg-[#111]' : 'bg-gray-50/50'}>
                            <tr>
                                {['Product Item', 'Inventory Status', 'Pricing', 'Actions'].map(h => (
                                    <th key={h} className={`${px} ${getPaddingY('lg')} text-[10px] font-bold uppercase tracking-widest ${headText} ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`${divideColor} divide-y`}>
                            {loading && items.length === 0 ? (
                                <tr><td colSpan={4} className={`${getPaddingY('xl')} text-center`}>
                                    <Loader2 className={`animate-spin mx-auto ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                                </td></tr>
                            ) : items.map((product: any) => (
                                <tr key={product.id} className={`${rowHover} group transition-colors`}>
                                    <td className={`${px} ${cellPy}`}>
                                        <div className="flex items-center gap-6">
                                            <div className={`${compactMode ? 'w-10 h-10' : 'w-14 h-14'} rounded-lg overflow-hidden border ${isDark ? 'bg-[#111] border-[#333]' : 'bg-gray-100 border-gray-100'}`}>
                                                {product.imageUrl && <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className={`font-serif ${compactMode ? 'text-base' : 'text-lg'} leading-none mb-1 ${bodyText}`}>{product.name}</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-tighter ${subText}`}>{product.brand} — {product.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`${px} ${cellPy}`}>
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{product.stock} in stock</span>
                                            <span className={`text-[10px] font-medium uppercase tracking-widest ${subText}`}>Size {product.size} / {product.color}</span>
                                        </div>
                                    </td>
                                    <td className={`${px} ${cellPy}`}>
                                        <div className="flex flex-col">
                                            <span className={`text-md font-bold ${bodyText}`}>৳{product.discount}</span>
                                            <span className={`text-xs line-through tracking-tighter ${subText}`}>৳{product.price}</span>
                                        </div>
                                    </td>
                                    <td className={`${px} ${cellPy}`}>
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => openView(product)}
                                                className={`p-2.5 rounded-lg transition-all ${isDark ? 'text-gray-500 hover:text-[--accent] hover:bg-[--accent-subtle]' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                                title="View Details"><Eye size={18} /></button>
                                            <button onClick={() => handleEdit(product)}
                                                className={`p-2.5 rounded-lg transition-all ${isDark ? 'text-gray-500 hover:text-gray-200 hover:bg-[#333]' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                                                title="Edit"><Edit3 size={18} /></button>
                                            <button onClick={() => handleDelete(product.id, product.name)}
                                                className={`p-2.5 rounded-lg transition-all ${isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-950/30' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
                                                title="Delete"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VIEW MODAL */}
                {isViewModalOpen && selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <div className={`absolute inset-0 backdrop-blur-sm ${overlayBg}`} onClick={() => setIsViewModalOpen(false)} />
                        <div className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${surfaceAlt} border`}>
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className={`text-3xl font-serif italic ${bodyText}`}>{selectedProduct.name}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-[.3em]" style={{ color: 'var(--accent)' }}>{selectedProduct.brand} Premium Wear</p>
                                    </div>
                                    <button onClick={() => setIsViewModalOpen(false)} className={`${subText} hover:${bodyText}`}><X size={20} /></button>
                                </div>

                                <div className={`grid grid-cols-2 gap-4 border-y py-6 ${borderColor}`}>
                                    {[
                                        { label: 'Fabric', value: selectedProduct.fabric },
                                        { label: 'Category ID', value: selectedProduct.categoryId },
                                        { label: 'Gender', value: selectedProduct.genderID },
                                        { label: 'Current Stock', value: selectedProduct.stock },
                                        { label: 'Size/Fit', value: `${selectedProduct.size} / ${selectedProduct.type}` },
                                    ].map(item => (
                                        <div key={item.label} className="space-y-1">
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${subText}`}>{item.label}</p>
                                            <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.value || 'N/A'}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className={`flex justify-between items-center p-4 rounded-xl ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>Pricing Model</div>
                                    <div className="text-right">
                                        <p className={`text-2xl font-bold ${bodyText}`}>৳{selectedProduct.discount}</p>
                                        <p className={`text-xs line-through ${subText}`}>MSRP ৳{selectedProduct.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FORM MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <div className={`absolute inset-0 backdrop-blur-md ${isDark ? 'bg-black/70' : 'bg-gray-900/60'}`} onClick={() => setIsModalOpen(false)} />
                        <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border ${surface}`}>
                            <div className={`p-6 border-b flex justify-between items-center ${borderColor}`}>
                                <h2 className={`text-xl font-bold tracking-tight ${bodyText}`}>{selectedProduct ? 'Edit Product' : 'New Entry'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className={`p-2 transition-all ${subText} hover:${bodyText}`}><X size={20} /></button>
                            </div>
                            <div className="p-8 max-h-[70vh] overflow-y-auto">
                                <ProductForm initialData={selectedProduct} onClose={() => { setIsModalOpen(false); dispatch(fetchProducts()); }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Products;
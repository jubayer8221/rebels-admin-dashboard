/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import ProductForm from './ProductForm';
import { Plus, Edit3, Trash2, Loader2, X, Eye, ShieldCheck, Shirt, Info } from 'lucide-react';

const Products = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.products);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const openView = (product: any) => {
        setSelectedProduct(product);
        setIsViewModalOpen(true);
    };

    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to remove ${name}?`)) {
            await dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="max-w-full mx-auto space-y-10">
            {/* Header: Classy Serif + Clean Sans */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-8">
                <div>
                    <h1 className="text-5xl font-serif italic text-gray-900 leading-tight">Catalog</h1>
                    <p className="text-gray-500 font-medium tracking-[.2em] uppercase text-[10px] mt-2 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-gray-400" /> Authorized Inventory Access
                    </p>
                </div>
                <button
                    onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
                    className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-700 transition-all flex items-center gap-2 active:scale-95"
                >
                    <Plus size={16} /> Add New Entry
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product Item</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Inventory Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Pricing</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading && items.length === 0 ? (
                            <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-gray-300" /></td></tr>
                        ) : items.map((product: any) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 group transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                            {product.imageUrl && <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-serif text-lg text-gray-900 leading-none mb-1">{product.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{product.brand} — {product.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-gray-700">{product.stock} in stock</span>
                                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Size {product.size} / {product.color}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-md font-bold text-gray-900">৳{product.discount}</span>
                                        <span className="text-xs text-gray-400 line-through tracking-tighter">৳{product.price}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => openView(product)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details"><Eye size={18} /></button>
                                        <button onClick={() => handleEdit(product)} className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" title="Edit"><Edit3 size={18} /></button>
                                        <button onClick={() => handleDelete(product.id, product.name)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- VIEW MODAL --- */}
            {isViewModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-serif italic text-gray-900">{selectedProduct.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[.3em] text-blue-600">{selectedProduct.brand} Premium Wear</p>
                                </div>
                                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-6">
                                <DetailItem label="Fabric" value={selectedProduct.fabric} icon={<Shirt size={14} />} />
                                <DetailItem label="Material" value={selectedProduct.material} icon={<Info size={14} />} />
                                <DetailItem label="Category ID" value={selectedProduct.categoryId} />
                                <DetailItem label="Gender" value={selectedProduct.genderID} />
                                <DetailItem label="Current Stock" value={selectedProduct.stock} />
                                <DetailItem label="Size/Fit" value={`${selectedProduct.size} / ${selectedProduct.type}`} />
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <div className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Pricing Model</div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">৳{selectedProduct.discount}</p>
                                    <p className="text-xs text-gray-400 line-through">MSRP ৳{selectedProduct.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- FORM MODAL (ADD/EDIT) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{selectedProduct ? 'Edit Product' : 'New Entry'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-all"><X size={20} /></button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <ProductForm initialData={selectedProduct} onClose={() => { setIsModalOpen(false); dispatch(fetchProducts()); }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper component for View Modal
const DetailItem = ({ label, value, icon }: { label: string, value: any, icon?: any }) => (
    <div className="space-y-1">
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1">
            {icon} {label}
        </p>
        <p className="text-sm font-semibold text-gray-800">{value || "N/A"}</p>
    </div>
);

export default Products;
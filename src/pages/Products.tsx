/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import ProductForm from './ProductForm';
import { Plus, Edit3, Trash2, Loader2, X, PackageOpen, AlertTriangle } from 'lucide-react';

const Products = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.products);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // --- PROCEED WITH CONFIRM: EDIT ---
    const handleEdit = (product: any) => {
        const confirmEdit = window.confirm(`Open editor for "${product.name}"?`);
        if (confirmEdit) {
            setSelectedProduct(product);
            setIsModalOpen(true);
        }
    };

    // --- PROCEED WITH CONFIRM: DELETE ---
    const handleDelete = async (id: number, name: string) => {
        // Using a template literal for a clear, bold message
        const confirmDelete = window.confirm(
            "REBELS INVENTORY SYSTEM\n" +
            "----------------------------\n" +
            `Are you sure you want to PERMANENTLY delete:\n"${name}"?\n\n` +
            "This action cannot be undone."
        );

        if (confirmDelete) {
            await dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Inventory</h1>
                    <p className="text-gray-600 font-bold text-xs uppercase tracking-[0.2em] mt-1">Live Product Management</p>
                </div>
                <button
                    onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
                    className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-blue-200/20 active:scale-95"
                >
                    <Plus size={18} strokeWidth={3} /> Add Product
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Product</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Attributes</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Pricing</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading && items.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-40 text-center">
                                        <Loader2 className="animate-spin mx-auto text-blue-600 mb-6" size={48} strokeWidth={1} />
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Accessing Server Resources...</p>
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-40 text-center text-gray-300">
                                        <PackageOpen className="mx-auto mb-6 opacity-10" size={80} />
                                        <p className="font-black uppercase text-xs tracking-widest text-gray-600">Warehouse is empty</p>
                                    </td>
                                </tr>
                            ) : (
                                items.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-gray-50/80 transition-all group">
                                        <td className="px-10 py-7">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 bg-gray-100 rounded-3xl shrink-0 overflow-hidden border border-gray-100 group-hover:scale-105 transition-all duration-500 shadow-sm">
                                                    {product.imageUrl ? (
                                                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[9px] font-black text-gray-300 uppercase italic">No Media</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-md  leading-none mb-2">{product.name}</p>
                                                    <span className="bg-gray-800 text-white text-[11px] font-black px-2 py-1 rounded-md uppercase ">SKU: {product.productId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-black rounded-xl uppercase shadow-sm">Size {product.size}</span>
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-black rounded-xl uppercase shadow-sm">{product.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <p className="font-bold text-gray-900 text-md ">৳{Number(product.price).toLocaleString()}</p>
                                            <p className="font-bold text-gray-900 text-md ">৳{Number(product.discount).toLocaleString()}</p>

                                            <p className="text-[10px] text-green-600 font-black uppercase mt-1 tracking-tighter">{product.stock} in stock</p>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <div className="flex justify-end gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all active:scale-90 bg-gray-50 group-hover:bg-white"
                                                    title="Modify Record"
                                                >
                                                    <Edit3 size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="p-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all active:scale-90 bg-gray-50 group-hover:bg-white"
                                                    title="Destroy Record"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                                    {selectedProduct ? 'Update Item' : 'New Entry'}
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <AlertTriangle size={12} className="text-orange-500" />
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Verify all specifications before saving</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-full text-gray-600 transition-all shadow-sm active:scale-90 bg-gray-50">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <ProductForm
                                initialData={selectedProduct}
                                onClose={() => {
                                    setIsModalOpen(false);
                                    dispatch(fetchProducts());
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
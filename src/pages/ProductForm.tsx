/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createUpdateProduct } from '../features/products/productSlice';
import { Save, Package, Layers, Image as ImageIcon, Info, Tag } from 'lucide-react';

interface Product {
    id?: number;
    productId?: number;
    name?: string;
    description?: string;
    price?: number;
    discount?: number;
    stock?: number;
    categoryId?: number;
    fabric?: string;
    color?: string;
    size?: string;
    type?: string;
    brand?: string;
    material?: string;
    careInstructions?: string;
    genderID?: string;
    imageUrl?: string;
}

interface ProductFormProps {
    initialData?: Product;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onClose }) => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.products);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Initialize formData with initialData (no setState in useEffect)
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price?.toString() || '',
        discount: initialData?.discount?.toString() || '0',
        stock: initialData?.stock?.toString() || '0',
        categoryId: initialData?.categoryId?.toString() || '1',
        fabric: initialData?.fabric || '',
        color: initialData?.color || '',
        size: initialData?.size || 'M',
        type: initialData?.type || '',
        brand: initialData?.brand || 'Rebels',
        material: initialData?.material || '',
        careInstructions: initialData?.careInstructions || '',
        genderID: initialData?.genderID || 'Male',
        imageUrl: initialData?.imageUrl || ''
    });

    // Safe: Only update previewUrl when initialData changes
    useEffect(() => {
        if (initialData?.imageUrl) {
            setPreviewUrl(initialData.imageUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [initialData?.imageUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        // Mapping to .NET Entity
        data.append('Id', (initialData?.id || 0).toString());
        data.append('ProductId', (initialData?.productId || 0).toString());

        // Append all text fields from state (fixed: no 'any')
        Object.keys(formData).forEach((key) => {
            const value = (formData as Record<string, string>)[key];
            data.append(key.charAt(0).toUpperCase() + key.slice(1), value);
        });

        if (selectedFile) {
            data.append('ImageFile', selectedFile);
        }

        const result = await dispatch(createUpdateProduct(data));
        if (createUpdateProduct.fulfilled.match(result)) {
            onClose();
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50/50 focus:bg-white";
    const labelClass = "text-[11px] font-bold text-gray-500 mb-1 block uppercase tracking-tight";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[85vh] overflow-y-auto px-4 custom-scrollbar">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">{error}</div>}

            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4 py-2">
                <div className="w-32 h-32 bg-gray-100 rounded-[2rem] border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center relative group">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="text-gray-300" size={32} />
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <span className="text-white text-[10px] font-bold uppercase">Change</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
            </div>

            {/* 1. Core Details */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Package size={14} /> Core Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className={labelClass}>Product Name *</label>
                        <input required className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Price (BDT) *</label>
                        <input required type="number" step="0.01" className={inputClass} value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Discount</label>
                        <input type="number" step="0.01" className={inputClass} value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* 2. Categorization & Identity */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Tag size={14} /> Categorization
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Category ID</label>
                        <input type="number" className={inputClass} value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Brand</label>
                        <input className={inputClass} value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Product Type</label>
                        <input className={inputClass} placeholder="e.g. Slim Fit" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* 3. Technical Specs */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Layers size={14} /> Technical Specs
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Stock</label>
                        <input type="number" className={inputClass} value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Size</label>
                        <select className={inputClass} value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })}>
                            <option value="S">Small</option><option value="M">Medium</option><option value="L">Large</option><option value="XL">Extra Large</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Gender</label>
                        <select className={inputClass} value={formData.genderID} onChange={(e) => setFormData({ ...formData, genderID: e.target.value })}>
                            <option value="Male">Male</option><option value="Female">Female</option><option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Fabric</label>
                        <input className={inputClass} value={formData.fabric} onChange={(e) => setFormData({ ...formData, fabric: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Color</label>
                        <input className={inputClass} value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Material</label>
                        <input className={inputClass} value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* 4. Descriptions & Care */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Info size={14} /> Content & Care
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea rows={3} className={inputClass} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Care Instructions</label>
                        <textarea rows={2} className={inputClass} placeholder="Washing instructions..." value={formData.careInstructions} onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white pt-6 pb-2 flex gap-3 border-t border-gray-100">
                <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-4 bg-black text-white rounded-2xl font-bold hover:bg-blue-600 shadow-xl transition-all flex items-center justify-center gap-2">
                    <Save size={18} /> {loading ? 'Syncing...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
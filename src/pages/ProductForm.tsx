import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createUpdateProduct } from '../features/products/productSlice';
import { Save, Package, Layers, Image as ImageIcon, Info, Tag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
    const { isDark, compactMode } = useTheme();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imageUrl ?? null);

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
        careInstructions: initialData?.careInstructions || '',
        genderID: initialData?.genderID || 'Male',
        imageUrl: initialData?.imageUrl || '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Id', (initialData?.id || 0).toString());
        data.append('ProductId', (initialData?.productId || 0).toString());
        Object.keys(formData).forEach((key) => {
            const value = (formData as Record<string, string>)[key];
            data.append(key.charAt(0).toUpperCase() + key.slice(1), value);
        });
        if (selectedFile) data.append('ImageFile', selectedFile);
        const result = await dispatch(createUpdateProduct(data));
        if (createUpdateProduct.fulfilled.match(result)) onClose();
    };

    // Theme-aware tokens
    const py = compactMode ? 'py-2' : 'py-3';
    const inputCls = `w-full border rounded-xl px-3 ${py} text-sm focus:ring-2 focus:ring-[--accent] outline-none transition-all
        ${isDark
            ? 'bg-[#111] border-[#333] text-gray-100 placeholder:text-gray-600 focus:bg-[#1a1a1a] focus:border-[--accent]'
            : 'bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white'}`;
    const labelCls = `text-[11px] font-bold mb-1 block uppercase tracking-tight ${isDark ? 'text-gray-500' : 'text-gray-500'}`;
    const sectionHeadCls = `text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`;
    const borderColor = isDark ? 'border-[#2a2a2a]' : 'border-gray-100';
    const footerBg = isDark ? 'bg-[#1a1a1a]' : 'bg-white';
    const cancelCls = `flex-1 py-4 border rounded-2xl font-bold transition ${isDark ? 'border-[#333] text-gray-400 hover:bg-[#222]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 max-h-[85vh] overflow-y-auto px-1 custom-scrollbar">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">{error}</div>}

            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4 py-2">
                <div className={`w-24 sm:w-32 h-24 sm:h-32 rounded-[2rem] border-2 border-dashed overflow-hidden flex items-center justify-center relative group
                    ${isDark ? 'bg-[#111] border-[#333]' : 'bg-gray-100 border-gray-200'}`}>
                    {previewUrl
                        ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        : <ImageIcon className={isDark ? 'text-gray-600' : 'text-gray-300'} size={24} />
                    }
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <span className="text-white text-[10px] font-bold uppercase">Change</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Core Details */}
            <section className="space-y-3 sm:space-y-4">
                <h3 className={sectionHeadCls}><Package size={14} /> Core Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                        <label className={labelCls}>Product Name *</label>
                        <input required className={inputCls} value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Price (BDT) *</label>
                        <input required type="number" step="0.01" className={inputCls} value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Discount</label>
                        <input type="number" step="0.01" className={inputCls} value={formData.discount}
                            onChange={e => setFormData({ ...formData, discount: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* Categorization */}
            <section className="space-y-3 sm:space-y-4">
                <h3 className={sectionHeadCls}><Tag size={14} /> Categorization</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                        <label className={labelCls}>Category ID</label>
                        <input type="number" className={inputCls} value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Brand</label>
                        <input className={inputCls} value={formData.brand}
                            onChange={e => setFormData({ ...formData, brand: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Product Type</label>
                        <input className={inputCls} placeholder="e.g. Slim Fit" value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* Technical Specs */}
            <section className="space-y-3 sm:space-y-4">
                <h3 className={sectionHeadCls}><Layers size={14} /> Technical Specs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                        <label className={labelCls}>Stock</label>
                        <input type="number" className={inputCls} value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Size</label>
                        <select className={inputCls} value={formData.size}
                            onChange={e => setFormData({ ...formData, size: e.target.value })}>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Gender</label>
                        <select className={inputCls} value={formData.genderID}
                            onChange={e => setFormData({ ...formData, genderID: e.target.value })}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Fabric</label>
                        <input className={inputCls} value={formData.fabric}
                            onChange={e => setFormData({ ...formData, fabric: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Color</label>
                        <input className={inputCls} value={formData.color}
                            onChange={e => setFormData({ ...formData, color: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* Content & Care */}
            <section className="space-y-3 sm:space-y-4">
                <h3 className={sectionHeadCls}><Info size={14} /> Content & Care</h3>
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <label className={labelCls}>Description</label>
                        <textarea rows={3} className={inputCls} value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Care Instructions</label>
                        <textarea rows={2} className={inputCls} placeholder="Washing instructions..." value={formData.careInstructions}
                            onChange={e => setFormData({ ...formData, careInstructions: e.target.value })} />
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className={`sticky bottom-0 pt-4 sm:pt-6 pb-2 flex flex-col sm:flex-row gap-2 sm:gap-3 border-t ${footerBg} ${borderColor}`}>
                <button type="button" onClick={onClose} className={`${cancelCls} py-3 sm:py-4`}>Cancel</button>
                <button type="submit" disabled={loading}
                    className="flex-1 py-3 sm:py-4 text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: 'var(--accent)' }}>
                    <Save size={16} /> {loading ? 'Syncing...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/GetAllProducts');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const createUpdateProduct = createAsyncThunk(
    'products/createUpdate',
    async (productData: any, { rejectWithValue }) => {
        try {
            const response = await api.post(`/CreateUpdateProducts`, productData);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Operation failed");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            // Match your .NET parameter name 'id'
            await api.delete(`/DeleteProducts`, { params: { id } });
            return id; 
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Delete failed");
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: { items: [] as any[], loading: false, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create/Update
            .addCase(createUpdateProduct.pending, (state) => { state.loading = true; })
            .addCase(createUpdateProduct.fulfilled, (state) => { state.loading = false; })
            .addCase(createUpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export default productSlice.reducer;
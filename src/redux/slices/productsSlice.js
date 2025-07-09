import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products as allProductsData } from '../../data/products';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return allProductsData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        productsBasket: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            const { product, selectedSize, selectedColor, quantity } = action.payload;
            
            const existingItem = state.productsBasket
                .find((item) => item.product._id === product._id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);

            if (existingItem) {
                existingItem.quantity += quantity;// Если товар уже есть, увеличиваем его количество
            } else {
                state.productsBasket.push({ product, selectedSize, selectedColor, quantity });
            }
        },
        removeProduct: (state, action) => {
            const { productId, size, color } = action.payload;

            state.productsBasket = state.productsBasket
                .filter((item) => !(item.product._id === productId && item.selectedSize === size && item.selectedColor === color));
        },
        updateQuantity: (state, action) => {
            const { productId, size, color, newQuantity } = action.payload;

            const itemToUpdate = state.productsBasket
                .find(item => item.product._id === productId && item.selectedSize === size && item.selectedColor === color);

            if (itemToUpdate) {
                if (newQuantity <= 0) { // Если количество становится 0 или меньше, удаляем товар
                    state.productsBasket = state.productsBasket
                        .filter(item => !(item.product._id === productId && item.selectedSize === size && item.selectedColor === color));
                } else {
                    itemToUpdate.quantity = newQuantity;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.items = [];
            });
    },
});

export const { addProduct, removeProduct, updateQuantity } = productsSlice.actions;

export default productsSlice.reducer;
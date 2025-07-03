import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products as allProductsData } from '../../data/products';
import { filterByBrand, filterByCategory, filterByColor, filterByGender, filterByMaterial, filterByPrice, filterBySearch, filterBySize, sortProducts } from '../utils/productFilters';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    // Теперь этот thunk просто загружает ВСЕ продукты, без фильтров
    async (_, { rejectWithValue }) => {
        try {
            // Здесь в реальном приложении был бы API-вызов для получения всех продуктов
            // const response = await fetch('/api/products');
            // const data = await response.json();
            // return data;
            // Для примера просто возвращаем ваши статические данные
            return allProductsData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     (filters, { rejectWithValue }) => {
//         try {
//             let filtered = [...allProductsData];

//             filtered = filterByGender(filtered, filters.gender);
//             filtered = filterByCategory(filtered, filters.category);
//             filtered = filterByPrice(filtered, filters.minPrice, filters.maxPrice);
//             filtered = filterByColor(filtered, filters.color);
//             filtered = filterBySize(filtered, filters.size);
//             filtered = filterByMaterial(filtered, filters.material);
//             filtered = filterByBrand(filtered, filters.brand);
//             filtered = filterBySearch(filtered, filters.searchTerm);

//             filtered = sortProducts(filtered, filters.sortBy);

//             return filtered;
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     }
// );

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],// Здесь будут храниться ВСЕ продукты после успешной загрузки
        status: 'idle',
        error: null,
        // currentFilters: {
        //     gender: '',
        //     category: '',
        //     sortBy: '',
        //     minPrice: 0,
        //     maxPrice: 100,
        //     color: '',
        //     size: [],
        //     material: [],
        //     brand: [],
        //     searchTerm: '',
        // }
    },
    reducers: {
        // Обычные функции для изменения состояния (синхронные)
    //     setFilter: (state, action) => {
    //         // Обновляем фильтры, сохраняя старые и добавляя новые из action.payload
    //         state.currentFilters = {
    //             ...state.currentFilters,
    //             ...action.payload,
    //         };
    //     },
    //     resetFilters: (state) => {
    //         // Сбрасываем фильтры к начальным значениям
    //         state.currentFilters = {
    //             gender: '',
    //             category: '',
    //             sortBy: '',
    //             minPrice: 0,
    //             maxPrice: 100,
    //             color: '',
    //             size: [],
    //             material: [],
    //             brand: [],
    //             searchTerm: '',
    //         };
    //     }
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

// export const { setFilter, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "../../components/products/ProductGrid";
import SortOptions from "./SortOptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { filterByBrand, filterByCategory, filterByColor, filterByGender, filterByMaterial, filterByPrice, filterBySearch, filterBySize, sortProducts } from "../../redux/utils/productFilters";


export default function CollectionPage() {
    const { category: urlCategory } = useParams(); // Получаем параметр из URL: 'men', 'women', 'all'
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams(); // Получаем searchParams здесь
    // Получаем ВСЕ продукты из Redux. Они будут загружены один раз.
    const allProducts = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    // Локальное состояние для активных фильтров. Это главный пункт изменения.
    const [activeFilters, setActiveFilters] = useState({
        gender: '',
        category: '',
        sortBy: '',// Это значение будет синхронизироваться с URL
        minPrice: 0,
        maxPrice: 100,
        color: '',
        size: [],
        material: [],
        brand: [],
        searchTerm: '', // Если у вас есть функционал поиска
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {// Эффект для первоначальной загрузки ВСЕХ продуктов
        if (status === 'idle') { // Загружаем только если продукты еще не загружены
            dispatch(fetchProducts());
        }
    }, [dispatch, status]); // Зависимости: dispatch и status

    // Эффект для обновления фильтра по полу при изменении URL-параметра
    useEffect(() => {
        let genderFromUrl = '';
        if (urlCategory) {
            const normalizedUrlCategory = urlCategory.toLowerCase();
            if (normalizedUrlCategory === 'men') {
                genderFromUrl = 'Men';
            } else if (normalizedUrlCategory === 'women') {
                genderFromUrl = 'Women';
            }
            // Если urlCategory === 'all', genderFromUrl останется пустой строкой, что и нужно
        }

        // Получаем sortBy из URL-параметров
        const sortByFromUrl = searchParams.get("sortBy") || '';

        // Обновляем только гендерный фильтр и сбрасываем категорию (т.к. она не в URL)
        // Остальные фильтры (цена, цвет и т.д.) сохраняются из предыдущего состояния
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            gender: genderFromUrl,
            category: '', // Сбрасываем категорию, чтобы избежать конфликтов с URL-фильтром
            sortBy: sortByFromUrl,
        }));
    }, [urlCategory, searchParams]); // Зависимость: urlCategory

    // Мемоизированная функция для применения всех фильтров к продуктам
    // Она будет пересчитываться только тогда, когда изменятся allProducts или activeFilters
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts]; // Начинаем с полного списка продуктов
        // Применяем фильтры из локального состояния `activeFilters`
        filtered = filterByGender(filtered, activeFilters.gender);
        filtered = filterByCategory(filtered, activeFilters.category); // Категория из сайдбара
        filtered = filterByPrice(filtered, activeFilters.minPrice, activeFilters.maxPrice);
        filtered = filterByColor(filtered, activeFilters.color);
        filtered = filterBySize(filtered, activeFilters.size);
        filtered = filterByMaterial(filtered, activeFilters.material);
        filtered = filterByBrand(filtered, activeFilters.brand);
        filtered = filterBySearch(filtered, activeFilters.searchTerm);

        filtered = sortProducts(filtered, activeFilters.sortBy);

        return filtered;
    }, [allProducts, activeFilters]); // Зависимости для useMemo

    // Функции для управления сайдбаром
    const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

    const handleApplyFilters = useCallback((newFilters) => {
        // Применяем новые фильтры, полученные из FilterSidebar
        setActiveFilters(prev => ({
            ...newFilters,
            gender: prev.gender, // Сохраняем гендер из URL
            sortBy: prev.sortBy // Сохраняем sortBy из URL
        }));
        // setActiveFilters(newFilters);
        setIsSidebarOpen(false);
    }, []);

    const handleResetFilters = useCallback(() => {
        // Сбрасываем все фильтры, кроме `gender`, который управляется URL
        setActiveFilters(prevFilters => ({
            gender: prevFilters.gender, // Сохраняем гендер, заданный URL
            category: '',
            sortBy: prevFilters.sortBy, // Сохраняем sortBy из URL
            minPrice: 0,
            maxPrice: 100,
            color: '',
            size: [],
            material: [],
            brand: [],
            searchTerm: '',
        }));
        setIsSidebarOpen(false);
    }, []);

    // Закрытие сайдбара по клику вне его
    const handleClickOutside = useCallback((e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    // Определение заголовка страницы
    const pageTitle = urlCategory === 'men'
        ? 'Men Collection'
        : urlCategory === 'women'
            ? 'Women Collection'
            : 'All Collection'; // Если urlCategory 'all' или отсутствует

    return (
        <div className="flex flex-col lg:flex-row">
            <button
                onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center"
            >
                <FaFilter className="mr-2" /> Filters
            </button>

            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar
                    filters={activeFilters} // Передаем локальное состояние фильтров
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                />
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">{pageTitle}</h2>

                <SortOptions
                    // Передаем текущее значение сортировки и функцию для его изменения
                    // currentSort={activeFilters.sortBy}
                    // onSortChange={(sortValue) => setActiveFilters(prev => ({ ...prev, sortBy: sortValue }))}
                />

                {status === 'loading' && <p>Loading products...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && filteredAndSortedProducts.length === 0 && <p>No products found.</p>}
                {status === 'succeeded' && filteredAndSortedProducts.length > 0 && (
                    <ProductGrid products={filteredAndSortedProducts} />
                )}
            </div>
        </div>
    );
}


// export default function CollectionPage() {
//     const { category: urlCategory } = useParams();// Получаем параметр из URL: 'men', 'women', 'all'
//     const dispatch = useDispatch();
//     const { items, status, error, currentFilters } = useSelector(state => state.products);

//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const sidebarRef = useRef(null);

//     useEffect(() => {
//         const filtersToFetch = {
//             ...currentFilters,
//             gender: urlCategory ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1) : currentFilters.gender,
//         };
//         dispatch(fetchProducts(filtersToFetch));
//     }, [dispatch, urlCategory, currentFilters]);

//     const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

//     const handleApplyFilters = useCallback((newFilters) => {
//         dispatch(setFilter(newFilters));
//         setIsSidebarOpen(false);
//     }, [dispatch]);

//     const handleResetFilters = useCallback(() => {
//         dispatch(resetFilters());
//         setIsSidebarOpen(false);
//     }, [dispatch]);

//     const handleClickOutside = useCallback((e) => {
//         if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//             setIsSidebarOpen(false);
//         }
//     }, []);

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [handleClickOutside]);

//     const pageTitle = urlCategory
//         ? `${urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)} Collection`
//         : "All Collection";

//     return (
//         <div className="flex flex-col lg:flex-row">
//             <button
//                 onClick={toggleSidebar}
//                 className="lg:hidden border p-2 flex justify-center items-center"
//             >
//                 <FaFilter className="mr-2" /> Filters
//             </button>

//             <div
//                 ref={sidebarRef}
//                 className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
//             >
//                 <FilterSidebar
//                     filters={currentFilters}
//                     onApplyFilters={handleApplyFilters}
//                     onResetFilters={handleResetFilters}
//                 />
//             </div>

//             <div className="flex-grow p-4">
//                 <h2 className="text-2xl uppercase mb-4">
//                     {pageTitle}
//                     {/* {urlCategory ? `${urlCategory} Collection` : "All Collection"} */}
//                 </h2>

//                 <SortOptions />

//                 {status === 'loading' && <p>Loading products...</p>}
//                 {status === 'failed' && <p>Error: {error}</p>}
//                 {status === 'succeeded' && items.length === 0 && <p>No products found.</p>}
//                 {status === 'succeeded' && items.length > 0 && (
//                     <ProductGrid products={items} />
//                 )}
//             </div>
//         </div>
//     );
// }
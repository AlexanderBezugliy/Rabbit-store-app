import { useEffect, useState } from 'react';

const FilterSidebar = ({ filters, onApplyFilters, onResetFilters }) => {
    const [localFilter, setLocalFilter] = useState(filters);

    useEffect(() => {
        setLocalFilter(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLocalFilter(prev => {
            if (type === 'checkbox') {
                const current = prev[name] || [];
                return {
                    ...prev,
                    [name]: checked
                        ? [...current, value]
                        : current.filter(v => v !== value)
                };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleColorChange = (colorValue) => {
        setLocalFilter(prev => ({
            ...prev,
            color: prev.color === colorValue ? "" : colorValue
        }));
    };

    const handlePriceRangeChange = (e) => {
        setLocalFilter(prev => ({
            ...prev,
            maxPrice: Number(e.target.value)
        }));
    };

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
    const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "Chic Style"];

    return (
        <div className="p-4 w-[95%]">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Category</label>
                {categories.map(cat => (
                    <div key={cat} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            onChange={handleChange}
                            checked={localFilter.category === cat}
                            className="mr-2 h-4 w-4"
                        />
                        <span>{cat}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => handleColorChange(c)}
                            className={`w-8 h-8 rounded-full border ${localFilter.color === c ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: c.toLowerCase() }}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Size</label>
                {sizes.map(s => (
                    <div key={s} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="size"
                            value={s}
                            onChange={handleChange}
                            checked={localFilter.size?.includes(s)}
                            className="mr-2 h-4 w-4"
                        />
                        <span>{s}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Material</label>
                {materials.map(m => (
                    <div key={m} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="material"
                            value={m}
                            onChange={handleChange}
                            checked={localFilter.material?.includes(m)}
                            className="mr-2 h-4 w-4"
                        />
                        <span>{m}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Brand</label>
                {brands.map(b => (
                    <div key={b} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="brand"
                            value={b}
                            onChange={handleChange}
                            checked={localFilter.brand?.includes(b)}
                            className="mr-2 h-4 w-4"
                        />
                        <span>{b}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Price Range</label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={localFilter.maxPrice || 100}
                    onChange={handlePriceRangeChange}
                    className="w-full"
                />
                <div className="text-sm mt-1">${localFilter.minPrice || 0} - ${localFilter.maxPrice || 100}</div>
            </div>

            <div className="flex flex-col gap-1 justify-between">
                <button
                    onClick={() => onApplyFilters(localFilter)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Apply Filters
                </button>
                <button
                    onClick={onResetFilters}
                    className="border border-gray-400 px-4 py-2 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
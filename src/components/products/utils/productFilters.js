//FILTERS
export const filterByGender = (products, gender) => {
    if (!gender) return products;
    return products.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase());
};

export const filterByCategory = (products, category) => {
    if (!category) return products;

    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const filterByPrice = (products, minPrice, maxPrice) => {
    return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
};

export const filterByColor = (products, color) => {
    if (!color) return products;

    return products.filter(p => p.colors.includes(color));
};

export const filterBySize = (products, sizes) => {
    if (!sizes || sizes.length === 0) return products;

    return products.filter(p => sizes.some(size => p.sizes.includes(size)));
};

export const filterByMaterial = (products, materials) => {
    if (!materials || materials.length === 0) return products;

    return products.filter(p => materials.includes(p.material));
};

export const filterByBrand = (products, brands) => {
    if (!brands || brands.length === 0) return products;

    return products.filter(p => brands.includes(p.brand));
};

export const filterBySearch = (products, searchTerm) => {
    if (!searchTerm) return products;

    const term = searchTerm.toLowerCase();

    return products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
    );
};

export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    if (sortBy === 'priceAsc') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
        sorted.sort((a, b) => {
            const scoreA = (a.rating || 0) * (a.numReviews || 0);
            const scoreB = (b.rating || 0) * (b.numReviews || 0);
            return scoreB - scoreA;
        });
    }

    return sorted;
};
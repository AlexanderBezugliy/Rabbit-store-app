import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductsDetails from './ProductsDetails';

const ProductDetailPage = () => {
    const { productId } = useParams(); // Получаем productId из URL

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        // Для вашего случая, просто ищем продукт в локальных данных
        const foundProduct = products.find(p => p._id === parseInt(productId)); // _id у вас числовой

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError('Product not found.');
        }
        setLoading(false);

    }, [productId]); // Перезапускаем эффект при изменении productId

    if (loading) return <div className="text-center p-8">Loading product details...</div>;
    if (error) return <div className="text-center p-8 text-red-600">{error}</div>;
    if (!product) return <div className="text-center p-8">No product selected or found.</div>;

    // Передаем найденный продукт в ProductsDetails
    return <ProductsDetails product={product} />;
}

export default ProductDetailPage
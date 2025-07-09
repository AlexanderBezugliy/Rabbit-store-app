import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductsDetails from './ProductsDetails';
import { useSelector } from 'react-redux';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const allProducts = useSelector((state) => state.products.items);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setProduct(null);

        const numericProductId = parseInt(productId, 10);

        if (isNaN(numericProductId)) {
            setError('Invalid product ID.');
            setLoading(false);
            return;
        }

        const foundProduct = allProducts.find(p => p._id === numericProductId);

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError('Product not found.');
        }
        setLoading(false);

    }, [productId, allProducts]);

    if (loading) return <div className="text-center p-8">Loading product details...</div>;
    if (error) return <div className="text-center p-8 text-red-600">{error}</div>;
    if (!product) return <div className="text-center p-8">No product selected or found.</div>;


    return (
        <ProductsDetails
            product={product}
        />
    );
}

export default ProductDetailPage
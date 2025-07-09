import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Hero from './components/Hero';
import GenderCollectionSection from './components/products/GenderCollectionSection';
import NewArrivals from './components/products/NewArrivals';
import { products } from './data/products';
import ProductGrid from './components/products/ProductGrid';
import FeaturedCollection from './components/FeaturedCollection';
import FeaturesSection from './components/FeaturesSection';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CollectionPage from './pages/collection/Collection';
import ProductDetailPage from './components/products/ProductDetailPage';
import BestSellers from './components/BestSellers';
import { Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/slices/productsSlice';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const womenGrid = products.slice(20, 24);

    return (
        <>
            <Toaster position="top-right" richColors />

            <Header />
            <Routes>
                <Route path="/" element={
                    <>
                        <Hero />
                        {/* PRODUCTS */}
                        <GenderCollectionSection />
                        <NewArrivals />

                        {/* best seller */}
                        <BestSellers />
                        {/* Top Wears for Women */}
                        <div className='container mx-auto'>
                            <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
                            <ProductGrid products={womenGrid} />
                        </div>

                        <FeaturedCollection />
                        <FeaturesSection />
                    </>
                } />
                <Route path="/collections/:category" element={<CollectionPage />} />
                {/* SINGLE PRODUCT DITA  /product/1, /product/2 и т.д.*/}
                <Route path="/product/:productId" element={<ProductDetailPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App

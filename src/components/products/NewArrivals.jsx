import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { products } from '../../data/products.js'
import { Link } from 'react-router-dom';


const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    //отслеживание скролла;
    const scroll = (direction) => {
        const amount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        setTimeout(updateScrollButtons, 300);
    };
    //автообновление состояния после скролла.
    useEffect(() => {
        updateScrollButtons();
        const container = scrollRef.current;
        container.addEventListener('scroll', updateScrollButtons);

        return () => {
            container.removeEventListener('scroll', updateScrollButtons);
        };
    }, []);

    return (
        <section className="py-10 px-4">
            <div className="container mx-auto text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Explore New Arrivals</h2>
                <p className="text-gray-600">Discover the latest styles freshly added to the store.</p>
            </div>

            {/* SCROLL Buttons */}
            <div className="flex justify-end container mx-auto mb-4 space-x-2">
                <button
                    onClick={() => scroll('left')}
                    className={`p-2 border rounded ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    disabled={!canScrollLeft}
                >
                    <FiChevronLeft className="text-xl" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`p-2 border rounded ${canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    <FiChevronRight className="text-xl" />
                </button>
            </div>

            {/* SCROLL CARDS */}
            <div
                ref={scrollRef}
                className="container mx-auto flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide"
            >
                {products.slice(7, 13).map((item) => (
                    <div key={item._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img
                            src={item.images[0]?.url}
                            alt={item.images[0]?.altText || item.name}
                            className='w-full h-[500px] object-cover rounded-lg'
                            draggable={false}
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <Link to={`/product/${item._id}`} className='block' >
                                <h4 className='font-medium'>{item.name}</h4>
                                <p className='mt-1'>${item.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals
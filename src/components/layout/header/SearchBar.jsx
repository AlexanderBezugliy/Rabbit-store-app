import React, { useEffect, useRef, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const allProducts = useSelector((state) => state.products.items);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (searchTerm.length > 1) { 
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]); 
        }
    }, [searchTerm, allProducts]);

    // Обработчик для закрытия при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
                setSearchResults([]);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm('');
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        setIsOpen(false);
        setSearchTerm('');
        setSearchResults([]);
    }

    const handleProductClick = (productId) => {
        setIsOpen(false); 
        setSearchTerm(''); 
        setSearchResults([]); 
        navigate(`/product/${productId}`); 
    }

    return (
        <div
            ref={searchBarRef}  
            className={`flex items-center justify-center w-full transition-all duration-150 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-28 z-50 md:h-32" : "w-auto"}`}>
            {isOpen ? (
                <form
                    onSubmit={handleSearchSubmit} 
                    className='relative flex flex-col items-center justify-center w-full px-4' 
                >
                    <div className='relative w-full max-w-xl'> 
                        <input
                            type="text"
                            placeholder='Search for products...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='bg-gray-100 px-4 py-2 pl-2 pr-12 w-full rounded-lg focus:outline-none placeholder:text-gray-700'
                        />

                        {/* Search Icon (можно убрать type='submit', если submit не нужен) */}
                        <button
                            type='submit'
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                        >
                            <HiMagnifyingGlass className='h-6 w-6' />
                        </button>
                    </div>

                    {searchTerm.length > 1 && searchResults.length > 0 && (
                        <ul className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50'>
                            {searchResults.map((product) => (
                                <li
                                    key={product._id}
                                    onClick={() => handleProductClick(product._id)}
                                    className='flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0'
                                >
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        className='w-10 h-10 object-cover rounded mr-2'
                                    />
                                    <span className='font-medium text-gray-800'>{product.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {searchTerm.length > 1 && searchResults.length === 0 && (
                        <div className='absolute top-full mt-2 w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-center text-gray-500'>
                            Ничего не найдено.
                        </div>
                    )}
                </form>
            ) : (
                <button
                    onClick={handleSearchToggle}
                >
                    <HiMagnifyingGlass className='h-6 w-6' />
                </button>
            )}
        </div>
    )
}

export default SearchBar

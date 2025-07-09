import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from 'react-icons/io';
import SearchBar from './SearchBar';
import CartBasket from './CartBasket';
import { useSelector } from 'react-redux';
import rabbitLogo from '../../../../public/Logo(Rabbit).png';


const NavBar = () => {
    const [basketOpen, setBasketOpen] = useState(false);
    const [navMenuOpen, setNavMenuOpen] = useState(false);

    const totalItemsInCart = useSelector((state) =>
        state.products.productsBasket.reduce((total, item) => total + item.quantity, 0)
    );

    const toggleCartBasket = () => {
        setBasketOpen(!basketOpen);
    }

    const toggleNavMenuOpen = () => {
        setNavMenuOpen(!navMenuOpen);
    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-1 px-6'>
                {/* Left Logo */}
                <div>
                    <Link to='/' className='text-2xl font-medium' >
                        <img src={rabbitLogo} alt="Logo" className='w-15 h-15 object-cover' />
                    </Link>
                </div>

                {/* Center Navigation Links */}
                <div className='hidden md:flex space-x-6'>
                    <Link
                        to='/collections/men'
                        className='text-gray-800 hover:text-black text-sm font-medium uppercase'
                        style={{
                            textShadow: '0 0 15px #ec1f86, 0 0 15px #ec1f86, 0 0 30px #ec1f86',
                        }}
                    >
                        Men
                    </Link>
                    <Link
                        to='/collections/women'
                        className='text-gray-800 hover:text-black text-sm font-medium uppercase'
                        style={{
                            textShadow: '0 0 15px #ec1f86, 0 0 15px #ec1f86, 0 0 30px #ec1f86',
                        }}
                    >
                        Women
                    </Link>
                    <Link
                        to='/collections/all'
                        className='text-gray-800 hover:text-black text-sm font-medium uppercase'
                        style={{
                            textShadow: '0 0 15px #ff0080, 0 0 15px #ff0080, 0 0 30px #ff0080',
                        }}
                    >
                        All
                    </Link>
                </div>

                {/* Right Icons */}
                <div className='flex items-center space-x-4'>
                    <Link to="/login" className='hover:text-black'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>

                    <button
                        onClick={toggleCartBasket}
                        className='relative hover:text-black'
                    >
                        <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
                        {totalItemsInCart > 0 && <span className='absolute -top-1 bg-rabbit-red text-white text-sm rounded-full px-2 py-0.5'>{totalItemsInCart}</span>}
                    </button>

                    {/* Search */}
                    <div className='overflow-hiden'>
                        <SearchBar />
                    </div>

                    <button
                        onClick={toggleNavMenuOpen}
                        className='md:hidden'
                    >
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
            </nav >

            {/* MODAL Basket */}
            <CartBasket
                basketOpen={basketOpen}
                toggleCartBasket={toggleCartBasket}
            />

            {/* MOBILE Modal Navigation */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w=1/3 h-full bg-white
                            shadow-lg transform transition-transform duration-300 z-50 
                            ${navMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className='flex justify-end px-3 pt-5'>
                    <button
                        onClick={toggleNavMenuOpen}
                        className=' bg-white border-2 border-gray-300 p-2 rounded-full hover:bg-red-200'
                    >
                        <IoMdClose className='h-6 w-6 text-red-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <div className=''>
                        <img src={rabbitLogo} alt="Logo" className='w-8 h-8 object-cover' />
                        <h2 className='text-xl font-semibold mb-4 border-b-2 pb-2'>Menu</h2>
                    </div>

                    <nav className='space-y-4'>
                        <Link
                            onClick={toggleNavMenuOpen}
                            to="/collections/men"
                            className='block text-gray-600 hover:text-black duration-100'
                        >
                            Men
                        </Link>
                        <Link
                            onClick={toggleNavMenuOpen}
                            to="/collections/women"
                            className='block text-gray-600 hover:text-black duration-100'
                        >
                            Women
                        </Link>
                        <Link
                            to='/collections/all'
                            className='block text-gray-600 hover:text-black duration-100'
                        >
                            All
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar
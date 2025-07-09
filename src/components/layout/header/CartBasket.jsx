import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CartContents from '../../CartContents';


const CartBasket = ({ basketOpen, toggleCartBasket }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCartBasket(); 
        navigate("/checkout"); 
    };

    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full 
                        bg-white shadow-lg transform transition-transform 
                        duration-300 flex flex-col z-50
                        ${basketOpen ? "translate-x-0" : "translate-x-full"}`}
        >

            {/* Close Button */}
            <div className='relative flex justify-end px-5 pt-5'>
                <button
                    onClick={toggleCartBasket}
                    className=' bg-white border-2 border-gray-300 p-2 rounded-full hover:bg-red-200'
                >
                    <IoMdClose className='h-6 w-6 text-red-600' />
                </button>
            </div>

            {/* CART Items */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>

                <CartContents />
            </div>

            {/* Checkout Button Fixed at the bottom */}
            <div className='p-4 bg-white sticky bottom-0'>
                <button
                    onClick={handleCheckout}
                    className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
                >
                    Checkout
                </button>
                <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping, taxes and discount codes calculated at c heckout.</p>
            </div>
        </div>
    )
}

export default CartBasket
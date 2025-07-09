import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateQuantity } from '../redux/slices/productsSlice';
import { FaTrashCan } from 'react-icons/fa6';


const CartContents = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.products.productsBasket);

    const handleRemoveItem = (productId, size, color) => {
        dispatch(removeProduct({ productId, size, color }));
    };

    const handleUpdateQuantity = (item, newQuantity) => {
        dispatch(updateQuantity({
            productId: item.product._id,
            size: item.selectedSize,
            color: item.selectedColor,
            newQuantity: newQuantity
        }));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const price = item.product.discountPrice || item.product.price;
        return total + (price * item.quantity);
    }, 0).toFixed(2);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>Your cart is empty.</p>
                <p>Start adding items to see them here!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cartItems.map((item, index) => (
                <div
                    key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex justify-around items-center space-x-5 border-b pb-4 flex-col sm:flex-row"
                >
                    <div>
                        <img
                            src={item.product.images[0]?.url}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded"
                        />
                    </div>

                    <div className="flex-grow">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                        <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                        <p className="text-md font-bold">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-400 duration-300"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-400 duration-300"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => handleRemoveItem(item.product._id, item.selectedSize, item.selectedColor)}
                        className="flex text-red-500 border rounded-xl p-2 hover:bg-red-200 duration-300"
                    >
                        <FaTrashCan className='text-3xl  ' />
                    </button>
                </div>
            ))}

            {/* TOTAL PRICE */}
            <div className="py-2 border-t-2 border-b-2 border-gray-200 mt-4 flex justify-center items-center font-bold text-xl">
                <span className='mr-3 text-gray-600 text-2xl'>Total:</span>
                <span>${totalAmount}</span>
            </div>
        </div>
    )
}

export default CartContents
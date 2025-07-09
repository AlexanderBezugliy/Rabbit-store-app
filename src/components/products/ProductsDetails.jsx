import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { products } from '../../data/products';
import { useEffect, useState } from 'react';
import { addProduct } from '../../redux/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { products as allProductsData } from '../../data/products';


function shuffleArray(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Обмен элементами
    }

    return shuffledArray;
}

const ProductsDetails = ({ product }) => {
    const [mainImg, setMainImg] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [youMayAlsoLikeProducts, setYouMayAlsoLikeProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setMainImg(product.images[0]?.url);
            setSelectedSize(null);
            setSelectedColor(null);
            setQuantity(1);

            const filteredProducts = allProductsData.filter(
                p => p.gender === product.gender && p._id !== product._id
            );

            const randomProducts = shuffleArray(filteredProducts).slice(0, 4);

            setYouMayAlsoLikeProducts(randomProducts);
        }
    }, [product]);

    if (!product) {
        return <div className="text-center py-10">Продукт не найден или не загружен.</div>;
    }

    const handleQuantityChage = (action) => {
        if (action === 'plus') {
            return setQuantity((prev) => prev + 1);
        } else if (action === 'minus' && quantity > 1) {
            return setQuantity((prev) => prev - 1);
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", {
                duration: 1000,
            });
            return;
        }
        setIsButtonDisabled(true);

        setTimeout(() => {
            dispatch(addProduct({ product, selectedSize, selectedColor, quantity }));

            toast.success(`${quantity} x ${product.name} (${selectedSize}, ${selectedColor}) добавлен в корзину!`, {
                duration: 1000,
            });
            setIsButtonDisabled(false);
            setSelectedSize(null);
            setSelectedColor(null);
            setQuantity(1);
        }, 1000)
    }

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                {/* ВЕСЬ ВАШ ТЕКУЩИЙ JSX для отображения product */}
                {/* Убедитесь, что все ссылки на 'product' внутри JSX обращаются к пропсу `product` */}
                <div className='flex flex-col md:flex-row'>
                    {/* LEFT SIDE(Thumbnails(large-screen))*/}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {product.images.map((image, i) => (
                            <img
                                key={i}
                                onClick={() => setMainImg(image.url)}
                                src={image.url}
                                alt={image.altText}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border duration-300 ${mainImg === image.url ? 'border-black' : 'border-gray-300'}`}
                            />
                        ))}
                    </div>
                    {/* Mini Image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img
                                src={mainImg}
                                alt="main-product"
                                className='w-full h-auto object-cover rounded-lg'
                            />
                        </div>
                    </div>
                    {/* MOBILE Thumbnails */}
                    <div className='md:hidden flex space-x-4 mb-4'>
                        {product.images.map((image, i) => (
                            <img
                                key={i}
                                onClick={() => setMainImg(image.url)}
                                src={image.url}
                                alt={image.altText}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border duration-300 ${mainImg === image.url ? 'border-black' : 'border-gray-300'}`}
                            />
                        ))}
                    </div>

                    {/* RIGHT Side*/}
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{product.name}</h1>
                        {/* Отображаем цену со скидкой, если она есть, иначе обычную цену */}
                        {product.discountPrice ? (
                            <>
                                <p className='text-lg text-gray-600 mb-1 line-through'>$ {product.price}</p>
                                <p className='text-xl text-gray-500 mb-2'>$ {product.discountPrice}</p>
                            </>
                        ) : (
                            <p className='text-xl text-gray-500 mb-2'>$ {product.price}</p>
                        )}

                        <p className='text-gray-600 mb-4'>{product.description}</p>

                        {/* color */}
                        <div className='mb-4'>
                            <p className='text-gray-700'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {product.colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setSelectedColor(c)}
                                        className={`w-8 h-8 rounded-full border duration-300 ${selectedColor === c ? 'border-4 border-black' : 'border-4 border-gray-200'}`}
                                        style={{
                                            backgroundColor: c.toLowerCase(),
                                        }}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* size */}
                        <div className='mb-4'>
                            <p className='text-gray-700'>Size:</p>
                            <div className='flex gap-2 mt-2'>
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 rounded border duration-300 ${selectedSize === s ? 'bg-black text-white' : ''}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* quantity */}
                        <div className="mb-6">
                            <p className='text-gray-700'>Quantity:</p>
                            <div className="flex items-center space-x-4 m5-2">
                                <button
                                    onClick={() => handleQuantityChage('minus')}
                                    className='px-2 py-1 bg-gray-200 rounded text-lg'
                                >
                                    -
                                </button>
                                <span className='text-lg'>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChage('plus')}
                                    className='px-2 py-1 bg-gray-200 rounded text-lg'
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* ADD TO CART */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`bg-black text-white py-2 px-6 rounded w-full mb-4
                                        ${isButtonDisabled
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'hover:bg-gray-900'}`}
                        >
                            {isButtonDisabled ? 'Adding...' : 'ADD TO CART'}
                        </button>

                        <div className="mt-4 text-gray-700">
                            <h3 className='text-xl font-bold mb-4'>Characteristic:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>Brand</td>
                                        <td className='py-1'>{product.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Material</td>
                                        <td className='py-1'>{product.material}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Category</td>
                                        <td className='py-1'>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Gender</td>
                                        <td className='py-1'>{product.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>SKU</td>
                                        <td className='py-1'>{product.sku}</td>
                                    </tr>
                                    {product.rating && (
                                        <tr>
                                            <td className='py-1'>Rating</td>
                                            <td className='py-1'>{product.rating} ({product.numReviews} reviews)</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>

                    <ProductGrid
                        products={youMayAlsoLikeProducts}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;

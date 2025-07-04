import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { products } from '../../data/products';
import { useEffect, useState } from 'react';



const ProductsDetails = ({ product }) => { // <--- ПРОПСЫ
    const [mainImg, setMainImg] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // Filter "You May Also Like" products (исключая текущий продукт)
    // manGrid теперь будет динамически выбираться
    const youMayAlsoLikeProducts = products
        .filter(p => p.gender === product.gender && p._id !== product._id) // Фильтруем по полу и исключаем текущий
        .slice(0, 4); // Берём первые 4

    useEffect(() => {
        // Когда появляется НОВЫЙ товар (через пропс `product`),
        // устанавливаем его первую картинку как главную
        setMainImg(product.images[0].url);
        // Также сбрасываем выбранные размер и цвет, если они были выбраны для предыдущего товара
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1); // Сбрасываем количество
    }, [product]); // Зависимость от `product`

    const handleQuantityChage = (action) => {
        if (action === 'plus') {
            return setQuantity((prev) => prev + 1);
        } else if (action === 'minus' && quantity > 0) {
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
            toast.success("Product added to cart!", { // Исправил "Probuct" на "Product"
                duration: 1000,
            });
            setIsButtonDisabled(false);
            // Здесь в будущем будет Redux action для добавления в корзину
            // dispatch(addToCart({ product, selectedSize, selectedColor, quantity }));
        }, 1000)
    }

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                {/* Best Seller (Теперь это динамически выбранный продукт) */}
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
                                            backgroundColor: c.toLowerCase(), // Убедитесь, что цвет в нижнем регистре
                                            // filter: 'brightness(0.5)', // Возможно, этот фильтр вам не нужен, если цвета выглядят тускло
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
                            <h3 className='text-xl font-bold mb-4'>Characteristic:</h3> {/* Исправил Charactiristic */}
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
                                    {/* Добавляем другие характеристики из вашего API */}
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
                                    {/* Можно добавить rating и numReviews, если хотите */}
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
                    {/* ProductGrid теперь нужно будет принимать обработчик клика */}
                    <ProductGrid
                        products={youMayAlsoLikeProducts}
                    // Больше не нужен onProductClick здесь, т.к. ProductGrid сам будет использовать Link
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductsDetails;



// DATA
// const selectedProduct = {
//     name: "Stylish Jacket",
//     price: 120,
//     originalPrice: 150,
//     description: "This is a stylish Jacket perfect for any occasion",
//     brand: "FashionBrand",
//     material: "Leather",
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     images: [
//         {
//             url: "/productsPictures/StylishJacket.jpg",
//             altText: "Stylish Jacket 1",
//         },
//         {
//             url: "/productsPictures/StylishJacket(1).jpg",
//             altText: "Stylish Jacket 2",
//         },
//     ],
// };

// const ProductsDetails = () => {
//     const [mainImg, setMainImg] = useState();
//     const [selectedSize, setSelectedSize] = useState();
//     const [selectedColor, setSelectedColor] = useState();
//     const [quantity, setQuantity] = useState(1);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//     const manGrid = products.slice(6, 10);

//     useEffect(() => {//kогда появляется товар — устанавливаем первую картинку как главную
//         setMainImg(selectedProduct.images[0].url)
//     }, [selectedProduct]);

//     const handleQuantityChage = (action) => {
//         if (action === 'plus') {
//             return setQuantity((prev) => prev + 1);
//         } else if (action === 'minus' && quantity > 0) {
//             return setQuantity((prev) => prev - 1);
//         }
//     }

//     const handleAddToCart = () => {
//         if (!selectedSize || !selectedColor) {
//             toast.error("Please select a size and color before adding to cart.", {
//                 duration: 1000,
//             });
//             return;
//         }
//         setIsButtonDisabled(true);

//         setTimeout(() => {
//             toast.success("Probuct added to cart!", {
//                 duration: 1000,
//             });
//             setIsButtonDisabled(false);
//         }, 1000)
//     }

//     return (
//         <div className='p-6'>
//             <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
//                 {/* Best Seller */}
//                 <div className='flex flex-col md:flex-row'>
//                     {/* LEFT SIDE(Thumbnails(large-screen))*/}
//                     <div className='hidden md:flex flex-col space-y-4 mr-6'>
//                         {selectedProduct.images.map((image, i) => (
//                             <img
//                                 key={i}
//                                 onClick={() => setMainImg(image.url)}
//                                 src={image.url}
//                                 alt={image.altText}
//                                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border duration-300 ${mainImg === image.url ? 'border-black' : 'border-gray-300'}`}
//                             />
//                         ))}
//                     </div>
//                     {/* Mini Image */}
//                     <div className='md:w-1/2'>
//                         <div className='mb-4'>
//                             <img
//                                 src={mainImg}
//                                 alt="main-product"
//                                 className='w-full h-auto object-cover rounded-lg'
//                             />
//                         </div>
//                     </div>
//                     {/* MOBILE Thumbnails */}
//                     <div className='md:hidden flex space-x-4 mb-4'>
//                         {selectedProduct.images.map((image, i) => (
//                             <img
//                                 key={i}
//                                 onClick={() => setMainImg(image.url)}
//                                 src={image.url}
//                                 alt={image.altText}
//                                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border duration-300 ${mainImg === image.url ? 'border-black' : 'border-gray-300'}`}
//                             />
//                         ))}
//                     </div>

//                     {/* RIGHT Side*/}
//                     <div className='md:w-1/2 md:ml-10'>
//                         <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
//                         <p className='text-lg text-gray-600 mb-1 line-through'>{selectedProduct.originalPrice}</p>
//                         <p className='text-xl text-gray-500 mb-2'>$ {selectedProduct.price}</p>
//                         <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
//                         {/* color */}
//                         <div className='mb-4'>
//                             <p className='text-gray-700'>Color:</p>
//                             <div className='flex gap-2 mt-2'>
//                                 {selectedProduct.colors.map((c) => (
//                                     <button
//                                         key={c}
//                                         onClick={() => setSelectedColor(c)}
//                                         className={`w-8 h-8 rounded-full border duration-300 ${selectedColor === c ? 'border-4 border-black' : 'border-4 border-gray-200'}`}
//                                         style={{
//                                             backgroundColor: c.toLocaleLowerCase(),
//                                             filter: 'brightness(0.5)',
//                                         }}
//                                     >
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* size */}
//                         <div className='mb-4'>
//                             <p className='text-gray-700'>Size:</p>
//                             <div className='flex gap-2 mt-2'>
//                                 {selectedProduct.sizes.map((s) => (
//                                     <button
//                                         key={s}
//                                         onClick={() => setSelectedSize(s)}
//                                         className={`px-4 py-2 rounded border duration-300 ${selectedSize === s ? 'bg-black text-white' : ''}`}
//                                     >
//                                         {s}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* quantity */}
//                         <div className="mb-6">
//                             <p className='text-gray-700'>Quantity:</p>
//                             <div className="flex items-center space-x-4 m5-2">
//                                 <button
//                                     onClick={() => handleQuantityChage('minus')}
//                                     className='px-2 py-1 bg-gray-200 rounded text-lg'
//                                 >
//                                     -
//                                 </button>
//                                 <span className='text-lg'>{quantity}</span>
//                                 <button
//                                     onClick={() => handleQuantityChage('plus')}
//                                     className='px-2 py-1 bg-gray-200 rounded text-lg'
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                         {/* ADD TO CART */}
//                         <button
//                             onClick={handleAddToCart}
//                             disabled={isButtonDisabled}
//                             className={`bg-black text-white py-2 px-6 rounded w-full mb-4
//                                         ${isButtonDisabled
//                                     ? 'cursor-not-allowed opacity-50'
//                                     : 'hover:bg-gray-900'}`}
//                         >
//                             {isButtonDisabled ? 'Adding...' : 'ADD TO CART'}
//                         </button>

//                         <div className="mt-4 text-gray-700">
//                             <h3 className='text-xl font-bold mb-4'>Charactiristic:</h3>
//                             <table className='w-full text-left text-sm text-gray-600'>
//                                 <tbody>
//                                     <tr>
//                                         <td className='py-1'>Brand</td>
//                                         <td className='py-1'>{selectedProduct.brand}</td>
//                                     </tr>
//                                     <tr>
//                                         <td className='py-1'>Material</td>
//                                         <td className='py-1'>{selectedProduct.material}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-20">
//                     <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>

//                     <ProductGrid
//                         products={manGrid}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductsDetails;
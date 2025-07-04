import { Link } from 'react-router-dom';


const GenderCollectionSection = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                {/* Women`s Colections */}

                    <div className='relative flex-1'>
                        <img
                            src="/womens-collection.webp"
                            alt="womens-collection"
                            className='w-full h-[700px] object-contain'
                        />

                        <Link to="/collections/women" className='absolute bottom-8 left-8 bg-red-300 rounded-l-3xl bg-opacity-90 p-4'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                                Women`s Collection
                            </h2>

                            <div className='text-gray-900 underline'>Shop Now</div>
                        </Link>
                    </div>



                {/* Men`s Colections */}
                <div className='relative flex-1'>
                    <img
                        src="/mens-collection(1).jpg"
                        alt="mens-collection"
                        className='w-full h-[700px] object-contain'
                    />

                    <Link to="/collections/men" className='absolute bottom-8 left-8 bg-red-300 rounded-l-3xl bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                            Men`s Collection
                        </h2>

                        <div className='text-gray-900 underline'>Shop Now</div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection;
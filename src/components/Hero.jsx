import { Link } from "react-router-dom"


const Hero = () => {
    return (
        <section className='relative'>
            <img
                src='/Hero(2).jpg'
                alt="rabbit"
                className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
            />

            <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1
                        className='text-4xl text-red-300 md:text-9xl font-bold tracking-tighter uppercase mb-4'
                        style={{ textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px  1px 0 #fff, 1px  1px 0 #fff" }}
                    >
                        Holidays
                    </h1>

                    <p
                        className='text-md tracking-tighter text-red-300 md:text-2xl mb-6'
                        style={{ textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px  1px 0 #fff, 1px  1px 0 #fff" }}
                    >
                        Explore our vaction-ready outfits with fast worldwide shipping.
                    </p>

                    <Link 
                        to="/collections/all" 
                        className='bg-red-300 text-gray-800 font-bold px-6 py-3 rounded-md text-lg hover:bg-red-400 duration-300'
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
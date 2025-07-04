

const BestSellers = () => {
    

    return (
        <section>
            <h2 className='text-4xl text-center font-bold mb-4'>Best Seller</h2>

            <div className='container mx-auto flex flex-col-reverse lg:flex-row-reverse items-center bg-green-50 rounded-3xl mb-8'>
                <div className='lg:w-1/2 p-8 text-center lg:text-right'>
                    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>The feeling of wide comfort and space gives a feeling of lightness</h2>
                    <p className='text-lg text-gray-600 mb-6'>
                        Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
                    </p>
                </div>
                <div className='lg:w-1/2 lg:max-w-4xl md:max-w-xl sm:max-w-md'>
                    <video
                        src="https://videos.pexels.com/video-files/8028262/8028262-hd_1920_1080_25fps.mp4"
                        className='w-full h-full object-cover lg:rounded-l-3xl'
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
        </section>
    )
}


export default BestSellers
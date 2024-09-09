import React from 'react'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='bg-emerald-600 p-8 md:p-16 lg:p-28 mb-4 rounded-3xl mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
        <div className='flex flex-col items-center'>
            <div className='text-center'>

                {/* Display the title of the page */}
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white'>
                    Find new deals every day!
                </h1>

                <div className='flex flex-col items-start mt-4'>
                    {/* Display the subtitle of the page */}
                    <p className='text-lg sm:text-xl md:text-2xl text-white my-4 text-center'>
                        Discover the best deals on the market
                    </p>

                    {/* Display call to action button */}
                    <NavLink to="/products" className='bg-black text-white px-4 py-2 sm:px-6 sm:py-3 mt-4 rounded-full font-bold'>
                        Shop Now
                    </NavLink>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <>
            <div>
                <Image
                    src={"/images/hero-sec.png"}
                    alt="hero-section"
                    width={1440}
                    height={316}
                    className="w-full h-auto mt-20"
                />
            </div>
            <h1 className='text-[32px] font-bold text-center mt-10'>Browse The Range</h1>
            <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className='flex flex-wrap items-center justify-center mt-16 gap-8'>
                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img1.png"}
                        alt='img-1'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Dining</h3>
                </div>

                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img2.png"}
                        alt='img-2'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Living</h3>
                </div>

                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img3.png"}
                        alt='img-3'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Bedroom</h3>
                </div>
            </div>
        </>
    )
}

export default HeroSection
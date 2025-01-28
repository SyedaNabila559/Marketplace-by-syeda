import React from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: string;
}

const getProducts = async () => {
  const products = await client.fetch(
    `*[_type=="product"][0..7]{
       _id,
       title,
       price,
       productImage
    }`
  );
  return products;
};

const MyProducts = async () => {
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <h1 className="text-[40px] text-center font-bold mt-14 mb-6">Our Products</h1>
      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="w-full max-w-[285px] bg-[#F4F5F7] mx-auto rounded-lg shadow-lg flex flex-col items-center"
          >
            {/* Product Image */}
            {product.productImage && (
              <div className="relative w-[285px] h-[285px]">
                <Image
                  src={urlFor(product.productImage).url()}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Product Title */}
            <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4 bold">{product.title}</h3>

            {/* Product Price */}
            <div className="flex justify-center mt-2">
              <span className="text-[16px] font-semibold text-[#3A3A3A] bold text-2xl">
                Rp {product.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex items-center justify-center mt-6">
        <Link href={"/shop"}>
          <button className="w-[245px] h-[48px] bg-[#FFFFFF] border border-[#B88E2F] text-[#B88E2F]">
            Show More
          </button>
        </Link>
      </div>

      {/* Additional Content */}
      <div className="h-auto bg-[#FCF8F3] mt-10 flex flex-col lg:flex-row items-center justify-around">
        <div className="text-center lg:text-left px-6 lg:px-0">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold w-[90%] md:w-[422px]">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-[14px] sm:text-[16px] mt-4 md:mt-6 w-[90%] md:w-[368px]">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <button className="w-[70%] md:w-[176px] h-[48px] bg-[#B88E2F] text-[#FFFFFF] mt-8">
            Explore More
          </button>
        </div>

        <div className="mt-8 lg:mt-0">
          <Image
            src="/images/img6.png"
            alt="last-1"
            width={404}
            height={582}
            className="w-full lg:w-[404px] lg:h-[582px]"
          />
        </div>

        <div className="mt-8 lg:mt-0">
          <Image
            src="/images/img5.png"
            alt="last-1"
            width={372}
            height={486}
            className="w-full lg:w-[372px] lg:h-[486px]"
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="md:flex flex-col justify-center items-center mb-[56.6px] hidden mt-36">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#616161] font-[600] text-[20px] text-center leading-[30px] ">Share your setup with </h1>
          <h1 className="text-[#3A3A3A] font-[700] text-[40px] text-center leading-[48px] ">#FuniroFurniture </h1>
        </div>
        <div className="flex justify-center items-center">
          <Image src="/images/setup.png" alt="setup" width={1799} height={721} className="w-screen custom:w-[1799px]"></Image>
        </div>
      </div>
    </>
  );
};

export default MyProducts;
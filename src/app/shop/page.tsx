"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

// Define the type for the product image
interface ProductImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: ProductImage; // Use the specific type for product image
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const getProducts = async () => {
    try {
      const productsData = await client.fetch(
        `*[_type=="product"]{
          _id,
          title,
          price,
          productImage
        }`
      );
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div>
        <Image
          src={"/images/shop.svg"}
          alt="shop"
          width={1440}
          height={316}
          className="w-full h-auto mt-20 object-cover"
        />
      </div>

      {/* Filters Section */}
      <div className="h-auto bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-evenly space-x-4 sm:space-x-8 w-full">
                    <Image
                        src="/images/dotted-line.svg"
                        alt="dotted-line"
                        width={25}
                        height={25}
                    />
                    <h3 className="text-[14px] sm:text-[18px] md:text-[20px] font-semibold">Filter</h3>
                    <Image
                        src="/images/four-dot.svg"
                        alt="four-dot"
                        width={25}
                        height={25}
                    />
                    <Image
                        src="/images/square-line.svg"
                        alt="square-line"
                        width={25}
                        height={25}
                    />
                </div>
                <div className="flex flex-wrap items-center justify-between sm:space-x-4 mt-2 sm:mt-0 w-full">
                    <span className="text-xs sm:text-sm md:text-base">Showing 1–16 of 32 results</span>
                    <span className="text-xs sm:text-sm md:text-base">Show</span>

                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white flex items-center justify-center ">
                        <h3 className="text-[#9F9F9F] text-xs sm:text-sm md:text-base">16</h3>
                    </div>

                    <span className="text-xs sm:text-sm md:text-base">Short by</span>

                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white flex items-center justify-center ">
                        <h3 className="text-[#9F9F9F] text-xs sm:text-sm md:text-base">Default</h3>
                    </div>
                </div>
            </div>

      {/* Products Section */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg p-5 shadow-md animate-pulse"
              >
                <div className="w-full h-56 bg-gray-300 mb-4 rounded-lg"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg p-5 shadow-md"
            >
              <Image
                src={urlFor(product.productImage.asset._ref).url()}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <span className="text-xl font-semibold text-gray-600">
                  Rp {product.price.toLocaleString()}
                </span>
                <Link href={`/shop/${product._id}`}>
                  <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all">
                    View Product Detail
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShopPage;

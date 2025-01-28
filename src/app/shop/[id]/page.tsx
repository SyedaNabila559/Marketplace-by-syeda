"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { useParams } from "next/navigation";

interface IProducts {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<IProducts | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Moved `query` inside useEffect to avoid dependency issues
  useEffect(() => {
    if (id) {
      const query = `*[_type == "product" && _id == $id] {
        _id,
        title,
        price,
        description,
        "imageUrl": productImage.asset->url + "?w=500&h=500&fit=crop"
      }`;

      const fetchProduct = async () => {
        try {
          const productDetail = await client.fetch(query, { id });
          if (productDetail.length > 0) {
            setProduct(productDetail[0]);
          }
        } catch (error) {
          console.error("Error fetching product: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);  // We only need `id` as dependency here

  const addToCart = (id: string) => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...savedCart, id];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-950"></div>
      </div>
    );
  }

  // Show error message if product not found
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-[#F9F1E7] h-24 mt-20 flex items-center gap-8 pl-20">
        <ul className="flex items-center gap-2 list-none">
          <li className="text-[#9F9F9F]">Home</li>
          <Image src="/images/black-arr.png" alt="arrow" width={20} height={20} />
          <li className="text-[#9F9F9F]">Shop</li>
          <Image src="/images/black-arr.png" alt="arrow" width={20} height={20} />
          <li className="text-[#9F9F9F]">{product.title}</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly mt-16 px-4 lg:px-24 gap-12">
        {/* Sidebar Thumbnails */}
        <div className="flex flex-col gap-4 items-center lg:items-start">
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={76}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>
          ))}
        </div>



        {/* Product Image Container */}
        <div className="bg-[#F9F1E7] w-full lg:w-1/2 h-auto flex items-center justify-center p-4 rounded-md">
          <Image src={product.imageUrl} alt={product.title} width={500} height={600} className="max-w-full h-auto" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col max-w-lg">
          <h1 className="text-4xl font-semibold mb-2">{product.title}</h1>
          <span className="text-2xl text-[#9F9F9F]">{product.price}</span>

          <div className="flex items-center gap-3 mt-4">
            <Image src="/images/five-star.png" alt="star rating" width={124} height={20} />
            <div className="border-l border-[#9F9F9F] h-3"></div>
            <span className="text-[#9F9F9F] text-sm">5 Customer Reviews</span>
          </div>

          <p className="mt-6 text-sm lg:text-base">
            {product.description}
          </p>

          {/* Size Selection */}
          <h2 className="mt-14 text-[#9F9F9F]">Size:</h2>
          <div className="flex items-center gap-3 mt-4">
            <button className="w-8 h-8 bg-[#B88E2F] text-white rounded flex items-center justify-center text-sm hover:bg-[#A77A27]">
              L
            </button>
            <button className="w-8 h-8 bg-[#F9F1E7] rounded flex items-center justify-center text-sm hover:bg-[#B88E2F] hover:text-white">
              XL
            </button>
            <button className="w-8 h-8 bg-[#F9F1E7] rounded flex items-center justify-center text-sm hover:bg-[#B88E2F] hover:text-white">
              XS
            </button>
          </div>

          {/* Color Selection */}
          <h2 className="mt-14 text-[#9F9F9F]">Color:</h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 bg-[#816DFA] rounded-full"></div>
            <div className="w-8 h-8 bg-black rounded-full"></div>
            <div className="w-8 h-8 bg-[#B88E2F] rounded-full"></div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button onClick={() => addToCart(product._id)} className="w-[123px] h-[64px] rounded-2xl border border-black mt-4 sm:mt-0 sm:ml-3">
              Add To Cart
            </button>

          </div>

          {/* Divider */}
          <div className="border-b border-[#9F9F9F] w-full mt-14"></div>
          <div className="mt-8 flex items-center justify-start gap-8">
            <div className="flex flex-col text-[#9F9F9F]">
              <h4>SKU</h4>
              <h4>Category</h4>
              <h4>Tags</h4>
              <h4>Share</h4>
            </div>
            <div className="flex flex-col text-[#9F9F9F]">
              <h4>: SS001</h4>
              <h4>: Sofas</h4>
              <h4>: Sofa, Chair, Home, Shop</h4>
              <div className="flex items-center justify-start gap-3">
                :
                <FaFacebook />
                <FaLinkedin />
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="w-full border-b border-[#9F9F9F] mt-20 sm:block hidden"></div>
      <div className="h-[744px] sm:block hidden">
        <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-16 mt-10 text-[24px]">
          <h1 className="font-semibold">Description</h1>
          <span className="text-[#9F9F9F]">Additional Information</span>
          <span className="text-[#9F9F9F]">Reviews [5]</span>
        </div>
        <div className="flex items-center flex-col mt-10">
          <p className="text-[#9F9F9F] w-full sm:w-[1026px] sm:h-[48px] px-4">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <br />
          <p className="text-[#9F9F9F] w-full sm:w-[1026px] sm:h-[48px] px-4">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row items-center justify-around mt-10">
          <Image src={product.imageUrl} alt={product.title} width={405} height={248} />
          <Image src={product.imageUrl} alt={product.title} width={405} height={248} />
        </div>
      </div>



    </>
  )
}
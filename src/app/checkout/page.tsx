"use client"
import Image from 'next/image'
import { GoDotFill } from "react-icons/go";
import { FaRegCircle } from "react-icons/fa";
import { client } from '@/sanity/lib/client';
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Success icon


interface IProduct {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}


const Page = () => {
    const [sanityData, setSanityData] = useState<IProduct[]>([]);
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    // Fetch data from Sanity
    useEffect(() => {
        const fetchData = async () => {
            const query = `*[_type=="product"]{
        _id,
        title,
        price,
        "imageUrl": productImage.asset->url + "?w=500&h=500&fit=crop"
      }`;

            const data: IProduct[] = await client.fetch(query);
            setSanityData(data);
        };

        fetchData();
    }, []);

    // Load cart items from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as string[]; // Assuming _id is string
        const items = savedCart.map((id) => sanityData.find((p) => p._id === id)).filter(Boolean) as IProduct[];
        setCartItems(items);
    }, [sanityData]);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const [isLoading, setIsLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    const [showSuccess, setShowSuccess] = useState(false); // To control success animation

    const clearCart = () => {
        setIsLoading(true);
        setOrderStatus("");
        setShowSuccess(false); // Hide success animation initially

        // Simulate order placement with a delay (e.g., API request)
        setTimeout(() => {
            setIsLoading(false);
            setCartItems([]); // Clear cart
            localStorage.removeItem("cart");
            setOrderStatus("Your order is being processed...");
            setShowSuccess(true); // Show success animation

            // Additional actions: Redirect or show more details
        }, 2000);
    };
    return (
        <>
            <div>
                <Image
                    src={"/images/checkout.png"}
                    alt="checkout"
                    width={1440}
                    height={316}
                    className="w-full h-auto mt-20"
                />
            </div>
            <div className="container mx-auto px-4 lg:px-12 mt-16">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
                    {/* Left Side: Billing Form */}
                    <div className="w-full lg:w-[60%]">
                        <h1 className="text-[36px] font-semibold mb-5">Billing details</h1>
                        <div className="flex flex-wrap items-center justify-start gap-6">
                            <div className="w-full sm:w-auto">
                                <label>
                                    First Name
                                    <br />
                                    <input
                                        type="text"
                                        className="w-full sm:w-[211px] h-[75px] border border-black rounded-md mt-2"
                                    />
                                </label>
                            </div>
                            <div className="w-full sm:w-auto">
                                <label>
                                    Last Name
                                    <br />
                                    <input
                                        type="text"
                                        className="w-full sm:w-[211px] h-[75px] border border-black rounded-md mt-2"
                                    />
                                </label>
                            </div>
                        </div>

                        <br />
                        Company Name (Optional)
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Country / Region
                        <br />
                        <br />
                        <div className="relative w-full lg:w-[453px] h-[75px]">
                            <input
                                type="text"
                                className="w-full h-full border border-black rounded-md pl-4 pr-10"
                            />
                            <Image
                                src={"/images/arr-ico.png"}
                                alt="arrow-icon"
                                width={20}
                                height={20}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            />
                        </div>
                        <br />
                        Street address
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Town / City
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Province
                        <br />
                        <br />
                        <div className="relative w-full lg:w-[453px] h-[75px]">
                            <input
                                placeholder="Western Province"
                                type="text"
                                className="w-full h-full border border-black rounded-md pl-4 pr-10 text-[#9F9F9F]"
                            />
                            <Image
                                src={"/images/arr-ico.png"}
                                alt="arrow-icon"
                                width={20}
                                height={20}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            />
                        </div>
                        <br />
                        ZIP code
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Phone
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Email address
                        <br />
                        <br />
                        <input
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md"
                        />
                        <br />
                        <br />
                        Additional information
                        <br />
                        <br />
                        <input
                            placeholder="Additional information"
                            type="text"
                            className="w-full lg:w-[453px] h-[75px] border border-black rounded-md text-[#9F9F9F] pl-4"
                        />
                    </div>

                    <div className="w-full xl:w-[533px] h-full lg:h-[616px] flex flex-col justify-start items-start gap-6 lg:mt-[60px] mt-0">
                        <div className="w-full lg:w-[533px] flex justify-between items-center">
                            <h1 className="font-[500] text-[24px] leading-[36px] text-black">Product</h1>
                            <h1 className="font-[500] text-[24px] leading-[36px] text-black">Subtotal</h1>

                        </div>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item._id}>

                                    <div className="w-full lg:w-[533px] flex justify-between items-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="flex justify-center items-center bg-[#F9F1E7] size-[80px] rounded-[10px]">
                                                <Image src={item.imageUrl} alt={item.title} width={90} height={50} className='rounded-lg object-scale-down w-full h-full' />
                                            </div>
                                            <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">{item.title}</h1>

                                        </div>
                                        <h1 className="font-[400] text-[16px] leading-[24px] text-black">Rs. {item.price}</h1>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Your cart is empty</p>
                        )}

                        <div className="w-full lg:w-[533px] flex justify-between items-center">
                            <h1 className="font-[400] text-[16px] leading-[24px] text-[black]">Total</h1>
                            <h1 className="font-[700] text-[24px] leading-[38px] text-[#B88E2F]">Rs. {totalPrice}</h1>
                        </div>

                        <hr className='w-full lg:w-[533px]' />

                        <div className="flex flex-col justify-start items-start gap-[20px]">
                            <h1 className="font-[400] text-[16px] leading-6 text-black flex justify-center items-center gap-4"><span><GoDotFill className='scale-[2]' /></span>Direct Bank Transfer</h1>

                            <h1 className="font-[300] text-[16px] leading-6 text-[#9F9F9F] text-justify">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</h1>

                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="font-[400] text-[16px] leading-6 text-[#9F9F9F] flex justify-center items-center gap-4"><span><FaRegCircle className='scale-[1]' /></span>Direct Bank Transfer</h1>

                                <h1 className="font-[400] text-[16px] leading-6 text-[#9F9F9F] flex justify-center items-center gap-4"><span><FaRegCircle className='scale-[1]' /></span>Cash On Delivery</h1>
                            </div>

                            <h1 className="font-[300] text-[16px] leading-6 text-[#000000] text-justify">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold">privacy policy.</span></h1>

                            <div className="flex justify-center items-center w-full lg:w-[533px] mb-5 lg:mb-0 mt-[19px]">
                                <button
                                    onClick={clearCart}
                                    className="w-full lg:w-[318px] h-[64px] rounded-[15px] border-[1px] border-black font-[400] text-[20px] leading-[30px] hover:text-white hover:bg-black duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin border-t-4 border-b-4 border-gray-400 rounded-full w-6 h-6 mr-2"></div>
                                            Placing your order...
                                        </div>
                                    ) : (
                                        "Place order"
                                    )}
                                </button>

                                {/* Full-screen loader */}
                                {isLoading && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="text-white text-2xl font-bold animate-pulse">
                                            <div className='flex items-center justify-center'>
                                                <div className="animate-spin border-t-4 border-b-4 border-white rounded-full w-12 h-12"></div>
                                            </div>
                                            <p className="mt-4">Placing your order...</p>
                                        </div>
                                    </div>
                                )}

                                {/* Success animation and message */}
                                {showSuccess && !isLoading && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="text-white text-2xl font-bold text-center">
                                            <div className='flex items-center justify-center'>
                                                <FaCheckCircle className="text-6xl mb-4" />
                                            </div>
                                            <p className="mt-4">Your order has been successfully placed!</p>
                                            <button
                                                onClick={() => setShowSuccess(false)}
                                                className="mt-6 px-4 py-2 bg-white text-gray-900 rounded-lg"
                                            >
                                                Okay
                                            </button>
                                        </div>

                                    </div>
                                )}

                                {/* Order Status */}
                                {orderStatus && !isLoading && (
                                    <p className="mt-4 text-center text-green-600">{orderStatus}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
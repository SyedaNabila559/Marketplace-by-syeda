"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiDeleteBinLine } from 'react-icons/ri';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface IProduct {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}

interface ICartItem {
    product: IProduct;
    quantity: number;
}

export default function CartPage() {
    const [sanityData, setSanityData] = useState<IProduct[]>([]);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

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

    useEffect(() => {
        const savedCart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const items = savedCart.map((id) => {
            const product = sanityData.find((p) => p._id === id);
            return product ? { product, quantity: 1 } : null; // Initialize quantity to 1
        }).filter(Boolean) as ICartItem[];

        setCartItems(items);
    }, [sanityData]);

    const removeFromCart = (id: string) => {
        const updatedCart = cartItems.filter(item => item.product._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart.map(item => item.product._id)));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) return; // Prevent negative or zero quantity
        const updatedItems = cartItems.map(item =>
            item.product._id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems.map(item => item.product._id)));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-[1440px] mx-auto overflow-hidden">
            <div>
                <Image
                    src={"/images/cart-img.png"}
                    alt="cart-section"
                    width={1440}
                    height={316}
                    className="w-full h-auto mt-20"
                />
            </div>

            <div className="flex flex-col custom:flex-row justify-between items-start lg:items-center custom:items-start mx-4 lg:mx-[100px] my-[56px] gap-8 lg:gap-0">
                <div className="flex flex-col justify-start items-center gap-[56px] w-full lg:w-auto">
                    <div className="w-full hidden lg:w-[817px] h-[55px] bg-[#F9F1E7] rounded-lg md:flex justify-between items-center px-[30px]">
                        <h1 className="font-[500] text-[16px] leading-6">Product</h1>
                        <h1 className="font-[500] text-[16px] leading-6">Price</h1>
                        <h1 className="font-[500] text-[16px] leading-6">Quantity</h1>
                        <h1 className="font-[500] text-[16px] leading-6">Actions</h1>
                    </div>

                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.product._id} className="w-full lg:w-[817px] h-auto flex flex-col md:flex-row justify-between items-center pr-[30px] gap-4 lg:gap-0">
                                <div className="flex justify-start items-center gap-3">

                                    <div className='flex flex-col gap-3'>
                                        <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F] text-center">{item.product.title}</h1>
                                        <Image src={item.product.imageUrl} alt={item.product.title} width={90} height={50} className='rounded-lg object-scale-down w-full h-full mb-12' />
                                    </div>

                                </div>
                                <h1 className="font-[500] text-[16px] leading-6 text-[#9F9F9F]">Rs. {item.product.price}</h1>

                                {/* Quantity input */}
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                                    className="w-[60px] h-[30px] text-center border border-gray-300 px-3 py-6 rounded"
                                />

                                <button onClick={() => removeFromCart(item.product._id)}>
                                    <RiDeleteBinLine className="text-[#B88E2F] scale-150 hover:text-red-700 duration-300 ease-in-out hover:scale-[2]" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col justify-center items-center w-full h-64 bg-[#F9F1E7] rounded-lg border-2 border-dashed border-[#B88E2F] mt-20 mb-24 shadow-lg">
                            <RiDeleteBinLine className="text-[#B88E2F] scale-150 mb-4" />
                            <h1 className="font-semibold text-3xl text-[#B88E2F]">Your Cart is Empty</h1>
                            <p className="text-center text-[#9F9F9F] mt-3">It appears you haven&#39;t added anything to your cart yet. Explore our collection and find what you love!</p>
                            <Link href="/shop" className="mt-6 px-8 py-3 border-2 border-[#B88E2F] text-[#B88E2F] rounded-full font-medium text-lg hover:bg-[#B88E2F] hover:text-white transition-all duration-300 ease-in-out">
                                Start Shopping
                            </Link>
                        </div>

                    )}
                </div>

                <div className="w-full lg:w-[393px] h-auto bg-[#F9F1E7] rounded-lg px-[20px] lg:px-[75px] py-3 flex flex-col justify-start items-center">
                    <h1 className="font-[600] text-[32px] leading-[48px] text-black text-center">Cart Totals</h1>
                    <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[56px] w-full">
                        <h1 className="font-[500] text-[16px] text-black">Subtotal</h1>
                        <h1 className="font-[500] text-[16px] text-[#9F9F9F]">Rs. {totalPrice}</h1>
                    </div>
                    <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[26px] w-full">
                        <h1 className="font-[500] text-[16px] text-black">Total</h1>
                        <h1 className="font-[500] text-[20px] text-[#B88E2F]">Rs. {totalPrice}</h1>
                    </div>
                    <Link href="/checkout">
                        <button className="w-[222px] h-[58.95px] border border-black rounded-[15px] mt-[50px] hover:bg-black hover:text-white ease-in-out duration-300">
                            Check Out
                        </button>
                    </Link>
                    <button onClick={clearCart} className="w-[222px] h-[58.95px] border border-red-500 rounded-[15px] mt-[10px] text-red-500 hover:bg-red-500 hover:text-white ease-in-out duration-300">
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
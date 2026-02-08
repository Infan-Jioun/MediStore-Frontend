"use client";

import Image from "next/image";
import Link from "next/link";

const DeliverySection = () => {
    return (
        <div>
            <section className="mt-10 mb-10">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-10">

                    <div className="md:w-1/2 relative group">
                        <Image
                            src="https://i.ibb.co/LDSGnGyg/delivery.jpg"
                            alt="Fast Delivery"
                            width={500}
                            height={400}
                            className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

              
                    <div className="md:w-1/2 flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-red-500">
                            Fast & Reliable Delivery
                        </h2>
                        <p className="text-gray-700 text-lg md:text-xl">
                            Get your favorite medicines delivered to your doorstep quickly and safely.
                            Track your order in real-time and enjoy our super-fast, contactless delivery service.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-7 rounded-xl shadow-md transition-all duration-300"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DeliverySection;

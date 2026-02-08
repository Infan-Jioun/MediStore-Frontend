import { HeartPulse, Stethoscope, ShieldCheck } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/app/(dashboardLayout)/components/ui/badge";
import { Separator } from "@/app/(dashboardLayout)/components/ui/separator";
import Image from "next/image";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface HeroSectionProps {
    badge?: string;
    heading?: string;
    imageSrc?: string;
    imageAlt?: string;
    features?: Feature[];
    className?: string;
}

const HeroSection = ({
    badge = "Premium Medistore",
    heading = "Advanced Medical Solutions for Healthier Communities",
    imageSrc = "https://i.ibb.co.com/W4xBpN24/Clean-online-pharmacy-hero-image-only-medicine-products-neatly-arranged-medicine-bottles-blister.jpg",
    imageAlt = "Modern Medical Facility",
    features = [
        {
            icon: <HeartPulse className="h-auto w-5 text-red-600" />,
            title: "24/7 Patient Care",
            description:
                "Round-the-clock medical support ensuring continuous care for all our patients and partners.",
        },
        {
            icon: <Stethoscope className="h-auto w-5 text-red-600" />,
            title: "Expert Medical Team",
            description:
                "Access to certified healthcare professionals and specialists across various medical fields.",
        },
        {
            icon: <ShieldCheck className="h-auto w-5 text-red-600" />,
            title: "Trusted Safety Standards",
            description:
                "Highest quality medical supplies and equipment meeting international safety protocols.",
        },
    ],
    className,
}: HeroSectionProps) => {
    return (
        <section className={cn("  relative py-10 sm:py-16 md:py-20 lg:py-16  overflow-hidden", className)}>
            
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50"></div>


            <div className="container max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
               
                <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16 flex flex-col items-center gap-4 sm:gap-5 md:gap-6 text-center">
                    <Badge
                        variant="secondary"
                        className="px-3 py-1 sm:px-4 text-xs sm:text-sm font-medium bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                    >
                        {badge}
                    </Badge>
                    <h1 className="max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold sm:font-extrabold tracking-tight text-gray-900 px-4 sm:px-0">
                        {heading}
                    </h1>
                    <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 px-4 sm:px-0">
                        Delivering excellence in healthcare through innovative solutions,
                        cutting-edge technology, and compassionate patient care.
                    </p>
                </div>

                <div className="relative mx-auto max-w-full lg:max-w-5xl xl:max-w-6xl group px-4 sm:px-0">
           
                   

                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-red-100 sm:border-2 bg-white shadow-lg sm:shadow-xl lg:shadow-2xl shadow-red-100/30 sm:shadow-red-100/50">
                        <Image
                            src={imageSrc ?? ""}
                            alt={imageAlt ?? "Hero Image"}
                            width={1200}
                            height={800}
                            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                        />


                    </div>

             
                </div>

                
                <div className="mx-auto mt-12 sm:mt-14 md:mt-16 lg:mt-20 max-w-full lg:max-w-5xl px-4 sm:px-6 lg:px-0">
                    <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl lg:shadow-2xl shadow-red-50/30 sm:shadow-red-50/50 backdrop-blur-sm">
                    
                        <div className="absolute inset-0 opacity-5 [background-image:radial-gradient(circle_at_center,#dc2626_1px,transparent_1px)] [background-size:16px_16px] sm:[background-size:20px_20px]"></div>

                        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {features.map((feature, index) => (
                                <div key={feature.title} className="relative group">
                                
                                    {index < features.length - 1 && (
                                        <>
                                            <Separator
                                                orientation="vertical"
                                                className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-red-200 to-transparent hidden lg:block"
                                            />
                                            <Separator
                                                orientation="horizontal"
                                                className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-200 to-transparent block sm:hidden mb-4"
                                            />
                                        </>
                                    )}

                    
                                    {index === 1 && (
                                        <Separator
                                            orientation="horizontal"
                                            className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-200 to-transparent hidden sm:block lg:hidden mb-6"
                                        />
                                    )}

                                    <div className="flex flex-col items-start text-left p-4 sm:p-6 rounded-xl sm:rounded-2xl  duration-300 hover:bg-white/80 hover:shadow-md ">
                                        <div className="mb-4 sm:mb-5 flex size-10 sm:size-12 lg:size-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 shadow-inner group-hover:shadow-md">
                                            <div className="relative">
                                                {feature.icon}
                                                <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-20"></div>
                                            </div>
                                        </div>
                                        <h3 className="mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-gray-700">
                                            {feature.description}
                                        </p>

                                        <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full group-hover:w-12 sm:group-hover:w-16 transition-all duration-300"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent rounded-full"></div>
                    </div>
                </div>

        
               
            </div>
        </section>
    );
};

export { HeroSection };
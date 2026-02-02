"use client";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { Button } from "@/app/commonLayout/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/app/type/user";
export default function HeroSection() {
    const { data: session } = authClient.useSession();

    const userRole = (session?.user as any)?.role?.toUpperCase() as UserRole || "CUSTOMER";

    return (
        <section className="relative w-full bg-background min-h-[600px] flex items-center">
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-1000">


                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
                            Your Health, <br />
                            <span className="text-primary">Our Priority</span>.
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Find and buy essential medicines and healthcare products from
                            trusted sellers. Expert care delivered fast to your door.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Button size="lg" className="h-14 px-10 text-lg gap-2 bg-red-500 
                             hover:bg-red-600 text-white" asChild>
                                <Link href="/shop">
                                    Shop Now <ArrowRight className="size-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-lg"
                                asChild
                            >
                                {userRole === "SELLER" ? (
                                    <Link href="/seller/dashboard">Seller Dashboard</Link>
                                ) : (
                                    <Link href="/register">Become a Seller</Link>
                                )}
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                            <div className="flex flex-col gap-1">
                                <Truck className="size-6 text-primary" />
                                <span className="text-sm font-bold">Cash On Delivery</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <Clock className="size-6 text-primary" />
                                <span className="text-sm font-bold">24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] w-full animate-in fade-in zoom-in duration-1000">
                        <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3" />
                        <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-8 border-background shadow-2xl rotate-1">
                            <Image
                                src="https://i.ibb.co.com/GvsYcgYN/images-1.jpg"
                                alt="Healthcare Professional"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
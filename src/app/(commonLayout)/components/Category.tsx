"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/app/(commonLayout)/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface CategoryType {
    id: string
    name: string
    image?: string
    createdAt?: string
}

export default function Category() {
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://medi-stores-backend.vercel.app/api/categories")
                if (!res.ok) throw new Error("Failed to fetch categories")
                const data = await res.json()
                setCategories(data)
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin w-10 h-10 text-red-500" />
            </div>
        )
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>
    }

    return (
        <div className="mt-16">
            <p className="text-center text-red-500 font-bold text-2xl lg:text-4xl">
                -- Available Categories --
            </p>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            className="border-red-500 border-2 shadow-lg hover:scale-105 transition-transform duration-200"
                        >
                            <CardHeader className="p-0">
                                <div className="relative w-full h-40">
                                    <Image
                                        src={
                                            category.image ||
                                            "https://via.placeholder.com/400x300?text=Category"
                                        }
                                        alt={category.name}
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                            </CardHeader>

                            <CardContent className="flex flex-col items-center gap-3 py-4">
                                <CardTitle className="text-lg font-semibold text-red-500 text-center">
                                    {category.name}
                                </CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

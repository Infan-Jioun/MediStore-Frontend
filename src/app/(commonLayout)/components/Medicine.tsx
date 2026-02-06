"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type MedicineItem = {
    id: string
    name: string
    price: number
    stock: number
    manufacturer: string
    dosage?: string | null
    imageUrl?: string | null
}

export default function Medicine() {
    const [medicines, setMedicines] = useState<MedicineItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("http://localhost:5000/api/medicines")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch")
                return res.json()
            })
            .then((data) => setMedicines(data.slice(0, 3)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading)
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-red-500" />
            </div>
        )

    if (error)
        return (
            <p className="text-red-600 text-center py-10">
                {error}
            </p>
        )

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Featured Medicines</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {medicines.map((med) => (
                    <Card key={med.id} className="hover:shadow-lg transition">
                        <CardHeader className="flex flex-col items-center">
                            <Image
                                src={med.imageUrl || "/placeholder.png"}
                                alt={med.name}
                                width={100}
                                height={100}
                                className="w-24 h-24 object-cover mb-2 rounded"
                            />
                            <h3 className="text-lg font-semibold">{med.name}</h3>
                            <p className="text-gray-500 text-sm">{med.dosage || "N/A"}</p>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-blue-600 font-bold text-lg">${med.price}</p>
                            <div className="text-xs text-gray-400 mt-2">
                                <p>Stock: {med.stock}</p>
                                <p>{med.manufacturer}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/shop?medicine=${med.id}`}>Buy Now</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button asChild>
                    <Link href="/shop">View More Shop</Link>
                </Button>
            </div>
        </div>
    )
}

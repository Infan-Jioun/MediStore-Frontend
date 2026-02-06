"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type MedicineItem = {
    id: string
    name: string
    price: number
    stock: number
    manufacturer: string
    dosage?: string | null
    imageUrl?: string | null
    category: string
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
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin w-10 h-10 text-red-500" />
            </div>
        )

    if (error)
        return (
            <p className="text-red-600 text-center py-10">
                {error}
            </p>
        )

    return (
        <div className="max-w-7xl mx-auto px-5 py-8 mt-16 mb-16">
            <p className="text-center text-red-500 font-bold text-2xl lg:text-4xl">
                -- AFeatured Medicines --
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {medicines.map((medicine) => (
                    <Card key={medicine.id} className="flex flex-col">
                        <div className="h-48 bg-muted">
                            {medicine.imageUrl ? (
                                <img
                                    src={medicine.imageUrl}
                                    alt={medicine.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground">
                                    No Image
                                </div>
                            )}
                        </div>

                        <CardHeader>
                            <CardTitle className="line-clamp-2">{medicine.name}</CardTitle>
                            <CardDescription>
                                {medicine.manufacturer} • {medicine.dosage || "N/A"}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3 flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">${medicine.price.toFixed(2)}</span>
                                <Badge variant={medicine.stock > 0 ? "secondary" : "destructive"}>
                                    Stock: {medicine.stock}
                                </Badge>
                            </div>
                            <div className="text-sm">
                                Category: <span className="font-medium">{medicine.category?.name}</span>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end gap-2 border-t">
                            <Button size="sm" className="bg-red-500 hover:bg-red-500 text-white hover:text-white" variant="outline" asChild>
                                <Link href={`/medicines/${medicine.id}`}>

                                  View  Deatils
                                </Link>
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

"use client"

import React from "react"
import Link from "next/link"
import { Pill, Building2, Package, ImageOff } from "lucide-react"
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
    category: {
        name: string
    }
}

interface Props {
    medicine: MedicineItem
}

export default function MedicineCard({ medicine }: Props) {
    return (
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
    )
}
"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/app/(commonLayout)/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Package, Loader2 } from "lucide-react"
import Link from "next/link"

type Medicine = {
    id: string
    name: string
    slug?: string | null
    description?: string | null
    price: number
    stock: number
    manufacturer: string
    dosage?: string | null
    imageUrl?: string | null
    category: {
        id: string
        name: string
    }
    createdAt: string
    updatedAt: string
}

export default function MyMedicine() {
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMyMedicines = async () => {
        try {
            setLoading(true)
            setError(null)

            const res = await fetch("/api/seller/medicines", {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })

            if (!res.ok) {
                throw new Error("Failed to load medicines")
            }

            const result = await res.json()
            setMedicines(Array.isArray(result.data) ? result.data : [])
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Delete this medicine?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            reverseButtons: true,
        })

        if (!result.isConfirmed) return

        try {
            const res = await fetch(`/api/seller/medicines/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })

            if (!res.ok) {
                throw new Error("Delete failed")
            }

            setMedicines((prev) => prev.filter((m) => m.id !== id))

            Swal.fire({
                title: "Deleted",
                text: "Medicine has been removed successfully.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            })
        } catch {
            Swal.fire({
                title: "Error",
                text: "Failed to delete medicine.",
                icon: "error",
            })
        }
    }

    useEffect(() => {
        fetchMyMedicines()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[60vh] not-first:">
                <Loader2 className="h-12 w-12 animate-spin text-red-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
                <p className="mb-6">{error}</p>
                <Button onClick={fetchMyMedicines}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Medicines</h1>
                <Button asChild className="bg-red-500 hover:bg-red-500">
                    <Link href="/add-medicine">Add New Medicine</Link>
                </Button>
            </div>

            {medicines.length === 0 ? (
                <div className="text-center py-20 border border-dashed rounded-xl">
                    <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No medicines found</h3>
                    <Button asChild>
                        <Link href="/seller/add-medicine">Add Medicine</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                                    Category: <span className="font-medium">{medicine.category.name}</span>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-end gap-2 border-t">
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`/my-medicine/${medicine.id}/update`}>
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(medicine.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

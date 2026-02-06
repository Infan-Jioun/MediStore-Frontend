"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

type Medicine = {
    id: string
    name: string
    slug?: string | null
    description?: string | null
    price: number
    stock: number
    status: "PLACED"
    manufacturer: string
    dosage?: string | null
    imageUrl?: string | null
    category: {
        name: string
    }
    seller: {
        name: string
    }
    createdAt: string
    updatedAt: string
}

export default function MedicineDetails() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [medicine, setMedicine] = useState<Medicine | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [shippingAddress, setShippingAddress] = useState("")
    const [session, setSession] = useState<any | null>(null)

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await fetch(`http://localhost:5000/api/medicines/${id}`)

                if (!res.ok) {
                    throw new Error("Failed to load medicine details")
                }

                const data = await res.json()
                setMedicine(data)
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        const fetchSession = async () => {
            try {
                const res = await fetch(`http://localhost:5000/get-session`, {
                    credentials: "include",
                    cache: "no-store"
                })
                const data = await res.json()
                setSession(data)
            } catch (err) {
                console.error(err)
                setSession(null)
            }
        }

        if (id) fetchMedicine()
        fetchSession()
    }, [id])

    const handlePlaceOrder = async () => {
        if (!medicine) return

        if (quantity < 1 || quantity > medicine.stock) {
            toast.error("Invalid quantity")
            return
        }

        if (!shippingAddress.trim()) {
            toast.error("Shipping address is required")
            return
        }


        const session = await authClient.getSession()

        if (!session?.data) {
            toast.error("Please log in to place order")
            router.push("/login")
            return
        }

        try {
            const payload = {
                medicineItems: [
                    {
                        medicineId: medicine.id,
                        quantity,
                    },
                ],
                shippingAddress,
            }

            const res = await fetch(`http://localhost:5000/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            const text = await res.text()
            if (!res.ok) {
                throw new Error(text || "Failed to place order")
            }

            const order = text ? JSON.parse(text) : null

            toast.success("Order placed successfully!")
            router.push("/orders")
        } catch (err: any) {
            toast.error(err.message || "Something went wrong")
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[60vh]">
                <Loader2 className=" w-10 h-10 animate-spin text-red-500" />
            </div>
        )
    }

    if (error || !medicine) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <p className="text-lg text-destructive">{error || "Medicine not found"}</p>
                <Button variant="link" onClick={() => window.history.back()} className="mt-4">
                    Go Back
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">

            <Card className="overflow-hidden">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="relative h-96 md:h-auto">
                        {medicine.imageUrl ? (
                            <img
                                src={medicine.imageUrl}
                                alt={medicine.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    <div className="p-6 space-y-6">
                        <CardHeader className="p-0">
                            <CardTitle className="text-3xl">{medicine.name}</CardTitle>
                            <CardDescription className="text-lg">
                                {medicine.manufacturer} • {medicine.dosage || "N/A"}
                            </CardDescription>
                        </CardHeader>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-primary">${medicine.price.toFixed(2)}</span>
                                <Badge variant={medicine.stock > 0 ? "secondary" : "destructive"} className="text-base px-3 py-1">
                                    Stock: {medicine.stock}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Category: <span className="font-medium">{medicine.category.name}</span></p>
                                <p className="text-sm text-muted-foreground">Seller: <span className="font-medium">{medicine.seller.name}</span></p>
                                <p className="text-sm text-muted-foreground">Added: {new Date(medicine.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm text-muted-foreground">Last Updated: {new Date(medicine.updatedAt).toLocaleDateString()}</p>
                            </div>

                            {medicine.description && (
                                <>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold mb-2">Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">{medicine.description}</p>
                                    </div>
                                </>
                            )}

                            <Separator />

                            <div>
                                <h3 className="font-semibold mb-2">Quantity</h3>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min={1}
                                    max={medicine.stock}
                                    className="w-32"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Shipping Address</h3>
                                <Textarea
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Enter your shipping address"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <CardFooter className="flex justify-end p-6 border-t">
                    <Button
                        size="lg"
                        className="bg-red-500 hover:bg-red-500 text-white hover:text-white"
                        disabled={medicine.stock === 0}
                        onClick={handlePlaceOrder}
                    >
                        {medicine.stock > 0 ? "Place Order" : "Out of Stock"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
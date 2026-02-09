
"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Package, Calendar, MapPin, ReceiptText, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { authClient } from "@/lib/auth-client"
import OrderStatusBadge from "./components/OrderStatusBadge"
import ReviewSection from "./components/ReviewSection"

type OrderItem = { id: string; quantity: number; price: number; medicine: { id: string; name: string; price: number }; reviewRating?: number; reviewComment?: string }
type Order = { id: string; totalAmount: number; shippingAddress: string; createdAt: string; status: string; items: OrderItem[] }

export default function OrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const session = await authClient.getSession()
                if (!session?.data) return router.replace("/login")

                const res = await fetch("/api/orders",
                    { credentials: "include", cache: "no-store" })
                if (!res.ok) throw new Error("Failed to load orders")
                const data = await res.json()
                setOrders(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [router])

    const handleReviewSubmit = async (medicineId: string, rating: number, comment: string) => {
        if (!rating) return alert("Please provide a rating")
        try {
            const res = await fetch(`/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ medicineId, rating, comment }),
                credentials: "include",
            })
            if (!res.ok) throw new Error("Submission failed")
            alert("Review submitted successfully!")
        } catch (err: any) {
            alert(err.message)
        }
    }

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </div>
    )

    return (
        <div className="min-h-screen bg-white text-slate-900 pb-20">

            <div className="bg-red-600 pt-16 pb-24 px-4 text-center">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <ReceiptText className="w-10 h-10 text-white" />
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">My Orders</h1>
                </div>
                <p className="text-red-100 max-w-md mx-auto">Track your health essentials and share your feedback with us.</p>
            </div>


            <div className="container mx-auto px-4 -mt-12">
                <div className="bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="border-b border-red-100">
                                <TableHead className="text-red-600 font-bold py-6 pl-6 uppercase text-xs">ID & Date</TableHead>
                                <TableHead className="text-red-600 font-bold uppercase text-xs text-right">Total Amount</TableHead>
                                <TableHead className="text-red-600 font-bold uppercase text-xs pl-10">Items & Reviews</TableHead>
                                <TableHead className="text-red-600 font-bold uppercase text-xs text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-red-50/20 transition-all border-b border-red-50">
                                    <TableCell className="py-6 pl-6">
                                        <div className="font-mono font-bold text-red-600">#{order.id.slice(-6).toUpperCase()}</div>
                                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right font-black text-lg text-slate-800">
                                        ${order.totalAmount.toFixed(2)}
                                    </TableCell>

                                    <TableCell className="pl-10 py-6 min-w-[350px]">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="group">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-bold text-slate-700">{item.medicine.name}</span>
                                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">×{item.quantity}</span>
                                                    </div>
                                                    <ReviewSection
                                                        item={item}
                                                        onReviewSubmit={(r, c) => handleReviewSubmit(item.medicine.id, r, c)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <OrderStatusBadge status={order.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
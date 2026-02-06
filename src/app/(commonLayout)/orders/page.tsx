"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Package, Calendar, MapPin, ReceiptText } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { authClient } from "@/lib/auth-client"

type OrderItem = {
    id: string
    quantity: number
    price: number
    medicine: {
        id: string
        name: string
        price: number
    }
}

type Order = {
    id: string
    totalAmount: number
    shippingAddress: string
    createdAt: string
    status: string
    items: OrderItem[]
}

export default function OrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true)
                const session = await authClient.getSession()
                if (!session?.data) {
                    router.replace("/login")
                    return
                }

                const res = await fetch("http://localhost:5000/api/orders", {
                    credentials: "include",
                    cache: "no-store",
                })

                const text = await res.text()
                if (!res.ok) throw new Error(text || "Failed to load orders")
                const data = text ? JSON.parse(text) : []
                setOrders(data)
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [router])

    if (loading)
        return (
            <div className="container min-h-screen mx-auto py-24 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-red-600" />

            </div>
        )

    if (error)
        return (
            <div className="container mx-auto py-24 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                    <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Retry Connection
                    </Button>
                </div>
            </div>
        )

    if (orders.length === 0)
        return (
            <div className="container mx-auto py-24 text-center">
                <Package className="w-16 h-16 text-red-200 mx-auto mb-4" />
                <p className="text-red-400 text-xl font-medium">No orders found yet.</p>
                <Button
                    variant="outline"
                    className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => router.push("/")}
                >
                    Start Shopping
                </Button>
            </div>
        )

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="container mx-auto py-12 px-4 max-w-6xl">
                <div className="flex justify-center items-center gap-3 mb-2 ">
                    <ReceiptText className="w-8 h-8 text-red-600" />
                    <h1 className="text-4xl text-red-600 font-extrabold">
                        My Orders
                    </h1>
                </div>
                <p className="text-slate-500 mb-8  text-center">Review and track your recent medical supplies.</p>

                <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-red-50/50">
                            <TableRow className="hover:bg-transparent border-red-100">
                                <TableHead className="text-red-900 font-bold py-5">Order ID</TableHead>
                                <TableHead className="text-red-900 font-bold">
                                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Placed On</div>
                                </TableHead>
                                <TableHead className="text-red-900 font-bold text-right">Total</TableHead>
                                <TableHead className="text-red-900 font-bold">
                                    <div className="flex items-center gap-2 ml-4"><MapPin className="w-4 h-4" /> Destination</div>
                                </TableHead>
                                <TableHead className="text-red-900 font-bold">Items</TableHead>
                                <TableHead className="text-red-900 font-bold text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-red-50/30 transition-colors border-red-50">
                                    <TableCell className="font-mono text-red-600 font-medium">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-slate-600">
                                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-900">
                                        ${order.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate text-slate-600 pl-4">
                                        {order.shippingAddress}
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex flex-col text-sm border-l-2 border-red-100 pl-2">
                                                    <span className="font-medium text-slate-800">{item.medicine.name}</span>
                                                    <span className="text-red-500 text-xs">Qty: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status.toLowerCase() === 'completed'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {order.status}
                                        </span>
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
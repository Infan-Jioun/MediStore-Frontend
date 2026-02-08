"use client"
export const dynamic = "force-dynamic"  
import { useEffect, useState } from "react"
import {
    Loader2,
    ShieldCheck,
    Calendar,
    MapPin,
    DollarSign,
    ShoppingBag,
    MoreHorizontal
} from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Order = {
    id: string
    totalAmount: number
    shippingAddress: string
    createdAt: string
    status?: string
    items: {
        id: string
        quantity: number
        price: number
        medicine: {
            name: string
        }
    }[]
}

export default function OrdersManagement() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("https://medi-stores-backend.vercel.app/api/admin/orders", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                })

                if (!res.ok) throw new Error("Failed to fetch orders")

                const data = await res.json()
                setOrders(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) return (
        <div className="flex min-h-screen justify-center items-center  gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-red-600" />

        </div>
    )

    if (error) return (
        <div className="p-8 text-center">
            <div className="inline-block rounded-lg bg-red-50 p-6 border border-red-100">
                <p className="text-red-600 font-bold">{error}</p>
                <Button variant="outline" className="mt-4 border-red-200" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        </div>
    )

    return (
        <div className="space-y-8 pb-10">

            <div className="flex justify-center items-center  pb-5">
                <div>
                    <div className="flex items-center gap-2 mt-10">
                        <ShieldCheck className="h-6 w-6 text-red-600" />
                        <h1 className="text-3xl font-black tracking-tight text-red-600 uppercase">
                            Orders Control
                        </h1>
                    </div>
                    <p className="text-slate-500 mt-3">Manage and monitor all incoming pharmacy orders.</p>
                </div>

            </div>


            <div className="rounded-xl border border-red-100 bg-white shadow-xl shadow-red-500/5 overflow-hidden">
                <Table>
                    <TableHeader className="bg-red-600">
                        <TableRow className="hover:bg-red-600 border-none">
                            <TableHead className="text-white font-bold py-4 pl-6 uppercase text-xs tracking-wider">Order Reference</TableHead>
                            <TableHead className="text-white font-bold uppercase text-xs tracking-wider">Date & Time</TableHead>
                            <TableHead className="text-white font-bold uppercase text-xs tracking-wider">Customer Details</TableHead>
                            <TableHead className="text-white font-bold uppercase text-xs tracking-wider text-right">Revenue</TableHead>
                            <TableHead className="text-white font-bold uppercase text-xs tracking-wider text-center">Items</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-slate-400 font-medium italic">
                                    No records found in the system.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-red-50/50 transition-colors border-red-50">

                                    <TableCell className="py-5 pl-6">
                                        <div className="flex flex-col">
                                            <span className="font-mono font-bold text-red-600">#{order.id.slice(0, 8).toUpperCase()}</span>
                                            <Badge variant="outline" className="w-fit text-[10px] mt-1 border-red-200 text-red-600 bg-red-50">MANUAL_PAY</Badge>
                                        </div>
                                    </TableCell>


                                    <TableCell>
                                        <div className="flex flex-col text-sm text-slate-600">
                                            <div className="flex items-center gap-1.5 font-medium">
                                                <Calendar className="h-3.5 w-3.5 text-red-400" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            <span className="text-xs text-slate-400 ml-5">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-start gap-1.5 max-w-[200px]">
                                            <MapPin className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-700 line-clamp-2 leading-snug">{order.shippingAddress}</span>
                                        </div>
                                    </TableCell>


                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-0.5 font-black text-slate-900">
                                            <span className="text-red-600 text-xs font-bold">৳</span>
                                            {order.totalAmount.toLocaleString()}
                                        </div>
                                    </TableCell>


                                    <TableCell className="text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">
                                                <ShoppingBag className="h-3 w-3" />
                                                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                                            </div>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Medicines</span>
                                        </div>
                                    </TableCell>



                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
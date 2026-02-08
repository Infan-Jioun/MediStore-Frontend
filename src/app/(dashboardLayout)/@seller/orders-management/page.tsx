"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { Loader2, ShoppingBasket, Clock, CheckCircle2, Package, Truck, XCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type OrderItem = {
  id: string
  quantity: number
  medicine: {
    name: string
  }
}

type Order = {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  items: OrderItem[]
}

const STATUS_CONFIG: Record<string, { label: string }> = {
  PLACED: { label: "Placed" },
  PROCESSING: { label: "Processing" },
  SHIPPED: { label: "Shipped" },
  DELIVERED: { label: "Delivered" },
  CANCELLED: { label: "Cancelled" },
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://medi-stores-backend.vercel.app/api/seller/orders", {
          credentials: "include",
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const updateStatus = async (orderId: string, status: string) => {
    try {
      setUpdatingId(orderId)
      const res = await fetch(`https://medi-stores-backend.vercel.app/api/seller/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    } catch (err) {
      alert("Status update failed")
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-red-600" />
        <p className="text-red-500 font-medium animate-pulse">Syncing orders...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex  justify-center items-center gap-4 border-b border-red-100 pb-6">
        <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-200">
          <ShoppingBasket className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-red-500 uppercase ">
            Incoming Orders
          </h1>
          <p className="text-slate-500 text-sm font-medium text-center">Manage your sales and fulfillments</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-red-100 shadow-2xl shadow-red-500/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-red-50">
              <TableHead className="py-5 pl-6 text-red-600 font-bold uppercase text-xs tracking-widest">Identification</TableHead>
              <TableHead className="text-red-600 font-bold uppercase text-xs tracking-widest">Order Details</TableHead>
              <TableHead className="text-red-600 font-bold uppercase text-xs tracking-widest">Total Amount</TableHead>
              <TableHead className="text-red-600 font-bold uppercase text-xs tracking-widest text-center">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-slate-400 italic">
                  No orders found in your store yet.
                </TableCell>
              </TableRow>
            ) : (
              orders.map(order => (
                <TableRow key={order.id} className="hover:bg-red-50/30 transition-all border-b border-red-50/50">
                  <TableCell className="py-6 pl-6">
                    <div className="font-mono font-bold text-slate-900">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-bold">
                      ID: {order.id.slice(-6)}
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[300px]">
                    <div className="space-y-1.5">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-2 group">
                          <span className="h-1 w-1 bg-red-400 rounded-full group-hover:scale-150 transition-all" />
                          <span className="text-sm font-semibold text-slate-700">{item.medicine.name}</span>
                          <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 h-5 border-none">
                            ×{item.quantity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-baseline gap-0.5 font-black text-slate-900 text-lg">
                      <span className="text-red-600 text-sm">৳</span>
                      {order.totalAmount.toLocaleString()}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Select
                        defaultValue={order.status}
                        onValueChange={value => updateStatus(order.id, value)}
                        disabled={updatingId === order.id}
                      >
                        <SelectTrigger className="w-[160px] h-10 border-red-100 focus:ring-red-500 rounded-xl font-bold text-xs uppercase tracking-tighter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-red-100">
                          {Object.keys(STATUS_CONFIG).map(status => (
                            <SelectItem key={status} value={status} className="text-xs font-bold focus:bg-red-50 focus:text-red-600">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {updatingId === order.id ? (
                        <div className="flex items-center gap-2 text-red-600 animate-pulse">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-[10px] font-bold uppercase">Updating...</span>
                        </div>
                      ) : (
                        <Badge className={"h-6 text-[10px] rounded-full border-none px-3 font-bold uppercase tracking-wider shadow-sm "}>
                          {order.status}
                        </Badge>
                      )}
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
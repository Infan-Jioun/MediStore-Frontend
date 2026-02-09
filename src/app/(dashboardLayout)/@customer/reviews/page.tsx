"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { Loader2, Trash2, Save } from "lucide-react"
import Swal from "sweetalert2"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

type Review = {
    id: string
    rating: number
    comment?: string | null
    medicine: {
        id: string
        name: string
    }
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true)
                const session = await authClient.getSession()
                if (!session?.data) {
                    window.location.href = "/login"
                    return
                }

                const res = await fetch("/api/reviews", {
                    credentials: "include",
                    cache: "no-store",
                })

                if (!res.ok) {
                    toast.error("Failed to load reviews")
                    return
                }

                const data = await res.json()
                setReviews(data)
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        loadReviews()
    }, [])

    const handleUpdate = async (review: Review) => {
        try {
            const res = await fetch(`/api/reviews/${review.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    rating: review.rating,
                    comment: review.comment,
                }),
            })

            if (!res.ok) {
                toast.error("Update failed")
                return
            }

            toast.success("Update success")
        } catch (err: any) {
            toast.error(err.message || "Something went wrong")
        }
    }

    const handleDelete = async (review: Review) => {
        const confirmed = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        })

        if (!confirmed.isConfirmed) return

        try {
            const res = await fetch(`/api/reviews/${review.id}`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!res.ok) {
                toast.error("Delete failed")
            } else {
                toast.success("Successfully Deleted")
                setReviews((prev) => prev.filter((r) => r.id !== review.id))
            }
        } catch (err: any) {
            toast.error("Something went wrong")
        }
    }

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
            </div>
        )

    if (error)
        return (
            <div className="text-center py-24 text-red-600 font-semibold">{error}</div>
        )

    if (reviews.length === 0)
        return (
            <div className="text-center py-24 text-red-400">No reviews found</div>
        )

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <h1 className="text-3xl font-extrabold text-red-600 mb-8 text-center">
                My Reviews
            </h1>

            <div className="bg-white border border-red-100 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-red-50">
                        <TableRow>
                            <TableHead className="text-red-900 font-bold">Medicine</TableHead>
                            <TableHead className="text-red-900 font-bold">Rating</TableHead>
                            <TableHead className="text-red-900 font-bold">Comment</TableHead>
                            <TableHead className="text-red-900 font-bold text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow key={review.id} className="hover:bg-red-50/40">
                                <TableCell className="font-semibold text-red-700">
                                    {review.medicine.name}
                                </TableCell>

                                <TableCell>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={5}
                                        className="w-20 border-red-200 text-red-700"
                                        value={review.rating}
                                        onChange={(e) =>
                                            setReviews((prev) =>
                                                prev.map((r) =>
                                                    r.id === review.id
                                                        ? { ...r, rating: Number(e.target.value) }
                                                        : r
                                                )
                                            )
                                        }
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={review.comment || ""}
                                        className="border-red-200 text-red-700"
                                        onChange={(e) =>
                                            setReviews((prev) =>
                                                prev.map((r) =>
                                                    r.id === review.id
                                                        ? { ...r, comment: e.target.value }
                                                        : r
                                                )
                                            )
                                        }
                                    />
                                </TableCell>

                                <TableCell className="flex justify-center gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleUpdate(review)}
                                    >
                                        <Save className="w-4 h-4 mr-1" />
                                        Update
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-600 text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(review)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

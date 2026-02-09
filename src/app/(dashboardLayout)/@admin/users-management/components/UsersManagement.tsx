"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/app/(commonLayout)/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface UserType {
    id: string
    name: string
    email: string
    role: string
    isBanned: "ACTIVE" | "BANNED"
    createdAt: string
}

export default function UsersManagement() {
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/users", {
                credentials: "include",
            })
            if (!res.ok) throw new Error("Failed to fetch users")
            const data = await res.json()
            setUsers(data)
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const toggleBan = async (user: UserType) => {
        const newStatus = user.isBanned === "ACTIVE" ? "BANNED" : "ACTIVE"
        setUpdatingId(user.id)
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ isBanned: newStatus }),
            })
            if (!res.ok) throw new Error("Failed to update status")
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === user.id ? { ...u, isBanned: newStatus } : u
                )
            )
            toast.success(
                `User ${user.name} is now ${newStatus === "BANNED" ? "banned" : "active"
                }`
            )
        } catch (err: any) {
            toast.error(err.message || "Something went wrong")
        } finally {
            setUpdatingId(null)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin w-10 h-10 text-red-500" />
            </div>
        )

    if (error)
        return <div className="text-center mt-10 text-red-500">{error}</div>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-center text-3xl font-bold text-red-500 mb-8">
                Users Management
            </h2>

            <ScrollArea className="rounded-md border">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={user.isBanned === "ACTIVE" ? "secondary" : "destructive"}
                                    >
                                        {user.isBanned}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        variant={user.isBanned === "ACTIVE" ? "destructive" : "default"}
                                        onClick={() => toggleBan(user)}
                                        disabled={updatingId === user.id}
                                    >
                                        {updatingId === user.id
                                            ? "Updating..."
                                            : user.isBanned === "ACTIVE"
                                                ? "Ban"
                                                : "Unban"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

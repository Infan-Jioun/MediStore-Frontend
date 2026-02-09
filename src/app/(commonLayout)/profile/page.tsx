"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CalendarDays, Mail, Loader2 } from "lucide-react";
import { Roles } from "@/constant/roles";

// Strongly typed user
type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "seller" | "customer";
    phone?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch user data");

                const data: User = await res.json();
                setUser(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-12 h-12 animate-spin text-red-600" />
                <p className="text-red-500">Loading profile...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-red-600 font-bold">
                    {error || "No user data found. Please log in."}
                </div>
            </div>
        );
    }

    return (
        <div className="container min-h-screen max-w-2xl mx-auto py-12 px-4">
            <Card className="overflow-hidden border-red-100 shadow-2xl shadow-red-500/10 rounded-3xl">
                <CardHeader className="relative pb-0 px-8">
                    <div className="pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {user.name || "Unknown Customer"}
                            </h1>
                            <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Mail className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-medium">{user.email}</span>
                            </div>
                        </div>
                        <Badge className="w-fit bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                            {Roles[user.role] || "CUSTOMER"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                    Account Role
                                </p>
                                <p className="text-sm font-bold text-slate-700">
                                    {Roles[user.role] || "Standard Customer"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <CalendarDays className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                    Joined On
                                </p>
                                <p className="text-sm font-bold text-slate-700">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>


                    {user.phone && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Mail className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                    Phone
                                </p>
                                <p className="text-sm font-bold text-slate-700">{user.phone}</p>
                            </div>
                        </div>
                    )}

                    {user.address && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Mail className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                    Address
                                </p>
                                <p className="text-sm font-bold text-slate-700">{user.address}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

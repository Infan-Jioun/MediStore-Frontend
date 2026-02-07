"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Loader2,
    Mail,
    ShieldCheck,
    CalendarDays,
    User,
    RefreshCw
} from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-12 h-12 animate-spin text-red-600" />

            </div>
        );
    }

    if (!session || !session.user) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-red-600 font-bold">
                    No user data found. Please log in.
                </div>
            </div>
        );
    }

    const { name, email, image, createdAt, updatedAt, role } = session.user;

    return (
        <div className="container min-h-screen justify-center items-center max-w-2xl mx-auto py-12 px-4 ">
            <Card className="overflow-hidden border-red-100 shadow-2xl shadow-red-500/10 rounded-3xl">



                <CardHeader className="relative pb-0 px-8">


                    <div className="pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {name || "Unknown Customer"}
                            </h1>
                            <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Mail className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-medium">{email}</span>
                            </div>
                        </div>
                        <Badge className="w-fit bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                            {role || "CUSTOMER"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Information Items */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Account Role</p>
                                <p className="text-sm font-bold text-slate-700">{role || "Standard Customer"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <CalendarDays className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Joined On</p>
                                <p className="text-sm font-bold text-slate-700">{new Date(createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>


                </CardContent>
            </Card>
        </div>
    );
}
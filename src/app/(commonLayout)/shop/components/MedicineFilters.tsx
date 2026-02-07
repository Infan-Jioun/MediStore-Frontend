"use client";

import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterProps {
    search: string;
    setSearch: (val: string) => void;
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
    categories: any[];
}

export const MedicineFilters = ({ search, setSearch, selectedCategory, setSelectedCategory, categories }: FilterProps) => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-red-500 p-8 md:p-12 shadow-2xl">

            <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                        Find Your Medicine
                    </h1>
                    <p className="text-white font-medium">Browse through certified healthcare products</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white   h-5 w-5" />
                        <Input
                            placeholder="Search by name, brand or manufacturer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 h-14  text-white placeholder:text-white  rounded-2xl transition-all"
                        />
                    </div>

                    <Select onValueChange={setSelectedCategory} value={selectedCategory || "all"}>
                        <SelectTrigger className="w-full md:w-64 h-14  text-white rounded-2xl focus:ring-red-600 backdrop-blur-md">
                            <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                                <Filter className="h-4 w-4 text-red-500" />
                                <SelectValue placeholder="Category" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="font-bold uppercase text-[10px]">All Categories</SelectItem>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id} className="font-medium text-xs">{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
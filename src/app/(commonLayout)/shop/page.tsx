"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { MedicineFilters } from "./components/MedicineFilters";
import MedicineCard from "./components/MedicineCard";

type Category = {
  id: string;
  name: string;
};

type Medicine = {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  stock: number;
  dosage?: string | null;
  imageUrl?: string | null;
  category: Category;
};

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://medi-stores-backend.vercel.app/api/medicines", {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch medicines");
        return res.json();
      }),
      fetch("https://medi-stores-backend.vercel.app/api/categories", {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      }),
    ])
      .then(([medicineData, categoryData]) => {
        setMedicines(medicineData);
        setFilteredMedicines(medicineData);
        setCategories(categoryData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = medicines.filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(search.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        (medicine.category && medicine.category.id === selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredMedicines(filtered);
  }, [search, selectedCategory, medicines]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
       
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 mb-20">

      <div className="text-center space-y-2 pt-10">
        <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em]">
          -- Our Collection --
        </p>
        <h2 className="text-4xl lg:text-5xl text-red-600 uppercase">
          Featured Medicines
        </h2>
      </div>

     
      <MedicineFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />


      {error ? (
        <div className="text-center p-20 bg-red-50 rounded-[40px] border border-red-100 text-red-600 font-bold uppercase tracking-widest">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
          {filteredMedicines.length === 0 && (
            <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <SearchIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 uppercase">
                No Medicines Found
              </h3>
              <p className="text-slate-500 text-sm">
                Try adjusting your search or category filters
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

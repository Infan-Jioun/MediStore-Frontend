"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search as SearchIcon, ShoppingBag } from "lucide-react";
import { MedicineFilters } from "./components/MedicineFilters";
import MedicineCard from "./components/MedicineCard";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://medi-stores-backend.vercel.app/api/medicines",
        { credentials: "include" })
        .then(res => res.json()),
      fetch("https://medi-stores-backend.vercel.app/api/categories",
        { credentials: "include" }).
        then(res => res.json())
    ])
      .then(([medData, catData]) => {
        setMedicines(medData);
        setFilteredMedicines(medData);
        setCategories(catData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = medicines.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === "all" || m.category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredMedicines(filtered);
  }, [search, selectedCategory, medicines]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-red-600" />

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 mb-20">

      <div className="text-center space-y-2 pt-10">
        <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em]">-- Our Collection --</p>
        <h2 className="text-4xl lg:text-5xl text-red-600  uppercase">
          Featured  Medicines
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
        <div className="text-center p-20 bg-red-50 rounded-[40px] border border-red-100 text-red-600 font-bold uppercase tracking-widest">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {filteredMedicines.map((medicine: any) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      )}

      {!loading && filteredMedicines.length === 0 && (
        <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
          <SearchIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 uppercase">No Medicines Found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search or category filters</p>
        </div>
      )}
    </div>
  );
}
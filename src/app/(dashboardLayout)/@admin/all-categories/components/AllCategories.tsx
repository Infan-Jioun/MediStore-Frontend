"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/app/(commonLayout)/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, Trash2, Pencil } from "lucide-react"

interface Category {
  id: string
  name: string
  image?: string
  createdAt: string
}

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editImage, setEditImage] = useState("")

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      })
      if (!res.ok) {
        throw new Error;
      }
      const data = await res.json()
      setCategories(data)
    } catch {
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      toast.error("Category name required")
      return
    }

    const res = await fetch(
      `/api/admin/categories/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: editName,
          image: editImage || undefined,
        }),
      }
    )

    if (!res.ok) {
      toast.error("Update failed")
      return
    }

    toast.success("Category updated")
    setEditingId(null)
    fetchCategories()
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this category?")
    if (!confirmed) return

    const res = await fetch(
      `/api/admin/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )

    if (!res.ok) {
      toast.error("Cannot delete category with medicines")
      return
    }

    toast.success("Category deleted")
    fetchCategories()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-red-500 w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-3xl font-bold text-red-500 mb-6">
        All Categories
      </h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="p-3">
                  {editingId === category.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td className="p-3">
                  {editingId === category.id ? (
                    <Input
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      placeholder="Image URL"
                    />
                  ) : (
                    <span className="text-gray-500">
                      {category.image ? "Yes" : "No"}
                    </span>
                  )}
                </td>

                <td className="p-3 flex justify-center gap-2">
                  {editingId === category.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(category.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(category.id)
                        setEditName(category.name)
                        setEditImage(category.image || "")
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

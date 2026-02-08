"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

type Category = {
  id: string
  name: string
}

type Medicine = {
  id: string
  name: string
  description?: string | null
  price: number
  stock: number
  manufacturer: string
  dosage?: string | null
  imageUrl?: string | null
  categoryId: string
}

export default function EditMedicine() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  const [medicine, setMedicine] = useState<Medicine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    manufacturer: "",
    dosage: "",
    imageUrl: "",
    categoryId: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        setCategoriesLoading(true)
        setCategoriesError(null)

        const [medicineRes, categoriesRes] = await Promise.all([
          fetch(`https://medi-stores-backend.vercel.app/api/seller/medicines/${id}`, { credentials: "include" }),
          fetch("https://medi-stores-backend.vercel.app/api/categories", { credentials: "include" }),
        ])

        if (!medicineRes.ok) throw new Error("Failed to load medicine")
        if (!categoriesRes.ok) throw new Error("Failed to load categories")

        const medData = await medicineRes.json()
        const catData = await categoriesRes.json()

        setMedicine(medData)
        setCategories(catData)
        setFormData({
          name: medData.name,
          description: medData.description || "",
          price: medData.price.toString(),
          stock: medData.stock.toString(),
          manufacturer: medData.manufacturer,
          dosage: medData.dosage || "",
          imageUrl: medData.imageUrl || "",
          categoryId: medData.categoryId,
        })
      } catch (err: any) {
        setError(err.message || "Something went wrong")
        toast.error(err.message || "Failed to load data")
      } finally {
        setLoading(false)
        setCategoriesLoading(false)
      }
    }

    fetchData()
  }, [id])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 3) errors.name = "Medicine name must be at least 3 characters"
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) errors.price = "Must be a positive number"
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) errors.stock = "Must be a non-negative number"
    if (!formData.manufacturer || formData.manufacturer.length < 2) errors.manufacturer = "Manufacturer name is required"
    if (!formData.categoryId) errors.categoryId = "Please select a category"
    if (formData.imageUrl && !/^https?:\/\/.+\..+/.test(formData.imageUrl)) errors.imageUrl = "Please provide a valid image URL"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      }

      const res = await fetch(`https://medi-stores-backend.vercel.app/api/seller/medicines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to update medicine")
      toast.success("Medicine updated successfully")
    } catch (err: any) {
      toast.error(err.message || "Failed to update medicine")
    }
  }

  if (loading) return <div className="flex min-h-[calc(100vh-80px)] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>
  if (error) return <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4"><p className="text-red-600">{error}</p></div>

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Medicine</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="edit-medicine-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="space-y-5"
          >
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel>Medicine Name</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Paracetamol 500mg"
                />
                {formErrors.name && <FieldError>{formErrors.name}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Price (BDT)</FieldLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="120.50"
                />
                {formErrors.price && <FieldError>{formErrors.price}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Stock Quantity</FieldLabel>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="100"
                />
                {formErrors.stock && <FieldError>{formErrors.stock}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Manufacturer</FieldLabel>
                <Input
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="Square Pharmaceuticals"
                />
                {formErrors.manufacturer && <FieldError>{formErrors.manufacturer}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Dosage (optional)</FieldLabel>
                <Input
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  placeholder="500mg tablet"
                />
              </Field>

              <Field>
                <FieldLabel>Image URL</FieldLabel>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/paracetamol.jpg"
                />
                {formErrors.imageUrl && <FieldError>{formErrors.imageUrl}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Category</FieldLabel>
                {categoriesLoading ? (
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Loading categories..." />
                    </SelectTrigger>
                  </Select>
                ) : categoriesError ? (
                  <div className="text-sm text-red-600">{categoriesError}</div>
                ) : (
                  <Select
                    value={formData.categoryId}
                    onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
                    disabled={categories.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {formErrors.categoryId && <FieldError>{formErrors.categoryId}</FieldError>}
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel>Description (optional)</FieldLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed description of the medicine..."
              />
            </Field>
          </form>
        </CardContent>

        <CardFooter className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" form="edit-medicine-form" className="bg-red-600 hover:bg-red-700 text-white">
            Update Medicine
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

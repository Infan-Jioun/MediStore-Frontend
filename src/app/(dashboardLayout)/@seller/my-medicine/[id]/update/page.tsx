"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

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

const formSchema = z.object({
    name: z.string().min(3, "Medicine name must be at least 3 characters").optional(),
    description: z.string().optional(),
    price: z.string()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), "Must be a positive number")
        .optional(),
    stock: z.string()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), "Must be a non-negative number")
        .optional(),
    manufacturer: z.string().min(2, "Manufacturer name is required").optional(),
    dosage: z.string().optional(),
    imageUrl: z.string().url("Please provide a valid image URL").optional(),
    categoryId: z.string().min(1, "Please select a category").optional(),
})

type FormValues = z.infer<typeof formSchema>

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

                if (!medicineRes.ok) {
                    throw new Error("Failed to load medicine")
                }
                if (!categoriesRes.ok) {
                    throw new Error("Failed to load categories")

                }
                const medData = await medicineRes.json()
                const catData = await categoriesRes.json()

                setMedicine(medData)
                setCategories(catData)
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
    const form = useForm<FormValues>({
        defaultValues: medicine
            ? {
                name: medicine.name,
                description: medicine.description || "",
                price: medicine.price,
                stock: medicine.stock,
                manufacturer: medicine.manufacturer,
                dosage: medicine.dosage || "",
                imageUrl: medicine.imageUrl || "",
                categoryId: medicine.categoryId,
            }
            : undefined,
        validators: { onSubmit: formSchema },
        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                price: value.price ? Number(value.price) : undefined,
                stock: value.stock ? Number(value.stock) : undefined,
            }

            try {
                const res = await fetch(`https://medi-stores-backend.vercel.app/api/seller/medicines/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                })

                if (!res.ok) throw new Error("Failed to update medicine")

                toast.success("Medicine updated successfully")
                router.push("/my-medicines")
            } catch (err: any) {
                toast.error(err.message || "Failed to update medicine")
            }
        },
    })

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
        )
    }

    if (error || !medicine) {
        return (
            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
                <p className="text-red-600">{error || "Medicine not found"}</p>
            </div>
        )
    }

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
                            form.handleSubmit()
                        }}
                        className="space-y-5"
                    >
                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Medicine Name</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="Paracetamol 500mg"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>




                            <form.Field name="price">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Price (BDT)</FieldLabel>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="120.50"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>

                            <form.Field name="stock">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Stock Quantity</FieldLabel>
                                            <Input
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="100"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>


                            <form.Field name="manufacturer">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Manufacturer</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="Square Pharmaceuticals"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>


                            <form.Field name="dosage">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Dosage (optional)</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="500mg tablet"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>


                            <form.Field name="imageUrl">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Image URL</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="https://example.com/paracetamol.jpg"
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>


                            <form.Field name="categoryId">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
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
                                                    value={field.state.value || ""}
                                                    onValueChange={field.handleChange}
                                                    disabled={categories.length === 0}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map((cat) => (
                                                            <SelectItem key={cat.id} value={cat.id}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                        </FieldGroup>


                        <form.Field name="description">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Description (optional)</FieldLabel>
                                        <Textarea
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Detailed description of the medicine..."
                                            rows={4}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        </form.Field>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="edit-medicine-form"
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Update Medicine
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useEffect, useState } from "react"

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
import { Button } from "@/app/(commonLayout)/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(3, "Medicine name must be at least 3 characters"),
    slug: z.string().optional(),
    description: z.string().optional(),
    price: z.string()
        .min(1, "Price is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
    stock: z.string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), "Must be a non-negative number"),
    manufacturer: z.string().min(2, "Manufacturer name is required"),
    dosage: z.string().optional(),
    imageUrl: z.string().url("Please provide a valid image URL"),
    categoryId: z.string().min(1, "Please select a category"),
})

type FormValues = z.infer<typeof formSchema>

type Category = {
    id: string
    name: string
    // image?: string   ← you can add if you want to show category images later
}

export default function AddMedicine() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [categoriesError, setCategoriesError] = useState<string | null>(null)

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true)
                const res = await fetch("http://localhost:5000/api/categories", {
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Failed to load categories")
                }

                const data = await res.json()
                setCategories(data)
            } catch (err) {
                setCategoriesError("Could not load categories. Please try again.")
                console.error(err)
            } finally {
                setLoadingCategories(false)
            }
        }

        fetchCategories()
    }, [])

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "0",
            manufacturer: "",
            dosage: "",
            imageUrl: "",
            categoryId: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                price: Number(value.price),
                stock: value.stock ? Number(value.stock) : 0,
            }

            const res = await fetch("http://localhost:5000/api/medicines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                toast.error("Failed to add medicine")
                return
            }

            toast.success("Medicine added successfully")
            form.reset()
        },
    })

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Add New Medicine</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        id="medicine-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-5"
                    >
                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Medicine Name *</FieldLabel>
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
                                            <FieldLabel>Price (BDT) *</FieldLabel>
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
                                            <FieldLabel>Manufacturer *</FieldLabel>
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
                                            <FieldLabel>Image URL *</FieldLabel>
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
                                            <FieldLabel>Category *</FieldLabel>
                                            {loadingCategories ? (
                                                <Select disabled>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Loading categories..." />
                                                    </SelectTrigger>
                                                </Select>
                                            ) : categoriesError ? (
                                                <div className="text-sm text-red-600">{categoriesError}</div>
                                            ) : (
                                                <Select
                                                    value={field.state.value}
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
                    <Button variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="medicine-form"
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Add Medicine
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
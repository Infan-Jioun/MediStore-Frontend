"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Pill, PlusCircle, Loader2, Image as ImageIcon, Banknote, Building2 } from "lucide-react"

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

type Category = {
    id: string
    name: string
}

export default function AddMedicine() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories", {
                    credentials: "include",
                })
                if (!res.ok) throw new Error()
                const data = await res.json()
                setCategories(data)
            } catch {
                toast.error("Could not load categories")
            } finally {
                setLoadingCategories(false)
            }
        }
        fetchCategories()
    }, [])

    const form = useForm({
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
        onSubmit: async ({ value }) => {
            setIsSubmitting(true)
            try {
                const payload = {
                    ...value,
                    price: Number(value.price),
                    stock: Number(value.stock),
                }

                const res = await fetch("/api/medicines", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                })

                if (!res.ok) throw new Error()

                toast.success("Medicine added successfully to inventory!")
                form.reset()
            } catch {
                toast.error("Failed to add medicine. Please check your permissions.")
            } finally {
                setIsSubmitting(false)
            }
        },
    })

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50/50 py-12 px-4">
            <Card className="w-full max-w-3xl border-none shadow-2xl shadow-red-100 rounded-[32px] overflow-hidden">
                <CardHeader className="bg-red-600 text-white p-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <PlusCircle className="size-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">
                                Add Medicine
                            </CardTitle>
                            <p className="text-red-100 text-xs font-bold uppercase tracking-widest mt-1">
                                Inventory Management
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    <form
                        id="medicine-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-8"
                    >
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Pill className="size-4 text-red-500" />
                                <h3 className="text-sm font-black uppercase text-slate-800">
                                    General Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <form.Field
                                    name="name"
                                    validators={{
                                        onChange: ({ value }) =>
                                            value.length < 3 && "Medicine name must be at least 3 characters",
                                    }}
                                >
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Medicine Name</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldError />
                                        </Field>
                                    )}
                                </form.Field>

                                <form.Field
                                    name="categoryId"
                                    validators={{
                                        onChange: ({ value }) =>
                                            !value && "Please select a category",
                                    }}
                                >
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Category</FieldLabel>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={field.handleChange}
                                                disabled={loadingCategories}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldError />
                                        </Field>
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <form.Field
                                name="price"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value || Number(value) <= 0 ? "Invalid price" : undefined,
                                }}
                            >
                                {(field) => (
                                    <Field>
                                        <FieldLabel>Price</FieldLabel>
                                        <Input
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldError />
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field
                                name="stock"
                                validators={{
                                    onChange: ({ value }) =>
                                        Number(value) < 0 && "Stock cannot be negative",
                                }}
                            >
                                {(field) => (
                                    <Field>
                                        <FieldLabel>Stock</FieldLabel>
                                        <Input
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldError />
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field
                                name="dosage"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value && "Dosage required",
                                }}
                            >
                                {(field) => (
                                    <Field>
                                        <FieldLabel>Dosage</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldError />
                                    </Field>
                                )}
                            </form.Field>
                        </div>

                        <form.Field
                            name="manufacturer"
                            validators={{
                                onChange: ({ value }) =>
                                    value.length < 2 && "Manufacturer required",
                            }}
                        >
                            {(field) => (
                                <Field>
                                    <FieldLabel>Manufacturer</FieldLabel>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldError />
                                </Field>
                            )}
                        </form.Field>

                        <form.Field
                            name="imageUrl"
                            validators={{
                                onChange: ({ value }) =>
                                    !value.startsWith("http") && "Invalid URL",
                            }}
                        >
                            {(field) => (
                                <Field>
                                    <FieldLabel>Image URL</FieldLabel>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldError />
                                </Field>
                            )}
                        </form.Field>

                        <form.Field name="description">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </Field>
                            )}
                        </form.Field>
                    </form>
                </CardContent>

                <CardFooter className="p-8 flex justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => form.reset()}>
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        form="medicine-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm & Save"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

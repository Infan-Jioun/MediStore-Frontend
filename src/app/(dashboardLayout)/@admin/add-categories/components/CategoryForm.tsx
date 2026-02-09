"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

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
import { Button } from "@/app/(commonLayout)/components/ui/button"

const formSchema = z.object({
    name: z.string().min(3, "Category name minimum 3 characters"),
    image: z
        .string()
        .url("Please provide a valid image URL"),
})

export function CategoryForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            image: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const res = await fetch(
                "/api/admin/categories",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(value),
                }
            )

            if (!res.ok) {
                toast.error("Category create failed")
                return
            }

            toast.success("Category created successfully")
            form.reset()
        },
    })

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Add Medicine Category</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        id="category-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <FieldGroup>

                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Category Name</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                placeholder="Pain Relief"
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>


                            <form.Field name="image">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Category Image URL</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" className="bg-red-500 hover:bg-red-500 text-white" form="category-form">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

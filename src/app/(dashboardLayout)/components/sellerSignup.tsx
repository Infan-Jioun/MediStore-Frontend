"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/app/(dashboardLayout)/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/app/(dashboardLayout)/components/ui/field"
import { Input } from "@/app/(dashboardLayout)/components/ui/input"
import Link from "next/link"
import { useForm } from "@tanstack/react-form";
import * as Z from "zod";
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

const formSchema = Z.object({
    name: Z.string().min(2, "This field is required"),
    email: Z.string().email("Invalid email address"),
    password: Z.string().min(8, "Password must be at least 8 characters")
})

export function SellerSignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            setServerError(null)
            const toastId = toast.loading("Creating User...")

            try {
                const payload = { ...value, role: "SELLER" }
                const { data, error } = await authClient.signUp.email(payload);

                if (error) {
                    setServerError(error.message || "Something went wrong! Please try again.")
                    toast.error("Registration failed", { id: toastId })
                    return;
                }

                toast.success("User created successfully", { id: toastId })
                router.push("/login")

            } catch (error) {
                setServerError("A connection error occurred.")
                toast.error("Something went wrong", { id: toastId })
            }
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Fill in the form below to create your account
                </p>
            </div>

            {serverError && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-3 text-destructive text-sm border border-destructive/20">
                    <AlertCircle className="h-4 w-4" />
                    <p>{serverError}</p>
                </div>
            )}

            <FieldGroup>
                <form.Field name="name" children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                            <Input id={field.name} name={field.name} type="text" placeholder="John Doe" value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />}
                        </Field>
                    )
                }} />

                <form.Field name="email" children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Your Email</FieldLabel>
                            <Input id={field.name} name={field.name} type="email" placeholder="Enter your email" value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />}
                        </Field>
                    )
                }} />

                <form.Field name="password" children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <Input id={field.name} name={field.name} type="password" placeholder="Provide Your Password" value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />}
                        </Field>
                    )
                }} />

                <Field>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white" disabled={!canSubmit || isSubmitting}>
                                {isSubmitting ? "Creating Account..." : "Create Account"}
                            </Button>
                        )}
                    />
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field>

                    <FieldDescription className="mt-4 text-center">
                        Already have an account? <Link href="/login" className="underline underline-offset-4  text-red-500 hover:text-red-600  font-bold ">Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
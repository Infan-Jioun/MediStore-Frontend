"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "@tanstack/react-form"
import * as Z from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

const loginSchema = Z.object({
  email: Z.string().email("Invalid email address"),
  password: Z.string().min(1, "Password is required"),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const toastId = toast.loading("Logging in...")
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        })

        if (error) {
          setServerError(error.message || "Invalid credentials")
          toast.error("Login failed", { id: toastId })
          return
        }

        toast.success("Login successful", { id: toastId })
        router.push("/")
        router.refresh()
      } catch (err) {
        setServerError("Connection error. Please try again.")
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              {serverError && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-3 text-destructive text-sm border border-destructive/20 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <p>{serverError}</p>
                </div>
              )}

              <form.Field name="email">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="m@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError className="text-red-500">{field.state.meta.errors.join(", ")}</FieldError>}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError className="text-red-500">{field.state.meta.errors.join(", ")}</FieldError>}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" className="w-full mt-2" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                )}
              />

              <FieldDescription className="text-center mt-4">
                Don&apos;t have an account? <Link href="/signup" className="underline underline-offset-4">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "@/app/(dashboardLayout)/components/signup-form"
import { SellerSignupForm } from "@/app/(dashboardLayout)/components/sellerSignup"

export default function SellerSignupPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">

                <SellerSignupForm />
            </div>
        </div>
    )
}

import { userService } from "@/Services/user.service"
import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "./components/ui/sidebar"
import { Roles } from "@/constant/roles"

type DashboardLayoutProps = {
    admin: React.ReactNode
    seller: React.ReactNode
    customer: React.ReactNode
}

export default async function DashboardLayout({ admin, seller, customer }: DashboardLayoutProps) {
    const res = await userService.getSesstion()
    const userInfo = res?.data?.user

    let content: React.ReactNode = customer

    if (userInfo?.role === Roles.admin) {
        content = admin
    } else if (userInfo?.role === Roles.seller) {
        content = seller
    }

    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarTrigger />
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {content}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

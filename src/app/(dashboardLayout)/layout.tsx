import { userService } from "@/Services/user.service";
import { AppSidebar } from "./components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,

} from "./components/ui/sidebar"
import { Roles } from "@/constant/roles";

export default async function DashboardLayout({ admin, seller, customer }: { children: React.ReactNode, admin: React.ReactNode, seller: React.ReactNode, customer: React.ReactNode }) {
    const res = await userService.getSesstion()
    const users = res?.data
    console.log(" ", users);
    const userInfo = users.user
    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {userInfo.role === Roles.admin ? admin : customer}
                    {userInfo.role === Roles.seller ? seller : customer}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

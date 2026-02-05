import * as React from "react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/app/(dashboardLayout)/components/ui/sidebar"
import { Roles } from "@/constant/roles"
import { adminRoutes } from "@/app/routes/adminRoutes"
import { sellerRoutes } from "@/app/routes/sellerRoutes"
import { customerRoutes } from "@/app/routes/customerRoutes"
import Link from "next/link"
import { NavUser } from "./nav-user"


export function AppSidebar({ user, ...props }:
    { user: { name: string, email: string, image: string, role: string } & React.ComponentProps<typeof Sidebar> }) {
    let routes: Route[] = [];
    switch (user?.role) {
        case Roles.admin:
            routes = adminRoutes
            break;
        case Roles.seller:
            routes = sellerRoutes
            break;
        case Roles.customer:
            routes = customerRoutes
            break;
        default: routes = [];

    }

    const sidebarData = {
        user: {
            name: user?.name ?? "MediStore User",
            email: user?.email ?? "m@example.com",
            avatar: user?.image ?? "/avatars/shadcn.jpg",
        }
    }
    return (
        <Sidebar {...props}>

            <SidebarContent>

                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item: any) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

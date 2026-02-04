"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Pill,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/app/(dashboardLayout)/components/nav-main"
import { NavProjects } from "@/app/(dashboardLayout)/components/nav-projects"
import { NavSecondary } from "@/app/(dashboardLayout)/components/nav-secondary"
import { NavUser } from "@/app/(dashboardLayout)/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/(dashboardLayout)/components/ui/sidebar"

import Link from "next/link"
import { Roles } from "@/constant/roles"

interface SidebarUser {
    name: string
    email: string
    image?: string
    role: Roles
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: SidebarUser | null
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {

    const sidebarData = {
        user: {
            name: user?.name ?? "MediStore User",
            email: user?.email ?? "m@example.com",
            avatar: user?.image ?? "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    { title: "Overview", url: "/dashboard" },
                    { title: "Orders", url: "/dashboard/orders" },
                ],
            },
            {
                title: "Medicines",
                url: "/dashboard/medicines",
                icon: Bot,
                items: [
                    { title: "All Medicines", url: "/dashboard/medicines" },
                    { title: "Add Medicine", url: "/dashboard/medicines/create" },
                ],
            },
            {
                title: "Settings",
                url: "/dashboard/settings",
                icon: Settings2,
                items: [
                    { title: "Profile", url: "/dashboard/profile" },
                ],
            },
        ],
        navSecondary: [
            { title: "Support", url: "/support", icon: LifeBuoy },
            { title: "Feedback", url: "/feedback", icon: Send },
        ],
        projects: [],
    }

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-bold text-xl text-red-500"
                            >
                                <Pill className="size-6" />
                                MediStore
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
                <NavProjects projects={sidebarData.projects} />
                <NavSecondary
                    items={sidebarData.navSecondary}
                    className="mt-auto"
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

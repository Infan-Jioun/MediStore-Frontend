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
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {

    const { data, isPending } = authClient.useSession()
    
    const user = data?.user

    const sidebarData = {
        user: {
            name: user?.name ?? "MediStore User",
            email: user?.email ?? "m@example.com",
            avatar: user?.image ?? "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Playground",
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    { title: "History", url: "#" },
                    { title: "Starred", url: "#" },
                    { title: "Settings", url: "#" },
                ],
            },
            {
                title: "Models",
                url: "#",
                icon: Bot,
                items: [
                    { title: "Genesis", url: "#" },
                    { title: "Explorer", url: "#" },
                    { title: "Quantum", url: "#" },
                ],
            },
            {
                title: "Documentation",
                url: "#",
                icon: BookOpen,
                items: [
                    { title: "Introduction", url: "#" },
                    { title: "Get Started", url: "#" },
                    { title: "Tutorials", url: "#" },
                    { title: "Changelog", url: "#" },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    { title: "General", url: "#" },
                    { title: "Team", url: "#" },
                    { title: "Billing", url: "#" },
                    { title: "Limits", url: "#" },
                ],
            },
        ],
        navSecondary: [
            { title: "Support", url: "#", icon: LifeBuoy },
            { title: "Feedback", url: "#", icon: Send },
        ],
        projects: [
            { name: "Design Engineering", url: "#", icon: Frame },
            { name: "Sales & Marketing", url: "#", icon: PieChart },
            { name: "Travel", url: "#", icon: Map },
        ],
    }

    if (isPending) return null

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

import { LayoutDashboard } from "lucide-react";
import { Route } from "../type/routes";

export const customerRoutes: Route[] = [
    {
        title: "Customer",
        icon: LayoutDashboard,
        items: [
            {
                title: "My Profile",
                url: "/profile",
            },
            {
                title: "My Reviews",
                url: "/reviews",
            },
        ],
    },
];

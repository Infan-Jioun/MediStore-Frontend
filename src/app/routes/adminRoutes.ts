import { LayoutDashboard } from "lucide-react";
import { Route } from "../type/routes";

export const adminRoutes: Route[] = [
    {
        title: "MediStore Admin",
        icon: LayoutDashboard,
        items: [
            {
                title: "Add Categories",
                url: "/categories",
            },
            {
                title: "Users Management",
                url: "/users",
            },
            {
                title: "Orders Management",
                url: "orders",
            },
            {
                title: "Sellers Management",
                url: "/sellers",
            },
        ],
    },
];

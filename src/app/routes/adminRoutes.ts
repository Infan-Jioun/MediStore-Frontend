import { LayoutDashboard } from "lucide-react";
import { Route } from "../type/routes";

export const adminRoutes: Route[] = [
    {
        title: "MediStore Admin",
        icon: LayoutDashboard,
        items: [
            {
                title: "Add Categories",
                url: "/add-categories",
            },
            {
              title : "All Categories",
              url : "/all-categories"
            },
            {
                title: "Users Management",
                url: "/users-management",
            },
            {
                title: "Orders Management",
                url: "orders-management",
            },
            {
                title: "Sellers Management",
                url: "/sellers-menagement",
            },
        ],
    },
];

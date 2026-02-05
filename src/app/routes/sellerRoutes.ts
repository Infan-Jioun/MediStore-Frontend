import { LayoutDashboard } from "lucide-react";
import { Route } from "../type/routes";

export const sellerRoutes: Route[] = [
    {
        title: "Seller Dashboard",
        icon: LayoutDashboard,
        items: [
            {
                title: "My Medicines",
                url: "/medicines",
            },
            {
                title: "Add Medicine",
                url: "/medicines/create",
            },
            {
                title: "Orders",
                url: "/orders",
            },
            {
                title: "Profile",
                url: "/profile",
            },
        ],
    },
];

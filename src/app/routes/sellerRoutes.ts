import { LayoutDashboard } from "lucide-react";
import { Route } from "../type/routes";

export const sellerRoutes: Route[] = [
    {
        title: "Seller Dashboard",
        icon: LayoutDashboard,
        items: [
            {
                title: "My Medicines",
                url: "/my-medicine",
            },
            {
                title: "Add Medicine",
                url: "/add-medicine",
            },
            {
                title: "Orders",
                url: "/orders-management",
            },
           
        ],
    },
];

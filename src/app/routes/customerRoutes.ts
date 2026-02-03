import { Route } from "../type/routes";

export const sellerRoutes: Route[] = [
    {
        title: "Seller Dashboard",
        items: [
            {
                title: "My Medicines",
                href: "/medicines",
            },
            {
                title: "Add Medicine",
                href: "/medicines/create",
            },
            {
                title: "Orders",
                href: "/orders",
            },
            {
                title: "Profile",
                href: "/profile",
            },
        ],
    },
];

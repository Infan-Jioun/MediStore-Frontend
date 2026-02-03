import { Route } from "../type/routes";

export const customerRoutes: Route[] = [
    {
        title: "Customer",
        items: [
            {
                title: "My Orders",
                href: "/orders",
            },
            {
                title: "My Profile",
                href: "/profile",
            },
            {
                title: "My Reviews",
                href: "/reviews",
            },
        ],
    },
];

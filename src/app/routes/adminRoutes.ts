import { Route } from "../type/routes";

export const adminRoutes: Route[] = [
    {
        title: "MediStore Admin",
        items: [
            {
                title: "Add Categories",
                href: "/categories",
            },
            {
                title: "Users Management",
                href: "/users",
            },
            {
                title: "Orders Management",
                href: "orders",
            },
            {
                title: "Sellers Management",
                href: "/sellers",
            },
        ],
    },
];

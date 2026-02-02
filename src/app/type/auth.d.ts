// types/auth.d.ts

import { User as BaseUser } from "better-auth";

declare module "better-auth" {
    interface User extends BaseUser {
        role: "CUSTOMER" | "SELLER" | "ADMIN" | "GUEST";
    }

    interface Session {
        user: User;
    }
}
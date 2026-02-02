export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN" | "GUEST";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    image?: string;
    }
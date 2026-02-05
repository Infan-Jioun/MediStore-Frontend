import { Roles } from "@/constant/roles";
import { userService } from "@/Services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isAdmin = false;
    let isSeller = false;
    let isCustomer = false;

    try {
        const res = await userService.getSesstion();

        if (res?.data?.user) {
            isAuthenticated = true;
            const role = res.data.user.role;
            isAdmin = role === Roles.admin;
            isSeller = role === Roles.seller;
            isCustomer = role === Roles.customer;
        }
    } catch (err) {
        isAuthenticated = false;
    }
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/dashboard") && isAdmin) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (pathname.startsWith("/seller-dashboard") && !isSeller) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/dashboard") && isSeller) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
    if (pathname.startsWith("/dashboard") && !isAdmin && !isSeller && !isCustomer) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/seller-dashboard",
        "/seller-dashboard/:path*",
    ],
};

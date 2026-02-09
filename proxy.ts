import { Roles } from "@/constant/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/verify-email") || pathname.startsWith("/public")) {
        return NextResponse.next();
    }

    const sessionToken = request.cookies.get("__Secure-better-auth.session_token");
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    let res;
    try {
        res = await userService.getSesstion();
    } catch (error) {
        console.error("Error fetching session:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!res?.data?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = res.data.user.role;
    if (role === Roles.admin && pathname.startsWith("/customer-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    if (role === Roles.seller && pathname.startsWith("/customer-dashboard")) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }

    if (role === Roles.customer && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    }

    if (role === Roles.customer && pathname.startsWith("/seller-dashboard")) {
        return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    }

    if (role === Roles.seller && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }

    if (role === Roles.admin && pathname.startsWith("/seller-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/customer-dashboard",
        "/customer-dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/seller-dashboard",
        "/seller-dashboard/:path*",
        "/add-medicine",
        "/my-medicine",
        "/my-medicine/[id]",
        "/orders-management",
        "/reviews",
        "/all-categories",
        "/users-management",
        


    ],
};

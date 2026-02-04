import { Roles } from "@/constant/roles";
import { userService } from "@/Services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest, response: NextResponse) {
    const pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isAdmin = false;
    let isSeller = false;
    const res = await userService.getSesstion();
    if (res && res?.data) {
        isAuthenticated = true;
        isAdmin = res.data.user.role === Roles.admin;
        isAdmin = res.data.user.role === Roles.seller;
    }
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if (isSeller && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url))
    }
    if (!isSeller && pathname.startsWith("/seller-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    console.log(res?.data);
}
export const config = {
    matcher: ["/dashboard",
        "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*" , "/seller-dashboard" , "/seller-dashboard/:path*"],
}
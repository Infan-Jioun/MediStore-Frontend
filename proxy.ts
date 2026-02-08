// import { Roles } from "@/constant/roles";
// import { userService } from "@/Services/user.service";
// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(request: NextRequest, response: NextResponse) {
//     const pathname = request.nextUrl.pathname;
//     const sessionToken = request.cookies.get("better-auth.session_token");
//     if (!sessionToken) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     let isAuthenticated = false;
//     let isAdmin = false;
//     let isSeller = false;
//     const res = await userService.getSesstion();
//     if (res && res?.data) {
//         isAuthenticated = true;
//         isAdmin = res.data.user.role === Roles.admin;
//         isAdmin = res.data.user.role === Roles.seller;

//     }
//     if (!isAuthenticated) {
//         return NextResponse.redirect(new URL("/login", request.url))
//     }
//     if (isAdmin && pathname.startsWith("/customer-dashboard")) {
//         return NextResponse.redirect(new URL("/admin-dashboard", request.url))
//     }
//     if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
//         return NextResponse.redirect(new URL("/customer-dashboard", request.url))
//     }
//     if (isSeller && pathname.startsWith("/customer-dashboard")) {
//         return NextResponse.redirect(new URL("/seller-dashboard", request.url))
//     }
//     if (!isSeller && pathname.startsWith("/seller-dashboard")) {
//         return NextResponse.redirect(new URL("/customer-dashboard", request.url))
//     }
//     if (isSeller && pathname.startsWith("/customer-dashboard")) {
//         return NextResponse.redirect(new URL("/seller-dashboard", request.url))
//     }

//     console.log(res?.data);
//     return NextResponse.next();
// }
// export const config = {
//     matcher: ["/customer-dashboard",
//         "/customer-dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*", "/seller-dashboard", "/seller-dashboard/:path*"],
// }
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for verify-email route
    if (pathname.startsWith("/verify-email")) {
        return NextResponse.next();
    }

    // Check for session token in cookies
    const sessionToken = request.cookies.get("better-auth.session_token");

    //* User is not authenticated at all
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access if session exists
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};

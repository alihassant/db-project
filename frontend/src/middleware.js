import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublic = path === "/signup" || path === "/login";

  const token = request.cookies.get("token")?.value || "";

  if (isPublic && token) {
    // return NextResponse.redirect("/dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/signup",
    "/login",
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/settings",
    "/dashboard/tables",
    `/dashboard/tables/table/:dbId*`,
    // `/dashboard/tables/table/:dbId*/posts`,
    // `/dashboard/tables/table/:dbId*/posts/:path*`,
  ],
};

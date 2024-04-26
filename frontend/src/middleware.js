import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const queryParams = new URLSearchParams(request.nextUrl.search);

  const isPublic =
    path === "/signup" ||
    path === "/login" ||
    path === "/reset" ||
    path === "/reset/changePassword";

  const token = request.cookies.get("token")?.value || "";

  const isSignup = path === "/signup";

  const isChangePassword = path === "/reset/changePassword";

  if (isPublic && token) {
    // return NextResponse.redirect("/dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If it's the signup page and there's no priceId, redirect
  if (
    isSignup &&
    (!queryParams.has("priceId") || queryParams.get("priceId") === "")
  ) {
    return NextResponse.redirect(new URL("/pricing", request.nextUrl));
  }

  // If it's the change password page and there's no resetToken, redirect
  if (
    isChangePassword &&
    (!queryParams.has("resetToken") || queryParams.get("resetToken") === "")
  ) {
    return NextResponse.redirect(new URL("/reset", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/reset",
    "/reset/changePassword",
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

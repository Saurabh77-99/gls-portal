import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`Middleware checking path: ${pathname}`);

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("authToken")?.value;
    console.log(`Token found: ${token ? "Yes" : "No"}`);

    if (!token) {
      console.log("No token, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Simple token existence check - detailed JWT verification happens in API routes
    // This avoids Edge Runtime compatibility issues with JWT verification
    console.log("Token exists, allowing dashboard access");
  }

  // Redirect authenticated users away from login page  
  if (pathname === "/login") {
    const token = request.cookies.get("authToken")?.value;
    
    if (token) {
      console.log("User has token, redirecting away from login to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow all other requests
  console.log("Middleware allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login"
  ],
};
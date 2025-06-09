import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

const protectedRoutes = ["/favorites"];
const authRoutes = ["/auth/login", "/auth/signup"];
const publicRoutes = ["/", "/authors"]; // ✅ Add your public routes here

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // ✅ Redirect to home if logged in and visiting auth routes
  if (isAuthRoute && token) {
    const verifiedToken = await verifyToken(token);
    
    if (verifiedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ✅ Allow public routes always
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 🔒 Block protected routes if not logged in
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const verifiedToken = verifyToken(token);
    if (!verifiedToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

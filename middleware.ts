import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  // Kalau SUDAH login, cegah akses ke login
  if (token && (pathname === "/login" || pathname.startsWith("/auth/login"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Kalau BELUM login, cegah akses ke area admin
  if (
    !token &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/vacancies") ||
      pathname.startsWith("/applicants"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/auth/login",
    "/dashboard/:path*",
    "/vacancies/:path*",
    "/applicants/:path*",
  ],
};

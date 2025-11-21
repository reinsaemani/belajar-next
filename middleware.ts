import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { paths } from "@/config/paths"; // Mengimpor paths yang sudah disesuaikan

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  // Daftar rute admin secara manual (karena Next.js tidak bisa memproses dinamis)
  const adminRoutes = [
    "/admin/dashboard",
    "/admin/vacancies",
    "/admin/applicants",
    "/admin/manageContents",
    "/admin/manageContents/banner",
    "/admin/manageContents/testimonials",
    "/admin/search",
    "/admin/settings",
    "/admin/reset-password",
  ];

  // Kalau SUDAH login, cegah akses ke login
  if (
    token &&
    (pathname === paths.auth.login.getHref() ||
      pathname.startsWith("/auth/login"))
  ) {
    return NextResponse.redirect(
      new URL(paths.app.admin.dashboard.getHref(), req.url)
    );
  }

  // Kalau BELUM login, cegah akses ke area admin
  if (!token && adminRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(paths.auth.login.getHref(), req.url));
  }

  return NextResponse.next();
}

// Static config untuk matcher, yang tidak bisa dinamis
export const config = {
  matcher: [
    "/login", // Login route
    "/auth/login", // Additional login path
    "/admin/dashboard/:path*", // Admin dashboard
    "/admin/vacancies/:path*", // Admin vacancies
    "/admin/applicants/:path*", // Admin applicants
    "/admin/manageContents/:path*", // Admin manage contents
    "/admin/manageContents/banner/:path*", // Admin banners
    "/admin/manageContents/testimonials/:path*", // Admin testimonials
    "/admin/search/:path*", // Admin search
    "/admin/settings/:path*", // Admin settings
  ],
};

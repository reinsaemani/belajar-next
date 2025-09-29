"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/lib/auth";
import { paths } from "@/config/paths";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SiteHeader } from "@/components/sidebar/SideHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      // belum login
      router.replace(paths.auth.login.getHref(pathname));
      return;
    }

    if (user.role !== "ADMIN" && user.role !== "PENGAWAS") {
      // role tidak valid
      router.replace(paths.home.getHref());
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Toaster richColors position="top-right" />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <SiteHeader />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

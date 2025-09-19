"use client";

import { AppSidebar } from "@/components/admin/sidebar/AppSidebar";
import { SiteHeader } from "@/components/admin/sidebar/SIdeHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { useState } from "react";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div>
      <Toaster richColors position="top-right" />
      <SidebarProvider
        defaultOpen={defaultOpen}
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
            <QueryClientProvider client={queryClient}>
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </QueryClientProvider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { sidebarItems, user } from "./SidebarItems";
import SidebarMainSection from "./SidebarMain";
import SidebarFooterSection from "./SidebarFooter";
import SidebarHeaderSection from "./SidebarHeader";

export function AppSidebar() {
  const [loading, setLoading] = useState(true);
  const [activeNavUser, setActiveNavUser] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Sidebar collapsible="icon" variant="inset">
      {/* Header */}
      <SidebarHeader >
        <SidebarHeaderSection />
        <SidebarSeparator />
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent>
        <SidebarMainSection
          sidebarItems={sidebarItems}
          activeNavUser={activeNavUser}
        />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarFooterSection user={user} setActiveNavUser={setActiveNavUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

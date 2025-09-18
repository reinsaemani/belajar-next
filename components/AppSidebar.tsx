"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./SidebarItems";

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center">
            <SidebarMenuButton
              size={"lg"}
              className="w-fit py-10 bg-sidebar !bg-sidebar hover:shadow-lg focus:!bg-sidebar active:!bg-sidebar"
              variant={"outline"}
              isActive={false}
            >
              <Link href={"/dashboard"}>
                <Image
                  src={"./logo_waleta.svg"}
                  alt="cb"
                  width={80}
                  height={80}
                ></Image>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    isActive={pathname === item.url}
                    className="hover:bg-pink-100 dark:hover:bg-pink-900 data-[active=true]:bg-pink-500 data-[active=true]:text-white text-white"
                  >
                    <Link
                      href={item.url}
                      onClick={() => {
                        if (isMobile) setOpenMobile(false);
                      }}
                    >
                      <item.icon />
                      <span className="font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

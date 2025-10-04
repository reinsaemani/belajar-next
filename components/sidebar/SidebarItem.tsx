"use client";

import Link from "next/link";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";

// Tipe sederhana tanpa submenu
type SidebarItemType = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
};

export default function SidebarItem({
  item,
  pathname,
  activeNavUser,
}: {
  item: SidebarItemType;
  pathname: string;
  activeNavUser: boolean;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        isActive={!activeNavUser && pathname === item.url}
        className="hover:bg-pink-100 dark:hover:bg-pink-900 
                   data-[active=true]:bg-pink-500 data-[active=true]:text-white 
                   text-white font-sans font-semibold"
      >
        <Link
          href={item.url}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          {item.icon && <item.icon className="!text-inherit" />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

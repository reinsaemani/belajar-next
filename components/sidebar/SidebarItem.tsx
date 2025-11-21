"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import SidebarSubItem from "./SidebarSubItem";
import { cn } from "@/utils/cn";

type SidebarItemType = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
  subItems?: SidebarItemType[];
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
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // elemen utama sidebar berada di data-slot='sidebar'
    const sidebar = document.querySelector("[data-slot='sidebar']");
    if (!sidebar) return;

    const update = () => {
      const collapsed = sidebar.getAttribute("data-collapsible") === "icon";
      setIsCollapsed(collapsed);
      if (collapsed) setOpen(false); // auto-close submenu saat collapse
    };

    update(); // set awal

    const observer = new MutationObserver(update);
    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-collapsible"],
    });

    return () => observer.disconnect();
  }, []);

  // 🔄 buka submenu otomatis bila sedang di dalam route anak
  const isParentOpen = pathname.startsWith(`${item.url}/`);
  useEffect(() => {
    if (isParentOpen) setOpen(true);
  }, [isParentOpen]);

  const isActive = !activeNavUser && pathname === item.url;

  return (
    <SidebarMenuItem key={item.title} className="w-full">
      {/* 🔘 Parent Item */}
      {item.subItems ? (
        <div
          className={cn(
            "hover:bg-pink-100 dark:hover:bg-pink-900 text-white font-sans font-semibold flex justify-between items-center rounded-md p-2 cursor-pointer select-none",
            isActive && "bg-pink-500 text-white"
          )}
          onClick={() => {
            if (!isCollapsed) setOpen((prev) => !prev);
          }}
          title={isCollapsed ? item.title : undefined}
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="!text-inherit" />}
            {!isCollapsed && <span>{item.title}</span>}
          </div>
          {!isCollapsed && (
            <div className="ml-auto">
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
      ) : (
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={isActive}
          className={cn(
            "hover:bg-pink-100 dark:hover:bg-pink-900 text-white font-sans font-semibold flex items-center transition-all",
            "justify-between",
            "group-data-[collapsible=icon]:justify-center",
            "data-[active=true]:bg-pink-500 data-[active=true]:text-white"
          )}
        >
          <Link href={item.url}>
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="!text-inherit" />}
              {!isCollapsed && <span>{item.title}</span>}
            </div>
          </Link>
        </SidebarMenuButton>
      )}

      {/* 🔽 Render submenu hanya kalau sidebar tidak collapse */}
      {item.subItems && open && !isCollapsed && (
        <SidebarMenuSub className="ml-3 mt-1 space-y-1">
          {item.subItems.map((subItem, idx) => (
            <SidebarSubItem
              key={subItem.title}
              subItem={subItem}
              idx={idx}
              parentUrl={item.url}
              pathname={pathname}
              isMobile={false}
              setOpenMobile={() => {}}
            />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

"use client";

import Link from "next/link";
import {
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export default function SidebarSubItem({
  subItem,
  idx,
  parentUrl,
  pathname,
  isMobile,
  setOpenMobile,
}: {
  subItem: any;
  idx: number;
  parentUrl: string;
  pathname: string;
  isMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}) {
  const isActive =
    pathname === subItem.url || (pathname === parentUrl && idx === 0);

  return (
    <SidebarMenuSubItem key={subItem.title}>
      <SidebarMenuSubButton
        asChild
        className="hover:bg-pink-100 dark:hover:bg-pink-900 
                   data-[active=true]:bg-pink-500 data-[active=true]:text-white 
                   text-white font-sans py-4 rounded-md"
      >
        <Link
          href={subItem.url}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
          className={isActive ? "bg-pink-500 text-white" : ""}
        >
          {subItem.icon && <subItem.icon className="mr-2 !text-inherit" />}
          <span>{subItem.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

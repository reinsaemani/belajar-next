"use client";

import Link from "next/link";
import {
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

type SidebarSubItemType = {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
};

export default function SidebarSubItem({
  subItem,
  idx,
  parentUrl,
  pathname,
  isMobile,
  setOpenMobile,
}: {
  subItem: SidebarSubItemType;
  idx: number;
  parentUrl: string;
  pathname: string;
  isMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}) {
  const isActive =
    pathname === subItem.url || pathname.startsWith(subItem.url + "/");

  return (
    <SidebarMenuSubItem key={subItem.title}>
      <SidebarMenuSubButton
        asChild
        isActive={isActive}
        className="hover:bg-pink-100 dark:hover:bg-pink-900 
                   data-[active=true]:bg-pink-500 data-[active=true]:text-white 
                   text-white font-sans py-4 rounded-md"
      >
        <Link
          href={subItem.url}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          {subItem.icon && <subItem.icon className="mr-2 !text-inherit" />}
          <span>{subItem.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

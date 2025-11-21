"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ComponentProps } from "react";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  const menus = [
    { label: "Home", href: "/" },
    { label: "Vacancy", href: "/lowongan" },
    { label: "About Us", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.href}>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                pathname === menu.href
                  ? "bg-transparent text-white font-bold hover:bg-transparent hover:text-white hover:underline hover:underline-offset-4"
                  : "bg-transparent text-white font-bold hover:bg-transparent hover:text-white hover:underline hover:underline-offset-4"
              }transition-all duration-300 ease-in-out`}
            >
              <Link href={menu.href}>{menu.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

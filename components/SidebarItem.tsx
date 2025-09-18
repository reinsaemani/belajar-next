"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"
import SidebarSubItem from "./SidebarSubItem"

// Tipe untuk item dan subitem
type SidebarSubItemType = {
    title: string
    url: string
    icon?: React.ComponentType<any>
}

type SidebarItemType = {
    title: string
    url: string
    icon?: React.ComponentType<any>
    items?: SidebarSubItemType[]
}

export default function SidebarItem({
    item,
    pathname,
    activeNavUser,
}: {
    item: SidebarItemType
    pathname: string
    activeNavUser: boolean
}) {
    const { isMobile, setOpenMobile } = useSidebar()

    if (item.items && item.items.length > 0) {
        // Item with submenu
        return (
            <Collapsible
                key={item.title}
                asChild
                defaultOpen={pathname.startsWith(item.url)}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            tooltip={item.title}
                            isActive={!activeNavUser && pathname === item.url}
                            className="font-sans font-semibold hover:bg-pink-100 dark:hover:bg-pink-900 
                         data-[active=true]:bg-pink-500 data-[active=true]:text-white text-white px-3 py-2 rounded-md"
                        >
                            {item.icon && <item.icon className="!text-inherit" />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items.map((subItem, idx) => (
                                <SidebarSubItem
                                    key={subItem.title}
                                    subItem={subItem}
                                    idx={idx}
                                    parentUrl={item.url}
                                    pathname={pathname}
                                    isMobile={isMobile}
                                    setOpenMobile={setOpenMobile}
                                />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        )
    }

    // Item without submenu
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
                        if (isMobile) setOpenMobile(false)
                    }}
                >
                    {item.icon && <item.icon className="!text-inherit" />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

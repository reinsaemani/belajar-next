"use client"

import { usePathname } from "next/navigation"
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar"
import SidebarItem from "./SidebarItem"

export default function SidebarMainSection({
    sidebarItems,
    activeNavUser,
}: {
    sidebarItems: any[]
    activeNavUser: boolean
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarMenu className="space-y-1">
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.title}
                        item={item}
                        pathname={pathname}
                        activeNavUser={activeNavUser}
                    />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

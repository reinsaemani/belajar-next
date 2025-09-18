"use client"

import Link from "next/link"
import Image from "next/image"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export default function SidebarHeaderSection() {
    return (
        <SidebarMenu className="space-y-1">
            <SidebarMenuItem className="flex justify-center items-center">
                <SidebarMenuButton
                    size="lg"
                    className="w-fit py-10 !bg-sidebar hover:shadow-lg focus:!bg-sidebar active:!bg-sidebar"
                    variant="outline"
                    isActive={false}
                >
                    <Link href="/dashboard">
                        <Image src="/logo_waleta.svg" alt="Logo Waleta" width={80} height={80} loading="lazy" />
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

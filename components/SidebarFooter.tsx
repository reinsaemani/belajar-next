"use client"

import { NavUser } from "./SidebarUser"

export default function SidebarFooterSection({
    user,
    setActiveNavUser,
}: {
    user: any
    setActiveNavUser: (val: boolean) => void
}) {
    return <NavUser user={user} setActiveNavUser={setActiveNavUser} />
}

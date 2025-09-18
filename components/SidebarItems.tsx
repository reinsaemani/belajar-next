"use client";

import {
  LayoutDashboard,
  Inbox,
  Search,
  Settings,
  User,
  Calendar,
  icons,
  Calendar1Icon,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Vacancies",
    url: "/vacancies",
    icon: Inbox,
  },
  {
    title: "Manage Applicants",
    url: "#",
    icon: User,
    items: [
      {
        title: "All Applicants",
        url: "/applications",
        icons: User,
      },
      {
        title: "Recruitment Stages",
        url: "/recruitment-stages",
        icons: Calendar1Icon,
      },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

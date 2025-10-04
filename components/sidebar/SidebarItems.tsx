import {
  LayoutDashboard,
  Inbox,
  Search,
  Settings,
  User,
  Calendar1Icon,
} from "lucide-react";

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/logo_waleta.svg",
};

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
    url: "/applicants",
    icon: User,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

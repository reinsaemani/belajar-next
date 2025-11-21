import { paths } from "@/config/paths";
import {
  FileImage,
  FolderCog,
  HeartHandshake,
  Inbox,
  LayoutDashboard,
  Quote,
  Search,
  Settings,
  User,
} from "lucide-react";

export const user = {
  name: "Admin Waleta",
  email: "admin@waleta.com",
  avatar: "/logo_waleta.svg",
};

export const sidebarItems = [
  {
    title: "Dashboard",
    url: paths.app.admin.dashboard.getHref(), // Admin path
    icon: LayoutDashboard,
  },
  {
    title: "Manage Vacancies",
    url: paths.app.admin.vacancies.getHref(), // Admin path
    icon: Inbox,
  },
  {
    title: "Manage Applicants",
    url: paths.app.admin.applicants.getHref(), // Admin path
    icon: User,
  },
  {
    title: "Manage Contents",
    url: paths.app.admin.manageContents.getHref(),
    icon: FolderCog,
    subItems: [
      {
        title: "Banners",
        url: paths.app.admin.manageContents.banners.getHref(),
        icon: FileImage,
      },
      {
        title: "Testimonials",
        url: paths.app.admin.manageContents.testimonials.getHref(),
        icon: Quote,
      },
    ],
  },
  {
    title: "Search",
    url: paths.app.admin.search.getHref(), // Admin search path
    icon: Search,
  },
  {
    title: "Settings",
    url: paths.app.admin.settings.getHref(), // Admin settings path
    icon: Settings,
  },
];

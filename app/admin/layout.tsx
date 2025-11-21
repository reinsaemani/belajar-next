import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminLayout as AdminLayoutComponent } from "./_components/admin-layout";
import { MainErrorFallback } from "@/components/errors/main";

export const metadata = {
  title: "Waleta Admin",
  description: "Admin Dashboard",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary fallback={<MainErrorFallback />}>
      <AdminLayoutComponent>{children}</AdminLayoutComponent>
    </ErrorBoundary>
  );
};

export default AdminLayout;

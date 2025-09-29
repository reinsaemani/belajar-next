import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminLayout as AdminLayoutComponent } from "./_components/admin-layout";
import { Spinner } from "@/components/ui/spinner";
import { MainErrorFallback } from "@/components/errors/main";

export const metadata = {
  title: "Waleta Admin",
  description: "Admin Dashboard",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary fallback={<MainErrorFallback />}>
        <AdminLayoutComponent>{children}</AdminLayoutComponent>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AdminLayout;

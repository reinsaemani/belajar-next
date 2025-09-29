import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AuthLayout as AuthLayoutComponent } from "./_components/auth-layout";
import { MainErrorFallback } from "@/components/errors/main";

export const metadata = {
  title: "Waleta Admin Login",
  description: "Login to Waleta Admin Dashboard",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary fallback={<MainErrorFallback />}>
        <AuthLayoutComponent>{children}</AuthLayoutComponent>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AuthLayout;

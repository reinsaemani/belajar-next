"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import { Spinner } from "@/components/ui/spinner";

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.replace(
        redirectTo
          ? decodeURIComponent(redirectTo)
          : paths.app.dashboard.getHref()
      );
    }
  }, [user, isLoading, router, redirectTo]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side (Form) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-semibold">Waleta Admin</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

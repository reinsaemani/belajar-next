"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { paths } from "@/config/paths";
import { useUser } from "@/features/auth/api/auth";
import Image from "next/image";

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
          : paths.app.admin.dashboard.getHref()
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
      <div className="hidden lg:flex items-center justify-center bg-muted">
        <Image
          src="/logo_waleta.svg"
          alt="Logo Waleta"
          width={600}
          height={600}
          className="object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

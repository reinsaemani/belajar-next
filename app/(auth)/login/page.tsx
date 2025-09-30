"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { paths } from "@/config/paths";
import { useLogin } from "@/lib/auth";
import { useState } from "react";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const login = useLogin({
    onSuccess: (user) => {
      if (user.role === "ADMIN" || user.role === "PENGAWAS") {
        router.replace(redirectTo ?? paths.app.dashboard.getHref());
      } else {
        router.replace(paths.home.getHref());
      }
    },
    onError: (msg) => {
      setErrorMessage(msg);
    },
  });

  return (
    <LoginForm
      onSubmit={login.mutate}
      errorMessage={login.isError ? "Username atau password salah" : undefined}
    />
  );
}
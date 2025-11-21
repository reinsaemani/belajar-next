"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ResetPasswordForm } from "./reset-password-form";
import { paths } from "@/config/paths";
import { useResetPassword } from "../api/reset-password";
import { resetPasswordInputSchema } from "../api/reset-password";

export function ResetPasswordView() {
  const router = useRouter();
  const mutation = useResetPassword({
    onSuccess: (msg) => {
      toast.success(msg || "Password Changed Successfully");
      router.replace(paths.app.admin.dashboard.getHref());
    },
    onError: (msg) => toast.error(msg),
  });

  const handleSubmit = (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const parsed = resetPasswordInputSchema.safeParse(data);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      toast.error(firstError);
      return;
    }

    mutation.mutate(parsed.data);
  };

  return (
    <ResetPasswordForm onSubmit={handleSubmit} loading={mutation.isPending} />
  );
}

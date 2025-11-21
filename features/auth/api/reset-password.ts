import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../../../lib/api-client";

export const resetPasswordInputSchema = z
  .object({
    oldPassword: z.string().min(5, "Old Password is Required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password Does Not Match"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "password tidak cocok",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

export const resetPassword = (
  data: ResetPasswordInput
): Promise<{ success: boolean; message: string }> => {
  return api.post("/auth/reset-password", data);
};

export const useResetPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => onSuccess?.(res.message),
    onError: (err: any) => {
      const message =
        err instanceof Error ? err.message : "Failed to change password";
      onError?.(message);
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AuthResponse, Account } from "@/types/api";
import { api } from "./api-client";

export const getUser = async (): Promise<Account | null> => {
  try {
    const response = await api.get<{ success: boolean; data?: Account }>(
      "/auth/me"
    );
    if (!response.success || !response.data) return null;
    return response.data;
  } catch {
    // kalau unauthorized, balikin null (bukan undefined!)
    return null;
  }
};

const userQueryKey = ["account"];

export const useUser = () =>
  useQuery({
    queryKey: userQueryKey,
    queryFn: getUser,
    retry: false,
  });

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (user: Account) => void;
  onError?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithUsernameAndPassword,
    onSuccess: (res) => {
      queryClient.setQueryData(userQueryKey, res.data);
      onSuccess?.(res.data);
    },
    onError: (err: any) => {
      const message = err instanceof Error ? err.message : "Login failed";
      onError?.(message);
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

const logout = (): Promise<void> => {
  return api.post("/auth/logout");
};

export const loginInputSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(5, "Required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithUsernameAndPassword = (
  data: LoginInput
): Promise<{ success: boolean; data: Account }> => {
  return api.post("/auth/login", data);
};

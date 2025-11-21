import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Banner } from "@/types/api";

export const createBanner = async (formData: FormData) => {
  const res = await api.post<{ data: Banner }>("/banners", formData);
  return res.data;
};

type UseCreateBannerOptions = {
  mutationConfig?: MutationConfig<typeof createBanner>;
};

export const useCreateBanner = ({
  mutationConfig,
}: UseCreateBannerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    mutationFn: createBanner,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onSuccess?.(...args);
    },
    ...rest,
  });
};

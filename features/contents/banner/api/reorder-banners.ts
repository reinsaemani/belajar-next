import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const reorderBanners = async (orderedIds: number[]) => {
  const res = await api.put<{ message: string }>("/banners/reorder", {
    orderedIds,
  });
  return res;
};

type UseReorderBannerOptions = {
  mutationConfig?: MutationConfig<typeof reorderBanners>;
};

export const useReorderBanners = ({
  mutationConfig,
}: UseReorderBannerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    mutationFn: reorderBanners,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onSuccess?.(...args);
    },
    ...rest,
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const deleteBanner = async ({ id }: { id: number }) => {
  const res = await api.delete<{ message: string }>(`/banners/${id}`);
  return res;
};

type UseDeleteBannerOptions = {
  mutationConfig?: MutationConfig<typeof deleteBanner>;
};

export const useDeleteBanner = ({
  mutationConfig,
}: UseDeleteBannerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onSuccess?.(...args);
    },
    ...rest,
  });
};

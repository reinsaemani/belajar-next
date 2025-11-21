import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Banner } from "@/types/api";

export const updateBanner = async ({
  id,
  formData,
}: {
  id: number;
  formData: FormData;
}) => {
  const res = await api.put<{ data: Banner }>(`/banners/${id}`, formData);
  return res.data;
};

type UseUpdateBannerOptions = {
  mutationConfig?: MutationConfig<typeof updateBanner>;
};

export const useUpdateBanner = ({
  mutationConfig,
}: UseUpdateBannerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    mutationFn: updateBanner,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onSuccess?.(...args);
    },
    ...rest,
  });
};

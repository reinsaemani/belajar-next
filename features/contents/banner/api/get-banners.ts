import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Banner } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getBanners = (): Promise<{ data: Banner[] }> => {
  return api.get("/banners");
};

export const getBannersQueryOptions = () => {
  return queryOptions({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
};

type UseBannersOptions = {
  queryConfig?: QueryConfig<typeof getBannersQueryOptions>;
};

export const useBanners = ({ queryConfig }: UseBannersOptions = {}) => {
  return useQuery({
    ...getBannersQueryOptions(),
    ...queryConfig,
  });
};

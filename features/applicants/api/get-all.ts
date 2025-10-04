import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Applicant } from "@/types/api";

export const getApplicants = (): Promise<{ data: Applicant[] }> => {
  return api.get("/applicants"); 
};

export const getApplicantsQueryOptions = () => {
  return queryOptions({
    queryKey: ["applicants"],
    queryFn: getApplicants,
  });
};

type UseApplicantsOptions = {
  queryConfig?: QueryConfig<typeof getApplicantsQueryOptions>;
};

export const useApplicants = ({ queryConfig }: UseApplicantsOptions = {}) => {
  return useQuery({
    ...getApplicantsQueryOptions(),
    ...queryConfig,
  });
};

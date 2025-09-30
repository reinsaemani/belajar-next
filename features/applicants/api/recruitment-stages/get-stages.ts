import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Applicant } from "@/types/api";

export const getApplicantsByStage = (
  stage: string
): Promise<{ data: Applicant[] }> => {
  return api.get(`/recruitment?stage=${stage}`);
};

export const getApplicantsByStageQueryOptions = (stage: string) => {
  return queryOptions({
    queryKey: ["recruitment", stage],
    queryFn: () => getApplicantsByStage(stage),
  });
};

type UseApplicantsByStageOptions = {
  stage: string;
  queryConfig?: QueryConfig<typeof getApplicantsByStageQueryOptions>;
};

export const useApplicantsByStage = ({
  stage,
  queryConfig,
}: UseApplicantsByStageOptions) => {
  return useQuery({
    ...getApplicantsByStageQueryOptions(stage),
    ...queryConfig,
  });
};

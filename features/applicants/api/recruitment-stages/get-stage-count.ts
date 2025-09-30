import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Applicant } from "@/types/api";

export const getStageCount = async (stage: string): Promise<number> => {
  const res = await api.get<{ data: Applicant[] }>(
    `/recruitment?stage=${stage}`
  );
  return res.data?.length ?? 0;
};

export const useStageCount = (stage: string) => {
  return useQuery({
    queryKey: ["stage-count", stage],
    queryFn: () => getStageCount(stage),
  });
};

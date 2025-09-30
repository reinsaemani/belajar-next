import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { ApplicantsDetails } from "@/types/api";

export const getStageDetails = async (
  applicantsId: number
): Promise<{ data: ApplicantsDetails[] }> => {
  return api.get(`/applicants-details/applicant/${applicantsId}`);
};

export const useStageDetails = (applicantsId: number) => {
  return useQuery({
    queryKey: ["stage-details", applicantsId],
    queryFn: () => getStageDetails(applicantsId),
    enabled: !!applicantsId,
  });
};
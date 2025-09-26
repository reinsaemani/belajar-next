// features/applicants/api/all-applicants/get-applicant.ts

import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Applicant } from "@/types/api";

export const getApplicant = async ({
  applicantId,
}: {
  applicantId: string | number;
}) => {
  const res = await api.get<{ data: Applicant }>(`/applicants/${applicantId}`);
  return res.data;
};

export const getApplicantQueryOptions = (applicantId: string | number) =>
  queryOptions({
    queryKey: ["applicants", applicantId],
    queryFn: () => getApplicant({ applicantId }),
  });

export const useApplicant = ({
  applicantId,
}: {
  applicantId: string | number;
}) => {
  return useQuery(getApplicantQueryOptions(applicantId));
};

import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApplicantRecord } from "@/types/api";

export const getApplicantRecords = async ({
  applicantId,
}: {
  applicantId: string | number;
}) => {
  const res = await api.get<{ data: ApplicantRecord[] }>(
    `/applicants/${applicantId}`
  );
  return res.data;
};

export const getApplicantRecordsQueryOptions = (applicantId: string | number) =>
  queryOptions({
    queryKey: ["applicants", applicantId, "records"],
    queryFn: () => getApplicantRecords({ applicantId }),
  });

export const useApplicantRecords = ({
  applicantId,
}: {
  applicantId: string | number;
}) => {
  return useQuery(getApplicantRecordsQueryOptions(applicantId));
};

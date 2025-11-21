// features/applicants/api/update-record.ts
import { api } from "@/lib/api-client";
import { ApplicantRecord } from "@/types/api";

export const updateApplicantRecord = async (data: FormData) => {
  const res = await api.put<{ data: ApplicantRecord }>(
    `/applicants-details/${data.get("detail_applicants_id")}`,
    data
  );
  return res.data;
};

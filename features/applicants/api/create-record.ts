import { api } from "@/lib/api-client";
import { ApplicantRecord } from "@/types/api";

export const createApplicantRecord = async (data: FormData) => {
  const res = await api.post<{ data: ApplicantRecord }>(
    "/applicants-details",
    data
  );
  return res.data;
};

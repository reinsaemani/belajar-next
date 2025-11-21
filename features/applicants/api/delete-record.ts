import { api } from "@/lib/api-client";

export const deleteApplicantRecord = async (id: number) => {
  const res = await api.delete<{ data: { message: string } }>(
    `/applicants-details/${id}`
  );
  return res.data;
};

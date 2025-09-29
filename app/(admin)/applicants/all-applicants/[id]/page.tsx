import { getApplicant } from "@/features/applicants/api/all-applicants/get-applicant-by-id";
import { ApplicantDetail } from "@/features/applicants/components/all-applicants/ApplicantDetail";

export default async function ApplicantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // ⬅️ params harus di-await
  const applicant = await getApplicant({ applicantId: id });

  if (!applicant) return <div>Applicant not found.</div>;
  return <ApplicantDetail applicant={applicant} />;
}

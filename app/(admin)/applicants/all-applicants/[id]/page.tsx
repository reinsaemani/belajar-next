import { getApplicant } from "@/features/applicants/api/all-applicants/get-applicant-by-id";
import { ApplicantDetail } from "@/features/applicants/components/all-applicants/ApplicantDetail";

export default async function ApplicantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const applicant = await getApplicant({ applicantId: params.id });
  if (!applicant) return <div>Applicant not found.</div>;
  return <ApplicantDetail applicant={applicant} />;
}

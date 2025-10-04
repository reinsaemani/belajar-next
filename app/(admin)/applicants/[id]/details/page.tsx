import { getApplicant } from "@/features/applicants/api/get-details-by-id";
import { ApplicantDetail } from "@/features/applicants/components/applicants-details";

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const applicant = await getApplicant({ applicantId: id });

  return <ApplicantDetail applicant={applicant} />;
}

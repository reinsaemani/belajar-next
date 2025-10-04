import { ApplicantRecords } from "@/features/applicants/components/applicants-records";

export default async function ApplicantRecordsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ApplicantRecords applicantId={id} />;
}

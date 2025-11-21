import { ApplicantRecords } from "@/features/applicants/components/applicants-records";

export default async function ApplicantRecordsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruitment Records</h1>
      <ApplicantRecords applicantId={id} vacancyId={id} />
    </section>
  );
}

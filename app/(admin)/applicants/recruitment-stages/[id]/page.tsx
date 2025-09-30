import { StageDetail } from "@/features/applicants/components/recruitment-stages/StageDetail";

export default async function RecruitmentStageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ⬅️ params harus di-await
  const applicantsId = Number(id);

  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruitment Record</h1>
      <StageDetail applicantsId={applicantsId} />
    </section>
  );
}

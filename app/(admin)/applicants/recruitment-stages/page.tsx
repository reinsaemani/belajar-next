import { StagesList } from "@/features/applicants/components/recruitment-stages/StagesList";

export default function RecruitmentStagesPage() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruitment Stages</h1>
      <StagesList />
    </section>
  );
}

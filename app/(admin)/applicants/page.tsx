import { ApplicantsList } from "@/features/applicants/components/applicants-list";

export default function AdminApplicants() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Applicants</h1>
      <ApplicantsList />
    </section>
  );
}

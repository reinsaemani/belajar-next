import { VacanciesTable } from "@/components/VacanciesTable";

export default function ManageVacanciesPage() {
  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Vacancies</h1>
      <VacanciesTable />
    </section>
  );
}

import { VacanciesList } from "@/features/vacancies/components/VacanciesList";

export default function ManageVacanciesPage() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Vacancies</h1>
      <VacanciesList />
    </section>
  );
}

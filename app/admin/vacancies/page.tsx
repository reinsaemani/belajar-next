import { VacanciesList } from "@/features/vacancies/components/vacancies-list";

export default function AdminVacancies() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Vacancies</h1>
      <VacanciesList />
    </section>
  );
}

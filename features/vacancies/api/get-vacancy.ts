import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Vacancy } from "@/types/api";

export const getVacancy = ({ vacancyId }: { vacancyId: number }) => {
  return api.get<{ data: Vacancy }>(`/vacancies/${vacancyId}`);
};

export const getVacancyQueryOptions = (vacancyId: number) =>
  queryOptions({
    queryKey: ["vacancies", vacancyId],
    queryFn: () => getVacancy({ vacancyId }),
  });

export const useVacancy = ({ vacancyId }: { vacancyId: number }) => {
  return useQuery(getVacancyQueryOptions(vacancyId));
};

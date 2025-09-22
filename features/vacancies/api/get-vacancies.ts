import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Vacancy } from '@/types/api';

export const getVacancies = (): Promise<{ data: Vacancy[] }> => {
  return api.get('/vacancies');
};

export const getVacanciesQueryOptions = () => {
  return queryOptions({
    queryKey: ['vacancies'],
    queryFn: getVacancies,
  });
};

type UseVacanciesOptions = {
  queryConfig?: QueryConfig<typeof getVacanciesQueryOptions>;
};

export const useVacancies = ({ queryConfig }: UseVacanciesOptions = {}) => {
  return useQuery({
    ...getVacanciesQueryOptions(),
    ...queryConfig,
  });
};

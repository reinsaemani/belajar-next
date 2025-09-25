import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Vacancy } from '@/types/api';

export const getAllApplicants = (): Promise<{ data: Vacancy[] }> => {
  return api.get('/applicants');
};

export const getAllApplicantsQueryOptions = () => {
  return queryOptions({
    queryKey: ['applicants'],
    queryFn: getAllApplicants,
  });
};

type UseAllApplicantsOptions = {
  queryConfig?: QueryConfig<typeof getAllApplicantsQueryOptions>;
};

export const useAllApplicants = ({ queryConfig }: UseAllApplicantsOptions = {}) => {
  return useQuery({
    ...getAllApplicantsQueryOptions(),
    ...queryConfig,
  });
};

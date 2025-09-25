// features/vacancies/api/delete-vacancy.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export type DeleteVacancyInput = {
  id: number;
};

export const deleteVacancy = async ({ id }: DeleteVacancyInput) => {
  const res = await api.delete<{ message: string }>(`/vacancies/${id}`);
  return res;
};

type UseDeleteVacancyOptions = {
  mutationConfig?: MutationConfig<typeof deleteVacancy>;
};

export const useDeleteVacancy = ({ mutationConfig }: UseDeleteVacancyOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteVacancy,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] }); // reload table
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

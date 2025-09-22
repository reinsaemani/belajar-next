
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Vacancy } from '@/types/api';

export type UpdateVacancyStatusInput = {
  id: string;
  is_open: boolean;
};

export const updateVacancyStatus = ({ id, is_open }: UpdateVacancyStatusInput) => {
  return api.patch(`/vacancies/${id}/status`, { is_open });
};

type UseUpdateVacancyStatusOptions = {
  mutationConfig?: MutationConfig<typeof updateVacancyStatus>;
};

export const useUpdateVacancyStatus = ({
  mutationConfig,
}: UseUpdateVacancyStatusOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateVacancyStatus,
    onMutate: async ({ id, is_open }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['vacancies'] });
      const previous = queryClient.getQueryData<{ data: Vacancy[] }>(['vacancies']);
      if (previous) {
        queryClient.setQueryData(['vacancies'], {
          ...previous,
          data: previous.data.map(v =>
            v.id === id ? { ...v, is_open } : v
          ),
        });
      }
      return { previous };
    },
    onError: (_err, _variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(['vacancies'], context.previous);
      }
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};


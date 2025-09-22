import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { z } from 'zod';
import { MutationConfig } from '@/lib/react-query';
import { Vacancy } from '@/types/api';

// Schema optional update
export const updateVacancyInputSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  degree: z.string().optional(),
  deadline: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  is_open: z.boolean().optional(),
});

export type UpdateVacancyInput = z.infer<typeof updateVacancyInputSchema>;

export const updateVacancy = ({ id, ...data }: UpdateVacancyInput) => {
  return api.put(`/vacancies/${id}`, data);
};

type UseUpdateVacancyOptions = {
  mutationConfig?: MutationConfig<typeof updateVacancy>;
};

export const useUpdateVacancy = ({ mutationConfig }: UseUpdateVacancyOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateVacancy,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

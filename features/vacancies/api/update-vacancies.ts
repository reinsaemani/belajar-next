import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { z } from "zod";
import { MutationConfig } from "@/lib/react-query";
import { Vacancy } from "@/types/api";

// Schema optional update
export const updateVacancyInputSchema = z.object({
  id: z.union([z.string(), z.number()]), // support string & number
  title: z.string().optional(),
  degree: z.string().optional(),
  deadline: z.string().optional(),
  type: z.string().optional(),
  level: z.string().optional(),
  qualification: z.string().optional(),
  responsibilities: z.string().optional(),
  documents: z.string().optional(),
  benefit: z.string().optional(),
  is_open: z.boolean().optional(),
});

export type UpdateVacancyInput = z.infer<typeof updateVacancyInputSchema>;

// API update
export const updateVacancy = async ({ id, ...data }: UpdateVacancyInput) => {
  const res = await api.put<Vacancy>(`/vacancies/${id}`, data);
  return res;
};

type UseUpdateVacancyOptions = {
  mutationConfig?: MutationConfig<typeof updateVacancy>;
};

// Hook
export const useUpdateVacancy = ({
  mutationConfig,
}: UseUpdateVacancyOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateVacancy,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

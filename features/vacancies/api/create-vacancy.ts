import { z } from "zod";
import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

// Schema validasi
export const createVacancySchema = z.object({
  title: z.string().min(2, "Title is required"),
  degree: z.string().min(2, "Degree is required"),
  type: z.string().min(1, "Type is required"),
  deadline: z.string().min(1, "Deadline is required"),
  level: z.string().min(1, "Level is required"),
  // location: z.string().min(1, "Locations is required"),
  qualification: z.string().min(2, "Qualification is required"),
  responsibilities: z.string().min(2, "Responsibilities is required"),
  documents: z.string().min(2, "Documents is required"),
  benefit: z.string().min(2, "Benefit is required"),
  is_open: z.boolean().optional(),
});

// Type
export type CreateVacancyInput = z.infer<typeof createVacancySchema>;

// API
export const createVacancy = (data: CreateVacancyInput) => {
  return api.post("/vacancies", data);
};

type UseCreateVacancyOptions = {
  mutationConfig?: MutationConfig<typeof createVacancy>;
};

export const useCreateVacancy = ({
  mutationConfig,
}: UseCreateVacancyOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createVacancy,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

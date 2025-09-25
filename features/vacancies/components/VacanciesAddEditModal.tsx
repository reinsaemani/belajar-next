"use client";

import React from "react";
import { VacancyForm } from "./VacanciesForm";
import { CreateVacancyInput, useCreateVacancy } from "../api/create-vacancy";
import { Vacancy } from "@/types/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateVacancy } from "../api/update-vacancies";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Vacancy>;
  mode: "add" | "edit";
};

export function VacancyAddEditModal({ open, onOpenChange, initialData, mode }: Props) {
  const updateMutation = useUpdateVacancy({
    mutationConfig: {
      onSuccess: () => toast.success("Updated vacancy successfully"),
      onError: () => toast.error("Failed to update vacancy"),
    },
  });

  const createMutation = useCreateVacancy({
    mutationConfig: {
      onSuccess: () => toast.success(`${mode === "add" ? "Created" : "Updated"} vacancy successfully`),
      onError: () => toast.error("Failed to save vacancy"),
    },
  });


  // konversi null → undefined
  const normalizedData: Partial<CreateVacancyInput> | undefined = initialData
    ? {
      ...initialData,
      location: initialData.location ?? undefined,
      degree: initialData.degree ?? undefined,
      qualification: initialData.qualification ?? undefined,
      responsibilities: initialData.responsibilities ?? undefined,
      documents: initialData.documents ?? undefined,
      benefit: initialData.benefit ?? undefined,
      deadline: initialData.deadline ?? undefined,
    }
    : undefined;

  async function handleSubmit(data: CreateVacancyInput) {
    if (mode === "edit" && initialData?.vacancies_id) {
      await updateMutation.mutateAsync({ id: initialData.vacancies_id, ...data });
    } else if (mode === "add") {
      await createMutation.mutateAsync(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Vacancy" : "Edit Vacancy"}</DialogTitle>
        </DialogHeader>
        <VacancyForm
          initialData={normalizedData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

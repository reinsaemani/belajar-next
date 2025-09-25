"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VacancyForm } from "./VacancyForm";
import { useCreateVacancy } from "../api/create-vacancy";
import { useUpdateVacancy } from "../api/update-vacancies";

type VacancyAddEditModalProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  initialData?: any; // Bisa Vacancy atau Partial<Vacancy>
  mode: "add" | "edit";
};

export function VacancyAddEditModal({
  open,
  onOpenChange,
  initialData,
  mode,
}: VacancyAddEditModalProps) {
  const createMutation = useCreateVacancy({
    mutationConfig: {
      onSuccess: () => onOpenChange(false),
    },
  });

  const updateMutation = useUpdateVacancy({
    mutationConfig: {
      onSuccess: () => onOpenChange(false),
    },
  });

  function handleSubmit(data: any) {
    if (mode === "add") {
      createMutation.mutate(data);
    } else {
      // Untuk update, biasanya perlu id (pastikan initialData ada id)
      updateMutation.mutate({ ...initialData, ...data });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogTitle>
          {mode === "add" ? "Add Vacancy" : "Edit Vacancy"}
        </DialogTitle>
        <VacancyForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

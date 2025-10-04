"use client";

import React from "react";
import { VacancyForm } from "./vacancies-form";
import { CreateVacancyInput, useCreateVacancy } from "../api/create-vacancy";
import { Vacancy } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateVacancy } from "../api/update-vacancies";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Vacancy>;
  mode: "add" | "edit";
};

export function VacancyAddEditModal({
  open,
  onOpenChange,
  initialData,
  mode,
}: Props) {
  const updateMutation = useUpdateVacancy({
    mutationConfig: {
      onSuccess: () => toast.success("Updated vacancy successfully"),
      onError: () => toast.error("Failed to update vacancy"),
    },
  });

  const createMutation = useCreateVacancy({
    mutationConfig: {
      onSuccess: () =>
        toast.success(
          `${mode === "add" ? "Created" : "Updated"} vacancy successfully`
        ),
      onError: () => toast.error("Failed to save vacancy"),
    },
  });

  const [hasError, setHasError] = React.useState(false);

  const normalizedData: Partial<CreateVacancyInput> | undefined = initialData
    ? {
        ...initialData,
        level: initialData.level ?? undefined,
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
      await updateMutation.mutateAsync({
        id: initialData.vacancies_id,
        ...data,
      });
    } else if (mode === "add") {
      await createMutation.mutateAsync(data);
    }
    onOpenChange(false);
  }

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* DialogContent: mobile full-screen look (rounded-none); scrollable area with limited height */}
      <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl p-0 rounded-none sm:rounded-xl">
        <div className="flex flex-col max-h-[95vh] sm:max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="border-b p-4">
            <DialogTitle className="text-lg font-semibold">
              {mode === "edit" ? "Edit Vacancy" : "Create Vacancy"}
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable content */}
          <div className="overflow-y-auto px-4 sm:px-6 py-4">
            <VacancyForm
              id="vacancy-form"
              initialData={normalizedData}
              onSubmit={handleSubmit}
              onCancel={() => onOpenChange(false)}
              loading={loading}
              onErrorChange={setHasError}
            />
          </div>

          {/* Sticky footer (always visible) */}
          <div className="border-t bg-white p-3 sm:p-4 flex justify-between gap-3 shrink-0">
            <button
              type="button"
              className="btn btn-outline px-3 py-2 rounded"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                // submit the form inside the modal by id
                const form = document.getElementById(
                  "vacancy-form"
                ) as HTMLFormElement | null;
                if (form) {
                  form.requestSubmit();
                }
              }}
              disabled={loading || hasError}
              className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-400 text-white"
            >
              {loading ? "Saving..." : mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

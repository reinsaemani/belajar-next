"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vacancy } from "@/types/api";
import { useDeleteVacancy } from "../api/delete-vacancies";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/dialog/ConfirmationDialog";

type DeleteVacancyProps = {
  vacancy: Vacancy;
};

export const DeleteVacancy = ({ vacancy }: DeleteVacancyProps) => {
  const deleteMutation = useDeleteVacancy({
    mutationConfig: {
      onSuccess: () => toast.success(`Vacancy "${vacancy.title}" deleted`),
      onError: () => toast.error(`Failed to delete "${vacancy.title}"`),
    },
  });

  return (
    <ConfirmationDialog
      icon={<Trash className="w-5 h-5 text-destructive" />}
      title="Delete Vacancy"
      body={`Are you sure you want to delete "${vacancy.title}"?`}
      triggerButton={
        <Button variant="destructive" size="sm">
          <Trash className="w-4 h-4 mr-1 inline" />
          Delete
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteMutation.mutate({ id: vacancy.vacancies_id })}
        >
          <Trash className="w-4 h-4 mr-1 inline" />
          Delete
        </Button>
      }
    />
  );
};

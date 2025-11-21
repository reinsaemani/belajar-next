import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplicantRecord } from "../api/delete-record";
import { ApplicantRecord } from "@/types/api";
import { toast } from "sonner";

export function DeleteApplicantRecord({ record }: { record: ApplicantRecord }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteApplicantRecord(record.detail_applicants_id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["applicants", record.applicants_id, "records"],
      });

      const previousData = queryClient.getQueryData<ApplicantRecord[]>([
        "applicants",
        record.applicants_id,
        "records",
      ]);

      queryClient.setQueryData(
        ["applicants", record.applicants_id, "records"],
        (old: any) =>
          old?.filter(
            (r: any) => r.detail_applicants_id !== record.detail_applicants_id
          )
      );

      return { previousData };
    },
    onSuccess: () => {
      toast.success("Record deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["applicants", record.applicants_id, "records"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });
    },
    onError: () => {
      toast.error("Failed to delete record");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this record? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="bg-red-500 hover:bg-red-600"
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

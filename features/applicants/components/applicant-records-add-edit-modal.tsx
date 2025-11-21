"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplicantRecord } from "../api/create-record";
import { updateApplicantRecord } from "../api/update-record";
import { ApplicantRecord } from "@/types/api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarSlotPickerDialog } from "@/components/datetimepicker/CalendarSlotPickerDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantId: number | string;
  vacancyId: number | string;
  initialData?: ApplicantRecord;
  mode: "add" | "edit";
}

export function ApplicantRecordModal({
  open,
  onOpenChange,
  applicantId,
  vacancyId,
  initialData,
  mode,
}: Props) {
  const queryClient = useQueryClient();

  const [stage, setStage] = React.useState<
    | "SCREENING"
    | "HR_INT"
    | "SKILL_TEST"
    | "USER_INT"
    | "FINAL_INT"
    | "OFFERING"
    | "HIRED"
  >(initialData?.stage ?? "HR_INT");

  const [status, setStatus] = React.useState<
    "RECOMMENDED" | "NOT_RECOMMENDED" | "CONSIDERED" | "HOLD" | "REJECTED"
  >(initialData?.status ?? "CONSIDERED");

  const [penilaian, setPenilaian] = React.useState<File | string | null>(
    initialData?.penilaian_file_path ?? null
  );

  const [notes, setNotes] = React.useState(initialData?.notes ?? "");
  const [scheduleDate, setScheduleDate] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (initialData) {
      setStage(initialData.stage ?? "HR_INT");
      setStatus(initialData.status ?? "CONSIDERED");
      setNotes(initialData.notes ?? "");
      setPenilaian(initialData.penilaian_file_path ?? null);

      if (initialData.schedule_at) {
        const date = new Date(initialData.schedule_at);
        setScheduleDate(date);
      } else {
        setScheduleDate(null);
      }
    }
  }, [initialData]);

  // Dummy reason list
  const rejectReasonOptions = [
    "Does not meet minimum qualification",
    "Incomplete application documents",
    "Failed screening criteria",
    "Overqualified for the position",
    "Position already filled",
    "Other reasons",
  ];

  React.useEffect(() => {
    if (initialData?.schedule_at) {
      const date = new Date(initialData.schedule_at);
      setScheduleDate(date);
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return mode === "add"
        ? await createApplicantRecord(data)
        : await updateApplicantRecord(data);
    },
    onSuccess: () => {
      toast.success(
        `Record ${mode === "add" ? "added" : "updated"} successfully`
      );
      queryClient.invalidateQueries({
        queryKey: ["applicants", applicantId, "records"],
      });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      onOpenChange(false);
    },
    onError: () => toast.error("Failed to save record"),
  });

  const handleSave = () => {
    if (!applicantId || !vacancyId) {
      toast.error("Missing applicant or vacancy ID");
      return;
    }

    const scheduleAt = scheduleDate?.toISOString() ?? null;

    const formData = new FormData();
    formData.append("applicants_id", String(applicantId));
    formData.append("vacancy_id", String(vacancyId));
    formData.append("stage", stage);
    if (scheduleAt) formData.append("schedule_at", scheduleAt);

    if (mode === "edit") {
      formData.append("status", status);
      if (notes) formData.append("notes", notes);
      if (penilaian instanceof File) {
        formData.append("penilaian_file", penilaian);
      }
      if (initialData?.detail_applicants_id)
        formData.append(
          "detail_applicants_id",
          String(initialData.detail_applicants_id)
        );
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Record" : "Edit Record"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Stage */}
          <label className="text-sm font-medium">Stage</label>
          <select
            className="border rounded-md px-2 py-1 text-sm w-full"
            value={stage}
            onChange={(e) =>
              setStage(
                e.target.value as
                  | "SCREENING"
                  | "HR_INT"
                  | "SKILL_TEST"
                  | "USER_INT"
                  | "FINAL_INT"
                  | "OFFERING"
                  | "HIRED"
              )
            }
          >
            <option value="SCREENING">Screening</option>
            <option value="HR_INT">HR Interview</option>
            <option value="SKILL_TEST">Skill Test</option>
            <option value="USER_INT">User Interview</option>
            <option value="FINAL_INT">Final Interview</option>
            <option value="OFFERING">Offering</option>
            <option value="HIRED">Hired</option>
          </select>

          <label className="text-sm font-medium">Schedule</label>
          <CalendarSlotPickerDialog
            value={scheduleDate}
            onChange={(selected) => {
              setScheduleDate(selected);
              setError("");
            }}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {mode === "edit" && (
            <>
              {/* Status */}
              <label className="text-sm font-medium">Status</label>
              <select
                className="border rounded-md px-2 py-1 text-sm w-full"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "RECOMMENDED"
                      | "NOT_RECOMMENDED"
                      | "CONSIDERED"
                      | "HOLD"
                      | "REJECTED"
                  )
                }
              >
                <option value="RECOMMENDED">Recommended</option>
                <option value="NOT_RECOMMENDED">Not Recommended</option>
                <option value="CONSIDERED">Considered</option>
                <option value="HOLD">Hold</option>
                <option value="REJECTED">Rejected</option>
              </select>

              {/* File */}
              <label className="text-sm font-medium">
                Result (Upload File)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => setPenilaian(e.target.files?.[0] || null)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />

              {typeof penilaian === "string" && penilaian && (
                <p className="text-sm text-blue-600 mt-1">
                  <a
                    href={penilaian}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View current file
                  </a>
                </p>
              )}

              {/* Notes */}
              <label className="text-sm font-medium">Notes</label>
              {status === "REJECTED" ? (
                <Select value={notes} onValueChange={(v) => setNotes(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose rejection reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {rejectReasonOptions.map((reason, idx) => (
                      <SelectItem key={idx} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes"
                />
              )}
            </>
          )}
        </div>

        <div className="flex justify-between gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="bg-pink-500 hover:bg-pink-400"
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

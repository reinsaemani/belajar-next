"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createApplicantRecord } from "../api/create-record";
import { paths } from "@/config/paths";
import { CalendarSlotPickerDialog } from "@/components/datetimepicker/CalendarSlotPickerDialog";
import { MoreHorizontal, NotebookTabs, Rocket, XCircle } from "lucide-react";

interface Props {
  applicantId: number;
  vacancyId: number;
}

export function ApplicantDetailActionsDropdown({
  applicantId,
  vacancyId,
}: Props) {
  const [openRecruit, setOpenRecruit] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [error, setError] = React.useState("");
  const [rejectReason, setRejectReason] = React.useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = React.useState<Date | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplicantRecord,
    onSuccess: (_, variables) => {
      const isReject = variables.get("status") === "REJECTED";
      toast.success(
        isReject
          ? "Applicant rejected successfully!"
          : "Interview HR scheduled!"
      );
      queryClient.invalidateQueries({
        queryKey: ["applicants", applicantId, "records"],
      });
      router.refresh();
      resetDialogs();
    },
    onError: () => toast.error("Failed to save record"),
  });

  const resetDialogs = () => {
    setOpenRecruit(false);
    setOpenReject(false);
    setError("");
    setRejectReason(null);
    setScheduleDate(null);
  };

  // === Start Recruit ===
  const handleRecruit = () => {
    if (!scheduleDate || isNaN(scheduleDate.getTime())) {
      setError("Please select a valid date and time");
      return;
    }

    const formData = new FormData();
    formData.append("applicants_id", String(applicantId));
    formData.append("vacancy_id", String(vacancyId));
    formData.append("stage", "HR_INT");
    formData.append("schedule_at", scheduleDate.toISOString());

    mutation.mutate(formData);
  };

  // === Reject Applicant ===
  const handleReject = () => {
    if (!rejectReason) {
      toast.warning("Please select a reason");
      return;
    }

    const formData = new FormData();
    formData.append("applicants_id", String(applicantId));
    formData.append("vacancy_id", String(vacancyId));
    formData.append("stage", "SCREENING");
    formData.append("status", "REJECTED");
    formData.append("notes", rejectReason);

    // 🕒 waktu reject = sekarang
    formData.append("schedule_at", new Date().toISOString());

    mutation.mutate(formData);
  };

  // === View Record ===
  const handleViewRecord = () => {
    router.push(paths.app.admin.applicants.getHrefRecordById(applicantId));
  };

  // === Dummy reason list (sementara) ===
  const rejectReasonOptions = [
    "Does not meet minimum qualification",
    "Incomplete application documents",
    "Failed screening criteria",
    "Overqualified for the position",
    "Position already filled",
    "Other reasons",
  ];

  return (
    <>
      {/* === ACTION MENU === */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpenRecruit(true)}>
            <Rocket className="w-4 h-4 mr-2 text-pink-500" /> Start Recruit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleViewRecord}>
            <NotebookTabs className="w-4 h-4 mr-2" /> View Record
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenReject(true)}>
            <XCircle className="w-4 h-4 mr-2 text-red-600" /> Reject Applicant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* === RECRUIT DIALOG === */}
      <Dialog open={openRecruit} onOpenChange={setOpenRecruit}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Interview HR</DialogTitle>
          </DialogHeader>

          <label className="text-sm font-medium">Schedule</label>
          <CalendarSlotPickerDialog
            value={scheduleDate}
            onChange={(selected) => {
              setScheduleDate(selected);
              setError("");
            }}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {scheduleDate && (
            <p className="text-sm text-gray-600 mt-2">
              Selected:{" "}
              <span className="font-semibold text-gray-800">
                {dayjs(scheduleDate).format("dddd, D MMMM YYYY, HH:mm")}
              </span>
            </p>
          )}

          <div className="mt-5 flex justify-between gap-2">
            <Button variant="outline" onClick={() => setOpenRecruit(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRecruit}
              className="bg-pink-500 hover:bg-pink-400"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save & Notify"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* === REJECT DIALOG === */}
      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Applicant</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Select reason for rejection:
            </label>

            <Select value={rejectReason ?? ""} onValueChange={setRejectReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose reason..." />
              </SelectTrigger>
              <SelectContent>
                {rejectReasonOptions.map((reason, idx) => (
                  <SelectItem key={idx} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 flex justify-between gap-2">
            <Button variant="outline" onClick={() => setOpenReject(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Processing..." : "Confirm Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CircleOff, CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Calendar24 } from "@/components/datetimepicker/DateTimePicker";

interface Props {
  applicantId: number;
}

export function ApplicantDetailActionsDropdown({ applicantId }: Props) {
  const [openRecruit, setOpenRecruit] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [error, setError] = React.useState("");

  const [date, setDate] = React.useState<Date | null>(null);
  const [hour, setHour] = React.useState<number>(9);
  const [minute, setMinute] = React.useState<number>(0);

  const handleRecruit = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }
    try {
      const finalDate = new Date(date);
      finalDate.setHours(hour, minute, 0, 0);

      console.log("Recruit applicant", applicantId, finalDate.toISOString());
      toast.success("Interview HR scheduled!");
      setOpenRecruit(false);
      setError("");
    } catch (e) {
      toast.error("Failed to schedule interview");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-10 h-10" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpenRecruit(true)}>
            <CalendarClock className="w-4 h-4 mr-2" /> Recruit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpenReject(true)}
            className="text-red-600 focus:text-red-600"
          >
            <CircleOff className="w-4 h-4 mr-2" /> Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Recruit Dialog */}
      <Dialog open={openRecruit} onOpenChange={setOpenRecruit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Interview HR</DialogTitle>
          </DialogHeader>

          <Calendar24 />

          <div className="mt-4 flex justify-between gap-2">
            <Button variant="outline" onClick={() => setOpenRecruit(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRecruit}
              className="bg-pink-500 hover:bg-pink-400"
            >
              Save & Notify
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Applicant</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to reject this applicant?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenReject(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Reject</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

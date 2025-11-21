"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import { CalendarSlotPicker } from "./DateTimePicker";

interface CalendarSlotPickerDialogProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function CalendarSlotPickerDialog({
  value,
  onChange,
}: CalendarSlotPickerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [tempValue, setTempValue] = React.useState<Date | null>(value ?? null);

  const handleConfirm = () => {
    onChange?.(tempValue);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen(true)}
      >
        {value
          ? dayjs(value).format("dddd, D MMMM YYYY, HH:mm")
          : "Pick Date & Time"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Schedule</DialogTitle>
          </DialogHeader>

          <CalendarSlotPicker value={tempValue} onChange={setTempValue} />

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-pink-500 hover:bg-pink-400"
              disabled={!tempValue}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

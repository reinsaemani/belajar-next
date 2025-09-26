import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type Props = {
  value: { from: Date | null; to: Date | null };
  onChange: (val: { from: Date | null; to: Date | null }) => void;
};

export function DateRangePicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  function handleDayClick(date: Date) {
    if (!value.from || (value.from && value.to)) {
      onChange({ from: date, to: null });
    } else if (value.from && !value.to) {
      if (date < value.from) {
        onChange({ from: date, to: value.from });
      } else {
        onChange({ from: value.from, to: date });
        setOpen(false);
      }
    }
  }

  function handleClear() {
    onChange({ from: null, to: null });
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-start">
          {value.from && value.to
            ? `${format(value.from, "MMM dd, yyyy")} - ${format(
                value.to,
                "MMM dd, yyyy"
              )}`
            : "Pick a date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={
            value.from && value.to
              ? { from: value.from, to: value.to }
              : undefined
          }
          onDayClick={handleDayClick}
        />
        <div className="flex justify-end gap-2 p-2">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

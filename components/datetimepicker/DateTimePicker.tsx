"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import dayjs from "dayjs";

interface CalendarSlotPickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultHour?: number;
  slotInterval?: number;
}

export function CalendarSlotPicker({
  value,
  onChange,
  defaultHour = 9,
  slotInterval = 30,
}: CalendarSlotPickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value || new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const lastValueRef = React.useRef<string | null>(null);

  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let i = 0; i < 20; i++) {
      const totalMinutes = i * slotInterval;
      const hour = Math.floor(totalMinutes / 60) + defaultHour;
      const minute = totalMinutes % 60;
      if (hour < 22) {
        slots.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return slots;
  }, [defaultHour, slotInterval]);

  // ✅ Update hanya jika value berubah nyata
  React.useEffect(() => {
    if (!date || !selectedTime) return;

    const [hour, minute] = selectedTime.split(":").map(Number);
    const finalDate = new Date(date);
    finalDate.setHours(hour, minute, 0, 0);

    const iso = finalDate.toISOString();
    if (lastValueRef.current !== iso) {
      lastValueRef.current = iso;
      onChange?.(finalDate);
    }
  }, [date, selectedTime]); // ⚠️ Hilangkan onChange dari deps!

  return (
    <Card className="gap-0 p-0 shadow-none border-none">
      <CardContent className="relative p-0 md:pr-48">
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            showOutsideDays={false}
            className="bg-transparent"
            formatters={{
              formatWeekdayName: (d) =>
                d.toLocaleString("en-US", { weekday: "short" }),
            }}
          />
        </div>
        <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-3 overflow-y-auto border-t p-4 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => setSelectedTime(time)}
              className="w-full shadow-none text-sm"
            >
              {time}
            </Button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t px-4 py-3 md:flex-row">
        <div className="text-sm text-muted-foreground">
          {date && selectedTime ? (
            <>
              Selected:{" "}
              <span className="font-medium text-foreground">
                {dayjs(date).format("dddd, D MMMM")} at {selectedTime}
              </span>
            </>
          ) : (
            <>Select a date and time</>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

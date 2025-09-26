import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "../ui/date-range-picker";
import { Calendar, Search } from "lucide-react";

export function FilterBar({
  search,
  setSearch,
  dateRange,
  setDateRange,
  onReset,
}: {
  search: string;
  setSearch: (v: string) => void;
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: (v: { from: Date | null; to: Date | null }) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4 w-full mb-4">
      <div className="relative">
        <Input
          placeholder="Search…"
          className="max-w-xs pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
      </div>

      <div className="relative">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
      </div>
      <Button onClick={onReset} className="bg-pink-500 hover:bg-pink-400">
        Reset
      </Button>
    </div>
  );
}

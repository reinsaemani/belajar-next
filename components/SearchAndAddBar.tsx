import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SearchAndAddBarProps {
  value?: string;
  onSearch: (v: string) => void;
  onAddClick?: () => void;
  placeholder?: string;
  addLabel?: string;
  className?: string;
}

export function SearchAndAddBar({
  value,
  onSearch,
  onAddClick,
  placeholder = "Cari...",
  addLabel = "Tambah",
  className = "",
}: SearchAndAddBarProps) {
  return (
    <div className={`flex gap-2 items-center justify-between ${className}`}>
      {onAddClick && (
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-400"
          onClick={onAddClick}
        >
          <Plus className="w-4 h-4 mr-1" /> {addLabel}
        </Button>
      )}

      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
}

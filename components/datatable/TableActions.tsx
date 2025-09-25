// components/table/TableActions.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteVacancy } from "@/features/vacancies/components/VacanciesDelete";
import { Vacancy } from "@/types/api";
import { Eye, Pencil, Trash, MoreHorizontal } from "lucide-react";
import * as React from "react";

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customDeleteButton?: React.ReactNode;
  vacancy?: Vacancy;
}

export function TableActions({ onView, onEdit, onDelete, customDeleteButton, vacancy }: TableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontal />
          <span className="sr-only">Open actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onView}>
          <Eye className="w-4 h-4 mr-2" /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>
        <div className="px-2 py-1">
          {vacancy && <DeleteVacancy vacancy={vacancy} />}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

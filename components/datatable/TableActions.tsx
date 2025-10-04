// components/table/TableActions.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";

interface TableActionsProps {
  label?: string;
  children: React.ReactNode;
}

export function TableActions({
  label = "Actions",
  children,
}: TableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontal />
          <span className="sr-only">Open actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {label && (
          <DropdownMenuLabel className="font-bold">{label}</DropdownMenuLabel>
        )}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Vacancy } from "@/types/api";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

export const vacanciesColumns: ColumnDef<Vacancy>[] = [
  {
    accessorKey: "vacancies_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "degree",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Degree" />
    ),
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qualification" />
    ),
  },
  {
    accessorKey: "responsibilities",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responsibilities" />
    ),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return "-";
      return new Date(value as string).toLocaleDateString();
    },
  },
  {
    accessorKey: "is_open",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open?" />
    ),
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
];

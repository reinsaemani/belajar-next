"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { useVacancies } from "../api/get-vacancies";
import { Vacancy } from "@/types/api";
import { formatDate, formatType } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { VacancyStatusSwitch } from "./VacanciesStatusSwitch";
import { TableActions } from "@/components/datatable/TableActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VacancyView } from "./VacanciesView";
import React from "react";
import { toast } from "sonner";
import { VacancyAddEditModal } from "./VacanciesAddEditModal";
import { DeleteVacancy } from "./VacanciesDelete";
import { SearchAndAddBar } from "@/components/SearchAndAddBar";

export const VacanciesList: React.FC<{ onAddClick?: () => void }> = ({}) => {
  const [viewOpen, setViewOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<Partial<Vacancy> | null>(null);

  function handleView(row: Vacancy) {
    setSelectedId(row.vacancies_id);
    setViewOpen(true);
  }

  function handleAdd() {
    setEditData(null);
    setModalOpen(true);
  }

  function handleEdit(row: Vacancy) {
    setEditData(row);
    setModalOpen(true);
  }
  const [globalFilter, setGlobalFilter] = React.useState("");
  const vacanciesQuery = useVacancies();

  const columns: ColumnDef<Vacancy>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "location",
      header: () => <div className="text-center">Location</div>,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "type",
      header: () => <div className="text-center">Type</div>,
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatType(getValue<string>())}
        </span>
      ),
    },
    {
      accessorKey: "degree",
      header: () => <div className="text-center">Degree</div>,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "deadline",
      header: () => <div className="text-center">Deadline</div>,
      cell: ({ getValue }) => {
        const deadlineStr = getValue<string>();
        return (
          <span className="block text-center">
            {deadlineStr ? formatDate(new Date(deadlineStr).getTime()) : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "is_open",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <VacancyStatusSwitch
            id={row.original.vacancies_id}
            checked={row.original.is_open}
          />
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <TableActions
          onView={() => handleView(row.original)}
          onEdit={() => handleEdit(row.original)}
          vacancy={row.original}
        />
      ),
    },
  ];

  if (vacanciesQuery.isLoading) {
    return <SkeletonTable columns={columns.length} rows={5} />;
  }

  const vacancies = vacanciesQuery.data?.data;
  if (!vacancies) return null;

  return (
    <>
      <SearchAndAddBar
        value={globalFilter}
        onSearch={setGlobalFilter}
        onAddClick={handleAdd}
        addLabel="Add Data"
        placeholder="Search data..."
        className="mb-4"
      />
      <DataTable<Vacancy>
        data={vacancies}
        columns={columns}
        onAddClick={handleAdd}
        addLabel="Add Vacancies"
      />

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Vacancy Detail
            </DialogTitle>
          </DialogHeader>
          {selectedId && <VacancyView vacancyId={selectedId} />}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <VacancyAddEditModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editData ?? undefined}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
};

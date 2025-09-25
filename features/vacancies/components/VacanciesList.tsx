"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { useVacancies } from "../api/get-vacancies";
import { Vacancy } from "@/types/api";
import { formatDate, formatType } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { VacancyStatusSwitch } from "./VacanciesStatusSwitch";
import { TableActions } from "@/components/datatable/TableActions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VacancyView } from "./VacanciesView";
import React from "react";
import { VacancyAddEditModal } from "./VacancyAddEditModal";

export const VacanciesList = () => {
  const [viewOpen, setViewOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

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
  function handleDelete(row: Vacancy) {
    // misal: show dialog konfirmasi
    if (confirm(`Hapus vacancy ID: ${row.vacancies_id}?`)) {
      // ...panggil API hapus di sini
      alert("Deleted!");
    }
  }

  const vacanciesQuery = useVacancies();

  const columns: ColumnDef<Vacancy>[] = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatType(getValue<string>())}
        </span>
      ),
    },
    {
      accessorKey: "degree",
      header: "Degree",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
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
      header: "Status",
      cell: ({ row }) => {
        const id = row.original.vacancies_id;
        const isOpen = row.original.is_open as boolean;

        return (
          <div className="flex justify-center">
            <VacancyStatusSwitch id={id} checked={isOpen} />
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <TableActions
          onView={() => handleView(row.original)}
          onEdit={() => handleEdit(row.original)}
          onDelete={() => handleDelete(row.original)}
        />
      ),
    },
  ];

  if (vacanciesQuery.isLoading)
    return <SkeletonTable columns={columns.length} rows={5} />;

  const vacancies = vacanciesQuery.data?.data;
  if (!vacancies) return null;

  return (
    <>
      <DataTable<Vacancy>
        data={vacancies}
        columns={columns}
        onAddClick={handleAdd}
        addLabel="Add Vacancies"
      />
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Vacancy Detail</DialogTitle>
          {selectedId && <VacancyView vacancyId={selectedId} />}
        </DialogContent>
      </Dialog>

      <VacancyAddEditModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editData}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
};

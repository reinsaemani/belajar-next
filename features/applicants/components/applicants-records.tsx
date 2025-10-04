"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ApplicantRecord } from "@/types/api";
import { useApplicantRecords } from "../api/get-records-by-id";
import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { SearchAndAddBar } from "@/components/SearchAndAddBar";
import { Button } from "@/components/ui/button";

type Props = {
  applicantId: string | number;
};

export function ApplicantRecords({ applicantId }: Props) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const recordsQuery = useApplicantRecords({ applicantId });
  const records = recordsQuery.data ?? [];

  const filteredRecords = React.useMemo(() => {
    if (!globalFilter) return records;
    const filter = globalFilter.toLowerCase();
    return records.filter(
      (r) =>
        r.stage.toLowerCase().includes(filter) ||
        r.status.toLowerCase().includes(filter) ||
        (r.notes ?? "").toLowerCase().includes(filter) ||
        (r.penilaian ?? "").toLowerCase().includes(filter)
    );
  }, [records, globalFilter]);

  const handleAdd = () => {
    console.log("Add record clicked");
  };

  const handleEdit = (record: ApplicantRecord) => {
    console.log("Edit", record);
  };

  const handleDelete = (record: ApplicantRecord) => {
    console.log("Delete", record);
  };

  const columns: ColumnDef<ApplicantRecord>[] = [
    {
      id: "no",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => (
        <span className="block text-center">{row.index + 1}</span>
      ),
    },
    { accessorKey: "stage", header: "Stage" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
    },
    {
      accessorKey: "penilaian",
      header: "Score",
      cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
    },
    {
      accessorKey: "schedule_at",
      header: "Schedule",
      cell: ({ getValue }) => {
        const val = getValue<string>();
        return val ? new Date(val).toLocaleDateString("en-GB") : "-";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (recordsQuery.isLoading) {
    return <SkeletonTable columns={columns.length} rows={5} />;
  }

  if (recordsQuery.isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        Failed to load records
      </div>
    );
  }

  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruitment Records</h1>

      <SearchAndAddBar
        value={globalFilter}
        onSearch={setGlobalFilter}
        onAddClick={handleAdd}
        addLabel="Add Record"
        placeholder="Search records..."
        className="mb-4"
      />

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <DataTable<ApplicantRecord>
            data={filteredRecords}
            columns={columns}
            onAddClick={handleAdd}
            addLabel="Add Record"
          />
        </div>
      </div>
    </section>
  );
}

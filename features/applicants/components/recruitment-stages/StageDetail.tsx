"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatType } from "@/utils/format";
import { useStageDetails } from "../../api/recruitment-stages/get-stage-details";
import { ApplicantsDetails } from "@/types/api";

export function StageDetail({ applicantsId }: { applicantsId: number }) {
  const { data, isLoading } = useStageDetails(applicantsId);

  const columns: ColumnDef<ApplicantsDetails>[] = [
    {
      header: "Stage",
      accessorFn: (row) => row.stage,
      cell: ({ getValue }) => (
        <span className="font-semibold">{formatType(getValue<string>())}</span>
      ),
    },
    {
      header: "Attempt",
      accessorFn: (row) => row.attempt_no,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<number>()}</span>
      ),
    },
    {
      header: "Status",
      accessorFn: (row) => row.status,
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const color =
          status === "PASSED"
            ? "bg-green-100 text-green-700"
            : status === "FAILED"
            ? "bg-red-100 text-red-700"
            : status === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-600";
        return (
          <span
            className={`px-2 py-1 rounded text-sm font-medium block text-center ${color}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Schedule",
      accessorFn: (row) => row.schedule_at,
      cell: ({ getValue }) => {
        const val = getValue<string | null>();
        return (
          <span className="block text-center">
            {val ? formatDate(new Date(val).getTime()) : "-"}
          </span>
        );
      },
    },
    {
      header: "Notes",
      accessorFn: (row) => row.notes,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      header: "Assessment",
      accessorFn: (row) => row.penilaian,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      header: "Created At",
      accessorFn: (row) => row.created_at,
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatDate(new Date(getValue<string>()).getTime())}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <SkeletonTable columns={columns.length} rows={10} />;
  }

  const stages = data?.data || [];

  if (!stages.length) {
    return (
      <div className="text-center text-gray-500 py-12">No records found</div>
    );
  }

  return (
    <div>
      <DataTable<ApplicantsDetails> data={stages} columns={columns} />
    </div>
  );
}

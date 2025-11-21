"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ApplicantRecord } from "@/types/api";
import { useApplicantRecords } from "../api/get-records-by-id";
import { DataTable } from "@/components/datatable/DataTable";
import { TableActions } from "@/components/datatable/TableActions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { SearchAndAddBar } from "@/components/SearchAndAddBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteApplicantRecord } from "./applicant-records-delete";
import { ApplicantRecordModal } from "./applicant-records-add-edit-modal";
import { formatDateTime, formatStage } from "@/utils/format";
import { SkeletonBlock } from "@/components/skeleton";

type Props = {
  applicantId: string | number;
  vacancyId: string | number;
};

export function ApplicantRecords({ applicantId, vacancyId }: Props) {
  const [viewOpen, setViewOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<ApplicantRecord | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const recordsQuery = useApplicantRecords({ applicantId });
  const records = recordsQuery.data ?? [];

  const filteredRecords = React.useMemo(() => {
    if (!globalFilter) return records;
    const filter = globalFilter.toLowerCase();

    return records.filter((r) => {
      const vacancyTitle = (r.vacancy?.title ?? "").toLowerCase();
      const applicantName =
        (r as any)?.applicant?.user?.full_name?.toLowerCase?.() ?? "";
      const stage = (r.stage ?? "").toLowerCase();
      const status = (r.status ?? "").toLowerCase();
      const notes = (r.notes ?? "").toLowerCase();
      const penilaian = (r.penilaian_file_path ?? "").toLowerCase();

      return (
        vacancyTitle.includes(filter) ||
        applicantName.includes(filter) ||
        stage.includes(filter) ||
        status.includes(filter) ||
        notes.includes(filter) ||
        penilaian.includes(filter)
      );
    });
  }, [records, globalFilter]);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (record: ApplicantRecord) => {
    setEditData(record);
    setModalOpen(true);
  };

  const columns: ColumnDef<ApplicantRecord>[] = [
    {
      id: "no",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => (
        <span className="block text-center">{row.index + 1}</span>
      ),
    },
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const applicant = (row.original as any).applicant;
        return <span>{applicant?.user?.full_name || "-"}</span>;
      },
    },
    {
      id: "vacancy",
      header: "Vacancy",
      cell: ({ row }) => {
        const vacancy = (row.original as any).vacancy;
        return (
          <span className="block text-center">{vacancy?.title || "-"}</span>
        );
      },
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatStage(getValue<string>())}
        </span>
      ),
    },
    {
      accessorKey: "schedule_at",
      header: "Schedule at",
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatDateTime(getValue<number>())}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue<string>() || "-";
        let colorClass = "";

        switch (value) {
          case "RECOMMENDED":
            colorClass =
              "text-green-600 font-semibold bg-green-50 border border-green-300 rounded-md";
            break;
          case "NOT_RECOMMENDED":
            colorClass =
              "text-red-600 font-semibold bg-red-50 border border-red-300 rounded-md";
            break;
          case "CONSIDERED":
            colorClass =
              "text-yellow-600 font-semibold bg-yellow-50 border border-yellow-300 rounded-md";
            break;
          case "HOLD":
            colorClass =
              "text-pink-600 font-semibold bg-pink-50 border border-pink-300 rounded-md";
            break;
          case "REJECTED":
            colorClass =
              "text-gray-800 font-semibold bg-gray-100 border border-red-400 rounded-md";
            break;
          default:
            colorClass = "text-gray-500";
        }

        return (
          <div className="flex justify-center items-center">
            <span className={`inline-block px-3 py-1 text-xs ${colorClass}`}>
              {value.replaceAll("_", " ")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "penilaian",
      header: "Result",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <TableActions>
          <DropdownMenuItem onClick={() => handleEdit(row.original)}>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DeleteApplicantRecord record={row.original} />
        </TableActions>
      ),
    },
  ];

  if (recordsQuery.isLoading) {
    return <SkeletonBlock lines={8} className="p-4" />;
  }

  return (
    <>
      <SearchAndAddBar
        value={globalFilter}
        onSearch={setGlobalFilter}
        onAddClick={handleAdd}
        addLabel="Add Record"
        placeholder="Search records..."
        className="mb-4"
      />

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable<ApplicantRecord>
            data={filteredRecords}
            columns={columns}
            onAddClick={handleAdd}
            addLabel="Add Record"
          />
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Record Detail
            </DialogTitle>
          </DialogHeader>
          {editData ? (
            <div className="space-y-3">
              <p>
                <strong>Stage:</strong> {editData.stage}
              </p>
              <p>
                <strong>Result:</strong> {editData.penilaian_file_path ?? "-"}
              </p>
              <p>
                <strong>Notes:</strong> {editData.notes ?? "-"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No record selected</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <ApplicantRecordModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        applicantId={applicantId}
        initialData={editData ?? undefined}
        vacancyId={vacancyId}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
}

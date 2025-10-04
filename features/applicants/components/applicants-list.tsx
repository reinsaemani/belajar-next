"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { isWithinInterval, parseISO } from "date-fns";
import { Eye, MoreHorizontal, NotebookTabs } from "lucide-react";

import { Applicant } from "@/types/api";
import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { FilterBar } from "@/components/datatable/DataTableFilterSearchDate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { paths } from "@/config/paths";
import { formatCapitalize } from "@/utils/format";
import { TableActions } from "@/components/datatable/TableActions";
import { useApplicants } from "../api/get-all";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatStage } from "@/utils/format";

export const ApplicantsList = () => {
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [dateRange, setDateRange] = React.useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const router = useRouter();

  const handleViewDetails = (id: number) => {
    setIsNavigating(true);
    router.push(paths.app.applicants.getHrefDetailsById(id));
  };

  const handleViewRecord = (id: number) => {
    setIsNavigating(true);
    router.push(paths.app.applicants.getHrefRecordById(id));
  };

  function handleReset() {
    setSearch("");
    setDateRange({ from: null, to: null });
  }

  // === Full columns (desktop / tablet) ===
  const columnsAll: ColumnDef<Applicant>[] = [
    {
      id: "no",
      header: () => <div className="text-center">No.</div>,
      cell: ({ row }) => (
        <span className="block text-center">{row.index + 1}</span>
      ),
    },
    {
      accessorKey: "user.full_name",
      header: "Name",
      cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      id: "vacancy_info",
      header: "Vacancy",
      cell: ({ row }) => {
        const title = row.original.vacancy?.title || "-";
        const level = row.original.vacancy?.level || "-";
        return (
          <span className="block text-center">
            {title} - {level}
          </span>
        );
      },
    },
    {
      accessorKey: "user.study_program",
      header: "Study Program",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      accessorKey: "user.educational_level",
      header: "Education Level",
      cell: ({ getValue }) => (
        <span className="block text-center">
          {getValue<string>() ? formatCapitalize(getValue<string>()) : "-"}
        </span>
      ),
    },
    {
      accessorKey: "user.GPA_grades",
      header: "GPA/Grades",
      cell: ({ getValue }) => {
        const val = getValue<number>();
        return <span className="block text-center">{val ?? "-"}</span>;
      },
    },
    {
      accessorKey: "user.work_experience",
      header: "Work Experience",
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>() || "-"}</span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Applied At",
      cell: ({ getValue }) => {
        const val = getValue<string>();
        return (
          <span className="block text-center">
            {val ? new Date(val).toLocaleDateString("en-GB") : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "current_stage",
      header: "Current Stage",
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatStage(getValue<string>())}
        </span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <TableActions>
          <DropdownMenuItem
            onClick={() => handleViewDetails(row.original.applicants_id)}
          >
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewRecord(row.original.applicants_id)}
          >
            <NotebookTabs className="w-4 h-4 mr-2" /> Record
          </DropdownMenuItem>
        </TableActions>
      ),
    },
  ];

  // === Mobile-friendly columns (keep only essentials) ===
  const columnsMobile: ColumnDef<Applicant>[] = [
    {
      id: "no",
      header: () => <div className="text-center">No.</div>,
      cell: ({ row }) => (
        <span className="block text-center">{row.index + 1}</span>
      ),
    },
    {
      accessorKey: "user.full_name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "vacancy.title",
      header: "Vacancy",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "created_at",
      header: "Applied",
      cell: ({ getValue }) => {
        const val = getValue<string>();
        return val ? (
          <span>{new Date(val).toLocaleDateString("en-GB")}</span>
        ) : null;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <TableActions>
          <DropdownMenuItem
            onClick={() => handleViewDetails(row.original.applicants_id)}
          >
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewRecord(row.original.applicants_id)}
          >
            <NotebookTabs className="w-4 h-4 mr-2" /> Record
          </DropdownMenuItem>
        </TableActions>
      ),
    },
  ];

  const isMobile = useIsMobile();
  const columnsToUse = isMobile ? columnsMobile : columnsAll;

  const applicantsQuery = useApplicants();
  const applicants = applicantsQuery.data?.data || [];

  const filteredApplicants = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    return applicants.filter((row: Applicant) => {
      const searchString = [
        row.user.full_name,
        row.user.email,
        row.vacancy.title,
        row.user.educational_level,
        row.user.study_program,
        row.user.work_experience,
      ]
        .map((v) => (v ? v.toString().toLowerCase() : ""))
        .join(" ");

      const isMatch = !s || searchString.includes(s);
      if (!isMatch) return false;

      if (dateRange.from && dateRange.to) {
        const createdAt = row.created_at ? parseISO(row.created_at) : null;
        if (!createdAt) return false;
        return isWithinInterval(createdAt, {
          start: dateRange.from,
          end: dateRange.to,
        });
      }

      return true;
    });
  }, [applicants, search, dateRange]);

  // loading state uses active column count
  if (applicantsQuery.isLoading || isNavigating) {
    return <SkeletonTable columns={columnsToUse.length} rows={10} />;
  }

  // error / empty states (simple)
  if (applicantsQuery.isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <div className="font-semibold text-red-700 mb-2">
          Failed to load applicants
        </div>
        <div className="text-sm text-red-600 mb-4">
          {(applicantsQuery.error as any)?.message || "Unknown error"}
        </div>
        <div>
          <Button onClick={() => applicantsQuery.refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <FilterBar
        search={search}
        setSearch={setSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onReset={handleReset}
      />

      {/* horizontal scroll wrapper so table doesn't get squished */}
      <div className="overflow-x-auto">
        <div className={isMobile ? "min-w-[420px]" : "min-w-[1000px]"}>
          <DataTable<Applicant>
            data={filteredApplicants}
            columns={columnsToUse}
          />
        </div>
      </div>
    </>
  );
};

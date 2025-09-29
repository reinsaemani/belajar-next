"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { Applicant, Vacancy } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { FilterBar } from "@/components/datatable/DataTableFilterSearchDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import React from "react";
import { useAllApplicants } from "../../api/all-applicants/get-all-applicants";
import { isWithinInterval, parseISO } from "date-fns";

export const AllApplicantsList = () => {
  const [isNavigating, setIsNavigating] = React.useState(false);
  const router = useRouter();

  const handleView = (id: number) => {
    setIsNavigating(true);
    router.push(paths.app.applicants.allApplicants.getHrefById(id));
  };

  const [search, setSearch] = React.useState("");
  const [dateRange, setDateRange] = React.useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  function handleReset() {
    setSearch("");
    setDateRange({ from: null, to: null });
  }

  const AllApplicantsQuery = useAllApplicants();

  const columns: ColumnDef<Applicant>[] = [
    {
      header: "Name",
      accessorFn: (row) => row.user.full_name,
      cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    },
    {
      header: "Gender",
      accessorFn: (row) => row.user.gender,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      header: "Email",
      accessorFn: (row) => row.user.email,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      header: "Position",
      accessorFn: (row) => row.vacancy.title,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      header: "Education Level",
      accessorFn: (row) => row.user.educational_level,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      header: "Field of Study",
      accessorFn: (row) => row.user.study_program,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      header: "Work Experience",
      accessorFn: (row) => row.user.work_experience,
      cell: ({ getValue }) => <span className="block text-center">{getValue<string>()}</span>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal />
              <span className="sr-only">Open actions menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleView(row.original.applicants_id)}>
              <Eye className="w-4 h-4 mr-2" /> View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const allApplicants = AllApplicantsQuery.data?.data || [];

  const filteredApplicants = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    return allApplicants.filter((row: Applicant) => {
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
  }, [allApplicants, search, dateRange]);

  // === Skeleton ketika loading atau navigasi ===
  if (AllApplicantsQuery.isLoading || isNavigating) {
    return <SkeletonTable columns={columns.length} rows={10} />;
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
      <DataTable<Applicant> data={filteredApplicants} columns={columns} />
    </>
  );
};

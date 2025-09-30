"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
import { Applicant } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { useApplicantsByStage } from "../../api/recruitment-stages/get-stages";
import { formatDate, formatType } from "@/utils/format";

export function StageTable({ stage }: { stage: string }) {
  const router = useRouter();
  const query = useApplicantsByStage({ stage });

  const handleView = (id: number) => {
    router.push(paths.app.applicants.recruitmentStages.getHrefById(id));
  };

  const columns: ColumnDef<Applicant>[] = [
    { header: "Name", accessorFn: (row) => row.user.full_name },
    {
      header: "Email",
      accessorFn: (row) => row.user.email,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>()}</span>
      ),
    },
    {
      header: "Position",
      accessorFn: (row) => row.vacancy.title,
      cell: ({ getValue }) => (
        <span className="block text-center">{getValue<string>()}</span>
      ),
    },
    {
      header: "Stage",
      accessorFn: (row) => row.current_stage,
      cell: ({ getValue }) => (
        <span className="block text-center">
          {formatType(getValue<string>())}
        </span>
      ),
    },
    {
      header: "Schedule",
      accessorFn: (row) => {
        const latest = row.details?.[row.details.length - 1];
        return latest?.schedule_at ?? null;
      },
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
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleView(row.original.applicants_id)}
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (query.isLoading) {
    return <SkeletonTable columns={columns.length} rows={10} />;
  }

  return (
    <DataTable<Applicant> data={query.data?.data || []} columns={columns} />
  );
}

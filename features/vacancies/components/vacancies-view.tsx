"use client";

import {
  Briefcase,
  MapPin,
  GraduationCap,
  Calendar,
  FileText,
  ClipboardList,
  Gift,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatDate, formatType } from "@/utils/format";
import { useVacancy } from "../api/get-vacancy";
import { SkeletonDetailView } from "@/components/skeleton/SkeletonDetailView";

export function VacancyView({ vacancyId }: { vacancyId: number }) {
  const vacancyQuery = useVacancy({ vacancyId });

  if (vacancyQuery.isLoading) return <SkeletonDetailView />;

  const vacancy = vacancyQuery.data?.data;
  if (!vacancy) return null;

  return (
    <div className="space-y-6 py-2">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          {vacancy.title}
        </h2>
        {/* <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {vacancy.location || "Location not specified"}
        </p> */}
      </div>

      {/* Status */}
      <Section icon={vacancy.is_open ? CheckCircle2 : XCircle} title="Status">
        <span
          className={
            "px-3 py-1 rounded-full text-xs font-semibold " +
            (vacancy.is_open
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300")
          }
        >
          {vacancy.is_open ? "Open" : "Closed"}
        </span>
      </Section>

      <Section icon={Briefcase} title="Type">
        {formatType(vacancy.type)}
      </Section>

      <Section icon={GraduationCap} title="Degree">
        {vacancy.degree || "-"}
      </Section>

      <Section icon={Calendar} title="Deadline">
        {vacancy.deadline
          ? formatDate(new Date(vacancy.deadline).getTime())
          : "-"}
      </Section>

      <Section icon={GraduationCap} title="Qualification">
        {vacancy.qualification || "-"}
      </Section>

      <Section icon={ClipboardList} title="Responsibilities">
        {vacancy.responsibilities || "-"}
      </Section>

      <Section icon={FileText} title="Documents">
        {vacancy.documents || "-"}
      </Section>

      <Section icon={Gift} title="Benefit">
        {vacancy.benefit || "-"}
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

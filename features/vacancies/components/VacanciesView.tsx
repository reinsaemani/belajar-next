"use client";
import { formatDate, formatType } from "@/utils/format";
import { useVacancy } from "../api/get-vacancy";
import { SkeletonDetailView } from "@/components/skeleton/SkeletonDetailView";

function StatusBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={
        "inline-block px-2 py-0.5 rounded-full text-xs font-semibold " +
        (isOpen
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300")
      }
    >
      {isOpen ? "Open" : "Closed"}
    </span>
  );
}

export function VacancyView({ vacancyId }: { vacancyId: number }) {
  const vacancyQuery = useVacancy({ vacancyId });

  if (vacancyQuery.isLoading) {
    return <SkeletonDetailView />;
  }

  const vacancy = vacancyQuery.data?.data;
  if (!vacancy) return null;

  return (
    <div className="bg-white dark:bg-muted rounded-lg shadow p-6 w-full max-w-2xl space-y-3">
      <h1 className="font-bold text-2xl mb-2">{vacancy.title}</h1>

      <div>
        <span className="text-sm font-semibold">Tipe:</span>{" "}
        <span>{formatType(vacancy.type)}</span>
      </div>
      <div>
        <span className="text-sm font-semibold">Degree:</span>{" "}
        <span>{vacancy.degree}</span>
      </div>
      <div>
        <span className="text-sm font-semibold">Location:</span>{" "}
        <span>
          {vacancy.location || (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Deadline:</span>{" "}
        <span>
          {vacancy.deadline ? (
            formatDate(new Date(vacancy.deadline).getTime())
          ) : (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Qualification:</span>{" "}
        <span>
          {vacancy.qualification || (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Responsibilities:</span>{" "}
        <span>
          {vacancy.responsibilities || (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Documents:</span>{" "}
        <span>
          {vacancy.documents || (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Benefit:</span>{" "}
        <span>
          {vacancy.benefit || (
            <span className="text-muted-foreground italic">-</span>
          )}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold">Status:</span>{" "}
        <StatusBadge isOpen={vacancy.is_open} />
      </div>
    </div>
  );
}
